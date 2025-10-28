import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts, categories, postCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateSlug } from '@/utils/slug';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });

// Helper to generate slug
function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word characters
    .replace(/\s+/g, '-')     // spaces → dashes
    .replace(/--+/g, '-');    // remove multiple dashes
}

export async function POST(req: Request) {
  try {
    // Parse incoming form data (multipart)
    const formData = await req.formData();
    const title = formData.get('title')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const category = formData.get('category')?.toString() || '';
    const published = formData.get('published') === 'true';
    const file = formData.get('featuredImage') as File | null;

    let imageUrl = '';
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      // Upload to Cloudinary using a promise
      imageUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'posts' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url || '');
          }
        );
        stream.end(buffer);
      });
    }

    // Generate slug from title
    const slug = slugify(title);

    // Insert into database using Drizzle (posts table doesn't have `category` column)
    const [newPost] = await db.insert(posts).values({
      title,
      slug,
      content,
      featuredImage: imageUrl,
      published,
    }).returning();

    // Handle categories: support comma-separated list, ids or slugs/names
    if (category) {
      const cats = category.split(',').map((c) => c.trim()).filter(Boolean);
      for (const c of cats) {
        let foundCat = null;

        // If looks like a UUID, try by id
        const uuidRegex = /^[0-9a-fA-F-]{36}$/;
        if (uuidRegex.test(c)) {
          foundCat = await db.query.categories.findFirst({ where: eq(categories.id, c) });
        }

        // Try by slug
        if (!foundCat) {
          foundCat = await db.query.categories.findFirst({ where: eq(categories.slug, c) });
        }

        // Try by name
        if (!foundCat) {
          foundCat = await db.query.categories.findFirst({ where: eq(categories.name, c) });
        }

        // Create category if not found
        if (!foundCat) {
          const slugForCat = generateSlug(c);
          const [created] = await db.insert(categories).values({ name: c, slug: slugForCat }).returning();
          foundCat = created;
        }

        // Create post-category relationship
        if (foundCat && newPost?.id) {
          await db.insert(postCategories).values({ postId: newPost.id, categoryId: foundCat.id });
        }
      }
    }

    return NextResponse.json(newPost);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
export async function GET() {
  try {
    // Fetch posts along with categories using relations
    const allPosts = await db.query.posts.findMany({
      with: {
        postCategories: {
          with: {
            category: true,
          },
        },
      },
    });

    // Transform nested data into the format your frontend expects
    const postsWithCategories = allPosts.map((post) => ({
      ...post,
      categories: post.postCategories.map((pc) => pc.category),
    }));

    return NextResponse.json(postsWithCategories);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

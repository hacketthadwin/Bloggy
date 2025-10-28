import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { postsRelations } from '@/db/schema';
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

    // Insert into database using Drizzle
    const [newPost] = await db.insert(posts).values({
      title,
      slug, // <-- add slug here
      content,
      category,
      featuredImage: imageUrl,
      published,
    }).returning();

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

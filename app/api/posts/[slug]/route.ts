import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // `params` is a Promise in Next.js route handlers for dynamic routes.
    // Await it to get the real params object, then extract `slug`.
    const { slug } = await params;
    // Fetch the post with the given slug along with its categories
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      with: {
        postCategories: {
          with: {
            category: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Transform nested data into the format your frontend expects
    const postWithCategories = {
      ...post,
      categories: post.postCategories.map((pc) => pc.category),
    };

    return NextResponse.json(postWithCategories);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
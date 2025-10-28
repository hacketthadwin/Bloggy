import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '@/db';
import { posts, postCategories } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { generateSlug, generateUniqueSlug } from '@/utils/slug'; 


export const postRouter = router({

  createPost: publicProcedure
    .input(z.object({
      title: z.string().min(1, "Title must not be empty"),
      content: z.string().min(1, "Content must not be empty"),
      published: z.boolean().optional().default(false),
      featuredImage: z.string().optional(),
      categoryIds: z.array(z.string()).optional().default([]),
    }))
    .mutation(async ({ input }) => {
      const baseSlug = generateSlug(input.title);
      const existing = await db.select().from(posts).where(eq(posts.slug, baseSlug));
      let slug = baseSlug;

      if (existing.length > 0) {
        const likePrefix = `${baseSlug}%`;
        const candidates = await db.select({ s: posts.slug }).from(posts).where(sql`${posts.slug} LIKE ${likePrefix}`);
        const existingSlugs = candidates.map((c: { s: string }) => c.s);
        slug = generateUniqueSlug(baseSlug, existingSlugs);
      }

      // 2. Insert post into database
      const [newPost] = await db.insert(posts).values({
        title: input.title,
        slug,
        content: input.content,
        featuredImage: input.featuredImage ?? null,
        published: input.published,
      }).returning();

      // 3. Attach categories if provided
      if (input.categoryIds && input.categoryIds.length > 0) {
        const inserts = input.categoryIds.map((catId) => ({ postId: newPost.id, categoryId: catId }));
        if (inserts.length > 0) {
          await db.insert(postCategories).values(inserts).returning();
        }
      }

      // 4. Fetch the final post with its categories to return to the client
      const inserted = await db.query.posts.findFirst({
        where: eq(posts.id, newPost.id),
        with: { postCategories: { with: { category: true } } },
      });

      if (!inserted) {
          return { error: "Could not retrieve created post data" };
      }

      // Transform nested data structure for the frontend
      return { ...inserted, categories: inserted.postCategories.map((pc) => pc.category) };
    }),

  getPosts: publicProcedure
    .input(z.object({
      categoryId: z.string().optional(),
      page: z.number().optional().default(1),
      limit: z.number().optional().default(10),
      published: z.boolean().optional(),
    }))
    .query(async ({ input }) => {
      // 1. Fetch all posts with category relations
      const all = await db.query.posts.findMany({
        with: { postCategories: { with: { category: true } } },
      });

      // 2. Apply Filtering in-memory
      let filtered = all;
      if (input.published !== undefined) {
        filtered = filtered.filter((p) => p.published === input.published);
      }

      if (input.categoryId) {
        filtered = filtered.filter((p) => p.postCategories.some((pc) => pc.category.id === input.categoryId));
      }

      // 3. Apply Pagination
      const totalCount = filtered.length;
      const start = (input.page - 1) * input.limit;
      const paginated = filtered.slice(start, start + input.limit);

      // 4. Transform data for the frontend
      const postsWithCategories = paginated.map((post) => ({
        ...post,
        categories: post.postCategories.map((pc) => pc.category),
      }));

      // Return results along with the total count for pagination UI
      return { 
        posts: postsWithCategories, 
        totalCount: totalCount 
      };
    }),
});

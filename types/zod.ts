import { z } from 'zod';

// Post schemas
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().optional().default(false),
  categoryIds: z.array(z.string().uuid()).optional().default([]),
});

export const updatePostSchema = z.object({
  id: z.string().uuid('Invalid post ID'),
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  published: z.boolean().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
});

export const getPostBySlugSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
});

export const deletePostSchema = z.object({
  id: z.string().uuid('Invalid post ID'),
});

export const getPostsSchema = z.object({
  categoryId: z.string().uuid().optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  published: z.boolean().optional(),
});

// Category schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().optional(),
});

export const updateCategorySchema = z.object({
  id: z.string().uuid('Invalid category ID'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional(),
  description: z.string().optional(),
});

export const deleteCategorySchema = z.object({
  id: z.string().uuid('Invalid category ID'),
});

// Response schemas
export const postWithCategoriesSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categories: z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
  })),
});

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
});

export const successMessageSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

// Type exports
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type GetPostBySlugInput = z.infer<typeof getPostBySlugSchema>;
export type DeletePostInput = z.infer<typeof deletePostSchema>;
export type GetPostsInput = z.infer<typeof getPostsSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type DeleteCategoryInput = z.infer<typeof deleteCategorySchema>;
export type PostWithCategories = z.infer<typeof postWithCategoriesSchema>;
export type Category = z.infer<typeof categorySchema>;
export type SuccessMessage = z.infer<typeof successMessageSchema>;

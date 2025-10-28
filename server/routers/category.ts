import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Mock data for demonstration
const mockCategories = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Posts about technology, programming, and software development'
  },
  {
    id: '2',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Posts about lifestyle, health, and personal development'
  },
  {
    id: '3',
    name: 'Tutorials',
    slug: 'tutorials',
    description: 'Step-by-step guides and how-to articles'
  }
];

export const categoryRouter = router({
  createCategory: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const newCategory = {
        id: Date.now().toString(),
        name: input.name,
        slug: input.name.toLowerCase().replace(/\s+/g, '-'),
        description: input.description || '',
      };
      
      mockCategories.push(newCategory);
      return newCategory;
    }),

  getCategories: publicProcedure
    .query(async () => {
      return mockCategories;
    }),

  updateCategory: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const categoryIndex = mockCategories.findIndex(c => c.id === input.id);
      if (categoryIndex === -1) {
        throw new Error('Category not found');
      }
      
      const updatedCategory = {
        ...mockCategories[categoryIndex],
        ...input,
        slug: input.name ? input.name.toLowerCase().replace(/\s+/g, '-') : mockCategories[categoryIndex].slug,
      };
      
      mockCategories[categoryIndex] = updatedCategory;
      return updatedCategory;
    }),

  deleteCategory: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input }) => {
      const categoryIndex = mockCategories.findIndex(c => c.id === input.id);
      if (categoryIndex === -1) {
        throw new Error('Category not found');
      }
      
      mockCategories.splice(categoryIndex, 1);
      return { message: 'Category deleted successfully', success: true };
    }),
});
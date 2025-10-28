import { db } from "./index.js";
import { posts, categories, postCategories } from "./schema.js";
import { generateSlug } from "../utils/slug.js";

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Create sample categories
    console.log('Creating categories...');
    const [techCategory, lifestyleCategory, tutorialCategory] = await db
      .insert(categories)
      .values([
        {
          name: 'Technology',
          slug: generateSlug('Technology'),
          description: 'Posts about technology, programming, and software development',
        },
        {
          name: 'Lifestyle',
          slug: generateSlug('Lifestyle'),
          description: 'Posts about lifestyle, health, and personal development',
        },
        {
          name: 'Tutorials',
          slug: generateSlug('Tutorials'),
          description: 'Step-by-step guides and how-to articles',
        },
      ])
      .returning();

    console.log('Categories created:', techCategory.id, lifestyleCategory.id, tutorialCategory.id);

    // Create sample posts
    console.log('Creating posts...');
    const [post1, post2, post3] = await db
      .insert(posts)
      .values([
        {
          title: 'Getting Started with Next.js 15',
          slug: generateSlug('Getting Started with Next.js 15'),
          content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements to the React framework. In this comprehensive guide, we'll explore the latest updates and how to leverage them in your projects.

## What's New in Next.js 15

- **Improved App Router**: Enhanced performance and developer experience
- **Better TypeScript Support**: More accurate type checking and inference
- **Optimized Build Process**: Faster builds and smaller bundle sizes
- **Enhanced Developer Tools**: Better debugging and development experience

## Setting Up Your First Project

To get started with Next.js 15, you can create a new project using the following command:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will create a new Next.js project with all the latest features and best practices.

## Key Features to Explore

1. **Server Components**: Leverage React Server Components for better performance
2. **Streaming**: Implement streaming for faster page loads
3. **Middleware**: Use middleware for authentication and routing logic
4. **API Routes**: Build powerful API endpoints with ease

## Conclusion

Next.js 15 continues to push the boundaries of what's possible with React applications. The new features and improvements make it easier than ever to build fast, scalable web applications.

Start exploring these features today and take your React applications to the next level!`,
          published: true,
        },
        {
          title: 'The Art of Mindful Living',
          slug: generateSlug('The Art of Mindful Living'),
          content: `# The Art of Mindful Living

In our fast-paced world, finding moments of peace and mindfulness has become more important than ever. This guide explores practical ways to incorporate mindfulness into your daily routine.

## What is Mindfulness?

Mindfulness is the practice of being fully present and engaged in the current moment, without judgment. It's about observing your thoughts and feelings without getting caught up in them.

## Benefits of Mindful Living

- **Reduced Stress**: Lower cortisol levels and improved stress management
- **Better Focus**: Enhanced concentration and attention span
- **Improved Relationships**: Better communication and empathy
- **Increased Happiness**: Greater life satisfaction and well-being

## Simple Mindfulness Practices

### 1. Mindful Breathing
Take 5 minutes each day to focus solely on your breath. Notice the sensation of air entering and leaving your body.

### 2. Mindful Eating
Pay attention to the taste, texture, and smell of your food. Eat slowly and savor each bite.

### 3. Mindful Walking
When walking, focus on the sensation of your feet touching the ground and the movement of your body.

## Creating a Mindful Environment

- **Declutter Your Space**: A clean environment promotes a clear mind
- **Limit Digital Distractions**: Set boundaries with technology
- **Create Rituals**: Establish daily routines that promote mindfulness

## Conclusion

Mindful living is a journey, not a destination. Start with small practices and gradually incorporate more mindfulness into your daily life. The benefits will compound over time, leading to a more peaceful and fulfilling existence.`,
          published: true,
        },
        {
          title: 'Building RESTful APIs with tRPC',
          slug: generateSlug('Building RESTful APIs with tRPC'),
          content: `# Building RESTful APIs with tRPC

tRPC is a powerful library that brings end-to-end type safety to your full-stack TypeScript applications. In this tutorial, we'll explore how to build robust APIs with tRPC.

## What is tRPC?

tRPC (TypeScript Remote Procedure Call) allows you to build type-safe APIs with automatic type inference between your frontend and backend. It eliminates the need for code generation and provides excellent developer experience.

## Key Benefits

- **End-to-End Type Safety**: Automatic type inference from server to client
- **No Code Generation**: Types are inferred automatically
- **Excellent DX**: Great developer experience with autocomplete and error checking
- **Framework Agnostic**: Works with any frontend framework

## Setting Up tRPC

### 1. Install Dependencies

\`\`\`bash
npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query
\`\`\`

### 2. Create tRPC Router

\`\`\`typescript
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  hello: publicProcedure
    .input(z.string())
    .query(({ input }) => {
      return { greeting: \`Hello \${input}!\` };
    }),
});
\`\`\`

### 3. Set Up Client

\`\`\`typescript
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();
\`\`\`

## Advanced Features

### Input Validation with Zod
tRPC works seamlessly with Zod for input validation:

\`\`\`typescript
const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const userRouter = router({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      // Create user logic
    }),
});
\`\`\`

### Middleware
Add middleware for authentication, logging, and more:

\`\`\`typescript
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});
\`\`\`

## Best Practices

1. **Use Zod for Validation**: Leverage Zod schemas for input validation
2. **Implement Proper Error Handling**: Use tRPC's built-in error handling
3. **Add Middleware**: Implement authentication and authorization middleware
4. **Optimize Queries**: Use React Query's caching and optimization features

## Conclusion

tRPC provides an excellent developer experience for building type-safe APIs. Its seamless integration with TypeScript and React Query makes it a powerful choice for modern web applications.

Start building your next API with tRPC and experience the benefits of end-to-end type safety!`,
          published: false, // This one is a draft
        },
      ])
      .returning();

    console.log('Posts created:', post1.id, post2.id, post3.id);

    // Create post-category relationships
    console.log('Creating post-category relationships...');
    await db.insert(postCategories).values([
      { postId: post1.id, categoryId: techCategory.id },
      { postId: post1.id, categoryId: tutorialCategory.id },
      { postId: post2.id, categoryId: lifestyleCategory.id },
      { postId: post3.id, categoryId: techCategory.id },
      { postId: post3.id, categoryId: tutorialCategory.id },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('📊 Created:');
    console.log('  - 3 categories');
    console.log('  - 3 posts (2 published, 1 draft)');
    console.log('  - 5 post-category relationships');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log('🎉 Seed completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed failed:', error);
    process.exit(1);
  });

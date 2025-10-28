# Multi-User Blogging Platform - Complete Setup Guide

This guide will walk you through setting up the complete Multi-User Blogging Platform with all the technologies mentioned in the original requirements.

## 🛠️ Tech Stack Overview

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: tRPC, Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Validation**: Zod
- **Development**: ESLint, TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- PostgreSQL 12+ (or use Supabase)
- npm or yarn
- Git

## 🚀 Step-by-Step Setup

### 1. Project Initialization

The project is already initialized with Next.js 15. If you're starting fresh:

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app
```

### 2. Install Dependencies

```bash
npm install @tanstack/react-query @trpc/client @trpc/react-query @trpc/server drizzle-orm pg zod zustand superjson
npm install -D drizzle-kit @types/pg tsx
```

### 3. Database Setup

#### Option A: Local PostgreSQL

1. **Install PostgreSQL locally**
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql postgresql-contrib`

2. **Create Database**
   ```sql
   -- Connect to PostgreSQL
   psql -U postgres
   
   -- Create database
   CREATE DATABASE blog_platform;
   
   -- Create user (optional)
   CREATE USER blog_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE blog_platform TO blog_user;
   ```

#### Option B: Supabase (Recommended)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account
   - Create a new project

2. **Get Database URL**
   - Go to Settings → Database
   - Copy the connection string
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

3. **Enable Row Level Security (RLS)**
   ```sql
   -- In Supabase SQL Editor
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
   ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
   ```

### 4. Environment Configuration

Create `.env.local` file in the project root:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/blog_platform"
# OR for Supabase:
# DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Application Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Add other environment variables
# NEXTAUTH_SECRET="your-secret-key"
# NEXTAUTH_URL="http://localhost:3000"
```

### 5. Database Schema Setup

The project includes a complete Drizzle schema. To set it up:

```bash
# Generate database migrations
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 6. tRPC Setup

The tRPC setup is already configured in the project:

#### Server Configuration (`server/trpc.ts`)
```typescript
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export type Context = {
  db: typeof db;
};

export const createContext = (): Context => ({
  db,
});
```

#### API Routes (`app/api/trpc/[trpc]/route.ts`)
```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../../../server/routers/_app';
import { createContext } from '../../../../server/trpc';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
```

### 7. Frontend Setup

#### tRPC Client Configuration (`lib/trpc/react.ts`)
```typescript
'use client';

import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import superjson from 'superjson';
import type { AppRouter } from '../../server/routers/_app';

export const trpc = createTRPCReact<AppRouter>();

export function getTRPCClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        transformer: superjson,
      }),
    ],
  });
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  }));

  const [trpcClient] = useState(() => getTRPCClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

#### Layout Configuration (`app/layout.tsx`)
```typescript
import { TRPCProvider } from "../lib/trpc/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
```

### 8. State Management (Zustand)

The project includes Zustand stores for global state:

```typescript
// lib/zustand.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    { name: 'ui-store' }
  )
);
```

### 9. Database Schema (Drizzle ORM)

The complete schema is defined in `db/schema.ts`:

```typescript
import { pgTable, uuid, varchar, text, boolean, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Blog Posts Table
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Categories Table
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
});

// Post-Category Relationship Table
export const postCategories = pgTable('post_categories', {
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.postId, table.categoryId] }),
}));
```

### 10. API Routes (tRPC)

#### Post Router (`server/routers/post.ts`)
- `createPost` - Create new blog posts
- `getPosts` - List posts with filtering and pagination
- `getPostBySlug` - Get single post by slug
- `updatePost` - Update existing posts
- `deletePost` - Delete posts

#### Category Router (`server/routers/category.ts`)
- `createCategory` - Create new categories
- `getCategories` - List all categories
- `updateCategory` - Update categories
- `deleteCategory` - Delete categories

### 11. Validation (Zod)

All API inputs and outputs are validated with Zod schemas:

```typescript
// types/zod.ts
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().optional().default(false),
  categoryIds: z.array(z.string().uuid()).optional().default([]),
});
```

### 12. Utility Functions

#### Slug Generation (`utils/slug.ts`)
```typescript
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Database Commands
```bash
# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# Seed database
npm run db:seed
```

## 🔧 Development Workflow

### Adding New Features

1. **Database Changes**: Update `db/schema.ts` and run migrations
2. **API Endpoints**: Add new procedures to `server/routers/`
3. **Frontend Components**: Create components in `components/`
4. **Type Safety**: Update Zod schemas in `types/zod.ts`

### Code Organization

- **Components**: Reusable UI components
- **Pages**: Next.js pages and layouts
- **Server**: tRPC routers and procedures
- **Database**: Schema definitions and queries
- **Types**: TypeScript types and Zod schemas
- **Utils**: Utility functions and helpers

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Database Security**: Use connection pooling and proper authentication
3. **API Security**: Implement rate limiting and input validation
4. **Row Level Security**: Enable RLS in PostgreSQL/Supabase

## 📊 Monitoring and Analytics

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics, Mixpanel)
- Performance monitoring (Vercel Analytics)
- Database monitoring (Supabase Dashboard)

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check your `DATABASE_URL` in `.env.local`
   - Ensure PostgreSQL is running
   - Verify database credentials

2. **tRPC Errors**
   - Check API route configuration
   - Verify tRPC client setup
   - Check network requests in browser dev tools

3. **Build Errors**
   - Run `npm run build` to check for TypeScript errors
   - Check all imports are correct
   - Verify all dependencies are installed

4. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS
   - Verify responsive classes

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 🎉 Success!

Once you've completed all the steps above, you should have a fully functional Multi-User Blogging Platform with:

- ✅ Type-safe APIs with tRPC
- ✅ PostgreSQL database with Drizzle ORM
- ✅ Beautiful UI with Tailwind CSS
- ✅ Global state management with Zustand
- ✅ Form validation with Zod
- ✅ Responsive design
- ✅ Production-ready deployment

Your platform is now ready for development and can be extended with additional features like user authentication, image uploads, comments, and more!

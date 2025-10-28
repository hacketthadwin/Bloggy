# Multi-User Blogging Platform

A modern, full-stack blogging platform built with Next.js 15, tRPC, PostgreSQL, and TypeScript. This project demonstrates a complete implementation of a blogging system with prioritized features and type-safe APIs.

## 📝 Project Overview

### Time Spent
- Setup & Infrastructure: ~1 day
- Core Features (Priority 1): ~1 days
- Extended Features (Priority 2): ~1 days
- Polish & Bonus Features (Priority 3): ~2 day
- Total: ~5 days

## Deployed Link

hh-bloggy.vercel.app

## 🎯 Implemented Features

### 🔴 Priority 1 (Must Have) - All Completed ✅
- **Blog Post CRUD**
  - [x] Create posts with title, content, categories
  - [x] Read posts with efficient data loading
  - [x] Update existing posts
  - [x] Delete posts with confirmation
- **Category Management**
  - [x] Full CRUD operations for categories
  - [x] Multiple categories per post
  - [x] Category filtering system
- **UI/UX**
  - [x] Responsive navigation with mobile support
  - [x] Clean, professional UI using shadcn/ui
  - [x] Blog listing with filters
  - [x] Individual post view pages

### 🟡 Priority 2 (Should Have) - All Completed ✅
- **Landing Page**
  - [x] Header/Hero section
  - [x] Features showcase
  - [x] Footer with navigation
- **Advanced Features**
  - [x] Dashboard for post management
  - [x] Draft/Published post status
  - [x] Rich text editor integration
  - [x] Loading states & error handling
  - [x] Full mobile responsiveness

### 🟢 Priority 3 (Bonus Features) - Partially Completed 🔄
- **Implemented**
  - [x] Full 5-section landing page
  - [x] Image upload for posts (Cloudinary)
  - [x] Post statistics (word count, reading time)
  - [x] Post preview functionality
  - [x] SEO meta tags
  - [x] Pagination  
  - [x] Dark mode support
- **Not Implemented**
  - [ ] Search functionality (planned for future)
  - [ ] Advanced editor features (only for frontend show purpose)

## 🤔 Implementation Decisions & Trade-offs

### Architecture Choices
1. **tRPC over REST**
   - Chose tRPC for end-to-end type safety
   - Simplified API development with automatic type inference
   - Trade-off: Steeper learning curve but better long-term maintainability

2. **Drizzle ORM over Prisma**
   - Lighter weight, faster development setup
   - Better TypeScript integration
   - Trade-off: Less mature ecosystem but more performant

3. **Cloudinary for Images**
   - Managed service for image optimization
   - Automatic CDN distribution
   - Trade-off: Added dependency but simplified image handling

4. **Rich Text Editor over Markdown**
   - Better user experience for non-technical users
   - WYSIWYG editing
   - Trade-off: More complex implementation but better UX

### Performance Considerations
- Implemented pagination for post listings
- Optimized image loading with Cloudinary
- Used React Query for efficient data caching
- Leveraged Next.js App Router for better routing performance

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router)
  - Server components for better performance
  - API routes for file uploads
  - Dynamic routing for blog posts
- **React 19**
  - Server and client components
  - Suspense for loading states
- **TypeScript**
  - Strict type checking
  - End-to-end type safety with tRPC
- **UI/Styling**
  - Tailwind CSS for styling
  - shadcn/ui for component library
  - Responsive design system

### Backend
- **tRPC v11**
  - Type-safe API layer
  - Integrated with React Query
  - Custom middleware for error handling
- **Database**
  - PostgreSQL for data storage
  - Drizzle ORM for type-safe queries
  - Connection pooling for scalability
- **File Storage**
  - Cloudinary for image uploads
  - Automatic image optimization
  - Secure upload presets

### State & Data Management
- **Zustand**
  - Global state management
  - Category filter state
  - UI preferences
- **React Query**
  - Data fetching through tRPC
  - Caching and invalidation
  - Optimistic updates
- **Validation**
  - Zod schemas
  - Runtime type checking
  - API input validation

## 📋 Prerequisites & Setup

### Required Software
- Node.js 18+ (LTS recommended)
- PostgreSQL 12+
- npm 8+ or yarn 1.22+
- Git for version control
- Cloudinary account for image uploads

### Environment Variables
Create `.env.local` with the following:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/blog_platform"


# Application Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Cloudinary Configuration
CLOUDINARY_URL="cloudinary://XXXXXXXXX:XXXXXX-XXXXXX"

```

## 🚀 Local Development Setup

### 1. Clone & Install
```bash
# Clone repository
git clone <repository-url>
cd my-app

# Install dependencies
npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)

2. Set up your environment variables in `.env.local`:

3. Apply Database Schema and Seed Data:
```bash
# Generate Drizzle migration files
npm run db:generate

# Push schema to Supabase
npm run db:push

# Seed the database with initial data
npm run db:seed
```

The seeding process will create:
- 3 categories: Technology, Lifestyle, and Tutorials
- 3 sample blog posts (2 published, 1 draft)
- 5 post-category relationships
- Example content with markdown formatting
- Proper relationships between posts and categories


### 3. Start Development Server
```bash
# Start the Next.js development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Initial Data
The seeding process (`db:seed`) creates:
- Sample blog posts
- Default categories
- Test data for development

Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Architecture

### Directory Structure
```
my-app/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── posts/         # REST endpoints for file uploads
│   │   └── trpc/         # tRPC API handler
│   ├── create/            # Post creation page
│   ├── posts/             # Post listing & single post
│   │   └── [slug]/       # Dynamic post routes
│   ├── test/             # Test page (if needed)
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── BlogPostCard.tsx  # Post preview component
│   ├── CategoryFilter.tsx # Category selection
│   ├── CTA.tsx          # Call-to-action section
│   ├── Features.tsx      # Features section
│   ├── Footer.tsx       # Site footer
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── ImageUpload.tsx  # Image upload handling
│   ├── Pagination.tsx   # Posts pagination
│   ├── PostStats.tsx    # Word count, read time
│   ├── RichTextEditor.tsx # Content editor
│   └── SearchModal.tsx  # Search interface
├── db/                    # Database layer
│   ├── schema.ts         # Drizzle schema definitions
│   ├── index.ts          # Database connection
│   └── seed.ts           # Seeding logic
├── lib/                   # Core libraries
│   ├── post-stats.ts     # Post statistics logic
│   ├── theme.tsx         # Theme configuration
│   ├── trpc.tsx          # tRPC client setup
│   ├── trpc-provider.tsx # tRPC provider wrapper
│   ├── utils.ts          # General utilities
│   └── zustand.ts        # State management
├── server/                # Backend logic
│   ├── routers/          # tRPC routers
│   │   ├── _app.ts      # Root router
│   │   ├── category.ts  # Category operations
│   │   └── post.ts      # Post operations
│   └── trpc.ts          # tRPC initialization
├── types/                # Type definitions
│   └── zod.ts           # Zod schemas
└── utils/                # Utility functions
    └── slug.ts          # URL slug generation
```

### tRPC Router Structure

The tRPC implementation follows a modular structure:

#### Root Router (`server/routers/_app.ts`)
- Combines all sub-routers
- Handles global middleware
- Manages error handling

#### Post Router (`server/routers/post.ts`)
```typescript
// Key procedures
- create: Create new post
- update: Modify existing post
- delete: Remove post
- list: Get paginated posts
- bySlug: Get post by slug
- togglePublish: Update publish status
```

#### Category Router (`server/routers/category.ts`)
```typescript
// Key procedures
- create: New category
- list: All categories
- update: Modify category
- delete: Remove category
- addToPost: Assign to post
- removeFromPost: Unassign from post
```

### Key Design Patterns

1. **Repository Pattern**
   - Drizzle queries abstracted in data layer
   - Type-safe database operations

2. **Provider Pattern**
   - tRPC provider for API context
   - Zustand stores for state

3. **Component Composition**
   - Reusable UI components
   - Layout composition with slots
```

## 🗄️ Database Architecture

### Schema Design

#### Posts Table
```sql
CREATE TABLE posts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         VARCHAR(255) NOT NULL UNIQUE,
  slug          VARCHAR(255) NOT NULL UNIQUE,
  content       TEXT NOT NULL,
  excerpt       VARCHAR(500),
  featuredImage VARCHAR(500),
  published     BOOLEAN DEFAULT false,
  readingTime   INTEGER,
  wordCount     INTEGER,
  createdAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published);
```

#### Categories Table
```sql
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(100) NOT NULL UNIQUE,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

#### Post-Category Junction
```sql
CREATE TABLE post_categories (
  postId     UUID REFERENCES posts(id) ON DELETE CASCADE,
  categoryId UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (postId, categoryId)
);

CREATE INDEX idx_post_categories_post ON post_categories(postId);
CREATE INDEX idx_post_categories_category ON post_categories(categoryId);
```

### Database Design Decisions

1. **UUID vs Integer IDs**
   - Chose UUIDs for better scalability
   - Prevents ID enumeration
   - Enables distributed systems

2. **Soft Deletes**
   - Not implemented for simplicity
   - Can be added with `deleted_at` column

3. **Indexing Strategy**
   - Indexed frequently queried columns
   - Composite indexes for relationships
   - B-tree indexes for range queries

4. **Data Integrity**
   - Foreign key constraints
   - Unique constraints on slugs
   - Cascade deletes for relationships

##  ️ Development Tools & Scripts

### Available Commands
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint            # Run ESLint
npm run format          # Run Prettier
npm run type-check      # Run TypeScript checks

# Database
npm run db:generate      # Generate migrations
npm run db:push         # Update database schema
npm run db:seed         # Add sample data
npm run db:reset        # Reset & reseed database

# Testing (when implemented)
npm run test            # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report

# Deployment
npm run deploy          # Deploy to production
npm run deploy:staging  # Deploy to staging
```

### Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/name
   npm run dev
   # Make changes
   npm run type-check
   npm run lint
   npm run test
   ```

2. **Database Changes**
   ```bash
   # Update schema.ts
   npm run db:generate
   npm run db:push
   npm run db:seed  # if needed
   ```

3. **Testing Changes**
   ```bash
   npm run test:watch
   # Make changes
   npm run test:coverage
   ```

### Code Quality Tools

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Husky**: Git hooks for quality checks

##   Implementation Details

### Core Workflows

#### Post Creation Flow
1. **Input Collection**
   - Title input (required)
   - Rich text content editor
   - Category selection (multiple)
   - Featured image upload (optional)
   
2. **Processing**
   - Slug generation from title
   - Image upload to Cloudinary
   - Word count & reading time calculation
   - Draft status management

3. **Validation**
   - Title uniqueness check
   - Required fields validation
   - Image size/type verification
   - Category existence check

#### File Upload System
1. **Client Side**
   - Drag-drop or file picker
   - Image preview & cropping
   - Size & type validation
   - Progress indicator

2. **Server Side**
   - Multipart form handling
   - Cloudinary upload
   - Response transformation
   - Error handling

3. **Storage**
   - Cloudinary CDN storage
   - URL stored in database
   - Automatic optimization
   - Responsive images

#### Category Management
1. **Data Flow**
   - tRPC queries for lists
   - Zustand store for UI state
   - Real-time updates
   - Optimistic updates

2. **Filtering System**
   - Multi-select categories
   - URL query params
   - Server-side filtering
   - Count indicators

### Performance Optimizations

1. **Data Loading**
   - Pagination implementation
   - Infinite scroll option
   - Prefetching next page
   - Cache management

2. **Image Handling**
   - Cloudinary optimization
   - Lazy loading
   - Blur placeholders
   - Responsive sizes

3. **State Management**
   - Selective revalidation
   - Optimistic updates
   - Local caching
   - Background updates

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Set environment variables:
   - `DATABASE_URL`
   - `CLOUDINARY_URL`


Built with Next.js, tRPC, and PostgreSQL. See `package.json` for all dependencies.

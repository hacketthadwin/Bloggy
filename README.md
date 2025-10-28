# Multi-User Blogging Platform

A modern, full-stack blogging platform built with Next.js 15, tRPC, PostgreSQL, and TypeScript. This project provides a complete foundation for building a multi-user blogging platform with type-safe APIs, real-time updates, and a beautiful user interface.

## 🚀 Features

### Core Features (Implemented)
- **Type-Safe APIs**: End-to-end type safety with tRPC and TypeScript
- **Database Management**: PostgreSQL with Drizzle ORM for robust data handling
- **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- **State Management**: Global state management with Zustand
- **Data Fetching**: Optimized data fetching with React Query
- **Form Validation**: Input validation with Zod schemas
- **Blog Management**: Create, read, update, and delete blog posts
- **Category System**: Organize posts with categories and filtering
- **Slug Generation**: SEO-friendly URLs
- **Draft System**: Save posts as drafts before publishing

### Planned Features (Priority 1)
- **User Authentication**: User registration, login, and session management
- **User Profiles**: Personal user profiles and post attribution
- **Rich Text Editor**: Advanced content editor with markdown support
- **Image Upload**: Support for image uploads and media management
- **Comments System**: User comments and discussions on posts
- **Search Functionality**: Full-text search across posts and categories

### Future Features (Priority 2)
- **Social Features**: User following, likes, and social interactions
- **Content Moderation**: Admin tools for content management
- **Analytics**: Post views, engagement metrics, and user analytics
- **Email Notifications**: Email alerts for new posts and comments
- **API Rate Limiting**: Rate limiting and API security
- **Caching**: Redis caching for improved performance

## 🛠️ Tech Stack

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
- PostgreSQL 12+
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
# Navigate to the project directory
cd my-app

# Install dependencies
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a new database:
```sql
CREATE DATABASE blog_platform;
```

#### Option B: Docker PostgreSQL
```bash
# Run PostgreSQL with Docker
docker run --name blog-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=blog_platform -p 5432:5432 -d postgres:15
```

### 3. Environment Configuration

1. Copy the environment example file:
```bash
cp env.example .env.local
```

2. Update `.env.local` with your database credentials:
```env
DATABASE_URL="postgres://username:password@localhost:5432/blog_platform"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Migration and Seeding

```bash
# Generate database migrations
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
my-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── trpc/          # tRPC API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   ├── BlogPostCard.tsx   # Post card component
│   └── CategoryFilter.tsx  # Category filter
├── db/                    # Database configuration
│   ├── schema.ts          # Drizzle schema
│   ├── index.ts           # Database connection
│   └── seed.ts            # Database seeding
├── lib/                   # Utility libraries
│   ├── trpc/              # tRPC configuration
│   └── zustand.ts         # State management
├── server/                # tRPC server
│   ├── trpc.ts            # tRPC setup
│   └── routers/           # API routers
│       ├── post.ts        # Post operations
│       ├── category.ts    # Category operations
│       └── _app.ts        # Root router
├── types/                 # TypeScript types
│   └── zod.ts             # Zod schemas
├── utils/                 # Utility functions
│   └── slug.ts            # Slug generation
└── drizzle.config.ts      # Drizzle configuration
```

## 🗄️ Database Schema

### Posts Table
- `id` (UUID, Primary Key)
- `title` (String, Unique, Not Null)
- `slug` (String, Unique, Not Null)
- `content` (Text, Not Null)
- `published` (Boolean, Default: false)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Categories Table
- `id` (UUID, Primary Key)
- `name` (String, Unique, Not Null)
- `slug` (String, Unique, Not Null)
- `description` (Text, Nullable)

### Post-Category Relationship
- `postId` (UUID, Foreign Key)
- `categoryId` (UUID, Foreign Key)
- Composite Primary Key

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate database migrations
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
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
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [tRPC](https://trpc.io/) for end-to-end type safety
- [Drizzle ORM](https://orm.drizzle.team/) for database management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vercel](https://vercel.com/) for deployment platform

---

**Happy Coding! 🎉**

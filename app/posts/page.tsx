'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Pagination from '../../components/Pagination';
import { useTheme } from '../../lib/theme';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  categories: Category[];
}

// --- Skeleton Component for the entire Posts Page ---
const PostsSkeleton = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* Header and Footer are assumed to be loaded */}
    <Header />
    
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Page Title and Subtitle Placeholder */}
      <div className="mb-8">
        <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded-md mb-3"></div>
        <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Filters Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
            <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
            <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="flex items-end">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Posts Grid Skeleton (3 columns, 6 items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            
            {/* Status Badge Placeholder */}
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-3"></div>

            {/* Title Placeholder */}
            <div className="h-7 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>

            {/* Content Placeholder Lines */}
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md mb-1"></div>
            <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
            
            {/* Category Tag Placeholder */}
            <div className="h-5 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
            
            {/* Date/Link Placeholder */}
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Placeholder */}
      <div className="mt-8 flex justify-center">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>
    </main>

    <Footer />
  </div>
);
// --- End Skeleton Component ---


export default function PostsPage() {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  // Fetch posts from your API
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data: Post[] = await res.json();
        setAllPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Filter and sort posts
  const filteredPosts = allPosts
    .filter(post => !selectedCategory || post.categories.some(cat => cat.slug === selectedCategory))
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Replaced simple loading div with the comprehensive PostsSkeleton
  if (loading) return <PostsSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse through all our blog posts and discover amazing content.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
                <option value="travel">Travel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
              {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              )}

              <div className="mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  post.published
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                <a href={`/posts/${post.slug}`}>{post.title}</a>
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.content.substring(0, 150)}...
              </p>

              {post.categories.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.categories.map(cat => (
                    <span key={cat.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.createdAt}>
                  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.createdAt))}
                </time>
                <a href={`/posts/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
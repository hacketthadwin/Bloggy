'use client';

import Link from 'next/link';
import { useTheme } from '../lib/theme';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  featuredImage?: string;
  published: boolean;
}

export default function Hero() {
  const { isDark } = useTheme();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        setLoading(true);
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data: Post[] = await res.json();
        

        const sorted = data
          .filter(post => post.published)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
          
        setRecentPosts(sorted);
      } catch (err) {
        console.error("Error fetching recent posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentPosts();
  }, []);


  const RecentPostsSkeleton = () => (
    <div className="mt-12 max-w-4xl mx-auto animate-pulse">
      {/* Heading Placeholder */}
      <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded-md mb-6 mx-auto"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-100 dark:border-gray-700">
            {/* Image placeholder */}
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-3"></div>
            {/* Title placeholder */}
            <div className="h-5 w-5/6 bg-gray-300 dark:bg-gray-600 rounded-md mb-2"></div>
            {/* Date placeholder */}
            <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );


  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Write, Share, and
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Inspire
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            The modern blogging platform that empowers writers with powerful tools, 
            beautiful design, and seamless publishing experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/create"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
            >
              Start Writing
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>

            <Link
              href="/posts"
              className="inline-flex items-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-lg font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Explore Posts
            </Link>
          </div>

          {/* Conditional Rendering: Show Skeleton or Content */}
          {loading ? (
            <RecentPostsSkeleton />
          ) : (
            recentPosts.length > 0 && (
              <div className="mt-12 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentPosts.map(post => (
                    <Link 
                      key={post.id} 
                      href={`/posts/${post.slug}`} 
                      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
                    >
                      {post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.title} className="w-full h-32 object-cover rounded-md mb-3" />
                      ) : (
                      
                        <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-md mb-3 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 mb-2">
                        {post.title}
                      </h3>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(post.createdAt))}
                      </time>
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
    </section>
  );
}

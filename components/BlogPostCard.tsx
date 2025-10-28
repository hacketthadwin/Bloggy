'use client';

import Link from 'next/link';
import { PostWithCategories } from '../types/zod';

interface BlogPostCardProps {
  post: PostWithCategories;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Post Status Badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              post.published
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {post.published ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Post Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Post Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateContent(post.content)}
        </p>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Post Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <time dateTime={post.createdAt.toISOString()}>
              {formatDate(post.createdAt)}
            </time>
            {post.updatedAt.getTime() !== post.createdAt.getTime() && (
              <span>Updated {formatDate(post.updatedAt)}</span>
            )}
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}

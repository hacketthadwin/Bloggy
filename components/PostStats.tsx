'use client';

import { getPostStats } from '../lib/post-stats';

interface PostStatsProps {
  content: string;
  className?: string;
}

export default function PostStats({ content, className = '' }: PostStatsProps) {
  const stats = getPostStats(content);

  return (
    <div className={`flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>{stats.wordCount.toLocaleString()} words</span>
      </div>
      
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{stats.formattedReadingTime}</span>
      </div>
    </div>
  );
}

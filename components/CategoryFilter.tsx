"use client";

import { useBlogStore } from '../lib/zustand';

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useBlogStore();
  
  const categories = [
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      
      <div className="space-y-2">
        {/* All Categories Option */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Categories
        </button>

        {/* Category Options */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.name}
            {category.description && (
              <span className="block text-xs text-gray-500 mt-1">
                {category.description}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Clear Filter Button */}
      {selectedCategory && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setSelectedCategory(null)}
            className="w-full text-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
}

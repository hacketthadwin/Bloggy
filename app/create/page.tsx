'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RichTextEditor from '../../components/RichTextEditor';
import PostStats from '../../components/PostStats';
import { Button } from "@/components/ui/button"

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [featuredFile, setFeaturedFile] = useState<File | null>(null);
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('published', String(published));
      
      if (featuredFile) formData.append('featuredImage', featuredFile); 

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData, 
      });

      if (!res.ok) throw new Error('Failed to create post');
      alert('Post created successfully!');
      router.push('/posts');
    } catch (err) {
      console.error(err);
      alert('Error creating post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content (No changes needed) */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your post title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Start writing your post..."
                    className="min-h-[500px]"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="business">Business</option>
                    <option value="health">Health</option>
                    <option value="travel">Travel</option>
                  </select>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Featured Image - CORRECTED BLOCK */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Featured Image
                  </label>

                  {featuredFile ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        // Use the file object to create a temporary URL for preview
                        src={URL.createObjectURL(featuredFile as Blob)}
                        alt="Featured"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFeaturedFile(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFeaturedFile(file);
                        }}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose file
                      </Button>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{featuredFile ? (featuredFile as File).name : 'No file chosen'}</span>
                    </div>
                  )}
                </div>
              

                {/* Post Statistics (No changes needed) */}
                {content && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Post Statistics</h3>
                    <PostStats content={content} />
                  </div>
                )}

                {/* SEO Settings (No changes needed) */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">SEO Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Meta Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Brief description for search engines..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Tags
                      </label>
                      <input
                        type="text"
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="tag1, tag2, tag3..."
                      />
                    </div>
                  </div>
                </div>

                {/* Publish Settings (No changes needed) */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Publish Settings</h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Publish immediately
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
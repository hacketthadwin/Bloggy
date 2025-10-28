'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

interface BlogState {
  selectedCategory: string | null;
  searchQuery: string;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

// UI Store for general application state
export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'ui-store',
    }
  )
);

// Blog Store for blog-specific state
export const useBlogStore = create<BlogState>()(
  devtools(
    (set) => ({
      selectedCategory: null,
      searchQuery: '',
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearFilters: () => set({ selectedCategory: null, searchQuery: '' }),
    }),
    {
      name: 'blog-store',
    }
  )
);

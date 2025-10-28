'use client';

import { useState, useRef } from 'react';
import { useTheme } from '../lib/theme';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  className?: string;
}

export default function ImageUpload({ onImageUpload, className = '' }: ImageUploadProps) {
  const { isDark } = useTheme();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const imageUrl = URL.createObjectURL(file);
      
      setTimeout(() => {
        setUploadProgress(100);
        setIsUploading(false);
        onImageUpload(imageUrl);
      }, 1000);

    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
      alert('Upload failed. Please try again.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Uploading image...</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 text-gray-400 dark:text-gray-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {isDragOver ? 'Drop image here' : 'Upload an image'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Drag and drop or click to select
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Upload Options */}
      {!isUploading && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              // Simulate URL input
              const url = prompt('Enter image URL:');
              if (url) {
                onImageUpload(url);
              }
            }}
            className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            📎 From URL
          </button>
          <button
            onClick={() => {
              alert('Camera capture would be implemented here');
            }}
            className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            📷 Camera
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../lib/theme';
import { getPostStats } from '../lib/post-stats';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Start writing your post...',
  className = ''
}: RichTextEditorProps) {
  const { isDark } = useTheme();
  const editorRef = useRef<HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const stats = getPostStats(content);

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
    }
  };
  

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      const img = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`;
      execCommand('insertHTML', img);
    }
  };

  const insertCodeBlock = () => {
    const code = prompt('Enter code:');
    if (code) {
      const codeBlock = `<pre><code>${code}</code></pre>`;
      execCommand('insertHTML', codeBlock);
    }
  };

  const insertQuote = () => {
    execCommand('formatBlock', 'blockquote');
  };

  const insertList = (ordered = false) => {
    execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const toolbarButtons = [
    { command: 'bold', icon: 'B', title: 'Bold' },
    { command: 'italic', icon: 'I', title: 'Italic' },
    { command: 'underline', icon: 'U', title: 'Underline' },
    { command: 'strikeThrough', icon: 'S', title: 'Strikethrough' },
    { command: 'justifyLeft', icon: '⬅', title: 'Align Left' },
    { command: 'justifyCenter', icon: '⬆', title: 'Align Center' },
    { command: 'justifyRight', icon: '➡', title: 'Align Right' },
    { command: 'justifyFull', icon: '⬇', title: 'Justify' },
  ];

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text formatting buttons */}
          {toolbarButtons.map((button) => (
            <button
              key={button.command}
              onClick={() => execCommand(button.command)}
              className="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
              title={button.title}
            >
              {button.icon}
            </button>
          ))}
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-500 mx-1" />
          
          {/* Headings */}
          <select
            onChange={(e) => execCommand('formatBlock', e.target.value)}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <option value="div">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
          </select>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-500 mx-1" />
          
          {/* Lists */}
          <button
            onClick={() => insertList(false)}
            className="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Bullet List"
          >
            • List
          </button>
          <button
            onClick={() => insertList(true)}
            className="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Numbered List"
          >
            1. List
          </button>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-500 mx-1" />
          
          {/* Insert buttons */}
          <button
            onClick={insertLink}
            className="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Insert Link"
          >
            🔗 Link
          </button>
          <button
            onClick={insertImage}
            className="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Insert Image"
          >
            🖼️ Image
          </button>
          <button
            onClick={insertCodeBlock}
            className="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Insert Code"
          >
            💻 Code
          </button>
          <button
            onClick={insertQuote}
            className="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            title="Insert Quote"
          >
            💬 Quote
          </button>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-500 mx-1" />
          
          {/* Preview and Stats */}
          <button
            onClick={togglePreview}
            className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
              isPreview 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title="Toggle Preview"
          >
            👁️ Preview
          </button>
          <button
            onClick={() => setShowStats(!showStats)}
            className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
              showStats 
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title="Show Statistics"
          >
            📊 Stats
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="p-4 min-h-[400px] prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              dir="ltr"
              className="p-4 min-h-[400px] focus:outline-none text-gray-900 dark:text-white"
              style={{
                direction: "ltr",
                unicodeBidi: "plaintext", // 👈 important
                background: isDark ? "#1f2937" : "#ffffff",
                color: isDark ? "#f9fafb" : "#111827"
              }}
              data-placeholder={placeholder}
            />
        )}
        
        {/* Statistics Panel */}
        {showStats && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-lg max-w-xs">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Post Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Words:</span>
                <span className="font-medium text-gray-900 dark:text-white">{stats.wordCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Reading Time:</span>
                <span className="font-medium text-gray-900 dark:text-white">{stats.formattedReadingTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Characters:</span>
                <span className="font-medium text-gray-900 dark:text-white">{content.length.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/**
 * Calculate word count from text content
 */
export function calculateWordCount(text: string): number {
  if (!text) return 0;
  
  // Remove HTML tags and extra whitespace
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  // Split by whitespace and filter out empty strings
  const words = cleanText.split(/\s+/).filter(word => word.length > 0);
  
  return words.length;
}

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(wordCount: number, wordsPerMinute: number = 225): number {
  if (wordCount === 0) return 0;
  
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 min read';
  }
  return `${minutes} min read`;
}

/**
 * Get post statistics (word count and reading time)
 */
export function getPostStats(content: string) {
  const wordCount = calculateWordCount(content);
  const readingTime = calculateReadingTime(wordCount);
  
  return {
    wordCount,
    readingTime,
    formattedReadingTime: formatReadingTime(readingTime)
  };
}

/**
 * Extract text content from HTML for statistics
 */
export function extractTextFromHTML(html: string): string {
  if (!html) return '';
  
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const decoded = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  return decoded;
}

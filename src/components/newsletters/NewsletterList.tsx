'use client';

import { useEffect, useState } from 'react';
import type { NewsletterResponse } from '@/types/newsletter';
import NewsletterCategorySection from './NewsletterCategorySection';

export default function NewsletterList() {
  const [newsletters, setNewsletters] = useState<NewsletterResponse>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/newsletters');
      
      if (!response.ok) {
        throw new Error('Failed to fetch newsletters');
      }

      const data = await response.json();
      setNewsletters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading newsletters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const categories = Object.keys(newsletters);

  if (categories.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <div className="text-6xl">📰</div>
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Stay Tuned!
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          We're working on bringing you our latest newsletters. Check back soon for updates and stories from our community.
        </div>
      </div>
    );
  }

  const priorityOrder = ['monthly', 'weekly'];
  const sortedCategories = categories.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.toLowerCase());
    const bIndex = priorityOrder.indexOf(b.toLowerCase());
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-12">
      {sortedCategories.map((category) => (
        <NewsletterCategorySection
          key={category}
          category={category}
          newsletters={newsletters[category]}
        />
      ))}
    </div>
  );
}


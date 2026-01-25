'use client';

import type { Newsletter } from '@/types/newsletter';

interface NewsletterCategorySectionProps {
  category: string;
  newsletters: Newsletter[];
}

export default function NewsletterCategorySection({
  category,
  newsletters,
}: NewsletterCategorySectionProps) {
  const formatCategoryTitle = (cat: string) => {
    return cat
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleViewPDF = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section className="newsletter-category">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {formatCategoryTitle(category)} Newsletters
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsletters.map((newsletter) => (
          <div
            key={newsletter.id}
            className="group bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-orange-200 dark:border-pink-900 hover:border-orange-400 dark:hover:border-pink-700 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                📰 Newsletter
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-pink-400 transition-colors">
              {newsletter.title}
            </h3>
            
            {newsletter.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {newsletter.description}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-orange-200 dark:border-pink-900">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                📅 {formatDate(newsletter.created_at)}
              </p>
              
              <button
                onClick={() => handleViewPDF(newsletter.url)}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
               Read Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


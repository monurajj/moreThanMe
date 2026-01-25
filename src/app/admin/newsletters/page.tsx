'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AddNewsletterForm from '@/components/newsletters/AddNewsletterForm';
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  LogOut,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';

export default function AdminNewslettersPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const adminSecret = localStorage.getItem('ADMIN_SECRET');
      const expectedSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
      
      if (adminSecret === expectedSecret && adminSecret) {
        setIsAuthorized(true);
      } else {
        router.push('/');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ADMIN_SECRET');
    router.push('/');
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: false,
    },
    {
      name: 'Newsletters',
      href: '/admin/newsletters',
      icon: Newspaper,
      current: true,
    },
    {
      name: 'Volunteers',
      href: '/our-family',
      icon: Users,
      current: false,
      description: 'View volunteers'
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-900 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              More Than Me
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    item.current
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className={`w-5 h-5 ${item.current ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-orange-500'}`} />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    {item.description && (
                      <div className="text-xs opacity-75">{item.description}</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:pl-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 mt-12 lg:mt-0">
            <Link 
              href="/admin"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Newsletter Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Add newsletters after uploading PDFs to Supabase Storage
            </p>
          </div>

          {/* Form */}
          <AddNewsletterForm />

          {/* Instructions */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
              📋 Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>Upload PDF to Supabase Storage bucket: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">newsletters</code></li>
              <li>Organize files in folders: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">monthly/</code>, <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">weekly/</code>, etc.</li>
              <li>Copy the file path from bucket root (e.g., <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">monthly/jan-2025.pdf</code>)</li>
              <li>Fill out the form above with newsletter details</li>
              <li>Submit to make it visible on the newsletters page</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>⚠️ Note:</strong> Make sure the newsletters bucket is set to <strong>Public</strong> in Supabase Storage settings for PDFs to be accessible.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


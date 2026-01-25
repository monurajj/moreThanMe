"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminDashboard from "../../components/AdminDashboard";
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function AdminPage() {
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
      current: true,
    },
    {
      name: 'Newsletters',
      href: '/admin/newsletters',
      icon: Newspaper,
      current: false,
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and manage your organization&apos;s activities
            </p>
          </div>

          {/* Dashboard Content */}
          <AdminDashboard />
        </div>
      </main>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArticlesManager from '@/components/admin/ArticlesManager';
import PoemsManager from '@/components/admin/PoemsManager';
import PhotosManager from '@/components/admin/PhotosManager';
import SettingsManager from '@/components/admin/SettingsManager';

type Tab = 'articles' | 'poems' | 'photos' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'articles', label: 'Articles', icon: '📝' },
    { id: 'poems', label: 'Poems', icon: '✍️' },
    { id: 'photos', label: 'Photos', icon: '📷' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="backdrop-blur-lg bg-white/10 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Sumsur Portfolio CMS</h1>
              <p className="text-gray-300 text-sm">Content Management System</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg border border-red-500/50 transition-all disabled:opacity-50"
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-2 backdrop-blur-lg bg-white/5 p-2 rounded-xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-6 shadow-2xl">
          {activeTab === 'articles' && <ArticlesManager />}
          {activeTab === 'poems' && <PoemsManager />}
          {activeTab === 'photos' && <PhotosManager />}
          {activeTab === 'settings' && <SettingsManager />}
        </div>
      </div>
    </div>
  );
}

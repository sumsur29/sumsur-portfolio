'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Settings {
  about?: string;
  social?: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

interface SettingsForm {
  about: string;
  linkedin: string;
  instagram: string;
  email: string;
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'social'>('about');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SettingsForm>();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      setSettings(data);
      
      // Pre-fill form
      setValue('about', data.about || '');
      setValue('linkedin', data.social?.linkedin || '');
      setValue('instagram', data.social?.instagram || '');
      setValue('email', data.social?.email || '');
    } catch (error) {
      showToast('Failed to fetch settings', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onSubmit = async (data: SettingsForm) => {
    setLoading(true);
    try {
      const payload = {
        about: data.about,
        social: {
          linkedin: data.linkedin,
          instagram: data.instagram,
          email: data.email,
        },
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast('Settings saved successfully', 'success');
        fetchSettings();
      } else {
        showToast('Failed to save settings', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`p-4 rounded-lg ${toast.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-200' : 'bg-red-500/20 border border-red-500/50 text-red-200'}`}>
          {toast.message}
        </div>
      )}

      <h2 className="text-2xl font-bold text-white">Site Settings</h2>

      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 rounded-t-lg transition-all ${
            activeTab === 'about'
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          About Page
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2 rounded-t-lg transition-all ${
            activeTab === 'social'
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Social Links
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                About Page Content (Markdown)
              </label>
              <textarea
                {...register('about', { required: 'About content is required' })}
                rows={20}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white font-mono text-sm"
                placeholder="Write your about page content in Markdown..."
              />
              {errors.about && <p className="text-red-400 text-sm mt-1">{errors.about.message}</p>}
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                LinkedIn URL
              </label>
              <input
                {...register('linkedin')}
                type="url"
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Instagram URL
              </label>
              <input
                {...register('instagram')}
                type="url"
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                placeholder="https://instagram.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                placeholder="your@email.com"
              />
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

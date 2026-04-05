'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Article } from '@/data/articles';

interface ArticleForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

export default function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ArticleForm>();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      showToast('Failed to fetch articles', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onSubmit = async (data: ArticleForm) => {
    setLoading(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/articles?id=${editingId}` : '/api/admin/articles';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast(`Article ${editingId ? 'updated' : 'created'} successfully`, 'success');
        fetchArticles();
        handleCancel();
      } else {
        showToast('Failed to save article', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setValue('title', article.title);
    setValue('slug', article.slug);
    setValue('excerpt', article.excerpt);
    setValue('content', article.content);
    setValue('date', article.date);
    setValue('category', article.category);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Article deleted successfully', 'success');
        fetchArticles();
      } else {
        showToast('Failed to delete article', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    reset();
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`p-4 rounded-lg ${toast.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-200' : 'bg-red-500/20 border border-red-500/50 text-red-200'}`}>
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Articles</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          + New Article
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
              <input
                {...register('title', { required: 'Title is required' })}
                onChange={(e) => setValue('slug', generateSlug(e.target.value))}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Slug</label>
              <input
                {...register('slug', { required: 'Slug is required' })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
              />
              {errors.slug && <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Date</label>
              <input
                {...register('date', { required: 'Date is required' })}
                type="text"
                placeholder="e.g., February 20, 2026"
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
              />
              {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Category</label>
              <input
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
              />
              {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Excerpt</label>
            <textarea
              {...register('excerpt', { required: 'Excerpt is required' })}
              rows={3}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
            />
            {errors.excerpt && <p className="text-red-400 text-sm mt-1">{errors.excerpt.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Content (Markdown)</label>
            <textarea
              {...register('content', { required: 'Content is required' })}
              rows={15}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white font-mono text-sm"
            />
            {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Article' : 'Create Article'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{article.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{article.excerpt.substring(0, 150)}...</p>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.category}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(article)}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg border border-blue-500/50 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  disabled={loading}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg border border-red-500/50 transition-all disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

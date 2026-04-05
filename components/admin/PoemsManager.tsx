'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Poem {
  id: string;
  title: string;
  language: 'hindi' | 'english';
  text: string;
  image?: string;
  date?: string;
  context?: string;
}

interface PoemForm {
  title: string;
  language: 'hindi' | 'english';
  text: string;
  image?: string;
  date?: string;
  context?: string;
}

export default function PoemsManager() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<PoemForm>();

  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      const res = await fetch('/api/admin/poems');
      const data = await res.json();
      setPoems(data);
    } catch (error) {
      showToast('Failed to fetch poems', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onSubmit = async (data: PoemForm) => {
    setLoading(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/poems?id=${editingId}` : '/api/admin/poems';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast(`Poem ${editingId ? 'updated' : 'created'} successfully`, 'success');
        fetchPoems();
        handleCancel();
      } else {
        showToast('Failed to save poem', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (poem: Poem) => {
    setEditingId(poem.id);
    setValue('title', poem.title);
    setValue('language', poem.language);
    setValue('text', poem.text);
    setValue('image', poem.image || '');
    setValue('date', poem.date || '');
    setValue('context', poem.context || '');
    setUploadedImagePath(poem.image || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this poem?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/poems?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Poem deleted successfully', 'success');
        fetchPoems();
      } else {
        showToast('Failed to delete poem', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/admin/poems/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedImagePath(data.path);
        setValue('image', data.path);
        showToast('Image uploaded successfully', 'success');
      } else {
        showToast('Failed to upload image', 'error');
      }
    } catch (error) {
      showToast('An error occurred during upload', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setUploadedImagePath(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`p-4 rounded-lg ${toast.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-200' : 'bg-red-500/20 border border-red-500/50 text-red-200'}`}>
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Poems</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          + New Poem
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Language</label>
              <select
                {...register('language', { required: 'Language is required' })}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
              {errors.language && <p className="text-red-400 text-sm mt-1">{errors.language.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Date (optional)</label>
              <input
                {...register('date')}
                type="text"
                placeholder="e.g., 2024"
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Poem Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer"
              />
              {uploading && <p className="text-sm text-gray-400 mt-2">Uploading image...</p>}
              {uploadedImagePath && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-green-400">✓ Uploaded:</span>
                  <span className="text-sm text-gray-300">{uploadedImagePath}</span>
                </div>
              )}
              <input type="hidden" {...register('image')} value={uploadedImagePath || ''} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Context (optional)</label>
            <textarea
              {...register('context')}
              rows={3}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Poem Text</label>
            <textarea
              {...register('text', { required: 'Poem text is required' })}
              rows={15}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white font-mono text-sm"
            />
            {errors.text && <p className="text-red-400 text-sm mt-1">{errors.text.message}</p>}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Poem' : 'Create Poem'}
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
        {poems.map((poem) => (
          <div key={poem.id} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{poem.title}</h3>
                <p className="text-gray-300 text-sm mb-2 font-mono whitespace-pre-wrap">{poem.text.substring(0, 200)}...</p>
                <div className="flex gap-4 text-sm text-gray-400">
                  <span>{poem.language === 'hindi' ? '🇮🇳 Hindi' : '🇬🇧 English'}</span>
                  {poem.date && (
                    <>
                      <span>•</span>
                      <span>{poem.date}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(poem)}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg border border-blue-500/50 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(poem.id)}
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

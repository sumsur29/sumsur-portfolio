'use client';

import { useState, useEffect } from 'react';

interface PhotoIndex {
  [category: string]: string[];
}

const categories = ['nature', 'cities', 'people', 'wildlife', 'smell-good', 'bw'];

export default function PhotosManager() {
  const [photoIndex, setPhotoIndex] = useState<PhotoIndex>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('nature');
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/admin/photos');
      const data = await res.json();
      setPhotoIndex(data);
    } catch (error) {
      showToast('Failed to fetch photos', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    Array.from(files).forEach((file) => {
      formData.append('photos', file);
    });
    formData.append('category', selectedCategory);

    try {
      const res = await fetch('/api/admin/photos/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        showToast(`${files.length} photo(s) uploaded — deploying in ~1-2 min`, 'success');
        fetchPhotos();
      } else {
        showToast('Failed to upload photos', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (category: string, filename: string) => {
    if (!confirm(`Delete ${filename}?`)) return;

    try {
      const res = await fetch(`/api/admin/photos?category=${category}&filename=${filename}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast('Photo deleted — deploying in ~1-2 min', 'success');
        fetchPhotos();
      } else {
        showToast('Failed to delete photo', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  const currentPhotos = photoIndex[selectedCategory] || [];

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`p-4 rounded-lg ${toast.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-200' : 'bg-red-500/20 border border-red-500/50 text-red-200'}`}>
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Photo Gallery</h2>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {cat} ({photoIndex[cat]?.length || 0})
          </button>
        ))}
      </div>

      {/* Upload Section */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">
          Upload to: <span className="text-purple-400">{selectedCategory}</span>
        </h3>
        <label className="block">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-600 file:text-white
              hover:file:bg-purple-700
              file:cursor-pointer file:transition-all
              disabled:opacity-50"
          />
        </label>
        {uploading && (
          <p className="text-purple-300 text-sm mt-2">Uploading and optimizing images...</p>
        )}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPhotos.map((photo) => {
          const isUrl = photo.startsWith('http');
          const imgSrc = isUrl ? photo : `/photos/${selectedCategory}/${photo}`;
          const displayName = isUrl ? photo.split('/').pop() || 'blob' : photo;

          return (
            <div key={photo} className="relative group bg-white/5 rounded-xl overflow-hidden border border-white/10">
              <img
                src={imgSrc}
                alt={displayName}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(selectedCategory, photo)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
              <div className="p-2 bg-black/40">
                <p className="text-white text-xs truncate">{displayName}</p>
              </div>
            </div>
          );
        })}
      </div>

      {currentPhotos.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No photos in this category yet. Upload some above!
        </div>
      )}
    </div>
  );
}

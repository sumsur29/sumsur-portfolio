import photoIndex from './photo-index.json'

type PhotoIndex = {
  [category: string]: string[];
};

const PHOTO_INDEX = photoIndex as PhotoIndex;

// Colorful categories (excluding bw)
const COLORFUL_CATEGORIES = ['nature', 'cities', 'people', 'wildlife', 'smell-good'];

/**
 * Get a random colorful photo path for homepage background.
 * Changes on every page visit (client-side random selection).
 * 
 * @returns Full path to random photo: /photos/[category]/[filename]
 */
export function getRandomColorfulPhoto(): string {
  // Filter to only colorful categories
  const colorfulPhotos: { category: string; filename: string }[] = [];
  
  COLORFUL_CATEGORIES.forEach(category => {
    const photos = PHOTO_INDEX[category] || [];
    photos.forEach(filename => {
      colorfulPhotos.push({ category, filename });
    });
  });
  
  if (colorfulPhotos.length === 0) {
    return '/photos/hero-singer.jpg'; // Fallback
  }
  
  // Pick random photo
  const randomPhoto = colorfulPhotos[Math.floor(Math.random() * colorfulPhotos.length)];
  
  // Handle both blob URLs and local filenames
  if (randomPhoto.filename.startsWith('http')) {
    return randomPhoto.filename;
  }
  return `/photos/${randomPhoto.category}/${randomPhoto.filename}`;
}

/**
 * Get total count of colorful photos available.
 */
export function getColorfulPhotoCount(): number {
  return COLORFUL_CATEGORIES.reduce((total, category) => {
    return total + (PHOTO_INDEX[category]?.length || 0);
  }, 0);
}

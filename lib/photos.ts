import photoIndex from './photo-index.json'

export interface Photo {
  filename: string
  path: string
}

type PhotoIndex = {
  [category: string]: string[]
}

const PHOTO_INDEX = photoIndex as PhotoIndex

/**
 * Server-side function to get photos for a category.
 * Reads from photo-index.json which may contain:
 * - Local filenames (e.g. "abc123.jpg") → served from /photos/{category}/
 * - Full Blob URLs (e.g. "https://blob.vercel-storage.com/...") → served directly
 */
export async function getPhotos(category: string): Promise<Photo[]> {
  const files = PHOTO_INDEX[category] || []

  return files.map(entry => {
    const isUrl = entry.startsWith('http')
    return {
      filename: isUrl ? entry.split('/').pop() || entry : entry,
      path: isUrl ? entry : `/photos/${category}/${entry}`,
    }
  })
}

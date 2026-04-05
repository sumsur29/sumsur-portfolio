import fs from 'fs'
import path from 'path'

export interface Photo {
  filename: string
  path: string
}

/**
 * Server-side function to get photos for a category (used in SSR pages)
 */
export async function getPhotos(category: string): Promise<Photo[]> {
  const photosDir = path.join(process.cwd(), 'public', 'photos', category)
  
  try {
    const files = fs.readdirSync(photosDir)
    const photoFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    )
    
    return photoFiles.map(filename => ({
      filename,
      path: `/photos/${category}/${filename}`
    }))
  } catch (error) {
    console.error(`Error loading photos from ${category}:`, error)
    return []
  }
}

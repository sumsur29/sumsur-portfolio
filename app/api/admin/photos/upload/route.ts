import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const photoIndexPath = path.join(process.cwd(), 'lib', 'photo-index.json');
const publicPhotosPath = path.join(process.cwd(), 'public', 'photos');

async function getPhotoIndex() {
  const data = await fs.readFile(photoIndexPath, 'utf-8');
  return JSON.parse(data);
}

async function savePhotoIndex(index: any) {
  await fs.writeFile(photoIndexPath, JSON.stringify(index, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const formData = await request.formData();
    const photos = formData.getAll('photos') as File[];
    const category = formData.get('category') as string;

    if (!category || photos.length === 0) {
      return NextResponse.json({ error: 'Category and photos are required' }, { status: 400 });
    }

    const categoryPath = path.join(publicPhotosPath, category);
    
    // Ensure category directory exists
    await fs.mkdir(categoryPath, { recursive: true });

    const photoIndex = await getPhotoIndex();
    if (!photoIndex[category]) {
      photoIndex[category] = [];
    }

    const uploadedFiles = [];

    for (const photo of photos) {
      const buffer = Buffer.from(await photo.arrayBuffer());
      const filename = `${Date.now()}-${photo.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filepath = path.join(categoryPath, filename);

      // Optimize image with sharp
      await sharp(buffer)
        .resize(3840, 3840, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(filepath);

      photoIndex[category].push(filename);
      uploadedFiles.push(filename);
    }

    // Save updated index
    await savePhotoIndex(photoIndex);

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles,
      count: uploadedFiles.length 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

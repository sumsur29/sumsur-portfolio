import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readJSONFromGitHub, writeJSONToGitHub } from '@/lib/github';
import { put } from '@vercel/blob';

const PHOTO_INDEX_PATH = 'lib/photo-index.json';

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const formData = await request.formData();
    const photos = formData.getAll('photos') as File[];
    const category = formData.get('category') as string;

    if (!category || photos.length === 0) {
      return NextResponse.json({ error: 'Category and photos are required' }, { status: 400 });
    }

    const photoIndex = await readJSONFromGitHub<Record<string, string[]>>(PHOTO_INDEX_PATH);
    if (!photoIndex[category]) {
      photoIndex[category] = [];
    }

    const uploadedFiles: string[] = [];

    for (const photo of photos) {
      // Upload to Vercel Blob
      const blob = await put(
        `photos/${category}/${Date.now()}-${photo.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
        photo,
        { access: 'public' }
      );

      // Store the full Blob URL in the index
      photoIndex[category].push(blob.url);
      uploadedFiles.push(blob.url);
    }

    // Commit updated index to GitHub
    await writeJSONToGitHub(
      PHOTO_INDEX_PATH,
      photoIndex,
      `CMS: Upload ${uploadedFiles.length} photo(s) to ${category}`
    );

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      count: uploadedFiles.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status }
    );
  }
}

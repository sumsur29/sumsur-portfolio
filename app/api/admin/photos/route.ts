import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readJSONFromGitHub, writeJSONToGitHub } from '@/lib/github';
import { del } from '@vercel/blob';

const PHOTO_INDEX_PATH = 'lib/photo-index.json';

export async function GET() {
  try {
    await requireAuth();
    const photoIndex = await readJSONFromGitHub(PHOTO_INDEX_PATH);
    return NextResponse.json(photoIndex);
  } catch (error) {
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load photos' },
      { status }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();
    const category = request.nextUrl.searchParams.get('category');
    const filename = request.nextUrl.searchParams.get('filename');

    if (!category || !filename) {
      return NextResponse.json({ error: 'Category and filename are required' }, { status: 400 });
    }

    // Update the photo index on GitHub
    const photoIndex = await readJSONFromGitHub<Record<string, string[]>>(PHOTO_INDEX_PATH);
    if (photoIndex[category]) {
      photoIndex[category] = photoIndex[category].filter((f: string) => f !== filename);
      await writeJSONToGitHub(
        PHOTO_INDEX_PATH,
        photoIndex,
        `CMS: Remove photo "${filename}" from ${category}`
      );
    }

    // If the filename is a Vercel Blob URL, delete it from Blob storage too
    if (filename.startsWith('http')) {
      try {
        await del(filename);
      } catch (e) {
        console.warn('Could not delete blob (may not exist):', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status }
    );
  }
}

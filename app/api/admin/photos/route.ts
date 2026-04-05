import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

const photoIndexPath = path.join(process.cwd(), 'lib', 'photo-index.json');
const publicPhotosPath = path.join(process.cwd(), 'public', 'photos');

async function getPhotoIndex() {
  const data = await fs.readFile(photoIndexPath, 'utf-8');
  return JSON.parse(data);
}

async function savePhotoIndex(index: any) {
  await fs.writeFile(photoIndexPath, JSON.stringify(index, null, 2));
}

export async function GET() {
  try {
    await requireAuth();
    const photoIndex = await getPhotoIndex();
    return NextResponse.json(photoIndex);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // Delete file
    const filePath = path.join(publicPhotosPath, category, filename);
    await fs.unlink(filePath);

    // Update index
    const photoIndex = await getPhotoIndex();
    if (photoIndex[category]) {
      photoIndex[category] = photoIndex[category].filter((f: string) => f !== filename);
      await savePhotoIndex(photoIndex);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

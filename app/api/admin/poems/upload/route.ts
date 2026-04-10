import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`poems/${Date.now()}-${image.name}`, image, {
      access: 'public',
    });

    return NextResponse.json({
      success: true,
      path: blob.url,
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

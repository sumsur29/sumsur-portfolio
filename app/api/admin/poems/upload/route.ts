import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const publicPoemsPath = path.join(process.cwd(), 'public', 'poems');

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    // Ensure poems directory exists
    await fs.mkdir(publicPoemsPath, { recursive: true });

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filepath = path.join(publicPoemsPath, filename);

    // Optimize image with sharp
    await sharp(buffer)
      .resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(filepath);

    return NextResponse.json({ 
      success: true, 
      path: `/poems/${filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

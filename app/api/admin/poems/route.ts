import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

const poemsPath = path.join(process.cwd(), 'data', 'poems.ts');

async function getPoems() {
  try {
    const data = await fs.readFile(poemsPath, 'utf-8');
    // Extract the poems array from the TypeScript file
    // More robust regex that handles multiline arrays and optional semicolons
    const match = data.match(/export const poems: Poem\[\] = (\[[\s\S]*\]);?\s*$/m);
    if (!match) {
      console.error('Failed to parse poems file. File content:', data.substring(0, 200));
      throw new Error('Could not parse poems file - regex match failed');
    }
    
    try {
      return JSON.parse(match[1]);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Extracted content:', match[1].substring(0, 500));
      throw new Error('Could not parse poems array as JSON');
    }
  } catch (error) {
    console.error('Error reading poems file:', error);
    throw error;
  }
}

async function savePoems(poems: any[]) {
  const content = `export interface Poem {
  id: string
  title: string
  language: 'hindi' | 'english'
  text: string
  image?: string
  date?: string
  context?: string
}

export const poems: Poem[] = ${JSON.stringify(poems, null, 2)}
`;
  await fs.writeFile(poemsPath, content);
}

export async function GET() {
  try {
    await requireAuth();
    const poems = await getPoems();
    return NextResponse.json(poems);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const poems = await getPoems();

    const newPoem = {
      id: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...body,
    };

    poems.push(newPoem);
    await savePoems(poems);

    return NextResponse.json(newPoem);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const poems = await getPoems();
    const index = poems.findIndex((p: any) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }

    poems[index] = { id, ...body };
    await savePoems(poems);

    return NextResponse.json(poems[index]);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const poems = await getPoems();
    const filtered = poems.filter((p: any) => p.id !== id);

    await savePoems(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readJSONFromGitHub, writeJSONToGitHub } from '@/lib/github';

const POEMS_PATH = 'data/poems.json';

export async function GET() {
  try {
    await requireAuth();
    const poems = await readJSONFromGitHub(POEMS_PATH);
    return NextResponse.json(poems);
  } catch (error) {
    console.error('GET /api/admin/poems error:', error);
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load poems' },
      { status }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const poems = await readJSONFromGitHub<any[]>(POEMS_PATH);

    const newPoem = {
      id: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      ...body,
    };

    poems.push(newPoem);
    await writeJSONToGitHub(POEMS_PATH, poems, `CMS: Add poem "${body.title}"`);

    return NextResponse.json(newPoem);
  } catch (error) {
    console.error('POST /api/admin/poems error:', error);
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status }
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
    const poems = await readJSONFromGitHub<any[]>(POEMS_PATH);
    const index = poems.findIndex((p: any) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }

    poems[index] = { id, ...body };
    await writeJSONToGitHub(POEMS_PATH, poems, `CMS: Update poem "${body.title || poems[index].title}"`);

    return NextResponse.json(poems[index]);
  } catch (error) {
    console.error('PUT /api/admin/poems error:', error);
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status }
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

    const poems = await readJSONFromGitHub<any[]>(POEMS_PATH);
    const poem = poems.find((p: any) => p.id === id);
    const filtered = poems.filter((p: any) => p.id !== id);

    await writeJSONToGitHub(POEMS_PATH, filtered, `CMS: Delete poem "${poem?.title || id}"`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/poems error:', error);
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status }
    );
  }
}

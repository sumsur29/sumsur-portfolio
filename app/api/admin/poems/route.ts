import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

const poemsPath = path.join(process.cwd(), 'data', 'poems.ts');

async function getPoems() {
  try {
    // Use dynamic import with cache busting to get fresh data
    // Add timestamp to force reload after saves
    const poemsModule = await import(`@/data/poems?t=${Date.now()}`);
    return poemsModule.poems;
  } catch (error) {
    console.error('Error loading poems:', error);
    throw new Error('Could not load poems file');
  }
}

async function savePoems(poems: any[]) {
  // Format poems with template literals for multiline text
  const formatPoem = (poem: any) => {
    const lines = [
      `  {`,
      `    id: '${poem.id}',`,
      `    title: '${poem.title}',`,
      `    language: '${poem.language}',`,
    ];
    
    if (poem.image) {
      lines.push(`    image: '${poem.image}',`);
    }
    if (poem.date) {
      lines.push(`    date: '${poem.date}',`);
    }
    if (poem.context) {
      lines.push(`    context: \`${poem.context}\`,`);
    }
    
    // Use template literal for multiline text
    lines.push(`    text: \`${poem.text}\``);
    lines.push(`  }`);
    
    return lines.join('\n');
  };
  
  const poemsArray = poems.map(formatPoem).join(',\n');
  
  const content = `export interface Poem {
  id: string
  title: string
  language: 'hindi' | 'english'
  text: string
  image?: string
  date?: string
  context?: string
}

export const poems: Poem[] = [
${poemsArray}
]
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

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readJSONFromGitHub, writeJSONToGitHub } from '@/lib/github';
import { v4 as uuidv4 } from 'uuid';

const ARTICLES_PATH = 'data/articles.json';

export async function GET() {
  try {
    await requireAuth();
    const articles = await readJSONFromGitHub(ARTICLES_PATH);
    return NextResponse.json(articles);
  } catch (error) {
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load articles' },
      { status }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const articles = await readJSONFromGitHub<any[]>(ARTICLES_PATH);

    const newArticle = {
      id: uuidv4(),
      ...body,
    };

    articles.unshift(newArticle);
    await writeJSONToGitHub(ARTICLES_PATH, articles, `CMS: Add article "${body.title}"`);

    return NextResponse.json(newArticle);
  } catch (error) {
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
    const articles = await readJSONFromGitHub<any[]>(ARTICLES_PATH);
    const index = articles.findIndex((a: any) => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    articles[index] = { ...articles[index], ...body };
    await writeJSONToGitHub(ARTICLES_PATH, articles, `CMS: Update article "${body.title || articles[index].title}"`);

    return NextResponse.json(articles[index]);
  } catch (error) {
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

    const articles = await readJSONFromGitHub<any[]>(ARTICLES_PATH);
    const article = articles.find((a: any) => a.id === id);
    const filtered = articles.filter((a: any) => a.id !== id);

    await writeJSONToGitHub(ARTICLES_PATH, filtered, `CMS: Delete article "${article?.title || id}"`);

    return NextResponse.json({ success: true });
  } catch (error) {
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status }
    );
  }
}

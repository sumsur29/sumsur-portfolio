import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const articlesPath = path.join(process.cwd(), 'data', 'articles.json');

async function getArticles() {
  const data = await fs.readFile(articlesPath, 'utf-8');
  return JSON.parse(data);
}

async function saveArticles(articles: any[]) {
  await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
}

export async function GET() {
  try {
    await requireAuth();
    const articles = await getArticles();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const articles = await getArticles();

    const newArticle = {
      id: uuidv4(),
      ...body,
    };

    articles.unshift(newArticle);
    await saveArticles(articles);

    return NextResponse.json(newArticle);
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
    const articles = await getArticles();
    const index = articles.findIndex((a: any) => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    articles[index] = { ...articles[index], ...body };
    await saveArticles(articles);

    return NextResponse.json(articles[index]);
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

    const articles = await getArticles();
    const filtered = articles.filter((a: any) => a.id !== id);

    await saveArticles(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { readJSONFromGitHub, writeJSONToGitHub, getFileFromGitHub, commitFileToGitHub } from '@/lib/github';

const SETTINGS_PATH = 'data/settings.json';
const ABOUT_PATH = 'data/about.md';

async function getSettings() {
  const settings = await readJSONFromGitHub<any>(SETTINGS_PATH);

  // Also fetch about.md content
  try {
    const aboutFile = await getFileFromGitHub(ABOUT_PATH);
    if (aboutFile) {
      settings.about = aboutFile.content;
    }
  } catch {
    settings.about = '';
  }

  return settings;
}

export async function GET() {
  try {
    await requireAuth();
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    const status = error instanceof Error && error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load settings' },
      { status }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    const { about, ...rest } = body;

    // Save settings.json (social links, etc.)
    await writeJSONToGitHub(SETTINGS_PATH, rest, 'CMS: Update settings');

    // Save about.md separately
    if (about !== undefined) {
      await commitFileToGitHub(ABOUT_PATH, about, 'CMS: Update about page');
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

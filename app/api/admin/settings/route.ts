import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

const settingsPath = path.join(process.cwd(), 'data', 'settings.json');
const aboutMdPath = path.join(process.cwd(), 'data', 'about.md');

async function ensureSettingsFile() {
  try {
    await fs.access(settingsPath);
  } catch {
    await fs.writeFile(
      settingsPath,
      JSON.stringify({ social: { linkedin: '', instagram: '', email: '' } }, null, 2)
    );
  }
}

async function getSettings() {
  await ensureSettingsFile();
  const data = await fs.readFile(settingsPath, 'utf-8');
  const settings = JSON.parse(data);

  // Try to read about.md
  try {
    settings.about = await fs.readFile(aboutMdPath, 'utf-8');
  } catch {
    settings.about = '';
  }

  return settings;
}

async function saveSettings(settings: any) {
  const { about, ...rest } = settings;

  // Save settings.json
  await fs.writeFile(settingsPath, JSON.stringify(rest, null, 2));

  // Save about.md
  if (about !== undefined) {
    await fs.writeFile(aboutMdPath, about);
  }
}

export async function GET() {
  try {
    await requireAuth();
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    const body = await request.json();
    await saveSettings(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

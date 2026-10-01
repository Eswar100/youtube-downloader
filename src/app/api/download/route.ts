import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

const YT_URL_RE = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)[\w\-]{11}/;

export async function POST(req: NextRequest) {
  const tmpFile = path.join(os.tmpdir(), `vp_${Date.now()}_%(id)s.%(ext)s`);

  try {
    const { url, formatId } = await req.json();

    if (!url || !formatId) return NextResponse.json({ error: 'Missing url or formatId' }, { status: 400 });

    const trimmed = String(url).trim();
    if (!YT_URL_RE.test(trimmed)) return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });

    const safeUrl = trimmed.replace(/"/g, '');
    const safeFormat = String(formatId).replace(/[^a-zA-Z0-9\+\-_]/g, '');

    await execAsync(
      `python -m yt_dlp -f "${safeFormat}" --no-playlist -o "${tmpFile}" "${safeUrl}"`,
      { timeout: 120000 }
    );

    // Find the downloaded file
    const dir = os.tmpdir();
    const files = fs.readdirSync(dir).filter((f) => f.startsWith(`vp_${path.basename(tmpFile).split('_')[1]}`));
    if (!files.length) return NextResponse.json({ error: 'Download failed.' }, { status: 500 });

    const filePath = path.join(dir, files[0]);
    const ext = path.extname(filePath).slice(1);
    const buffer = fs.readFileSync(filePath);
    fs.unlinkSync(filePath);

    const contentType = ext === 'mp4' ? 'video/mp4' : ext === 'webm' ? 'video/webm' : ext === 'm4a' ? 'audio/mp4' : 'application/octet-stream';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="youmate_download.${ext}"`,
        'Content-Length': buffer.byteLength.toString(),
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[download] error:', msg);
    return NextResponse.json({ error: 'Download failed. The format may no longer be available.' }, { status: 500 });
  }
}

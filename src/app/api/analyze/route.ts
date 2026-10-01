import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const YT_URL_RE = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)[\w\-]{11}/;

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    }

    const trimmed = url.trim();
    if (!YT_URL_RE.test(trimmed)) {
      return NextResponse.json({ error: 'Invalid YouTube URL. Please paste a valid youtube.com or youtu.be link.' }, { status: 400 });
    }

    const safeUrl = trimmed.replace(/"/g, '');
    const { stdout } = await execAsync(
      `python -m yt_dlp --dump-single-json --no-playlist --skip-download "${safeUrl}"`,
      { timeout: 30000 }
    );

    const data = JSON.parse(stdout);

    // Build format list (video+audio progressive, video-only, audio-only)
    const formats: Array<{
      formatId: string;
      ext: string;
      quality: string;
      resolution: string | null;
      filesize: number | null;
      type: 'video' | 'audio' | 'video+audio';
      vcodec: string | null;
      acodec: string | null;
      tbr: number | null;
    }> = [];

    const seen = new Set<string>();

    for (const f of data.formats ?? []) {
      const hasVideo = f.vcodec && f.vcodec !== 'none';
      const hasAudio = f.acodec && f.acodec !== 'none';
      const ext = f.ext ?? 'mp4';
      const res = f.height ? `${f.height}p` : null;

      if (!hasVideo && !hasAudio) continue;

      let type: 'video' | 'audio' | 'video+audio' = 'video+audio';
      if (hasVideo && !hasAudio) type = 'video';
      else if (!hasVideo && hasAudio) type = 'audio';

      const key = `${type}-${res ?? f.format_id}-${ext}`;
      if (seen.has(key)) continue;
      seen.add(key);

      formats.push({
        formatId: f.format_id,
        ext,
        quality: f.format_note ?? res ?? f.format_id,
        resolution: res,
        filesize: f.filesize ?? f.filesize_approx ?? null,
        type,
        vcodec: f.vcodec ?? null,
        acodec: f.acodec ?? null,
        tbr: f.tbr ?? null,
      });
    }

    // Sort: video+audio first by resolution desc, then audio, then video-only
    formats.sort((a, b) => {
      const order = { 'video+audio': 0, audio: 1, video: 2 };
      if (order[a.type] !== order[b.type]) return order[a.type] - order[b.type];
      const ra = parseInt(a.resolution ?? '0');
      const rb = parseInt(b.resolution ?? '0');
      return rb - ra;
    });

    const thumbnail =
      data.thumbnail ??
      (data.thumbnails?.length
        ? data.thumbnails[data.thumbnails.length - 1].url
        : null);

    return NextResponse.json({
      id: data.id,
      title: data.title,
      uploader: data.uploader ?? data.channel ?? 'Unknown',
      duration: data.duration,
      thumbnail,
      viewCount: data.view_count ?? null,
      uploadDate: data.upload_date ?? null,
      formats,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('is not a YouTube')) return NextResponse.json({ error: 'Not a valid YouTube video URL.' }, { status: 400 });
    if (msg.includes('Private video')) return NextResponse.json({ error: 'This video is private and cannot be accessed.' }, { status: 403 });
    if (msg.includes('Video unavailable')) return NextResponse.json({ error: 'This video is unavailable.' }, { status: 404 });
    console.error('[analyze] error:', msg);
    return NextResponse.json({ error: 'Failed to analyze video. Please try again.' }, { status: 500 });
  }
}

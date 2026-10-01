import { NextRequest, NextResponse } from 'next/server';

const YT_URL_RE = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)[\w\-]{11}/;

const THUMB_RESOLUTIONS = [
  { label: 'Max Resolution (1280×720)', key: 'maxresdefault', width: 1280, height: 720 },
  { label: 'High Quality (480×360)', key: 'hqdefault', width: 480, height: 360 },
  { label: 'Medium Quality (320×180)', key: 'mqdefault', width: 320, height: 180 },
  { label: 'Standard (120×90)', key: 'default', width: 120, height: 90 },
];

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:embed\/|shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    const trimmed = url.trim();
    if (!YT_URL_RE.test(trimmed)) return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });

    const videoId = extractVideoId(trimmed);
    if (!videoId) return NextResponse.json({ error: 'Could not extract video ID' }, { status: 400 });

    const thumbnails = THUMB_RESOLUTIONS.map((r) => ({
      ...r,
      url: `https://i.ytimg.com/vi/${videoId}/${r.key}.jpg`,
    }));

    return NextResponse.json({ videoId, thumbnails });
  } catch {
    return NextResponse.json({ error: 'Failed to process URL.' }, { status: 500 });
  }
}

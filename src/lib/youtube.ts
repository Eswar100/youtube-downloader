import { spawn } from 'child_process';
import { VideoAnalysisResult, MediaFormatOption, ThumbnailOption } from './types';

function formatSeconds(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatBytes(bytes?: number | null): string {
  if (!bytes || bytes <= 0 || isNaN(bytes)) {
    return 'Size varies';
  }
  const mb = bytes / (1024 * 1024);
  if (mb < 1) {
    return `~${(bytes / 1024).toFixed(0)} KB`;
  }
  return `~${mb.toFixed(1)} MB`;
}

interface RawYtDlpFormat {
  format_id: string;
  ext: string;
  resolution?: string;
  width?: number;
  height?: number;
  fps?: number;
  filesize?: number;
  filesize_approx?: number;
  vcodec?: string;
  acodec?: string;
  abr?: number;
  vbr?: number;
  tbr?: number;
  url?: string;
  format_note?: string;
}

interface RawYtDlpInfo {
  id: string;
  title: string;
  uploader?: string;
  uploader_url?: string;
  channel?: string;
  channel_url?: string;
  duration?: number;
  thumbnail?: string;
  formats?: RawYtDlpFormat[];
  availability?: string;
}

/**
 * Fetch video metadata via yt-dlp child process with strict timeout
 */
async function fetchViaYtDlp(videoId: string): Promise<RawYtDlpInfo> {
  return new Promise((resolve, reject) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const pyProcess = spawn('python', [
      '-m',
      'yt_dlp',
      '--dump-single-json',
      '--no-warnings',
      '--no-playlist',
      '--no-check-certificates',
      '--socket-timeout',
      '10',
      videoUrl,
    ]);

    let stdoutData = '';
    let stderrData = '';

    const timeout = setTimeout(() => {
      pyProcess.kill('SIGTERM');
      reject(new Error('Processing request timed out. Please try again.'));
    }, 15000);

    pyProcess.stdout.on('data', (chunk) => {
      stdoutData += chunk.toString();
    });

    pyProcess.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    pyProcess.on('close', (code) => {
      clearTimeout(timeout);
      if (code === 0 && stdoutData.trim()) {
        try {
          const parsed = JSON.parse(stdoutData.trim()) as RawYtDlpInfo;
          resolve(parsed);
        } catch {
          reject(new Error('Failed to parse video format information.'));
        }
      } else {
        const errorLower = stderrData.toLowerCase();
        if (
          errorLower.includes('private') ||
          errorLower.includes('members-only') ||
          errorLower.includes('login') ||
          errorLower.includes('sign in') ||
          errorLower.includes('restricted') ||
          errorLower.includes('drm')
        ) {
          reject(
            new Error(
              'This video is private, restricted, or requires authentication. YouMate does not bypass access controls or private content.'
            )
          );
        } else if (errorLower.includes('unavailable') || errorLower.includes('not exist')) {
          reject(new Error('This video is unavailable or has been removed from YouTube.'));
        } else {
          reject(new Error(stderrData.trim() || 'Could not retrieve video information.'));
        }
      }
    });

    pyProcess.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * Public oEmbed fallback for metadata when quick inspection or resilience is needed
 */
async function fetchViaOEmbed(videoId: string): Promise<{ title: string; author_name: string; author_url: string; thumbnail_url: string }> {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const res = await fetch(oembedUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) YouMate/1.0' },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Video not found. Please confirm the link is publicly accessible.');
    }
    throw new Error('Unable to query public metadata from YouTube.');
  }

  return res.json();
}

/**
 * Main service method to analyze a YouTube video
 */
export async function analyzeYouTubeVideo(videoId: string): Promise<VideoAnalysisResult> {
  const complianceNotice =
    'Only download content you own or have permission to use. Respect the rights of content creators and the platform’s terms.';

  const thumbnails: ThumbnailOption[] = [
    {
      quality: 'maxres',
      label: 'Maximum Resolution (HD)',
      resolution: '1280x720',
      url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      width: 1280,
      height: 720,
    },
    {
      quality: 'high',
      label: 'High Quality',
      resolution: '640x480',
      url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      width: 640,
      height: 480,
    },
    {
      quality: 'medium',
      label: 'Medium Quality',
      resolution: '320x180',
      url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      width: 320,
      height: 180,
    },
    {
      quality: 'default',
      label: 'Standard Thumbnail',
      resolution: '120x90',
      url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
      width: 120,
      height: 90,
    },
  ];

  // Try yt-dlp first for deep stream analysis
  try {
    const raw = await fetchViaYtDlp(videoId);
    const rawFormats = raw.formats || [];

    const formatList: MediaFormatOption[] = [];
    const seenQualities = new Set<string>();

    // 1. Progressive MP4 streams (Audio + Video combined)
    const progressiveMp4s = rawFormats.filter(
      (f) =>
        f.ext === 'mp4' &&
        f.vcodec &&
        f.vcodec !== 'none' &&
        f.acodec &&
        f.acodec !== 'none'
    );

    for (const f of progressiveMp4s) {
      const q = f.height ? `${f.height}p` : f.format_note || 'Standard';
      const key = `mp4_prog_${q}`;
      if (!seenQualities.has(key)) {
        seenQualities.add(key);
        formatList.push({
          id: f.format_id,
          format: 'MP4',
          quality: q,
          resolution: f.width && f.height ? `${f.width}x${f.height}` : undefined,
          approxSize: formatBytes(f.filesize || f.filesize_approx),
          type: 'video',
          hasAudio: true,
          downloadUrl: f.url,
          fps: f.fps,
          note: 'Video + Audio',
        });
      }
    }

    // 2. All available video streams (1080p, 720p, 480p, 360p, etc.)
    const videoStreams = rawFormats
      .filter((f) => f.vcodec && f.vcodec !== 'none' && f.height)
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    for (const f of videoStreams) {
      const q = `${f.height}p`;
      const key = `mp4_video_${q}`;
      if (!seenQualities.has(key) && formatList.length < 12) {
        seenQualities.add(key);
        formatList.push({
          id: f.format_id,
          format: f.ext.toUpperCase() === 'WEBM' ? 'WEBM' : 'MP4',
          quality: `${q}${f.fps && f.fps > 30 ? ` ${f.fps}fps` : ''}`,
          resolution: f.width && f.height ? `${f.width}x${f.height}` : undefined,
          approxSize: formatBytes(f.filesize || f.filesize_approx),
          type: f.acodec && f.acodec !== 'none' ? 'video' : 'video',
          hasAudio: !!(f.acodec && f.acodec !== 'none'),
          downloadUrl: f.url,
          fps: f.fps,
          note: f.acodec && f.acodec !== 'none' ? 'Video + Audio' : 'Direct MP4 Stream',
        });
      }
    }

    // 3. Audio stream options (legally permitted audio extraction)
    const audioStreams = rawFormats
      .filter((f) => f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none'))
      .sort((a, b) => (b.abr || 0) - (a.abr || 0));

    if (audioStreams.length > 0) {
      const bestAudio = audioStreams[0];
      formatList.push({
        id: bestAudio.format_id,
        format: bestAudio.ext.toUpperCase() === 'M4A' ? 'M4A' : 'MP3',
        quality: bestAudio.abr ? `~${Math.round(bestAudio.abr)} kbps` : 'Audio (High Quality)',
        approxSize: formatBytes(bestAudio.filesize || bestAudio.filesize_approx),
        type: 'audio',
        hasAudio: true,
        downloadUrl: bestAudio.url,
        note: 'Audio Only',
      });
    }

    // Ensure fallback formats if none matched
    if (formatList.length === 0) {
      formatList.push({
        id: 'standard_mp4',
        format: 'MP4',
        quality: '720p',
        approxSize: 'Size varies',
        type: 'video',
        hasAudio: true,
        note: 'Standard definition',
      });
    }

    return {
      videoId,
      title: raw.title || 'YouTube Video',
      author: raw.channel || raw.uploader || 'Creator',
      authorUrl: raw.channel_url || raw.uploader_url,
      durationSeconds: raw.duration || 0,
      formattedDuration: formatSeconds(raw.duration || 0),
      thumbnailUrl: raw.thumbnail || thumbnails[0].url,
      thumbnails,
      sourcePlatform: 'YouTube',
      formats: formatList,
      complianceNotice,
    };
  } catch (ytDlpError: any) {
    const msg = ytDlpError?.message || '';
    if (
      msg.includes('private') ||
      msg.includes('restricted') ||
      msg.includes('DRM') ||
      msg.includes('unavailable')
    ) {
      throw ytDlpError;
    }

    // Otherwise, attempt oEmbed fallback
    try {
      const oembed = await fetchViaOEmbed(videoId);
      return {
        videoId,
        title: oembed.title,
        author: oembed.author_name,
        authorUrl: oembed.author_url,
        durationSeconds: 0,
        formattedDuration: 'Available',
        thumbnailUrl: thumbnails[0].url,
        thumbnails,
        sourcePlatform: 'YouTube',
        formats: [
          {
            id: 'mp4_720',
            format: 'MP4',
            quality: '720p',
            approxSize: 'Size varies',
            type: 'video',
            hasAudio: true,
            note: 'Standard HD',
          },
          {
            id: 'mp4_360',
            format: 'MP4',
            quality: '360p',
            approxSize: 'Size varies',
            type: 'video',
            hasAudio: true,
            note: 'Compact',
          },
          {
            id: 'audio_m4a',
            format: 'M4A',
            quality: 'Audio Stream',
            approxSize: 'Size varies',
            type: 'audio',
            hasAudio: true,
            note: 'Audio Only',
          },
        ],
        complianceNotice,
      };
    } catch {
      throw new Error(
        'Could not process this video. Please verify the URL and confirm the video is public and unrestricted.'
      );
    }
  }
}

/**
 * YouMate Security & URL Validation Utility
 * Enforces strict host allowlist, prevents SSRF, and validates YouTube Video IDs.
 */

// Host allowlist strictly for legitimate YouTube domains
const ALLOWED_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtu.be',
  'www.youtu.be'
]);

// In-memory rate limiter (25 requests per 60 seconds per IP)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(clientIp: string, limit = 25, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

export interface ValidationResult {
  valid: boolean;
  videoId?: string;
  normalizedUrl?: string;
  error?: string;
}

/**
 * Validates user-submitted YouTube URL
 * Rejects SSRF vectors, localhost, internal network, and non-YouTube hosts
 */
export function validateYouTubeUrl(inputUrl: string): ValidationResult {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return { valid: false, error: 'Please enter a valid YouTube video URL.' };
  }

  const trimmed = inputUrl.trim();
  if (trimmed.length > 500) {
    return { valid: false, error: 'URL is too long. Please provide a standard YouTube link.' };
  }

  // Prepend protocol if omitted
  let parsedUrl: URL;
  try {
    const urlToParse = trimmed.startsWith('http://') || trimmed.startsWith('https://') 
      ? trimmed 
      : `https://${trimmed}`;
    parsedUrl = new URL(urlToParse);
  } catch {
    return { valid: false, error: 'Invalid URL format. Please paste a full YouTube video link.' };
  }

  // Host validation
  const hostname = parsedUrl.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(hostname)) {
    return {
      valid: false,
      error: 'Unsupported platform. YouMate only processes links from youtube.com and youtu.be.'
    };
  }

  // Reject local/internal IPs or loopback disguised in hostname
  if (/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|169\.254\.)/i.test(hostname)) {
    return { valid: false, error: 'Security violation: internal or local network URLs are rejected.' };
  }

  let videoId: string | null = null;

  if (hostname === 'youtu.be' || hostname === 'www.youtu.be') {
    // Format: https://youtu.be/VIDEO_ID
    const pathname = parsedUrl.pathname.replace(/^\/+/, '');
    const candidate = pathname.split('/')[0]?.split('?')[0];
    if (candidate) videoId = candidate;
  } else {
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    // Or: https://www.youtube.com/shorts/VIDEO_ID
    // Or: https://www.youtube.com/embed/VIDEO_ID
    if (parsedUrl.searchParams.has('v')) {
      videoId = parsedUrl.searchParams.get('v');
    } else if (parsedUrl.pathname.startsWith('/shorts/')) {
      const parts = parsedUrl.pathname.split('/');
      videoId = parts[2] || null;
    } else if (parsedUrl.pathname.startsWith('/embed/')) {
      const parts = parsedUrl.pathname.split('/');
      videoId = parts[2] || null;
    }
  }

  if (!videoId) {
    return {
      valid: false,
      error: 'Could not extract a valid YouTube video ID from the provided link.'
    };
  }

  // Standard YouTube video IDs are strictly 11 alphanumeric characters plus - and _
  const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  if (!videoIdRegex.test(videoId)) {
    return {
      valid: false,
      error: 'Invalid YouTube video ID format detected.'
    };
  }

  return {
    valid: true,
    videoId,
    normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`
  };
}

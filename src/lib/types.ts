/**
 * Type definitions for media formats and analysis responses
 */

export interface MediaFormatOption {
  id: string;
  format: 'MP4' | 'WEBM' | 'MP3' | 'M4A';
  quality: string;           // e.g. "1080p", "720p", "480p", "360p", "128kbps", "Audio (HQ)"
  resolution?: string;       // e.g. "1920x1080"
  approxSize: string;        // e.g. "~45.2 MB" or "Size varies"
  type: 'video' | 'audio' | 'video_only';
  hasAudio: boolean;
  downloadUrl?: string;
  streamUrl?: string;
  fps?: number;
  note?: string;
}

export interface ThumbnailOption {
  quality: 'maxres' | 'high' | 'medium' | 'default';
  label: string;
  resolution: string;
  url: string;
  width: number;
  height: number;
}

export interface VideoAnalysisResult {
  videoId: string;
  title: string;
  author: string;
  authorUrl?: string;
  durationSeconds: number;
  formattedDuration: string;
  thumbnailUrl: string;
  thumbnails: ThumbnailOption[];
  sourcePlatform: 'YouTube';
  formats: MediaFormatOption[];
  isRestricted?: boolean;
  complianceNotice: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

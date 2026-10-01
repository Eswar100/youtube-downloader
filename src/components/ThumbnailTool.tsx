'use client';

import React, { useState } from 'react';
import { validateYouTubeUrl } from '@/lib/validation';

export default function ThumbnailTool() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = (e?: React.FormEvent, customUrl?: string) => {
    if (e) e.preventDefault();
    const target = (customUrl !== undefined ? customUrl : url).trim();

    if (!target) {
      setError('Please paste a YouTube URL to extract thumbnails.');
      return;
    }

    const validation = validateYouTubeUrl(target);
    if (!validation.valid || !validation.videoId) {
      setError(validation.error || 'Please enter a valid YouTube video link.');
      setVideoId(null);
      return;
    }

    setError(null);
    setVideoId(validation.videoId);
  };

  const resolutions = [
    {
      quality: 'maxres',
      name: 'Maximum Resolution (HD)',
      resolution: '1280 x 720 px',
      desc: 'Crisp 720p HD resolution. Best for presentations, wallpapers, and design assets.',
      badge: 'Best Quality',
      filename: 'maxresdefault.jpg',
    },
    {
      quality: 'high',
      name: 'High Quality (HQ)',
      resolution: '640 x 480 px',
      desc: 'Standard high-definition cover format supported on 100% of YouTube uploads.',
      badge: 'Universal',
      filename: 'hqdefault.jpg',
    },
    {
      quality: 'medium',
      name: 'Medium Quality (MQ)',
      resolution: '320 x 180 px',
      desc: 'Compact 16:9 thumbnail format. Great for blog cards and quick previews.',
      badge: 'Compact',
      filename: 'mqdefault.jpg',
    },
    {
      quality: 'default',
      name: 'Standard Default',
      resolution: '120 x 90 px',
      desc: 'Small thumbnail size used for mobile search lists and low bandwidth.',
      badge: 'Small',
      filename: 'default.jpg',
    },
  ];

  return (
    <div className="thumbnail-tool-wrap">
      <div className="tool-box">
        <form onSubmit={handleExtract}>
          <div className="input-group">
            <input
              type="url"
              className="url-input"
              placeholder="Paste YouTube link (e.g. https://www.youtube.com/watch?v=...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="YouTube video URL for thumbnail extraction"
              required
            />
            <button type="submit" className="btn-primary" id="extract-thumbnail-btn">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Get Thumbnails
            </button>
          </div>
        </form>

        <div className="sample-pills">
          <span>Quick test:</span>
          <button
            type="button"
            className="sample-pill-btn"
            onClick={() => {
              const testUrl = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
              setUrl(testUrl);
              handleExtract(undefined, testUrl);
            }}
          >
            Me at the zoo sample
          </button>
        </div>
      </div>

      {error && (
        <div className="error-card" role="alert" style={{ marginTop: '1.5rem' }}>
          <span>{error}</span>
        </div>
      )}

      {videoId && (
        <div style={{ marginTop: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Available Thumbnail Resolutions</h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Video ID: <code>{videoId}</code>
            </span>
          </div>

          <div className="thumbnail-grid">
            {resolutions.map((res) => {
              const previewSrc = `https://img.youtube.com/vi/${videoId}/${res.filename}`;
              const downloadUrl = `/api/thumbnail?id=${videoId}&quality=${res.quality}`;

              return (
                <div key={res.quality} className="thumbnail-card">
                  <div className="thumbnail-preview-wrap">
                    <img
                      src={previewSrc}
                      alt={`YouTube thumbnail ${res.name}`}
                      className="thumbnail-preview-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="thumbnail-meta">
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '4px',
                        }}
                      >
                        <h4 className="thumbnail-label">{res.name}</h4>
                        <span className="format-badge mp4">{res.badge}</span>
                      </div>
                      <p className="thumbnail-res">{res.resolution}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        {res.desc}
                      </p>
                    </div>

                    <a
                      href={downloadUrl}
                      download={`youtube_thumbnail_${videoId}_${res.quality}.jpg`}
                      className="btn-download-action"
                      style={{ justifyContent: 'center', width: '100%', textDecoration: 'none' }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Image
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

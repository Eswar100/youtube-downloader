'use client';

import React, { useState } from 'react';
import { VideoAnalysisResult, MediaFormatOption } from '@/lib/types';

interface AnalyzerToolProps {
  initialUrl?: string;
  autoFocus?: boolean;
}

export default function AnalyzerTool({ initialUrl = '', autoFocus = false }: AnalyzerToolProps) {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');

  const handleAnalyze = async (e?: React.FormEvent, customUrl?: string) => {
    if (e) e.preventDefault();
    const targetUrl = (customUrl !== undefined ? customUrl : url).trim();

    if (!targetUrl) {
      setError('Please paste a YouTube URL to begin.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(
          json.error ||
            'We could not process this URL. Please verify that the video is public and that you have permission to download it.'
        );
      }

      setResult(json.data);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'A network error occurred while processing the request.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text);
          handleAnalyze(undefined, text);
        }
      }
    } catch {
      // Fallback
    }
  };

  const triggerDownload = (format: MediaFormatOption) => {
    if (!result) return;
    if (format.downloadUrl) {
      const ext = format.format.toLowerCase() === 'mp3' ? 'mp3' : format.format.toLowerCase();
      const downloadEndpoint = `/api/download?url=${encodeURIComponent(
        format.downloadUrl
      )}&title=${encodeURIComponent(result.title)}&ext=${ext}`;
      window.location.href = downloadEndpoint;
    } else {
      alert('Selected stream is being prepared. Please try another resolution if download does not trigger.');
    }
  };

  const videoFormats = result?.formats.filter((f) => f.type === 'video' || f.type === 'video_only') || [];
  const audioFormats = result?.formats.filter((f) => f.type === 'audio') || [];

  return (
    <div className="analyzer-tool-container">
      {/* Main Hero Input Card */}
      <div className="tool-box">
        <form onSubmit={handleAnalyze} className="tool-form">
          <div className="input-group">
            <input
              type="url"
              className="url-input"
              placeholder="Paste YouTube URL (e.g. https://www.youtube.com/watch?v=...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus={autoFocus}
              disabled={loading}
              aria-label="YouTube video URL"
              required
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              id="analyze-submit-button"
            >
              {loading ? (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animation: 'spin 1s linear infinite' }}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
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
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Analyze
                </>
              )}
            </button>
          </div>
        </form>

        {/* Small privacy/security statement below input */}
        <div className="tool-meta-statement">
          <span>No registration required</span>
          <span className="tool-meta-dot">•</span>
          <span>Fast processing</span>
          <span className="tool-meta-dot">•</span>
          <span>Mobile friendly</span>
        </div>

        {/* Quick sample pills for seamless testing */}
        <div className="sample-pills">
          <span>Try public sample:</span>
          <button
            type="button"
            className="sample-pill-btn"
            onClick={() => {
              const sample = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';
              setUrl(sample);
              handleAnalyze(undefined, sample);
            }}
          >
            Me at the zoo (First YouTube Video)
          </button>
          <button
            type="button"
            className="sample-pill-btn"
            onClick={handlePaste}
            title="Paste from your clipboard"
          >
            📋 Paste from Clipboard
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="error-card" role="alert">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, marginTop: '2px' }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <strong>Processing Notice:</strong> {error}
          </div>
        </div>
      )}

      {/* Result Card when processed */}
      {result && (
        <div className="result-card" id="analysis-result-card">
          <div className="result-header">
            <div className="result-thumb-wrap">
              <img
                src={result.thumbnailUrl}
                alt={result.title}
                className="result-thumb"
                loading="eager"
              />
              <span className="duration-badge">{result.formattedDuration}</span>
            </div>
            <div className="result-info">
              <span className="result-platform-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                {result.sourcePlatform}
              </span>
              <h3 className="result-title">{result.title}</h3>
              <p className="result-author">By: {result.author}</p>
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="compliance-box">
            <svg
              className="compliance-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div>
              <strong>Copyright Compliance:</strong> {result.complianceNotice}
            </div>
          </div>

          {/* Tab Selection */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem 1.5rem 0',
              borderBottom: '1px solid var(--card-border)',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem 0.25rem',
                borderBottom: activeTab === 'video' ? '2.5px solid var(--brand-primary)' : '2.5px solid transparent',
                color: activeTab === 'video' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'video' ? 700 : 500,
                cursor: 'pointer',
                fontSize: '0.9375rem',
              }}
            >
              Video Formats ({videoFormats.length})
            </button>
            {audioFormats.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('audio')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 0.25rem',
                  borderBottom:
                    activeTab === 'audio' ? '2.5px solid var(--brand-primary)' : '2.5px solid transparent',
                  color: activeTab === 'audio' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: activeTab === 'audio' ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.9375rem',
                }}
              >
                Audio Extraction ({audioFormats.length})
              </button>
            )}
          </div>

          {/* Formats Table */}
          <div className="formats-table-wrap">
            <table className="formats-table">
              <thead>
                <tr>
                  <th>Format</th>
                  <th>Quality / Resolution</th>
                  <th>Approx. Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'video' ? videoFormats : audioFormats).map((item) => (
                  <tr key={item.id + item.quality}>
                    <td>
                      <span className={`format-badge ${item.format.toLowerCase()}`}>
                        {item.format}
                      </span>
                    </td>
                    <td>
                      <strong>{item.quality}</strong>
                      {item.note && (
                        <span
                          style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            marginTop: '2px',
                          }}
                        >
                          {item.note}
                        </span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.875rem' }}>{item.approxSize}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-download-action"
                        onClick={() => triggerDownload(item)}
                        aria-label={`Download ${item.format} ${item.quality}`}
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
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

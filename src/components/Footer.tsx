import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div>
            <Link href="/" className="brand-link" aria-label="YouMate Home">
              <svg
                className="brand-logo-icon"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="footVpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF1A4B" />
                    <stop offset="100%" stopColor="#C5002C" />
                  </linearGradient>
                </defs>
                <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#footVpGrad)" />
                <path d="M26 20L44 32L26 44V20Z" fill="#FFFFFF" />
                <path
                  d="M48 24C49.8 26.2 51 29 51 32C51 35 49.8 37.8 48 40"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />
              </svg>
              <span>
                You<span className="brand-accent">Mate</span>
              </span>
            </Link>
            <p className="footer-brand-desc">
              High-speed, privacy-first web utility for analyzing and downloading permitted YouTube video,
              audio, and high-definition thumbnail media.
            </p>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="footer-col-title">Utilities</h4>
            <ul className="footer-nav-list">
              <li>
                <Link href="/youtube-downloader" className="footer-nav-link">
                  YouTube Downloader
                </Link>
              </li>
              <li>
                <Link href="/youtube-video-downloader" className="footer-nav-link">
                  Video Downloader
                </Link>
              </li>
              <li>
                <Link href="/youtube-thumbnail-downloader" className="footer-nav-link">
                  Thumbnail Downloader
                </Link>
              </li>
              <li>
                <Link href="/how-to-download" className="footer-nav-link">
                  How to Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-nav-list">
              <li>
                <Link href="/faq" className="footer-nav-link">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/how-to-download" className="footer-nav-link">
                  Supported Resolutions
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-nav-link">
                  About YouMate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-nav-link">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="footer-col-title">Legal & Trust</h4>
            <ul className="footer-nav-list">
              <li>
                <Link href="/privacy-policy" className="footer-nav-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-nav-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="footer-nav-link">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="footer-nav-link">
                  Copyright / DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Required compliance disclaimer banner */}
        <div className="footer-disclaimer-card">
          <p>
            <strong>Mandatory Compliance Notice:</strong> This service is intended for processing content that you own
            or have permission to use. Users are responsible for respecting copyright, applicable laws, and platform
            terms. YouMate is an independent software tool and is not affiliated with, endorsed by, or sponsored by
            YouTube, Google LLC, or Alphabet Inc.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} YouMate. All rights reserved. Fast & Simple Media Utility.</p>
          <p>Built with privacy, accessibility, and Core Web Vitals standards.</p>
        </div>
      </div>
    </footer>
  );
}

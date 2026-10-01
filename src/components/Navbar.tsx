'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'YouTube Downloader', href: '/youtube-downloader' },
    { label: 'Video Downloader', href: '/youtube-video-downloader' },
    { label: 'Thumbnail Downloader', href: '/youtube-thumbnail-downloader' },
    { label: 'How It Works', href: '/how-to-download' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="site-header">
      <div className="container">
        <div className="nav-wrap">
          <Link href="/" className="brand-link" aria-label="YouMate Home">
            <svg
              className="brand-logo-icon"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="navVpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF1A4B" />
                  <stop offset="100%" stopColor="#C5002C" />
                </linearGradient>
              </defs>
              <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#navVpGrad)" />
              <path d="M26 20L44 32L26 44V20Z" fill="#FFFFFF" />
              <path
                d="M48 24C49.8 26.2 51 29 51 32C51 35 49.8 37.8 48 40"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
              <path
                d="M16 27C15.2 28.5 14.8 30.2 14.8 32C14.8 33.8 15.2 35.5 16 37"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.75"
              />
            </svg>
            <span>
              You<span className="brand-accent">Mate</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-item-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/youtube-downloader"
                className="nav-cta"
                onClick={() => setMobileOpen(false)}
              >
                Start Utility
              </Link>
            </li>
          </ul>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

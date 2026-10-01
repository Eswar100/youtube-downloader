# YouMate - YouTube Video Utility & Media Downloader

YouMate is a modern, fast, responsive, and SEO-friendly web application for analyzing, inspecting, and processing permitted YouTube video, audio, and high-definition thumbnail media. Built with Next.js (App Router), TypeScript, and a high-performance Vanilla CSS design system, YouMate is fully optimized for long-term usability, accessibility, and Google AdSense monetization readiness.

---

## 🚀 Key Features

* **Real Stream & Format Inspection:** Extracts actual progressive MP4 video streams (1080p, 720p, 480p, 360p), audio tracks (M4A/MP3), and accurate file sizes (or displays "Size varies" when indeterminable).
* **HD Thumbnail Downloader:** Instant visual extraction and one-click direct download of 1280x720 (Max Resolution HD), 640x480 (HQ), 320x180 (MQ), and 120x90 covers.
* **Strict Legal & Copyright Compliance:** Does **NOT** bypass DRM, access controls, private videos, or YouTube authentication paywalls. Enforces permission notices and includes a complete DMCA/Copyright policy.
* **Google AdSense-Ready Architecture:** Clean, designated ad containers (`leaderboard`, `rectangle`, `mobile-banner`) clearly marked with "Advertisement" and visually isolated from interactive download buttons.
* **SSRF Defense & Security Allowlist:** Validates URLs against an explicit YouTube host allowlist (`youtube.com`, `youtu.be`) and applies client IP rate limiting.
* **Full Semantic SEO Structure:** Page-specific metadata, OpenGraph cards, Twitter cards, canonical tags, `sitemap.xml`, `robots.txt`, and Schema.org JSON-LD structured data (`WebSite`, `WebApplication`, `FAQPage`, `BreadcrumbList`).
* **Universal Responsiveness:** Mobile-first architecture supporting iOS (Safari + Files app), Android, macOS, Windows, and Linux.

---

## 📁 Website Route Structure

| Route | Purpose | Features |
| :--- | :--- | :--- |
| `/` | Main Landing Page | Hero input, instant analyzer, result card, workflow steps, features, AdSense slots, FAQ snippet |
| `/youtube-downloader` | Dedicated SEO Utility | In-depth guide, format table, live tool, legitimate use cases |
| `/youtube-video-downloader` | Video & Codec Guide | Audio/video multiplexing, codec breakdown (H.264/AVC, VP9, AV1), device advice |
| `/youtube-thumbnail-downloader` | Thumbnail Extractor | Live preview grid, 1280x720 HD downloads, dimension specs |
| `/how-to-download` | Educational Guide | Step-by-step device guides for Windows, Mac, Android, and iOS Safari |
| `/faq` | Frequently Asked Questions | 10+ detailed Q&As with Schema.org `FAQPage` JSON-LD |
| `/about` | About YouMate | Mission, engineering principles, independent brand declaration |
| `/contact` | Contact & Inquiries | Interactive validated contact form with category selector |
| `/privacy-policy` | Privacy Policy | Zero media retention, server logs, AdSense cookies, GDPR & CCPA notices |
| `/terms` | Terms of Service | Acceptable use rules, user copyright warranties, limitations of liability |
| `/disclaimer` | Website Disclaimer | Non-affiliation with YouTube/Google LLC, no DRM circumvention |
| `/copyright` | Copyright / DMCA | Formal 17 U.S.C. 512(c)(3) takedown process, designated DMCA agent |
| `/robots.txt` | Crawler Instructions | Directs search engines to public pages and sitemap |
| `/sitemap.xml` | Search Engine Sitemap | Complete XML sitemap with daily/weekly change frequencies |

---

## 🛠️ Technology Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript 5
* **Styling:** Vanilla CSS (`globals.css`) with custom properties, responsive breakpoints, and dark mode tokens
* **Processing Engine:** Python `yt-dlp` with graceful public oEmbed fallback
* **Security & Network:** In-memory rate limiting, SSRF input sanitization, and strict Google Video CDN origin validation

---

## 📦 Getting Started

### Prerequisites

1. **Node.js:** v18.0.0 or later (v24+ recommended)
2. **Python:** 3.10+ with `yt-dlp` installed:
   ```bash
   python -m pip install --upgrade yt-dlp
   ```

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd youtube-downloader
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Security & Compliance Architecture

```
User Browser (Frontend UI)
       │
       ▼
Next.js API Route (/api/analyze)
       │
       ▼
Validation & Security Layer (src/lib/validation.ts)
  • Hostname allowlist: youtube.com, youtu.be
  • SSRF prevention: Rejects private IPs / loopback
  • Regex validation: /^[a-zA-Z0-9_-]{11}$/
  • IP rate limiting: 25 requests/min
       │
       ▼
Processing Engine (src/lib/youtube.ts)
  • Primary: python -m yt_dlp --dump-single-json (timed out at 15s)
  • Fallback: YouTube public oEmbed endpoint
  • Compliance filter: Private, restricted, or DRM content rejected
       │
       ▼
Format Information & Direct Downloads (/api/download, /api/thumbnail)
  • Safe Google Video CDN proxying with Content-Disposition headers
```

---

## 📄 License

This project is released under the MIT License for educational and personal utility purposes.

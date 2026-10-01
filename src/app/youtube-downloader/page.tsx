import type { Metadata } from 'next';
import AnalyzerTool from '@/components/AnalyzerTool';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdBanner from '@/components/AdBanner';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'YouTube Downloader – Download YouTube Videos Free Online',
  description:
    'Free YouTube video downloader online. Paste a YouTube URL and download MP4 in 1080p, 720p, or 480p. Fast, secure, no software needed.',
  alternates: { canonical: '/youtube-downloader' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'YouTube Downloader', url: '/youtube-downloader' },
];

const faqs = [
  {
    question: 'Can I download any YouTube video?',
    answer: 'You can only download videos you own or have explicit permission to download. This tool respects copyright and YouTube ToS.',
  },
  {
    question: 'What is the best quality available?',
    answer: 'Most publicly available YouTube videos can be downloaded in up to 1080p MP4 where a progressive stream exists.',
  },
  {
    question: 'Does YouMate store my downloads?',
    answer: 'No. All processing is ephemeral. Files are never stored permanently on our servers.',
  },
  {
    question: 'Is there a download limit?',
    answer: 'There are no hard limits for personal use, but please use responsibly.',
  },
];

export default function YouTubeDownloaderPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `https://youmate.org${b.url}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">YouTube Downloader</h1>
          <p className="page-subtitle">
            Paste a YouTube URL below to analyze the video and download it in your preferred format. Fast, free, no sign-up.
          </p>
        </div>
      </section>

      <section className="tool-section">
        <div className="container">
          <AnalyzerTool />
        </div>
      </section>

      <AdBanner slotType="rectangle" />

      <section className="content-section">
        <div className="container content-narrow">
          <h2>How to Download YouTube Videos with YouMate</h2>
          <p>
            YouMate makes downloading YouTube videos simple. All you need is the video URL and a few clicks.
            Our tool uses the industry-standard <strong>yt-dlp</strong> engine under the hood for reliable, fast extraction.
          </p>
          <ol className="styled-list">
            <li>Navigate to the YouTube video you want to download.</li>
            <li>Copy the URL from your browser&apos;s address bar (e.g., <code>https://www.youtube.com/watch?v=...</code>).</li>
            <li>Paste it into the input field above and click <strong>Analyze</strong>.</li>
            <li>Select your preferred format from the list (MP4 1080p, 720p, audio, etc.).</li>
            <li>Click <strong>Download</strong> — the file saves directly to your device.</li>
          </ol>
          <p className="disclaimer-note">
            ⚠️ Only download content you own or have legal rights to download. Downloading copyrighted videos without
            authorization violates YouTube&apos;s Terms of Service and applicable copyright law.
          </p>
        </div>
      </section>

      <section className="faq-section">
        <div className="container content-narrow">
          <h2 className="section-title-left">Frequently Asked Questions</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}

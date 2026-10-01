import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdBanner from '@/components/AdBanner';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'How to Download YouTube Videos – Step-by-Step Guide',
  description:
    'Learn how to download YouTube videos online for free using YouMate. Step-by-step guide with screenshots covering video, audio, and thumbnail downloads.',
  alternates: { canonical: '/how-to-download' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'How to Download', url: '/how-to-download' },
];

const faqs = [
  {
    question: 'Do I need to install any software?',
    answer: 'No. YouMate is entirely web-based. You just need a modern browser and an internet connection.',
  },
  {
    question: 'Does it work on iPhone and Android?',
    answer: 'Yes. YouMate is fully responsive and works on all mobile browsers.',
  },
  {
    question: 'How long does a download take?',
    answer: 'Analysis takes 1–3 seconds. The download speed depends on your internet connection and the video file size.',
  },
];

export default function HowToDownloadPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">How to Download YouTube Videos</h1>
          <p className="page-subtitle">
            A complete step-by-step guide to using YouMate to download YouTube videos, audio, and thumbnails for free.
          </p>
        </div>
      </section>

      <AdBanner slotType="leaderboard" />

      <section className="content-section">
        <div className="container content-narrow">
          <h2>Step 1: Find the YouTube Video URL</h2>
          <p>
            Open YouTube in your browser and navigate to the video you want to download. The URL in your
            address bar should look like: <code>https://www.youtube.com/watch?v=XXXXXXXXXXX</code>
          </p>
          <p>
            For YouTube Shorts, the URL will look like: <code>https://www.youtube.com/shorts/XXXXXXXXXXX</code>
          </p>
          <p>You can also copy the link by right-clicking the video and selecting <strong>Copy video URL</strong>.</p>

          <h2>Step 2: Paste the URL Into YouMate</h2>
          <p>
            Go to the <a href="/youtube-downloader">YouTube Downloader</a> page. Paste the URL into the input field
            and click the <strong>Analyze</strong> button (or press Enter).
          </p>
          <p>
            YouMate will fetch the video title, thumbnail, duration, uploader name, and all available download formats in under 3 seconds.
          </p>

          <h2>Step 3: Choose Your Format</h2>
          <p>
            After analysis, you&apos;ll see a list of available formats grouped by type:
          </p>
          <ul className="styled-list">
            <li><strong>Video + Audio (MP4)</strong> — ready-to-play video files at various resolutions</li>
            <li><strong>Audio Only</strong> — extract just the audio track (M4A/WebM)</li>
            <li><strong>Video Only</strong> — raw video stream without audio (for advanced use)</li>
          </ul>
          <p>
            Select the format that best fits your needs. For most users, <strong>MP4 720p or 1080p</strong> is recommended.
          </p>

          <h2>Step 4: Download</h2>
          <p>
            Click the <strong>Download</strong> button next to your chosen format. The file will begin downloading
            directly to your device through your browser&apos;s standard download manager.
          </p>

          <h2>Downloading YouTube Thumbnails</h2>
          <p>
            Visit the <a href="/youtube-thumbnail-downloader">Thumbnail Downloader</a> page, paste a YouTube URL,
            and choose from Max Resolution (1280×720), HQ, MQ, or SD thumbnail sizes.
          </p>

          <div className="info-box">
            <strong>⚠️ Legal Reminder:</strong> Only download content you own or have permission to download.
            Downloading copyrighted videos without authorization is a violation of YouTube&apos;s Terms of Service
            and may violate copyright laws in your jurisdiction.
          </div>
        </div>
      </section>

      <AdBanner slotType="rectangle" />

      <section className="faq-section">
        <div className="container content-narrow">
          <h2 className="section-title-left">Frequently Asked Questions</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}

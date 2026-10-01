import type { Metadata } from 'next';
import AnalyzerTool from '@/components/AnalyzerTool';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdBanner from '@/components/AdBanner';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'YouTube Video Downloader – HD MP4 1080p, 720p Free Download',
  description:
    'Download YouTube videos in HD quality. Choose from 1080p, 720p, 480p MP4 or audio-only. Free YouTube video downloader with no watermarks.',
  alternates: { canonical: '/youtube-video-downloader' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'YouTube Video Downloader', url: '/youtube-video-downloader' },
];

const faqs = [
  {
    question: 'What video qualities are supported?',
    answer: 'Depending on what the video uploader published, you can download in 1080p, 720p, 480p, 360p, or lower. 4K/2K may also be available via separate video-only streams.',
  },
  {
    question: 'Can I download YouTube Shorts?',
    answer: 'Yes! YouTube Shorts URLs (youtube.com/shorts/...) are fully supported.',
  },
  {
    question: 'Will the downloaded video have a watermark?',
    answer: 'No. YouMate downloads the original stream directly — no watermarks are added.',
  },
];

export default function YouTubeVideoDownloaderPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">YouTube Video Downloader</h1>
          <p className="page-subtitle">
            Download YouTube videos in HD — 1080p, 720p, 480p MP4 and more. Free, fast, no software required.
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
          <h2>Download YouTube Videos in HD Quality</h2>
          <p>
            YouMate supports downloading YouTube videos in multiple resolutions directly to your device.
            Our tool analyzes the available streams in real time, giving you a choice of:
          </p>
          <ul className="styled-list">
            <li><strong>1080p Full HD MP4</strong> — best quality for larger screens and editing</li>
            <li><strong>720p HD MP4</strong> — great balance of quality and file size</li>
            <li><strong>480p / 360p MP4</strong> — smaller files for limited storage or data</li>
            <li><strong>Audio-only</strong> — extract the audio track as an M4A or WebM file</li>
          </ul>
          <p className="disclaimer-note">
            ⚠️ Only download videos you own or are authorized to download. Respect creators&apos; rights and YouTube&apos;s Terms of Service.
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

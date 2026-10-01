import type { Metadata } from 'next';
import ThumbnailTool from '@/components/ThumbnailTool';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdBanner from '@/components/AdBanner';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader – Save HD Thumbnails Free',
  description:
    'Download YouTube video thumbnails in max resolution (1280×720) for free. Save HD, HQ, MQ thumbnails instantly — no software needed.',
  alternates: { canonical: '/youtube-thumbnail-downloader' },
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'YouTube Thumbnail Downloader', href: '/youtube-thumbnail-downloader' },
];

const faqs = [
  {
    q: 'What thumbnail resolutions are available?',
    a: 'We provide all 4 YouTube thumbnail sizes: Max (1280×720), HQ (480×360), MQ (320×180), and SD (120×90).',
  },
  {
    q: 'Can I use downloaded thumbnails in my projects?',
    a: 'Thumbnails are subject to the copyright of the original video creator. Only use them where you have permission.',
  },
  {
    q: 'Why does "Max Resolution" show a black image for some videos?',
    a: 'Not all videos have a maxresdefault thumbnail uploaded. In that case, use the HQ version instead.',
  },
];

export default function YouTubeThumbnailDownloaderPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">YouTube Thumbnail Downloader</h1>
          <p className="page-subtitle">
            Save YouTube video thumbnails in full HD quality — 1280×720 and more. Free, instant, no sign-up.
          </p>
        </div>
      </section>

      <section className="tool-section">
        <div className="container">
          <ThumbnailTool />
        </div>
      </section>

      <AdBanner slot="thumbnail-mid" />

      <section className="content-section">
        <div className="container content-narrow">
          <h2>How to Download YouTube Thumbnails</h2>
          <p>
            Every YouTube video has a set of thumbnails stored on YouTube&apos;s CDN. YouMate lets you grab them all in one click:
          </p>
          <ol className="styled-list">
            <li>Copy any YouTube video URL.</li>
            <li>Paste it into the tool above and click <strong>Get Thumbnails</strong>.</li>
            <li>Choose your preferred resolution from the preview grid.</li>
            <li>Click <strong>Download</strong> — the image saves to your device.</li>
          </ol>
          <p>
            Thumbnails are commonly used for video reference, content creation mockups, or organizing your own content library.
            Always respect the creator&apos;s intellectual property when using thumbnails.
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

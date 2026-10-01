import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'FAQ – Frequently Asked Questions | YouMate',
  description:
    'Answers to the most common questions about YouMate: supported formats, download limits, legality, privacy, and more.',
  alternates: { canonical: '/faq' },
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'FAQ', href: '/faq' },
];

const faqs = [
  {
    q: 'Is YouMate free?',
    a: 'Yes. All core features — video analysis, format selection, and downloading — are completely free with no registration.',
  },
  {
    q: 'What YouTube URL formats are supported?',
    a: 'Standard watch URLs (youtube.com/watch?v=...), Shorts (youtube.com/shorts/...), and short links (youtu.be/...) are all supported.',
  },
  {
    q: 'What download formats does YouMate support?',
    a: 'We support MP4 video (multiple resolutions up to 1080p), audio-only M4A/WebM streams, and JPEG thumbnail images.',
  },
  {
    q: 'Is it legal to use YouMate?',
    a: 'Using YouMate is legal for downloading content you own or have explicit permission to download (e.g., your own uploaded videos, Creative Commons content, or licensed material). Downloading copyrighted content without authorization is prohibited.',
  },
  {
    q: 'Does YouMate store my downloads?',
    a: 'No. Downloads are processed ephemerally in memory and temporary files are immediately deleted after being sent to your browser.',
  },
  {
    q: 'Why is the video not downloading?',
    a: 'Some videos may be region-restricted, age-gated, private, or members-only. These cannot be downloaded through YouMate.',
  },
  {
    q: 'Can I download 4K videos?',
    a: '4K (2160p) streams exist on YouTube but are typically separate video-only streams that require merging with audio. This is supported where ffmpeg is available on our server.',
  },
  {
    q: 'Does YouMate work on mobile?',
    a: 'Yes. YouMate is fully responsive and works on iOS and Android mobile browsers.',
  },
  {
    q: 'Why does the thumbnail show a black image?',
    a: 'YouTube does not always generate a "maxresdefault" thumbnail for every video. In that case, select the HQ or MQ thumbnail instead.',
  },
  {
    q: 'How do I report a problem or give feedback?',
    a: 'Please use the Contact page to send us your feedback or report issues. We read every message.',
  },
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">Everything you need to know about YouMate.</p>
        </div>
      </section>

      <AdBanner slot="faq-top" />

      <section className="content-section">
        <div className="container content-narrow">
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}

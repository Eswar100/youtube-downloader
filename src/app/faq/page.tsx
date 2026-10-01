import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'FAQ – Frequently Asked Questions',
  description:
    'Answers to the most common questions about YouMate: supported formats, download limits, legality, privacy, and more.',
  alternates: { canonical: '/faq' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'FAQ', url: '/faq' },
];

const faqs = [
  {
    question: 'Is YouMate free?',
    answer: 'Yes. All core features — video analysis, format selection, and downloading — are completely free with no registration.',
  },
  {
    question: 'What YouTube URL formats are supported?',
    answer: 'Standard watch URLs (youtube.com/watch?v=...), Shorts (youtube.com/shorts/...), and short links (youtu.be/...) are all supported.',
  },
  {
    question: 'What download formats does YouMate support?',
    answer: 'We support MP4 video (multiple resolutions up to 1080p), audio-only M4A/WebM streams, and JPEG thumbnail images.',
  },
  {
    question: 'Is it legal to use YouMate?',
    answer: 'Using YouMate is legal for downloading content you own or have explicit permission to download (e.g., your own uploaded videos, Creative Commons content, or licensed material). Downloading copyrighted content without authorization is prohibited.',
  },
  {
    question: 'Does YouMate store my downloads?',
    answer: 'No. Downloads are processed ephemerally in memory and temporary files are immediately deleted after being sent to your browser.',
  },
  {
    question: 'Why is the video not downloading?',
    answer: 'Some videos may be region-restricted, age-gated, private, or members-only. These cannot be downloaded through YouMate.',
  },
  {
    question: 'Can I download 4K videos?',
    answer: '4K (2160p) streams exist on YouTube but are typically separate video-only streams that require merging with audio. This is supported where ffmpeg is available on our server.',
  },
  {
    question: 'Does YouMate work on mobile?',
    answer: 'Yes. YouMate is fully responsive and works on iOS and Android mobile browsers.',
  },
  {
    question: 'Why does the thumbnail show a black image?',
    answer: 'YouTube does not always generate a "maxresdefault" thumbnail for every video. In that case, select the HQ or MQ thumbnail instead.',
  },
  {
    question: 'How do I report a problem or give feedback?',
    answer: 'Please use the Contact page to send us your feedback or report issues. We read every message.',
  },
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
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

      <AdBanner slotType="leaderboard" />

      <section className="content-section">
        <div className="container content-narrow">
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}

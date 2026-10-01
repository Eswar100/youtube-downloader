import type { Metadata } from 'next';
import Link from 'next/link';
import AnalyzerTool from '@/components/AnalyzerTool';
import AdBanner from '@/components/AdBanner';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Free YouTube Downloader Online | Fast Video Download Tool - YouMate',
  description:
    'Download YouTube videos and audio for free with YouMate. Paste a URL and get MP4, audio, or thumbnail files in seconds. No software required.',
  alternates: { canonical: '/' },
};

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Instant metadata extraction. No waiting — video info appears in under a second.',
  },
  {
    icon: '🎞️',
    title: 'Multiple Formats',
    desc: 'Download in MP4 1080p, 720p, 480p, or extract audio-only streams.',
  },
  {
    icon: '🖼️',
    title: 'Thumbnail Grabber',
    desc: 'Save high-resolution YouTube thumbnails directly to your device.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    desc: 'No data stored on our servers. Processing happens in memory and is discarded immediately.',
  },
  {
    icon: '📱',
    title: 'Works Everywhere',
    desc: 'Fully responsive on desktop, tablet, and mobile. No app installation required.',
  },
  {
    icon: '🆓',
    title: 'Always Free',
    desc: 'Core downloading features remain free forever. No hidden paywalls.',
  },
];

const faqs = [
  {
    q: 'Is YouMate free to use?',
    a: 'Yes. YouMate is completely free for all core features with no registration required.',
  },
  {
    q: 'What formats can I download?',
    a: 'We support MP4 video in various resolutions (1080p, 720p, 480p, 360p) and audio-only streams.',
  },
  {
    q: 'Is it legal to download YouTube videos?',
    a: "You may only download content you own or have explicit permission to download. Downloading copyrighted content without authorization violates YouTube's Terms of Service and applicable laws.",
  },
];

export default function HomePage() {
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

      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>🚀 Fast • Free • No Sign-up</span>
            <h1 id="hero-heading" className={styles.heroTitle}>
              The Smartest <span className="gradient-text">YouTube Downloader</span> Online
            </h1>
            <p className={styles.heroSubtitle}>
              Paste any YouTube URL and download video, audio, or thumbnails in seconds. No software. No limits. No fuss.
            </p>
          </div>
          <AnalyzerTool />
        </div>
      </section>

      {/* AD BANNER */}
      <AdBanner slot="homepage-top" className={styles.adSection} />

      {/* FEATURES */}
      <section className={styles.features} aria-labelledby="features-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="features-heading" className={styles.sectionTitle}>
              Why Choose YouMate?
            </h2>
            <p className={styles.sectionSubtitle}>
              Built for speed, reliability, and privacy — everything a YouTube utility tool should be.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((f) => (
              <article key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon} aria-hidden="true">{f.icon}</div>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <p className={styles.featureCardDesc}>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howItWorks} aria-labelledby="how-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="how-heading" className={styles.sectionTitle}>Download in 3 Easy Steps</h2>
            <p className={styles.sectionSubtitle}>No technical knowledge required.</p>
          </div>
          <ol className={styles.stepsList}>
            <li className={styles.step}>
              <div className={styles.stepNumber} aria-hidden="true">1</div>
              <div>
                <h3 className={styles.stepTitle}>Copy the YouTube URL</h3>
                <p className={styles.stepDesc}>Go to YouTube, open any video you own or have permission to download, and copy the URL from the address bar.</p>
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.stepNumber} aria-hidden="true">2</div>
              <div>
                <h3 className={styles.stepTitle}>Paste &amp; Analyze</h3>
                <p className={styles.stepDesc}>Paste the URL into YouMate. We&apos;ll instantly fetch the video title, thumbnail, duration, and all available format options.</p>
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.stepNumber} aria-hidden="true">3</div>
              <div>
                <h3 className={styles.stepTitle}>Choose Your Format &amp; Download</h3>
                <p className={styles.stepDesc}>Pick your preferred resolution or audio format, then click Download. The file saves directly to your device.</p>
              </div>
            </li>
          </ol>
          <div className={styles.howCta}>
            <Link href="/how-to-download" className="btn btn-outline">
              Full Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* AD BANNER */}
      <AdBanner slot="homepage-mid" className={styles.adSection} />

      {/* TOOLS GRID */}
      <section className={styles.toolsSection} aria-labelledby="tools-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="tools-heading" className={styles.sectionTitle}>All YouMate Tools</h2>
            <p className={styles.sectionSubtitle}>Specialized tools for every YouTube media need.</p>
          </div>
          <div className={styles.toolsGrid}>
            <Link href="/youtube-downloader" className={styles.toolCard}>
              <span className={styles.toolCardIcon}>📥</span>
              <h3 className={styles.toolCardTitle}>YouTube Downloader</h3>
              <p className={styles.toolCardDesc}>Download YouTube videos in MP4 format up to 1080p quality.</p>
              <span className={styles.toolCardCta}>Try Now →</span>
            </Link>
            <Link href="/youtube-video-downloader" className={styles.toolCard}>
              <span className={styles.toolCardIcon}>🎬</span>
              <h3 className={styles.toolCardTitle}>Video Downloader</h3>
              <p className={styles.toolCardDesc}>Select specific video streams and resolutions with advanced options.</p>
              <span className={styles.toolCardCta}>Try Now →</span>
            </Link>
            <Link href="/youtube-thumbnail-downloader" className={styles.toolCard}>
              <span className={styles.toolCardIcon}>🖼️</span>
              <h3 className={styles.toolCardTitle}>Thumbnail Downloader</h3>
              <p className={styles.toolCardDesc}>Save YouTube thumbnails in max resolution (1280×720) for free.</p>
              <span className={styles.toolCardCta}>Try Now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className={styles.faqSection} aria-labelledby="faq-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 id="faq-heading" className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map(({ q, a }) => (
              <div key={q} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{q}</h3>
                <p className={styles.faqAnswer}>{a}</p>
              </div>
            ))}
          </div>
          <div className={styles.howCta}>
            <Link href="/faq" className="btn btn-outline">All FAQs →</Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className={styles.trustStrip} aria-label="Trust indicators">
        <div className="container">
          <div className={styles.trustItems}>
            {['No Sign-up Required', 'SSL Encrypted', 'No Data Stored', '100% Free Core Features', 'DMCA Compliant'].map((t) => (
              <div key={t} className={styles.trustItem}>
                <span className={styles.trustCheck} aria-hidden="true">✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

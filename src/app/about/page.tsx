import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About – YouTube Media Utility Tool',
  description:
    'Learn about YouMate, a fast, free, and privacy-focused YouTube media utility built for creators, researchers, and everyday users.',
  alternates: { canonical: '/about' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">About YouMate</h1>
          <p className="page-subtitle">
            A fast, free, and ethical YouTube media utility — built for creators, learners, and researchers.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="container content-narrow">
          <h2>Our Mission</h2>
          <p>
            YouMate exists to give content owners and authorized users a simple, reliable way to access the media they
            are entitled to. We believe in an open, creator-friendly web — and that means building tools that empower
            people without crossing legal or ethical lines.
          </p>

          <h2>What We Do</h2>
          <p>
            YouMate is a web-based YouTube media utility. Paste a YouTube URL and we&apos;ll analyze the available
            streams, letting you download video, audio, or thumbnail files that you own or have permission to access.
          </p>
          <p>
            Under the hood, we use <strong>yt-dlp</strong> — an open-source, community-maintained media extraction
            library — to reliably fetch stream information from YouTube.
          </p>

          <h2>Privacy First</h2>
          <p>
            We do not require registration. We do not store your downloads. All processing is ephemeral — files are
            generated, sent to your browser, and immediately discarded. We collect no personally identifiable
            information beyond standard server access logs.
          </p>

          <h2>Legal Use Only</h2>
          <p>
            YouMate is designed and intended for legal use only. We do not support or condone the downloading of
            copyrighted content without authorization. Please read our <a href="/copyright">Copyright Policy</a> and
            always ensure you have the right to download any content you access through our tools.
          </p>

          <h2>Contact Us</h2>
          <p>
            Have a question or found a bug? We&apos;d love to hear from you. Visit our <a href="/contact">Contact page</a>.
          </p>
        </div>
      </section>
    </>
  );
}

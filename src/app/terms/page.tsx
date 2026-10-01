import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the YouMate Terms of Service. By using our YouTube media utility, you agree to these terms.',
  alternates: { canonical: '/terms' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Terms of Service', url: '/terms' },
];

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-subtitle">Last updated: October 2026</p>
        </div>
      </section>
      <section className="content-section">
        <div className="container content-narrow legal-content">
          <p>By accessing or using YouMate (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>

          <h2>1. Acceptable Use</h2>
          <p>You may use YouMate only for lawful purposes. You agree NOT to:</p>
          <ul className="styled-list">
            <li>Download copyrighted content without authorization</li>
            <li>Attempt to bypass YouTube access controls, DRM, or paywalls</li>
            <li>Use YouMate for any illegal or harmful activity</li>
            <li>Scrape or abuse our API endpoints beyond reasonable personal use</li>
            <li>Attempt to reverse-engineer or exploit our systems</li>
          </ul>

          <h2>2. No Warranty</h2>
          <p>YouMate is provided &quot;as is&quot; without warranty of any kind. We do not guarantee availability, accuracy, or fitness for any particular purpose.</p>

          <h2>3. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, YouMate and its operators are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>

          <h2>4. Third-Party Services</h2>
          <p>YouMate uses YouTube&apos;s publicly accessible data and the open-source yt-dlp library. We are not affiliated with YouTube or Google. Use of YouTube content is subject to <a href="https://www.youtube.com/static?template=terms" target="_blank" rel="noopener noreferrer">YouTube&apos;s Terms of Service</a>.</p>

          <h2>5. Termination</h2>
          <p>We reserve the right to restrict or terminate access for any user who violates these terms or abuses the service.</p>

          <h2>6. Changes</h2>
          <p>We may update these terms at any time. Continued use constitutes acceptance.</p>

          <h2>7. Governing Law</h2>
          <p>These terms are governed by applicable international law. Disputes will be resolved in the jurisdiction of the Service operator.</p>

          <h2>8. Contact</h2>
          <p>Legal inquiries: <strong>legal@youmate.org</strong></p>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | YouMate',
  description: 'Read the YouMate Privacy Policy to understand how we collect, use, and protect your data.',
  alternates: { canonical: '/privacy-policy' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Last updated: October 2026</p>
        </div>
      </section>
      <section className="content-section">
        <div className="container content-narrow legal-content">
          <p>YouMate (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding that information.</p>

          <h2>1. Information We Collect</h2>
          <p><strong>Usage Data:</strong> We collect standard server access logs including IP addresses, browser user agent, referring URLs, and pages visited. This data is used solely for operational monitoring and abuse prevention.</p>
          <p><strong>No Personal Accounts:</strong> YouMate does not require registration. We do not store usernames, passwords, or email addresses unless you voluntarily contact us.</p>
          <p><strong>Cookies:</strong> We use minimal cookies only for session handling and, if applicable, advertising (see AdSense section below). We do not use tracking cookies for profiling.</p>

          <h2>2. How We Use Your Information</h2>
          <ul className="styled-list">
            <li>To operate and maintain the service</li>
            <li>To detect and prevent abuse or misuse</li>
            <li>To serve relevant advertising (via Google AdSense)</li>
            <li>To respond to support inquiries</li>
          </ul>

          <h2>3. Google AdSense</h2>
          <p>We use Google AdSense to display ads on our site. Google may use cookies and web beacons to serve ads based on your interests. You can opt out of personalized ads at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>

          <h2>4. Data Retention</h2>
          <p>Access logs are retained for up to 30 days for operational purposes and then deleted. No download data or processed media is retained on our servers.</p>

          <h2>5. Third-Party Services</h2>
          <p>We do not sell your data to third parties. We may share aggregate, anonymized analytics with advertising partners.</p>

          <h2>6. Your Rights</h2>
          <p>If you are in the EU/EEA, you have rights under GDPR including access, erasure, and portability of your data. Contact us at <strong>legal@youmate.org</strong> to exercise these rights.</p>

          <h2>7. Changes to This Policy</h2>
          <p>We may update this policy from time to time. Significant changes will be announced on our homepage. Continued use of the service constitutes acceptance of the updated policy.</p>

          <h2>8. Contact</h2>
          <p>Privacy inquiries: <strong>legal@youmate.org</strong></p>
        </div>
      </section>
    </>
  );
}

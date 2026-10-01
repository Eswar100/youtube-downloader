import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Disclaimer | YouMate',
  description: 'YouMate disclaimer. Read important disclaimers about our YouTube media utility tool and your responsibilities as a user.',
  alternates: { canonical: '/disclaimer' },
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

export default function DisclaimerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">Disclaimer</h1>
          <p className="page-subtitle">Last updated: October 2026</p>
        </div>
      </section>
      <section className="content-section">
        <div className="container content-narrow legal-content">
          <h2>General Disclaimer</h2>
          <p>
            YouMate is provided for informational and personal utility purposes only. While we strive to keep the service available and accurate, we make no warranties, express or implied, about the completeness, reliability, or suitability of the service for any particular purpose.
          </p>

          <h2>No Affiliation with YouTube or Google</h2>
          <p>
            YouMate is an independent third-party tool and is NOT affiliated with, endorsed by, or in any way officially connected to YouTube, Google LLC, or any of their subsidiaries or affiliates.
          </p>

          <h2>Legal Use Only</h2>
          <p>
            YouMate is intended solely for downloading content that users legally own or have permission to download. Users must comply with YouTube&apos;s Terms of Service and applicable copyright laws in their jurisdiction.
          </p>

          <h2>External Links</h2>
          <p>
            Our site may contain links to third-party websites. YouMate has no control over the content, privacy policies, or practices of those sites and assumes no responsibility for them.
          </p>

          <h2>Changes</h2>
          <p>
            YouMate reserves the right to modify this disclaimer at any time. By continuing to use the service, you agree to any revised terms.
          </p>

          <h2>Contact</h2>
          <p>Questions: <strong>legal@youmate.org</strong></p>
        </div>
      </section>
    </>
  );
}

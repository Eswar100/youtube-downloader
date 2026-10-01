import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Copyright Policy & DMCA | YouMate',
  description: 'YouMate copyright policy and DMCA takedown procedure. We respect intellectual property and respond promptly to valid DMCA notices.',
  alternates: { canonical: '/copyright' },
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Copyright Policy', href: '/copyright' },
];

export default function CopyrightPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">Copyright Policy &amp; DMCA</h1>
          <p className="page-subtitle">Last updated: October 2026</p>
        </div>
      </section>
      <section className="content-section">
        <div className="container content-narrow legal-content">
          <p>YouMate respects intellectual property rights. This page explains our copyright policy and how to submit a DMCA takedown notice.</p>

          <h2>Our Position on Copyright</h2>
          <p>YouMate is a media utility tool. It is designed exclusively for use with content that users own or have explicit permission to download. We do not host, store, or redistribute any YouTube video content.</p>
          <p>We do not encourage, facilitate, or condone downloading copyrighted content without authorization from the rights holder.</p>

          <h2>User Responsibility</h2>
          <p>Users are solely responsible for ensuring they have the legal right to download any content accessed through YouMate. By using our service, you affirm that you own or are authorized to download the content.</p>

          <h2>DMCA Takedown Procedure</h2>
          <p>If you believe that content accessible through YouMate infringes your copyright, please send a DMCA notice to:</p>
          <div className="info-box">
            <strong>Email:</strong> legal@youmate.org<br />
            <strong>Subject line:</strong> DMCA Takedown Notice
          </div>
          <p>Your notice must include:</p>
          <ol className="styled-list">
            <li>Your name, address, telephone number, and email address</li>
            <li>A description of the copyrighted work you claim is being infringed</li>
            <li>The specific URL(s) you believe infringe your copyright</li>
            <li>A statement that you have a good-faith belief that the use is not authorized</li>
            <li>A statement under penalty of perjury that the information is accurate and you are authorized to act on behalf of the copyright owner</li>
            <li>Your electronic or physical signature</li>
          </ol>

          <h2>Counter-Notice</h2>
          <p>If you believe your content was removed incorrectly, you may submit a counter-notice to the same email address with the information required under 17 U.S.C. § 512(g)(3).</p>

          <h2>Repeat Infringers</h2>
          <p>We reserve the right to terminate access for users who repeatedly infringe or are accused of repeatedly infringing the rights of copyright holders.</p>
        </div>
      </section>
    </>
  );
}

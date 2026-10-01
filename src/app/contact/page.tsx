import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the YouMate team. Send feedback, report issues, or ask questions about our YouTube media tools.',
  alternates: { canonical: '/contact' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We&apos;d love to hear from you. Send us a message and we&apos;ll get back to you as soon as possible.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container content-narrow">
          <div className="info-box" style={{ marginBottom: '2rem' }}>
            <strong>📧 Email:</strong> For DMCA notices or legal inquiries, please email <strong>legal@youmate.org</strong>.
            For general questions and feedback, use the form below.
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

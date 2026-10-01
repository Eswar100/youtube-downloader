import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us | YouMate',
  description: 'Get in touch with the YouMate team. Send feedback, report issues, or ask questions about our YouTube media tools.',
  alternates: { canonical: '/contact' },
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
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

          <form className="contact-form" onSubmit={(e) => e.preventDefault()} aria-label="Contact form">
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Your Name</label>
              <input id="contact-name" type="text" className="form-input" placeholder="Jane Doe" autoComplete="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Email Address</label>
              <input id="contact-email" type="email" className="form-input" placeholder="you@example.com" autoComplete="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject" className="form-label">Subject</label>
              <select id="contact-subject" className="form-input">
                <option value="feedback">General Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="dmca">DMCA / Legal</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Message</label>
              <textarea id="contact-message" className="form-input form-textarea" placeholder="Describe your question or issue in detail..." rows={6} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Message
            </button>
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              We aim to respond within 48 hours.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

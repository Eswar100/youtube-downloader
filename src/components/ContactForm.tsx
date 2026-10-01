'use client';

import React from 'react';

export default function ContactForm() {
  return (
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
  );
}
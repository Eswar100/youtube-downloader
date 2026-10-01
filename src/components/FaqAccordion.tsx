'use client';

import React, { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  includeJsonLd?: boolean;
}

export default function FaqAccordion({
  items,
  includeJsonLd = true,
}: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter((i) => i !== idx));
    } else {
      setOpenIndexes([...openIndexes, idx]);
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {includeJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <div className="faq-list">
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index);

          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? 'open' : ''}`}
            >
              <button
                type="button"
                className="faq-trigger"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{item.question}</span>

                <svg
                  className="faq-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="faq-content"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
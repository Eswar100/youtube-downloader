import React from 'react';

export interface AdBannerProps {
  slotType: 'leaderboard' | 'rectangle' | 'mobile-banner';
  className?: string;
}

export default function AdBanner({
  slotType,
  className = '',
}: AdBannerProps) {
  const getSlotDetails = () => {
    switch (slotType) {
      case 'leaderboard':
        return {
          title: 'Responsive Desktop Banner (728x90 / 970x90)',
          sizeNote: 'Standard leaderboard display slot',
          wrapperClass: 'leaderboard',
        };

      case 'rectangle':
        return {
          title: 'Content Medium Rectangle (336x280 / 300x250)',
          sizeNote: 'High-engagement editorial ad slot',
          wrapperClass: 'rectangle',
        };

      case 'mobile-banner':
      default:
        return {
          title: 'Mobile Anchor Banner (320x100 / 320x50)',
          sizeNote: 'Compact mobile-optimized placement',
          wrapperClass: 'mobile-banner',
        };
    }
  };

  const details = getSlotDetails();

  return (
    <aside
      className={`ad-slot-wrapper ${className}`}
      aria-label="Advertisement Container"
      role="complementary"
    >
      <span className="ad-slot-label">Advertisement</span>

      <div
        className={`ad-slot-box ${details.wrapperClass}`}
        data-adsense-ready="true"
        data-slot-format={slotType}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          {details.title}
        </span>

        <span
          style={{
            fontSize: '0.75rem',
            opacity: 0.7,
            marginTop: '4px',
          }}
        >
          {details.sizeNote}
        </span>
      </div>
    </aside>
  );
}
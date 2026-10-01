import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#e50914',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://youmate.org'),
  title: {
    default: 'Free YouTube Downloader Online | Fast Video Download Tool - YouMate',
    template: '%s | YouMate',
  },
  description:
    'YouMate is a fast, free online YouTube video downloader and media utility. Analyze and download permitted YouTube video clips, audio tracks, and HD thumbnails in 1080p, 720p, 480p, and MP4 format.',
  keywords: [
    'YouTube downloader',
    'YouTube video downloader',
    'YouTube video download',
    'YouTube downloader online',
    'YouTube video downloader online',
    'download YouTube videos',
    'YouTube video download tool',
    'YouTube media downloader',
    'YouTube video converter',
    'YouTube downloader MP4',
    'YouTube audio download',
    'YouTube thumbnail downloader',
  ],
  authors: [{ name: 'YouMate Media Team' }],
  creator: 'YouMate',
  publisher: 'YouMate',
  applicationName: 'YouMate',
  formatDetection: { telephone: false },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Free YouTube Downloader Online | Fast Video Download Tool - YouMate',
    description:
      'Process supported YouTube videos, audio streams, and high-resolution thumbnails quickly with YouMate. Clean, secure, and mobile-friendly.',
    url: 'https://youmate.org',
    siteName: 'YouMate',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'YouMate YouTube Video Utility' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Downloader Online | Fast Video Download Tool - YouMate',
    description: 'Fast, simple YouTube media downloader. Convert and download permitted media in HD MP4.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YouMate',
    url: 'https://youmate.org',
    description: 'Fast and simple online utility for analyzing and downloading permitted YouTube video, audio, and thumbnail media.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://youmate.org/youtube-downloader?url={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdWebApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'YouMate YouTube Downloader',
    url: 'https://youmate.org',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All (Web-based)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }} />
      </head>
      <body>
        <Navbar />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


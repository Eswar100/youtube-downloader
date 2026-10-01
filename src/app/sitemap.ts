import type { MetadataRoute } from 'next';

const BASE_URL = 'https://youmate.org';

const routes = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/youtube-downloader', priority: 0.95, changeFrequency: 'weekly' as const },
  { url: '/youtube-video-downloader', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/youtube-thumbnail-downloader', priority: 0.85, changeFrequency: 'weekly' as const },
  { url: '/how-to-download', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/faq', priority: 0.75, changeFrequency: 'monthly' as const },
  { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  { url: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' as const },
  { url: '/terms', priority: 0.4, changeFrequency: 'yearly' as const },
  { url: '/copyright', priority: 0.4, changeFrequency: 'yearly' as const },
  { url: '/disclaimer', priority: 0.4, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${BASE_URL}${r.url}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

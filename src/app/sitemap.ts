import { MetadataRoute } from 'next';

const BASE_URL = 'https://ksv-pallastrada.ch';
const locales = ['fr', 'en', 'de', 'it'];

const pages = [
  { path: '',                   priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/clubs/football',    priority: 0.8, changeFrequency: 'monthly' },
  { path: '/clubs/velo',        priority: 0.8, changeFrequency: 'monthly' },
  { path: '/clubs/hiking',      priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact',           priority: 0.6, changeFrequency: 'monthly' },
  { path: '/tournoi',           priority: 0.9, changeFrequency: 'daily'   },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  return entries;
}

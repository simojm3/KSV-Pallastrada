import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/*/tournoi/admin', '/*/tournoi/admin/'],
      },
    ],
    sitemap: 'https://ksv-pallastrada.ch/sitemap.xml',
  };
}

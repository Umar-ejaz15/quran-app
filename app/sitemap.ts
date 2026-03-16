import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.noorulquraan.com';

  // Historical data - map these to your actual API if needed
  const staticPages = [
    { url: '/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: '/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/surahs', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: '/juz', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: '/manzil', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/hizb', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/ruku', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/page', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/editions', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/sajda', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/search', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ];

  // Dynamic Surah pages (1-114)
  const surahPages = Array.from({ length: 114 }, (_, i) => ({
    url: `${baseUrl}/surah/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic Juz pages (1-30)
  const juzPages = Array.from({ length: 30 }, (_, i) => ({
    url: `${baseUrl}/juz/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic Manzil pages (1-7)
  const manzilPages = Array.from({ length: 7 }, (_, i) => ({
    url: `${baseUrl}/manzil/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Hizb pages (1-60)
  const hizbPages = Array.from({ length: 60 }, (_, i) => ({
    url: `${baseUrl}/hizb/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Ruku pages (1-559 - typical count)
  const rukuPages = Array.from({ length: 559 }, (_, i) => ({
    url: `${baseUrl}/ruku/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic Page numbers (1-604)
  const pageNumbers = Array.from({ length: 604 }, (_, i) => ({
    url: `${baseUrl}/page/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Combine all pages
  const sitemap: MetadataRoute.Sitemap = [
    ...staticPages.map(page => ({
      ...page,
      url: `${baseUrl}${page.url}`,
    })),
    ...surahPages,
    ...juzPages,
    ...manzilPages,
    ...hizbPages,
    ...rukuPages,
    ...pageNumbers,
  ];

  return sitemap;
}

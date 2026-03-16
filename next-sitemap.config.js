/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.noorulquraan.com',
  generateRobotsTxt: true,
  robots: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/.well-known'],
      },
    ],
  },
  sitemaps: [
    '/sitemap.xml',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  outDir: './public',
};

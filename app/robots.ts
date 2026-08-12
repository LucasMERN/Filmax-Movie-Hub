import { baseUrl } from '@/lib/base-url';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',

        crawlDelay: 10,

        allow: [
          '/',
          '/movies',
          '/shows',
          '/trending',
          '/watchlist',
          '/dashboard',
          '/categories',
          '/privacy-policy',
          '/terms-of-service',
        ],

        disallow: [
          '/movie/*',
          '/tv/*',
          '/person/*',

          '/categories/*',

          '/search/*',
          '/search',

          '/*?page=',
          '/*page=',

          '/*?genre=',
          '/*genre=',
          '/*?sort=',
          '/*sort=',

          // API routes
          '/api/',
        ],
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

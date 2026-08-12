import { baseUrl } from '@/lib/base-url';
import { MetadataRoute } from 'next';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '/',
    '/movies',
    '/shows',
    '/trending',
    '/watchlist',
    '/dashboard',
    '/categories',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}

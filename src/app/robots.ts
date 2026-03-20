import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Prevent Google from indexing your admin and private user areas
      disallow: ['/admin/', '/profile/', '/cart/', '/wishlist/'], 
    },
    sitemap: 'https://cisteblasta.in/sitemap.xml',
  };
}
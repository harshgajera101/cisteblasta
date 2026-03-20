import { MetadataRoute } from 'next';
// Import your database connection and Product model so we can list every cake!
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cisteblasta.in';

  // 1. Define all your static pages
  const staticPages = [
    '',
    '/menu',
    '/custom-cake',
    '/about',
    '/contact',
    '/login',
    '/signup',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8, // Home page gets highest priority
  }));

  try {
    // 2. Fetch all products from your database to create dynamic URLs
    await connectDB();
    const products = await Product.find({}, '_id updatedAt').lean();

    const dynamicPages = products.map((product) => ({
      url: `${baseUrl}/product/${product._id}`,
      // Use the product's actual last update time if available, else current date
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Combine static and dynamic pages
    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap:", error);
    // If database fails for some reason, at least return the static pages
    return staticPages;
  }
}
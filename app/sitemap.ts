import { MetadataRoute } from 'next';
import { getServiceAreas, getBlogPosts } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://51stateconstruction.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/commercial-roofing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tpo-roofing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/metal-roofing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/roof-inspection`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    // Fetch dynamic service areas from Sanity
    const serviceAreas = await getServiceAreas();
    const serviceAreaRoutes: MetadataRoute.Sitemap = (serviceAreas || []).map(
      (area: any) => ({
        url: `${baseUrl}/service-areas/${area.slug?.current || area.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    );

    // Fetch dynamic blog posts from Sanity
    const blogPosts = await getBlogPosts();
    const blogRoutes: MetadataRoute.Sitemap = (blogPosts || []).map(
      (post: any) => ({
        url: `${baseUrl}/blog/${post.slug?.current || post.slug}`,
        lastModified: new Date(post.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    );

    return [...staticRoutes, ...serviceAreaRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}

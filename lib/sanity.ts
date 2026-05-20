import { createClient } from '@sanity/client';
import { definePreview } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

if (!projectId) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

// For preview/draft mode
export const preview = definePreview({
  projectId,
  dataset,
});

/**
 * Fetch blog posts
 */
export async function getBlogPosts() {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    body,
    featuredImage,
    tags
  }`;

  try {
    const posts = await sanityClient.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    body,
    featuredImage,
    seoTitle,
    seoDescription,
    tags
  }`;

  try {
    const post = await sanityClient.fetch(query, { slug });
    return post;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch service areas
 */
export async function getServiceAreas() {
  const query = `*[_type == "serviceArea"] | order(city asc) {
    _id,
    city,
    state,
    county,
    slug,
    heroHeadline,
    bodyContent,
    featuredImage,
    seoTitle,
    seoDescription
  }`;

  try {
    const areas = await sanityClient.fetch(query);
    return areas;
  } catch (error) {
    console.error('Error fetching service areas:', error);
    return [];
  }
}

/**
 * Fetch single service area by slug
 */
export async function getServiceAreaBySlug(slug: string) {
  const query = `*[_type == "serviceArea" && slug.current == $slug][0] {
    _id,
    city,
    state,
    county,
    slug,
    heroHeadline,
    bodyContent,
    featuredImage,
    seoTitle,
    seoDescription
  }`;

  try {
    const area = await sanityClient.fetch(query, { slug });
    return area;
  } catch (error) {
    console.error(`Error fetching service area ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch gallery projects
 */
export async function getGalleryProjects() {
  const query = `*[_type == "galleryProject"] | order(completionDate desc) {
    _id,
    title,
    projectType,
    location,
    beforeImage,
    afterImage,
    description,
    completionDate
  }`;

  try {
    const projects = await sanityClient.fetch(query);
    return projects;
  } catch (error) {
    console.error('Error fetching gallery projects:', error);
    return [];
  }
}

/**
 * Fetch testimonials
 */
export async function getTestimonials() {
  const query = `*[_type == "testimonial"] {
    _id,
    authorName,
    company,
    location,
    quote,
    rating,
    projectType
  }`;

  try {
    const testimonials = await sanityClient.fetch(query);
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Fetch site settings
 */
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    phone,
    email,
    address,
    licenseNumber,
    googleReviewLink,
    socialLinks {
      facebook,
      instagram,
      linkedin
    }
  }`;

  try {
    const settings = await sanityClient.fetch(query);
    return settings || null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

/**
 * Get image URL from Sanity
 */
export function getSanityImageUrl(image: any) {
  if (!image?.asset?._ref) return null;
  const id = image.asset._ref.replace('image-', '').split('-')[0];
  const format = image.asset._ref.split('-').pop();
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${format}.jpg`;
}

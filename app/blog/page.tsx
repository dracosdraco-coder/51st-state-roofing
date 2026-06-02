import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PremiumHero from '@/components/PremiumHero';
import CTABlock from '@/components/CTABlock';
import { Calendar, User, ArrowRight, FileText } from 'lucide-react';
import { getBlogPosts, getSanityImageUrl } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Blog | 51st State Construction | Commercial Roofing Insights',
  description: 'Industry news, tips, and guides for commercial roofing, concrete restoration, and construction.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PremiumHero
        headline="Insights & Resources"
        subheadline="Tips, technical guides, and expert advice on commercial roofing, concrete restoration, and construction."
        showPhone={false}
      />

      <section className="section-container">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-brand-dark mb-2">No posts yet</h2>
            <p className="text-brand-gray">
              Add your first blog post in the{' '}
              <Link href="/studio" className="text-brand-blue hover:underline">
                Studio
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {posts.map((post: any) => {
              const imageUrl = getSanityImageUrl(post.featuredImage);
              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current}`}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand-blue transition-all group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileText size={40} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-brand-gray">
                      {post.tags?.[0] && (
                        <span className="bg-brand-blue-pale text-brand-blue px-3 py-1 rounded-full font-semibold text-xs">
                          {post.tags[0]}
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar size={13} />
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'Draft'}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-brand-gray mb-4 leading-relaxed text-sm">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-2 text-brand-blue font-semibold text-sm group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <CTABlock
        headline="Have a Project in Mind?"
        subheadline="Get a free estimate from our team across Florida and North Carolina."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
        showPhone={false}
      />
    </>
  );
}

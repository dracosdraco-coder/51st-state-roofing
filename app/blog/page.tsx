import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Blog | 51st State Roofing | Commercial Roofing Insights',
  description: 'Industry news, tips, and guides for commercial roofing in South Florida.',
};

const blogPosts = [
  {
    id: 1,
    slug: 'preparing-roof-hurricane-season',
    title: 'How to Prepare Your Commercial Roof for Hurricane Season',
    excerpt:
      'Hurricane season brings unique challenges to South Florida roofs. Learn what you can do now to protect your building.',
    date: '2024-05-15',
    author: 'John Martinez',
    category: 'Maintenance',
  },
  {
    id: 2,
    slug: 'tpo-vs-metal-roofing',
    title: 'TPO vs Metal Roofing: Which is Right for Your Business?',
    excerpt:
      'Comparing the pros and cons of TPO and metal roofing systems to help you make the best choice for your commercial property.',
    date: '2024-05-10',
    author: 'Carlos Rodriguez',
    category: 'Comparison',
  },
  {
    id: 3,
    slug: 'roof-inspection-saves-money',
    title: 'Why Regular Roof Inspections Save You Money',
    excerpt:
      'Small problems caught early can save thousands in expensive repairs. Discover why regular inspections matter.',
    date: '2024-05-05',
    author: 'Mike Thompson',
    category: 'Benefits',
  },
  {
    id: 4,
    slug: 'energy-efficient-roofing-south-florida',
    title: 'Energy-Efficient Roofing Solutions for South Florida',
    excerpt:
      'Cool roofs reflect sunlight and reduce cooling costs. Learn how energy-efficient roofing can benefit your bottom line.',
    date: '2024-04-30',
    author: 'John Martinez',
    category: 'Energy',
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white">
        <div className="section-container text-center">
          <h1 className="hero-text text-white mb-4">
            Roofing <span className="text-brand-blue">Blog</span>
          </h1>
          <p className="hero-subtitle text-gray-300">
            Tips, insights, and expert advice for commercial roofing
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-brand-blue transition-all group"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center group-hover:from-brand-blue group-hover:to-brand-blue-dark transition-colors">
                <div className="text-center text-gray-600">
                  <div className="text-5xl">📝</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4 text-sm text-brand-gray">
                  <span className="bg-brand-gray-light px-3 py-1 rounded-full font-semibold text-brand-dark">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-brand-gray mb-4 leading-relaxed">{post.excerpt}</p>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-brand-gray">
                    <User size={14} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2 text-brand-blue font-semibold group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More or Pagination */}
        <div className="text-center">
          <button className="btn-secondary">
            Load More Articles
          </button>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Stay Updated on Roofing Tips"
        subheadline="Get expert roofing advice delivered to your inbox."
        primaryCTA={{ label: 'Subscribe to Newsletter', href: '/contact' }}
        showPhone={false}
      />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Blog Post | 51st State Construction',
  description: 'Read the latest roofing insights and industry tips.',
};

const blogContent: any = {
  'preparing-roof-hurricane-season': {
    title: 'How to Prepare Your Commercial Roof for Hurricane Season',
    date: '2024-05-15',
    author: 'John Martinez',
    category: 'Maintenance',
    content: `
      <p>Hurricane season is a critical time for South Florida property owners. With winds exceeding 100+ mph and heavy rainfall, your commercial roof faces significant stress. Here's what you need to do to prepare.</p>

      <h2>1. Schedule a Professional Inspection</h2>
      <p>Before hurricane season, have your roof professionally inspected. We'll identify weak spots, missing fasteners, and potential issues that could become serious problems in high winds.</p>

      <h2>2. Ensure Proper Drainage</h2>
      <p>Clogged drains and gutters can cause water to pool on your roof, adding weight and stress. Clear all debris and ensure water drains freely.</p>

      <h2>3. Secure Loose Fasteners</h2>
      <p>High winds can lift and tear loose roofing materials. We check all seams, fasteners, and adhesive bonds to ensure everything is secure.</p>

      <h2>4. Trim Nearby Trees</h2>
      <p>Overhanging branches can fall on your roof during storms. Have trees trimmed well before hurricane season begins.</p>

      <h2>5. Check Flashing and Penetrations</h2>
      <p>Areas around vents, pipes, and HVAC units are vulnerable. We seal any gaps or deterioration to prevent water intrusion.</p>

      <h2>Emergency Preparedness</h2>
      <p>Have our emergency number saved: (561) 985-2484. If your roof sustains damage during a hurricane, we can respond quickly to prevent further water damage.</p>

      <p>Don't wait until hurricane season is here. Contact 51st State Construction today for a free pre-season inspection.</p>
    `,
  },
  'tpo-vs-metal-roofing': {
    title: 'TPO vs Metal Roofing: Which is Right for Your Business?',
    date: '2024-05-10',
    author: 'Carlos Rodriguez',
    category: 'Comparison',
    content: `
      <p>When it's time to replace your commercial roof, you'll likely consider TPO or metal roofing. Both are excellent choices, but which is right for your business? Let's compare.</p>

      <h2>TPO Roofing Advantages</h2>
      <ul>
        <li><strong>Cost-effective:</strong> Lower upfront installation cost</li>
        <li><strong>Energy efficient:</strong> Reflective white surface reduces cooling costs</li>
        <li><strong>Easy repairs:</strong> Damaged sections can be patched</li>
        <li><strong>Good weather resistance:</strong> Performs well in South Florida climate</li>
      </ul>

      <h2>TPO Roofing Disadvantages</h2>
      <ul>
        <li><strong>Shorter lifespan:</strong> 20-30 years vs metal's 40+ years</li>
        <li><strong>More maintenance required:</strong> Regular seam inspections needed</li>
        <li><strong>UV sensitivity:</strong> Material can degrade faster in intense sun</li>
      </ul>

      <h2>Metal Roofing Advantages</h2>
      <ul>
        <li><strong>Exceptional longevity:</strong> 40-70 year lifespan</li>
        <li><strong>Hurricane-rated:</strong> Superior wind resistance</li>
        <li><strong>Low maintenance:</strong> Minimal upkeep required</li>
        <li><strong>Premium appearance:</strong> Modern, attractive look</li>
      </ul>

      <h2>Metal Roofing Disadvantages</h2>
      <ul>
        <li><strong>Higher cost:</strong> Significantly more expensive upfront</li>
        <li><strong>Requires proper installation:</strong> Must be correctly installed for longevity</li>
        <li><strong>Sound transmission:</strong> Can be noisier in rain without proper insulation</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>Choose TPO if budget is a primary concern and you're comfortable with higher maintenance. Choose metal if you want the longest-lasting roof and can invest upfront for decades of protection.</p>

      <p>Contact us for a free estimate and personalized recommendation for your property.</p>
    `,
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug] || {
    title: 'Blog Post',
    date: '2024-05-01',
    author: 'John Martinez',
    category: 'Roofing',
    content: '<p>This is a placeholder blog post. In production, this content would be pulled from Sanity CMS.</p>',
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white">
        <div className="section-container">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-blue hover:text-white mb-6">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
          <h1 className="hero-text text-white mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <span className="bg-brand-blue bg-opacity-20 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              {post.author}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image Placeholder */}
            <div className="h-96 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-6xl">📷</div>
                <p className="text-sm mt-2">Featured Image</p>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div
                className="text-brand-gray leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/<h2>/g, '<h2 class="text-2xl font-bold text-brand-dark mt-8 mb-4">').replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2">').replace(/<li>/g, '<li class="text-brand-gray">'),
                }}
              />
            </div>

            {/* Share */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-brand-dark mb-4">Share this article</h3>
              <div className="flex gap-4">
                <button className="p-3 border border-gray-200 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-colors">
                  <span>Facebook</span>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-colors">
                  <span>LinkedIn</span>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* CTA Box */}
            <div className="bg-brand-gray-light p-8 rounded-lg mb-8 sticky top-24">
              <h3 className="font-bold text-brand-dark mb-4">Get Professional Help</h3>
              <p className="text-sm text-brand-gray mb-6">
                Need help with your commercial roof? Contact us for a free inspection and estimate.
              </p>
              <Link href="/contact" className="btn-primary block text-center text-sm">
                Request Free Estimate
              </Link>
              <div className="mt-4 pt-4 border-t border-gray-300 text-center">
                <a href="tel:+15619852484" className="text-brand-blue font-bold hover:text-brand-blue-dark">
                  (561) 985-2484
                </a>
              </div>
            </div>

            {/* Related Posts */}
            <div>
              <h3 className="font-bold text-brand-dark mb-4">Related Posts</h3>
              <div className="space-y-4">
                {[
                  { slug: 'roof-inspection-saves-money', title: 'Why Regular Roof Inspections Save You Money' },
                  { slug: 'energy-efficient-roofing-south-florida', title: 'Energy-Efficient Roofing Solutions' },
                ].map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="block p-3 border border-gray-200 rounded hover:border-brand-blue hover:bg-brand-gray-light transition-all"
                  >
                    <p className="text-sm font-semibold text-brand-dark hover:text-brand-blue">
                      {relatedPost.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <div className="flex gap-6 items-start">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">👤</span>
            </div>
            <div>
              <h3 className="font-bold text-brand-dark mb-2">{post.author}</h3>
              <p className="text-brand-gray">
                {post.author} is a roofing expert at 51st State Construction with 15+ years of experience in commercial
                roofing systems and South Florida construction standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Ready to Upgrade Your Commercial Roof?"
        subheadline="Contact 51st State Construction for a free inspection and expert recommendations."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
      />
    </>
  );
}

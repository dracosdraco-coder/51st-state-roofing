import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PremiumHero from '@/components/PremiumHero';
import CTABlock from '@/components/CTABlock';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Project Gallery | 51st State Construction',
  description: 'Commercial roofing, interior, and restoration projects across Florida and North Carolina.',
};

const categories = [
  {
    label: 'Commercial Roofing',
    market: 'North Carolina',
    photos: [
      { src: '/roof1.avif', alt: 'Commercial roofing project — North Carolina' },
    ],
  },
  {
    label: 'Interior & Millwork',
    market: 'Florida & North Carolina',
    photos: [
      { src: '/interior.jpg', alt: 'Interior build-out' },
      { src: '/interior%202.jpeg', alt: 'Interior project' },
      { src: '/interior%203.jpg', alt: 'Interior finish work' },
      { src: '/interior%204.jpg', alt: 'Completed interior' },
    ],
  },
  {
    label: 'Ceiling Restoration',
    market: 'Florida & North Carolina',
    photos: [
      { src: '/ceiling%201.jpg', alt: 'Ceiling restoration' },
      { src: '/ceiling%202.jpg', alt: 'Ceiling work in progress' },
      { src: '/ceiling%204.jpg', alt: 'Completed ceiling restoration' },
    ],
  },
];

const allPhotos = categories.flatMap(c => c.photos.map(p => ({ ...p, label: c.label })));

export default function GalleryPage() {
  return (
    <>
      <PremiumHero
        headline="Project Gallery"
        subheadline="Commercial roofing, interior build-outs, and restoration work across Florida and North Carolina."
        primaryCTA={{ label: 'Start Your Project', href: '/contact' }}
        showPhone={false}
      />

      {/* Featured Video */}
      <section className="bg-brand-dark py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollAnimation type="fade-up">
            <h2 className="text-2xl font-bold text-white mb-2">Featured: Commercial Roofing</h2>
            <p className="text-gray-400 text-sm mb-6">Florida market — commercial roofing in action</p>
          </ScrollAnimation>
          <div className="relative rounded-2xl overflow-hidden aspect-video max-w-4xl mx-auto">
            <video
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              className="w-full h-full object-cover pointer-events-none"
            >
              <source src="/home_video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* All Photos */}
      <section className="section-container">
        <ScrollAnimation type="fade-up">
          <h2 className="text-3xl font-bold text-brand-dark mb-2">All Projects</h2>
          <p className="text-brand-gray mb-10">Roofing, interiors, and ceiling restoration across both markets.</p>
        </ScrollAnimation>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPhotos.map((photo, i) => (
            <ScrollAnimation key={i} type="fade-up" delay={i * 0.05}>
              <div className="relative h-64 rounded-xl overflow-hidden group bg-gray-100">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-semibold">{photo.label}</span>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* By Category */}
      {categories.map((cat, ci) => (
        <section key={ci} className={ci % 2 === 0 ? 'bg-brand-gray-light' : 'bg-white'}>
          <div className="section-container">
            <ScrollAnimation type="fade-up">
              <div className="flex items-baseline gap-4 mb-8">
                <h2 className="text-2xl font-bold text-brand-dark">{cat.label}</h2>
                <span className="text-sm text-brand-gray">{cat.market}</span>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cat.photos.map((photo, pi) => (
                <ScrollAnimation key={pi} type="fade-up" delay={pi * 0.08}>
                  <div className="relative h-56 rounded-xl overflow-hidden group bg-gray-100">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABlock
        headline="Ready to Add Your Project to Our Gallery?"
        subheadline="Get a free estimate. We'll bring the same quality to your property."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
      />
    </>
  );
}

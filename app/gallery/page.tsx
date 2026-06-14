import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PremiumHero from '@/components/PremiumHero';
import CTABlock from '@/components/CTABlock';
import ScrollAnimation from '@/components/ScrollAnimation';
import { getGalleryProjects, getSanityImageUrl } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Project Gallery | 51st State Construction',
  description: 'Commercial roofing and concrete restoration projects across Florida and North Carolina.',
};

export const revalidate = 60;

// Fallback photos shown until Sanity projects are added
const fallbackCategories = [
  {
    label: 'Commercial Roofing',
    market: 'North Carolina',
    photos: [
      { src: '/roof1.avif', alt: 'Commercial roofing project — North Carolina', name: 'Commercial Roofing Project', location: 'North Carolina' },
    ],
  },
  {
    label: 'Concrete Restoration — High-Rise & Waterfront',
    market: 'South Florida',
    photos: [
      { src: '/gallery/mirador-1200.jpg', alt: 'Mirador 1200 concrete restoration — Miami Beach', name: 'Mirador 1200', location: 'Miami Beach, FL' },
      { src: '/gallery/aegean-condominium.jpg', alt: 'Aegean Condominium concrete restoration — Miami Beach', name: 'Aegean Condominium', location: 'Miami Beach, FL' },
      { src: '/gallery/carlyle-fort-lauderdale.jpg', alt: 'The Carlyle concrete restoration — Fort Lauderdale', name: 'The Carlyle', location: 'Fort Lauderdale, FL' },
      { src: '/gallery/moon-bay.jpg', alt: 'Moon Bay concrete restoration — Fort Lauderdale', name: 'Moon Bay', location: 'Fort Lauderdale, FL' },
      { src: '/gallery/bay-place-condo.jpg', alt: 'Bay Place Condominium concrete restoration — Fort Lauderdale', name: 'Bay Place Condominium', location: 'Fort Lauderdale, FL' },
    ],
  },
  {
    label: 'Structural Concrete Repair',
    market: 'South Florida',
    photos: [
      { src: '/gallery/structural-repair-1.jpg', alt: 'Structural concrete repair', name: 'Structural Repair', location: 'South Florida' },
      { src: '/gallery/structural-repair-2.jpg', alt: 'Structural concrete repair', name: 'Structural Repair', location: 'South Florida' },
      { src: '/gallery/structural-repair-3.jpg', alt: 'Structural concrete repair', name: 'Structural Repair', location: 'South Florida' },
      { src: '/gallery/structural-repair-4.jpg', alt: 'Structural concrete repair', name: 'Structural Repair', location: 'South Florida' },
      { src: '/gallery/structural-repair-5.jpg', alt: 'Structural concrete repair', name: 'Structural Repair', location: 'South Florida' },
      { src: '/gallery/structural-repair-6.jpg', alt: 'Structural concrete repair', name: 'Structural Repair', location: 'South Florida' },
      { src: '/gallery/structural-repair-7.jpg', alt: 'Structural concrete repair', name: 'Structural Repair', location: 'South Florida' },
    ],
  },
  {
    label: 'Historic Restoration',
    market: 'South Florida',
    photos: [
      { src: '/gallery/historic-restoration-1.jpg', alt: 'Historic building restoration', name: 'Historic Restoration', location: 'South Florida' },
      { src: '/gallery/historic-restoration-2.jpg', alt: 'Historic building restoration', name: 'Historic Restoration', location: 'South Florida' },
      { src: '/gallery/historic-restoration-3.jpg', alt: 'Historic building restoration', name: 'Historic Restoration', location: 'South Florida' },
      { src: '/gallery/historic-restoration-4.jpg', alt: 'Historic building restoration', name: 'Historic Restoration', location: 'South Florida' },
      { src: '/gallery/historic-restoration-5.jpg', alt: 'Historic building restoration', name: 'Historic Restoration', location: 'South Florida' },
    ],
  },
  {
    label: 'Anchor & Splice Repair',
    market: 'South Florida',
    photos: [
      { src: '/gallery/concrete-repair-1.jpg', alt: 'Concrete anchor and splice coupler repair', name: 'Anchor & Splice Repair', location: 'South Florida' },
      { src: '/gallery/concrete-repair-2.jpg', alt: 'Concrete anchor and splice coupler repair', name: 'Anchor & Splice Repair', location: 'South Florida' },
      { src: '/gallery/concrete-repair-3.jpg', alt: 'Concrete anchor and splice coupler repair', name: 'Anchor & Splice Repair', location: 'South Florida' },
    ],
  },
];

const categoryLabels: Record<string, string> = {
  'commercial-roofing': 'Commercial Roofing',
  'metal-roofing': 'Metal Roofing',
  'tpo-roofing': 'TPO Roofing',
  'roof-inspection': 'Roof Inspection',
  'concrete-restoration': 'Concrete Restoration',
  'general-contracting': 'General Contracting',
};

export default async function GalleryPage() {
  const sanityProjects = await getGalleryProjects();
  const hasSanityProjects = sanityProjects && sanityProjects.length > 0;

  return (
    <>
      <PremiumHero
        headline="Project Gallery"
        subheadline="Commercial roofing and concrete restoration work across Florida and North Carolina."
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
            <video autoPlay muted loop playsInline disablePictureInPicture
              className="w-full h-full object-cover pointer-events-none">
              <source src="/home_video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {hasSanityProjects ? (
        // ── Sanity-powered gallery ──────────────────────────────
        <>
          <section className="section-container">
            <ScrollAnimation type="fade-up">
              <h2 className="text-3xl font-bold text-brand-dark mb-2">All Projects</h2>
              <p className="text-brand-gray mb-10">
                Roofing and concrete restoration across both markets.
              </p>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sanityProjects.map((project: any, i: number) => {
                const imageUrl = getSanityImageUrl(project.mainImage || project.afterImage);
                return (
                  <ScrollAnimation key={project._id} type="fade-up" delay={i * 0.05}>
                    <div className="relative h-64 rounded-xl overflow-hidden group bg-gray-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-blue-pale flex items-center justify-center">
                          <span className="text-brand-gray text-sm">No image</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-semibold">{project.title}</p>
                        {project.category && (
                          <p className="text-gray-300 text-xs mt-0.5">
                            {categoryLabels[project.category] || project.category}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </section>

          {/* By market */}
          {['FL', 'NC'].map((market, mi) => {
            const marketProjects = sanityProjects.filter(
              (p: any) => p.market === market || p.market === 'NATIONAL'
            );
            if (!marketProjects.length) return null;
            return (
              <section key={market} className={mi % 2 === 0 ? 'bg-brand-gray-light' : 'bg-white'}>
                <div className="section-container">
                  <ScrollAnimation type="fade-up">
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">
                      {market === 'FL' ? 'Florida Projects' : 'North Carolina Projects'}
                    </h2>
                  </ScrollAnimation>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {marketProjects.slice(0, 8).map((project: any, pi: number) => {
                      const imgUrl = getSanityImageUrl(project.mainImage || project.afterImage);
                      return (
                        <ScrollAnimation key={project._id} type="fade-up" delay={pi * 0.08}>
                          <div className="relative h-56 rounded-xl overflow-hidden group bg-gray-100">
                            {imgUrl ? (
                              <Image src={imgUrl} alt={project.title} fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full bg-brand-blue-pale" />
                            )}
                          </div>
                        </ScrollAnimation>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </>
      ) : (
        // ── Fallback: hardcoded local photos ───────────────────
        <>
          <section className="section-container">
            <ScrollAnimation type="fade-up">
              <h2 className="text-3xl font-bold text-brand-dark mb-2">All Projects</h2>
              <p className="text-brand-gray mb-10">Roofing and concrete restoration across both markets.</p>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fallbackCategories.flatMap(c => c.photos.map(p => ({ ...p, label: c.label }))).map((photo, i) => (
                <ScrollAnimation key={i} type="fade-up" delay={i * 0.05}>
                  <div className="relative h-64 rounded-xl overflow-hidden group bg-gray-100">
                    <Image src={photo.src} alt={photo.alt} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-semibold">{photo.name}</span>
                      <span className="text-gray-300 text-xs block mt-0.5">{photo.location}</span>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
          {fallbackCategories.map((cat, ci) => (
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
                        <Image src={photo.src} alt={photo.alt} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-semibold">{photo.name}</span>
                          <span className="text-gray-300 text-[11px] block">{photo.location}</span>
                        </div>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      <CTABlock
        headline="Ready to Add Your Project to Our Gallery?"
        subheadline="Get a free estimate. We'll bring the same quality to your property."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
      />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PremiumHero from '@/components/PremiumHero';
import TrustBar from '@/components/TrustBar';
import CTABlock from '@/components/CTABlock';
import TestimonialBlock from '@/components/TestimonialBlock';
import ScrollAnimation from '@/components/ScrollAnimation';
import { CheckCircle, ArrowRight, HardHat, Layers, Award, Hammer } from 'lucide-react';

export const metadata: Metadata = {
  title: '51st State Construction | Commercial Roofing, Concrete Restoration & General Contracting',
  description:
    'Commercial roofing, concrete restoration, and general contracting across Florida and North Carolina. Licensed, certified, and built for demanding commercial projects.',
  keywords:
    'commercial roofing Florida, commercial roofing North Carolina, concrete restoration, general contracting, ICRI certified',
  openGraph: {
    title: '51st State Construction',
    description: 'Commercial construction specialists serving Florida & North Carolina since 2012.',
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: '51st State Construction',
  image: 'https://51stateconstruction.com/51statelogo.png',
  description: 'Commercial roofing, concrete restoration, and general contracting serving Florida and North Carolina.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Commercial Ave',
    addressLocality: 'Fort Lauderdale',
    addressRegion: 'FL',
    postalCode: '33316',
  },
  telephone: '(561) 985-2484',
  email: '51statereno@gmail.com',
  url: 'https://51stateconstruction.com',
  areaServed: ['Florida', 'North Carolina'],
  priceRange: '$$',
  openingHours: 'Mo-Fr 08:00-17:00',
};

const services = [
  {
    icon: HardHat,
    title: 'General Contracting',
    description: 'Ground-up construction, tenant improvements, and commercial renovations — managed under one contract from permits through punch list.',
    href: '/general-contracting',
    tag: 'Florida & North Carolina',
  },
  {
    icon: Layers,
    title: 'Commercial Roofing',
    description: 'TPO, metal, and flat roofing for South Florida and North Carolina. Hurricane-rated, HVHZ certified, PE quality control on every job.',
    href: '/florida',
    tag: 'Florida · North Carolina',
  },
  {
    icon: Award,
    title: 'Concrete Restoration',
    description: 'ICRI-certified structural repair, EIFS, waterproofing, and protective coatings for commercial and industrial properties.',
    href: '/concrete-restoration',
    tag: 'ICRI · AIA CE · COCPB',
  },
  {
    icon: Hammer,
    title: 'Millwork & Interiors',
    description: 'Custom architectural millwork, stonework, specialty finishes, and turn-key interior design-build from concept through installed.',
    href: '/millwork-interiors',
    tag: 'Florida & North Carolina',
  },
];

const reasons = [
  { title: 'Licensed & Insured', detail: 'Florida GC license CGC1527726' },
  { title: 'ICRI Certified', detail: 'Concrete repair to ICRI Technical Guidelines' },
  { title: 'AIA CE Provider', detail: 'Trusted by architects for continuing education' },
  { title: 'Multi-Market', detail: 'South Florida and North Carolina specialists' },
  { title: 'PE Quality Control', detail: 'Professional Engineers on every job site' },
  { title: 'PBCC Member', detail: 'Palm Beach County Contractors Association' },
];

const projectPhotos = [
  { src: '/roof1.avif', alt: 'Commercial roofing — North Carolina', label: 'Commercial Roofing' },
  { src: '/ceiling%201.jpg', alt: 'Ceiling restoration', label: 'Ceiling Restoration' },
  { src: '/interior%203.jpg', alt: 'Interior build-out', label: 'Interior' },
  { src: '/ceiling%202.jpg', alt: 'Ceiling work', label: 'Ceiling Restoration' },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <PremiumHero
        headline="Commercial Construction You Can Count On"
        subheadline="Roofing, concrete restoration, general contracting, and custom millwork across Florida and North Carolina. One team, full accountability, licensed and certified."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
        secondaryCTA={{ label: '(561) 985-2484', href: 'tel:+15619852484' }}
        phone="(561) 985-2484"
      />

      {/* Certifications Bar */}
      <section className="bg-brand-blue-pale border-y border-blue-100 py-5">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-brand-dark font-semibold text-sm">Industry Certifications & Accreditations</span>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <Image src="/ICRI_CONCRETE.png" alt="ICRI" width={90} height={50} className="object-contain" />
              <Image src="/AIA_credit.png" alt="AIA CE" width={90} height={50} className="object-contain" />
              <Image src="/COCPB.png" alt="COCPB" width={90} height={50} className="object-contain" />
            </div>
            <Link href="/certifications" className="text-brand-blue font-semibold text-sm hover:underline whitespace-nowrap">
              View All Certifications →
            </Link>
          </div>
        </div>
      </section>

      {/* Services — clean minimal cards */}
      <section className="section-container">
        <ScrollAnimation type="fade-up">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">What We Do</h2>
            <p className="text-brand-gray max-w-xl">
              Four focused service lines across Florida and North Carolina — under one licensed, certified company.
            </p>
          </div>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <ScrollAnimation key={i} type="fade-up" delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="group flex gap-6 items-start p-8 bg-white border border-gray-200 rounded-2xl hover:border-brand-blue hover:shadow-lg transition-all"
                >
                  <div className="shrink-0 w-12 h-12 bg-brand-blue-pale rounded-xl flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                    <Icon size={22} className="text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-brand-dark text-lg group-hover:text-brand-blue transition-colors">{s.title}</h3>
                      <ArrowRight size={16} className="text-brand-gray group-hover:text-brand-blue transition-colors shrink-0 mt-1" />
                    </div>
                    <p className="text-brand-gray text-sm leading-relaxed mb-3">{s.description}</p>
                    <span className="text-xs text-brand-blue bg-brand-blue-pale px-2 py-1 rounded-full">{s.tag}</span>
                  </div>
                </Link>
              </ScrollAnimation>
            );
          })}
        </div>
      </section>

      {/* Interior photo background section */}
      <section className="relative h-[480px] overflow-hidden">
        <Image
          src="/interior%202.jpeg"
          alt="51st State Construction interior work"
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-brand-dark/65" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
            <ScrollAnimation type="fade-up">
              <p className="text-brand-blue font-semibold text-sm mb-3 tracking-wide uppercase">Custom Millwork & Interiors</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-2xl leading-tight">
                Built to Spec.<br />From Concept to Installed.
              </h2>
              <p className="text-gray-300 max-w-xl mb-8 leading-relaxed">
                Architectural millwork, stonework fabrication, specialty finishes, and complete interior design-build — delivered by craftsmen who work directly from your architect&apos;s drawings.
              </p>
              <Link href="/millwork-interiors" className="btn-primary inline-flex items-center gap-2">
                View Millwork & Interiors <ArrowRight size={16} />
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Recent Work photo grid */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-brand-dark mb-2">Recent Work</h2>
                <p className="text-brand-gray">A sample of projects across both markets.</p>
              </div>
              <Link href="/gallery" className="text-brand-blue font-semibold text-sm hover:underline flex items-center gap-1">
                Full Gallery <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {projectPhotos.map((photo, i) => (
              <ScrollAnimation key={i} type="fade-up" delay={i * 0.07}>
                <Link href="/gallery" className="block relative h-52 rounded-xl overflow-hidden group">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black/70 to-transparent">
                    <span className="text-white text-xs font-semibold">{photo.label}</span>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollAnimation type="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Why Choose 51st State?
            </h2>
            <p className="text-brand-gray mb-8">
              We bring the same standards to every scope — because we&apos;re a construction company first, not a specialty trade.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={17} className="text-brand-blue mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-brand-dark text-sm">{r.title}</div>
                    <div className="text-brand-gray text-xs mt-0.5">{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/certifications" className="btn-primary inline-block">View Our Certifications</Link>
          </ScrollAnimation>
          <ScrollAnimation type="fade-left">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="relative rounded-2xl overflow-hidden h-64">
                <Image src="/ceiling%204.jpg" alt="Ceiling restoration project" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-64 mt-8">
                <Image src="/interior%204.jpg" alt="Interior project" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-48">
                <Image src="/interior.jpg" alt="Interior build-out" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-48 -mt-4">
                <Image src="/ceiling%201.jpg" alt="Ceiling work" fill className="object-cover" />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Trusted by Commercial Property Owners
              </h2>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation type="fade-up" delay={0}>
              <TestimonialBlock
                quote="Professional team, excellent work quality, and they finished on schedule. Highly recommend for any commercial roofing project."
                author="Michael Rodriguez"
                company="Miami Manufacturing Co."
                rating={5}
              />
            </ScrollAnimation>
            <ScrollAnimation type="fade-up" delay={0.1}>
              <TestimonialBlock
                quote="51st State Construction provided a thorough inspection and honest recommendations. We saved money and got a quality result."
                author="Sarah Thompson"
                company="Broward Logistics"
                rating={5}
              />
            </ScrollAnimation>
            <ScrollAnimation type="fade-up" delay={0.2}>
              <TestimonialBlock
                quote="Quick response time, detailed estimates, and superior craftsmanship. They handled our project perfectly."
                author="James Chen"
                company="Palm Beach Tech Solutions"
                rating={5}
              />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <CTABlock
        headline="Ready to Start Your Commercial Project?"
        subheadline="Roofing, concrete restoration, or general contracting — we'll put together a clear scope and honest estimate."
        primaryCTA={{ label: 'Request Free Estimate', href: '/contact' }}
        showPhone={true}
      />
    </>
  );
}

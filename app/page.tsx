import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import TrustBar from '@/components/TrustBar';
import CTABlock from '@/components/CTABlock';
import TestimonialBlock from '@/components/TestimonialBlock';
import ScrollAnimation from '@/components/ScrollAnimation';
import { Phone, CheckCircle, ArrowRight, MapPin, HardHat, Layers, Award } from 'lucide-react';

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

const markets = [
  {
    icon: Layers,
    title: 'Commercial Roofing — Florida',
    description: 'TPO, metal, and flat roofing systems for South Florida commercial properties. Hurricane-rated, Miami-Dade NOA compliant, same-day inspections.',
    href: '/florida',
    tag: 'Miami-Dade · Broward · Palm Beach',
    color: 'from-blue-900 to-brand-dark',
  },
  {
    icon: MapPin,
    title: 'Commercial Roofing — North Carolina',
    description: 'Winter-rated commercial roofing for Charlotte, Raleigh, and Greensboro. Built for temperature extremes, heavy rain, and spring storm season.',
    href: '/north-carolina',
    tag: 'Charlotte · Raleigh · Greensboro',
    color: 'from-slate-800 to-brand-dark',
  },
  {
    icon: HardHat,
    title: 'General Contracting',
    description: 'Ground-up construction, tenant improvements, and commercial renovations — managed under one contract from permits through punch list.',
    href: '/general-contracting',
    tag: 'Florida & North Carolina',
    color: 'from-gray-800 to-brand-dark',
  },
  {
    icon: Award,
    title: 'Concrete Restoration',
    description: 'ICRI-certified structural repair, waterproofing, and protective coating systems for parking structures, marine environments, and commercial buildings.',
    href: '/concrete-restoration',
    tag: 'ICRI · AIA CE Provider · COCPB',
    color: 'from-brand-blue to-blue-900',
  },
  {
    icon: HardHat,
    title: 'Millwork & Interiors',
    description: 'Custom architectural millwork, stonework fabrication, specialty finishes, and turn-key interior design-build — from concept through installed.',
    href: '/millwork-interiors',
    tag: 'Florida & North Carolina',
    color: 'from-zinc-700 to-brand-dark',
  },
];

const stats = [
  { stat: '15+', label: 'Years in Business' },
  { stat: '500+', label: 'Projects Delivered' },
  { stat: '2', label: 'States Licensed' },
  { stat: '3', label: 'Industry Certifications' },
];

const reasons = [
  { title: 'Licensed & Insured', detail: 'Florida contractor license CGC1527726' },
  { title: 'ICRI Certified', detail: 'Concrete repair to industry technical guidelines' },
  { title: 'AIA CE Provider', detail: 'Trusted by architects for continuing education' },
  { title: 'Multi-Market Experience', detail: 'South Florida and North Carolina specialists' },
  { title: 'PE Quality Control', detail: 'Professional Engineers on every job site' },
  { title: 'Same-Day Estimates', detail: 'Fast, no-obligation inspections and quotes' },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-brand-dark text-white pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <ScrollAnimation type="fade-up" delay={0}>
              <div className="flex items-center gap-2 text-brand-blue text-sm font-semibold mb-4">
                <CheckCircle size={14} />
                Licensed · ICRI Certified · AIA CE Provider
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Commercial Construction<br />
                <span className="text-brand-blue">You Can Count On</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Roofing, concrete restoration, and general contracting for commercial properties across Florida and North Carolina. One team, full accountability.
              </p>
            </ScrollAnimation>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact" className="bg-brand-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-blue-light transition-all inline-flex items-center justify-center gap-2 shadow-xl">
                Get Free Estimate <ArrowRight size={18} />
              </Link>
              <a href="tel:+15619852484" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2">
                <Phone size={18} /> (561) 985-2484
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-brand-blue">{s.stat}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Bar */}
      <section className="bg-brand-blue-pale border-y border-blue-100 py-6">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-brand-dark font-semibold text-sm">Industry Certifications & Accreditations</span>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <Image src="/ICRI_CONCRETE.png" alt="ICRI Concrete Repair" width={100} height={55} className="object-contain" />
              <Image src="/AIA_credit.png" alt="AIA Continuing Education" width={100} height={55} className="object-contain" />
              <Image src="/COCPB.png" alt="COCPB Certification" width={100} height={55} className="object-contain" />
            </div>
            <Link href="/certifications" className="text-brand-blue font-semibold text-sm hover:underline whitespace-nowrap">
              View All Certifications →
            </Link>
          </div>
        </div>
      </section>

      {/* Markets / Services Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">What We Do</h2>
              <p className="text-lg text-brand-gray max-w-2xl mx-auto">
                Four focused service lines. One company that manages all of it.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {markets.map((market, i) => {
              const Icon = market.icon;
              return (
                <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                  <Link href={market.href} className={`group block bg-gradient-to-br ${market.color} text-white rounded-2xl p-8 hover:shadow-2xl transition-all hover:-translate-y-1`}>
                    <div className="flex items-start justify-between mb-4">
                      <Icon size={36} className="text-white/80 group-hover:text-white transition-colors" />
                      <span className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full">{market.tag}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-white">{market.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/90">{market.description}</p>
                    <div className="flex items-center gap-2 text-white/60 group-hover:text-white text-sm font-semibold transition-colors">
                      Learn More <ArrowRight size={14} />
                    </div>
                  </Link>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation type="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Why Choose 51st State Construction?
              </h2>
              <p className="text-brand-gray mb-8">
                We bring the same standards to roofing, concrete, and general contracting — because we&apos;re a construction company first, not a specialty trade.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-brand-blue mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-brand-dark text-sm">{r.title}</div>
                      <div className="text-brand-gray text-xs mt-0.5">{r.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/certifications" className="btn-primary inline-block">View Our Certifications</Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left">
              <div className="bg-brand-blue rounded-2xl p-8 text-white">
                <h3 className="font-bold text-xl mb-6">Accreditations</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <Image src="/ICRI_CONCRETE.png" alt="ICRI" width={80} height={48} className="object-contain" />
                    <div>
                      <div className="font-semibold text-sm">ICRI Member</div>
                      <div className="text-white/70 text-xs">International Concrete Repair Institute</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <Image src="/AIA_credit.png" alt="AIA CE" width={80} height={48} className="object-contain" />
                    <div>
                      <div className="font-semibold text-sm">AIA CE Provider</div>
                      <div className="text-white/70 text-xs">Continuing Education for Architects</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <Image src="/COCPB.png" alt="COCPB" width={80} height={48} className="object-contain" />
                    <div>
                      <div className="font-semibold text-sm">COCPB Certified</div>
                      <div className="text-white/70 text-xs">Concrete & Polymer Composites Board</div>
                    </div>
                  </div>
                </div>
                <Link href="/certifications" className="mt-6 block text-center text-sm text-white/70 hover:text-white transition-colors">
                  Learn what each certification means →
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Trusted by Commercial Property Owners
              </h2>
              <p className="text-lg text-brand-gray max-w-2xl mx-auto">
                See what our clients say about working with 51st State Construction
              </p>
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
                quote="51st State Construction provided a thorough inspection and honest recommendations. We saved money and got a quality new roof."
                author="Sarah Thompson"
                company="Broward Logistics"
                rating={5}
              />
            </ScrollAnimation>
            <ScrollAnimation type="fade-up" delay={0.2}>
              <TestimonialBlock
                quote="Quick response time, detailed estimates, and superior craftsmanship. They handled our emergency roof repair perfectly."
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

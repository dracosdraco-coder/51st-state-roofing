import type { Metadata } from 'next';
import Link from 'next/link';
import PremiumHero from '@/components/PremiumHero';
import ScrollAnimation from '@/components/ScrollAnimation';
import CTABlock from '@/components/CTABlock';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import InspectionScheduler from '@/components/InspectionScheduler';
import Estimator from '@/components/Estimator';
import TrustBar from '@/components/TrustBar';
import QuickForm from '@/components/QuickForm';
import { CheckCircle, MapPin, Award, Sun, Waves, Wind, Zap, Building, Layers, Shield, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commercial Roofing South Florida | Premium Contractor | 51st State',
  description:
    'Luxury commercial roofing services for Miami-Dade, Broward, and Palm Beach counties. TPO, metal, inspections. Licensed, insured, luxury service.',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: '51st State Construction — South Florida',
  image: 'https://51stateconstruction.vercel.app/51statelogo.png',
  description: 'Luxury commercial roofing contractor serving Miami-Dade, Broward, and Palm Beach counties.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Commercial Ave',
    addressLocality: 'Fort Lauderdale',
    addressRegion: 'FL',
    postalCode: '33316',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.1224,
    longitude: -80.1373,
  },
  telephone: '(954) 247-8528',
  email: '51statereno@gmail.com',
  url: 'https://51stateconstruction.vercel.app/south-florida',
  areaServed: [
    { '@type': 'County', name: 'Miami-Dade County', containedIn: 'Florida' },
    { '@type': 'County', name: 'Broward County', containedIn: 'Florida' },
    { '@type': 'County', name: 'Palm Beach County', containedIn: 'Florida' },
  ],
  priceRange: '$$',
  openingHours: 'Mo-Fr 08:00-17:00',
  hasMap: 'https://maps.google.com/?q=51st+State+Construction+Fort+Lauderdale+FL',
  sameAs: ['https://51stateconstruction.vercel.app'],
};

export default function SouthFloridaPage() {
  const cities = [
    'Miami', 'Fort Lauderdale', 'West Palm Beach', 'Aventura',
    'Boca Raton', 'Deerfield Beach', 'Coral Gables', 'Miami Beach'
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Premium Hero */}
      <PremiumHero
        headline="Commercial Roofing Excellence for South Florida"
        subheadline="Serving Miami-Dade, Broward, and Palm Beach counties with luxury commercial roofing solutions. From stunning TPO systems to premium metal roofing—built to withstand Florida's demanding climate."
        primaryCTA={{
          label: 'Free Premium Inspection',
          href: '/contact',
        }}
        secondaryCTA={{
          label: 'Call Now',
          href: 'tel:+19542478528',
        }}
        phone="(954) 247-8528"
      />

      {/* Trust Bar */}
      <TrustBar />

      {/* Quick Form — above fold conversion */}
      <section className="bg-brand-blue-pale border-b border-blue-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
          <QuickForm market="FL" headline="Get a Free South Florida Roofing Estimate" subheadline="Same-day response · Licensed GC · HVHZ certified" />
        </div>
      </section>

      {/* Why South Florida Trusts Us */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollAnimation type="fade-right">
            <h2 className="text-4xl font-bold text-brand-dark mb-8">
              Built for South Florida's <span className="text-brand-blue">Demanding Climate</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: Sun,
                  title: 'Intense Heat & UV',
                  desc: 'Our reflective systems reduce cooling costs by up to 30%'
                },
                {
                  icon: Waves,
                  title: 'Salt Air & Humidity',
                  desc: 'Corrosion-resistant materials proven in coastal conditions'
                },
                {
                  icon: Wind,
                  title: 'Hurricane Season',
                  desc: 'Hurricane-rated systems designed for extreme winds'
                },
                {
                  icon: Zap,
                  title: 'Tropical Storms',
                  desc: 'Advanced water drainage for heavy rainfall events'
                },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <IconComponent size={28} className="text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-2">{item.title}</h3>
                      <p className="text-brand-gray">{item.desc}</p>
                    </div>
                  </div>
                </ScrollAnimation>
                );
              })}
            </div>
          </ScrollAnimation>

          <ScrollAnimation type="fade-left">
            <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-brand-gray">
                  <Building size={64} className="mx-auto mb-4 text-brand-blue" />
                  <p className="text-sm">South Florida Commercial Roofing</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Service Counties */}
      <section className="bg-brand-gray-light py-24">
        <div className="section-container">
          <ScrollAnimation type="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Serving Premium Businesses Across South Florida
            </h2>
            <p className="text-xl text-brand-gray max-w-2xl mx-auto">
              From downtown Miami to the Palm Beaches, we're the trusted choice for luxury commercial roofing
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map((city, i) => (
              <ScrollAnimation
                key={i}
                type="scale"
                delay={i * 0.05}
                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
              >
                <MapPin className="w-6 h-6 text-brand-blue mx-auto mb-3" />
                <h3 className="font-semibold text-brand-dark">{city}</h3>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-container">
        <ScrollAnimation type="fade-up" className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            Premium Commercial Roofing Solutions
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'TPO & Flat Roofing',
              icon: Layers,
              desc: 'Energy-efficient single-ply systems with superior reflectivity for South Florida heat',
              link: '/south-florida/tpo-roofing/'
            },
            {
              title: 'Metal Standing Seam',
              icon: Shield,
              desc: 'Premium durability with 40+ year lifespan, perfect for South Florida hurricanes',
              link: '/south-florida/metal-roofing/'
            },
            {
              title: 'Professional Inspections',
              icon: Search,
              desc: 'Comprehensive assessments to protect your investment from Florida weather',
              link: '/south-florida/roof-inspection/'
            },
          ].map((service, i) => {
            const IconComponent = service.icon;
            return (
            <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
              <Link href={service.link}>
                <div className="bg-white border-2 border-brand-gray-light rounded-2xl p-8 hover:border-brand-blue hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <div className="mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent size={48} className="text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">{service.desc}</p>
                  <span className="text-brand-blue font-semibold group-hover:gap-3 flex items-center gap-2">
                    Learn More →
                  </span>
                </div>
              </Link>
            </ScrollAnimation>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-brand-blue text-white py-24">
        <div className="section-container">
          <ScrollAnimation type="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              South Florida's Luxury Roofing Choice
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              More than 15 years serving South Florida's most discerning business owners
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { num: '500+', label: 'Projects Completed in South Florida' },
              { num: '15+', label: 'Years of Local Experience' },
              { num: '100%', label: 'Satisfaction Guarantee' },
              { num: '24/7', label: 'Emergency Support Available' },
            ].map((stat, i) => (
              <ScrollAnimation key={i} type="scale" delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{stat.num}</div>
                  <p className="text-white/90">{stat.label}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="section-container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand-dark mb-2">Our South Florida Service Area</h2>
          <p className="text-brand-gray">We serve Miami-Dade, Broward, and Palm Beach counties — and surrounding communities.</p>
        </div>
        <ServiceAreaMap market="FL" />
      </section>

      {/* Estimator */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-brand-dark mb-2">Estimate Your Project</h2>
              <p className="text-brand-gray">Real Florida market pricing — get a ballpark in seconds.</p>
            </div>
            <Estimator defaultCategory="roofing-tpo" market="FL" />
          </div>
        </div>
      </section>

      {/* Inspection Scheduler */}
      <section className="section-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Book Your Inspection</h2>
            <p className="text-brand-gray">Select your preferred response window — we confirm within hours.</p>
          </div>
          <InspectionScheduler defaultInspectorType="roofing" locationMarket="FL" />
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Ready for Premium Commercial Roofing?"
        subheadline="Get a free inspection from South Florida's luxury roofing specialist. Same-day estimates available."
        primaryCTA={{ label: 'Request Inspection', href: '/contact' }}
      />
    </>
  );
}

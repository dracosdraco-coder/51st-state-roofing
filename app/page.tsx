import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TrustBar from '@/components/TrustBar';
import CTABlock from '@/components/CTABlock';
import TestimonialBlock from '@/components/TestimonialBlock';
import ScrollAnimation from '@/components/ScrollAnimation';
import { Phone, CheckCircle, ArrowRight, Layers, Shield, Search, Building, Users, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commercial Roofing Miami | 51st State Roofing | South Florida',
  description:
    'Expert commercial roofing services in Miami, Broward, and Palm Beach. TPO, metal, and flat roofs. Licensed, insured, same-day estimates. Call (954) 247-8528.',
  keywords:
    'commercial roofing Miami, TPO roofing, metal roofing, flat roof repair, South Florida',
  openGraph: {
    title: 'Commercial Roofing Miami | 51st State Roofing',
    description: 'Expert commercial roofing services for South Florida businesses.',
    type: 'website',
  },
};

// JSON-LD Schema Markup for LocalBusiness
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '51st State Roofing',
  image: 'https://51stateroofing.com/logo.png',
  description: 'Commercial roofing contractor serving South Florida',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Commercial Ave',
    addressLocality: 'Fort Lauderdale',
    addressRegion: 'FL',
    postalCode: '33316',
  },
  telephone: '(954) 247-8528',
  email: 'info@51stateroofing.com',
  url: 'https://51stateroofing.com',
  areaServed: [
    {
      '@type': 'City',
      name: 'Miami',
    },
    {
      '@type': 'City',
      name: 'Broward',
    },
    {
      '@type': 'City',
      name: 'Palm Beach',
    },
  ],
  priceRange: '$$',
  openingHours: 'Mo-Fr 08:00-17:00',
  knowsAbout: ['TPO Roofing', 'Metal Roofing', 'Flat Roof', 'Roof Inspection'],
};

const services = [
  {
    title: 'TPO & Flat Roofing',
    description: 'Durable single-ply membrane systems built to withstand South Florida weather.',
    icon: 'Layers',
    href: '/tpo-roofing',
  },
  {
    title: 'Metal Roofing',
    description: 'Long-lasting, energy-efficient standing seam metal roofs for commercial properties.',
    icon: 'Shield',
    href: '/metal-roofing',
  },
  {
    title: 'Roof Inspection',
    description: 'Comprehensive inspections to assess condition, identify damage, and prevent costly repairs.',
    icon: 'Search',
    href: '/roof-inspection',
  },
];

export default function Home() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-r from-brand-dark via-gray-800 to-brand-dark min-h-screen flex items-center">

        <div className="section-container relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
            <ScrollAnimation type="fade-up" delay={0}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Commercial Roofing <span className="text-brand-blue">You Can Trust</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Professional roofing solutions for Miami-Dade, Broward, and Palm Beach County businesses.
                TPO, metal, and flat roof specialists with 15+ years of experience.
              </p>
            </ScrollAnimation>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 mt-4">
                <Link href="/contact" className="bg-brand-blue text-white px-10 py-4 rounded-lg font-semibold hover:bg-brand-blue-light transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2">
                  Get Free Inspection <ArrowRight size={20} />
                </Link>
                <a href="tel:+19542478528" className="bg-white text-brand-blue px-10 py-4 rounded-lg font-semibold hover:bg-brand-gray-light transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2">
                  <Phone size={20} /> (954) 247-8528
                </a>
              </div>

              <ScrollAnimation type="fade-up" delay={0.1}>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand-blue flex-shrink-0" size={20} />
                    <span>Licensed & Insured (CBC1258966)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand-blue flex-shrink-0" size={20} />
                    <span>Same-Day Estimates Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand-blue flex-shrink-0" size={20} />
                    <span>Emergency Repairs 24/7</span>
                  </div>
                </div>
              </ScrollAnimation>
            </div> {/* closes Left Column */}

            {/* Right Column - Placeholder for Hero Image */}
            <div className="relative h-96 md:h-full bg-gray-700 rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/20 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Building size={64} className="mx-auto mb-4 text-gray-400" />
                  <p>Hero Image</p>
                  <p className="text-sm">(Commercial Roofing Project)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Services Section */}
      <section className="section-container bg-brand-gray-light">
        <ScrollAnimation type="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              Premium Commercial Roofing Services
            </h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto">
              Specialized expertise in TPO, metal, and comprehensive roof inspections. Choose the solution built for your property's needs and climate.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = {
              'Layers': Layers,
              'Shield': Shield,
              'Search': Search,
            }[service.icon];
            return (
            <ScrollAnimation key={index} type="fade-up" delay={index * 0.1}>
              <Link
                href={service.href}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-brand-gray-light hover:border-brand-blue h-full flex flex-col">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && <IconComponent size={56} className="text-brand-blue" />}
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-gray mb-6 leading-relaxed flex-grow">{service.description}</p>
                  <div className="flex items-center gap-2 text-brand-blue font-semibold group-hover:gap-3 transition-all">
                    Get Started <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/commercial-roofing" className="inline-flex items-center gap-2 bg-white text-brand-blue px-8 py-4 rounded-lg font-semibold hover:bg-brand-gray-light transition-all duration-300 border border-brand-blue hover:border-brand-blue">
            Explore All Services <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Image Placeholder */}
            <ScrollAnimation type="fade-right">
              <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-brand-gray">
                    <Users size={64} className="mx-auto mb-4 text-brand-blue" />
                    <p>Team Photo</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Right - Content */}
            <ScrollAnimation type="fade-left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                  Why Choose 51st State Roofing?
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-4">
                    <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-brand-dark mb-1">15+ Years Experience</h4>
                      <p className="text-brand-gray">Established track record in commercial roofing</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-brand-dark mb-1">Licensed & Insured</h4>
                      <p className="text-brand-gray">CBC1258966 certified contractor</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-brand-dark mb-1">Fast Turnaround</h4>
                      <p className="text-brand-gray">Same-day estimates and quick project timelines</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-brand-dark mb-1">South Florida Specialists</h4>
                      <p className="text-brand-gray">Built for hurricane seasons and high heat</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-brand-dark mb-1">Free Inspections</h4>
                      <p className="text-brand-gray">No obligation roof assessments</p>
                    </div>
                  </div>
                </div>

                <Link href="/about" className="btn-primary">
                  Learn More About Us
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-container">
        <ScrollAnimation type="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Trusted by South Florida Businesses
            </h2>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto">
              See what our clients say about working with 51st State Roofing
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
              quote="51st State Roofing provided a thorough inspection and honest recommendations. We saved money and got a quality new roof."
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
      </section>

      {/* Service Areas Quick Preview */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Serving South Florida
              </h2>
              <p className="text-lg text-brand-gray max-w-2xl mx-auto">
                We proudly serve businesses across Miami-Dade, Broward, and Palm Beach counties
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {['Miami-Dade County', 'Broward County', 'Palm Beach County'].map((area, index) => (
              <ScrollAnimation key={index} type="scale" delay={index * 0.1}>
                <div
                  className="bg-white border border-brand-gray-light rounded-lg p-8 text-center hover:shadow-lg hover:border-brand-blue transition-all"
                >
                  <div className="mb-4 flex justify-center">
                    <MapPin size={40} className="text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{area}</h3>
                  <p className="text-brand-gray text-sm mb-4">
                    Serving businesses and property managers
                  </p>
                  <Link href="/service-areas" className="text-brand-blue font-semibold hover:text-brand-dark transition-colors">
                    View Details →
                  </Link>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <div className="text-center">
            <Link href="/service-areas" className="btn-secondary">
              Explore All Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Get a Free Commercial Roof Inspection Today"
        subheadline="No obligation. No hidden fees. Just honest, professional assessment and guidance."
        primaryCTA={{ label: 'Request Free Inspection', href: '/contact' }}
        showPhone={true}
      />
    </>
  );
}

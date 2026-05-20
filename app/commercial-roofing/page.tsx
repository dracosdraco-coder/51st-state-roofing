import type { Metadata } from 'next';
import Link from 'next/link';
import TrustBar from '@/components/TrustBar';
import CTABlock from '@/components/CTABlock';
import ScrollAnimation from '@/components/ScrollAnimation';
import { ArrowRight, Zap, Shield, Clock, Layers, Search, Wrench, Building, Droplet, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commercial Roofing Services | 51st State Roofing | South Florida',
  description:
    'Complete commercial roofing solutions: TPO, metal, flat roofs, and inspections. Licensed contractor serving Miami-Dade, Broward, and Palm Beach counties.',
  keywords: 'commercial roofing services, TPO roofing, metal roofing, flat roof, South Florida',
};

const serviceOptions = [
  {
    title: 'TPO & Flat Roofing',
    description: 'Single-ply membrane roofing systems designed for commercial buildings',
    benefits: [
      'Energy efficient and reflective',
      'Excellent weather resistance',
      'Long lifespan (20-30 years)',
      'Cost-effective option',
    ],
    icon: 'Layers',
    href: '/tpo-roofing',
  },
  {
    title: 'Metal Roofing',
    description: 'Durable standing seam metal roofs for premium protection',
    benefits: [
      'Superior durability (40+ years)',
      'Excellent in hurricanes',
      'Energy efficient',
      'Low maintenance required',
    ],
    icon: 'Shield',
    href: '/metal-roofing',
  },
  {
    title: 'Roof Inspections',
    description: 'Comprehensive assessment to identify issues before they become expensive',
    benefits: [
      'Free evaluation with no obligation',
      'Detailed damage assessment',
      'Repair recommendations',
      'Insurance documentation',
    ],
    icon: 'Search',
    href: '/roof-inspection',
  },
  {
    title: 'Roof Repairs',
    description: 'Fast emergency repairs for leaks, damage, and aging systems',
    benefits: [
      '24/7 emergency response',
      'Preventative maintenance plans',
      'Patch & repair solutions',
      'Same-day service available',
    ],
    icon: 'Wrench',
    href: '/contact',
  },
  {
    title: 'Roof Replacement',
    description: 'Complete roof system replacement with minimal business disruption',
    benefits: [
      'Minimal downtime',
      'Warranty on all materials',
      'Professional installation',
      'Financing options available',
    ],
    icon: 'Building',
    href: '/contact',
  },
  {
    title: 'Coating & Protection',
    description: 'Extend roof life with protective coatings and sealants',
    benefits: [
      'Added weatherproofing',
      'Reduced energy costs',
      'Extended system life',
      'Affordable preventative care',
    ],
    icon: 'Droplet',
    href: '/contact',
  },
];

export default function CommercialRoofingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-dark via-gray-800 to-brand-dark text-white">
        <div className="section-container">
          <h1 className="hero-text text-white mb-4">
            Commercial <span className="text-brand-blue">Roofing Services</span> for South Florida
          </h1>
          <p className="hero-subtitle text-gray-300 mb-8">
            From TPO and metal systems to emergency repairs, we handle all commercial roofing needs.
            Licensed, insured, and ready to serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-primary">
              Get Free Estimate
            </Link>
            <a href="tel:+19542478528" className="btn-secondary">
              Call (954) 247-8528
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Overview Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ScrollAnimation type="scale" delay={0}>
            <div className="text-center">
              <div className="text-5xl mb-4">15+</div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Years Experience</h3>
              <p className="text-brand-gray">Proven track record in commercial roofing</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation type="scale" delay={0.1}>
            <div className="text-center">
              <div className="text-5xl mb-4">500+</div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Projects Completed</h3>
              <p className="text-brand-gray">Serving South Florida businesses</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation type="scale" delay={0.2}>
            <div className="text-center">
              <div className="text-5xl mb-4">100%</div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Satisfaction Guaranteed</h3>
              <p className="text-brand-gray">Quality you can count on</p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Service Options Grid */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
              Complete Roofing Solutions
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceOptions.map((service, index) => {
              const iconMap = {
                'Layers': Layers,
                'Shield': Shield,
                'Search': Search,
                'Wrench': Wrench,
                'Building': Building,
                'Droplet': Droplet,
              };
              const IconComponent = iconMap[service.icon as keyof typeof iconMap];
              return (
              <ScrollAnimation key={index} type="fade-up" delay={index * 0.1}>
                <Link
                href={service.href}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-brand-blue hover:shadow-lg transition-all group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  {IconComponent && <IconComponent size={48} className="text-brand-blue" />}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-brand-gray mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm text-brand-gray flex items-start gap-2">
                      <CheckCircle size={16} className="text-brand-blue mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-brand-blue font-semibold group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={18} />
                </div>
                </Link>
              </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="section-container">
        <ScrollAnimation type="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Why Choose 51st State Roofing?
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollAnimation type="fade-up" delay={0}>
            <div className="text-center">
              <Zap className="w-12 h-12 text-brand-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-dark mb-2">Fast Turnaround</h3>
              <p className="text-brand-gray">
                Same-day estimates and quick project timelines to minimize business disruption
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation type="fade-up" delay={0.1}>
            <div className="text-center">
              <Shield className="w-12 h-12 text-brand-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-dark mb-2">Guaranteed Quality</h3>
              <p className="text-brand-gray">
                All work backed by warranties and professional guarantees. Licensed & fully insured
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation type="fade-up" delay={0.2}>
            <div className="text-center">
              <Clock className="w-12 h-12 text-brand-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-dark mb-2">24/7 Support</h3>
              <p className="text-brand-gray">
                Emergency repairs and responsive customer service whenever you need us
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Our Process
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: 'Free Inspection',
                  description: 'We conduct a thorough assessment of your commercial roof at no cost',
                },
                {
                  step: 2,
                  title: 'Detailed Estimate',
                  description: 'Receive a comprehensive quote with options and timeline',
                },
                {
                  step: 3,
                  title: 'Expert Installation',
                  description: 'Our licensed team executes the work with precision and professionalism',
                },
                {
                  step: 4,
                  title: 'Quality Assurance',
                  description: 'Final inspection and documentation for your peace of mind',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-blue text-brand-dark font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">{item.title}</h3>
                    <p className="text-brand-gray">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Need Commercial Roofing Service?"
        subheadline="Get started with a free inspection from South Florida's trusted roofing specialist."
        primaryCTA={{ label: 'Request Free Estimate', href: '/contact' }}
      />
    </>
  );
}

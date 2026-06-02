/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import Link from 'next/link';
import TrustBar from '@/components/TrustBar';
import QuickForm from '@/components/QuickForm';
import Estimator from '@/components/Estimator';
import CTABlock from '@/components/CTABlock';
import InspectionScheduler from '@/components/InspectionScheduler';
import FAQAccordion from '@/components/FAQAccordion';
import ScrollAnimation from '@/components/ScrollAnimation';
import PremiumHero from '@/components/PremiumHero';
import { CheckCircle, Hammer, ShieldCheck, Zap } from 'lucide-react';
import { getFAQs } from '@/lib/sanity';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Metal Roofing | Standing Seam Systems | 51st State Construction',
  description:
    'Premium standing seam metal roofing for commercial buildings. 40+ year lifespan, hurricane-rated, energy-efficient. Free estimates in South Florida.',
  keywords: 'metal roofing, standing seam, commercial metal roof, Miami metal roofing',
};

const benefits = [
  {
    icon: Zap,
    title: '40+ Year Lifespan',
    description: 'Premium durability that far exceeds most roofing systems',
  },
  {
    icon: ShieldCheck,
    title: 'Hurricane Resistant',
    description: 'Standing seam design rated for extreme winds and storms',
  },
  {
    icon: Hammer,
    title: 'Low Maintenance',
    description: 'Minimal upkeep required over the life of the system',
  },
  {
    icon: CheckCircle,
    title: 'Energy Efficient',
    description: 'Reflective coatings reduce cooling costs significantly',
  },
];

const faqItems = [
  {
    question: 'What is standing seam metal roofing?',
    answer:
      'Standing seam metal roofing features vertical seams that are raised above the roof surface. These seams interlock to create a watertight system that expands and contracts with temperature changes without compromising the seal.',
  },
  {
    question: 'How long does metal roofing last?',
    answer:
      'Premium standing seam metal roofing typically lasts 40-70 years, significantly longer than TPO (20-30 years) or traditional asphalt systems (15-20 years). With proper maintenance, metal roofs can last 50+ years.',
  },
  {
    question: 'Is metal roofing good for Florida weather?',
    answer:
      'Yes! Metal roofing is ideal for Florida. It withstands hurricanes, salt air, intense UV, and heavy rainfall better than most alternatives. The reflective surface also reduces cooling costs in our hot climate.',
  },
  {
    question: 'What colors are available?',
    answer:
      'Standing seam metal roofing comes in many colors including silver, gray, charcoal, bronze, and custom options. Light colors are preferred in Florida to reflect heat and reduce cooling costs.',
  },
];

export default async function MetalRoofingPage() {
  const sanityFaqs = await getFAQs('metal-roofing');
  const faqs = sanityFaqs.length ? sanityFaqs : faqItems;

  return (
    <>
      <PremiumHero
        headline="Premium Metal Standing Seam Roofing"
        subheadline="Invest in a roof that lasts 40+ years. Hurricane-rated, energy-efficient, and built for South Florida's toughest conditions."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
        secondaryCTA={{ label: '(954) 247-8528', href: 'tel:+19542478528' }}
        phone="(954) 247-8528"
      />
      <TrustBar />

      {/* Quick Form — above fold conversion */}
      <section className="bg-brand-blue-pale border-b border-blue-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
          <QuickForm market="FL" defaultService="roofing" headline="Get a Free Metal Roofing Estimate" subheadline="40+ year lifespan · 160 mph wind rated · Same-day response" />
        </div>
      </section>

      {/* What is Metal Roofing Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <ScrollAnimation type="fade-right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                The Premium Choice: Standing Seam Metal Roofing
              </h2>
              <p className="text-brand-gray text-lg mb-4 leading-relaxed">
                Standing seam metal roofing represents the pinnacle of commercial roofing technology. With interlocking vertical seams and a durable metal substrate, this system provides unmatched longevity and performance.
              </p>
              <p className="text-brand-gray text-lg mb-6 leading-relaxed">
                Unlike traditional roofing systems that degrade over time, quality metal roofing can last 40-70 years, making it a smart long-term investment for commercial property owners.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-brand-dark">Hurricane-Rated</h4>
                    <p className="text-sm text-brand-gray">Engineered for extreme weather</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-brand-dark">Minimal Maintenance</h4>
                    <p className="text-sm text-brand-gray">No repairs needed for decades</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-brand-dark">Energy Savings</h4>
                    <p className="text-sm text-brand-gray">Reduces cooling costs 20-30%</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation type="fade-left">
            <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-brand-gray">
                  <div className="text-6xl mb-4">⬜</div>
                  <p>Metal Standing Seam Installation</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
              Why Choose Metal Roofing?
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollAnimation key={index} type="fade-up" delay={index * 0.1}>
                  <div className="bg-white border border-brand-gray-light rounded-xl p-8 hover:shadow-lg hover:border-brand-blue transition-all">
                    <Icon className="w-12 h-12 text-brand-blue mb-4" />
                    <h3 className="text-xl font-bold text-brand-dark mb-3">{benefit.title}</h3>
                    <p className="text-brand-gray leading-relaxed">{benefit.description}</p>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Estimator */}
      <section className="section-container">
        <ScrollAnimation type="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Get Your Free Estimate
          </h2>
        </ScrollAnimation>
        <Estimator defaultCategory="roofing-metal" market="FL" />
      </section>

      {/* FAQ */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
              Metal Roofing Questions
            </h2>
          </ScrollAnimation>
          <FAQAccordion items={faqs} title="Metal Roofing FAQs" />
        </div>
      </section>

      {/* Inspection Scheduler */}
      <section className="section-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Book Your Inspection</h2>
            <p className="text-brand-gray">Select your preferred window — we respond within 24–72 hours.</p>
          </div>
          <InspectionScheduler defaultInspectorType="roofing" locationMarket="FL" />
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Invest in a Metal Roof That Lasts Decades"
        subheadline="Get a free estimate for premium standing seam metal roofing from 51st State Construction."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
      />
    </>
  );
}

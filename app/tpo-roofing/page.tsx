import type { Metadata } from 'next';
import Link from 'next/link';
import TrustBar from '@/components/TrustBar';
import RoofEstimator from '@/components/RoofEstimator';
import CTABlock from '@/components/CTABlock';
import FAQAccordion from '@/components/FAQAccordion';
import ScrollAnimation from '@/components/ScrollAnimation';
import { CheckCircle, Zap, Droplet, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TPO Roofing | Single-Ply Flat Roof Installation | 51st State Roofing',
  description:
    'Professional TPO roofing installation and repair in South Florida. Energy-efficient single-ply membranes for commercial buildings. Free estimates.',
  keywords: 'TPO roofing, flat roof, single-ply membrane, TPO installation Miami, Broward roofing',
};

const benefits = [
  {
    icon: Zap,
    title: 'Energy Efficient',
    description: 'Reflective surface reduces cooling costs by up to 30% in South Florida heat',
  },
  {
    icon: Droplet,
    title: 'Weather Resistant',
    description: 'Single-ply membrane provides excellent protection against rain, UV, and wind',
  },
  {
    icon: CheckCircle,
    title: '20-30 Year Lifespan',
    description: 'Durable system with proper maintenance and care',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Recyclable TPO material that reduces environmental impact',
  },
];

const faqItems = [
  {
    question: 'What is TPO roofing?',
    answer:
      'TPO (Thermoplastic Olefin) is a single-ply roofing membrane made from rubber and plastic. It\'s the most popular choice for commercial flat roofs due to its durability, energy efficiency, and cost-effectiveness.',
  },
  {
    question: 'How long does TPO roofing last?',
    answer:
      'TPO roofing typically lasts 20-30 years with proper maintenance. Some systems last even longer with regular care and inspections.',
  },
  {
    question: 'Is TPO roofing good for South Florida weather?',
    answer:
      'Yes! TPO is excellent for our climate. The reflective surface reduces heat absorption, and the material is designed to withstand high winds, heavy rain, and intense UV exposure.',
  },
  {
    question: 'Can TPO roofing be repaired?',
    answer:
      'Absolutely. Small punctures and tears can be patched easily. We offer preventative maintenance and repair services to extend your roof\'s life.',
  },
  {
    question: 'How much does TPO roofing cost?',
    answer:
      'TPO is one of the most cost-effective commercial roofing options. Pricing depends on roof size, condition, and access. Get a free estimate from our team.',
  },
];

export default function TPORoofingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-dark via-gray-800 to-brand-dark text-white">
        <div className="section-container">
          <h1 className="hero-text text-white mb-4">
            TPO <span className="text-brand-blue">Flat Roofing</span>
          </h1>
          <p className="hero-subtitle text-gray-300 mb-8">
            Energy-efficient single-ply roofing perfect for South Florida commercial buildings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Link href="/contact" className="btn-primary">
              Get Free Estimate
            </Link>
            <a href="tel:+19542478528" className="btn-secondary">
              (954) 247-8528
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* What is TPO Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <ScrollAnimation type="fade-right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                What is TPO Roofing?
              </h2>
            <p className="text-brand-gray text-lg mb-4 leading-relaxed">
              TPO (Thermoplastic Olefin) is a single-ply membrane roofing system engineered for
              commercial flat roofs. It combines rubber and plastic polymers to create a durable,
              flexible, and energy-efficient roofing solution.
            </p>
            <p className="text-brand-gray text-lg mb-6 leading-relaxed">
              The white or light-colored surface reflects sunlight, reducing building heat absorption
              and lowering cooling costs significantly in South Florida's climate.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-brand-dark">Waterproof</h4>
                  <p className="text-sm text-brand-gray">Exceptional weather resistance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-brand-dark">Flexible</h4>
                  <p className="text-sm text-brand-gray">Accommodates building movement</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-brand-dark">Cost-Effective</h4>
                  <p className="text-sm text-brand-gray">One of the most affordable options</p>
                </div>
              </div>
            </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation type="fade-left">
            <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-400/20 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">⬜</div>
                <p>TPO Roofing Installation</p>
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
              Why Choose TPO Roofing?
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

      {/* Service Detail */}
      <section className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
          Our TPO Roofing Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-brand-gray-light p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">New Installation</h3>
            <p className="text-brand-gray mb-4 leading-relaxed">
              Complete TPO roof installation for new construction or replacement projects. We handle
              everything from underlayment to final sealing.
            </p>
            <ul className="space-y-2 text-sm text-brand-gray">
              <li>✓ Full system replacement</li>
              <li>✓ Professional sealing & fastening</li>
              <li>✓ Proper drainage systems</li>
              <li>✓ Extended warranty coverage</li>
            </ul>
          </div>

          <div className="bg-brand-gray-light p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Repairs & Maintenance</h3>
            <p className="text-brand-gray mb-4 leading-relaxed">
              Keep your TPO roof in peak condition with regular maintenance and prompt repairs. We
              catch small issues before they become expensive problems.
            </p>
            <ul className="space-y-2 text-sm text-brand-gray">
              <li>✓ Leak detection & repair</li>
              <li>✓ Seam maintenance</li>
              <li>✓ Preventative inspections</li>
              <li>✓ Emergency services 24/7</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <RoofEstimator pageSource="tpo-roofing-page" showTitle={true} />
        </div>
      </section>

      {/* Why South Florida Loves TPO */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Built for South Florida Weather
          </h2>
          <p className="text-lg text-brand-gray">
            TPO roofing is specifically designed for the challenges of our climate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-brand-blue rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">☀️</div>
            <h3 className="font-bold text-brand-dark mb-3">Intense Heat</h3>
            <p className="text-sm text-brand-gray">
              Reflective TPO surface stays cooler and reduces interior temperatures, cutting air
              conditioning costs.
            </p>
          </div>

          <div className="bg-white border-2 border-brand-blue rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">🌊</div>
            <h3 className="font-bold text-brand-dark mb-3">Heavy Rain</h3>
            <p className="text-sm text-brand-gray">
              Waterproof membrane with sealed seams prevents leaks during tropical storms and
              frequent downpours.
            </p>
          </div>

          <div className="bg-white border-2 border-brand-blue rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">💨</div>
            <h3 className="font-bold text-brand-dark mb-3">High Winds</h3>
            <p className="text-sm text-brand-gray">
              Flexible TPO material resists wind damage and is hurricane-rated for South Florida
              standards.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-gray-light">
        <FAQAccordion
          title="TPO Roofing Questions"
          items={faqItems}
        />
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Ready to Upgrade to TPO Roofing?"
        subheadline="Get a free estimate from 51st State Roofing. Energy-efficient, durable, and built for South Florida."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
      />
    </>
  );
}

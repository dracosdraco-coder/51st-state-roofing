import type { Metadata } from 'next';
import Link from 'next/link';
import TrustBar from '@/components/TrustBar';
import CTABlock from '@/components/CTABlock';
import ScrollAnimation from '@/components/ScrollAnimation';
import FAQAccordion from '@/components/FAQAccordion';
import PremiumHero from '@/components/PremiumHero';
import { CheckCircle, Camera, AlertCircle, ClipboardList } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Roof Inspections | 51st State Construction | South Florida',
  description:
    'Comprehensive commercial roof inspections in Miami, Broward, Palm Beach. Identify damage early, get detailed reports, insurance documentation. Free estimates.',
  keywords: 'roof inspection, commercial roof inspection, Miami roofing inspection, damage assessment',
};

const inspectionSteps = [
  {
    step: 1,
    icon: Camera,
    title: 'Visual Inspection',
    description: 'Our team conducts a thorough visual assessment of your entire roof system, checking for damage, deterioration, and potential issues.',
  },
  {
    step: 2,
    icon: ClipboardList,
    title: 'Detailed Documentation',
    description: 'We document all findings with photos and measurements, creating a comprehensive report of the roof\'s current condition.',
  },
  {
    step: 3,
    icon: AlertCircle,
    title: 'Damage Assessment',
    description: 'Our experts identify any damage, leaks, wear patterns, and areas that may need repair or replacement soon.',
  },
  {
    step: 4,
    icon: CheckCircle,
    title: 'Recommendations',
    description: 'You receive a detailed report with repair recommendations, cost estimates, and timeline for any work needed.',
  },
];

const faqItems = [
  {
    question: 'How often should I have my roof inspected?',
    answer:
      'We recommend professional roof inspections at least annually, and more frequently if your roof is older or if you\'ve experienced severe weather. After storms, inspections can identify damage before it becomes costly.',
  },
  {
    question: 'What does a professional roof inspection include?',
    answer:
      'Our comprehensive inspection includes visual assessment of the entire roof surface, flashing, seams, penetrations, drainage systems, and interior attic space. We check for leaks, deterioration, punctures, and maintenance issues.',
  },
  {
    question: 'Can you provide documentation for insurance claims?',
    answer:
      'Yes! Our detailed inspection reports with photos and measurements are perfect for insurance claims. We provide comprehensive documentation suitable for submitting to insurance companies.',
  },
  {
    question: 'How much does a roof inspection cost?',
    answer:
      'Most inspections are free when you\'re considering repairs or replacement. Even if you just want a maintenance check, our inspection fees are minimal compared to the cost of undetected damage.',
  },
];

export default function RoofInspectionPage() {
  return (
    <>
      <PremiumHero
        headline="Professional Roof Inspections"
        subheadline="Comprehensive assessments to identify damage early, prevent costly repairs, and protect your commercial investment."
        primaryCTA={{ label: 'Schedule Free Inspection', href: '/contact' }}
        secondaryCTA={{ label: 'Call (561) 985-2484', href: 'tel:+15619852484' }}
        phone="(561) 985-2484"
      />
      <TrustBar />

      {/* Why Inspections Matter */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <ScrollAnimation type="fade-right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                Prevent Costly Damage with Regular Inspections
              </h2>
              <p className="text-brand-gray text-lg mb-4 leading-relaxed">
                Small roof problems can quickly become expensive repairs if left undetected. Professional inspections catch issues early, protecting your building and your bottom line.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-brand-dark">Early Problem Detection</h4>
                    <p className="text-sm text-brand-gray">Catch issues before they become expensive</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-blue flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-brand-dark">Insurance Documentation</h4>
                    <p className="text-sm text-brand-gray">Detailed reports for claims and coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation type="fade-left">
            <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-brand-gray">
                  <div className="text-6xl mb-4">🔍</div>
                  <p>Professional Roof Inspection</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
              Roof Inspection Questions
            </h2>
          </ScrollAnimation>
          <FAQAccordion items={faqItems} title="Inspection FAQs" />
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Schedule Your Free Professional Roof Inspection Today"
        subheadline="Get comprehensive assessment from South Florida's roofing experts. Identify issues early, protect your investment."
        primaryCTA={{ label: 'Schedule Inspection', href: '/contact' }}
      />
    </>
  );
}

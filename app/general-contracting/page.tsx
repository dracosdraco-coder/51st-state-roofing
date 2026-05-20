import type { Metadata } from 'next';
import Link from 'next/link';
import { HardHat, Building2, Wrench, ClipboardList, CheckCircle, Phone, Users } from 'lucide-react';
import ScrollAnimation from '@/components/ScrollAnimation';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'General Contracting | 51st State Construction',
  description: 'Full-scope commercial general contracting services. Ground-up construction, tenant improvements, renovations, and project management across Florida and North Carolina.',
};

const services = [
  {
    icon: Building2,
    title: 'Ground-Up Construction',
    description: 'New commercial builds from site prep through certificate of occupancy. We manage every trade so you don\'t have to.',
  },
  {
    icon: Wrench,
    title: 'Tenant Improvements',
    description: 'Retail buildouts, office renovations, and industrial upgrades — delivered on schedule with minimal disruption to operations.',
  },
  {
    icon: ClipboardList,
    title: 'Project Management',
    description: 'End-to-end oversight including permitting, subcontractor coordination, scheduling, and owner reporting.',
  },
  {
    icon: HardHat,
    title: 'Commercial Renovation',
    description: 'Exterior facelifts, structural upgrades, MEP retrofits, and envelope improvements for existing commercial properties.',
  },
  {
    icon: Users,
    title: 'Design-Build',
    description: 'Single-source accountability from concept through construction. We coordinate design and delivery under one contract.',
  },
  {
    icon: CheckCircle,
    title: 'Pre-Construction Services',
    description: 'Budgeting, scheduling, value engineering, and constructability review before a single dollar hits the ground.',
  },
];

const sectors = [
  'Retail & Mixed-Use',
  'Office & Medical',
  'Industrial & Warehouse',
  'Hospitality & Restaurant',
  'Multi-Family',
  'Institutional',
];

const process = [
  { step: '01', title: 'Discovery', desc: 'We assess your project scope, site, budget, and timeline before committing to anything.' },
  { step: '02', title: 'Pre-Construction', desc: 'Permitting, value engineering, subcontractor bidding, and detailed scheduling.' },
  { step: '03', title: 'Construction', desc: 'Daily site supervision, quality control, and regular owner updates throughout.' },
  { step: '04', title: 'Closeout', desc: 'Punch list, final inspections, as-builts, warranties, and certificate of occupancy.' },
];

export default function GeneralContractingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-dark text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-brand-blue text-sm font-semibold mb-4">
            <HardHat size={16} />
            General Contracting
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Commercial Construction<br />
            <span className="text-brand-blue">Done Right, Start to Finish</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            51st State Construction manages the full scope — design coordination, permitting, subcontractors, and quality control — so your project delivers on time and on budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-primary text-center">
              Start Your Project
            </Link>
            <a href="tel:+15619852484" className="flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-dark transition-colors">
              <Phone size={18} />
              (561) 985-2484
            </a>
          </div>
          <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-400">
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-blue" /> Licensed CGC1527726</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-blue" /> FL & NC Markets</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-blue" /> Single-Source Accountability</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">GC Services</h2>
            <p className="text-brand-gray mb-12 max-w-2xl">From a single tenant improvement to a multi-phase ground-up build, we bring the same standards to every scope.</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-blue hover:shadow-lg transition-all">
                    <Icon size={36} className="text-brand-blue mb-4" />
                    <h3 className="text-lg font-bold text-brand-dark mb-2">{service.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{service.description}</p>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation type="fade-right">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Sectors We Serve</h2>
              <p className="text-brand-gray mb-8">We work across commercial property types, with specific experience in high-finish and time-sensitive environments.</p>
              <div className="grid grid-cols-2 gap-3">
                {sectors.map((sector, i) => (
                  <div key={i} className="flex items-center gap-2 text-brand-gray text-sm">
                    <CheckCircle size={16} className="text-brand-blue shrink-0" />
                    {sector}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary inline-block">Discuss Your Project</Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left">
              <div className="bg-brand-blue-pale rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  {[
                    { stat: '15+', label: 'Years in Business' },
                    { stat: '500+', label: 'Projects Delivered' },
                    { stat: '2', label: 'States Licensed' },
                    { stat: '100%', label: 'Bonded & Insured' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="text-3xl font-bold text-brand-blue">{item.stat}</div>
                      <div className="text-sm text-brand-gray mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">How We Work</h2>
            <p className="text-brand-gray mb-12">A transparent process with no surprises — from first call to final walkthrough.</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="text-3xl font-bold text-brand-blue mb-3">{step.step}</div>
                  <h3 className="font-bold text-brand-dark mb-2">{step.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{step.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        headline="Ready to Start Your Commercial Project?"
        subheadline="Tell us what you're building. We'll put together a realistic scope, budget, and timeline — no obligation."
        primaryCTA={{ label: 'Start the Conversation', href: '/contact' }}
      />
    </main>
  );
}

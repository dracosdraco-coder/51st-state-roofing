import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PremiumHero from '@/components/PremiumHero';
import TrustBar from '@/components/TrustBar';
import { CheckCircle, Shield, Wrench, Droplets, Building2, Search, Award } from 'lucide-react';
import ScrollAnimation from '@/components/ScrollAnimation';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Concrete Restoration & Repair | 51st State Construction',
  description: 'ICRI-certified concrete restoration, structural repair, and waterproofing for commercial and industrial properties across Florida and North Carolina.',
};

const services = [
  {
    icon: Wrench,
    title: 'Structural Steel Restoration',
    description: 'Assessment and repair of deteriorated structural steel elements — surface preparation, rust treatment, primer and topcoat systems to stop corrosion and restore load capacity.',
  },
  {
    icon: Building2,
    title: 'EIFS Systems',
    description: 'Exterior Insulation and Finish System installation, repair, and remediation. Water intrusion diagnosis, substrate repair, and full system replacement for commercial facades.',
  },
  {
    icon: Droplets,
    title: 'Waterproofing & Coatings',
    description: 'Below-grade waterproofing, traffic-bearing deck coatings, and elastomeric wall coatings. Certified installer for leading waterproofing and concrete coating brands.',
  },
  {
    icon: Shield,
    title: 'Caulking & Sealants',
    description: 'Joint sealing for expansion joints, perimeter conditions, window and curtain wall systems, and penetrations — using materials specified for movement, UV, and chemical exposure.',
  },
  {
    icon: Search,
    title: 'Concrete Finishing & Repair',
    description: 'Over 20 years of combined concrete finishing experience. Spall repair, crack injection, resurfacing overlays, and surface preparation for coating systems.',
  },
  {
    icon: Award,
    title: 'Railings & Metal Work',
    description: 'Commercial railing installation and restoration — steel, aluminum, and cable systems for balconies, stairs, parking structures, and exterior applications.',
  },
];

const whyUs = [
  'ICRI member — International Concrete Repair Institute certified methodology',
  'AIA continuing education credit provider for design professionals',
  'COCPB certified — recognized by the Concrete & Polymer Composites technical board',
  'PBCC member — Palm Beach County Contractors Association',
  'Certified installer for major concrete and waterproofing brands',
  'Professional Engineers employed for internal and job site quality control',
  'Licensed CGC1527726 — bonded and insured for commercial projects',
];

const applications = [
  { name: 'Parking Structures', detail: 'Decks, ramps, columns, walls' },
  { name: 'Marine & Waterfront', detail: 'Piers, seawalls, bulkheads' },
  { name: 'Bridges & Overpasses', detail: 'Decks, substructure elements' },
  { name: 'Industrial Facilities', detail: 'Floors, containment, foundations' },
  { name: 'Commercial Buildings', detail: 'Facades, balconies, planters' },
  { name: 'Stadiums & Arenas', detail: 'Concourses, ramps, seating bowls' },
];

export default function ConcreteRestorationPage() {
  return (
    <>
      <PremiumHero
        headline="Concrete Restoration & Structural Repair"
        subheadline="ICRI-certified concrete restoration, steel repair, waterproofing, and EIFS systems for commercial and industrial properties across Florida and North Carolina."
        primaryCTA={{ label: 'Request an Assessment', href: '/contact' }}
        secondaryCTA={{ label: '(561) 985-2484', href: 'tel:+15619852484' }}
        phone="(561) 985-2484"
      />
      <TrustBar />

      {/* Certifications Banner */}
      <section className="py-10 bg-brand-blue-pale border-y border-blue-100">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-brand-dark font-semibold text-center md:text-left">
              Industry-recognized certifications that set the standard for concrete repair quality:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <Image src="/ICRI_CONCRETE.png" alt="ICRI Concrete Repair Certification" width={100} height={60} className="object-contain" />
              <Image src="/AIA_credit.png" alt="AIA Continuing Education Credit" width={100} height={60} className="object-contain" />
              <Image src="/COCPB.png" alt="COCPB Certification" width={100} height={60} className="object-contain" />
            </div>
            <Link href="/certifications" className="text-brand-blue font-semibold text-sm hover:underline whitespace-nowrap">
              View All Certifications →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Concrete Restoration Services</h2>
            <p className="text-brand-gray mb-12 max-w-2xl">We follow ICRI Technical Guidelines on every project — from initial survey through material selection to final inspection.</p>
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

      {/* Why Choose Us */}
      <section>
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation type="fade-right">
              <h2 className="text-3xl font-bold text-brand-dark mb-6">Why Specify 51st State for Concrete Restoration</h2>
              <ul className="space-y-4">
                {whyUs.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-gray">
                    <CheckCircle size={18} className="text-brand-blue mt-0.5 shrink-0" />
                    <span className="text-sm">{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4">
                <Link href="/certifications" className="btn-primary inline-block">View Certifications</Link>
                <Link href="/contact" className="border-2 border-brand-blue text-brand-blue px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue hover:text-white transition-colors inline-block">
                  Request Assessment
                </Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left">
              <div className="bg-brand-blue-pale rounded-2xl p-8">
                <h3 className="font-bold text-brand-dark mb-6 text-lg">Applications</h3>
                <div className="space-y-3">
                  {applications.map((app, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-brand-blue mt-0.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-brand-dark text-sm">{app.name}</span>
                        <span className="text-brand-gray text-sm"> — {app.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">How We Work</h2>
            <p className="text-brand-gray mb-12 max-w-2xl">Every restoration project starts with an honest assessment — we find the root cause before recommending any repair.</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Site Assessment', desc: 'We evaluate existing conditions — concrete, steel, EIFS, joints, coatings — before specifying any materials or scope.' },
              { step: '02', title: 'Scope & Specification', desc: 'A clear written scope with materials, surface prep requirements, and quality hold points. No surprises mid-project.' },
              { step: '03', title: 'Certified Installation', desc: 'Work performed by trained applicators using certified products per manufacturer requirements and ICRI guidelines.' },
              { step: '04', title: 'QC & Documentation', desc: 'Professional Engineer oversight, material test documentation, and post-installation inspection for every project.' },
            ].map((step, i) => (
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
        headline="Restoration Problem? Let&apos;s Take a Look."
        subheadline="Over 20 years of combined concrete and restoration experience. We&apos;ll assess the damage and give you a clear plan before any work begins."
        primaryCTA={{ label: 'Request Assessment', href: '/contact' }}
      />
    </>
  );
}

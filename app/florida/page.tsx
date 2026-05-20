import type { Metadata } from 'next';
import Link from 'next/link';
import PremiumHero from '@/components/PremiumHero';
import TrustBar from '@/components/TrustBar';
import { MapPin, Shield, Wrench, Search, Layers, CheckCircle } from 'lucide-react';
import ScrollAnimation from '@/components/ScrollAnimation';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Commercial Roofing Florida | 51st State Construction',
  description: 'Licensed commercial roofing contractor serving Miami-Dade, Broward, and Palm Beach counties. TPO, metal, flat roofing, and roof inspections.',
};

const services = [
  {
    icon: Layers,
    title: 'TPO & Flat Roofing',
    description: 'Energy-efficient thermoplastic membranes built for Florida heat, UV exposure, and hurricane-season wind uplift.',
    href: '/tpo-roofing',
  },
  {
    icon: Shield,
    title: 'Metal Roofing',
    description: 'Standing-seam and corrugated metal systems rated for 140+ mph winds — the last roof you\'ll ever need.',
    href: '/metal-roofing',
  },
  {
    icon: Search,
    title: 'Roof Inspection',
    description: 'Detailed inspections for insurance claims, pre-purchase due diligence, and annual maintenance reviews.',
    href: '/roof-inspection',
  },
  {
    icon: Wrench,
    title: 'Roof Repair',
    description: 'Planned maintenance and targeted patching to extend the service life of your existing commercial roof.',
    href: '/contact',
  },
];

const counties = [
  {
    name: 'Miami-Dade County',
    cities: ['Miami', 'Hialeah', 'Coral Gables', 'Doral', 'Homestead'],
  },
  {
    name: 'Broward County',
    cities: ['Fort Lauderdale', 'Hollywood', 'Pembroke Pines', 'Miramar', 'Coral Springs'],
  },
  {
    name: 'Palm Beach County',
    cities: ['West Palm Beach', 'Boca Raton', 'Boynton Beach', 'Delray Beach', 'Lake Worth'],
  },
];

const reasons = [
  'Licensed & insured — Florida General Contractor CGC1527726',
  '20+ years of combined experience in commercial construction',
  'Proven experience in HVHZ zones and coastal regions',
  'Professional Engineers employed for job site quality control',
  'PBCC member — Palm Beach County Contractors Association',
  'All work backed by manufacturer and labor warranties',
];

export default function FloridaPage() {
  return (
    <>
      <PremiumHero
        headline="Commercial Roofing Built for Florida"
        subheadline="Miami-Dade, Broward, and Palm Beach county's trusted commercial roofing contractor. Hurricane-rated systems, HVHZ certified, and PE quality control on every job."
        primaryCTA={{ label: 'Get Free Inspection', href: '/contact' }}
        secondaryCTA={{ label: '(561) 985-2484', href: 'tel:+15619852484' }}
        phone="(561) 985-2484"
        videoSrc="/home_video.mp4"
      />
      <TrustBar />

      {/* Services */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Florida Roofing Services</h2>
            <p className="text-brand-gray mb-12 max-w-2xl">Every system we install is selected and specified for South Florida&apos;s climate — not a one-size-fits-all catalog option.</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                  <Link href={service.href} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-brand-blue hover:shadow-lg transition-all group block">
                    <Icon size={40} className="text-brand-blue mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-blue transition-colors">{service.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{service.description}</p>
                  </Link>
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
              <h2 className="text-3xl font-bold text-brand-dark mb-6">Why Florida Property Managers Choose Us</h2>
              <ul className="space-y-4">
                {reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-gray">
                    <CheckCircle size={18} className="text-brand-blue mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary inline-block">Request a Quote</Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left">
              <div className="bg-brand-blue-pale rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  {[
                    { stat: '20+', label: 'Years Combined Experience' },
                    { stat: '500+', label: 'Commercial Projects' },
                    { stat: '3', label: 'Counties Served' },
                    { stat: 'PE', label: 'Quality Control On-Site' },
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

      {/* Service Areas */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Service Areas</h2>
            <p className="text-brand-gray mb-12">We serve commercial properties throughout South Florida&apos;s tri-county area.</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {counties.map((county, i) => (
              <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={18} className="text-brand-blue" />
                    <h3 className="font-bold text-brand-dark">{county.name}</h3>
                  </div>
                  <ul className="space-y-1">
                    {county.cities.map((city) => (
                      <li key={city} className="text-brand-gray text-sm">{city}</li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        headline="Get a Free Commercial Roof Inspection Today"
        subheadline="Same-day estimates. No pressure. Just straight talk about your roof."
        primaryCTA={{ label: 'Schedule Inspection', href: '/contact' }}
      />
    </> 
  );
}

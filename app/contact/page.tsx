import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import QuickForm from '@/components/QuickForm';
import TrustBar from '@/components/TrustBar';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Free Estimate | 51st State Construction | Florida & North Carolina',
  description: 'Get a free estimate for commercial roofing, concrete restoration, general contracting, or millwork. Florida and North Carolina. Same-day response.',
};

const contactDetails = [
  {
    icon: Phone,
    label: 'Florida',
    value: '(561) 985-2484',
    href: 'tel:+15619852484',
    sub: 'Mon–Fri 8am–5pm',
  },
  {
    icon: Phone,
    label: 'North Carolina',
    value: '(919) 871-4455',
    href: 'tel:+19198714455',
    sub: 'Mon–Fri 8am–5pm',
  },
  {
    icon: Mail,
    label: 'Email',
    value: '51statereno@gmail.com',
    href: 'mailto:51statereno@gmail.com',
    sub: 'Response within 2 hours',
  },
  {
    icon: MapPin,
    label: 'Markets',
    value: 'Florida & North Carolina',
    href: '/locations',
    sub: 'Miami-Dade · Broward · Palm Beach · Charlotte · Raleigh',
  },
];

export default function ContactPage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero — form first, above the fold */}
      <section className="bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — value prop */}
            <div className="text-white">
              <p className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-4">Free · No Obligation · Same Day</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get Your Free<br />Estimate Today
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Commercial roofing, concrete restoration, general contracting, and custom millwork — across Florida and North Carolina. Tell us what you need, we&apos;ll respond within 24 hours.
              </p>

              {/* Phone numbers prominent */}
              <div className="space-y-3 mb-8">
                <a
                  href="tel:+15619852484"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg group-hover:text-brand-blue transition-colors">(561) 985-2484</p>
                    <p className="text-gray-400 text-xs">Florida · Mon–Fri 8am–5pm</p>
                  </div>
                </a>
                <a
                  href="tel:+19198714455"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg group-hover:text-brand-blue transition-colors">(919) 871-4455</p>
                    <p className="text-gray-400 text-xs">North Carolina · Mon–Fri 8am–5pm</p>
                  </div>
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4">
                {['Licensed GC CGC1527726', 'ICRI Certified', 'PE Quality Control', 'Free Estimates'].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Shield size={12} className="text-brand-blue" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — QuickForm */}
            <div>
              <QuickForm
                market="NATIONAL"
                headline=""
                subheadline=""
                dark={false}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Contact details grid */}
      <section className="section-container">
        <ScrollAnimation type="fade-up">
          <h2 className="text-2xl font-bold text-brand-dark mb-8">Contact Details</h2>
        </ScrollAnimation>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollAnimation key={i} type="fade-up" delay={i * 0.08}>
                <a
                  href={item.href}
                  className="block p-6 bg-white border border-gray-200 rounded-2xl hover:border-brand-blue hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-brand-blue-pale rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-blue transition-colors">
                    <Icon size={18} className="text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-brand-gray font-semibold uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="font-bold text-brand-dark mb-1 group-hover:text-brand-blue transition-colors">{item.value}</p>
                  <p className="text-xs text-brand-gray">{item.sub}</p>
                </a>
              </ScrollAnimation>
            );
          })}
        </div>
      </section>

      {/* Second form — bottom of page for users who scroll */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <ScrollAnimation type="fade-up">
              <h2 className="text-3xl font-bold text-brand-dark mb-2">Ready to Get Started?</h2>
              <p className="text-brand-gray">Fill out the form below and we&apos;ll reach out within 24 hours.</p>
            </ScrollAnimation>
          </div>
          <div className="max-w-xl mx-auto">
            <QuickForm market="NATIONAL" headline="" subheadline="" />
          </div>
        </div>
      </section>

      {/* License info */}
      <section className="section-container">
        <ScrollAnimation type="fade-up">
          <div className="bg-brand-blue-pale rounded-2xl p-6 flex flex-wrap items-center gap-6">
            <Clock size={20} className="text-brand-blue shrink-0" />
            <div>
              <p className="font-semibold text-brand-dark text-sm">24/7 Emergency Service Available</p>
              <p className="text-xs text-brand-gray mt-0.5">Florida License CGC1527726 · Fully insured & bonded · ICRI certified</p>
            </div>
            <a href="tel:+15619852484" className="ml-auto btn-primary text-sm whitespace-nowrap">
              Call Now
            </a>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}

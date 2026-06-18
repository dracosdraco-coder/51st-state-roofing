'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Phone } from 'lucide-react';
import InspectionScheduler from '@/components/InspectionScheduler';

interface Campaign {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  inspectorType: 'roofing' | 'siding' | 'commercial';
  market: 'FL' | 'NC' | 'NATIONAL';
  trust: string[];
  badge: string;
}

interface Props {
  campaign: Campaign;
  slug: string;
}

const phoneByMarket: Record<string, string> = {
  FL: '(561) 985-2484',
  NC: '(561) 985-2484',
  NATIONAL: '(561) 985-2484',
};

export default function LandingPageClient({ campaign, slug }: Props) {
  const [utmParams, setUtmParams] = useState('');
  const phone = phoneByMarket[campaign.market];
  const telHref = `tel:+1${phone.replace(/\D/g, '')}`;

  // Capture UTM params from URL on mount — passed through to forms
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
      const captured = utmKeys
        .filter(k => params.has(k))
        .map(k => `${k}=${params.get(k)}`)
        .join('&');
      setUtmParams(captured);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal nav — no distraction */}
      <header className="bg-brand-dark px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/51statelogo.png"
            alt="51st State Construction"
            width={140}
            height={40}
            className="object-contain brightness-0 invert"
          />
        </Link>
        <a
          href={telHref}
          className="flex items-center gap-2 text-white font-bold text-sm hover:text-brand-blue transition-colors"
        >
          <Phone size={16} />
          {phone}
        </a>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-gray-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-brand-blue bg-brand-blue/10 border border-brand-blue/30 px-3 py-1 rounded-full mb-6">
            {campaign.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{campaign.headline}</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{campaign.subheadline}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {campaign.trust.map(item => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-gray-300">
                <CheckCircle size={14} className="text-brand-blue" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form — the single CTA */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-2">{campaign.ctaLabel}</h2>
            <p className="text-brand-gray text-sm">We respond within 24–72 hours. No spam, no pressure.</p>
          </div>
          <InspectionScheduler
            defaultInspectorType={campaign.inspectorType}
            locationMarket={campaign.market}
          />
        </div>
      </section>

      {/* Social proof strip */}
      <section className="bg-brand-gray-light py-10 px-4 text-center">
        <p className="text-sm text-brand-gray mb-6">Trusted by commercial property owners across both markets</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Image src="/ICRI_CONCRETE.png" alt="ICRI" width={80} height={44} className="object-contain opacity-70" />
          <Image src="/AIA_credit.png" alt="AIA CE" width={80} height={44} className="object-contain opacity-70" />
          <Image src="/COCPB.png" alt="COCPB" width={80} height={44} className="object-contain opacity-70" />
        </div>
      </section>

      {/* Footer — minimal */}
      <footer className="bg-brand-dark px-6 py-6 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} 51st State Construction · FL License CGC1527726 ·{' '}
          <a href={telHref} className="text-brand-blue hover:underline">{phone}</a>
        </p>
      </footer>

      {/* Hidden UTM debug (dev only) */}
      {process.env.NODE_ENV === 'development' && utmParams && (
        <div className="fixed bottom-2 right-2 bg-black/80 text-green-400 text-xs px-3 py-2 rounded-lg font-mono">
          {utmParams}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react';
import Estimator from '@/components/Estimator';
import InspectionScheduler from '@/components/InspectionScheduler';
import TrustBar from '@/components/TrustBar';
import ScrollAnimation from '@/components/ScrollAnimation';

type Market = 'FL' | 'NC';

const marketDetails = {
  FL: {
    label: 'South Florida',
    sublabel: 'Miami-Dade · Broward · Palm Beach',
    phone: '(954) 247-8528',
    tel: 'tel:+19542478528',
  },
  NC: {
    label: 'North Carolina',
    sublabel: 'Charlotte · Raleigh · Greensboro · Durham',
    phone: '(954) 247-8528',
    tel: 'tel:+19542478528',
  },
};

const howItWorks = [
  {
    step: '01',
    title: 'Pick your project type',
    body: 'Choose from roofing, siding & exterior, or large commercial scope.',
  },
  {
    step: '02',
    title: 'Enter your square footage',
    body: 'An approximate number is fine — the estimator builds in a realistic range.',
  },
  {
    step: '03',
    title: 'Select material tier & complexity',
    body: 'Standard through Elite tiers, adjusted for site difficulty.',
  },
  {
    step: '04',
    title: 'Get your range instantly',
    body: 'Real market pricing for FL or NC. Email it to yourself, or book an inspection.',
  },
];

export default function EstimatorClient() {
  const [market, setMarket] = useState<Market>('FL');
  const [showScheduler, setShowScheduler] = useState(false);
  const details = marketDetails[market];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Calculator size={13} />
            Instant Project Estimator
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Know Your Numbers<br />Before You Call Anyone
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Real market pricing for Florida and North Carolina commercial projects — roofing, siding &amp; exterior, and large commercial scopes. No email required to see your range.
          </p>

          {/* Market selector */}
          <div className="inline-flex bg-white/10 rounded-2xl p-1.5 gap-1.5">
            {(Object.keys(marketDetails) as Market[]).map(m => (
              <button
                key={m}
                onClick={() => { setMarket(m); setShowScheduler(false); }}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  market === m
                    ? 'bg-white text-brand-dark shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="block">{marketDetails[m].label}</span>
                <span className={`text-xs font-normal ${market === m ? 'text-brand-gray' : 'text-gray-500'}`}>
                  {marketDetails[m].sublabel}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main estimator */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Estimator market={market} />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-sm text-amber-800">
            <strong>About these estimates:</strong> Ranges are based on current {details.label} market pricing and are planning guides only. Final pricing depends on site conditions, material availability, and detailed scope. Book a free inspection for a firm number.
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-brand-gray-light py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-dark mb-2">How It Works</h2>
              <p className="text-brand-gray">Four inputs. Instant output. Built on real local market data.</p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <ScrollAnimation key={i} type="fade-up" delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
                  <span className="text-4xl font-black text-brand-blue/20 block mb-3">{item.step}</span>
                  <h3 className="font-bold text-brand-dark mb-2 text-sm">{item.title}</h3>
                  <p className="text-brand-gray text-xs leading-relaxed">{item.body}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Book inspection */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Ready for a Firm Number?</h2>
            <p className="text-brand-gray">
              Book a free on-site inspection with our {details.label} team. We respond within 24–72 hours.
            </p>
          </div>

          {!showScheduler ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowScheduler(true)}
                className="btn-primary flex items-center gap-2 text-base px-8 py-4"
              >
                Book Free Inspection <ArrowRight size={16} />
              </button>
              <a
                href={details.tel}
                className="font-semibold text-brand-dark hover:text-brand-blue transition-colors"
              >
                Or call {details.phone}
              </a>
            </div>
          ) : (
            <InspectionScheduler defaultInspectorType="roofing" locationMarket={market} />
          )}
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-brand-dark py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Licensed GC CGC1527726', 'PE Quality Control', 'ICRI Certified', 'No-Pressure Estimates'].map(item => (
              <div key={item} className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <CheckCircle size={14} className="text-brand-blue shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

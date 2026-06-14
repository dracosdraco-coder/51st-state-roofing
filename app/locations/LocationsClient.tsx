'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import InspectionScheduler from '@/components/InspectionScheduler';
import ScrollAnimation from '@/components/ScrollAnimation';

type Market = 'FL' | 'NC';

const markets = {
  FL: {
    id: 'FL' as Market,
    name: 'South Florida',
    tagline: 'Miami-Dade · Broward · Palm Beach',
    description: 'Our Florida team handles commercial roofing, concrete restoration, and general contracting across South Florida\'s three major counties.',
    phone: '(954) 247-8528',
    tel: 'tel:+19542478528',
    email: '51statereno@gmail.com',
    address: 'Fort Lauderdale, FL 33316',
    hours: 'Mon – Fri, 8am – 5pm',
    license: 'FL GC License CGC1527726',
    services: ['Commercial Roofing', 'TPO & Metal Roofing', 'Concrete Restoration', 'General Contracting', 'Roof Inspection'],
    counties: [
      {
        name: 'Miami-Dade County',
        cities: ['Miami', 'Coral Gables', 'Hialeah', 'Doral', 'Aventura', 'Homestead', 'Miami Beach', 'Kendall'],
      },
      {
        name: 'Broward County',
        cities: ['Fort Lauderdale', 'Hollywood', 'Pembroke Pines', 'Miramar', 'Coral Springs', 'Pompano Beach', 'Davie', 'Deerfield Beach'],
      },
      {
        name: 'Palm Beach County',
        cities: ['West Palm Beach', 'Boca Raton', 'Boynton Beach', 'Delray Beach', 'Lake Worth', 'Palm Beach Gardens', 'Wellington'],
      },
    ],
    certifications: ['FL Licensed GC', 'HVHZ Certified', 'PE Quality Control', 'ICRI Member', 'PBCC Member'],
    cta: '/florida',
    ctaLabel: 'Florida Services',
  },
  NC: {
    id: 'NC' as Market,
    name: 'North Carolina',
    tagline: 'Charlotte · Raleigh · Greensboro · Durham · Statewide',
    description: 'Our North Carolina team specializes in commercial roofing and general contracting for the Piedmont Triad, Triangle, and Charlotte metro areas — with statewide capability.',
    phone: '(954) 247-8528',
    tel: 'tel:+19542478528',
    email: '51statereno@gmail.com',
    address: 'Charlotte, NC 28209',
    hours: 'Mon – Fri, 8am – 5pm',
    license: 'NC Licensed & Insured',
    services: ['Commercial Roofing', 'Metal Roofing', 'General Contracting', 'Roof Inspection', 'Storm Damage Repair'],
    counties: [
      {
        name: 'Charlotte Metro',
        cities: ['Charlotte', 'Concord', 'Gastonia', 'Mooresville', 'Huntersville', 'Kannapolis', 'Rock Hill'],
      },
      {
        name: 'Triangle Region',
        cities: ['Raleigh', 'Durham', 'Chapel Hill', 'Cary', 'Apex', 'Wake Forest', 'Morrisville'],
      },
      {
        name: 'Sandhills Region',
        cities: ['Fayetteville', 'Cameron', 'Southern Pines', 'Pinehurst', 'Spring Lake'],
      },
      {
        name: 'Piedmont Triad',
        cities: ['Greensboro', 'Winston-Salem', 'High Point', 'Burlington', 'Asheboro'],
      },
    ],
    certifications: ['Licensed & Insured', 'Winter-Ready Systems', 'PE Quality Control', 'Storm-Tested', 'ICRI Member'],
    cta: '/north-carolina',
    ctaLabel: 'North Carolina Services',
  },
};

export default function LocationsClient() {
  const [activeMarket, setActiveMarket] = useState<Market>('FL');
  const [showScheduler, setShowScheduler] = useState(false);
  const [expandedCounty, setExpandedCounty] = useState<string | null>(null);
  const market = markets[activeMarket];

  function toggleCounty(name: string) {
    setExpandedCounty(prev => (prev === name ? null : name));
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <MapPin size={13} />
            Two Markets · One Company
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Find Your<br />Nearest Team
          </h1>
          <p className="text-xl text-gray-300 max-w-xl mx-auto mb-10">
            We operate across South Florida and North Carolina with dedicated, licensed teams in each market.
          </p>

          {/* Market toggle */}
          <div className="inline-flex bg-white/10 rounded-2xl p-1.5 gap-1.5">
            {(Object.keys(markets) as Market[]).map(m => (
              <button
                key={m}
                onClick={() => { setActiveMarket(m); setShowScheduler(false); setExpandedCounty(null); }}
                className={`px-7 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeMarket === m
                    ? 'bg-white text-brand-dark shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="block">{markets[m].name}</span>
                <span className={`text-xs font-normal ${activeMarket === m ? 'text-brand-gray' : 'text-gray-500'}`}>
                  {markets[m].tagline.split(' · ')[0]} + more
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Market info bar */}
      <section className="bg-brand-blue text-white py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          <a href={market.tel} className="flex items-center gap-2 font-semibold hover:text-blue-100 transition-colors">
            <Phone size={14} />
            {market.phone}
          </a>
          <a href={`mailto:${market.email}`} className="flex items-center gap-2 hover:text-blue-100 transition-colors">
            <Mail size={14} />
            {market.email}
          </a>
          <span className="flex items-center gap-2 text-blue-100">
            <MapPin size={14} />
            {market.address}
          </span>
          <span className="text-blue-200 text-xs">{market.hours}</span>
        </div>
      </section>

      {/* Map + details */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — info */}
          <ScrollAnimation type="fade-right">
            <div>
              <span className="text-xs font-semibold text-brand-blue uppercase tracking-widest block mb-2">{market.license}</span>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">{market.name} Office</h2>
              <p className="text-brand-gray mb-8 leading-relaxed">{market.description}</p>

              {/* Services */}
              <h3 className="font-bold text-brand-dark text-sm mb-3">Services in This Market</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {market.services.map(s => (
                  <span key={s} className="text-xs bg-brand-blue-pale text-brand-blue px-3 py-1.5 rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-3 mb-8">
                {market.certifications.map(c => (
                  <div key={c} className="flex items-center gap-1.5 text-xs text-brand-dark font-medium">
                    <CheckCircle size={13} className="text-brand-blue" />
                    {c}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href={market.tel} className="btn-primary flex items-center justify-center gap-2">
                  <Phone size={15} />
                  Call {market.phone}
                </a>
                <Link href={market.cta} className="btn-secondary flex items-center justify-center gap-2">
                  {market.ctaLabel} <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right — map */}
          <ScrollAnimation type="fade-left">
            <ServiceAreaMap market={activeMarket} />
          </ScrollAnimation>
        </div>
      </section>

      {/* Cities / counties accordion */}
      <section className="bg-brand-gray-light py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation type="fade-up">
            <h2 className="text-2xl font-bold text-brand-dark mb-2">Cities We Serve</h2>
            <p className="text-brand-gray mb-8">
              Don&apos;t see your city? Call us — we travel within the {market.name} region.
            </p>
          </ScrollAnimation>
          <div className="space-y-3">
            {market.counties.map((county) => (
              <div key={county.name} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleCounty(county.name)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-bold text-brand-dark">{county.name}</span>
                  <ChevronDown
                    size={16}
                    className={`text-brand-gray transition-transform ${expandedCounty === county.name ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedCounty === county.name && (
                  <div className="px-6 pb-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                    {county.cities.map(city => (
                      <span key={city} className="flex items-center gap-1.5 text-sm text-brand-dark bg-brand-gray-light px-3 py-1.5 rounded-full">
                        <MapPin size={11} className="text-brand-blue" />
                        {city}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Both markets side by side (quick-compare) */}
      <section className="section-container">
        <ScrollAnimation type="fade-up">
          <h2 className="text-2xl font-bold text-brand-dark mb-2 text-center">Both Markets at a Glance</h2>
          <p className="text-brand-gray text-center mb-10">One company, two dedicated regional teams.</p>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.keys(markets) as Market[]).map(m => {
            const mkt = markets[m];
            const isActive = m === activeMarket;
            return (
              <ScrollAnimation key={m} type="fade-up">
                <button
                  onClick={() => { setActiveMarket(m); setShowScheduler(false); setExpandedCounty(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-full text-left p-8 rounded-2xl border-2 transition-all ${
                    isActive
                      ? 'border-brand-blue bg-brand-blue-pale'
                      : 'border-gray-200 bg-white hover:border-brand-blue hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark">{mkt.name}</h3>
                      <p className="text-sm text-brand-gray mt-1">{mkt.tagline}</p>
                    </div>
                    {isActive && (
                      <span className="text-xs bg-brand-blue text-white px-2.5 py-1 rounded-full font-semibold">
                        Viewing
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue mb-2">
                    <Phone size={13} />
                    {mkt.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-gray">
                    <MapPin size={13} />
                    {mkt.address}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {mkt.certifications.slice(0, 3).map(c => (
                      <span key={c} className="text-xs bg-gray-100 text-brand-dark px-2 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </button>
              </ScrollAnimation>
            );
          })}
        </div>
      </section>

      {/* Inspection scheduler */}
      <section className="bg-brand-gray-light py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Book with Your Local Team</h2>
            <p className="text-brand-gray">
              Scheduling with the <strong>{market.name}</strong> team. Response within 24–72 hours.
            </p>
          </div>
          <InspectionScheduler defaultInspectorType="roofing" locationMarket={activeMarket} />
        </div>
      </section>
    </div>
  );
}

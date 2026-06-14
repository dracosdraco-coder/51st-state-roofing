'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, MapPin, Phone, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackLeadSubmit } from '@/lib/gtag';

type ServiceChip = {
  label: string;
  value: string;
};

const SERVICE_CHIPS: ServiceChip[] = [
  { label: 'Roofing', value: 'roofing' },
  { label: 'Inspection', value: 'roofing' },
  { label: 'TPO / Flat Roof', value: 'roofing' },
  { label: 'Metal Roofing', value: 'roofing' },
  { label: 'Concrete Restoration', value: 'concrete' },
  { label: 'Siding & Exterior', value: 'siding' },
  { label: 'General Contracting', value: 'commercial' },
];

interface Props {
  market?: 'FL' | 'NC' | 'NATIONAL';
  defaultService?: string;
  headline?: string;
  subheadline?: string;
  dark?: boolean;
}

declare global {
  interface Window {
    google: any;
    initPlacesAutocomplete?: () => void;
  }
}

export default function QuickForm({
  market = 'NATIONAL',
  defaultService,
  headline = 'Get a Free Estimate',
  subheadline = 'We respond within 24 hours. No pressure.',
  dark = false,
}: Props) {
  const [selectedChip, setSelectedChip] = useState<string>(
    SERVICE_CHIPS.find(c => c.value === defaultService)?.label || ''
  );
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress] = useState('');
  const addressRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  // Load Google Places if API key is configured
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey || apiKey === 'YOUR_GOOGLE_PLACES_API_KEY') return;
    if (window.google?.maps?.places) {
      attachAutocomplete();
      return;
    }

    window.initPlacesAutocomplete = attachAutocomplete;
    if (!document.getElementById('google-places-script')) {
      const script = document.createElement('script');
      script.id = 'google-places-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initPlacesAutocomplete`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  function attachAutocomplete() {
    if (!addressRef.current || !window.google?.maps?.places) return;
    autocompleteRef.current = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) setAddress(place.formatted_address);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams(window.location.search);
    const fullName = (fd.get('name') as string).trim();
    const [firstName, ...rest] = fullName.split(' ');
    const lastName = rest.join(' ') || '-';
    const serviceType = SERVICE_CHIPS.find(c => c.label === selectedChip)?.value || 'general';

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: fd.get('phone'),
          email: fd.get('email'),
          propertyAddress: address || (fd.get('address') as string),
          serviceType,
          additionalNotes: selectedChip ? `Service interest: ${selectedChip}` : undefined,
          locationMarket: market,
          pageSource: window.location.pathname,
          utmSource: params.get('utm_source') ?? undefined,
          utmCampaign: params.get('utm_campaign') ?? undefined,
          utmMedium: params.get('utm_medium') ?? undefined,
          utmContent: params.get('utm_content') ?? undefined,
          utmTerm: params.get('utm_term') ?? undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      trackLeadSubmit({
        locationMarket: market,
        pageSource: window.location.pathname,
        conversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_LEAD,
      });

      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  const phone = '(954) 247-8528';
  const tel = 'tel:+19542478528';

  const cardBg = dark ? 'bg-white/5 backdrop-blur border-white/10' : 'bg-white border-gray-200';
  const labelColor = dark ? 'text-white' : 'text-brand-dark';
  const inputClass = `w-full border ${dark ? 'border-white/30 bg-white/10 text-white placeholder:text-white/50 focus:border-white' : 'border-gray-200 bg-white text-brand-dark placeholder:text-gray-400 focus:border-brand-blue'} rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors`;

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border p-8 text-center ${cardBg}`}>
        <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
        <h3 className={`text-xl font-bold mb-1 ${dark ? 'text-white' : 'text-brand-dark'}`}>Request Received</h3>
        <p className={dark ? 'text-white/70 text-sm' : 'text-brand-gray text-sm'}>
          We&apos;ll call you within 24 hours — usually much sooner.
        </p>
        <a href={tel} className="inline-flex items-center gap-2 mt-4 text-brand-blue font-semibold text-sm hover:underline">
          <Phone size={14} /> Or call us now: {phone}
        </a>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border shadow-sm ${cardBg} p-6 md:p-8`}>
      {/* Motivation strip */}
      <div className={`flex items-center gap-2 text-xs font-semibold mb-5 px-3 py-2 rounded-lg ${dark ? 'bg-brand-blue/20 text-blue-200' : 'bg-brand-blue-pale text-brand-blue'}`}>
        <Clock size={13} className="shrink-0" />
        Most requests get a same-day response — free &amp; no obligation
      </div>

      {(headline || subheadline) && (
        <div className="mb-5">
          {headline && <h3 className={`text-xl font-bold mb-1 ${dark ? 'text-white' : 'text-brand-dark'}`}>{headline}</h3>}
          {subheadline && <p className={`text-sm ${dark ? 'text-white/60' : 'text-brand-gray'}`}>{subheadline}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service chips */}
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${dark ? 'text-white/60' : 'text-brand-gray'}`}>
            What do you need?
          </p>
          <div className="flex flex-wrap gap-2">
            {SERVICE_CHIPS.map(chip => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setSelectedChip(chip.label)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selectedChip === chip.label
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : dark
                    ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    : 'bg-white text-brand-dark border-gray-200 hover:border-brand-blue'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Name + Phone row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Full Name</label>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="John Smith"
              className={inputClass}
            />
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Phone</label>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(555) 000-0000"
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Email</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="john@company.com"
            className={inputClass}
          />
        </div>

        {/* Address with Places */}
        <div className="relative">
          <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>
            Property Address <span className={`font-normal ${dark ? 'text-white/40' : 'text-brand-gray'}`}>(optional)</span>
          </label>
          <div className="relative">
            <MapPin size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? 'text-white/40' : 'text-brand-gray'}`} />
            <input
              ref={addressRef}
              name="address"
              type="text"
              autoComplete="street-address"
              placeholder="Start typing your address..."
              value={address}
              onChange={e => setAddress(e.target.value)}
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>

        {status === 'error' && (
          <div className="flex items-start gap-2 text-red-400 bg-red-50 rounded-xl px-4 py-3 text-sm">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-brand-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? 'Sending…' : (
            <>Get My Free Estimate <ArrowRight size={15} /></>
          )}
        </button>

        <p className={`flex items-center justify-center gap-1.5 text-[11px] text-center ${dark ? 'text-white/40' : 'text-brand-gray'}`}>
          <ShieldCheck size={12} className="shrink-0" />
          Licensed GC CGC1527726 · Your information is never sold or shared
        </p>

        <div className="flex items-center justify-center gap-2 pt-1">
          <span className={`text-xs ${dark ? 'text-white/40' : 'text-brand-gray'}`}>or call directly</span>
          <a href={tel} className="inline-flex items-center gap-1 text-brand-blue text-xs font-bold hover:underline">
            <Phone size={11} /> {phone}
          </a>
        </div>
      </form>
    </div>
  );
}

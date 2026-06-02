'use client';

import { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { trackLeadSubmit } from '@/lib/gtag';

type InspectorType = 'roofing' | 'siding' | 'interior' | 'commercial';
type TimeWindow = '24hr' | '48hr' | '72hr';
type Market = 'NC' | 'FL' | 'NATIONAL';

interface Props {
  defaultInspectorType?: InspectorType;
  locationMarket?: Market;
}

const inspectorLabels: Record<InspectorType, string> = {
  roofing: 'Roofing',
  siding: 'Siding & Exterior',
  interior: 'Interior Finishes',
  commercial: 'Large Commercial',
};

const windowLabels: Record<TimeWindow, string> = {
  '24hr': 'Within 24 Hours',
  '48hr': 'Within 48 Hours',
  '72hr': 'Within 72 Hours',
};

export default function InspectionScheduler({
  defaultInspectorType = 'roofing',
  locationMarket = 'NATIONAL',
}: Props) {
  const [inspectorType, setInspectorType] = useState<InspectorType>(defaultInspectorType);
  const [preferredWindow, setPreferredWindow] = useState<TimeWindow>('48hr');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    additionalNotes: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const phone = locationMarket === 'NC' ? '(919) 871-4455' : '(561) 985-2484';

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Read UTM params from URL if present
    const params = new URLSearchParams(window.location.search);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          inspectorType,
          preferredWindow,
          locationMarket,
          serviceType: inspectorType,
          pageSource: window.location.pathname,
          utmSource: params.get('utm_source') ?? undefined,
          utmCampaign: params.get('utm_campaign') ?? undefined,
          utmMedium: params.get('utm_medium') ?? undefined,
          utmContent: params.get('utm_content') ?? undefined,
          utmTerm: params.get('utm_term') ?? undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      trackLeadSubmit({
        inspectorType,
        locationMarket,
        pageSource: window.location.pathname,
        conversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_LEAD,
      });

      setStatus('success');
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-green-200 p-10 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-brand-dark mb-2">Inspection Requested</h3>
        <p className="text-brand-gray mb-4">
          We&apos;ll confirm your {windowLabels[preferredWindow].toLowerCase()} appointment by phone or email.
        </p>
        <p className="text-sm text-brand-gray">
          Questions? Call us at{' '}
          <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-brand-blue font-semibold">
            {phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-blue-pale rounded-xl flex items-center justify-center">
          <Calendar size={20} className="text-brand-blue" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-dark">Schedule an Inspection</h3>
          <p className="text-sm text-brand-gray">Response within 24–72 hours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Inspector type */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2">Inspection Type</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(inspectorLabels) as InspectorType[]).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setInspectorType(type)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  inspectorType === type
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-brand-dark border-gray-200 hover:border-brand-blue'
                }`}
              >
                {inspectorLabels[type]}
              </button>
            ))}
          </div>
        </div>

        {/* Time window */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2">
            <Clock size={14} className="inline mr-1.5 mb-0.5" />
            Preferred Response Window
          </label>
          <div className="relative">
            <select
              value={preferredWindow}
              onChange={e => setPreferredWindow(e.target.value as TimeWindow)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-blue pr-10"
            >
              {(Object.keys(windowLabels) as TimeWindow[]).map(w => (
                <option key={w} value={w}>{windowLabels[w]}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" />
          </div>
        </div>

        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">First Name</label>
            <input
              name="firstName"
              required
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Last Name</label>
            <input
              name="lastName"
              required
              value={form.lastName}
              onChange={handleChange}
              placeholder="Smith"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Phone</label>
            <input
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="(555) 000-0000"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Property address */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Property Address</label>
          <input
            name="propertyAddress"
            value={form.propertyAddress}
            onChange={handleChange}
            placeholder="123 Main St, City, State"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={form.additionalNotes}
            onChange={handleChange}
            rows={3}
            placeholder="Describe the issue or scope of work..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue resize-none"
          />
        </div>

        {status === 'error' && (
          <div className="flex items-start gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full btn-primary py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting…' : 'Request Inspection'}
        </button>

        <p className="text-xs text-center text-brand-gray">
          We respond within your selected window. No spam, ever.
        </p>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { trackLeadSubmit } from '@/lib/gtag';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams(window.location.search);

    // Split "Full Name" into first/last
    const fullName = (fd.get('name') as string).trim();
    const [firstName, ...rest] = fullName.split(' ');
    const lastName = rest.join(' ') || '-';

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: fd.get('phone'),
          email: fd.get('email'),
          companyName: fd.get('company'),
          serviceType: fd.get('service'),
          additionalNotes: fd.get('message'),
          pageSource: '/contact',
          locationMarket: 'NATIONAL',
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
        locationMarket: 'NATIONAL',
        pageSource: '/contact',
        conversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_LEAD,
      });

      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-green-200 p-10 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-brand-dark mb-2">Message Received</h3>
        <p className="text-brand-gray">We'll get back to you within one business day.</p>
        <p className="text-sm text-brand-gray mt-3">
          Need it faster? Call{' '}
          <a href="tel:+15619852484" className="text-brand-blue font-semibold">(561) 985-2484</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors bg-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="(561) 000-0000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">Business Name <span className="font-normal text-brand-gray">(optional)</span></label>
        <input
          type="text"
          name="company"
          placeholder="Your business name"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">Service Needed</label>
        <select
          name="service"
          required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors bg-white"
        >
          <option value="">Select a service</option>
          <option value="roofing">Commercial Roofing</option>
          <option value="tpo">TPO & Flat Roofing</option>
          <option value="metal">Metal Standing Seam</option>
          <option value="roofing">Roof Inspection</option>
          <option value="concrete">Concrete Restoration</option>
          <option value="interior">Interior & Exterior Finishes</option>
          <option value="commercial">General Contracting</option>
          <option value="millwork">Millwork & Interiors</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">Message</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your project..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors bg-white resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full btn-primary py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Request Free Estimate'}
      </button>

      <p className="text-xs text-brand-gray text-center">We respond within one business day. No spam, ever.</p>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { Calculator, ChevronDown, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import {
  estimatorCategories,
  calculateEstimate,
  type EstimatorCategory,
  type Market,
  type MaterialTier,
  type ComplexityLevel,
} from '@/lib/estimatorData';
import { trackEstimateRequest } from '@/lib/gtag';

interface Props {
  defaultCategory?: EstimatorCategory;
  market?: Market;
}

const materialLabels: Record<MaterialTier, { label: string; desc: string }> = {
  standard: { label: 'Standard', desc: 'Commercial grade, code-compliant' },
  premium: { label: 'Premium', desc: 'Enhanced performance & warranty' },
  elite: { label: 'Elite', desc: 'Top-tier materials & specifications' },
};

const complexityLabels: Record<ComplexityLevel, { label: string; desc: string }> = {
  simple: { label: 'Simple', desc: 'Open access, minimal obstructions' },
  moderate: { label: 'Moderate', desc: 'Some staging or detail work' },
  complex: { label: 'Complex', desc: 'Difficult access, high detail, phased' },
};

const marketLabels: Record<Market, string> = {
  FL: 'Florida',
  NC: 'North Carolina',
  NATIONAL: 'Florida',
};

export default function Estimator({ defaultCategory = 'roofing-tpo', market = 'FL' }: Props) {
  const [category, setCategory] = useState<EstimatorCategory>(defaultCategory);
  const [sqft, setSqft] = useState('');
  const [materialTier, setMaterialTier] = useState<MaterialTier>('premium');
  const [complexity, setComplexity] = useState<ComplexityLevel>('moderate');
  const [result, setResult] = useState<{ low: number; high: number; formatted: string } | null>(null);
  const [emailMode, setEmailMode] = useState(false);
  const [emailForm, setEmailForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [emailStatus, setEmailStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');

  const selectedCategory = estimatorCategories[category];
  const resolvedMarket: Market = market === 'NATIONAL' ? 'FL' : market;

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const sqftNum = Number(sqft.replace(/,/g, ''));
    if (!sqftNum || sqftNum < selectedCategory.minSqft) return;
    const estimate = calculateEstimate(category, resolvedMarket, sqftNum, materialTier, complexity);
    setResult(estimate);
    setEmailMode(false);
  }

  async function handleEmailEstimate(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setEmailStatus('submitting');

    const params = new URLSearchParams(window.location.search);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...emailForm,
          locationMarket: market,
          serviceType: category.startsWith('roofing') ? 'roofing' : category === 'commercial' ? 'commercial' : 'interior',
          estimateCategory: selectedCategory.label,
          estimateResult: result.formatted,
          additionalNotes: `Estimate request: ${selectedCategory.label}, ${sqft} sqft, ${materialTier}, ${complexity}`,
          pageSource: window.location.pathname,
          utmSource: params.get('utm_source') ?? undefined,
          utmCampaign: params.get('utm_campaign') ?? undefined,
          utmMedium: params.get('utm_medium') ?? undefined,
        }),
      });

      if (!res.ok) throw new Error();
      trackEstimateRequest({ category: selectedCategory.label, market, estimateRange: result.formatted });
      setEmailStatus('sent');
    } catch {
      setEmailStatus('error');
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-brand-dark px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
            <Calculator size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Project Estimator</h3>
            <p className="text-sm text-gray-400">{marketLabels[resolvedMarket]} market pricing</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="p-8 space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2">Project Type</label>
          <div className="relative">
            <select
              value={category}
              onChange={e => { setCategory(e.target.value as EstimatorCategory); setResult(null); }}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-blue pr-10"
            >
              {(Object.keys(estimatorCategories) as EstimatorCategory[]).map(key => (
                <option key={key} value={key}>{estimatorCategories[key].label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" />
          </div>
          <p className="text-xs text-brand-gray mt-1.5">{selectedCategory.description}</p>
        </div>

        {/* Square footage */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2">
            Square Footage
            <span className="font-normal text-brand-gray ml-2">
              (min {selectedCategory.minSqft.toLocaleString()} sqft)
            </span>
          </label>
          <input
            type="number"
            min={selectedCategory.minSqft}
            max={selectedCategory.maxSqft}
            required
            value={sqft}
            onChange={e => { setSqft(e.target.value); setResult(null); }}
            placeholder={`e.g. ${(selectedCategory.minSqft * 5).toLocaleString()}`}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
          />
        </div>

        {/* Material tier */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2">Material Tier</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(materialLabels) as MaterialTier[]).map(tier => (
              <button
                key={tier}
                type="button"
                onClick={() => { setMaterialTier(tier); setResult(null); }}
                className={`flex flex-col items-start px-3 py-3 rounded-xl border text-left transition-all ${
                  materialTier === tier
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-brand-dark border-gray-200 hover:border-brand-blue'
                }`}
              >
                <span className="text-sm font-semibold">{materialLabels[tier].label}</span>
                <span className={`text-xs mt-0.5 ${materialTier === tier ? 'text-blue-100' : 'text-brand-gray'}`}>
                  {materialLabels[tier].desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2">Project Complexity</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(complexityLabels) as ComplexityLevel[]).map(level => (
              <button
                key={level}
                type="button"
                onClick={() => { setComplexity(level); setResult(null); }}
                className={`flex flex-col items-start px-3 py-3 rounded-xl border text-left transition-all ${
                  complexity === level
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-brand-dark border-gray-200 hover:border-brand-blue'
                }`}
              >
                <span className="text-sm font-semibold">{complexityLabels[level].label}</span>
                <span className={`text-xs mt-0.5 ${complexity === level ? 'text-blue-100' : 'text-brand-gray'}`}>
                  {complexityLabels[level].desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full btn-primary py-3.5 text-base">
          Calculate Estimate
        </button>

        <p className="text-xs text-center text-brand-gray">
          Estimates are ranges based on {marketLabels[resolvedMarket]} market pricing. Final pricing depends on site conditions and scope.
        </p>
      </form>

      {/* Result panel */}
      {result && (
        <div className="border-t border-gray-100 px-8 py-8 bg-brand-blue-pale">
          <p className="text-sm font-semibold text-brand-blue uppercase tracking-wide mb-1">
            Estimated Investment Range
          </p>
          <p className="text-4xl font-bold text-brand-dark mb-1">{result.formatted}</p>
          <p className="text-xs text-brand-gray mb-6">{selectedCategory.notes}</p>

          {!emailMode && emailStatus !== 'sent' && (
            <button
              onClick={() => setEmailMode(true)}
              className="flex items-center gap-2 text-sm text-brand-blue font-semibold hover:underline"
            >
              <Mail size={15} />
              Email this estimate to me
            </button>
          )}

          {emailMode && emailStatus !== 'sent' && (
            <form onSubmit={handleEmailEstimate} className="space-y-3 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="First name"
                  value={emailForm.firstName}
                  onChange={e => setEmailForm(p => ({ ...p, firstName: e.target.value }))}
                  className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
                <input
                  required
                  placeholder="Last name"
                  value={emailForm.lastName}
                  onChange={e => setEmailForm(p => ({ ...p, lastName: e.target.value }))}
                  className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email address"
                value={emailForm.email}
                onChange={e => setEmailForm(p => ({ ...p, email: e.target.value }))}
                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                value={emailForm.phone}
                onChange={e => setEmailForm(p => ({ ...p, phone: e.target.value }))}
                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
              />
              {emailStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={14} /> Something went wrong. Try again.
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={emailStatus === 'submitting'}
                  className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-60"
                >
                  {emailStatus === 'submitting' ? 'Sending…' : 'Send Estimate'}
                </button>
                <button
                  type="button"
                  onClick={() => setEmailMode(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-brand-gray hover:border-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {emailStatus === 'sent' && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
              <CheckCircle size={16} />
              Estimate sent — we&apos;ll follow up shortly.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

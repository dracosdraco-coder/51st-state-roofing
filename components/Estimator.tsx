'use client';

import { useState } from 'react';
import { Calculator, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Phone, Layers, Home, Building2, Wind, Grid3x3, type LucideIcon } from 'lucide-react';
import {
  estimatorCategories,
  calculateEstimate,
  type EstimatorCategory,
  type Market,
  type MaterialTier,
  type ComplexityLevel,
} from '@/lib/estimatorData';
import { trackEstimateRequest, trackLeadSubmit } from '@/lib/gtag';

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

const categoryIcons: Record<EstimatorCategory, LucideIcon> = {
  'roofing-tpo': Wind,
  'roofing-metal': Layers,
  'roofing-flat': Layers,
  'roofing-shingle': Grid3x3,
  'siding-exterior': Home,
  'commercial': Building2,
};

const STEP_LABELS = ['Project Type', 'Square Footage', 'Materials & Scope', 'Your Estimate'];

const phoneByMarket: Record<Market, { label: string; tel: string }> = {
  FL: { label: '(954) 247-8528', tel: 'tel:+19542478528' },
  NC: { label: '(954) 247-8528', tel: 'tel:+19542478528' },
  NATIONAL: { label: '(954) 247-8528', tel: 'tel:+19542478528' },
};

export default function Estimator({ defaultCategory = 'roofing-tpo', market = 'FL' }: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [category, setCategory] = useState<EstimatorCategory>(defaultCategory);
  const [sqft, setSqft] = useState('');
  const [sqftError, setSqftError] = useState('');
  const [materialTier, setMaterialTier] = useState<MaterialTier>('premium');
  const [complexity, setComplexity] = useState<ComplexityLevel>('moderate');
  const [result, setResult] = useState<{ low: number; high: number; formatted: string } | null>(null);
  const [leadForm, setLeadForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');

  const selectedCategory = estimatorCategories[category];
  const resolvedMarket: Market = market === 'NATIONAL' ? 'FL' : market;
  const phone = phoneByMarket[market];

  function selectCategory(cat: EstimatorCategory) {
    setCategory(cat);
    setResult(null);
    setStep(2);
  }

  function handleSqftContinue(e: React.FormEvent) {
    e.preventDefault();
    const sqftNum = Number(sqft.replace(/,/g, ''));
    if (!sqftNum || sqftNum < estimatorCategories[category].minSqft) {
      setSqftError(`Enter at least ${estimatorCategories[category].minSqft.toLocaleString()} sqft.`);
      return;
    }
    setSqftError('');
    setStep(3);
  }

  function handleCalculate() {
    const sqftNum = Number(sqft.replace(/,/g, ''));
    const estimate = calculateEstimate(category, resolvedMarket, sqftNum, materialTier, complexity);
    setResult(estimate);
    trackEstimateRequest({ category: selectedCategory.label, market, estimateRange: estimate.formatted });
    setStep(4);
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setLeadStatus('submitting');

    const params = new URLSearchParams(window.location.search);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          locationMarket: market,
          serviceType: category.startsWith('roofing') ? 'roofing' : category === 'commercial' ? 'commercial' : 'siding',
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
      trackLeadSubmit({
        locationMarket: market,
        pageSource: window.location.pathname,
        conversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_LEAD,
      });
      setLeadStatus('sent');
    } catch {
      setLeadStatus('error');
    }
  }

  function startOver() {
    setStep(1);
    setSqft('');
    setSqftError('');
    setResult(null);
    setLeadForm({ firstName: '', lastName: '', email: '', phone: '' });
    setLeadStatus('idle');
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-brand-dark px-8 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
            <Calculator size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Project Estimator</h3>
            <p className="text-sm text-gray-400">{marketLabels[resolvedMarket]} market pricing &middot; ~60 seconds</p>
          </div>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-2">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const active = stepNum <= step;
            return (
              <div key={label} className="flex-1">
                <div className={`h-1.5 rounded-full transition-colors ${active ? 'bg-brand-blue' : 'bg-white/15'}`} />
                <span className={`hidden sm:block text-[11px] mt-1.5 ${stepNum === step ? 'text-white font-semibold' : 'text-gray-500'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8">
        {/* Step 1 — Project Type */}
        {step === 1 && (
          <div>
            <h4 className="text-base font-bold text-brand-dark mb-1">What type of project is this?</h4>
            <p className="text-sm text-brand-gray mb-5">Pick the closest match — we&apos;ll fine-tune the details next.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(estimatorCategories) as EstimatorCategory[]).map(key => {
                const Icon = categoryIcons[key];
                const cat = estimatorCategories[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectCategory(key)}
                    className="flex items-start gap-3 text-left p-4 rounded-xl border border-gray-200 hover:border-brand-blue hover:bg-brand-blue-pale transition-all group"
                  >
                    <div className="shrink-0 w-10 h-10 bg-brand-blue-pale rounded-lg flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                      <Icon size={18} className="text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark text-sm">{cat.label}</div>
                      <div className="text-xs text-brand-gray mt-0.5">{cat.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 — Square Footage */}
        {step === 2 && (
          <form onSubmit={handleSqftContinue}>
            <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-xs text-brand-gray hover:text-brand-blue mb-4 transition-colors">
              <ArrowLeft size={13} /> Change project type
            </button>
            <div className="inline-flex items-center gap-2 bg-brand-blue-pale text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              {selectedCategory.label}
            </div>
            <h4 className="text-base font-bold text-brand-dark mb-1">About how many square feet?</h4>
            <p className="text-sm text-brand-gray mb-5">
              An estimate is fine — we&apos;ll refine it during a site visit. Minimum {selectedCategory.minSqft.toLocaleString()} sqft for this project type.
            </p>
            <input
              type="number"
              min={selectedCategory.minSqft}
              max={selectedCategory.maxSqft}
              autoFocus
              value={sqft}
              onChange={e => { setSqft(e.target.value); setSqftError(''); }}
              placeholder={`e.g. ${(selectedCategory.minSqft * 5).toLocaleString()}`}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-lg font-semibold focus:outline-none focus:border-brand-blue"
            />
            {sqftError && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                <AlertCircle size={14} /> {sqftError}
              </div>
            )}
            <button type="submit" className="w-full btn-primary py-3.5 text-base mt-5 flex items-center justify-center gap-2">
              Continue <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Step 3 — Material & Complexity */}
        {step === 3 && (
          <div>
            <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1.5 text-xs text-brand-gray hover:text-brand-blue mb-4 transition-colors">
              <ArrowLeft size={13} /> Change square footage
            </button>
            <h4 className="text-base font-bold text-brand-dark mb-1">A couple quick details</h4>
            <p className="text-sm text-brand-gray mb-5">This is what shapes your price range — pick what&apos;s closest.</p>

            {/* Material tier */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-brand-dark mb-2">Material Tier</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(materialLabels) as MaterialTier[]).map(tier => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setMaterialTier(tier)}
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
            <div className="mb-6">
              <label className="block text-sm font-semibold text-brand-dark mb-2">Project Complexity</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(complexityLabels) as ComplexityLevel[]).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setComplexity(level)}
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

            <button type="button" onClick={handleCalculate} className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2">
              <Calculator size={16} /> Calculate My Estimate
            </button>
            <p className="text-xs text-center text-brand-gray mt-3">
              Estimates are ranges based on {marketLabels[resolvedMarket]} market pricing. Final pricing depends on site conditions and scope.
            </p>
          </div>
        )}

        {/* Step 4 — Result + lead capture */}
        {step === 4 && result && (
          <div>
            <div className="text-center mb-6">
              <p className="text-sm font-semibold text-brand-blue uppercase tracking-wide mb-2">
                Your {selectedCategory.label} Estimate
              </p>
              <p className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">{result.formatted}</p>
              <p className="text-sm text-brand-gray">{selectedCategory.notes}</p>
            </div>

            {leadStatus === 'sent' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-8 text-center">
                <CheckCircle size={36} className="text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-brand-dark mb-1">Estimate sent!</h4>
                <p className="text-sm text-brand-gray">We&apos;ll follow up within 24 hours to firm up the details.</p>
              </div>
            ) : (
              <div className="bg-brand-blue-pale rounded-xl p-6">
                <h4 className="font-bold text-brand-dark mb-1">Want this estimate in writing?</h4>
                <p className="text-sm text-brand-gray mb-4">
                  Enter your info and we&apos;ll email your custom range plus next steps — no obligation, response within 24 hours.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      placeholder="First name"
                      value={leadForm.firstName}
                      onChange={e => setLeadForm(p => ({ ...p, firstName: e.target.value }))}
                      className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                    />
                    <input
                      required
                      placeholder="Last name"
                      value={leadForm.lastName}
                      onChange={e => setLeadForm(p => ({ ...p, lastName: e.target.value }))}
                      className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    value={leadForm.email}
                    onChange={e => setLeadForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone number"
                    value={leadForm.phone}
                    onChange={e => setLeadForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
                  />
                  {leadStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={14} /> Something went wrong. Try again.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={leadStatus === 'submitting'}
                    className="w-full btn-primary py-3 text-sm disabled:opacity-60"
                  >
                    {leadStatus === 'submitting' ? 'Sending…' : 'Email Me This Estimate'}
                  </button>
                </form>
                <a href={phone.tel} className="flex items-center justify-center gap-2 mt-3 text-sm font-semibold text-brand-blue hover:underline">
                  <Phone size={14} /> Or call us now: {phone.label}
                </a>
              </div>
            )}

            <button type="button" onClick={startOver} className="flex items-center gap-1.5 text-xs text-brand-gray hover:text-brand-blue mt-5 mx-auto transition-colors">
              <ArrowLeft size={13} /> Start a new estimate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

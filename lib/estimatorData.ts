/**
 * Market-specific pricing data for the multi-category estimator.
 * All prices are in USD per square foot unless noted.
 * Ranges represent low / mid / high tiers.
 * IMPORTANT: Verify and update these ranges with current market data before going live.
 */

export type EstimatorCategory =
  | 'roofing-tpo'
  | 'roofing-metal'
  | 'roofing-flat'
  | 'roofing-shingle'
  | 'siding-exterior'
  | 'commercial';

export type Market = 'FL' | 'NC' | 'NATIONAL';
export type MaterialTier = 'standard' | 'premium' | 'elite';
export type ComplexityLevel = 'simple' | 'moderate' | 'complex';

export interface PricingRange {
  low: number;
  high: number;
  unit: 'sqft' | 'lump';
}

export interface CategoryPricing {
  label: string;
  description: string;
  baseRange: Record<Market, PricingRange>;
  materialMultiplier: Record<MaterialTier, number>;
  complexityMultiplier: Record<ComplexityLevel, number>;
  minSqft: number;
  maxSqft: number;
  notes: string;
}

export const estimatorCategories: Record<EstimatorCategory, CategoryPricing> = {
  'roofing-tpo': {
    label: 'TPO Roofing',
    description: 'Thermoplastic membrane — energy efficient, UV resistant.',
    baseRange: {
      FL: { low: 6.50, high: 12.00, unit: 'sqft' },
      NC: { low: 5.75, high: 10.50, unit: 'sqft' },
      NATIONAL: { low: 6.00, high: 11.00, unit: 'sqft' },
    },
    materialMultiplier: { standard: 1.0, premium: 1.25, elite: 1.55 },
    complexityMultiplier: { simple: 1.0, moderate: 1.2, complex: 1.45 },
    minSqft: 1000,
    maxSqft: 100000,
    notes: 'Includes tear-off, insulation board, and 60-mil membrane. HVHZ uplift testing available.',
  },
  'roofing-metal': {
    label: 'Metal Roofing',
    description: 'Standing seam and corrugated metal — 40+ year lifespan.',
    baseRange: {
      FL: { low: 12.00, high: 22.00, unit: 'sqft' },
      NC: { low: 10.50, high: 19.00, unit: 'sqft' },
      NATIONAL: { low: 11.00, high: 20.00, unit: 'sqft' },
    },
    materialMultiplier: { standard: 1.0, premium: 1.3, elite: 1.65 },
    complexityMultiplier: { simple: 1.0, moderate: 1.25, complex: 1.5 },
    minSqft: 1000,
    maxSqft: 80000,
    notes: 'Standing seam, concealed fastener. Wind ratings up to 160 mph available.',
  },
  'roofing-flat': {
    label: 'Flat / Modified Bitumen Roofing',
    description: 'Built-up and modified bitumen for low-slope commercial roofs.',
    baseRange: {
      FL: { low: 5.00, high: 9.50, unit: 'sqft' },
      NC: { low: 4.50, high: 8.75, unit: 'sqft' },
      NATIONAL: { low: 4.75, high: 9.00, unit: 'sqft' },
    },
    materialMultiplier: { standard: 1.0, premium: 1.2, elite: 1.45 },
    complexityMultiplier: { simple: 1.0, moderate: 1.15, complex: 1.35 },
    minSqft: 2000,
    maxSqft: 150000,
    notes: 'Includes vapor barrier, base sheet, and cap sheet. Ponding water analysis available.',
  },
  'roofing-shingle': {
    label: 'Shingle Roofing',
    description: 'Architectural asphalt shingle systems for sloped multi-family and commercial roofs.',
    baseRange: {
      FL: { low: 4.00, high: 7.50, unit: 'sqft' },
      NC: { low: 3.50, high: 6.50, unit: 'sqft' },
      NATIONAL: { low: 3.75, high: 7.00, unit: 'sqft' },
    },
    materialMultiplier: { standard: 1.0, premium: 1.3, elite: 1.6 },
    complexityMultiplier: { simple: 1.0, moderate: 1.2, complex: 1.45 },
    minSqft: 1000,
    maxSqft: 60000,
    notes: 'Includes tear-off, synthetic underlayment, and architectural shingles. Common for townhomes, condos, and sloped multi-family roofs.',
  },
  'siding-exterior': {
    label: 'Siding & Exterior Cladding',
    description: 'Fiber cement, EIFS, stucco, and composite cladding systems.',
    baseRange: {
      FL: { low: 8.00, high: 18.00, unit: 'sqft' },
      NC: { low: 7.00, high: 15.50, unit: 'sqft' },
      NATIONAL: { low: 7.50, high: 16.50, unit: 'sqft' },
    },
    materialMultiplier: { standard: 1.0, premium: 1.35, elite: 1.7 },
    complexityMultiplier: { simple: 1.0, moderate: 1.2, complex: 1.5 },
    minSqft: 500,
    maxSqft: 50000,
    notes: 'Includes WRB, framing inspection, finish coat, and trim. EIFS warranty available.',
  },
  'commercial': {
    label: 'Large Commercial / General Contracting',
    description: 'Ground-up builds, TI, and large-scale renovations.',
    baseRange: {
      FL: { low: 85.00, high: 220.00, unit: 'sqft' },
      NC: { low: 75.00, high: 195.00, unit: 'sqft' },
      NATIONAL: { low: 80.00, high: 210.00, unit: 'sqft' },
    },
    materialMultiplier: { standard: 1.0, premium: 1.2, elite: 1.45 },
    complexityMultiplier: { simple: 1.0, moderate: 1.25, complex: 1.55 },
    minSqft: 1000,
    maxSqft: 500000,
    notes: 'Includes GC overhead, permits, and project management. PE quality control on every site.',
  },
};

export function calculateEstimate(
  category: EstimatorCategory,
  market: Market,
  sqft: number,
  materialTier: MaterialTier,
  complexity: ComplexityLevel
): { low: number; high: number; formatted: string } {
  const pricing = estimatorCategories[category];
  const base = pricing.baseRange[market];
  const matMult = pricing.materialMultiplier[materialTier];
  const compMult = pricing.complexityMultiplier[complexity];

  const low = Math.round((base.low * matMult * compMult * sqft) / 100) * 100;
  const high = Math.round((base.high * matMult * compMult * sqft) / 100) * 100;

  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  return { low, high, formatted: `${fmt.format(low)} – ${fmt.format(high)}` };
}

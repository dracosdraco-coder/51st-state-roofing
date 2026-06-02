import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPageClient from './LandingPageClient';

// All campaign landing page variants
const campaigns: Record<string, {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  inspectorType: 'roofing' | 'siding' | 'interior' | 'commercial';
  market: 'FL' | 'NC' | 'NATIONAL';
  trust: string[];
  badge: string;
}> = {
  'roofing-fl': {
    headline: 'Commercial Roofing for South Florida Properties',
    subheadline: 'Hurricane-rated, HVHZ certified, PE quality control. Free inspection — same week.',
    ctaLabel: 'Book Free Inspection',
    inspectorType: 'roofing',
    market: 'FL',
    trust: ['Licensed GC CGC1527726', 'HVHZ Certified', 'PE On Every Job', 'No-Pressure Estimate'],
    badge: 'Serving Miami-Dade · Broward · Palm Beach',
  },
  'roofing-nc': {
    headline: 'Premium Commercial Roofing Across North Carolina',
    subheadline: 'Built for winter, storm, and extreme weather. Free inspection — same week.',
    ctaLabel: 'Book Free Inspection',
    inspectorType: 'roofing',
    market: 'NC',
    trust: ['Licensed & Insured', 'Winter-Ready Systems', 'PE Quality Control', 'No-Pressure Estimate'],
    badge: 'Serving Charlotte · Raleigh · Greensboro · Durham',
  },
  'tpo-fl': {
    headline: 'TPO Roofing for South Florida Commercial Buildings',
    subheadline: 'Energy-efficient membranes built for Florida heat and hurricane season. Free estimate.',
    ctaLabel: 'Get Free Estimate',
    inspectorType: 'roofing',
    market: 'FL',
    trust: ['60-mil TPO Systems', 'HVHZ Uplift Tested', 'Energy Star Rated', 'Licensed GC'],
    badge: 'South Florida TPO Specialist',
  },
  'metal-fl': {
    headline: 'Metal Roofing That Lasts 40+ Years — South Florida',
    subheadline: 'Standing seam, 160-mph wind rated. The last roof you\'ll ever need. Free estimate.',
    ctaLabel: 'Get Free Estimate',
    inspectorType: 'roofing',
    market: 'FL',
    trust: ['140+ MPH Wind Rated', 'HVHZ Certified', '40-Year Lifespan', 'Licensed GC'],
    badge: 'South Florida Metal Roofing',
  },
  'interior-fl': {
    headline: 'Interior & Exterior Finishes — South Florida Commercial',
    subheadline: 'Specialty ceilings, architectural millwork, and exterior cladding. Design-build delivery.',
    ctaLabel: 'Schedule Site Visit',
    inspectorType: 'interior',
    market: 'FL',
    trust: ['Design-Build', 'Architect Coordination', 'Custom Millwork', 'Licensed GC'],
    badge: 'Interior & Exterior Specialists',
  },
  'commercial-nc': {
    headline: 'Commercial Construction & General Contracting — NC',
    subheadline: 'Ground-up builds, tenant improvements, full renovations. One contract, full accountability.',
    ctaLabel: 'Start the Conversation',
    inspectorType: 'commercial',
    market: 'NC',
    trust: ['Licensed & Insured', 'PE Quality Control', 'Design-Build Capable', 'Fixed-Price Contracts'],
    badge: 'Charlotte · Raleigh · Statewide',
  },
};

export async function generateStaticParams() {
  return Object.keys(campaigns).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const campaign = campaigns[slug];
  if (!campaign) return {};
  return {
    title: `${campaign.headline} | 51st State Construction`,
    description: campaign.subheadline,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = campaigns[slug];
  if (!campaign) notFound();

  return <LandingPageClient campaign={campaign} slug={slug} />;
}

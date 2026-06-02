import type { Metadata } from 'next';
import StudioPageClient from './StudioPageClient';

export const metadata: Metadata = {
  title: 'Studio | 51st State Construction',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function StudioPage() {
  return <StudioPageClient />;
}

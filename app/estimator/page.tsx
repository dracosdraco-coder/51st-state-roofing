import type { Metadata } from 'next';
import EstimatorClient from './EstimatorClient';

export const metadata: Metadata = {
  title: 'Instant Project Estimator | 51st State Construction',
  description: 'Get an instant cost range for commercial roofing, siding & exterior cladding, and large commercial projects across Florida and North Carolina.',
};

export default function EstimatorPage() {
  return <EstimatorClient />;
}

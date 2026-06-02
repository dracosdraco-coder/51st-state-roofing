import type { Metadata } from 'next';
import LocationsClient from './LocationsClient';

export const metadata: Metadata = {
  title: 'Find a Location Near You | 51st State Construction',
  description: 'Commercial roofing, concrete restoration, and general contracting across South Florida and North Carolina. Find your nearest 51st State Construction team.',
};

export default function LocationsPage() {
  return <LocationsClient />;
}

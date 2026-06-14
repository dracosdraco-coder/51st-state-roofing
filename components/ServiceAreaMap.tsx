'use client';

import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface ServiceCity {
  name: string;
  lat: number;
  lng: number;
}

interface Props {
  market: 'FL' | 'NC';
}

const marketConfig: Record<'FL' | 'NC', {
  center: { lat: number; lng: number };
  zoom: number;
  cities: ServiceCity[];
  label: string;
}> = {
  FL: {
    center: { lat: 26.1224, lng: -80.1373 },
    zoom: 9,
    label: 'South Florida Service Area',
    cities: [
      { name: 'Fort Lauderdale', lat: 26.1224, lng: -80.1373 },
      { name: 'Miami', lat: 25.7617, lng: -80.1918 },
      { name: 'West Palm Beach', lat: 26.7153, lng: -80.0534 },
      { name: 'Boca Raton', lat: 26.3683, lng: -80.1289 },
      { name: 'Hollywood', lat: 26.0112, lng: -80.1495 },
      { name: 'Coral Gables', lat: 25.7215, lng: -80.2684 },
      { name: 'Doral', lat: 25.8196, lng: -80.3554 },
      { name: 'Pompano Beach', lat: 26.2379, lng: -80.1248 },
    ],
  },
  NC: {
    center: { lat: 35.2271, lng: -80.8431 },
    zoom: 7,
    label: 'North Carolina Service Area',
    cities: [
      { name: 'Charlotte', lat: 35.2271, lng: -80.8431 },
      { name: 'Raleigh', lat: 35.7796, lng: -78.6382 },
      { name: 'Durham', lat: 35.9940, lng: -78.8986 },
      { name: 'Greensboro', lat: 36.0726, lng: -79.7920 },
      { name: 'Winston-Salem', lat: 36.0999, lng: -80.2442 },
      { name: 'Asheville', lat: 35.5951, lng: -82.5515 },
      { name: 'Chapel Hill', lat: 35.9132, lng: -79.0558 },
      { name: 'Cary', lat: 35.7915, lng: -78.7811 },
    ],
  },
};

export default function ServiceAreaMap({ market }: Props) {
  const config = marketConfig[market];
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // If no API key, render a styled city grid fallback
  if (!apiKey) {
    return (
      <div className="bg-brand-blue-pale rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={20} className="text-brand-blue" />
          <h3 className="text-lg font-bold text-brand-dark">{config.label}</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {config.cities.map(city => (
            <div
              key={city.name}
              className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 text-sm font-medium text-brand-dark shadow-sm"
            >
              <MapPin size={13} className="text-brand-blue shrink-0" />
              {city.name}
            </div>
          ))}
        </div>
        <p className="text-xs text-brand-gray mt-4">
          And surrounding communities — call us to confirm your area.
        </p>
      </div>
    );
  }

  const embedSrc = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${config.center.lat},${config.center.lng}&zoom=${config.zoom}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center gap-2">
        <MapPin size={18} className="text-brand-blue" />
        <h3 className="font-bold text-brand-dark">{config.label}</h3>
      </div>
      <div className="relative h-80 md:h-96">
        <iframe
          title={config.label}
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="bg-white px-6 py-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {config.cities.map(city => (
            <span
              key={city.name}
              className="text-xs bg-brand-blue-pale text-brand-blue px-2.5 py-1 rounded-full font-medium"
            >
              {city.name}
            </span>
          ))}
          <span className="text-xs bg-gray-100 text-brand-gray px-2.5 py-1 rounded-full font-medium">
            + surrounding areas
          </span>
        </div>
      </div>
    </div>
  );
}

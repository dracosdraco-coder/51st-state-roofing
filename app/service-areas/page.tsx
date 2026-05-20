import type { Metadata } from 'next';
import Link from 'next/link';
import CTABlock from '@/components/CTABlock';
import { MapPin, Clock, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Areas | 51st State Roofing | South Florida',
  description: 'Commercial roofing services in Miami-Dade, Broward, and Palm Beach counties.',
};

const serviceAreas = [
  {
    area: 'Miami-Dade County',
    slug: 'miami-dade',
    cities: ['Miami', 'Aventura', 'Kendall', 'Coral Gables', 'Brickell', 'Homestead'],
    description: 'Full-service commercial roofing throughout Miami-Dade County',
    icon: '📍',
  },
  {
    area: 'Broward County',
    slug: 'broward',
    cities: ['Fort Lauderdale', 'Davie', 'Hallandale', 'Deerfield Beach', 'Pompano Beach'],
    description: 'Commercial roofing specialists serving all Broward County businesses',
    icon: '📍',
  },
  {
    area: 'Palm Beach County',
    slug: 'palm-beach',
    cities: ['West Palm Beach', 'Palm Beach', 'Boca Raton', 'Delray Beach', 'Boynton Beach'],
    description: 'Professional commercial roofing services throughout Palm Beach County',
    icon: '📍',
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white">
        <div className="section-container text-center">
          <h1 className="hero-text text-white mb-4">
            Service <span className="text-brand-blue">Areas</span>
          </h1>
          <p className="hero-subtitle text-gray-300">
            Commercial roofing services throughout South Florida
          </p>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {serviceAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-brand-blue hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{area.icon}</div>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">{area.area}</h2>

              <div className="mb-6">
                <h3 className="font-semibold text-brand-dark mb-3">Cities We Serve:</h3>
                <div className="flex flex-wrap gap-2">
                  {area.cities.map((city, i) => (
                    <span key={i} className="bg-brand-gray-light px-3 py-1 rounded text-sm text-brand-gray">
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-brand-gray mb-6">{area.description}</p>

              <Link
                href={`/service-areas/${area.slug}`}
                className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-blue-dark"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        {/* Coverage Info */}
        <div className="bg-brand-gray-light rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-brand-dark mb-6">Coverage Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <MapPin className="text-brand-blue flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-brand-dark mb-1">Primary Service Area</h3>
                <p className="text-sm text-brand-gray">
                  Miami-Dade, Broward, and Palm Beach counties with dedicated teams
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="text-brand-blue flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-brand-dark mb-1">Response Time</h3>
                <p className="text-sm text-brand-gray">
                  Same-day estimates available. Emergency service 24/7.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="text-brand-blue flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-brand-dark mb-1">Local Team</h3>
                <p className="text-sm text-brand-gray">
                  Call our main line: (954) 247-8528
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Serving Your South Florida Community"
        subheadline="Whether you're in Miami-Dade, Broward, or Palm Beach County, we're ready to help."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
      />
    </>
  );
}

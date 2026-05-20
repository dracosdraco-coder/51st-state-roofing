import type { Metadata } from 'next';
import Link from 'next/link';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Commercial Roofing in [City] | 51st State Roofing',
  description: 'Commercial roofing services in [City], South Florida. Free estimates available.',
};

export default function ServiceAreaPage({ params }: { params: { slug: string } }) {
  const areaData: any = {
    'miami-dade': {
      title: 'Miami-Dade County',
      heading: 'Commercial Roofing in Miami-Dade County',
      description:
        'From downtown Miami to Kendall, we serve all of Miami-Dade County with expert commercial roofing services.',
      cities: ['Miami', 'Aventura', 'Kendall', 'Coral Gables', 'Brickell', 'Homestead'],
    },
    'broward': {
      title: 'Broward County',
      heading: 'Commercial Roofing in Broward County',
      description:
        'Fort Lauderdale to Pompano Beach, we\'re your trusted commercial roofing partner throughout Broward.',
      cities: ['Fort Lauderdale', 'Davie', 'Hallandale', 'Deerfield Beach', 'Pompano Beach'],
    },
    'palm-beach': {
      title: 'Palm Beach County',
      heading: 'Commercial Roofing in Palm Beach County',
      description:
        'Boca Raton, Delray Beach, and beyond - we handle commercial roofing throughout Palm Beach County.',
      cities: ['West Palm Beach', 'Palm Beach', 'Boca Raton', 'Delray Beach', 'Boynton Beach'],
    },
  };

  const area = areaData[params.slug] || areaData['miami-dade'];

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white">
        <div className="section-container">
          <h1 className="hero-text text-white mb-4">{area.heading}</h1>
          <p className="hero-subtitle text-gray-300">{area.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/contact" className="btn-primary">
              Get Free Estimate
            </Link>
            <a href="tel:+19542478528" className="btn-secondary">
              (954) 247-8528
            </a>
          </div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-8 text-center">
          Cities We Serve
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {area.cities.map((city: string, index: number) => (
            <div key={index} className="bg-brand-gray-light p-6 rounded-lg border border-gray-200 text-center">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-bold text-brand-dark">{city}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Services Available in {area.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Commercial Roofing', link: '/commercial-roofing' },
              { title: 'TPO & Flat Roofing', link: '/tpo-roofing' },
              { title: 'Metal Roofing', link: '/metal-roofing' },
              { title: 'Roof Inspections', link: '/roof-inspection' },
              { title: 'Emergency Repairs', link: '/contact' },
              { title: 'Preventative Maintenance', link: '/contact' },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-brand-blue hover:shadow-md transition-all text-center"
              >
                <h3 className="font-bold text-brand-dark hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
          Why Choose Local Roofing Experts?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="font-bold text-brand-dark mb-3">Faster Response</h3>
            <p className="text-brand-gray">
              As a local company, we can reach you quickly for inspections, estimates, and emergency
              repairs.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="text-4xl mb-4">🌡️</div>
            <h3 className="font-bold text-brand-dark mb-3">Climate Knowledge</h3>
            <p className="text-brand-gray">
              We understand South Florida weather - hurricanes, heat, humidity, and intense rain.
              Our roofs are built accordingly.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="font-bold text-brand-dark mb-3">Community Trust</h3>
            <p className="text-brand-gray">
              We've built our reputation serving {area.title} businesses and take pride in our
              relationships with local property owners.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="font-bold text-brand-dark mb-3">Local Pricing</h3>
            <p className="text-brand-gray">
              No inflated costs from national chains. You get fair pricing from a local, independent
              contractor.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline={`Ready for Expert Roofing in ${area.title}?`}
        subheadline="Contact 51st State Roofing today for your free commercial roof inspection and estimate."
        primaryCTA={{ label: 'Get Free Estimate', href: '/contact' }}
      />
    </>
  );
}

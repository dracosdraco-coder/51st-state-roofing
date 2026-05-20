import type { Metadata } from 'next';
import Image from 'next/image';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Project Gallery | 51st State Construction | South Florida',
  description: 'View our completed commercial roofing projects in Miami, Broward, and Palm Beach.',
};

const projects = [
  { id: 1, title: 'Downtown Miami Office Complex', type: 'TPO Roofing', location: 'Miami-Dade' },
  { id: 2, title: 'Broward Manufacturing Facility', type: 'Metal Roofing', location: 'Broward' },
  { id: 3, title: 'Palm Beach Commercial Center', type: 'Flat Roof', location: 'Palm Beach' },
  { id: 4, title: 'Miami Beach Hotel Renovation', type: 'Metal Roofing', location: 'Miami-Dade' },
  { id: 5, title: 'Broward Logistics Warehouse', type: 'TPO Roofing', location: 'Broward' },
  { id: 6, title: 'Palm Beach Office Park', type: 'Flat Roof', location: 'Palm Beach' },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white">
        <div className="section-container text-center">
          <h1 className="hero-text text-white mb-4">
            Project <span className="text-brand-blue">Gallery</span>
          </h1>
          <p className="hero-subtitle text-gray-300">
            Quality craftsmanship on over 500 South Florida commercial roofing projects
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📷</div>
                  <p className="text-gray-600 text-sm">Before/After Photos</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-dark mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-brand-blue text-brand-dark px-3 py-1 rounded-full text-sm font-semibold">
                    {project.type}
                  </span>
                  <span className="bg-brand-gray-light text-brand-dark px-3 py-1 rounded-full text-sm">
                    {project.location}
                  </span>
                </div>
                <p className="text-brand-gray text-sm">
                  Professional installation with superior craftsmanship and attention to detail.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-brand-gray-light p-12 rounded-lg">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">
            Ready to See Your Project Join Our Gallery?
          </h2>
          <p className="text-brand-gray mb-6">
            Contact us for a free estimate on your commercial roofing project.
          </p>
          <a href="/contact" className="btn-primary">
            Request Free Estimate
          </a>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="See What We Can Do For Your Property"
        subheadline="From TPO and metal to complete inspections, we handle all commercial roofing needs."
        primaryCTA={{ label: 'Get Your Project Started', href: '/contact' }}
      />
    </>
  );
}

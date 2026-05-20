/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import Link from 'next/link';
import PremiumHero from '@/components/PremiumHero';
import ScrollAnimation from '@/components/ScrollAnimation';
import CTABlock from '@/components/CTABlock';
import TrustBar from '@/components/TrustBar';
import { CheckCircle, MapPin, Award, Wind, Snowflake, Sun, Droplets, Building, Layers, Shield, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Premium Commercial Roofing North Carolina | Charlotte, Raleigh | 51st State',
  description:
    'Luxury commercial roofing across North Carolina. Charlotte, Raleigh, Durham, Greensboro. Built for winter, storm, and extreme weather performance.',
};

export default function NorthCarolinaPage() {
  const cities = [
    'Charlotte', 'Raleigh', 'Durham', 'Greensboro',
    'Chapel Hill', 'Asheville', 'Winston-Salem', 'Cary'
  ];

  return (
    <>
      {/* Premium Hero */}
      <PremiumHero
        headline="Premium Commercial Roofing Across North Carolina"
        subheadline="Serving Charlotte, Raleigh, Greensboro, and beyond with luxury commercial roofing solutions. Engineered for North Carolina's extreme weather—from winter snow to spring storms."
        primaryCTA={{
          label: 'Free Premium Inspection',
          href: '/contact',
        }}
        secondaryCTA={{
          label: 'Call Now',
          href: 'tel:+19198714455',
        }}
        phone="(919) 871-4455"
      />

      {/* Trust Bar */}
      <TrustBar />

      {/* Why North Carolina Trusts Us */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollAnimation type="fade-right">
            <h2 className="text-4xl font-bold text-brand-dark mb-8">
              Built for North Carolina's <span className="text-brand-blue">Extreme Weather</span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: Snowflake,
                  title: 'Winter Performance',
                  desc: 'Systems rated for snow load and ice dam prevention'
                },
                {
                  icon: Wind,
                  title: 'Spring Storms',
                  desc: 'Wind-resistant design for severe thunderstorms'
                },
                {
                  icon: Sun,
                  title: 'Temperature Swings',
                  desc: 'Flexible materials that handle extreme seasonal shifts'
                },
                {
                  icon: Droplets,
                  title: 'Moisture Management',
                  desc: 'Advanced drainage for NC\'s humidity and rainfall'
                },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <IconComponent size={28} className="text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-2">{item.title}</h3>
                      <p className="text-brand-gray">{item.desc}</p>
                    </div>
                  </div>
                </ScrollAnimation>
                );
              })}
            </div>
          </ScrollAnimation>

          <ScrollAnimation type="fade-left">
            <div className="relative h-96 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-brand-gray">
                  <Building size={64} className="mx-auto mb-4 text-brand-blue" />
                  <p className="text-sm">North Carolina Commercial Roofing</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Service Cities */}
      <section className="bg-brand-gray-light py-24">
        <div className="section-container">
          <ScrollAnimation type="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Serving North Carolina's Premium Businesses
            </h2>
            <p className="text-xl text-brand-gray max-w-2xl mx-auto">
              From Charlotte's skyline to Asheville's mountains, we're the trusted choice for luxury commercial roofing
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map((city, i) => (
              <ScrollAnimation
                key={i}
                type="scale"
                delay={i * 0.05}
                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
              >
                <MapPin className="w-6 h-6 text-brand-blue mx-auto mb-3" />
                <h3 className="font-semibold text-brand-dark">{city}</h3>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-container">
        <ScrollAnimation type="fade-up" className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">
            Premium Commercial Roofing Solutions
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'TPO & Flat Roofing',
              icon: Layers,
              desc: 'Flexible systems that handle NC\'s temperature swings, from winter freeze to summer heat',
              link: '/north-carolina/tpo-roofing/'
            },
            {
              title: 'Metal Standing Seam',
              icon: Shield,
              desc: 'Premium durability rated for heavy snow loads and extreme weather',
              link: '/north-carolina/metal-roofing/'
            },
            {
              title: 'Professional Inspections',
              icon: Search,
              desc: 'Comprehensive assessments before winter and after severe weather events',
              link: '/north-carolina/roof-inspection/'
            },
          ].map((service, i) => {
            const IconComponent = service.icon;
            return (
            <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
              <Link href={service.link}>
                <div className="bg-white border-2 border-brand-gray-light rounded-2xl p-8 hover:border-brand-blue hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <div className="mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent size={48} className="text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-gray leading-relaxed mb-4">{service.desc}</p>
                  <span className="text-brand-blue font-semibold group-hover:gap-3 flex items-center gap-2">
                    Learn More →
                  </span>
                </div>
              </Link>
            </ScrollAnimation>
            );
          })}
        </div>
      </section>

      {/* NC-Specific Features */}
      <section className="bg-brand-gray-light py-24">
        <div className="section-container">
          <ScrollAnimation type="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Why NC Businesses Choose Premium
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Winter-Ready Systems',
                items: [
                  'Snow load rated design',
                  'Ice dam prevention',
                  'Thermal expansion control',
                  'Cold-weather material testing'
                ]
              },
              {
                title: 'All-Weather Protection',
                items: [
                  'Hail-resistant materials',
                  'Wind speed ratings',
                  'Heavy rain drainage',
                  'UV/temperature stability'
                ]
              },
            ].map((section, i) => (
              <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                <div className="bg-white rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-brand-dark mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                        <span className="text-brand-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-brand-blue text-white py-24">
        <div className="section-container">
          <ScrollAnimation type="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              North Carolina's Luxury Roofing Choice
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Bringing premium commercial roofing expertise to North Carolina
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { num: '500+', label: 'Projects Across the Southeast' },
              { num: '15+', label: 'Years Commercial Roofing Experience' },
              { num: '100%', label: 'Satisfaction Guarantee' },
              { num: '24/7', label: 'Emergency Support in Winter' },
            ].map((stat, i) => (
              <ScrollAnimation key={i} type="scale" delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{stat.num}</div>
                  <p className="text-white/90">{stat.label}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        headline="Ready for Premium Commercial Roofing?"
        subheadline="Get a free inspection from North Carolina's luxury roofing specialist. Winter-ready systems, summer-tested durability."
        primaryCTA={{ label: 'Request Inspection', href: '/contact' }}
      />
    </>
  );
}

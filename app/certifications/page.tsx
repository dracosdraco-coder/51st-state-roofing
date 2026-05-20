import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ExternalLink, Award, Shield, BookOpen } from 'lucide-react';
import ScrollAnimation from '@/components/ScrollAnimation';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Certifications & Accreditations | 51st State Construction',
  description: 'AIA continuing education provider, ICRI member, and COCPB certified. 51st State Construction holds industry-leading certifications in concrete restoration and commercial construction.',
};

const certifications = [
  {
    logo: '/ICRI_CONCRETE.png',
    name: 'ICRI — International Concrete Repair Institute',
    acronym: 'ICRI',
    logoWidth: 160,
    logoHeight: 90,
    category: 'Concrete Restoration',
    categoryIcon: Shield,
    description:
      'The International Concrete Repair Institute is the leading organization setting technical standards for concrete repair, protection, and restoration. ICRI Technical Guidelines govern surface preparation, repair material selection, and quality control procedures used on every concrete restoration project we undertake.',
    whatItMeans: [
      'Repair work follows ICRI Technical Guidelines — the industry\'s gold standard',
      'Surface preparation profiled to the correct CSP (Concrete Surface Profile) for each repair material',
      'Material selection based on substrate condition assessment, not guesswork',
      'Access to the latest research in structural concrete repair and protection',
    ],
    website: 'https://www.icri.org',
    websiteLabel: 'icri.org',
  },
  {
    logo: '/AIA_credit.png',
    name: 'AIA — American Institute of Architects Continuing Education Provider',
    acronym: 'AIA CE',
    logoWidth: 160,
    logoHeight: 90,
    category: 'Design Professional Education',
    categoryIcon: BookOpen,
    description:
      'As an AIA Continuing Education provider, 51st State Construction is authorized to deliver learning units (LUs) to licensed architects toward their AIA continuing education requirements. This recognition reflects our depth of technical knowledge and our commitment to educating the design community on best practices in concrete restoration and commercial construction.',
    whatItMeans: [
      'Architects can earn AIA learning units through our technical presentations',
      'Demonstrates a level of technical depth trusted by design professionals',
      'Positions 51st State as a specification resource, not just a contractor',
      'Reflects commitment to advancing industry knowledge and best practices',
    ],
    website: 'https://www.aia.org',
    websiteLabel: 'aia.org',
  },
  {
    logo: '/COCPB.png',
    name: 'COCPB — Certified by the Concrete & Polymer Composites Board',
    acronym: 'COCPB',
    logoWidth: 160,
    logoHeight: 90,
    category: 'Materials & Application',
    categoryIcon: Award,
    description:
      'COCPB certification recognizes contractors who demonstrate proficiency in the application of concrete polymer composite systems — a category that includes fiber-reinforced overlays, epoxy injection systems, and structural bonding agents. This certification verifies our installation capabilities meet the technical requirements of composite repair systems.',
    whatItMeans: [
      'Verified competency in polymer-modified concrete repair systems',
      'Approved applicator status for high-performance composite overlays',
      'Technical knowledge of epoxy, polyurethane, and cementitious systems',
      'Assurance of proper mixing, application, and curing procedures',
    ],
    website: null,
    websiteLabel: null,
  },
  {
    logo: null,
    name: 'PBCC — Palm Beach County Contractors Association',
    acronym: 'PBCC',
    logoWidth: 160,
    logoHeight: 90,
    category: 'Industry Membership',
    categoryIcon: Award,
    description:
      'The Palm Beach County Contractors Association represents licensed contractors operating in one of Florida\'s most active commercial construction markets. PBCC membership reflects our commitment to professional standards, community involvement, and staying current with Florida building code requirements and local permitting processes.',
    whatItMeans: [
      'Active participant in Palm Beach County\'s contractor community',
      'Current on Florida building code updates and local permitting requirements',
      'Access to peer resources and industry best practices in South Florida',
      'Demonstrates long-term commitment to the South Florida construction market',
    ],
    website: null,
    websiteLabel: null,
  },
];

const trustPoints = [
  'Every certification is current and actively maintained',
  'Technical training applied directly on the job site — not just on paper',
  'Certifications held by the team, not just the company name',
  'Manufacturer-approved applicator for leading repair material brands',
];

export default function CertificationsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-dark text-white py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-blue text-sm font-semibold mb-4">
            <Award size={16} />
            Certifications & Accreditations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Credentials Behind<br />
            <span className="text-brand-blue">Our Work</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Certifications earned through demonstrated technical competency — not purchased memberships. Here is what each one means and why it matters for your project.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <Image src="/ICRI_CONCRETE.png" alt="ICRI Concrete Repair" width={120} height={70} className="object-contain brightness-90 hover:brightness-100 transition-all" />
            <Image src="/AIA_credit.png" alt="AIA Continuing Education" width={120} height={70} className="object-contain brightness-90 hover:brightness-100 transition-all" />
            <Image src="/COCPB.png" alt="COCPB Certification" width={120} height={70} className="object-contain brightness-90 hover:brightness-100 transition-all" />
          </div>
        </div>
      </section>

      {/* Certifications Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
          {certifications.map((cert, i) => {
            const CategoryIcon = cert.categoryIcon;
            return (
              <ScrollAnimation key={i} type="fade-up">
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  {/* Card Header */}
                  <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm min-w-[100px] flex items-center justify-center">
                          {cert.logo ? <Image
                            src={cert.logo}
                            alt={cert.name}
                            width={cert.logoWidth}
                            height={cert.logoHeight}
                            className="object-contain"
                          /> : <span className="text-2xl font-bold text-brand-blue">{cert.acronym}</span>}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-brand-blue text-xs font-semibold mb-1">
                            <CategoryIcon size={12} />
                            {cert.category}
                          </div>
                          <h2 className="text-xl font-bold text-brand-dark">{cert.name}</h2>
                        </div>
                      </div>
                      {cert.website && (
                        <a
                          href={cert.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-brand-blue text-sm font-semibold hover:underline whitespace-nowrap"
                        >
                          {cert.websiteLabel}
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-3">About This Certification</h3>
                      <p className="text-brand-gray text-sm leading-relaxed">{cert.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-3">What It Means for Your Project</h3>
                      <ul className="space-y-2">
                        {cert.whatItMeans.map((point, j) => (
                          <li key={j} className="flex items-start gap-3 text-brand-gray text-sm">
                            <CheckCircle size={15} className="text-brand-blue mt-0.5 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation type="fade-right">
              <h2 className="text-3xl font-bold text-brand-dark mb-6">Certifications You Can Trust</h2>
              <p className="text-brand-gray mb-6">
                Any contractor can claim experience. Certifications from recognized bodies like ICRI and AIA require demonstrated technical knowledge and ongoing commitment to continuing education.
              </p>
              <ul className="space-y-3">
                {trustPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-gray text-sm">
                    <CheckCircle size={16} className="text-brand-blue mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/concrete-restoration" className="btn-primary inline-block text-center">
                  Concrete Restoration Services
                </Link>
                <Link href="/contact" className="border-2 border-brand-blue text-brand-blue px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue hover:text-white transition-colors inline-block text-center">
                  Contact Us
                </Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left">
              <div className="bg-brand-blue rounded-2xl p-8 text-white">
                <h3 className="font-bold text-xl mb-6">Licensed & Certified</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span className="text-white/70">Florida Contractor License</span>
                    <span className="font-semibold">CGC1527726</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span className="text-white/70">ICRI Membership</span>
                    <span className="font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span className="text-white/70">AIA CE Provider</span>
                    <span className="font-semibold">Registered</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span className="text-white/70">COCPB Certification</span>
                    <span className="font-semibold">Certified</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span className="text-white/70">PBCC Member</span>
                    <span className="font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Bonded & Insured</span>
                    <span className="font-semibold">Yes</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <CTABlock
        headline="Work With a Certified Team"
        subheadline="Bring your concrete restoration or commercial construction project to a contractor that can back up its claims."
        primaryCTA={{ label: 'Request a Consultation', href: '/contact' }}
      />
    </main>
  );
}

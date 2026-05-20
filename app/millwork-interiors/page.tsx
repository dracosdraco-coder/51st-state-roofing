import type { Metadata } from 'next';
import Link from 'next/link';
import PremiumHero from '@/components/PremiumHero';
import TrustBar from '@/components/TrustBar';
import { CheckCircle, Hammer, Layers, Palette, Ruler, Star, Package } from 'lucide-react';
import ScrollAnimation from '@/components/ScrollAnimation';
import CTABlock from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Custom Millwork & Interior Design Build | 51st State Construction',
  description: 'Turn-key custom interior design and build services. Architectural millwork, custom furniture, stonework fabrication, and specialty finishes for commercial and residential properties.',
};

const services = [
  {
    icon: Hammer,
    title: 'Architectural Millwork',
    description: 'Custom fabricated millwork for commercial and residential interiors — wall paneling, built-ins, cabinetry, casing, base, and crown details engineered to specification.',
  },
  {
    icon: Package,
    title: 'Custom Furniture & Casework',
    description: 'One-off and production-run custom furniture, reception desks, retail fixtures, and millwork casework built to your design or our architectural team\'s drawings.',
  },
  {
    icon: Layers,
    title: 'Stonework Fabrication & Installation',
    description: 'Custom stone countertops, feature walls, flooring, and decorative elements. Fabrication and installation of natural stone, engineered quartz, and porcelain systems.',
  },
  {
    icon: Palette,
    title: 'Specialty Finishes & Faux Effects',
    description: 'Decorative painting, faux finishes, plaster effects, and specialty coatings. Trained craftsmen producing high-end finish results that standard painters cannot replicate.',
  },
  {
    icon: Ruler,
    title: 'Design-Build Interiors',
    description: 'Turn-key interior solutions from concept through installation. We partner with designers and engineers to deliver complete interior transformations under one contract.',
  },
  {
    icon: Star,
    title: 'Engineering & Design Support',
    description: 'In-house engineering support and architectural design services for complex millwork and interior scopes — shop drawings, structural review, and finish specifications.',
  },
];

const partners = [
  'Architects & Interior Designers',
  'Commercial Property Owners',
  'Hotel & Hospitality Groups',
  'Retail & Restaurant Operators',
  'High-End Residential',
  'General Contractors',
];

const process = [
  { step: '01', title: 'Design Consultation', desc: 'We review your concept, existing conditions, and project goals — then work with your designer or develop options in-house.' },
  { step: '02', title: 'Shop Drawings & Approval', desc: 'Detailed fabrication drawings submitted for architectural review and owner approval before any material is cut.' },
  { step: '03', title: 'Fabrication', desc: 'Custom millwork and stonework built in our facility to exact specification — no off-the-shelf substitutions.' },
  { step: '04', title: 'Installation & Finishing', desc: 'Field installation by our craftsmen, followed by all finish work — paint, stain, lacquer, and specialty effects.' },
];

export default function MillworkInteriorsPage() {
  return (
    <>
      <PremiumHero
        headline="Custom Millwork & Turn-Key Interiors"
        subheadline="Architectural millwork, stonework fabrication, specialty finishes, and complete interior design-build — from concept to installed, under one contract."
        primaryCTA={{ label: 'Start Your Project', href: '/contact' }}
        secondaryCTA={{ label: '(561) 985-2484', href: 'tel:+15619852484' }}
        phone="(561) 985-2484"
      />
      <TrustBar />

      {/* Services */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">What We Build</h2>
            <p className="text-brand-gray mb-12 max-w-2xl">From a single custom piece to a complete interior fit-out — we handle design, fabrication, and installation under one contract.</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-brand-blue hover:shadow-lg transition-all">
                    <Icon size={36} className="text-brand-blue mb-4" />
                    <h3 className="text-lg font-bold text-brand-dark mb-2">{service.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{service.description}</p>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section>
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation type="fade-right">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Who We Work With</h2>
              <p className="text-brand-gray mb-8">
                We partner with architects, designers, and owners who need a fabricator and installer that can execute their vision — not just a contractor who approximates it.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {partners.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-brand-gray text-sm">
                    <CheckCircle size={16} className="text-brand-blue shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn-primary inline-block">Discuss Your Project</Link>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left">
              <div className="bg-brand-blue-pale rounded-2xl p-8">
                <h3 className="font-bold text-brand-dark mb-6 text-lg">What Sets Us Apart</h3>
                <div className="space-y-4">
                  {[
                    { title: 'In-House Engineering', detail: 'Structural review and shop drawings — no outsourcing delays' },
                    { title: 'Custom Fabrication', detail: 'Built to your exact specification, not modified catalog pieces' },
                    { title: 'Specialty Finishes', detail: 'Faux effects and decorative coatings unavailable from standard painters' },
                    { title: 'Turn-Key Delivery', detail: 'Design through installation under one contract' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-brand-blue mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-brand-dark text-sm">{item.title}</div>
                        <div className="text-brand-gray text-xs mt-0.5">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-brand-gray-light">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">From Concept to Installed</h2>
            <p className="text-brand-gray mb-12 max-w-2xl">A clear process that keeps your designer, architect, and ownership team informed at every stage.</p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <ScrollAnimation key={i} type="fade-up" delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="text-3xl font-bold text-brand-blue mb-3">{step.step}</div>
                  <h3 className="font-bold text-brand-dark mb-2">{step.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{step.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        headline="Have a Custom Interior Project?"
        subheadline="Tell us what you&apos;re trying to build. We&apos;ll review your drawings or concept and put together a realistic scope and timeline."
        primaryCTA={{ label: 'Start the Conversation', href: '/contact' }}
      />
    </>
  );
}

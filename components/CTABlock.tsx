import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

interface Props {
  headline?: string;
  subheadline?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  showPhone?: boolean;
}

export default function CTABlock({
  headline = 'Ready to Get Your Commercial Roof Inspected?',
  subheadline = "Contact 51st State Roofing today for a free estimate and professional assessment.",
  primaryCTA = { label: 'Request Free Estimate', href: '/contact' },
  secondaryCTA,
  showPhone = true,
}: Props) {
  return (
    <section className="bg-gradient-to-r from-brand-dark to-brand-dark via-gray-800 text-white">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{subheadline}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryCTA.href} className="btn-primary">
            {primaryCTA.label} <ArrowRight className="inline ml-2 w-4 h-4" />
          </Link>

          {secondaryCTA && (
            <Link href={secondaryCTA.href} className="btn-secondary">
              {secondaryCTA.label}
            </Link>
          )}

          {showPhone && (
            <div className="hidden sm:block border-l border-gray-600 pl-6">
              <p className="text-sm text-gray-400 mb-1">Or call us directly:</p>
              <a
                href="tel:+19542478528"
                className="flex items-center gap-2 text-2xl font-bold text-brand-blue hover:text-white transition-colors"
              >
                <Phone size={20} />
                (954) 247-8528
              </a>
            </div>
          )}
        </div>

        {showPhone && (
          <div className="sm:hidden mt-6 border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400 mb-2">Or call us directly:</p>
            <a
              href="tel:+19542478528"
              className="inline-flex items-center gap-2 text-2xl font-bold text-brand-blue hover:text-white transition-colors"
            >
              <Phone size={20} />
              (954) 247-8528
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

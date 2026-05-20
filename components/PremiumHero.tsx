'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

interface PremiumHeroProps {
  headline: string;
  subheadline: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  phone?: string;
  showPhone?: boolean;
}

export default function PremiumHero({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  phone = '(561) 985-2484',
  showPhone = true,
}: PremiumHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-brand-blue-pale via-white to-white pt-24 pb-32 md:pt-40 md:pb-48 overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="section-container">
        <div className="max-w-4xl">
          {/* Animated headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero-text text-brand-dark mb-6"
          >
            {headline}
          </motion.h1>

          {/* Animated subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero-subtitle text-brand-gray max-w-2xl mb-12"
          >
            {subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            {primaryCTA && (
              <Link
                href={primaryCTA.href}
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                {primaryCTA.label}
                <motion.span
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            )}

            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                {secondaryCTA.icon}
                {secondaryCTA.label}
              </Link>
            )}
          </motion.div>

          {/* Phone number */}
          {showPhone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <Phone size={18} className="text-brand-blue" />
              <a
                href={`tel:${phone}`}
                className="text-brand-blue font-semibold hover:text-brand-blue-light transition-colors"
              >
                {phone}
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating accent */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-10 top-20 w-40 h-40 border-2 border-brand-blue/20 rounded-full hidden lg:block"
      />
    </section>
  );
}

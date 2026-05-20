'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  videoSrc?: string;
}

export default function PremiumHero({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  phone = '(561) 985-2484',
  showPhone = true,
  videoSrc,
}: PremiumHeroProps) {
  const dark = !!videoSrc;

  return (
    <section className={`relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden ${dark ? 'bg-brand-dark' : 'bg-gradient-to-b from-brand-blue-pale via-white to-white'}`}>

      {/* Video background */}
      {videoSrc && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-dark/70 z-0" />
        </>
      )}

      {/* Light mode background blobs */}
      {!videoSrc && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -z-10" />
        </>
      )}

      <div className="section-container relative z-10">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`hero-text mb-6 ${dark ? 'text-white' : 'text-brand-dark'}`}
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`hero-subtitle max-w-2xl mb-12 ${dark ? 'text-gray-300' : 'text-brand-gray'}`}
          >
            {subheadline}
          </motion.p>

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
                <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            )}

            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${dark ? 'bg-white/10 border border-white/30 text-white hover:bg-white/20' : 'btn-secondary'}`}
              >
                {secondaryCTA.icon}
                {secondaryCTA.label}
              </Link>
            )}
          </motion.div>

          {showPhone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <Phone size={18} className={dark ? 'text-white' : 'text-brand-blue'} />
              <a
                href={`tel:+1${phone.replace(/\D/g, '')}`}
                className={`font-semibold transition-colors ${dark ? 'text-white hover:text-gray-200' : 'text-brand-blue hover:text-brand-blue-light'}`}
              >
                {phone}
              </a>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating circle with logo */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className={`absolute right-10 top-16 w-72 h-72 rounded-full hidden lg:flex items-center justify-center overflow-hidden border-2 z-10 ${dark ? 'border-white/20 bg-transparent' : 'border-brand-blue/20 bg-white/80 backdrop-blur-sm'}`}
      >
        <Image
          src="/51statelogo.png"
          alt="51st State Construction"
          width={260}
          height={260}
          className={`object-contain p-4 ${dark ? 'brightness-0 invert opacity-70' : ''}`}
        />
      </motion.div>
    </section>
  );
}

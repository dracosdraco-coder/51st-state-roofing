'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const servicesMenu = [
  {
    label: 'Commercial Roofing — Florida',
    href: '/florida',
    description: 'TPO, metal & flat roofing across South Florida',
  },
  {
    label: 'Commercial Roofing — North Carolina',
    href: '/north-carolina',
    description: 'Charlotte, Raleigh & Greensboro markets',
  },
  {
    label: 'General Contracting',
    href: '/general-contracting',
    description: 'Full-scope commercial construction & renovation',
  },
  {
    label: 'Concrete Restoration',
    href: '/concrete-restoration',
    description: 'ICRI-certified structural repair & waterproofing',
  },
  {
    label: 'Millwork & Interiors',
    href: '/millwork-interiors',
    description: 'Custom millwork, stonework & turn-key interior build',
  },
];

const mobileLinks = [
  { href: '/', label: 'Home' },
  { href: '/florida', label: 'Roofing — Florida' },
  { href: '/north-carolina', label: 'Roofing — North Carolina' },
  { href: '/general-contracting', label: 'General Contracting' },
  { href: '/concrete-restoration', label: 'Concrete Restoration' },
  { href: '/millwork-interiors', label: 'Millwork & Interiors' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/51statelogo.png"
              alt="51st State Construction"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-brand-gray hover:text-brand-dark transition-colors text-sm font-medium"
              >
                Services
                <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {servicesMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-3 hover:bg-brand-blue-pale transition-colors"
                    >
                      <div className="text-sm font-semibold text-brand-dark">{item.label}</div>
                      <div className="text-xs text-brand-gray mt-0.5">{item.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/certifications" className="text-brand-gray hover:text-brand-dark transition-colors text-sm font-medium">
              Certifications
            </Link>
            <Link href="/gallery" className="text-brand-gray hover:text-brand-dark transition-colors text-sm font-medium">
              Gallery
            </Link>
            <Link href="/blog" className="text-brand-gray hover:text-brand-dark transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-brand-gray hover:text-brand-dark transition-colors text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15619852484"
              className="text-brand-dark font-semibold hover:text-brand-blue transition-colors text-sm"
            >
              (561) 985-2484
            </a>
            <Link href="/contact" className="btn-primary text-sm">
              Free Estimate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brand-dark hover:text-brand-blue transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-brand-gray hover:text-brand-dark transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <a
                href="tel:+15619852484"
                className="block py-2 text-brand-dark font-semibold mb-4 text-sm"
              >
                (561) 985-2484
              </a>
              <Link href="/contact" className="btn-primary block text-center text-sm">
                Free Estimate
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

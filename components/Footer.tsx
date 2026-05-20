'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/51statelogo.png"
                alt="51st State Construction"
                width={180}
                height={60}
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Commercial construction specialists serving Florida & North Carolina since 2012.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/51stateconstruction" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/51stateconstruction" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/51stateconstruction" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/florida" className="hover:text-brand-blue transition-colors">
                  Roofing — Florida
                </Link>
              </li>
              <li>
                <Link href="/north-carolina" className="hover:text-brand-blue transition-colors">
                  Roofing — North Carolina
                </Link>
              </li>
              <li>
                <Link href="/general-contracting" className="hover:text-brand-blue transition-colors">
                  General Contracting
                </Link>
              </li>
              <li>
                <Link href="/concrete-restoration" className="hover:text-brand-blue transition-colors">
                  Concrete Restoration
                </Link>
              </li>
              <li>
                <Link href="/millwork-interiors" className="hover:text-brand-blue transition-colors">
                  Millwork & Interiors
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-brand-blue transition-colors">
                  Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-brand-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-blue transition-colors">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+15619852484" className="text-brand-blue font-semibold hover:text-white transition-colors">
                  (561) 985-2484
                </a>
              </li>
              <li>
                <a href="mailto:51statereno@gmail.com" className="text-gray-400 hover:text-brand-blue transition-colors">
                  51statereno@gmail.com
                </a>
              </li>
              <li className="text-gray-400 pt-2">
                <strong>Markets:</strong>
                <div className="mt-2 space-y-1">
                  <div>South Florida</div>
                  <div>North Carolina</div>
                  <div>General Contracting</div>
                </div>
              </li>
              <li className="text-gray-400 pt-2">
                <strong>License:</strong> CGC1527726
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} 51st State Construction. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-brand-blue transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-brand-blue transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold">
                51
              </div>
              <span className="font-bold text-xl">51st State Roofing</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Commercial roofing specialists serving South Florida since 2012.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/51stateroofing" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/51stateroofing" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/51stateroofing" target="_blank" rel="noopener noreferrer"
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
                <Link href="/commercial-roofing" className="hover:text-brand-blue transition-colors">
                  Commercial Roofing
                </Link>
              </li>
              <li>
                <Link href="/tpo-roofing" className="hover:text-brand-blue transition-colors">
                  TPO & Flat Roofing
                </Link>
              </li>
              <li>
                <Link href="/metal-roofing" className="hover:text-brand-blue transition-colors">
                  Metal Roofing
                </Link>
              </li>
              <li>
                <Link href="/roof-inspection" className="hover:text-brand-blue transition-colors">
                  Roof Inspection
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="hover:text-brand-blue transition-colors">
                  Service Areas
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
                <a href="tel:+19542478528" className="text-brand-blue font-semibold hover:text-white transition-colors">
                  (954) 247-8528
                </a>
              </li>
              <li>
                <a href="mailto:info@51stateroofing.com" className="text-gray-400 hover:text-brand-blue transition-colors">
                  info@51stateroofing.com
                </a>
              </li>
              <li className="text-gray-400 pt-2">
                <strong>Service Areas:</strong>
                <div className="mt-2 space-y-1">
                  <div>Miami-Dade County</div>
                  <div>Broward County</div>
                  <div>Palm Beach County</div>
                </div>
              </li>
              <li className="text-gray-400 pt-2">
                <strong>License:</strong> CBC1258966
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} 51st State Roofing. All rights reserved.</p>
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

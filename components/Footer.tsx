import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { getSiteSettings } from '@/lib/sanity';

// Fallback values used until Site Settings is populated in Sanity Studio
const defaults = {
  phone: '(561) 985-2484',
  email: '51statereno@gmail.com',
  licenseNumber: 'CGC1527726',
  socialLinks: {
    facebook: 'https://facebook.com/51stateconstruction',
    instagram: 'https://instagram.com/51stateconstruction',
    linkedin: 'https://linkedin.com/company/51stateconstruction',
  },
};

export default async function Footer() {
  const settings = await getSiteSettings();

  const phone = settings?.phone || defaults.phone;
  const email = settings?.email || defaults.email;
  const license = settings?.licenseNumber || defaults.licenseNumber;
  const fb = settings?.socialLinks?.facebook || defaults.socialLinks.facebook;
  const ig = settings?.socialLinks?.instagram || defaults.socialLinks.instagram;
  const li = settings?.socialLinks?.linkedin || defaults.socialLinks.linkedin;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
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
              <a href={fb} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href={ig} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href={li} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { href: '/florida', label: 'Roofing — Florida' },
                { href: '/north-carolina', label: 'Roofing — North Carolina' },
                { href: '/general-contracting', label: 'General Contracting' },
                { href: '/concrete-restoration', label: 'Concrete Restoration' },
                { href: '/millwork-interiors', label: 'Millwork & Interiors' },
                { href: '/certifications', label: 'Certifications' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { href: '/estimator', label: 'Instant Estimator' },
                { href: '/locations', label: 'Find a Location' },
                { href: '/gallery', label: 'Project Gallery' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:+1${phone.replace(/\D/g, '')}`}
                  className="text-brand-blue font-semibold hover:text-white transition-colors">
                  {phone}
                </a>
                <span className="text-gray-500 text-xs block mt-0.5">Florida</span>
              </li>
              {settings?.phoneNC && (
                <li>
                  <a href={`tel:+1${settings.phoneNC.replace(/\D/g, '')}`}
                    className="text-brand-blue font-semibold hover:text-white transition-colors">
                    {settings.phoneNC}
                  </a>
                  <span className="text-gray-500 text-xs block mt-0.5">North Carolina</span>
                </li>
              )}
              <li>
                <a href={`mailto:${email}`}
                  className="text-gray-400 hover:text-brand-blue transition-colors">
                  {email}
                </a>
              </li>
              <li className="text-gray-400 pt-1">
                <strong className="text-gray-300">License:</strong> {license}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} 51st State Construction. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-brand-blue transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

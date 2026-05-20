/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import Link from 'next/link';
import TrustBar from '@/components/TrustBar';
import ScrollAnimation from '@/components/ScrollAnimation';
import { Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact 51st State Construction | Free Estimate | South Florida',
  description: 'Get a free commercial roofing estimate. Contact us today for inspections, repairs, or new installations. Licensed contractor in Miami, Broward, Palm Beach.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-dark via-gray-800 to-brand-dark text-white py-20">
        <div className="section-container">
          <ScrollAnimation type="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Your Free <span className="text-brand-blue">Roofing Estimate</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Contact 51st State Construction today for professional commercial roofing services
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Contact Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <ScrollAnimation type="fade-right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-2">Phone</h3>
                    <a href="tel:+15619852484" className="text-brand-gray hover:text-brand-blue transition-colors">
                      (561) 985-2484
                    </a>
                    <p className="text-sm text-brand-gray mt-1">24/7 Emergency Support Available</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-2">Email</h3>
                    <a href="mailto:51statereno@gmail.com" className="text-brand-gray hover:text-brand-blue transition-colors">
                      51statereno@gmail.com
                    </a>
                    <p className="text-sm text-brand-gray mt-1">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-2">Service Areas</h3>
                    <p className="text-brand-gray">
                      Miami-Dade, Broward, Palm Beach Counties (Florida)<br />
                      Charlotte, Raleigh, Greensboro (North Carolina)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-brand-gray-light rounded-lg">
                <h3 className="font-semibold text-brand-dark mb-3">License Information</h3>
                <p className="text-sm text-brand-gray">
                  <strong>Florida License:</strong> CGC1527726<br />
                  <strong>Fully Insured & Bonded</strong>
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation type="fade-left">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full border border-brand-gray-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-300 bg-brand-gray-light"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="(561) 985-2484"
                  className="w-full border border-brand-gray-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-300 bg-brand-gray-light"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full border border-brand-gray-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-300 bg-brand-gray-light"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your business name"
                  className="w-full border border-brand-gray-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-300 bg-brand-gray-light"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">
                  Service Needed
                </label>
                <select
                  name="service"
                  required
                  className="w-full border border-brand-gray-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-300 bg-brand-gray-light"
                >
                  <option value="">Select a service</option>
                  <option value="tpo">TPO & Flat Roofing</option>
                  <option value="metal">Metal Standing Seam</option>
                  <option value="inspection">Roof Inspection</option>
                  <option value="repair">Roof Repair</option>
                  <option value="replacement">Roof Replacement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us about your roofing needs"
                  rows={5}
                  className="w-full border border-brand-gray-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-300 bg-brand-gray-light resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-brand-blue-light transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Request Free Estimate
              </button>

              <p className="text-xs text-brand-gray text-center">
                We'll respond within 2 hours during business hours. 24/7 emergency line available.
              </p>
            </form>
          </ScrollAnimation>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="bg-brand-gray-light mt-20">
        <div className="section-container text-center">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-lg text-brand-gray mb-8">
              Call us anytime—we're available 24/7 for emergencies
            </p>
            <a
              href="tel:+15619852484"
              className="inline-block bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-blue-light transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Call (561) 985-2484
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </>
  );
}

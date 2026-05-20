'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Building, Home, HelpCircle, Grid3x3 } from 'lucide-react';
import {
  trackEstimatorStep,
  trackEstimatorCompleted,
  trackFormStart,
  getStoredUTM,
} from '@/lib/analytics';
import { sendLeadToProjectex } from '@/lib/projex';
import { Resend } from 'resend';

interface EstimatorData {
  propertyAddress: string;
  roofTypes: string[];
  roofSize: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  additionalNotes: string;
}

interface Props {
  pageSource?: string;
  showTitle?: boolean;
}

const roofTypeOptions = [
  { id: 'tpo', label: 'TPO / Single Ply', icon: 'Layers' },
  { id: 'modified', label: 'Modified Bitumen', icon: 'Building' },
  { id: 'metal', label: 'Metal Standing Seam', icon: 'Grid3x3' },
  { id: 'shingle', label: 'Shingle (Residential)', icon: 'Home' },
  { id: 'buildup', label: 'Built-Up / Gravel', icon: 'Layers' },
  { id: 'unknown', label: 'Unknown / Need Assessment', icon: 'HelpCircle' },
];

const roofSizeOptions = [
  { id: 'under50', label: 'Under 50 SQ', value: 'Under 50 SQ' },
  { id: '50-150', label: '50–150 SQ', value: '50-150 SQ' },
  { id: '150-300', label: '150–300 SQ', value: '150-300 SQ' },
  { id: '300-500', label: '300–500 SQ', value: '300-500 SQ' },
  { id: '500plus', label: '500+ SQ', value: '500+ SQ' },
];

export default function RoofEstimator({ pageSource = 'website', showTitle = true }: Props) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState<EstimatorData>({
    propertyAddress: '',
    roofTypes: [],
    roofSize: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    companyName: '',
    additionalNotes: '',
  });

  // Load UTM params on mount
  useEffect(() => {
    const utm = getStoredUTM();
    // UTM params are used when submitting
  }, []);

  const handleAddressChange = (value: string) => {
    setData({ ...data, propertyAddress: value });
  };

  const handleRoofTypeToggle = (typeId: string) => {
    setData((prev) => ({
      ...prev,
      roofTypes: prev.roofTypes.includes(typeId)
        ? prev.roofTypes.filter((t) => t !== typeId)
        : [...prev.roofTypes, typeId],
    }));
  };

  const handleRoofSizeSelect = (size: string) => {
    setData({ ...data, roofSize: size });
  };

  const handleContactFormChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (!isSubmitting) {
      trackFormStart('roof-estimator');
    }
  };

  const handleNextStep = () => {
    // Validate current step
    switch (step) {
      case 1:
        if (!data.propertyAddress.trim()) {
          setError('Please enter a property address');
          return;
        }
        break;
      case 2:
        if (data.roofTypes.length === 0) {
          setError('Please select at least one roof type');
          return;
        }
        break;
      case 3:
        if (!data.roofSize) {
          setError('Please select a roof size');
          return;
        }
        break;
      default:
        break;
    }

    setError('');
    trackEstimatorStep(step);

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    if (!data.firstName.trim() || !data.lastName.trim() || !data.phone.trim() || !data.email.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const utm = getStoredUTM() || {};

      // Prepare lead data
      const leadPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        roofType: data.roofTypes.join(', '),
        roofSize: data.roofSize,
        propertyAddress: data.propertyAddress,
        additionalNotes: data.additionalNotes,
        pageSource,
        utmSource: utm.source || '',
        utmCampaign: utm.campaign || '',
        utmMedium: utm.medium || '',
        utmContent: utm.content || '',
        utmTerm: utm.term || '',
      };

      // Send to Projex via /api/leads
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit estimate request');
      }

      trackEstimatorCompleted({
        roof_type: data.roofTypes.join(', '),
        roof_size: data.roofSize,
        property_address: data.propertyAddress,
        page_source: pageSource,
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error('Estimator submission error:', err);
      setError('An error occurred. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <div className="mb-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
          >
            <CheckCircle size={32} className="text-green-600" />
          </motion.div>
        </div>
        <h3 className="text-3xl font-bold text-brand-dark mb-4">
          Estimate Request Received!
        </h3>
        <p className="text-lg text-brand-gray mb-6">
          Thank you! We'll contact you within <strong>1 business hour</strong> to discuss your
          commercial roofing needs.
        </p>
        <div className="bg-brand-gray-light p-6 rounded-lg mb-6">
          <p className="text-sm text-brand-gray mb-2">Can't wait? Call us now:</p>
          <a href="tel:+19542478528" className="text-2xl font-bold text-brand-blue hover:text-brand-blue-dark">
            (954) 247-8528
          </a>
        </div>
        <button
          onClick={() => {
            setStep(1);
            setSubmitSuccess(false);
            setData({
              propertyAddress: '',
              roofTypes: [],
              roofSize: '',
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              companyName: '',
              additionalNotes: '',
            });
          }}
          className="btn-primary"
        >
          Request Another Estimate
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {showTitle && (
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Free Commercial Roof Estimator
          </h2>
          <p className="text-brand-gray text-lg">
            Get a quick estimate for your commercial roof in just 4 steps
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex flex-col items-center flex-1">
              <motion.div
                animate={{
                  backgroundColor: step >= num ? '#FFD600' : '#E5E7EB',
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-2"
              >
                {num}
              </motion.div>
              <span className="text-xs text-brand-gray hidden sm:inline">
                {num === 1 && 'Address'}
                {num === 2 && 'Roof Type'}
                {num === 3 && 'Size'}
                {num === 4 && 'Contact'}
              </span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-brand-blue"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
        >
          {error}
        </motion.div>
      )}

      {/* Step 1: Address */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
              <h3 className="text-2xl font-bold text-brand-dark mb-4">
                What's your property address?
              </h3>
              <input
                type="text"
                placeholder="Enter street address, city, ZIP code"
                value={data.propertyAddress}
                onChange={(e) => handleAddressChange(e.target.value)}
                className="w-full mb-4"
              />
              <p className="text-sm text-brand-gray mb-4">
                We serve Miami-Dade, Broward, and Palm Beach counties in South Florida.
              </p>
            </div>
          </motion.div>
        )}

        {/* Step 2: Roof Type */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
              <h3 className="text-2xl font-bold text-brand-dark mb-4">
                What type of roof do you have?
              </h3>
              <p className="text-sm text-brand-gray mb-6">Select all that apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roofTypeOptions.map((type) => {
                  const iconMap = {
                    'Layers': Layers,
                    'Building': Building,
                    'Grid3x3': Grid3x3,
                    'Home': Home,
                    'HelpCircle': HelpCircle,
                  };
                  const IconComponent = iconMap[type.icon];
                  return (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoofTypeToggle(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      data.roofTypes.includes(type.id)
                        ? 'border-brand-blue bg-brand-blue bg-opacity-10'
                        : 'border-gray-300 hover:border-brand-blue'
                    }`}
                  >
                    <div className="mb-2 flex justify-center">
                      {IconComponent && <IconComponent size={32} className="text-brand-blue" />}
                    </div>
                    <div className="text-sm font-semibold text-left">{type.label}</div>
                  </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Roof Size */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                Estimate your roof size
              </h3>
              <p className="text-sm text-brand-gray mb-6">
                <strong>1 square = 100 sq ft</strong> (e.g., 10 squares = 1,000 sq ft)
              </p>
              <div className="grid grid-cols-1 gap-3">
                {roofSizeOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoofSizeSelect(option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      data.roofSize === option.value
                        ? 'border-brand-blue bg-brand-blue bg-opacity-10'
                        : 'border-gray-300 hover:border-brand-blue'
                    }`}
                  >
                    <div className="font-semibold text-brand-dark">{option.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Contact */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
              <h3 className="text-2xl font-bold text-brand-dark mb-6">
                Your information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First Name *"
                  value={data.firstName}
                  onChange={(e) => handleContactFormChange('firstName', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={data.lastName}
                  onChange={(e) => handleContactFormChange('lastName', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={data.phone}
                  onChange={(e) => handleContactFormChange('phone', e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={data.email}
                  onChange={(e) => handleContactFormChange('email', e.target.value)}
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Company Name (optional)"
                value={data.companyName}
                onChange={(e) => handleContactFormChange('companyName', e.target.value)}
                className="w-full mb-4"
              />

              <textarea
                placeholder="Additional notes about your roof (optional)"
                value={data.additionalNotes}
                onChange={(e) => handleContactFormChange('additionalNotes', e.target.value)}
                rows={4}
                className="w-full mb-6"
              />

              <p className="text-xs text-brand-gray mb-6">
                * Required fields. We'll contact you within 1 business hour.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Estimate'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={handlePrevStep}
          disabled={step === 1}
          className="btn-secondary disabled:opacity-50"
        >
          Back
        </button>
        {step < 4 && (
          <button onClick={handleNextStep} className="btn-primary ml-auto">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

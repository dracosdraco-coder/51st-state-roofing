'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  company?: string;
  location?: string;
  rating?: number;
  showImage?: boolean;
  imageUrl?: string;
}

export default function TestimonialBlock({
  quote,
  author,
  company,
  location,
  rating = 5,
  showImage = false,
  imageUrl,
}: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-brand-blue text-brand-blue" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-lg text-brand-dark mb-6 leading-relaxed italic">
        "{quote}"
      </p>

      {/* Author Info */}
      <div className="border-t border-gray-200 pt-6">
        <p className="font-semibold text-brand-dark">{author}</p>
        {company && <p className="text-sm text-brand-gray">{company}</p>}
        {location && <p className="text-sm text-brand-gray">{location}</p>}
      </div>
    </motion.div>
  );
}

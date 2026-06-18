'use client';

import { Phone } from 'lucide-react';
import { trackPhoneClick } from '@/lib/gtag';

export default function StickyCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-dark border-t border-white/10 safe-bottom">
      <div className="grid grid-cols-2">
        <a
          href="tel:+15619852484"
          onClick={() => trackPhoneClick('FL')}
          className="flex flex-col items-center justify-center py-3 gap-0.5 bg-brand-blue active:bg-blue-700 transition-colors"
        >
          <Phone size={16} className="text-white" />
          <span className="text-white text-xs font-bold">(561) 985-2484</span>
          <span className="text-blue-200 text-[10px]">Florida</span>
        </a>
        <a
          href="tel:+15619852484"
          onClick={() => trackPhoneClick('NC')}
          className="flex flex-col items-center justify-center py-3 gap-0.5 bg-brand-dark border-l border-white/10 active:bg-gray-800 transition-colors"
        >
          <Phone size={16} className="text-white" />
          <span className="text-white text-xs font-bold">(561) 985-2484</span>
          <span className="text-gray-400 text-[10px]">North Carolina</span>
        </a>
      </div>
    </div>
  );
}

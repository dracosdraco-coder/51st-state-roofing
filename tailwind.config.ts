import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium Blue & White Palette
        'brand-blue': '#003366',      // Deep luxury blue
        'brand-blue-light': '#004080', // Medium blue
        'brand-blue-pale': '#E8F0F7',  // Very light blue
        'brand-white': '#FFFFFF',
        'brand-dark': '#1A2B3D',       // Dark gray-blue
        'brand-gray': '#6B7280',       // Neutral gray
        'brand-gray-light': '#F0F4F8',  // Very light gray
        'brand-accent': '#0066CC',      // Bright accent blue
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-down': 'slideDown 0.8s ease-out',
        'fade-in-delay': 'fadeInDelay 1s ease-out 0.3s both',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDelay: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        sm: '4px',
        md: '12px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};

export default config;

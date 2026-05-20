import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: '51st State Construction | Commercial Roofing Services | South Florida',
  description:
    'Commercial roofing contractor in South Florida. TPO, metal, and flat roof installation, repair, and inspection. Licensed, insured, and serving Miami-Dade, Broward, and Palm Beach counties.',
  keywords:
    'commercial roofing South Florida, TPO roofing Miami, metal roofing Broward, roof inspection Palm Beach',
  authors: [{ name: '51st State Construction' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://51stateconstruction.com',
    title: '51st State Construction | Commercial Roofing Services | South Florida',
    description:
      'Commercial roofing contractor in South Florida. TPO, metal, and flat roof services.',
    images: [
      {
        url: 'https://51stateconstruction.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '51st State Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '51st State Construction | Commercial Roofing Services | South Florida',
    description: 'Commercial roofing contractor in South Florida.',
    images: ['https://51stateconstruction.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Tag Manager (GTM) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          />
        )}

        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* CallRail Tracking */}
        {process.env.NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID && (
          <script
            src={`https://d3mz1nqnhzpn8s.cloudfront.net/web/track.js`}
            type="text/javascript"
            data-account-id={process.env.NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID}
            data-number-pool-id={process.env.NEXT_PUBLIC_CALLRAIL_ORGANIC}
            async
          />
        )}

        {/* No-script image pixel for Facebook */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <img
                  height="1"
                  width="1"
                  style="display:none"
                  src="https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1"
                />
              `,
            }}
          />
        )}

        {/* Canonical URL */}
        <link rel="canonical" href="https://51stateconstruction.com" />

        {/* Mobile / PWA */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#FFD600" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body className="bg-white text-brand-dark">
        {/* GTM noscript fallback */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />

        {/* Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}

# 51st State Roofing - Commercial Lead Generation Website

A production-ready Next.js 14 commercial roofing lead generation website for 51st State Roofing, serving South Florida.

**Live Site:** https://51stateroofing.com

## 🎯 Project Overview

This is a complete, enterprise-grade commercial roofing website featuring:

- **10 Service Pages** covering TPO, metal, and flat roofing systems
- **Interactive Multi-Step Roof Estimator** with animated transitions
- **Full Analytics Integration** (GA4, Facebook Pixel, GTM, CallRail)
- **Sanity CMS Integration** for dynamic content (blog, service areas, gallery)
- **Lead Generation Pipeline** with automatic CRM sync and email confirmations
- **SEO-Optimized** with schema markup, sitemap, and robots.txt
- **Mobile-First Design** with Tailwind CSS
- **Responsive Components** built with Framer Motion animations

## 📋 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.4
- **CMS:** Sanity.io
- **Animations:** Framer Motion
- **APIs:** Google Places, Resend, CallRail, Projex
- **Hosting:** Vercel (recommended)
- **Analytics:** Google Tag Manager, GA4, Facebook Pixel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Sanity account and project
- Google Maps API key
- Vercel account (for deployment)

### 1. Clone & Setup

```bash
git clone <repository>
cd 51st-state-roofing
npm install
```

### 2. Environment Variables

```bash
cp .env.local.example .env.local
# Fill in all required values (see below)
```

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 🔧 Environment Variables

### Required for Core Functionality

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
NEXT_PUBLIC_SITE_URL=https://51stateroofing.com
```

### Analytics (Recommended)

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX
GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

### Lead Management (Recommended)

```
NEXT_PUBLIC_PROJEX_WEBHOOK_URL=your_projex_webhook_url
RESEND_API_KEY=your_resend_api_key
```

### Phone Tracking (Optional)

```
NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID=xxxxxxxx
NEXT_PUBLIC_CALLRAIL_PAID=number_pool_paid
NEXT_PUBLIC_CALLRAIL_ORGANIC=number_pool_organic
```

## 📁 Project Structure

```
.
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with analytics
│   ├── page.tsx                 # Homepage
│   ├── contact/page.tsx         # Contact & estimator page
│   ├── commercial-roofing/      # Services hub
│   ├── tpo-roofing/             # TPO services + estimator
│   ├── metal-roofing/           # Metal roofing services
│   ├── roof-inspection/         # Inspection services
│   ├── service-areas/           # Dynamic service area pages
│   ├── about/page.tsx           # About page
│   ├── gallery/page.tsx         # Project gallery
│   ├── blog/                    # Dynamic blog
│   ├── api/                     # API routes
│   │   ├── leads/route.ts       # Lead submission endpoint
│   │   └── sitemap/route.ts     # Dynamic sitemap
│   ├── robots.ts                # robots.txt generator
│   ├── sitemap.ts               # Dynamic sitemap generator
│   └── globals.css              # Global styles
│
├── components/                  # Reusable React components
│   ├── RoofEstimator.tsx       # Multi-step estimator form
│   ├── Navbar.tsx              # Navigation
│   ├── Footer.tsx              # Footer
│   ├── TrustBar.tsx            # Trust/credibility section
│   ├── FAQAccordion.tsx        # FAQ component
│   ├── TestimonialBlock.tsx    # Testimonial card
│   ├── CTABlock.tsx            # Call-to-action section
│   ├── LeadForm.tsx            # Simple contact form
│   ├── CookieConsent.tsx       # Cookie consent banner
│   └── GalleryGrid.tsx         # Image gallery
│
├── lib/                        # Utilities & libraries
│   ├── analytics.ts            # GA4, FB Pixel, GTM events
│   ├── sanity.ts              # Sanity client & queries
│   ├── projex.ts              # CRM webhook helper
│   └── utm.ts                 # UTM parameter tracking
│
├── sanity/                    # Sanity CMS configuration
│   ├── sanity.config.ts       # Sanity studio config
│   └── schemas/               # Content type definitions
│       ├── blogPost.ts
│       ├── serviceArea.ts
│       ├── galleryProject.ts
│       ├── testimonial.ts
│       └── siteSettings.ts
│
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🎨 Design System

### Brand Colors

- **Primary Yellow:** `#FFD600` (bright, action-oriented)
- **Dark Yellow:** `#E6B800` (hover states)
- **Dark Gray:** `#1A1A1A` (text, dark sections)
- **Light Gray:** `#F5F5F5` (backgrounds)
- **Gray:** `#666666` (secondary text)

### Typography

- **Font:** Inter (from Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800
- **H1:** 2.5rem-3.5rem, bold
- **H2:** 1.875rem-2.25rem, bold
- **H3:** 1.25rem, semibold
- **Body:** 1rem, 400

### Components

All components are in `components/` and are fully reusable:

- **RoofEstimator** - 4-step animated form with validation
- **CTABlock** - Reusable call-to-action section
- **TrustBar** - Trust indicators and badges
- **FAQAccordion** - Expandable FAQ items
- **TestimonialBlock** - Client testimonial cards

## 📊 Analytics Setup

### Google Tag Manager (GTM)

1. Create GTM container at https://tagmanager.google.com
2. Set `NEXT_PUBLIC_GTM_ID` to your container ID
3. Configure GA4 tag within GTM
4. Add Facebook Pixel tag within GTM

### Google Analytics 4 (GA4)

Custom events tracked:
- `page_view` - Auto-tracked
- `cta_click` - On CTA button clicks
- `phone_click` - On phone number clicks
- `form_start` - On form field focus
- `form_submit` - On successful form submission
- `estimator_step_1_complete` through `estimator_step_4_complete`
- `estimator_completed` - Full estimator submission

### Facebook Pixel

Events tracked:
- `PageView` - Every page load
- `Lead` - Form submissions
- `InitiateCheckout` - Estimator step 1 completion
- `ViewContent` - Service page views

### CallRail

- Automatically swaps phone numbers based on traffic source
- Detects `utm_source=google` + `utm_medium=cpc` for paid traffic
- Pools: `NEXT_PUBLIC_CALLRAIL_PAID` and `NEXT_PUBLIC_CALLRAIL_ORGANIC`

## 🗂️ Content Management (Sanity CMS)

### Setup Sanity Studio

1. Create account at https://sanity.io
2. Create new project
3. Install Sanity CLI: `npm install -g sanity`
4. Copy your Project ID and API token to `.env.local`
5. Access studio at: `https://manage.sanity.io` or `/admin` locally

### Available Schemas

**Blog Posts:**
- Title, slug, publication date, excerpt, body (rich text), featured image, SEO fields, tags

**Service Areas:**
- City, state, county, slug, hero headline, body content, featured image, SEO fields

**Gallery Projects:**
- Title, project type, location, before/after images, description, completion date

**Testimonials:**
- Author name, company, location, quote, rating (1-5), project type

**Site Settings:**
- Phone, email, address, license number, review link, social links

## 📤 Deployment

### Deploy to Vercel (Recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# Visit https://vercel.com/new
# Select repository
# Add environment variables from .env.local
# Deploy

# 3. Set up domain
# Configure DNS at your registrar
# Add to Vercel project settings
```

### Environment Variables on Vercel

1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Ensure `NEXT_PUBLIC_*` variables are available to client
4. Redeploy after adding variables

### Domain Setup

1. Point domain DNS to Vercel
2. Add domain in Vercel project settings
3. Wait for SSL certificate (usually ~5 minutes)
4. Update `NEXT_PUBLIC_SITE_URL` to match

## 🔐 Security Checklist

- [ ] All API keys in environment variables (never in code)
- [ ] CallRail script token protected
- [ ] Sanity API token is read-only in production
- [ ] Database/CRM credentials not exposed
- [ ] CORS properly configured for Sanity
- [ ] reCAPTCHA added to forms (optional but recommended)
- [ ] Content Security Policy headers set
- [ ] HTTPS enforced
- [ ] Rate limiting on API routes

## 🚦 SEO Features

- **Metadata:** Unique `generateMetadata()` on every page
- **Schema Markup:** LocalBusiness, RoofingContractor, BreadcrumbList, FAQPage, BlogPosting
- **Sitemap:** Auto-generated at `/sitemap.xml`
- **Robots.txt:** Generated at `/robots.txt`
- **Open Graph:** Social sharing metadata
- **Canonical URLs:** Proper rel=canonical tags
- **Mobile:** Responsive design, mobile-first

## 📈 Performance Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **FID (First Input Delay):** < 100ms
- **Core Web Vitals:** All green

### Optimizations Implemented

- ✅ Next.js Image optimization
- ✅ Font loading via `next/font`
- ✅ CSS purged with Tailwind
- ✅ Code splitting (automatic)
- ✅ ISR for CMS-driven pages (revalidate: 3600)
- ✅ Static generation where possible

## 🐛 Common Issues & Solutions

### Estimator not submitting

**Issue:** Form submits but lead not received
**Solution:** Check `NEXT_PUBLIC_PROJEX_WEBHOOK_URL` is correct and webhook endpoint is active

### Analytics not tracking

**Issue:** GA4/Facebook events not firing
**Solution:** 
1. Check `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GA4_ID` are set
2. Verify GTM container is published
3. Check browser console for errors

### Blog posts not showing

**Issue:** Blog pages return 404
**Solution:**
1. Verify Sanity is connected and `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
2. Publish blog posts in Sanity studio
3. Check published dataset matches `NEXT_PUBLIC_SANITY_DATASET`

### Phone tracking not working

**Issue:** Numbers not swapping based on traffic source
**Solution:**
1. Verify CallRail account ID and number pools are correct
2. Ensure UTM parameters are in URL
3. Check CallRail script is loading (network tab)

## 📞 Support & Contact

**51st State Roofing:**
- Phone: (954) 247-8528
- Email: info@51stateroofing.com
- Service Areas: Miami-Dade, Broward, Palm Beach counties, Florida

## 📄 License

This project is proprietary to 51st State Roofing. Unauthorized use is prohibited.

## 🎓 Documentation References

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Google Analytics](https://support.google.com/analytics)
- [Vercel Deployment](https://vercel.com/docs)

---

**Last Updated:** May 2024  
**Next.js Version:** 14  
**Node Version:** 18+

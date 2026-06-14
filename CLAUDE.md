# 51st State Construction — Project Notes for Claude Code

Lead-generation marketing site for 51st State Construction, a commercial
roofing / general contracting company operating in two markets:

- **Florida** (South Florida — Miami-Dade, Broward, Palm Beach), license CGC1527726
- **North Carolina** (Charlotte, Triangle, Sandhills, Piedmont Triad), license #106057

## Stack

- Next.js 14 (App Router) + TypeScript, Tailwind CSS, lucide-react icons
- Sanity CMS (Studio mounted at `/studio`) for site settings, gallery, FAQs, service areas
- No test suite. Verify changes with `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## Key directories

- `app/` — route segments. Most service pages (`commercial-roofing`,
  `tpo-roofing`, `metal-roofing`, `roof-inspection`, `concrete-restoration`,
  `general-contracting`) are server components with a client sub-component
  for interactive sections.
- `app/florida`, `app/south-florida`, `app/north-carolina` — market location
  pages (ServiceAreaMap + Estimator + InspectionScheduler + LocalBusiness JSON-LD)
- `app/lp/[slug]` — paid-campaign landing pages (noindex), data in
  `app/lp/[slug]/page.tsx`, UTM capture in `LandingPageClient.tsx`
- `app/api/leads` — fan-out endpoint: sends every lead to Projex CRM, Google
  Sheets (via Apps Script web app), and UCM in parallel (`Promise.allSettled`)
- `app/api/callrail-webhook` — receives CallRail call events, verifies
  `?secret=` against `CALLRAIL_WEBHOOK_SECRET`, forwards to Google Sheets
- `components/` — shared UI. Notable: `Estimator.tsx` (4-step pricing wizard),
  `QuickForm.tsx` (lead capture, used on ~9 pages), `InspectionScheduler.tsx`
  (booking widget), `CallRailScript.tsx` (per-market DNI swap script),
  `ServiceAreaMap.tsx` (Google Maps embed with city-grid fallback)
- `lib/estimatorData.ts` — all Estimator pricing data (`estimatorCategories`,
  `calculateEstimate()`). Adding a category here automatically adds a card to
  the Estimator's step-1 grid via `Object.keys(estimatorCategories)` —
  update `categoryIcons` in `components/Estimator.tsx` too.
- `lib/projex.ts` — `LeadData`/`CallData` types + `sendLeadTo*()` /
  `sendCallToGoogleSheets()` dispatch functions
- `lib/gtag.ts` — the active analytics helper (GA4/Ads/conversion tracking),
  used by `StickyCallBar`. (`lib/analytics.ts` was an unused duplicate and
  has been removed.)
- `sanity/schemas/` — `siteSettings`, `galleryProject`, `serviceArea`, `faq`
- `scripts/google-apps-script.js` — source of truth for the Google Sheets
  backend (Apps Script). Paste into the Apps Script editor when it changes.

## Conventions / gotchas

- Service categories are unions shared across `lib/estimatorData.ts`
  (`EstimatorCategory`), `lib/projex.ts` (`LeadData.serviceType` /
  `inspectorType`), `components/InspectionScheduler.tsx` (`InspectorType`),
  and the `/lp/[slug]` campaign data — keep these in sync when adding/removing
  a service line.
- "Millwork & Interiors" / "Interior & Exterior Finishes" were removed as a
  service line/category across the whole site (nav, footer, Sanity schemas,
  estimator, scheduler, landing pages). Don't reintroduce references to it.
- `QuickForm.tsx` service chips must use a unique `label` per chip — chips
  with a shared `value` previously caused multiple chips to highlight at once.
- `CallRailScript.tsx` picks the FL vs NC swap-script pool based on
  `usePathname()` (NC pages use `NEXT_PUBLIC_CALLRAIL_POOL_NC`, everything
  else uses `_FL`), falling back to a shared default if pools aren't configured.
- `.env.local` is gitignored. `.env.local.example` documents every required
  var — check it before assuming an integration is unconfigured.
- The phone number `(954) 247-8528` is currently used site-wide as a
  test/placeholder number — see `CHANGELOG.txt` N10 before launch.

## Where to look for outstanding work

`CHANGELOG.txt` tracks completed work by phase and has a "NEXT TASKS" (N1-N10)
and "MANUAL SETUP STEPS" section at the end covering CallRail, Google Apps
Script, admin mailboxes, env var fixes, and pricing review — check there
before starting new work.

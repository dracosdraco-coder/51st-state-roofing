# Dual Market Strategy - South Florida & North Carolina

## Overview

51st State Roofing is expanding to serve both **South Florida** and **North Carolina** markets. This document outlines the SEO, content, and Google Ads strategy to maximize ROI in both regions while maintaining brand consistency.

---

## Geographic Market Structure

### South Florida Market
**States:** Florida  
**Counties:** Miami-Dade, Broward, Palm Beach  
**Cities:** Miami, Fort Lauderdale, West Palm Beach, Aventura, Boca Raton, Deerfield Beach  
**URL Structure:** `/service-areas/[florida-city-slug]`

### North Carolina Market
**States:** North Carolina  
**Key Cities:** Charlotte, Raleigh, Chapel Hill, Durham, Greensboro, Winston-Salem, Asheville  
**URL Structure:** `/service-areas/[north-carolina-city-slug]`

---

## URL Strategy for Maximum Ad Efficiency

### Homepage
- **URL:** `/` (Geo-targeting via ads manager)
- **Content:** Serves both markets with geo-specific messaging
- **Google Ads:** Separate campaigns per region targeting this page

### Regional Landing Pages (For Google Ads)

#### South Florida
```
/south-florida/  → Main entry for FL ads
/south-florida/tpo-roofing/
/south-florida/metal-roofing/
/south-florida/roof-inspection/
```

#### North Carolina
```
/north-carolina/  → Main entry for NC ads
/north-carolina/tpo-roofing/
/north-carolina/metal-roofing/
/north-carolina/roof-inspection/
```

#### City-Specific (High Intent)
```
/service-areas/miami/
/service-areas/charlotte/
/service-areas/raleigh/
/service-areas/fort-lauderdale/
```

### Service Pages

**Core Service Pages (Shared):**
```
/commercial-roofing/
/tpo-roofing/
/metal-roofing/
/roof-inspection/
```

**Region-Specific Variants:**
```
/south-florida/commercial-roofing/
/north-carolina/commercial-roofing/
```

---

## Google Ads Campaign Structure

### Campaign Organization

```
ACCOUNT: 51st State Roofing
├── CAMPAIGN: South Florida - Brand
│   └── Keyword: "51st state roofing" + location modifiers
│
├── CAMPAIGN: South Florida - Commercial Roofing
│   └── Keywords: "commercial roofing miami" "flat roof broward" etc.
│
├── CAMPAIGN: South Florida - Geo-Targeted
│   └── Location: Miami-Dade, Broward, Palm Beach counties
│   └── Landing Page: /south-florida/
│
├── CAMPAIGN: North Carolina - Brand
│   └── Keyword: "51st state roofing charlotte"
│
├── CAMPAIGN: North Carolina - Commercial Roofing
│   └── Keywords: "commercial roofing charlotte" "metal roof raleigh" etc.
│
└── CAMPAIGN: North Carolina - Geo-Targeted
    └── Location: Charlotte, Raleigh, Durham, Greensboro metro
    └── Landing Page: /north-carolina/
```

### Keyword Strategy by Market

#### South Florida Keywords (High Volume)
- Commercial roofing Miami
- TPO roofing Miami-Dade
- Metal roofing Broward
- Flat roof repair West Palm Beach
- Roof inspection Miami
- Commercial roofer Fort Lauderdale
- Roof replacement Coral Gables
- Emergency roof repair Miami

#### North Carolina Keywords (Growing)
- Commercial roofing Charlotte
- TPO roofing Raleigh
- Metal roofing Charlotte NC
- Commercial roof repair Durham
- Roof inspection Greensboro
- Flat roof contractor Asheville
- Commercial roofer Winston Salem
- Roof replacement Chapel Hill

### Bid Strategy by Market

**South Florida (Established):**
- CPC: $3.50-$6.50 (premium market)
- Monthly Budget: $4,000-$6,000
- Expected Leads: 25-35/month
- Target CPA: $120-$150

**North Carolina (Growth):**
- CPC: $2.00-$4.00 (lower competition)
- Monthly Budget: $2,000-$3,000
- Expected Leads: 20-25/month
- Target CPA: $100-$125

---

## Content Strategy by Region

### North Carolina Content Additions

Create **NC-specific content** to build authority:

**Blog Posts:**
- "Winter Roof Preparation for NC Winters"
- "How to Winterize Commercial Roofs in Charlotte"
- "Metal Roofing vs TPO in North Carolina Climate"
- "Hail Damage Roof Repair in NC"
- "Commercial Roofing Contractors in Raleigh: A Complete Guide"

**Service Area Pages:**
```
/service-areas/charlotte/
/service-areas/raleigh/
/service-areas/durham/
/service-areas/greensboro/
/service-areas/asheville/
/service-areas/winston-salem/
```

### Regional Landing Pages

#### /south-florida/ (Main Entry Page)

```
- Headline: "Commercial Roofing Solutions for South Florida Businesses"
- Hero: Showcase Miami skyline / South Florida imagery
- Services: TPO, Metal, Inspection (with FL-specific features)
- Trust Bar: Years in FL, number of FL projects
- Service Area Map: Miami-Dade, Broward, Palm Beach
- CTA: "Get Your Free South Florida Roof Inspection"
```

#### /north-carolina/ (Main Entry Page)

```
- Headline: "Premium Commercial Roofing Across North Carolina"
- Hero: Charlotte skyline / NC landscape
- Services: TPO, Metal, Inspection (NC weather-specific)
- Trust Bar: NC licensing, experience with NC weather
- Service Area Map: Charlotte, Raleigh, Greensboro, etc.
- Trust: Winter performance, snow load capability
- CTA: "Schedule Your NC Roof Assessment Today"
```

---

## Landing Page Optimization for Ad ROI

### High-Performing Elements

**1. Headline Specificity**
```
❌ "Commercial Roofing Services" (Generic)
✅ "Commercial Roofing Contractors in Charlotte, NC" (Specific)
```

**2. Location Signals**
- City/county name in first 100 words
- Service area maps visible above fold
- Local phone number (optional: CallRail number swap by market)
- Local address or local language

**3. Match Intent**
- Ad copy: "Metal roofing Charlotte"
- Landing page: /north-carolina/metal-roofing/ (specific)
- Page content: Discusses NC-specific benefits

**4. Climate-Specific Copy**
```
South Florida:
- Heat reflection & energy savings
- Hurricane/wind resistance
- UV protection
- Salt air durability

North Carolina:
- Winter performance
- Snow/ice load capacity
- Spring/fall storm durability
- Extreme temperature tolerance
```

### Estimated Landing Page Performance

| Region | Traffic | CTR | Conv. Rate | Cost/Lead |
|--------|---------|-----|-----------|-----------|
| South Florida | 1,200/mo | 8% | 2.5% | $140 |
| North Carolina | 600/mo | 10% | 3.2% | $110 |

---

## Structural Changes to Site

### New Routes to Add

```
app/
├── south-florida/
│   ├── page.tsx                    [Main landing page]
│   ├── tpo-roofing/page.tsx        [FL-specific service]
│   ├── metal-roofing/page.tsx
│   └── roof-inspection/page.tsx
│
├── north-carolina/
│   ├── page.tsx                    [Main landing page]
│   ├── tpo-roofing/page.tsx        [NC-specific service]
│   ├── metal-roofing/page.tsx
│   └── roof-inspection/page.tsx
│
└── service-areas/
    ├── [slug]/page.tsx             [City pages]
    └── Includes:
        ├── charlotte/
        ├── raleigh/
        ├── durham/
        ├── miami/
        ├── fort-lauderdale/
        └── etc.
```

### New Sanity Collections

Add to Sanity CMS:

**Region Schema**
```
- name: region
- fields:
  - title (South Florida, North Carolina)
  - slug
  - description
  - climate_info
  - hero_image
  - featured_cities[]
```

**City-Specific Service Pages**
```
- name: cityService
- fields:
  - city (slug)
  - region
  - service_type (TPO, Metal, etc.)
  - climate_specific_content
  - local_projects[]
  - local_testimonials[]
```

---

## Geo-Targeting in Google Ads

### Location Targeting Settings

**Campaign: South Florida - Geo-Targeted**
- Locations:
  - Miami-Dade County, FL
  - Broward County, FL
  - Palm Beach County, FL
- Targeting Option: "People in or regularly in these locations"
- Negative Keywords: "north carolina", "nc", "raleigh", etc.

**Campaign: North Carolina - Geo-Targeted**
- Locations:
  - Charlotte, NC metro
  - Raleigh, NC metro
  - Durham, NC metro
  - Greensboro, NC metro
  - Asheville, NC metro
- Targeting Option: "People in or regularly in these locations"
- Negative Keywords: "florida", "miami", "south florida", etc.

---

## Smart Bidding by Region

### Google Ads Automation

**South Florida Campaign:**
```
Bid Strategy: Target CPA
Target CPA: $150
Bid Adjustments:
  - Mobile: +10% (higher intent)
  - Time: -15% (after hours slower)
  - Location: +5% (Miami metro premium)
```

**North Carolina Campaign:**
```
Bid Strategy: Target CPA
Target CPA: $120
Bid Adjustments:
  - Mobile: +15% (strong mobile market)
  - Time: Same
  - Location: By city (Charlotte +10%, Asheville -5%)
```

---

## Analytics Setup for Region Tracking

### GA4 Segments

**Create Custom Segments:**
```
- "South Florida Traffic" (location = FL)
- "North Carolina Traffic" (location = NC)
- "SF - Organic" (source/medium = organic search, FL)
- "NC - Paid" (source/medium = cpc, NC)
```

**Custom Events to Track:**
```
- region_estimator_completed (value: sf_tpo, nc_metal, etc.)
- region_form_submitted (parameter: region)
- region_phone_click (parameter: region)
```

### Reporting Dashboard

Create GA4 dashboard with:
- Leads by region
- Cost per lead by region
- Conversion rate by region
- Top cities by traffic

---

## Testing & Optimization Plan

### A/B Testing Schedule

**Month 1-2: Baseline**
- Run campaigns in both regions
- Collect 100+ conversions per region
- Establish baseline CPA

**Month 3: Testing Phase**
- Test different headlines per region
- Test different CTAs
- Test different landing pages

**Month 4+: Optimization**
- Double down on winners
- Cut underperforming keywords
- Increase budget to profitable regions

---

## Projected ROI Analysis

### Year 1 Conservative Projections

**South Florida (Established Market)**
- Monthly Ad Spend: $5,000
- Annual Ad Spend: $60,000
- Expected Leads: 25-30/month = 300-360/year
- Cost Per Lead: $130-150
- Conversion to Project: 20% = 60-72 projects
- Avg Project Value: $8,000
- Annual Revenue: $480,000-$576,000
- ROI: 8:1 to 9.6:1

**North Carolina (Growth Market)**
- Monthly Ad Spend: $2,500
- Annual Ad Spend: $30,000
- Expected Leads: 15-20/month = 180-240/year
- Cost Per Lead: $110-125
- Conversion to Project: 25% (higher intent) = 45-60 projects
- Avg Project Value: $7,500 (slightly lower market)
- Annual Revenue: $337,500-$450,000
- ROI: 11.2:1 to 15:1

**Combined**
- Total Annual Ad Spend: $90,000
- Total Projected Revenue: $817,500-$1,026,000
- Combined ROI: 9:1 to 11.4:1

---

## Competitive Analysis by Region

### South Florida Market
- High competition (large regional/national companies)
- High CPC ($4-7)
- Saturated with budget spending
- **Our Advantage:** Premium positioning, local service quality

### North Carolina Market
- Moderate competition (smaller local competitors)
- Lower CPC ($2-4)
- Growing demand with less competition
- **Our Advantage:** Early mover, establish market leadership

---

## Launch Timeline

### Phase 1: Foundation (Week 1-2)
- [ ] Create /south-florida/ and /north-carolina/ landing pages
- [ ] Update Sanity with region schemas
- [ ] Create city-specific service pages (3-4 top cities per region)
- [ ] Update analytics to track by region

### Phase 2: Content (Week 3-4)
- [ ] Write NC-specific blog posts (5 articles)
- [ ] Create regional trust content
- [ ] Add local testimonials to region pages
- [ ] Build climate-specific comparisons

### Phase 3: Ads (Week 5-6)
- [ ] Setup Google Ads campaigns (region-specific)
- [ ] Create ad groups by service type
- [ ] Configure location targeting
- [ ] Set up conversion tracking per region

### Phase 4: Optimization (Week 7+)
- [ ] Monitor performance daily
- [ ] A/B test landing pages
- [ ] Optimize bids by performance
- [ ] Scale winning campaigns

---

## KPIs to Track

### Primary Metrics
- Cost Per Lead (by region)
- Lead Quality Score (project conversion rate)
- Cost Per Acquisition (by region)
- Revenue Per Lead (by region)

### Secondary Metrics
- Click-Through Rate (by campaign)
- Landing Page Conversion Rate
- Form Completion Rate
- Phone Call Volume (by region)

### Business Metrics
- Project Value (by region)
- Project Profitability
- Customer Lifetime Value
- Repeat Customer Rate

---

## Budget Allocation Recommendation

**Year 1 Suggested Allocation:**

| Region | % of Budget | Monthly | Rationale |
|--------|------------|---------|-----------|
| South Florida | 65% | $5,200 | Established market, proven ROI |
| North Carolina | 35% | $2,800 | Growth market, expansion phase |

**Total: $96,000/year for significant market coverage**

Adjust quarterly based on performance data and market conditions.

---

This dual-market strategy positions 51st State Roofing for growth while maintaining profitability through targeted, efficient ad spend in both regions.

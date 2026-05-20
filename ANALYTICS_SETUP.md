# Analytics Setup Guide - 51st State Roofing

Complete guide to setting up all analytics, tracking, and conversion monitoring for lead generation.

## Overview

This site uses a multi-layered analytics approach:

1. **Google Tag Manager (GTM)** - Central hub for all tags
2. **Google Analytics 4 (GA4)** - Primary analytics
3. **Facebook Pixel** - Conversion tracking for Facebook ads
4. **CallRail** - Phone call tracking & number swapping
5. **UTM Parameters** - Campaign tracking
6. **Projex CRM** - Lead capture

## Google Tag Manager Setup

### Step 1: Create GTM Container

1. Go to https://tagmanager.google.com
2. Click "Create Account"
3. **Account Name:** `51st State Roofing`
4. **Container Name:** `51st State Roofing - Website`
5. **Target Platform:** Web
6. Accept terms and create

### Step 2: Get Container ID

1. After creation, copy the **Container ID** (format: GTM-XXXXXXX)
2. Set `NEXT_PUBLIC_GTM_ID` in `.env.local`

### Step 3: Implement GTM Code

The site already has GTM installed in `app/layout.tsx`:

```tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
/>
```

This loads the script automatically.

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to https://analytics.google.com
2. Click "Create Property"
3. **Property Name:** `51st State Roofing`
4. **Business Objective:** Lead generation
5. **Industry Category:** Home Improvement/Construction
6. **Business Size:** Small (5-50 employees)

### Step 2: Get Measurement ID

1. In GA4 property, go to Admin → Data Streams
2. Select your web stream
3. Copy **Measurement ID** (format: G-XXXXXXXXXX)
4. Set `NEXT_PUBLIC_GA4_ID` in `.env.local`

### Step 3: Link to GTM

In Google Tag Manager:

1. Create New Tag
2. **Tag Type:** Google Analytics 4 Configuration
3. **Measurement ID:** G-XXXXXXXXXX
4. **Trigger:** All Pages
5. **Tag Name:** `GA4 - Configuration`
6. Save and Publish

### Step 4: Create Custom Events

In GA4, create these custom events:

#### CTA Click Event

```
Event Name: cta_click
Parameters:
- button_label (string)
- page_name (string)
```

#### Phone Click Event

```
Event Name: phone_click
Parameters:
- page_source (string)
```

#### Form Start Event

```
Event Name: form_start
Parameters:
- form_name (string)
```

#### Form Submit Event

```
Event Name: form_submit
Parameters:
- lead_source (string)
- roof_type (string)
```

#### Estimator Events

```
Event Name: estimator_step_1_complete
Event Name: estimator_step_2_complete
Event Name: estimator_step_3_complete
Event Name: estimator_step_4_complete
Parameters:
- step_number (integer)

Event Name: estimator_completed
Parameters:
- roof_type (string)
- roof_size (string)
```

## Facebook Pixel Setup

### Step 1: Create Pixel

1. Go to https://facebook.com/ads/manager/pixels
2. Click "Create a Pixel"
3. **Pixel Name:** `51st State Roofing`
4. Copy **Pixel ID**
5. Set `NEXT_PUBLIC_FB_PIXEL_ID` in `.env.local`

### Step 2: Verify Installation

The site auto-loads the pixel in `app/layout.tsx`:

```tsx
<script dangerouslySetInnerHTML={{
  __html: `fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');`
}}/>
```

Test with Facebook Pixel Helper Chrome extension.

### Step 3: Configure Conversions

In Facebook Ads Manager:

**Events to track:**
- **PageView** - All pages
- **Lead** - Form/estimator submissions
- **InitiateCheckout** - Estimator step 1 (address entry)
- **ViewContent** - Service page views

### Step 4: Create Conversion API

For server-side tracking (optional but recommended):

1. In Business Settings → Data Sources → Conversions API
2. Create Dataset
3. Generate Access Token
4. Store securely for API calls

## UTM Parameter Tracking

### Setup

UTM parameters are automatically captured on page load:

```
// Automatically captured:
utm_source - Traffic source (google, facebook, email, etc.)
utm_campaign - Campaign name
utm_medium - Medium (cpc, organic, email, etc.)
utm_content - Ad variation
utm_term - Keyword
```

### Usage Examples

**Google Ads:**
```
https://51stateroofing.com/?utm_source=google&utm_medium=cpc&utm_campaign=tpo_roofing
```

**Facebook Ads:**
```
https://51stateroofing.com/?utm_source=facebook&utm_medium=social&utm_campaign=tpo_roofing&utm_content=ad_v1
```

**Email Campaign:**
```
https://51stateroofing.com/?utm_source=email&utm_medium=newsletter&utm_campaign=may_promo
```

### View in GA4

1. GA4 → Acquisition
2. Filter by `utm_source` or `utm_campaign`
3. See performance by traffic source

## CallRail Phone Tracking

### Step 1: Setup CallRail Account

1. Go to https://callrail.com
2. Create account with your company info
3. Add phone number or use CallRail number
4. Get **Account ID** (format: numeric, e.g., 123456)

### Step 2: Create Number Pools

CallRail allows swapping between different phone numbers:

**Pool 1: Paid Traffic**
- Use for Google Ads, Facebook Ads
- Different tracking number
- Set `NEXT_PUBLIC_CALLRAIL_PAID` to pool ID

**Pool 2: Organic Traffic**
- Use for organic search, direct, email
- Default tracking number
- Set `NEXT_PUBLIC_CALLRAIL_ORGANIC` to pool ID

### Step 3: Configuration

```bash
NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID=123456
NEXT_PUBLIC_CALLRAIL_PAID=pool_paid_id
NEXT_PUBLIC_CALLRAIL_ORGANIC=pool_organic_id
```

### Step 4: How It Works

The site automatically detects traffic source:

```javascript
// If utm_source=google AND utm_medium=cpc
→ Show PAID number pool

// Otherwise
→ Show ORGANIC number pool
```

View call analytics in CallRail dashboard.

## Creating Conversions Dashboard

### Google Analytics Dashboard

Create custom dashboard:

1. **Reports** → **Create a Custom Report**

Key metrics:
- **CTA Clicks** - by page and button label
- **Form Submissions** - by source
- **Estimator Completions** - by roof type
- **Phone Clicks** - by page

**Segments to track:**
- Paid traffic (utm_source=google, utm_medium=cpc)
- Organic search
- Direct traffic
- Social referrals
- Email campaigns

### Facebook Ads Manager

1. **Results** → Create column for **Lead** events
2. **Custom Conversions** → Track estimator submission
3. **Lookalike Audiences** → Based on lead events
4. **Attribution** → See which ads drive leads

## Conversion Tracking Checklist

### Pre-Launch Testing

- [ ] GTM firing on all pages
- [ ] GA4 events tracking correctly
- [ ] Facebook Pixel capturing PageView
- [ ] Form submissions create GA4 event
- [ ] Phone clicks tracked
- [ ] CallRail numbers showing correctly
- [ ] UTM parameters preserved
- [ ] Conversion events in GA4 realtime

### Post-Launch Monitoring

- [ ] GA4 receiving data (check Realtime)
- [ ] Facebook Pixel receiving data (Pixel Helper)
- [ ] At least 10 test form submissions
- [ ] CallRail receiving calls
- [ ] Email confirmations sending

### Weekly Reviews

- [ ] GA4 dashboard checking
- [ ] Lead source analysis
- [ ] Conversion rate by page
- [ ] Phone call metrics
- [ ] Form abandonment rate

## Advanced: Custom Audiences

### Create Remarketing Audience

**Google Ads:**
1. GA4 → Audience (create new)
2. Users who started estimator = HIGH INTENT
3. Import to Google Ads for remarketing

**Facebook:**
1. Pixel → Audiences → Custom Audience
2. People who initiated checkout (estimator step 1)
3. Use for retargeting ads

### Lookalike Audiences

1. Create lookalike from "Lead converters"
2. Target 1%-5% match (closest look-alikes)
3. Higher conversion potential

## Reporting & ROI Tracking

### Monthly Reporting

Create custom report:

```
METRICS:
- Total organic sessions
- Total paid sessions
- Estimator completions
- Form submissions
- Phone calls
- Conversion rate by source
- Cost per lead (if spending on ads)

ATTRIBUTION:
- First-click (where visitor came from)
- Last-click (final click before conversion)
- Linear (credit all touchpoints equally)
```

### Calculate Lead Cost

```
Lead Cost = Ad Spend / Leads Generated

Example:
$2,000 Google Ads spend = 25 leads
Lead Cost = $2,000 / 25 = $80 per lead
```

### ROI Calculation

```
ROI = (Revenue - Ad Spend) / Ad Spend × 100

Example:
25 leads × $3,000 average contract value = $75,000
ROI = ($75,000 - $2,000) / $2,000 × 100 = 3,650%
```

## Troubleshooting

### GA4 Not Receiving Data

**Check:**
1. Container ID is correct
2. GTM container is published
3. GA4 tag is in GTM
4. Check browser console for errors

**Solution:**
```bash
# In browser console
console.log(window.gtag);  // Should exist
```

### Facebook Pixel Not Tracking

**Check:**
1. Pixel ID is correct
2. No ad blocker preventing script
3. Test with Pixel Helper extension
4. Check pixel code in layout.tsx

**Solution:**
```bash
# In browser console
console.log(fbq);  // Should exist
fbq('track', 'Lead');  // Manual test
```

### CallRail Numbers Not Swapping

**Check:**
1. Account ID is correct
2. Number pool IDs are correct
3. UTM parameters in URL
4. Check CallRail account settings

### UTM Parameters Lost

**Check:**
1. Links redirect without preserving params
2. Forms don't pass params in hidden fields
3. Check JavaScript redirects

## Additional Resources

- [Google Analytics Help](https://support.google.com/analytics)
- [Google Tag Manager Guide](https://support.google.com/tagmanager)
- [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel/)
- [CallRail Help Center](https://support.callrail.com)

---

**Analytics Status:** ✅ Configured  
**Last Updated:** May 2024  
**Tracks:** Leads, calls, form submissions, traffic sources

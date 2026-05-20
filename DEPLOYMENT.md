# Deployment Guide - 51st State Roofing

Complete step-by-step guide for deploying to production on Vercel.

## Prerequisites

- [ ] GitHub account with repository created
- [ ] Vercel account (free tier works great)
- [ ] Domain name (51stateroofing.com)
- [ ] All environment variables ready
- [ ] Sanity project created and published
- [ ] Google Analytics/GTM container created

## Step 1: Prepare Your Code

### 1.1 Create GitHub Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: 51st State Roofing website"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/51st-state-roofing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 1.2 Verify Build

```bash
npm run build
```

Should complete without errors.

## Step 2: Deploy to Vercel

### 2.1 Connect Repository

1. Go to https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Select the `51st-state-roofing` repository
5. Click "Import"

### 2.2 Configure Project

**Project Name:** `51st-state-roofing`  
**Framework Preset:** Next.js  
**Root Directory:** `./` (leave default)  

**Build Settings:**
- Build Command: `npm run build` ✓
- Output Directory: `.next` ✓
- Install Command: `npm install` ✓

## Step 3: Set Environment Variables

### 3.1 Add to Vercel

In Vercel Project Settings → Environment Variables:

```
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_sanity_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<your_sanity_api_token>

# Google Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX

# Google Places
GOOGLE_PLACES_API_KEY=<your_google_places_api_key>

# Lead Management
NEXT_PUBLIC_PROJEX_WEBHOOK_URL=<your_projex_webhook_url>
RESEND_API_KEY=<your_resend_api_key>

# CallRail
NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID=<account_id>
NEXT_PUBLIC_CALLRAIL_PAID=<paid_number_pool>
NEXT_PUBLIC_CALLRAIL_ORGANIC=<organic_number_pool>

# Site
NEXT_PUBLIC_SITE_URL=https://51stateroofing.com
```

### 3.2 Deploy with Variables

Click "Deploy" - Vercel will build and deploy with your variables.

## Step 4: Domain Setup

### 4.1 Add Domain in Vercel

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter: `51stateroofing.com`
4. Select "Use Nameservers" or "CNAME" (depending on registrar)

### 4.2 Configure DNS at Registrar

**If using Vercel Nameservers:**

Update your domain registrar to use Vercel's nameservers:
- `ns1.vercel.com`
- `ns2.vercel.com`
- `ns3.vercel.com`
- `ns4.vercel.com`

Wait for DNS propagation (5-48 hours).

**If using CNAME:**

Create CNAME record:
```
Host: www
Value: cname.vercel.sh
```

Or point root domain:
```
Host: @
Type: A
Value: 76.76.19.86  (or current Vercel IP)
```

### 4.3 SSL Certificate

Vercel automatically provisions SSL certificates. Once domain is active, you'll get:
- ✅ SSL certificate (auto-renewed)
- ✅ HTTPS forced
- ✅ 301 redirects from HTTP to HTTPS

## Step 5: Verify Everything

### 5.1 Test Site

Visit: https://51stateroofing.com

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Forms are functional
- [ ] Images load properly
- [ ] Mobile responsive

### 5.2 Test Analytics

1. Open DevTools (F12)
2. Go to Console
3. Fill out estimator form
4. Verify no JavaScript errors
5. Check Google Analytics for events

### 5.3 Test Lead Submission

1. Fill out contact form
2. Submit
3. Verify success message
4. Check Projex CRM for incoming lead

## Step 6: Monitoring & Maintenance

### 6.1 Set Up Monitoring

**Vercel Analytics:**
- Go to Analytics tab
- Enable Real Experience Monitoring
- Monitor Core Web Vitals

**Google Analytics:**
- Create dashboard with key metrics
- Set up alerts for anomalies

**Sentry (Optional):**
- Create project at https://sentry.io
- Install Sentry SDK
- Monitor production errors

### 6.2 Regular Checks

**Weekly:**
- [ ] Check analytics dashboard
- [ ] Verify forms are capturing leads
- [ ] Monitor error logs
- [ ] Check mobile performance

**Monthly:**
- [ ] Review lead sources
- [ ] Check conversion rates
- [ ] Update blog content
- [ ] Review SEO rankings

**Quarterly:**
- [ ] Audit all pages
- [ ] Update service content
- [ ] Review and optimize CTAs
- [ ] Check competitor changes

## Step 7: Performance Optimization

### 7.1 Enable Vercel Analytics

```json
// vercel.json
{
  "analytics": true,
  "buildCommand": "npm run build",
  "env": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "@NEXT_PUBLIC_SANITY_PROJECT_ID"
  }
}
```

### 7.2 Image Optimization

All images use Next.js `Image` component with:
- Automatic WebP conversion
- Responsive sizes
- Lazy loading
- AVIF format support

### 7.3 Caching Strategy

```
Static Pages (600 seconds):
- /
- /about
- /gallery

CMS Pages (3600 seconds):
- /blog/*
- /service-areas/*

Dynamic (no cache):
- /api/*
- /contact (form page itself)
```

## Step 8: Post-Launch Checklist

### SEO & Search

- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create Google Business Profile
- [ ] Verify local business schema

### Social Media

- [ ] Open Graph images optimized
- [ ] Twitter card configured
- [ ] Share on LinkedIn, Facebook
- [ ] Setup social tracking in UTMs

### Email & Communications

- [ ] Setup Resend for transactional emails
- [ ] Create email template for confirmations
- [ ] Test lead notification emails
- [ ] Setup customer support responses

### Lead Tracking

- [ ] Verify Projex CRM integration
- [ ] Test lead routing
- [ ] Setup CRM notifications
- [ ] Train team on lead handling

## Troubleshooting

### 502/503 Errors

**Solution:**
```bash
# Redeploy
vercel --prod

# Or in Vercel dashboard: Redeploy button
```

### Domain not resolving

**Solution:**
- Wait for DNS propagation (can take 48 hours)
- Clear browser cache
- Verify DNS records in registrar
- Contact registrar support if issues persist

### Environment variables not working

**Solution:**
1. Go to Vercel project settings
2. Verify all variables are set
3. Redeploy after changing variables
4. Check function logs for errors

### Analytics not tracking

**Solution:**
1. Verify GTM/GA4 IDs are correct
2. Check browser console for gtag errors
3. Verify consent cookie is set
4. Test with incognito window

## Rollback Plan

If something breaks in production:

### Quick Rollback

1. Go to Vercel Deployments tab
2. Find previous working deployment
3. Click three dots → "Promote to Production"
4. Site reverts to previous version

### Full Rollback

```bash
# Revert git commit
git revert HEAD
git push origin main

# Vercel auto-deploys from main branch
```

## Monitoring Tools

Recommended free/cheap tools:

**Analytics:**
- Google Analytics (free)
- Vercel Analytics (free tier)
- Hotjar (free session recordings)

**Error Tracking:**
- Vercel built-in logs (free)
- Sentry (free tier for hobby projects)

**Performance:**
- Lighthouse CI (free)
- WebPageTest (free)
- GTmetrix (free tier)

**SEO:**
- Google Search Console (free)
- Bing Webmaster Tools (free)
- Screaming Frog (free limited)

## Getting Help

**Vercel Support:**
- https://vercel.com/support
- Email: support@vercel.com

**Next.js Docs:**
- https://nextjs.org/docs/deployment

**Community:**
- Next.js Discord
- Vercel Community Forums
- Stack Overflow (tag: next.js)

---

**Deployment Status:** ✅ Ready  
**Last Updated:** May 2024  
**Environment:** Production

'use client';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/** Push an event to GTM's dataLayer */
export function pushEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

/** Fire a Google Ads conversion */
export function fireConversion(conversionLabel: string, value?: number) {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') return;
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!conversionId) return;
  window.gtag('event', 'conversion', {
    send_to: `${conversionId}/${conversionLabel}`,
    value: value ?? 1.0,
    currency: 'USD',
  });
}

/** Track a form submission — fires both dataLayer push and Ads conversion */
export function trackLeadSubmit(params: {
  inspectorType?: string;
  locationMarket?: string;
  pageSource?: string;
  conversionLabel?: string;
}) {
  pushEvent('lead_form_submit', {
    inspector_type: params.inspectorType,
    location_market: params.locationMarket,
    page_source: params.pageSource,
  });

  if (params.conversionLabel) {
    fireConversion(params.conversionLabel);
  }
}

/** Track an estimate request */
export function trackEstimateRequest(params: {
  category?: string;
  market?: string;
  estimateRange?: string;
}) {
  pushEvent('estimate_request', {
    estimate_category: params.category,
    location_market: params.market,
    estimate_range: params.estimateRange,
  });
}

/** Track a phone click */
export function trackPhoneClick(market?: string) {
  pushEvent('phone_click', { location_market: market });
}

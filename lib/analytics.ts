// Google Analytics 4 and Facebook Pixel event tracking
// All events are fired via GTM when available, or directly to GA4/FB Pixel

interface EventData {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Fire GA4 event via window.gtag or GTM
 */
export function trackGA4Event(
  eventName: string,
  eventData?: EventData
) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, eventData || {});
  }
}

/**
 * Track Facebook Pixel event
 */
export function trackFBPixel(
  eventName: string,
  eventData?: EventData
) {
  if (typeof window !== 'undefined' && 'fbq' in window) {
    (window as any).fbq('track', eventName, eventData || {});
  }
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(buttonLabel: string, page: string) {
  trackGA4Event('cta_click', {
    button_label: buttonLabel,
    page_name: page,
  });
  trackFBPixel('ViewContent', {
    content_name: `CTA: ${buttonLabel}`,
  });
}

/**
 * Track phone number clicks
 */
export function trackPhoneClick(pageSource: string) {
  trackGA4Event('phone_click', {
    page_source: pageSource,
  });
  trackFBPixel('Contact', {
    content_name: 'Phone Call',
  });
}

/**
 * Track form start (first field focus)
 */
export function trackFormStart(formName: string) {
  trackGA4Event('form_start', {
    form_name: formName,
  });
  trackFBPixel('InitiateCheckout', {
    content_name: formName,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(leadSource: string, roofType?: string) {
  trackGA4Event('form_submit', {
    lead_source: leadSource,
    roof_type: roofType || 'unknown',
  });
  trackFBPixel('Lead', {
    content_name: leadSource,
    value: 1,
    currency: 'USD',
  });
}

/**
 * Track estimator step completion
 */
export function trackEstimatorStep(step: number) {
  trackGA4Event(`estimator_step_${step}_complete`, {
    step_number: step,
  });
}

/**
 * Track estimator completion with all data
 */
export function trackEstimatorCompleted(data: {
  roof_type?: string;
  roof_size?: string;
  property_address?: string;
  page_source?: string;
}) {
  trackGA4Event('estimator_completed', {
    roof_type: data.roof_type || 'unknown',
    roof_size: data.roof_size || 'unknown',
    page_source: data.page_source || 'unknown',
  });
  trackFBPixel('Purchase', {
    value: 1,
    currency: 'USD',
  });
}

/**
 * Track page view (usually automatic via GTM)
 */
export function trackPageView(pageName: string) {
  trackGA4Event('page_view', {
    page_title: pageName,
  });
  trackFBPixel('PageView');
}

/**
 * Get UTM parameters from URL and store in sessionStorage
 */
export function captureAndStoreUTM() {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get('utm_source') || '',
    campaign: params.get('utm_campaign') || '',
    medium: params.get('utm_medium') || '',
    content: params.get('utm_content') || '',
    term: params.get('utm_term') || '',
  };

  // Store in sessionStorage for persistence across page navigation
  sessionStorage.setItem('utm_params', JSON.stringify(utm));

  return utm;
}

/**
 * Get stored UTM parameters from sessionStorage
 */
export function getStoredUTM() {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem('utm_params');
  return stored ? JSON.parse(stored) : null;
}

/**
 * Setup CallRail number swapping for paid vs organic traffic
 */
export function setupCallRail() {
  if (typeof window === 'undefined') return;

  const utm = getStoredUTM();
  const isPaidTraffic = utm?.source === 'google' && utm?.medium === 'cpc';

  // CallRail swap script configuration
  const callRailScript = {
    'data-account-id': process.env.NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID,
    'data-number-pool-id': isPaidTraffic
      ? process.env.NEXT_PUBLIC_CALLRAIL_PAID
      : process.env.NEXT_PUBLIC_CALLRAIL_ORGANIC,
  };

  // Number swapping happens via CallRail's tracking script in layout
  return callRailScript;
}

/**
 * Queue event for later tracking (useful for before analytics loads)
 */
let eventQueue: Array<{ event: string; data?: EventData }> = [];

export function queueEvent(event: string, data?: EventData) {
  eventQueue.push({ event, data });
}

/**
 * Flush queued events when analytics is ready
 */
export function flushEventQueue() {
  eventQueue.forEach(({ event, data }) => {
    trackGA4Event(event, data);
  });
  eventQueue = [];
}

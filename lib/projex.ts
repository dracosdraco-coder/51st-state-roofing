/**
 * Projex CRM webhook integration
 * POSTs lead data to the configured Projex webhook URL
 */

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  propertyAddress?: string;
  additionalNotes?: string;
  pageSource?: string;
  // Service & scheduling
  serviceType?: 'roofing' | 'siding' | 'interior' | 'commercial' | 'general' | 'concrete' | 'millwork';
  inspectorType?: 'roofing' | 'siding' | 'interior' | 'commercial';
  preferredWindow?: '24hr' | '48hr' | '72hr';
  // Location
  locationMarket?: 'NC' | 'FL' | 'NATIONAL';
  googleBusinessLocationId?: string;
  // Estimator
  estimateCategory?: string;
  estimateResult?: string;
  // Legacy roofing fields
  roofType?: string;
  roofSize?: string;
  // UTM tracking
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
}

/**
 * Send lead to Projex CRM via webhook
 */
export async function sendLeadToProjectex(leadData: LeadData): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_PROJEX_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('NEXT_PUBLIC_PROJEX_WEBHOOK_URL not configured');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadData, submittedAt: new Date().toISOString(), source: 'website' }),
    });

    if (!response.ok) {
      console.error(`Projex webhook failed with status ${response.status}:`, await response.text());
      return false;
    }

    console.log('Lead successfully sent to Projex');
    return true;
  } catch (error) {
    console.error('Error sending lead to Projex:', error);
    return false;
  }
}

/**
 * Send lead to Google Sheets via Apps Script web app
 */
export async function sendLeadToGoogleSheets(leadData: LeadData): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('GOOGLE_SHEETS_WEBHOOK_URL not configured');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadData, submittedAt: new Date().toISOString(), source: 'website' }),
    });

    if (!response.ok) {
      console.error(`Google Sheets webhook failed with status ${response.status}:`, await response.text());
      return false;
    }

    console.log('Lead successfully sent to Google Sheets');
    return true;
  } catch (error) {
    console.error('Error sending lead to Google Sheets:', error);
    return false;
  }
}

/**
 * Send lead to UCM via webhook
 */
export async function sendLeadToUCM(leadData: LeadData): Promise<boolean> {
  const webhookUrl = process.env.UCM_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('UCM_WEBHOOK_URL not configured');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadData, submittedAt: new Date().toISOString(), source: 'website' }),
    });

    if (!response.ok) {
      console.error(`UCM webhook failed with status ${response.status}:`, await response.text());
      return false;
    }

    console.log('Lead successfully sent to UCM');
    return true;
  } catch (error) {
    console.error('Error sending lead to UCM:', error);
    return false;
  }
}

/**
 * Resolve the Google Business Profile location ID for a given market
 */
export function getGBPLocationId(market?: 'NC' | 'FL' | 'NATIONAL'): string | undefined {
  if (market === 'NC') return process.env.GOOGLE_BUSINESS_LOCATION_ID_NC;
  if (market === 'FL') return process.env.GOOGLE_BUSINESS_LOCATION_ID_FL;
  return undefined;
}

/**
 * Projex CRM webhook integration
 * POSTs lead data to the configured Projex webhook URL
 */

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  roofType?: string;
  roofSize?: string;
  propertyAddress?: string;
  additionalNotes?: string;
  pageSource?: string;
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
    const payload = {
      ...leadData,
      submittedAt: new Date().toISOString(),
      source: 'website',
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `Projex webhook failed with status ${response.status}:`,
        await response.text()
      );
      return false;
    }

    console.log('Lead successfully sent to Projex');
    return true;
  } catch (error) {
    console.error('Error sending lead to Projex:', error);
    return false;
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToProjectex } from '@/lib/projex';

interface LeadRequest {
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
 * POST /api/leads
 * Receives lead submissions from the estimator and contact forms.
 * - Validates required fields
 * - Sends to Projex CRM via webhook
 * - Sends confirmation email (optional - via Resend)
 * - Logs to console in development
 */
export async function POST(request: NextRequest) {
  try {
    const body: LeadRequest = await request.json();

    // Validate required fields
    const { firstName, lastName, email, phone } = body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, phone' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log submission in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📨 New Lead Submission:');
      console.log(JSON.stringify(body, null, 2));
    }

    // Send to Projex CRM
    const projectexSuccess = await sendLeadToProjectex(body);

    if (!projectexSuccess) {
      console.warn('Projex webhook failed but lead received');
      // Continue anyway - the lead was logged
    }

    // TODO: Send confirmation email via Resend API
    // if (process.env.RESEND_API_KEY) {
    //   await sendConfirmationEmail(email, firstName, lastName);
    // }

    // Generate leadId (could be UUID or database ID in production)
    const leadId = `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: 'Lead submission received. We will contact you within 1 business hour.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);

    return NextResponse.json(
      { error: 'Failed to process lead submission' },
      { status: 500 }
    );
  }
}

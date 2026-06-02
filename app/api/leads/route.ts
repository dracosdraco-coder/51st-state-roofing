import { NextRequest, NextResponse } from 'next/server';
import {
  sendLeadToProjectex,
  sendLeadToGoogleSheets,
  sendLeadToUCM,
  getGBPLocationId,
  type LeadData,
} from '@/lib/projex';

/**
 * POST /api/leads
 * Receives lead submissions from all forms on the site.
 * Dispatches in parallel to: Projex CRM, Google Sheets, UCM.
 * One destination failing does not block the others.
 */
export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();

    const { firstName, lastName, email, phone } = body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, phone' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Attach the GBP location ID based on the submitted market
    const enrichedLead: LeadData = {
      ...body,
      googleBusinessLocationId: getGBPLocationId(body.locationMarket),
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('New Lead Submission:', JSON.stringify(enrichedLead, null, 2));
    }

    // Fan out to all destinations in parallel — failures are logged but do not block
    const [projexResult, sheetsResult, ucmResult] = await Promise.allSettled([
      sendLeadToProjectex(enrichedLead),
      sendLeadToGoogleSheets(enrichedLead),
      sendLeadToUCM(enrichedLead),
    ]);

    if (projexResult.status === 'rejected' || projexResult.value === false) {
      console.warn('Projex delivery failed');
    }
    if (sheetsResult.status === 'rejected' || sheetsResult.value === false) {
      console.warn('Google Sheets delivery failed');
    }
    if (ucmResult.status === 'rejected' || ucmResult.value === false) {
      console.warn('UCM delivery failed');
    }

    const leadId = `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: 'Lead submission received. We will contact you within 24 hours.',
        dispatched: {
          projex: projexResult.status === 'fulfilled' && projexResult.value,
          googleSheets: sheetsResult.status === 'fulfilled' && sheetsResult.value,
          ucm: ucmResult.status === 'fulfilled' && ucmResult.value,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json({ error: 'Failed to process lead submission' }, { status: 500 });
  }
}

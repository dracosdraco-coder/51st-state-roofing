import { NextRequest, NextResponse } from 'next/server';
import { sendCallToGoogleSheets, type CallData } from '@/lib/projex';

// CallRail sends call events as either JSON or form-encoded POST.
// We accept both. A URL secret param guards the endpoint.
export async function POST(request: NextRequest) {
  const secret = process.env.CALLRAIL_WEBHOOK_SECRET;
  if (secret) {
    const provided = request.nextUrl.searchParams.get('secret');
    if (provided !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const contentType = request.headers.get('content-type') ?? '';
    let raw: Record<string, unknown>;

    if (contentType.includes('application/json')) {
      raw = await request.json();
    } else {
      // CallRail default: application/x-www-form-urlencoded
      const form = await request.formData();
      raw = Object.fromEntries(form.entries());
    }

    // CallRail v3 wraps fields in a `payload` object when sending JSON;
    // form-encoded and older versions send fields at the top level.
    const payload = (raw.payload as Record<string, unknown>) ?? raw;
    const eventType = (raw.event_type as string) ?? 'calls.completed';

    // Only log completed or missed calls — skip ringing/started events
    if (!eventType.includes('completed') && !eventType.includes('missed')) {
      return NextResponse.json({ received: true, processed: false });
    }

    const callData: CallData = {
      event_type:       eventType,
      id:               payload.id as string,
      caller_number:    (payload.caller_number ?? payload.caller_num) as string,
      duration:         payload.duration as number,
      start_time:       payload.start_time as string,
      end_time:         payload.end_time as string,
      answered:         payload.answered === true || payload.answered === 'true',
      direction:        (payload.direction ?? payload.call_type) as string,
      tracking_number:  (payload.tracking_number ?? payload.dialed_number) as string,
      source:           (payload.source ?? payload.source_name) as string,
      utm_source:       payload.utm_source as string,
      utm_campaign:     payload.utm_campaign as string,
      utm_medium:       payload.utm_medium as string,
      utm_term:         payload.utm_term as string,
      utm_content:      payload.utm_content as string,
      landing_url:      payload.landing_url as string,
      referring_url:    payload.referring_url as string,
      recording_player: payload.recording_player as string,
      company_name:     payload.company_name as string,
      note:             payload.note as string,
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('CallRail webhook received:', JSON.stringify(callData, null, 2));
    }

    const sent = await sendCallToGoogleSheets(callData);
    if (!sent) {
      console.warn('Failed to forward call to Google Sheets');
    }

    return NextResponse.json({ received: true, processed: sent });
  } catch (error) {
    console.error('Error processing CallRail webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}

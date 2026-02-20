import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { newsletterSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? '';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitResponse = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const { email } = result.data;

    if (resend && AUDIENCE_ID) {
      // Add contact to Resend Audience
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
      });
    } else {
      console.log('[DEV] Newsletter subscription:', result.data);
    }

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Newsletter error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

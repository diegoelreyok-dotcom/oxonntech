import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'contact@oxonn.com';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitResponse = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0] ?? 'form');
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      return NextResponse.json(
        { error: 'Validation failed', fields: fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message, company, role, serviceInterest, inquiryType } =
      result.data;

    if (resend) {
      // Send notification email to the team
      await resend.emails.send({
        from: 'OXONN Contact <noreply@oxonn-tech.com>',
        to: [CONTACT_EMAIL],
        replyTo: email,
        subject: `[${inquiryType.toUpperCase()}] New inquiry from ${name}${company ? ` — ${company}` : ''}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company && `Company: ${company}`,
          role && `Role: ${role}`,
          `Service Interest: ${serviceInterest}`,
          `Inquiry Type: ${inquiryType}`,
          '',
          'Message:',
          message,
        ]
          .filter(Boolean)
          .join('\n'),
      });

      // Send confirmation email to the user
      await resend.emails.send({
        from: 'OXONN Technologies <noreply@oxonn-tech.com>',
        to: [email],
        subject: 'We received your message — OXONN Technologies',
        text: [
          `Hi ${name},`,
          '',
          'Thank you for reaching out to OXONN Technologies. We have received your message and a member of our team will get back to you within 24 hours.',
          '',
          'For reference, here is a copy of your message:',
          '---',
          message,
          '---',
          '',
          'Best regards,',
          'The OXONN Team',
          'https://oxonn-tech.com',
        ].join('\n'),
      });
    } else {
      // Development fallback
      console.log('[DEV] Contact form submission:', result.data);
    }

    return NextResponse.json(
      { success: true, message: 'Message received' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

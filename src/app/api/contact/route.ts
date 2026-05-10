export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional().default('Autre'),
  message: z.string().min(2).max(2000),
});

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    console.error('[contact] Validation failed:', JSON.stringify(parsed.error.flatten()), '| body:', JSON.stringify(body));
    return NextResponse.json(
      { error: 'Validation error', details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  // Resend requires a verified domain for custom from addresses.
  // Fall back to the Resend shared domain which always works.
  const sender = process.env.CONTACT_FROM_EMAIL ?? 'KSV Pallastrada <onboarding@resend.dev>';

  if (!recipient) {
    console.error('[contact] CONTACT_RECIPIENT_EMAIL is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const result = await resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `[KSV Pallastrada] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1a4731;padding:24px;border-radius:8px 8px 0 0">
            <h1 style="color:white;margin:0;font-size:24px">KSV Pallastrada — Contact</h1>
          </div>
          <div style="background:#f9f9f9;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e5e5">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 0;color:#666;width:80px;font-size:14px">Nom</td>
                <td style="padding:8px 0;font-weight:600;font-size:14px">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#666;font-size:14px">Email</td>
                <td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#1a4731">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#666;font-size:14px">Sujet</td>
                <td style="padding:8px 0;font-size:14px">${subject}</td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
            <p style="white-space:pre-wrap;font-size:14px;color:#333;line-height:1.6">${message}</p>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error('[contact] Resend API error:', result.error);
      return NextResponse.json({ error: 'Failed to send email', detail: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

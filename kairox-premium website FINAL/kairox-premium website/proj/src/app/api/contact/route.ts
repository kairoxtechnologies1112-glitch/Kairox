import { NextResponse } from 'next/server';
import { z } from 'zod';
import { budgetOptions, industryOptions } from '@/lib/contact-options';
import { services } from '@/lib/services';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory fallback rate limiter (used when Redis is unavailable)
type RateBucket = { start: number; count: number };
const memoryRateLimit = new Map<string, RateBucket>();

// Redis rate limiter (lazy initialization)
let redisRatelimit: { limit: (key: string) => Promise<{ success: boolean; limit: number; remaining: number; reset: number }> } | null = null;

async function getRedisRatelimiter() {
  if (redisRatelimit) return redisRatelimit;
  
  const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL;
  const redisToken = process.env.REDIS_TOKEN || process.env.UPSTASH_REDIS_TOKEN;
  
  if (!redisUrl) {
    return null;
  }
  
  try {
    // Dynamic import to avoid build-time dependency if not used
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis } = await import('@upstash/redis');
    
    const redis = new Redis({ url: redisUrl, token: redisToken });
    
    redisRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS_PER_WINDOW, `${WINDOW_MS / 1000} s`),
      analytics: true,
      prefix: 'kairox:ratelimit',
    });
    
    return redisRatelimit;
  } catch {
    // Redis not available, will use in-memory fallback
    return null;
  }
}

async function allowRequest(ip: string, now: number): Promise<boolean> {
  // Try Redis first
  const limiter = await getRedisRatelimiter();
  
  if (limiter) {
    try {
      const result = await limiter.limit(ip);
      return result.success;
    } catch {
      // Redis failed, fall through to in-memory
    }
  }
  
  // In-memory fallback
  for (const [key, bucket] of memoryRateLimit) {
    if (now - bucket.start > WINDOW_MS) memoryRateLimit.delete(key);
  }
  const current = memoryRateLimit.get(ip);
  if (!current || now - current.start > WINDOW_MS) {
    memoryRateLimit.set(ip, { start: now, count: 1 });
    return true;
  }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) return false;
  current.count += 1;
  return true;
}

const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  businessName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(32).regex(/^\+?[\d\s().-]+$/, 'Enter a valid phone number.').refine((value) => (value.match(/\d/g) ?? []).length >= 7, 'Enter at least seven phone digits.'),
  industry: z.enum(industryOptions),
  service: z.string().trim().min(2).max(120).refine((value) => value === 'Not sure yet' || services.some((service) => service.title === value)),
  description: z.string().trim().min(20).max(5000),
  budget: z.string().trim().max(120).refine((value) => budgetOptions.some((option) => option.value === value)).optional().default(''),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  website: z.string().max(0).optional().default(''),
  formStartedAt: z.string().regex(/^\d{10,16}$/),
});

function json(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function readBodyWithinLimit(request: Request): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

function hasSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  if (request.headers.get('sec-fetch-site') === 'same-origin') return true;
  const host = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '').split(',')[0].trim().toLowerCase();
  if (!host) return false;
  try {
    return new URL(origin).host.toLowerCase() === host;
  } catch {
    return false;
  }
}

function buildEnquiryHtml(enquiry: z.infer<typeof enquirySchema>) {
  const preferredContactLabels: Record<string, string> = {
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
  };
  const rows = [
    ['Name', enquiry.fullName],
    ['Business', enquiry.businessName],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone],
    ['Industry', enquiry.industry],
    ['Service', enquiry.service],
    ['Budget', enquiry.budget || 'Not provided'],
    ['Preferred contact', preferredContactLabels[enquiry.preferredContact] || enquiry.preferredContact],
  ];
  const rowsHtml = rows.map(([label, value]) => `
    <tr>
      <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111827; width: 180px;">${label}</td>
      <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #374151;">${value}</td>
    </tr>
  `).join('');
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Project Enquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <tr>
      <td style="background: linear-gradient(135deg, #7B4DF0 0%, #4A63F0 100%); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">New Project Enquiry</h1>
        <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.9);">KAIROX TECHNOLOGIES</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="margin: 0 0 24px; font-size: 16px; color: #111827; line-height: 1.6;">A new project enquiry has been submitted through the website.</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          ${rowsHtml}
        </table>
        <h3 style="margin: 32px 0 12px; font-size: 18px; font-weight: 600; color: #111827;">Project Description</h3>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; white-space: pre-wrap; font-size: 15px; color: #374151; line-height: 1.7;">${enquiry.description}</div>
        <p style="margin: 32px 0 0; font-size: 13px; color: #6b7280;">This enquiry was submitted via the KAIROX TECHNOLOGIES website contact form.</p>
      </td>
    </tr>
    <tr>
      <td style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} KAIROX TECHNOLOGIES. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function buildConfirmationHtml(enquiry: z.infer<typeof enquirySchema>) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Enquiry Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <tr>
      <td style="background: linear-gradient(135deg, #7B4DF0 0%, #4A63F0 100%); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">We've received your enquiry</h1>
        <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.9);">KAIROX TECHNOLOGIES</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="margin: 0 0 16px; font-size: 16px; color: #111827; line-height: 1.6;">Hi ${enquiry.fullName},</p>
        <p style="margin: 0 0 24px; font-size: 16px; color: #374151; line-height: 1.6;">Thank you for reaching out to KAIROX TECHNOLOGIES. We've received your project enquiry and our team will review the details shortly.</p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #111827;">Enquiry Summary</p>
          <p style="margin: 0; font-size: 14px; color: #374151;"><strong>Service:</strong> ${enquiry.service}</p>
          <p style="margin: 8px 0 0; font-size: 14px; color: #374151;"><strong>Preferred contact:</strong> ${['email', 'phone', 'whatsapp'].includes(enquiry.preferredContact) ? { email: 'Email', phone: 'Phone', whatsapp: 'WhatsApp' }[enquiry.preferredContact] : enquiry.preferredContact}</p>
        </div>
        <p style="margin: 0 0 16px; font-size: 16px; color: #374151; line-height: 1.6;">We'll be in touch soon to discuss your project and next steps.</p>
        <p style="margin: 0; font-size: 16px; color: #111827; font-weight: 600;">Best regards,<br />The KAIROX TECHNOLOGIES Team</p>
      </td>
    </tr>
    <tr>
      <td style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} KAIROX TECHNOLOGIES. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return json('This request could not be verified. Refresh the page and try again.', 403);
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) return json('The enquiry is too large. Please shorten your message and try again.', 413);

  let raw: string;
  try {
    const boundedBody = await readBodyWithinLimit(request);
    if (boundedBody === null) return json('The enquiry is too large. Please shorten your message and try again.', 413);
    raw = boundedBody;
  } catch {
    return json('We could not read the enquiry. Please try again.', 400);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json('Please check the enquiry form and try again.', 400);
  }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return json('Please check the required fields and make sure your details are valid.', 400);
  const enquiry = parsed.data;

  if (enquiry.website) return json('This enquiry could not be accepted. Please review the form and try again.', 400);
  const now = Date.now();
  const startedAt = Number(enquiry.formStartedAt);
  if (!Number.isSafeInteger(startedAt) || startedAt > now || now - startedAt < 1_200 || now - startedAt > 48 * 60 * 60 * 1000) {
    return json('Please take a moment to review the form and try again.', 400);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (!await allowRequest(ip, now)) return json('Too many enquiries were submitted from this connection. Please try again later.', 429);

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return json('The enquiry inbox is not connected yet, so your message was not sent. Please try again later.', 503);
  }

  const enquiryHtml = buildEnquiryHtml(enquiry);
  const confirmationHtml = buildConfirmationHtml(enquiry);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: enquiry.email,
        subject: 'New project enquiry',
        html: enquiryHtml,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!providerResponse.ok) return json('The email service did not accept your enquiry. Your message has not been confirmed as sent; please try again later.', 502);

    // Send confirmation email to the enquirer
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: sender,
        to: [enquiry.email],
        subject: 'We received your enquiry — KAIROX TECHNOLOGIES',
        html: confirmationHtml,
      }),
      signal: controller.signal,
      cache: 'no-store',
    }).catch(() => {
      // Silently fail confirmation email - don't block the main flow
    });

    return NextResponse.json({ ok: true, message: 'Your enquiry was accepted by the email service. We\'ll be in touch.' }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return json('The email service could not be reached. Your message has not been confirmed as sent; please try again later.', 502);
  } finally {
    clearTimeout(timeout);
  }
}
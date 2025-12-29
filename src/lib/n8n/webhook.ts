import type { N8NWebhookPayload } from '@/types/booking';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

export async function sendBookingToN8N(
  payload: N8NWebhookPayload
): Promise<boolean> {
  if (!WEBHOOK_URL) {
    console.error('N8N webhook URL not configured');
    return false;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('N8N webhook failed:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send booking to N8N:', error);
    return false;
  }
}

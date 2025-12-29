# n8n Webhook Integration Guide

This document explains how to set up automated workflows using n8n webhooks when a booking is created.

---

## 🎯 Use Cases

With n8n webhooks, you can automatically:
- ✉️ Send confirmation emails to guests
- 📱 Send SMS notifications
- 💬 Post to Slack/Discord
- 📊 Update Google Sheets
- 🗓️ Create calendar events
- 💰 Process payments
- 📧 Notify team members
- 🔔 Send push notifications

---

## 🔧 Setup Steps

### 1. Create n8n Account

**Option A: n8n Cloud (Recommended)**
1. Go to [n8n.io](https://n8n.io) and sign up
2. Create a new workflow

**Option B: Self-Hosted**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. Create Webhook Workflow

1. In n8n, click **"New Workflow"**
2. Add a **"Webhook"** node (trigger)
3. Configure webhook:
   - **HTTP Method:** POST
   - **Path:** `/booking` (or any path you want)
   - **Authentication:** None (or add header auth)
   - **Response Mode:** Respond Immediately
   - **Response Code:** 200

4. Copy the **Webhook URL** (e.g., `https://your-instance.app.n8n.cloud/webhook/booking`)

5. Paste this URL in your `.env.local`:
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-instance.app.n8n.cloud/webhook/booking
```

### 3. Test the Webhook

The app sends this JSON payload when a booking is created:

```json
{
  "booking_id": "123e4567-e89b-12d3-a456-426614174000",
  "tent_name": "Royal Desert Palace",
  "tent_category": "royal",
  "guest_name": "Ahmed Al-Saud",
  "guest_email": "ahmed@example.com",
  "guest_phone": "+966501234567",
  "check_in": "2024-03-15",
  "check_out": "2024-03-17",
  "nights": 2,
  "guests": 4,
  "total_price": 7000,
  "special_requests": "Please arrange early check-in",
  "created_at": "2024-03-01T14:30:00Z"
}
```

---

## 📧 Example 1: Send Email Confirmation

### Workflow

1. **Webhook** (trigger)
2. **Gmail** (or any email service node)
   - **To:** `{{ $json.guest_email }}`
   - **Subject:** `Booking Confirmation - {{ $json.tent_name }}`
   - **Email Body:**

```
Dear {{ $json.guest_name }},

Thank you for booking with Somou Al-Badia!

📅 Booking Details:
- Tent: {{ $json.tent_name }}
- Check-in: {{ $json.check_in }}
- Check-out: {{ $json.check_out }}
- Nights: {{ $json.nights }}
- Guests: {{ $json.guests }}
- Total: SAR {{ $json.total_price }}

Special Requests: {{ $json.special_requests }}

We look forward to hosting you!

Best regards,
Somou Al-Badia Team
```

3. **Save & Activate** workflow

### Email Services Supported
- Gmail
- Outlook
- SendGrid
- Mailgun
- AWS SES
- Custom SMTP

---

## 📱 Example 2: Send SMS Notification

### Workflow

1. **Webhook** (trigger)
2. **Twilio** (or any SMS service node)
   - **To:** `{{ $json.guest_phone }}`
   - **Message:**

```
Thank you {{ $json.guest_name }}! Your booking at {{ $json.tent_name }} is confirmed for {{ $json.check_in }}. See you soon! - Somou Al-Badia
```

### SMS Services Supported
- Twilio
- MessageBird
- Vonage (Nexmo)
- AWS SNS
- Custom HTTP API

---

## 💬 Example 3: Notify Team on Slack

### Workflow

1. **Webhook** (trigger)
2. **Slack** node
   - **Channel:** #bookings
   - **Message:**

```
🎉 New Booking Received!

Tent: {{ $json.tent_name }}
Guest: {{ $json.guest_name }}
Email: {{ $json.guest_email }}
Phone: {{ $json.guest_phone }}
Check-in: {{ $json.check_in }}
Check-out: {{ $json.check_out }}
Guests: {{ $json.guests }}
Total: SAR {{ $json.total_price }}

Special Requests: {{ $json.special_requests }}
```

---

## 📊 Example 4: Log to Google Sheets

### Workflow

1. **Webhook** (trigger)
2. **Google Sheets** node
   - **Operation:** Append
   - **Spreadsheet:** Your bookings spreadsheet
   - **Sheet:** Bookings
   - **Columns:**

| Booking ID | Tent Name | Guest Name | Email | Phone | Check-in | Check-out | Nights | Guests | Total | Created At |
|------------|-----------|------------|-------|-------|----------|-----------|--------|--------|-------|------------|
| {{ $json.booking_id }} | {{ $json.tent_name }} | {{ $json.guest_name }} | {{ $json.guest_email }} | {{ $json.guest_phone }} | {{ $json.check_in }} | {{ $json.check_out }} | {{ $json.nights }} | {{ $json.guests }} | {{ $json.total_price }} | {{ $json.created_at }} |

---

## 🔄 Example 5: Multi-Step Workflow

Combine multiple actions:

1. **Webhook** (trigger)
2. **Google Sheets** - Log booking
3. **Gmail** - Send confirmation to guest
4. **Slack** - Notify team
5. **Twilio** - Send SMS to guest
6. **HTTP Request** - Update your CRM
7. **Google Calendar** - Create event

---

## 🛠️ Advanced: Conditional Logic

Use n8n **IF** nodes to handle different scenarios:

### Example: High-Value Booking Alert

```
Webhook → IF Node → (Check if total_price > 5000)
  ├─ TRUE → Slack (Notify manager) + SMS (VIP treatment)
  └─ FALSE → Standard email confirmation
```

### Example: Category-Based Actions

```
Webhook → Switch Node (tent_category)
  ├─ royal → Email + SMS + VIP concierge call
  ├─ luxury → Email + SMS
  ├─ premium → Email
  └─ standard → Email
```

---

## 🔒 Security Best Practices

### 1. Use Webhook Authentication

In n8n Webhook node:
- Enable **Header Auth**
- Set custom header (e.g., `X-Webhook-Secret: your-secret-key`)

Then in your app code, update `src/lib/n8n/webhook.ts`:

```typescript
export async function sendBookingToN8N(payload: N8NWebhookPayload): Promise<boolean> {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET!,
    },
    body: JSON.stringify(payload),
  });
  
  return response.ok;
}
```

### 2. Use Environment Variables

Never hardcode webhook URLs. Always use `.env.local`.

### 3. Validate Webhook Payload

In n8n, add a **Function** node after webhook:

```javascript
const requiredFields = ['booking_id', 'guest_email', 'tent_name'];

for (const field of requiredFields) {
  if (!$json[field]) {
    throw new Error(`Missing required field: ${field}`);
  }
}

return [$json];
```

---

## 🐛 Troubleshooting

### Webhook not triggering

1. Check webhook URL in `.env.local` is correct
2. Verify n8n workflow is **activated**
3. Test webhook manually:

```bash
curl -X POST https://your-instance.app.n8n.cloud/webhook/booking \
  -H "Content-Type: application/json" \
  -d '{
    "booking_id": "test-123",
    "tent_name": "Test Tent",
    "guest_name": "Test User",
    "guest_email": "test@example.com",
    "guest_phone": "+966501234567",
    "check_in": "2024-03-15",
    "check_out": "2024-03-17",
    "nights": 2,
    "guests": 2,
    "total_price": 1000,
    "created_at": "2024-03-01T10:00:00Z"
  }'
```

### Emails not sending

- Check email node credentials
- Verify "From" email is authorized
- Enable "Less secure apps" (Gmail) or use App Password

### SMS not sending

- Verify Twilio credentials
- Check phone number format (+966...)
- Ensure SMS service is enabled for your country

---

## 📚 Resources

- [n8n Documentation](https://docs.n8n.io)
- [n8n Webhook Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [n8n Templates](https://n8n.io/workflows)

---

## 🎉 Next Steps

1. Create your n8n account
2. Build your first workflow
3. Test with a real booking
4. Add more automations as needed
5. Monitor execution logs in n8n

Happy automating! 🚀

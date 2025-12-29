export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

export interface Booking {
  id: string;
  tent_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests: number;
  total_price: number;
  special_requests?: string;
  status: BookingStatus;
  payment_status: PaymentStatus;
  n8n_webhook_sent: boolean;
  n8n_webhook_sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBookingInput {
  tent_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests: number;
  total_price: number;
  special_requests?: string;
}

export interface N8NWebhookPayload {
  booking_id: string;
  tent_name: string;
  tent_category: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  nights: number;
  guests: number;
  total_price: number;
  special_requests?: string;
  created_at: string;
}

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking, checkAvailability } from '@/lib/supabase/queries';
import { sendBookingToN8N } from '@/lib/n8n/webhook';
import type { CreateBookingInput } from '@/types/booking';

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBookingInput) => {
      const isAvailable = await checkAvailability(
        input.tent_id,
        input.check_in,
        input.check_out
      );

      if (!isAvailable) {
        throw new Error('Tent is not available for the selected dates');
      }

      const booking = await createBooking(input);

      const tent = queryClient.getQueryData<any>(['tent', 'id', input.tent_id]);

      if (tent) {
        await sendBookingToN8N({
          booking_id: booking.id,
          tent_name: tent.name_en,
          tent_category: tent.category,
          guest_name: booking.guest_name,
          guest_email: booking.guest_email,
          guest_phone: booking.guest_phone,
          check_in: booking.check_in,
          check_out: booking.check_out,
          nights: booking.nights,
          guests: booking.guests,
          total_price: booking.total_price,
          special_requests: booking.special_requests,
          created_at: booking.created_at,
        });
      }

      return booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tents'] });
    },
  });
}

export function useCheckAvailability() {
  return useMutation({
    mutationFn: ({
      tentId,
      checkIn,
      checkOut,
    }: {
      tentId: string;
      checkIn: string;
      checkOut: string;
    }) => checkAvailability(tentId, checkIn, checkOut),
  });
}

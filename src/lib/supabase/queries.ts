import { supabase } from './client';
import type { Tent, TentFilters } from '@/types/tent';
import type { CreateBookingInput, Booking } from '@/types/booking';

export async function getTents(filters?: TentFilters): Promise<Tent[]> {
  let query = supabase
    .from('tents')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.category && filters.category.length > 0) {
    query = query.in('category', filters.category);
  }

  if (filters?.minPrice !== undefined) {
    query = query.gte('price_per_night', filters.minPrice);
  }

  if (filters?.maxPrice !== undefined) {
    query = query.lte('price_per_night', filters.maxPrice);
  }

  if (filters?.minCapacity !== undefined) {
    query = query.gte('capacity', filters.minCapacity);
  }

  if (filters?.availableOnly) {
    query = query.eq('is_available', true);
  }

  if (filters?.search) {
    query = query.or(
      `name_en.ilike.%${filters.search}%,name_ar.ilike.%${filters.search}%,description_en.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch tents: ${error.message}`);
  }

  return data || [];
}

export async function getFeaturedTents(): Promise<Tent[]> {
  const { data, error } = await supabase
    .from('tents')
    .select('*')
    .eq('is_featured', true)
    .eq('is_available', true)
    .order('price_per_night', { ascending: false })
    .limit(3);

  if (error) {
    throw new Error(`Failed to fetch featured tents: ${error.message}`);
  }

  return data || [];
}

export async function getTentBySlug(slug: string): Promise<Tent | null> {
  const { data, error } = await supabase
    .from('tents')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch tent: ${error.message}`);
  }

  return data;
}

export async function getTentById(id: string): Promise<Tent | null> {
  const { data, error } = await supabase
    .from('tents')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch tent: ${error.message}`);
  }

  return data;
}

export async function createBooking(
  input: CreateBookingInput
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert([input])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create booking: ${error.message}`);
  }

  return data;
}

export async function checkAvailability(
  tentId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('check_in, check_out')
    .eq('tent_id', tentId)
    .neq('status', 'cancelled')
    .or(`check_in.lte.${checkOut},check_out.gte.${checkIn}`);

  if (bookingsError) {
    throw new Error(`Failed to check availability: ${bookingsError.message}`);
  }

  if (bookings && bookings.length > 0) {
    return false;
  }

  const { data: availability, error: availabilityError } = await supabase
    .from('availability')
    .select('date, is_available')
    .eq('tent_id', tentId)
    .gte('date', checkIn)
    .lte('date', checkOut)
    .eq('is_available', false);

  if (availabilityError) {
    throw new Error(
      `Failed to check availability: ${availabilityError.message}`
    );
  }

  return !availability || availability.length === 0;
}

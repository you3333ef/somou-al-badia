import { use } from 'react';
import { BookingFormClient } from './BookingFormClient';

export const dynamicParams = true;

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <BookingFormClient id={id} />;
}

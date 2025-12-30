'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useTentById } from '@/lib/hooks/useTents';
import { BookingForm } from '@/components/booking/BookingForm';

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tentId = searchParams.get('id');

  const { data: tent, isLoading } = useTentById(tentId || '');

  if (!tentId) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-desert-900 mb-4">
            No Tent Selected
          </h1>
          <p className="text-desert-600 mb-8">
            Please select a tent from the catalog to make a booking.
          </p>
          <button
            onClick={() => router.push('/catalog')}
            className="text-primary-600 hover:text-primary-700"
          >
            Go to Catalog
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-desert-200 rounded w-32" />
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <div className="h-8 bg-desert-200 rounded" />
              <div className="h-12 bg-desert-200 rounded" />
              <div className="h-12 bg-desert-200 rounded" />
              <div className="h-12 bg-desert-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tent) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-desert-900 mb-4">
            Tent Not Found
          </h1>
          <p className="text-desert-600 mb-8">
            Unable to load tent information. Please try again.
          </p>
          <button
            onClick={() => router.push('/catalog')}
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-desert-600 hover:text-desert-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-desert-900 mb-2">
            Book {tent.name_en}
          </h1>
          <p className="text-desert-600">
            Complete the form below to reserve your luxury desert experience
          </p>
        </div>

        <BookingForm tent={tent} />
      </div>
    </div>
  );
}

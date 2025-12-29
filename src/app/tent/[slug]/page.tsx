'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useTentBySlug } from '@/lib/hooks/useTents';
import { TentDetails } from '@/components/tents/TentDetails';
import { Button } from '@/components/ui/Button';

export default function TentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { data: tent, isLoading } = useTentBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-desert-200 rounded w-32" />
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="aspect-[16/10] bg-desert-200" />
              <div className="p-6 space-y-4">
                <div className="h-8 bg-desert-200 rounded" />
                <div className="h-4 bg-desert-200 rounded w-3/4" />
                <div className="h-4 bg-desert-200 rounded w-2/3" />
              </div>
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
            The tent you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/catalog')}>
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-desert-600 hover:text-desert-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <TentDetails tent={tent} />
      </div>
    </div>
  );
}

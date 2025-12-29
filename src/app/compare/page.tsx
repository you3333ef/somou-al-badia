'use client';

import Link from 'next/link';
import { useCompare } from '@/lib/hooks/useCompare';
import { TentCompareCard } from '@/components/tents/TentCompareCard';
import { Button } from '@/components/ui/Button';

export default function ComparePage() {
  const { tents, removeTent, clearAll } = useCompare();

  if (tents.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-desert-900 mb-8">
            Compare Tents
          </h1>

          <div className="text-center py-16">
            <p className="text-xl text-desert-600 mb-6">
              You haven't added any tents to compare yet
            </p>
            <Link href="/catalog">
              <Button>Browse Tents</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-desert-900 mb-2">
              Compare Tents
            </h1>
            <p className="text-desert-600">
              {tents.length} tent{tents.length !== 1 ? 's' : ''} selected (max 3)
            </p>
          </div>

          {tents.length > 0 && (
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tents.map((tent) => (
            <TentCompareCard
              key={tent.id}
              tent={tent}
              onRemove={removeTent}
            />
          ))}

          {tents.length < 3 && (
            <Link href="/catalog">
              <div className="border-2 border-dashed border-desert-300 rounded-2xl h-full min-h-[400px] flex items-center justify-center hover:border-primary-500 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl text-desert-300 mb-4">+</div>
                  <p className="text-desert-600 font-semibold">
                    Add Another Tent
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

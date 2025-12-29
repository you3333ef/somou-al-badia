import type { Tent } from '@/types/tent';
import { TentCard } from './TentCard';

interface TentGridProps {
  tents: Tent[];
  locale?: string;
}

export function TentGrid({ tents, locale = 'en' }: TentGridProps) {
  if (tents.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-desert-500">
          {locale === 'ar' ? 'لا توجد خيام متاحة' : 'No tents available'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tents.map((tent) => (
        <TentCard key={tent.id} tent={tent} locale={locale} />
      ))}
    </div>
  );
}

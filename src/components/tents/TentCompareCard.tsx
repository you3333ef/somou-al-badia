import Image from 'next/image';
import { X, Check } from 'lucide-react';
import type { Tent } from '@/types/tent';
import { formatPrice, formatCapacity, formatArea } from '@/lib/utils/formatting';
import { hapticImpact } from '@/lib/capacitor/native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TentCompareCardProps {
  tent: Tent;
  onRemove: (tentId: string) => void;
  locale?: string;
}

export function TentCompareCard({
  tent,
  onRemove,
  locale = 'ar',
}: TentCompareCardProps) {
  const name = locale === 'ar' ? tent.name_ar : tent.name_en;
  const features = locale === 'ar' ? tent.features_ar : tent.features_en;

  const handleRemove = () => {
    hapticImpact('light');
    onRemove(tent.id);
  };

  return (
    <Card className="relative">
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 z-10 p-1.5 bg-red-500 text-white rounded-full active:scale-95 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="relative aspect-[4/3]">
        <Image
          src={tent.images[0]}
          alt={name}
          fill
          className="object-cover rounded-t-2xl"
          unoptimized
        />
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-desert-900 mb-1">
            {name}
          </h3>
          <div className="text-sm text-desert-600 uppercase tracking-wide">
            {tent.category}
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-desert-600">
              {locale === 'ar' ? 'السعر' : 'Price'}
            </span>
            <span className="font-semibold text-primary-600">
              {formatPrice(tent.price_per_night, locale)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-desert-600">
              {locale === 'ar' ? 'السعة' : 'Capacity'}
            </span>
            <span className="font-semibold text-desert-900">
              {formatCapacity(tent.capacity, locale)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-desert-600">
              {locale === 'ar' ? 'المساحة' : 'Area'}
            </span>
            <span className="font-semibold text-desert-900">
              {formatArea(tent.area_sqm, locale)}
            </span>
          </div>
        </div>

        <div className="border-t border-desert-100 pt-4">
          <h4 className="text-sm font-semibold text-desert-900 mb-2">
            {locale === 'ar' ? 'المميزات' : 'Features'}
          </h4>
          <div className="space-y-1.5">
            {features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-xs">
                <Check className="w-3.5 h-3.5 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-desert-700">{feature}</span>
              </div>
            ))}
            {features.length > 4 && (
              <div className="text-xs text-desert-500">
                +{features.length - 4} {locale === 'ar' ? 'المزيد' : 'more'}
              </div>
            )}
          </div>
        </div>

        <Button
          size="sm"
          className="w-full"
          onClick={() => {
            hapticImpact('medium');
            window.location.href = `/tent/${tent.slug}`;
          }}
        >
          {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
        </Button>
      </div>
    </Card>
  );
}

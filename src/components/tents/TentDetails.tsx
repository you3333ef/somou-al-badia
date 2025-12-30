'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Users,
  Maximize2,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  Share2,
} from 'lucide-react';
import type { Tent } from '@/types/tent';
import { formatPrice, formatCapacity, formatArea } from '@/lib/utils/formatting';
import { hapticImpact, shareTent } from '@/lib/capacitor/native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface TentDetailsProps {
  tent: Tent;
  locale?: string;
}

export function TentDetails({ tent, locale = 'en' }: TentDetailsProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const name = locale === 'ar' ? tent.name_ar : tent.name_en;
  const description = locale === 'ar' ? tent.description_ar : tent.description_en;
  const features = locale === 'ar' ? tent.features_ar : tent.features_en;
  const amenities = locale === 'ar' ? tent.amenities_ar : tent.amenities_en;

  const nextImage = () => {
    hapticImpact('light');
    setCurrentImageIndex((prev) =>
      prev === tent.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    hapticImpact('light');
    setCurrentImageIndex((prev) =>
      prev === 0 ? tent.images.length - 1 : prev - 1
    );
  };

  const handleShare = async () => {
    await hapticImpact('light');
    await shareTent(name, window.location.href);
  };

  const handleBooking = () => {
    hapticImpact('medium');
    router.push(`/booking?id=${tent.id}`);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="relative aspect-[16/10] bg-desert-100">
          <Image
            src={tent.images[currentImageIndex]}
            alt={`${name} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
            unoptimized
          />

          {tent.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-desert-800" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg active:scale-95 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-desert-800" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {tent.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      hapticImpact('light');
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <button
            onClick={handleShare}
            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg active:scale-95 transition-all"
          >
            <Share2 className="w-5 h-5 text-desert-800" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-desert-900 mb-2">
                {name}
              </h1>
              <div className="flex items-center gap-4 text-desert-600">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{formatCapacity(tent.capacity, locale)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-5 h-5" />
                  <span>{formatArea(tent.area_sqm, locale)}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">
                {formatPrice(tent.price_per_night, locale)}
              </div>
              <div className="text-sm text-desert-500">
                {locale === 'ar' ? 'لكل ليلة' : 'per night'}
              </div>
            </div>
          </div>

          <p className="text-desert-700 leading-relaxed mb-6">
            {description}
          </p>

          {tent.location_name_en && (
            <div className="flex items-center gap-2 text-desert-600 mb-6">
              <MapPin className="w-5 h-5" />
              <span>
                {locale === 'ar' ? tent.location_name_ar : tent.location_name_en}
              </span>
            </div>
          )}

          <Button
            onClick={handleBooking}
            size="lg"
            className="w-full mb-4"
          >
            {locale === 'ar' ? 'احجز الآن' : 'Book Now'}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold text-desert-900 mb-4">
          {locale === 'ar' ? 'المميزات' : 'Features'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-600" />
              </div>
              <span className="text-desert-700">{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold text-desert-900 mb-4">
          {locale === 'ar' ? 'وسائل الراحة' : 'Amenities'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-desert-50 rounded-lg"
            >
              <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
              <span className="text-sm text-desert-700">{amenity}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

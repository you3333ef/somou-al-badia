'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Maximize2, Heart, Share2 } from 'lucide-react';
import type { Tent } from '@/types/tent';
import { formatPrice, formatCapacity, formatArea } from '@/lib/utils/formatting';
import { hapticImpact, shareTent } from '@/lib/capacitor/native';
import { useCompare } from '@/lib/hooks/useCompare';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TentCardProps {
  tent: Tent;
  locale?: string;
}

export function TentCard({ tent, locale = 'en' }: TentCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addTent, removeTent, isTentInCompare } = useCompare();
  const isInCompare = isTentInCompare(tent.id);

  const name = locale === 'ar' ? tent.name_ar : tent.name_en;
  const mainImage = tent.images[0] || '';

  const handleCompareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await hapticImpact('light');
    
    if (isInCompare) {
      removeTent(tent.id);
    } else {
      addTent(tent);
    }
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await hapticImpact('light');
    await shareTent(name, `${window.location.origin}/tent/${tent.slug}`);
  };

  const getCategoryColor = () => {
    switch (tent.category) {
      case 'royal':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'luxury':
        return 'bg-gradient-to-r from-primary-500 to-primary-600';
      case 'premium':
        return 'bg-gradient-to-r from-desert-600 to-desert-700';
      default:
        return 'bg-desert-500';
    }
  };

  return (
    <Link href={`/tent/${tent.slug}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={mainImage}
            alt={name}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            unoptimized
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-desert-100 animate-pulse" />
          )}
          
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wide ${getCategoryColor()}`}>
            {tent.category}
          </div>
          
          {tent.is_featured && (
            <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase">
              Featured
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={handleCompareClick}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                isInCompare
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/90 text-desert-800 hover:bg-white'
              }`}
            >
              <Heart className="w-5 h-5" fill={isInCompare ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={handleShareClick}
              className="p-2.5 bg-white/90 backdrop-blur-md rounded-full text-desert-800 hover:bg-white transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-desert-900 mb-2 line-clamp-1">
            {name}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-desert-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{formatCapacity(tent.capacity, locale)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4" />
              <span>{formatArea(tent.area_sqm, locale)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-desert-100">
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {formatPrice(tent.price_per_night, locale)}
              </div>
              <div className="text-xs text-desert-500">
                {locale === 'ar' ? 'لكل ليلة' : 'per night'}
              </div>
            </div>
            
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                hapticImpact('medium');
              }}
            >
              {locale === 'ar' ? 'احجز الآن' : 'Book Now'}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

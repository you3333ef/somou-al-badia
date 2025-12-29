export type TentCategory = 'royal' | 'luxury' | 'premium' | 'standard';

export interface Tent {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  description_en: string;
  description_ar: string;
  category: TentCategory;
  capacity: number;
  area_sqm: number;
  price_per_night: number;
  features_en: string[];
  features_ar: string[];
  amenities_en: string[];
  amenities_ar: string[];
  images: string[];
  video_url?: string;
  location_name_en?: string;
  location_name_ar?: string;
  location_lat?: number;
  location_lng?: number;
  is_available: boolean;
  is_featured: boolean;
  min_nights: number;
  max_nights: number;
  created_at: string;
  updated_at: string;
}

export interface TentFilters {
  category?: TentCategory[];
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  search?: string;
  availableOnly?: boolean;
}

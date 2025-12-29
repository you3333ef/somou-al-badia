import { format } from 'date-fns';

export function formatPrice(price: number, locale: string = 'en'): string {
  if (locale === 'ar') {
    return `${price.toLocaleString('ar-SA')} ر.س`;
  }
  return `SAR ${price.toLocaleString('en-US')}`;
}

export function formatDate(date: string | Date, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (locale === 'ar') {
    return format(dateObj, 'dd/MM/yyyy', { locale: require('date-fns/locale/ar-SA') });
  }
  
  return format(dateObj, 'MMM dd, yyyy');
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatCapacity(capacity: number, locale: string = 'en'): string {
  if (locale === 'ar') {
    return `${capacity} ضيوف`;
  }
  return `${capacity} Guests`;
}

export function formatArea(area: number, locale: string = 'en'): string {
  if (locale === 'ar') {
    return `${area} متر مربع`;
  }
  return `${area} sqm`;
}

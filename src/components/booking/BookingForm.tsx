'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';
import { Calendar, Users, Phone, Mail, User, MessageSquare } from 'lucide-react';
import type { Tent } from '@/types/tent';
import { useCreateBooking } from '@/lib/hooks/useBooking';
import { calculateNights, formatPrice } from '@/lib/utils/formatting';
import { hapticImpact } from '@/lib/capacitor/native';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DatePicker } from './DatePicker';

interface BookingFormProps {
  tent: Tent;
  locale?: string;
}

export function BookingForm({ tent, locale = 'en' }: BookingFormProps) {
  const router = useRouter();
  const createBooking = useCreateBooking();

  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  const [formData, setFormData] = useState({
    checkIn: today,
    checkOut: tomorrow,
    guests: tent.capacity <= 2 ? tent.capacity : 2,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const totalPrice = nights * tent.price_per_night;

  useEffect(() => {
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      setFormData((prev) => ({
        ...prev,
        checkOut: format(addDays(new Date(formData.checkIn), 1), 'yyyy-MM-dd'),
      }));
    }
  }, [formData.checkIn, formData.checkOut]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = locale === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    }

    if (!formData.guestEmail.trim()) {
      newErrors.guestEmail = locale === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guestEmail)) {
      newErrors.guestEmail = locale === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Invalid email';
    }

    if (!formData.guestPhone.trim()) {
      newErrors.guestPhone = locale === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone is required';
    }

    if (formData.guests < 1) {
      newErrors.guests = locale === 'ar' ? 'عدد الضيوف يجب أن يكون 1 على الأقل' : 'At least 1 guest required';
    }

    if (formData.guests > tent.capacity) {
      newErrors.guests = locale === 'ar'
        ? `الحد الأقصى ${tent.capacity} ضيوف`
        : `Maximum ${tent.capacity} guests`;
    }

    if (nights < tent.min_nights) {
      newErrors.checkOut = locale === 'ar'
        ? `الحد الأدنى ${tent.min_nights} ليالٍ`
        : `Minimum ${tent.min_nights} nights`;
    }

    if (nights > tent.max_nights) {
      newErrors.checkOut = locale === 'ar'
        ? `الحد الأقصى ${tent.max_nights} ليلة`
        : `Maximum ${tent.max_nights} nights`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await hapticImpact('medium');

    if (!validate()) {
      return;
    }

    try {
      await createBooking.mutateAsync({
        tent_id: tent.id,
        guest_name: formData.guestName,
        guest_email: formData.guestEmail,
        guest_phone: formData.guestPhone,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        nights,
        guests: formData.guests,
        total_price: totalPrice,
        special_requests: formData.specialRequests || undefined,
      });

      alert(
        locale === 'ar'
          ? 'تم إرسال حجزك بنجاح! سنتواصل معك قريباً.'
          : 'Booking submitted successfully! We will contact you soon.'
      );

      router.push('/');
    } catch (error) {
      alert(
        locale === 'ar'
          ? 'فشل في إنشاء الحجز. يرجى المحاولة مرة أخرى.'
          : 'Failed to create booking. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-desert-900 mb-6">
          {locale === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label={locale === 'ar' ? 'تاريخ الوصول' : 'Check-in Date'}
              value={formData.checkIn}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, checkIn: value }))
              }
              min={today}
              error={errors.checkIn}
            />

            <DatePicker
              label={locale === 'ar' ? 'تاريخ المغادرة' : 'Check-out Date'}
              value={formData.checkOut}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, checkOut: value }))
              }
              min={format(addDays(new Date(formData.checkIn), 1), 'yyyy-MM-dd')}
              error={errors.checkOut}
            />
          </div>

          <Input
            type="number"
            label={locale === 'ar' ? 'عدد الضيوف' : 'Number of Guests'}
            value={formData.guests}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                guests: parseInt(e.target.value) || 0,
              }))
            }
            min={1}
            max={tent.capacity}
            error={errors.guests}
          />

          <div className="bg-desert-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-desert-700">
                {locale === 'ar' ? `${nights} ليالٍ` : `${nights} nights`}
              </span>
              <span className="font-semibold text-desert-900">
                {formatPrice(tent.price_per_night * nights, locale)}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-desert-900">
                {locale === 'ar' ? 'المجموع' : 'Total'}
              </span>
              <span className="text-primary-600">
                {formatPrice(totalPrice, locale)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold text-desert-900 mb-6">
          {locale === 'ar' ? 'معلومات الضيف' : 'Guest Information'}
        </h2>

        <div className="space-y-4">
          <Input
            label={locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
            value={formData.guestName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, guestName: e.target.value }))
            }
            placeholder={locale === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
            error={errors.guestName}
          />

          <Input
            type="email"
            label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            value={formData.guestEmail}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, guestEmail: e.target.value }))
            }
            placeholder={locale === 'ar' ? 'email@example.com' : 'email@example.com'}
            error={errors.guestEmail}
          />

          <Input
            type="tel"
            label={locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
            value={formData.guestPhone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, guestPhone: e.target.value }))
            }
            placeholder={locale === 'ar' ? '+966 5x xxx xxxx' : '+966 5x xxx xxxx'}
            error={errors.guestPhone}
          />

          <div>
            <label className="block text-sm font-semibold text-desert-800 mb-2">
              {locale === 'ar' ? 'طلبات خاصة (اختياري)' : 'Special Requests (Optional)'}
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  specialRequests: e.target.value,
                }))
              }
              placeholder={
                locale === 'ar'
                  ? 'أي طلبات أو متطلبات خاصة...'
                  : 'Any special requests or requirements...'
              }
              rows={4}
              className="w-full rounded-lg border-2 border-desert-200 bg-white px-4 py-3 text-base text-desert-900 placeholder:text-desert-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={createBooking.isPending}
      >
        {createBooking.isPending
          ? locale === 'ar'
            ? 'جاري الإرسال...'
            : 'Submitting...'
          : locale === 'ar'
          ? 'تأكيد الحجز'
          : 'Confirm Booking'}
      </Button>
    </form>
  );
}

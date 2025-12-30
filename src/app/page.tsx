'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Award, Shield } from 'lucide-react';
import { useFeaturedTents } from '@/lib/hooks/useTents';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { TentGrid } from '@/components/tents/TentGrid';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const { data: featuredTents, isLoading } = useFeaturedTents();

  return (
    <div className="min-h-screen" dir="rtl">
      <VideoBackground
        src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d"
        poster="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1920&q=80"
        className="h-[70vh] md:h-screen"
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl animate-fade-in">
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight font-arabic">
                سمو البادية
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-primary-400 mb-6">
                Somou Al-Badia
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              اختبر الفخامة المطلقة في قلب الصحراء العربية.
              حيث يلتقي التراث مع الراحة الحديثة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog">
                <Button size="lg" className="w-full sm:w-auto">
                  استكشف الخيام
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-white hover:bg-white/20">
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </VideoBackground>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'تجربة فاخرة',
                description: 'خيام فاخرة بمرافق خمس نجوم',
              },
              {
                icon: MapPin,
                title: 'موقع متميز',
                description: 'مناظر صحراوية خلابة في أبو ظبي',
              },
              {
                icon: Award,
                title: 'حائز على جوائز',
                description: 'معترف به للتميز والجودة',
              },
              {
                icon: Shield,
                title: 'خدمة موثوقة',
                description: 'ضمان الرضا 100%',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-desert-50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-desert-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-desert-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-desert-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-desert-900 mb-4">
              الخيام المميزة
            </h2>
            <p className="text-xl text-desert-600 max-w-2xl mx-auto">
              اكتشف مجموعتنا المختارة من أماكن الإقامة الصحراوية الفاخرة
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-desert-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-desert-200 rounded" />
                    <div className="h-4 bg-desert-200 rounded w-2/3" />
                    <div className="h-8 bg-desert-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <TentGrid tents={featuredTents || []} />
          )}

          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button size="lg" variant="outline">
                عرض جميع الخيام
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-desert-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            هل أنت مستعد لتجربة لا تُنسى؟
          </h2>
          <p className="text-xl text-desert-300 mb-8 max-w-2xl mx-auto">
            احجز رحلتك الصحراوية الفاخرة اليوم واصنع ذكريات تدوم مدى الحياة
          </p>
          <Link href="/catalog">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
              احجز إقامتك الآن
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

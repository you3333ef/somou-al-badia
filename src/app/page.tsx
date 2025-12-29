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
    <div className="min-h-screen">
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
              Experience the ultimate luxury in the heart of the Arabian desert.
              Where tradition meets modern comfort.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Tents
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-white hover:bg-white/20">
                  Contact Us
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
                title: 'Luxury Experience',
                description: 'Premium tents with 5-star amenities',
              },
              {
                icon: MapPin,
                title: 'Prime Location',
                description: 'Breathtaking desert landscapes',
              },
              {
                icon: Award,
                title: 'Award Winning',
                description: 'Recognized for excellence',
              },
              {
                icon: Shield,
                title: 'Trusted Service',
                description: '100% satisfaction guaranteed',
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
              Featured Tents
            </h2>
            <p className="text-xl text-desert-600 max-w-2xl mx-auto">
              Discover our handpicked selection of luxury desert accommodations
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
                View All Tents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-desert-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl text-desert-300 mb-8 max-w-2xl mx-auto">
            Book your luxury desert escape today and create memories that last a
            lifetime
          </p>
          <Link href="/catalog">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
              Book Your Stay
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

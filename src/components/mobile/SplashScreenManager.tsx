'use client';

import { useEffect, useState } from 'react';
import { hideSplashScreen } from '@/lib/capacitor/native';

export function SplashScreenManager() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsReady(true);
      await hideSplashScreen();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isReady) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-desert-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-primary-500 text-6xl font-bold mb-4">
          سمو البادية
        </div>
        <div className="text-primary-500/80 text-2xl">
          Somou Al-Badia
        </div>
      </div>
    </div>
  );
}

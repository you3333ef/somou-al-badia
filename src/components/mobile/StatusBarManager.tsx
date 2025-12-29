'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { setupStatusBar } from '@/lib/capacitor/native';

export function StatusBarManager() {
  const pathname = usePathname();

  useEffect(() => {
    setupStatusBar('dark');
  }, [pathname]);

  return null;
}

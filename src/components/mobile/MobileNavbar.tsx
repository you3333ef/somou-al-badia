'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Grid3x3, GitCompare, Mail } from 'lucide-react';
import { hapticImpact } from '@/lib/capacitor/native';
import { useCompare } from '@/lib/hooks/useCompare';

export function MobileNavbar() {
  const pathname = usePathname();
  const { tents } = useCompare();

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: 'Home',
      labelAr: 'الرئيسية',
    },
    {
      href: '/catalog',
      icon: Grid3x3,
      label: 'Catalog',
      labelAr: 'الخيام',
    },
    {
      href: '/compare',
      icon: GitCompare,
      label: 'Compare',
      labelAr: 'مقارنة',
      badge: tents.length > 0 ? tents.length : undefined,
    },
    {
      href: '/contact',
      icon: Mail,
      label: 'Contact',
      labelAr: 'اتصل',
    },
  ];

  const handleClick = async () => {
    await hapticImpact('light');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-desert-200 pb-safe-bottom md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleClick}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                isActive
                  ? 'text-primary-600'
                  : 'text-desert-500 active:text-primary-500'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

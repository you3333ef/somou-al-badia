import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { MobileNavbar } from '@/components/mobile/MobileNavbar';
import { StatusBarManager } from '@/components/mobile/StatusBarManager';
import { SplashScreenManager } from '@/components/mobile/SplashScreenManager';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'سمو البادية - تخييم صحراوي فاخر',
  description:
    'اختبر تجربة التخييم الصحراوي الفاخر في الإمارات العربية المتحدة. احجز خيمتك الحصرية في قلب الصحراء.',
  keywords: 'تخييم صحراوي، خيام فاخرة، الإمارات، أبو ظبي، جلامبينج، منتجع صحراوي',
  authors: [{ name: 'Somou Al-Badia' }],
  openGraph: {
    title: 'سمو البادية - تخييم صحراوي فاخر',
    description: 'اختبر تجربة التخييم الصحراوي الفاخر في الإمارات العربية المتحدة',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1A1410',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased touch-manipulation">
        <QueryProvider>
          <StatusBarManager />
          <SplashScreenManager />
          
          <main className="min-h-screen pb-20 md:pb-0">
            {children}
          </main>
          
          <MobileNavbar />
        </QueryProvider>
      </body>
    </html>
  );
}

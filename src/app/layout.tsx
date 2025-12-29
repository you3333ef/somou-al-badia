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
  title: 'Somou Al-Badia - Luxury Desert Camping',
  description:
    'Experience the ultimate luxury desert camping in Saudi Arabia. Book your exclusive tent in the heart of the desert.',
  keywords: 'desert camping, luxury tents, Saudi Arabia, glamping, desert resort',
  authors: [{ name: 'Somou Al-Badia' }],
  openGraph: {
    title: 'Somou Al-Badia - Luxury Desert Camping',
    description: 'Experience the ultimate luxury desert camping in Saudi Arabia',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
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

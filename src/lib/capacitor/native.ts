'use client';

import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Share } from '@capacitor/share';
import { isNative } from './platform';

export async function setupStatusBar(style: 'light' | 'dark' = 'dark') {
  if (!isNative()) return;

  try {
    await StatusBar.setStyle({
      style: style === 'light' ? Style.Light : Style.Dark,
    });

    await StatusBar.setBackgroundColor({
      color: style === 'dark' ? '#1A1410' : '#FFFFFF',
    });
  } catch (error) {
    console.error('Failed to setup status bar:', error);
  }
}

export async function hideSplashScreen() {
  if (!isNative()) return;

  try {
    await SplashScreen.hide();
  } catch (error) {
    console.error('Failed to hide splash screen:', error);
  }
}

export async function hapticImpact(style: 'light' | 'medium' | 'heavy' = 'medium') {
  if (!isNative()) return;

  try {
    const impactStyle =
      style === 'light'
        ? ImpactStyle.Light
        : style === 'heavy'
        ? ImpactStyle.Heavy
        : ImpactStyle.Medium;

    await Haptics.impact({ style: impactStyle });
  } catch (error) {
    console.error('Failed to trigger haptic:', error);
  }
}

export async function shareTent(tentName: string, tentUrl: string) {
  if (!isNative()) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tentName,
          text: `Check out ${tentName} at Somou Al-Badia`,
          url: tentUrl,
        });
        return true;
      } catch (error) {
        console.error('Web share failed:', error);
        return false;
      }
    }
    return false;
  }

  try {
    await Share.share({
      title: tentName,
      text: `Check out ${tentName} at Somou Al-Badia`,
      url: tentUrl,
      dialogTitle: 'Share Tent',
    });
    return true;
  } catch (error) {
    console.error('Failed to share:', error);
    return false;
  }
}

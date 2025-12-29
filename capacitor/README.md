# Capacitor Assets

This directory will contain the Android and iOS native projects after running:

```bash
npm run capacitor:add:android
npm run capacitor:add:ios
```

## Required Assets

Before building the mobile app, you need to provide:

### App Icon (resources/icon.png)
- Size: 1024x1024 px
- Format: PNG with transparency
- This will be automatically resized for all platforms

### Splash Screen (resources/splash.png)
- Size: 2732x2732 px
- Format: PNG
- Center your logo/design in a 1200x1200 px safe zone

### Adaptive Icon (Android only - resources/icon-foreground.png)
- Size: 1024x1024 px
- Format: PNG with transparency
- For Android adaptive icons

## Generate Platform Assets

After placing your assets in the `resources/` folder:

```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate
```

This will automatically generate all required icon and splash screen sizes.

## Manual Asset Placement

If you prefer manual setup:

### Android
- Place icons in `android/app/src/main/res/`
  - mipmap-hdpi
  - mipmap-mdpi
  - mipmap-xhdpi
  - mipmap-xxhdpi
  - mipmap-xxxhdpi

### iOS
- Place icons in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- Configure in Xcode after opening the project

## Brand Colors

**Primary Gold:** #D4AF37
**Desert Dark:** #1A1410

Use these colors for splash screen background and status bar styling.

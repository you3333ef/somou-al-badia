# 🚀 Somou Al-Badia - Complete Setup Guide

Step-by-step instructions to get your luxury desert tent booking app running on web and mobile.

---

## ✅ Phase 1: Initial Setup (15 minutes)

### Step 1: Install Dependencies

```bash
cd somou-al-badia
npm install
```

### Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name:** Somou Al-Badia
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to Saudi Arabia
4. Wait for project to initialize (~2 minutes)

### Step 3: Set Up Database

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy content from `src/lib/supabase/schema.sql` and paste
4. Click "Run"
5. Create another new query
6. Copy content from `src/lib/supabase/seed.sql` and paste
7. Click "Run"

### Step 4: Configure Environment Variables

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL**
   - **anon/public key**

3. Create `.env.local` file in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-webhook-url (optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**You should see the home page with 3 featured tents!**

---

## ✅ Phase 2: n8n Webhook Setup (Optional, 10 minutes)

### Option A: Use n8n Cloud

1. Sign up at [n8n.io](https://n8n.io)
2. Create a new workflow
3. Add "Webhook" trigger node
4. Set to POST method
5. Copy the webhook URL
6. Add your notification nodes (Email, SMS, Slack, etc.)
7. Paste webhook URL into `.env.local` as `NEXT_PUBLIC_N8N_WEBHOOK_URL`

### Option B: Self-Host n8n

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Then follow Option A steps in the UI at `http://localhost:5678`

### Booking Webhook Payload

When a booking is submitted, the app sends:

```json
{
  "booking_id": "uuid",
  "tent_name": "Royal Desert Palace",
  "tent_category": "royal",
  "guest_name": "John Doe",
  "guest_email": "john@example.com",
  "guest_phone": "+966501234567",
  "check_in": "2024-03-01",
  "check_out": "2024-03-03",
  "nights": 2,
  "guests": 4,
  "total_price": 7000,
  "special_requests": "Early check-in",
  "created_at": "2024-02-28T10:00:00Z"
}
```

---

## ✅ Phase 3: Mobile Setup - Android (20 minutes)

### Prerequisites

- Install [Android Studio](https://developer.android.com/studio)
- Install Android SDK (API 33+)

### Step 1: Build Next.js Static Export

```bash
npm run build
```

This creates the `out/` folder with your static site.

### Step 2: Add Android Platform

```bash
npm run capacitor:add:android
```

This creates `capacitor/android/` folder.

### Step 3: Sync Web Build to Android

```bash
npm run capacitor:sync:android
```

### Step 4: Open in Android Studio

```bash
npm run capacitor:open:android
```

### Step 5: Run on Device/Emulator

In Android Studio:
1. Wait for Gradle sync to complete
2. Select a device from the dropdown:
   - Physical device (enable USB debugging)
   - Or create an emulator (Tools → Device Manager)
3. Click the green "Run" button
4. App will install and launch!

### Troubleshooting Android

**Error: "SDK location not found"**
```bash
# Create local.properties in android/ folder
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

**Gradle build fails**
- Update Android Gradle Plugin in Android Studio
- Sync project with Gradle files

---

## ✅ Phase 4: Mobile Setup - iOS (macOS only, 20 minutes)

### Prerequisites

- macOS computer
- Install [Xcode](https://apps.apple.com/app/xcode/id497799835) from App Store
- Xcode Command Line Tools: `xcode-select --install`

### Step 1: Build Next.js Static Export

```bash
npm run build
```

### Step 2: Add iOS Platform

```bash
npm run capacitor:add:ios
```

This creates `capacitor/ios/` folder.

### Step 3: Sync Web Build to iOS

```bash
npm run capacitor:sync:ios
```

### Step 4: Open in Xcode

```bash
npm run capacitor:open:ios
```

### Step 5: Run on Simulator/Device

In Xcode:
1. Select a simulator from the dropdown (e.g., iPhone 15 Pro)
2. Click the "Play" button
3. App will build and launch!

### For Real Device Testing

1. Connect iPhone/iPad via USB
2. In Xcode, select your device
3. Click "Play"
4. On device, trust your developer certificate:
   - Settings → General → Device Management
   - Trust your Apple ID

### Troubleshooting iOS

**"No provisioning profile"**
- Add your Apple ID in Xcode → Settings → Accounts
- Select your team in Signing & Capabilities

**"Module not found"**
- Clean build folder: Product → Clean Build Folder
- Rebuild

---

## ✅ Phase 5: Customization

### Update App Branding

1. **App Name:**
   - Edit `capacitor.config.ts` → `appName`

2. **App ID (Bundle Identifier):**
   - Edit `capacitor.config.ts` → `appId`
   - Format: `com.yourcompany.appname`

3. **App Icon:**
   - Place 1024x1024 PNG in `capacitor/resources/icon.png`
   - Run: `npx capacitor-assets generate`

4. **Splash Screen:**
   - Place 2732x2732 PNG in `capacitor/resources/splash.png`
   - Run: `npx capacitor-assets generate`

5. **Colors:**
   - Edit `tailwind.config.ts` for custom color palette
   - Edit `capacitor.config.ts` → `SplashScreen.backgroundColor`

### Add Your Own Tents

Option 1: **Supabase Dashboard**
1. Go to Table Editor → `tents`
2. Click "Insert Row"
3. Fill in all fields (use Unsplash URLs for images)

Option 2: **SQL Insert**
```sql
INSERT INTO tents (name_en, name_ar, slug, description_en, description_ar, category, capacity, area_sqm, price_per_night, features_en, features_ar, amenities_en, amenities_ar, images) 
VALUES (
  'Your Tent Name',
  'اسم خيمتك',
  'your-tent-slug',
  'Description in English',
  'الوصف بالعربية',
  'luxury',
  8,
  150.00,
  2000.00,
  ARRAY['Feature 1', 'Feature 2'],
  ARRAY['ميزة 1', 'ميزة 2'],
  ARRAY['WiFi', 'AC'],
  ARRAY['واي فاي', 'تكييف'],
  ARRAY['https://images.unsplash.com/photo-...]
);
```

---

## ✅ Phase 6: Going Live

### Web Deployment

**Option 1: Vercel**
```bash
npm install -g vercel
vercel
```

**Option 2: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

**Option 3: Static Hosting**
- Upload `out/` folder to any static host
- Configure with your domain

### Mobile App Stores

**Android (Google Play)**
1. In Android Studio: Build → Generate Signed Bundle/APK
2. Create a keystore file
3. Upload AAB to [Google Play Console](https://play.google.com/console)

**iOS (App Store)**
1. In Xcode: Product → Archive
2. Distribute to App Store
3. Upload to [App Store Connect](https://appstoreconnect.apple.com)

---

## 🎯 Quick Reference Commands

```bash
# Development
npm run dev                    # Start dev server

# Build
npm run build                  # Build static export

# Mobile
npm run mobile:build           # Build + sync to native
npm run capacitor:open:android # Open Android Studio
npm run capacitor:open:ios     # Open Xcode

# Add platforms (first time)
npm run capacitor:add:android
npm run capacitor:add:ios
```

---

## 📞 Support

**Common Issues:**

1. **Images not loading in mobile**
   - Check `next.config.ts` has `unoptimized: true`

2. **Supabase connection error**
   - Verify `.env.local` credentials
   - Check Supabase project is active

3. **Capacitor sync fails**
   - Delete `capacitor/android` or `capacitor/ios`
   - Re-run `capacitor:add` command

4. **Native features not working**
   - Ensure you're testing on a real device or simulator
   - Check Capacitor plugin installation

---

## ✨ You're All Set!

Your luxury desert tent booking platform is now running on:
- ✅ Web browser
- ✅ Android devices
- ✅ iOS devices

**Next Steps:**
1. Customize with your branding
2. Add your real tent inventory
3. Test booking flow
4. Deploy to production
5. Submit to app stores

Enjoy building with **Somou Al-Badia**! 🏜️✨

# Somou Al-Badia (سمو البادية)

A luxury desert tent booking platform built as a **cross-platform application** using Next.js 15 + Capacitor 6. Works seamlessly on Web, Android, and iOS.

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router, Static Export)
- **Mobile Engine:** Capacitor 6
- **UI:** Tailwind CSS + Custom Components
- **Backend:** Supabase (PostgreSQL)
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query (with offline support)
- **Automation:** n8n Webhooks
- **Native Features:** Status Bar, Splash Screen, Haptics, Share

## 📋 Prerequisites

- Node.js 20.x or higher
- npm, yarn, or bun
- **For Android:** Android Studio
- **For iOS:** Xcode (macOS only)
- Supabase account
- n8n instance (optional, for webhook automation)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### 2. Environment Setup

Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Supabase Setup

1. Create a new Supabase project
2. Run the SQL schema in Supabase SQL Editor:
   - Execute `src/lib/supabase/schema.sql`
   - Execute `src/lib/supabase/seed.sql` (optional, for sample data)
3. Copy your project URL and anon key to `.env.local`

### 4. Development

#### Web Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

#### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

### 5. Mobile Development

#### Initialize Capacitor (First Time Only)

The project is pre-configured with `capacitor.config.ts`. Add platforms:

```bash
# Add Android
npm run capacitor:add:android

# Add iOS (macOS only)
npm run capacitor:add:ios
```

#### Sync Web Build with Native Projects

After making changes to the web app:

```bash
npm run mobile:build
```

This command:
1. Builds the Next.js static export
2. Syncs the `out/` folder to native projects

#### Open Native IDEs

**Android:**
```bash
npm run capacitor:open:android
```

Then in Android Studio:
- Connect a device or start an emulator
- Click "Run" to install and launch the app

**iOS:**
```bash
npm run capacitor:open:ios
```

Then in Xcode:
- Select a simulator or connected device
- Click "Run" to install and launch the app

#### Quick Run Commands

```bash
# Build and run on Android
npm run mobile:run:android

# Build and run on iOS
npm run mobile:run:ios
```

## 📱 Native Features

### Status Bar
- Automatically styled based on the current page
- Dark theme with gold accent color

### Splash Screen
- Custom splash screen with app branding
- Auto-hides after 2 seconds

### Haptics
- Tactile feedback on buttons and interactions
- Light, medium, and heavy impact styles

### Share
- Native share functionality for tents
- Falls back to Web Share API on web

## 🗂️ Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Home page
│   ├── catalog/              # Tent catalog
│   ├── tent/[slug]/          # Individual tent details
│   ├── booking/[id]/         # Booking form
│   ├── compare/              # Tent comparison
│   └── contact/              # Contact page
├── components/
│   ├── mobile/               # Mobile-specific components
│   ├── tents/                # Tent-related components
│   ├── booking/              # Booking components
│   └── ui/                   # Base UI components
├── lib/
│   ├── supabase/             # Database client & queries
│   ├── hooks/                # React Query hooks
│   ├── capacitor/            # Native feature helpers
│   ├── n8n/                  # Webhook integration
│   └── utils/                # Utility functions
└── types/                    # TypeScript type definitions
```

## 🎨 Key Features

### Offline-First
- React Query with persistent cache
- Tent data cached for 10 minutes
- Stale-while-revalidate strategy

### Mobile-Optimized UI
- Bottom tab navigation
- Touch-friendly buttons (44x44px minimum)
- Smooth transitions and animations
- iOS `playsinline` video support

### Comparison System
- Compare up to 3 tents side-by-side
- Persistent state with Zustand
- Add/remove tents from catalog

### Booking Flow
- Date picker with availability check
- Guest information form
- Real-time price calculation
- n8n webhook integration

## 🔧 Configuration

### Next.js Config (`next.config.ts`)
- **Static Export:** `output: 'export'` (required for Capacitor)
- **Unoptimized Images:** `images: { unoptimized: true }`
- **Trailing Slash:** `trailingSlash: true`

### Capacitor Config (`capacitor.config.ts`)
- **App ID:** `com.somoalbadia.app`
- **Web Dir:** `out` (Next.js static export)
- **Plugins:** Status Bar, Splash Screen, Keyboard, Haptics, Share

### Tailwind Config
- Custom desert and gold color palette
- Mobile-first breakpoints
- Safe area inset utilities

## 📊 Database Schema

### Tables
- **tents:** Luxury tent listings
- **bookings:** Guest reservations
- **reviews:** Tent reviews
- **availability:** Date-based availability calendar

### Row Level Security (RLS)
- Public read access for tents and approved reviews
- Public insert access for bookings
- Server-side validation recommended

## 🔗 n8n Webhook Integration

The app sends booking data to an n8n webhook for automation:

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

Use this to trigger email notifications, SMS, CRM updates, etc.

## 🌍 Internationalization (Future)

The app is architected for bilingual support (English/Arabic):
- Database has `*_en` and `*_ar` fields
- UI components accept `locale` prop
- Ready for i18n library integration

## 🚢 Deployment

### Web
Deploy the `out/` folder to any static hosting:
- Vercel (with `output: 'export'`)
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

### Mobile App Stores

**Android (Google Play):**
1. Build signed APK/AAB in Android Studio
2. Upload to Google Play Console

**iOS (App Store):**
1. Archive and sign in Xcode
2. Upload to App Store Connect

## 📦 Build for Production

```bash
# Build web app
npm run build

# Sync to native projects
npm run mobile:build

# Open Android Studio to create release build
npm run capacitor:open:android

# Open Xcode to create release build
npm run capacitor:open:ios
```

## 🐛 Troubleshooting

### Images not loading in mobile app
- Ensure `images: { unoptimized: true }` in `next.config.ts`
- Check that image URLs are absolute (https://)

### Video not playing on iOS
- Verify `playsinline` attribute on `<video>` tag
- Use MP4 format with H.264 codec

### Capacitor sync errors
- Delete `capacitor/android` and `capacitor/ios` folders
- Re-run `npm run capacitor:add:android` or `npm run capacitor:add:ios`

### Supabase connection issues
- Verify `.env.local` has correct credentials
- Check Supabase project is active
- Ensure RLS policies are set correctly

## 📄 License

Private project - All rights reserved.

## 👨‍💻 Development Notes

- Always run `npm run mobile:build` after code changes
- Test on real devices for accurate haptics and native features
- Use Chrome DevTools for mobile debugging (chrome://inspect)
- iOS requires macOS for development

## 🎯 Next Steps

1. Set up your Supabase project
2. Configure environment variables
3. Run database migrations
4. Test on web (`npm run dev`)
5. Add mobile platforms and test on devices
6. Customize branding and content
7. Deploy to production

---

**Built with ❤️ for the Arabian Desert**

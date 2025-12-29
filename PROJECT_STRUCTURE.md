# Somou Al-Badia - Project Structure

```
somou-al-badia/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with mobile optimizations
│   │   ├── page.tsx                      # Home page (Hero + Featured Tents)
│   │   ├── catalog/
│   │   │   └── page.tsx                  # Full tent catalog with filters
│   │   ├── tent/
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Individual tent detail page
│   │   ├── compare/
│   │   │   └── page.tsx                  # Side-by-side tent comparison
│   │   ├── booking/
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Booking form
│   │   ├── contact/
│   │   │   └── page.tsx                  # Contact page
│   │   └── api/
│   │       └── webhook/
│   │           └── route.ts              # n8n webhook proxy
│   ├── components/
│   │   ├── mobile/
│   │   │   ├── MobileNavbar.tsx          # Bottom tab navigation
│   │   │   ├── StatusBarManager.tsx      # Capacitor status bar control
│   │   │   └── SplashScreenManager.tsx   # Capacitor splash screen
│   │   ├── tents/
│   │   │   ├── TentCard.tsx              # Touch-optimized tent card
│   │   │   ├── TentGrid.tsx              # Responsive grid layout
│   │   │   ├── TentDetails.tsx           # Full tent information
│   │   │   └── TentCompareCard.tsx       # Comparison view card
│   │   ├── booking/
│   │   │   ├── BookingForm.tsx           # Multi-step booking form
│   │   │   └── DatePicker.tsx            # Mobile-friendly date picker
│   │   ├── ui/
│   │   │   ├── Button.tsx                # Touch-friendly buttons
│   │   │   ├── Card.tsx                  # Base card component
│   │   │   ├── Input.tsx                 # Form inputs
│   │   │   └── VideoBackground.tsx       # HTML5 video with playsinline
│   │   └── layout/
│   │       ├── Header.tsx                # Top header (desktop)
│   │       └── Footer.tsx                # Footer
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Supabase client initialization
│   │   │   ├── queries.ts                # Data fetching functions
│   │   │   └── schema.sql                # Database schema
│   │   ├── hooks/
│   │   │   ├── useTents.ts               # React Query hooks for tents
│   │   │   ├── useBooking.ts             # Booking mutation hook
│   │   │   └── useCompare.ts             # Comparison state hook
│   │   ├── capacitor/
│   │   │   ├── native.ts                 # Native feature helpers
│   │   │   └── platform.ts               # Platform detection
│   │   ├── n8n/
│   │   │   └── webhook.ts                # n8n webhook client
│   │   └── utils/
│   │       ├── formatting.ts             # Price, date formatting
│   │       └── validation.ts             # Form validation
│   ├── types/
│   │   ├── tent.ts                       # Tent type definitions
│   │   └── booking.ts                    # Booking type definitions
│   └── styles/
│       └── globals.css                   # Tailwind + custom styles
├── public/
│   ├── videos/
│   │   └── hero-desert.mp4               # Background video
│   └── images/
│       └── logo.png                      # App logo
├── capacitor/
│   ├── android/                          # Android project (generated)
│   ├── ios/                              # iOS project (generated)
│   └── resources/
│       ├── icon.png                      # App icon (1024x1024)
│       ├── splash.png                    # Splash screen (2732x2732)
│       └── icon-foreground.png           # Adaptive icon (Android)
├── next.config.ts                        # Next.js config (STATIC EXPORT)
├── capacitor.config.ts                   # Capacitor configuration
├── tailwind.config.ts                    # Tailwind with mobile-first
├── tsconfig.json                         # TypeScript config
├── package.json                          # Dependencies
├── .env.local                            # Environment variables
└── README.md                             # Setup instructions

## Key Architectural Decisions

### 1. Static Export Strategy
- `output: 'export'` in next.config.ts enables Capacitor compatibility
- No server-side rendering; all data fetching happens client-side
- Images use `unoptimized: true` to work without optimization server

### 2. Mobile-First Navigation
- Bottom tab bar for primary navigation (Home, Catalog, Compare, Contact)
- Large touch targets (minimum 44x44px)
- Native-feeling transitions using CSS transforms

### 3. Offline-First Data
- React Query with persistent cache
- Prefetch tent data on app load
- Stale-while-revalidate strategy for smooth UX

### 4. Native Integration
- Status Bar API for branded experience
- Splash Screen API for smooth startup
- Share API for tent sharing
- Haptics API for tactile feedback

### 5. Video Optimization
- `playsinline` attribute prevents iOS fullscreen
- Autoplay with muted audio
- Fallback to static image on slow connections

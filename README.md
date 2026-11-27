# A2B Rides / HopRide / GrokRide - Rider App

Premium local ride-hailing platform focused on NW Ohio. Riders can place **instant** or **scheduled** ride orders.

## Tech Stack
- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **Supabase** (Auth, Postgres + PostGIS, Realtime)
- **Capacitor** ready for native iOS/Android (wrap the same codebase)
- Black / Gold / Holographic branding

## Features (MVP)
- Instant ride requests
- Scheduled rides (date + time picker)
- Magic link authentication
- Ride estimate placeholder
- Clean black/gold UI optimized for mobile
- Supabase schema with RLS, PostGIS, driver locations, ride status flow

## Quick Start

1. **Clone & install**
   ```bash
   npm install
   ```

2. **Environment**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Database**
   - Create a Supabase project
   - Run `supabase/schema.sql` in the SQL Editor
   - Enable Realtime on `rides` and `driver_locations` tables

4. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Next Steps (from skill roadmap)
- [ ] Real Google Maps / Mapbox autocomplete + current location
- [ ] Live driver matching + Supabase Realtime tracking
- [ ] Stripe payments + Connect for driver payouts
- [ ] Driver app screens (accept ride, navigation, status updates)
- [ ] Admin dashboard (live map, user management)
- [ ] Capacitor build for App Store / Google Play
- [ ] Push notifications
- [ ] Surge pricing
- [ ] Tesla fleet integration

## Deployment
- Web: Vercel (recommended)
- Marketing site: Keep on GoDaddy
- Mobile: Capacitor → TestFlight / Play Console

**Service areas**: Toledo, Perrysburg, Findlay, Fremont, Tiffin, Maumee, Holland, and surrounding NW Ohio / SE Michigan.

Built driver-first. Premium for riders. Local by design.

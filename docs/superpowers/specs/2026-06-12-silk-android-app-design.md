# Silk Android App Design

**Goal:** Build an Expo/React Native Android app for Silk Beauty Salon that mirrors the existing Next.js site content and core workflows.

**Source website:** `H:\silk websites\silk-beauty-salon-ALL-FEATURES-COMPLETE\silk-beauty-salon`

**Approved input:** `H:\silk websites\goal Create a complete Android app for Silk.docx`

## Scope

The app will be created in `silk-beauty-app/` using Expo managed workflow and TypeScript. It will include the requested screens: Home, Treatments, Skin Conditions, Team, International Clients, FAQ, Contact, and Booking.

The source website does not contain the exact files named in the goal document (`src/data/site-config.ts`, `src/data/conditions.ts`, or `public/images/`). The equivalent source content is:

- Salon metadata and business hours: `lib/constants.ts` and `metadata.json`
- Treatments and categories: `lib/treatments.ts`
- Skin condition logic/content: `components/interactive/SkinAnalysis.tsx`
- Team bios: `components/sections/TeamSection.tsx`
- International client data and FAQ structure: `app/[locale]/international/InternationalClient.tsx` and `messages/*.json`
- Translations: `messages/*.json`
- Static assets: `public/logo.svg`; the site otherwise uses remote Unsplash images

## Architecture

The app will use a bottom-tab navigator for the main areas and a native stack for treatment detail screens. Static content will be bundled as TypeScript/JSON data so it works offline. The booking workflow will keep API access in a small service module that supports GET `/api/bookings?date=YYYY-MM-DD` and POST `/api/bookings`.

## Data Flow

The app loads the device locale through `react-native-localize`, falls back to English, and lets the user switch language manually. Treatment, team, contact, FAQ, and international content is imported from bundled local data. Booking availability is fetched from the configured API base URL and filtered against generated business-hour time slots.

## Error Handling

Booking validation blocks missing/invalid name, email, phone, service, date, and time values before any network request. API failures show readable inline messages and preserve form input. Slot conflicts and rate-limit style responses are surfaced from the server response when available.

## Testing

Pure booking logic will be covered with Vitest before implementation:

- Generates business-hour slots from salon hours
- Filters booked slots returned by the API
- Validates required booking fields and email/date formats
- Builds the same booking payload schema used by the API

Verification will include `npm test`, `npm run type-check`, Expo bundling/export, and an Android build attempt. Local APK/AAB generation depends on Java and Android SDK availability; if unavailable, the app will still be verified through Expo/TypeScript and the exact missing local build prerequisite will be reported.

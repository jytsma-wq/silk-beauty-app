# Silk Android App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a working Expo Android app for Silk Beauty Salon using the existing website content and booking API contract.

**Architecture:** Expo TypeScript app in `silk-beauty-app/` with React Navigation, bundled local data, i18next translations, and isolated booking validation/API utilities.

**Tech Stack:** Expo, React Native, TypeScript, React Navigation, Axios, i18next, react-native-localize, Vitest.

---

### Task 1: Scaffold Expo Project

**Files:**
- Create: `silk-beauty-app/`
- Modify: `silk-beauty-app/package.json`

- [ ] Create Expo TypeScript project with `npx create-expo-app silk-beauty-app --template blank-typescript`.
- [ ] Install app dependencies: React Navigation, Axios, i18next, react-native-localize, AsyncStorage, Expo localization helpers, and test tooling.
- [ ] Add scripts: `test`, `type-check`, `export:android`.

### Task 2: Write Booking Tests First

**Files:**
- Create: `silk-beauty-app/src/utils/booking.test.ts`
- Create: `silk-beauty-app/src/utils/booking.ts`

- [ ] Add tests for business-hour slot generation, booked slot filtering, booking form validation, and payload construction.
- [ ] Run `npm test -- --run src/utils/booking.test.ts` and verify failure because implementation is missing.
- [ ] Implement `src/utils/booking.ts`.
- [ ] Run the same test and verify it passes.

### Task 3: Port Source Website Data

**Files:**
- Create: `silk-beauty-app/src/data/salon.ts`
- Create: `silk-beauty-app/src/data/treatments.ts`
- Create: `silk-beauty-app/src/data/team.ts`
- Create: `silk-beauty-app/src/data/conditions.ts`
- Create: `silk-beauty-app/src/data/international.ts`
- Create: `silk-beauty-app/src/messages/*.json`

- [ ] Copy salon info and hours from `lib/constants.ts`.
- [ ] Copy treatments and categories from `lib/treatments.ts`.
- [ ] Copy team bios from `components/sections/TeamSection.tsx`.
- [ ] Derive condition cards from `components/interactive/SkinAnalysis.tsx`.
- [ ] Copy international pricing/logistics/FAQ content from `InternationalClient.tsx` and `messages/*.json`.

### Task 4: Build App Shell and Localization

**Files:**
- Modify: `silk-beauty-app/App.tsx`
- Create: `silk-beauty-app/src/i18n/index.ts`
- Create: `silk-beauty-app/src/theme.ts`
- Create: `silk-beauty-app/src/types.ts`

- [ ] Configure i18next resources and locale detection.
- [ ] Add bottom tabs and treatment stack navigation.
- [ ] Add a reusable language switcher.
- [ ] Apply a Silk visual system inspired by the site: ivory backgrounds, teal accents, warm gold highlights, compact cards, and readable mobile spacing.

### Task 5: Implement Content Screens

**Files:**
- Create: `silk-beauty-app/src/screens/HomeScreen.tsx`
- Create: `silk-beauty-app/src/screens/TreatmentsScreen.tsx`
- Create: `silk-beauty-app/src/screens/TreatmentDetailScreen.tsx`
- Create: `silk-beauty-app/src/screens/ConditionsScreen.tsx`
- Create: `silk-beauty-app/src/screens/TeamScreen.tsx`
- Create: `silk-beauty-app/src/screens/InternationalScreen.tsx`
- Create: `silk-beauty-app/src/screens/FaqScreen.tsx`
- Create: `silk-beauty-app/src/screens/ContactScreen.tsx`

- [ ] Render all requested content from local data.
- [ ] Include contact info, hours, team qualifications, international logistics, and FAQ entries.
- [ ] Ensure scrollable screens remain usable on Android-sized viewports.

### Task 6: Implement Booking Workflow

**Files:**
- Create: `silk-beauty-app/src/api/bookings.ts`
- Create: `silk-beauty-app/src/screens/BookingScreen.tsx`

- [ ] Fetch booked slots with `GET /api/bookings?date=YYYY-MM-DD`.
- [ ] Filter slots according to business hours and booked API response.
- [ ] Submit with `POST /api/bookings` using name, email, phone, service, date, time, and message.
- [ ] Show validation, loading, success, slot conflict, and network error states.

### Task 7: Verify and Build

**Files:**
- Modify if needed based on verification failures.

- [ ] Run `npm test -- --run`.
- [ ] Run `npm run type-check`.
- [ ] Run `npm run export:android`.
- [ ] Attempt Android package build through Expo prebuild/Gradle or EAS local build if Java/Android SDK are available.
- [ ] Commit the completed app.

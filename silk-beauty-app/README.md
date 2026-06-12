# Silk Beauty Android App

Expo React Native app for Silk Beauty Salon in Batumi.

## Features

- Home, treatments, treatment details, skin conditions, team, international clients, FAQ, contact, and booking screens.
- Static salon content copied from the existing Silk website source.
- Locale detection with manual switching for English, Georgian, Russian, Turkish, Arabic, and Hebrew.
- Offline-tolerant static content with graceful booking API fallback.
- Booking flow that reads unavailable slots with `GET /api/bookings?date=YYYY-MM-DD` and submits bookings with `POST /api/bookings`.

## Commands

```powershell
npm install
npm run type-check
npm test -- --run
npm run export:android
```

For a local debug APK:

```powershell
npx expo prebuild --platform android --no-install --clean
cd android
.\gradlew.bat assembleDebug
```

On Windows, build from a short path such as `C:\s\silk` if Gradle/CMake reports paths longer than 260 characters.

The verified debug APK from this workspace build was copied to:

```text
silk-beauty-app/build-artifacts/silk-beauty-debug.apk
```

That artifact directory is ignored by git.

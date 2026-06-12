# Silk Website APK Download Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Silk Beauty Salon Android app downloadable from the customer website using a signed EAS-generated APK.

**Architecture:** Add an EAS `internal` APK build profile to the Expo project, then expose the final APK URL through a shared website data module consumed by a localized download page. Navigation changes are limited to header/footer arrays and all generated artifacts remain out of git unless a verified release APK is intentionally hosted under `public/apk`.

**Tech Stack:** Expo SDK 56, EAS CLI 20, Next.js 16, next-intl messages, Node built-in test runner, TypeScript.

---

### Task 1: EAS APK Build Profile

**Files:**
- Create: `silk-beauty-app/eas.json`
- Modify: `silk-beauty-app/README.md`

- [ ] **Step 1: Add `eas.json`**

Create an EAS config with an `internal` Android profile:

```json
{
  "cli": {
    "version": ">=20.1.0",
    "appVersionSource": "remote"
  },
  "build": {
    "internal": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_API_BASE_URL": "https://silkbeautybatumi.ge"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

- [ ] **Step 2: Document the EAS command**

Add the command `npx eas-cli build -p android --profile internal --non-interactive` and note that it requires Expo auth via `eas login` or `EXPO_TOKEN`.

- [ ] **Step 3: Verify config shape**

Run: `node -e "const e=require('./eas.json'); if(e.build.internal.android.buildType!=='apk') process.exit(1); console.log('internal APK profile configured')"`

Expected: prints `internal APK profile configured`.

### Task 2: Download Metadata TDD

**Files:**
- Create: `H:/silk websites/silk-beauty-salon-ALL-FEATURES-COMPLETE/silk-beauty-salon/lib/mobile-app-download.ts`
- Create: `H:/silk websites/silk-beauty-salon-ALL-FEATURES-COMPLETE/silk-beauty-salon/lib/mobile-app-download.test.ts`
- Modify: `H:/silk websites/silk-beauty-salon-ALL-FEATURES-COMPLETE/silk-beauty-salon/package.json`

- [ ] **Step 1: Write failing test**

Create a Node test that imports `mobile-app-download.ts`, expects `androidApkUrl` to end in `.apk`, expects `androidApkFileName` to be `silk-beauty-salon.apk`, and expects at least three install steps.

- [ ] **Step 2: Run red test**

Run: `node --experimental-strip-types --test lib/mobile-app-download.test.ts`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement metadata module**

Export:

```ts
export const androidApkFileName = 'silk-beauty-salon.apk';
export const androidApkUrl = process.env.NEXT_PUBLIC_ANDROID_APK_URL || `/apk/${androidApkFileName}`;
export const androidInstallSteps = [
  'Download the APK on your Android phone.',
  'When Android asks, allow your browser or file manager to install unknown apps.',
  'Open the downloaded file and tap Install.',
];
```

- [ ] **Step 4: Run green test**

Run: `node --experimental-strip-types --test lib/mobile-app-download.test.ts`

Expected: PASS.

### Task 3: Website Download Page and Navigation

**Files:**
- Create: `H:/silk websites/silk-beauty-salon-ALL-FEATURES-COMPLETE/silk-beauty-salon/app/[locale]/download/page.tsx`
- Modify: `H:/silk websites/silk-beauty-salon-ALL-FEATURES-COMPLETE/silk-beauty-salon/components/layout/Header.tsx`
- Modify: `H:/silk websites/silk-beauty-salon-ALL-FEATURES-COMPLETE/silk-beauty-salon/components/layout/Footer.tsx`
- Modify: `H:/silk websites/silk-beauty-salon-ALL-FEATURES-COMPLETE/silk-beauty-salon/messages/*.json`

- [ ] **Step 1: Add localized `downloadApp` nav labels**

Add `nav.downloadApp` and `footer.studio.downloadApp` to every message JSON file.

- [ ] **Step 2: Add page**

Create a localized page using `useTranslations('download')`, `androidApkUrl`, and `androidInstallSteps`, with a visible button text “Download APK” and instructions for Android “Install unknown apps”.

- [ ] **Step 3: Add header/footer links**

Add `/${locale}/download` to desktop nav, mobile nav, and the footer Studio column.

- [ ] **Step 4: Verify TypeScript**

Run: `npm run type-check`.

Expected: exit 0.

### Task 4: EAS Build Attempt and Website QA

**Files:**
- No source edits expected unless verification finds an issue.

- [ ] **Step 1: Try signed EAS build**

Run: `npx eas-cli whoami`. If logged in, run `npx eas-cli build -p android --profile internal --non-interactive --wait` and capture the final APK URL. If not logged in, report the auth blocker and the exact command needed after `eas login` or `EXPO_TOKEN`.

- [ ] **Step 2: If APK URL exists, set website link**

If the EAS build returns a URL, update `NEXT_PUBLIC_ANDROID_APK_URL` guidance or hard-code only if the URL is intended to be public and stable.

- [ ] **Step 3: Render QA**

Start the website dev server, open `/<locale>/download`, verify page identity, content, console health, screenshot evidence, and that the APK link resolves to an `.apk` URL.

### Task 5: Commit Scope

**Files:**
- Stage only files touched for this task in each repository.

- [ ] **Step 1: Commit mobile release config**

Commit `silk-beauty-app/eas.json`, README update, and plan if changed.

- [ ] **Step 2: Commit website download changes**

Commit only the download page, metadata/test, message additions, and header/footer link changes. Do not commit unrelated dirty website files.

# ⚡ Wobb.ai - Creator Intelligence Platform

A high-fidelity, interactive creator intelligence and search dashboard built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. 

This repository represents the completed and optimized submission for the Wobb Frontend Assignment, overhauling the initial template into a production-grade, state-of-the-art SaaS interface.

---

## 🎨 UI/UX Redesign Highlights
- **Pristine White Light Theme**: Set a beautiful dot-grid radial background pattern (`#e2e8f0` grid dots spaced at `24px`) to add texture and depth.
- **Glassmorphic Navigation**: Configured a sticky navigation header featuring the custom **Wobb.ai** branding, subtle divider lines, and a responsive drawer count indicator.
- **Fixed Viewport Footer**: Implemented a fixed footer at the bottom of the screen (`Made with ❤️ in India | © 2026 Wobb. All rights reserved.`) using glass blur backing and a thin divider.
- **Astro-Sparkle Crystals Background**: Built a canvas particle animation rendering rotating **astroid crystal sparkles** that float, spin, and repel dynamically away from your mouse cursor in the background.
- **Interactive Fly-to-Cart Animation**: Adding an influencer to your selection list triggers a custom vector flight animation. Their avatar clones, shrinks, and glides smoothly up into the "My List" button, which responds with a bounce/indigo border pulse on arrival.
- **Micro-Interactions**: Hovering over the Verified Badge triggers a scale-and-rotate transition and displays a floating, dark-mode styled tooltip tag (`VERIFIED CREATOR`).

---

## 🐛 Intentional Bug Fixes & Resolutions

| Issue # | Component / File | Intentional Bug Description | Resolution / Code Update |
| :---: | :--- | :--- | :--- |
| **1** | [`src/utils/dataHelpers.ts`](file:///Users/rahulsrivastava/Downloads/vibe-coder-assignment-main/src/utils/dataHelpers.ts) | Missing `username` values cause a fatal rendering crash. | Added fallbacks mapping missing values to `handle` or `custom_name`. |
| **2** | [`src/utils/dataHelpers.ts`](file:///Users/rahulsrivastava/Downloads/vibe-coder-assignment-main/src/utils/dataHelpers.ts) | Case-sensitive search results filter query matching. | Standardized search strings and matching keys to lowercase for case-insensitivity. |
| **3** | [`src/pages/SearchPage.tsx`](file:///Users/rahulsrivastava/Downloads/vibe-coder-assignment-main/src/pages/SearchPage.tsx) | Stale state log in `handleProfileClick` prints previous state. | Cleared stale/unneeded hooks and console log triggers. |
| **4 & 5** | [`src/pages/ProfileDetailPage.tsx`](file:///Users/rahulsrivastava/Downloads/vibe-coder-assignment-main/src/pages/ProfileDetailPage.tsx) | 10,000x engagement rate inflation and incorrect engagements count. | Removed the 10,000x inflation factor and switched box to display formatted engagements count. |
| **6** | [`src/utils/formatters.ts`](file:///Users/rahulsrivastava/Downloads/vibe-coder-assignment-main/src/utils/formatters.ts) | Missing unified follower formatting utility. | Centralized follower abbreviation (`K` / `M` notations) with dynamic decimal precision. |
| **7** | [`src/components/influencer/ProfileCard.tsx`](file:///Users/rahulsrivastava/Downloads/vibe-coder-assignment-main/src/components/influencer/ProfileCard.tsx) | Rigid layout constraints (`w-[700px]`) block mobile responsive display. | Replaced rigid widths with responsive Tailwind classes (`w-full max-w-2xl`). |
| **8** | [`src/pages/ProfileDetailPage.tsx`](file:///Users/rahulsrivastava/Downloads/vibe-coder-assignment-main/src/pages/ProfileDetailPage.tsx) | Inconsistent social media platform indicator tag source of truth. | Set `user.type` as the primary source of truth for platform tags. |
| **9** | [`src/utils/profileLoader.ts`](file:///Users/rahulsrivastava/Downloads/vibe-coder-assignment-main/src/utils/profileLoader.ts) | Dynamic profile glob imports crash due to case-sensitive file match checks. | Configured glob index scanning and file loading to match files case-insensitively. |

---

## 🔧 Core Feature Implementations & Restructuring

### 1. Reorganized Folder Structure
Cleaned up the flat workspace structure into a logical component hierarchy:
- `src/components/common/` — reusable components (`VerifiedBadge.tsx`, `BackgroundEffects.tsx`).
- `src/components/layout/` — wrapper shell (`Layout.tsx`).
- `src/components/influencer/` — card grid, selections drawer, chips filter.
- `src/pages/` — page-level views (`SearchPage.tsx`, `ProfileDetailPage.tsx`).
- `src/store/` — Zustand store (`useInfluencerStore.ts`).
- `src/utils/` — data loaders, formatters, and animation physics.

### 2. State Management (Zustand)
- Removed the old React Context files.
- Created a fully typed, unified Zustand store (`src/store/useInfluencerStore.ts`).
- Implemented **Zustand's `persist` middleware** to store the selection list in `localStorage`, meaning selected influencers survive page refreshes.
- Enforced strict duplicate checking by filtering profile entries by `user_id`.

### 3. CDN Referrer Blocks Resolver
- Configured `referrerPolicy="no-referrer"` on all profile `<img>` elements to bypass `403 Forbidden` referrer blocks on YouTube and social network CDN links, with automatic dicebear initials fallbacks.
- Added a dynamic fallback generator inside `profileLoader.ts` so that if detailed JSONs are missing, a mockup profile synthesizes from index data rather than showing a crash screen.

---

## 🧪 Testing Suite (Vitest)
Added a unit testing suite under **Vitest** for quick, isolated execution of state changes and data operations.

### Tests Written:
- **Utility Formatters (`src/utils/formatters.test.ts`)**: Tests numbers abbreviation (`K` / `M` notations), custom decimal precisions, and fraction-to-percentage conversions.
- **Store Actions (`src/store/useInfluencerStore.test.ts`)**: Tests initial state variables, updating queries, selected profile lists additions/removals, and duplicate prevention.

---

## 🛠️ Getting Started & Commands

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```
*(Note: `--legacy-peer-deps` is used to bypass peer dependency warnings caused by `react-beautiful-dnd` under React 19).*

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Developer Commands
| Command | Description |
| ------- | ----------- |
| `npm run dev` | Launch local Vite development server |
| `npm run build` | Compile TypeScript and bundle production build |
| `npm run lint` | Check ESLint coding style violations |
| `npm run test` | Execute all Vitest unit tests |
| `npm run validate` | **[DX Boost]** Runs Type Check, Linter, and Tests in sequence |

---

## 📐 Assumptions & Trade-offs
1. **System-wide Theme Independence**: To guarantee the user's white-theme layout preference is always met, we disabled Tailwind's `dark:` styles to prevent system preferences from rendering white text on white backdrops.
2. **Dynamic Details Synthesis**: When detailed profile JSON is missing, we synthesize a profile summary page from the search query index records. This avoids blank detail pages or crash screens while keeping details interactive.
3. **Persisted State Partialize**: In `useInfluencerStore.ts`, we only persist `selectedProfiles` in localStorage. Search query text and active platform filter tags are intentionally excluded so search states reset on new sessions.

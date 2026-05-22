# FootInn — Frontend

> Next.js 15 frontend for the FootInn turf reservation platform. Handles public discovery, multi-role authentication, booking flows, Razorpay payments, and role-specific dashboards for users, turf admins, and super admins.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Pages & Routes](#pages--routes)
5. [Component Architecture](#component-architecture)
6. [Server Actions & Data Flow](#server-actions--data-flow)
7. [Authentication & Middleware](#authentication--middleware)
8. [API Client](#api-client)
9. [State Management](#state-management)
10. [Styling Architecture](#styling-architecture)
11. [Animations](#animations)
12. [Forms & Validation](#forms--validation)
13. [Hooks & Utilities](#hooks--utilities)
14. [Environment Variables](#environment-variables)
15. [Setup & Running Locally](#setup--running-locally)
16. [Responsive Design](#responsive-design)
17. [Performance Optimizations](#performance-optimizations)
18. [Known Bugs & Incomplete Areas](#known-bugs--incomplete-areas)
19. [Improvements & Recommendations](#improvements--recommendations)
20. [Future Scope](#future-scope)

---

## Project Overview

FootInn's frontend is a **Next.js 15 App Router** application that serves three distinct user roles — regular users who browse and book turfs, turf admins who manage their facility, and super admins who oversee the entire platform. It communicates with an Express/Node.js backend via authenticated Server Actions, with JWT sessions stored in httpOnly cookies.

The landing experience includes animated hero sections, an Apple-style cards carousel, and an infinite scrolling testimonials ticker. Once authenticated, users are routed to role-specific dashboards with stat cards, interactive area charts, and a drag-reorderable data table.

---

## Tech Stack

| Category | Library / Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.5.4 |
| UI Runtime | React | 19.1.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui (New York style) | latest |
| Primitives | Radix UI | various |
| Icons | Lucide React + Tabler Icons | latest |
| Animations | Framer Motion | 12.x |
| Charts | Recharts | 2.15.4 |
| Tables | TanStack React Table | 8.21.3 |
| Drag & Drop | @dnd-kit/core + sortable | latest |
| Validation | Zod | 4.3.6 |
| HTTP Client | Axios | 1.13.5 |
| Notifications | Sonner | 2.0.7 |
| Fonts | Geist Sans + Geist Mono | via next/font |

---

## Folder Structure

```
frontend/
├── public/                        # Static assets
├── src/
│   ├── actions/                   # Next.js Server Actions (all mutations)
│   │   ├── auth.ts                # Login, register, logout, get session
│   │   ├── booking.ts             # (placeholder)
│   │   ├── admin.ts               # (placeholder)
│   │   ├── bookingAdmin.ts        # Admin booking status updates
│   │   ├── turf.ts                # Turf CRUD + admin assignment
│   │   ├── timeSlot.ts            # Time slot CRUD
│   │   ├── payment.ts             # Razorpay order creation/verification/refund
│   │   └── user.ts                # Profile update, password change
│   │
│   ├── app/                       # File-system routes (App Router)
│   │   ├── layout.tsx             # Root layout — Geist fonts, metadata
│   │   ├── globals.css            # Design tokens, Tailwind, custom animations
│   │   ├── error.tsx              # Global error boundary
│   │   │
│   │   ├── (public)/              # Public route group
│   │   │   ├── page.tsx           # Home / landing page
│   │   │   ├── blog/page.tsx      # Blog listing
│   │   │   ├── contact/page.tsx   # Contact form + map
│   │   │   ├── pricing/page.tsx   # Pricing tiers
│   │   │   ├── turfs/page.tsx     # Turf browse (stub)
│   │   │   └── turfs/[id]/page.tsx# Turf detail (stub)
│   │   │
│   │   ├── (auth)/                # Auth route group (unauthenticated only)
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   ├── (user)/                # User dashboard route group
│   │   │   └── user/dashboard/page.tsx
│   │   │
│   │   ├── (turf-admin)/          # Turf admin route group
│   │   │   └── turf-admin/dashboard/page.tsx  (stub)
│   │   │
│   │   ├── (super-admin)/         # Super admin route group
│   │   │   └── super-admin/dashboard/page.tsx (stub)
│   │   │
│   │   ├── dashboard/page.tsx     # Role-based redirect gateway
│   │   └── unauthorized/page.tsx  # 403 page
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login-form.tsx     # Split-layout login with OAuth buttons
│   │   │   └── sign-up-form.tsx   # Registration form
│   │   │
│   │   ├── sections/contact/
│   │   │   ├── ContactForm.tsx    # Contact form (posts to /api/contact)
│   │   │   └── Map.tsx            # World map with connection dots
│   │   │
│   │   ├── shared/
│   │   │   └── Container.tsx      # Centered layout wrapper
│   │   │
│   │   ├── shadcn-studio/blocks/
│   │   │   └── pricing-component-01/  # Pricing table block
│   │   │
│   │   ├── ui/                    # shadcn primitives + Aceternity components
│   │   │   ├── apple-cards-carousel.tsx
│   │   │   ├── infinite-moving-cards.tsx
│   │   │   ├── WorldMap.tsx
│   │   │   ├── logoutButton.tsx
│   │   │   ├── dropdown-menu-avatar.tsx
│   │   │   └── [all shadcn primitives]
│   │   │
│   │   ├── app-sidebar.tsx        # Collapsible dashboard sidebar
│   │   ├── chart-area-interactive.tsx  # Area chart with time-range picker
│   │   ├── data-table.tsx         # Draggable TanStack table
│   │   ├── footer.tsx
│   │   ├── infinite-moving-cards-demo.tsx
│   │   ├── nav-documents.tsx
│   │   ├── nav-main.tsx
│   │   ├── nav-secondary.tsx
│   │   ├── nav-user.tsx
│   │   ├── navbar.tsx
│   │   ├── section-cards.tsx      # Dashboard KPI stat cards
│   │   └── site-header.tsx        # Dashboard header bar
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts          # Breakpoint detector (< 768px)
│   │   └── use-outside-click.ts   # Click-outside handler for overlays
│   │
│   └── lib/
│       ├── api.ts                 # Typed authenticated HTTP client
│       ├── express-url.ts         # Backend base URL resolver
│       └── utils.ts               # cn() — clsx + tailwind-merge
│
├── components.json                # shadcn CLI configuration
├── next.config.ts                 # Remote image domains (unsplash.com)
├── postcss.config.mjs
└── package.json
```

---

## Pages & Routes

### Route Groups

Next.js route groups (folders wrapped in parentheses) apply layouts per role without affecting the URL path.

### Existing Pages

| URL | Group | Status | Purpose | Access |
|---|---|---|---|---|
| `/` | `(public)` | Complete | Landing — hero, features carousel, testimonials | Public |
| `/blog` | `(public)` | Complete (static) | Blog listing with 3 hardcoded posts | Public |
| `/contact` | `(public)` | Complete | Contact form + world map | Public |
| `/pricing` | `(public)` | Complete (static) | 3 pricing tiers (₹1999 / ₹4999 / ₹9999) | Public |
| `/turfs` | `(public)` | **Stub** | Renders only "page" text | Public |
| `/turfs/[id]` | `(public)` | **Stub** | Renders only "page" text | Public |
| `/login` | `(auth)` | Complete | Email/password + OAuth buttons | Guest only |
| `/register` | `(auth)` | Complete | Registration form | Guest only |
| `/user/dashboard` | `(user)` | Complete | Stats, chart, booking table | `user` role |
| `/turf-admin/dashboard` | `(turf-admin)` | **Stub** | Just a LogoutButton | `turf_admin` role |
| `/super-admin/dashboard` | `(super-admin)` | **Stub** | Just a LogoutButton | `super_admin` role |
| `/dashboard` | — | Complete | Reads role cookie → redirects | Authenticated |
| `/unauthorized` | — | Complete | 403 access denied | Public |

### Missing / Recommended Pages

| Recommended URL | Priority | Rationale |
|---|---|---|
| `/turfs` (implement) | **Critical** | Core product page — main user journey |
| `/turfs/[id]` (implement) | **Critical** | Booking flow entry point; slot selector + payment button |
| `/password/forgot` | **High** | Backend API exists; frontend form is missing |
| `/password/reset/[token]` | **High** | Email reset link lands here; no page exists |
| `/user/bookings/[id]` | **High** | Individual booking receipt, status, cancellation |
| `/user/profile` | **Medium** | Dedicated settings page (action exists; no page) |
| `/turf-admin/dashboard` (implement) | **High** | Slot management, booking table, revenue stats |
| `/super-admin/dashboard` (implement) | **High** | Platform analytics, user list, turf management |
| `/api/contact` | **High** | ContactForm POSTs here but no Next.js API route exists |
| `/not-found` | **Medium** | Custom 404 via `not-found.tsx` |
| `/terms` | Low | Legal requirement for payment flows |
| `/privacy` | Low | Required before GA launch |

---

## Component Architecture

### Three-layer strategy

```
Layer 1: Primitives  →  /components/ui/          (shadcn + Radix UI)
Layer 2: Feature     →  /components/*.tsx         (compose primitives)
Layer 3: Page        →  /app/**/page.tsx          (compose feature components)
```

Pages only import feature components. Feature components only import primitives.

### Key Feature Components

| Component | Description |
|---|---|
| `navbar.tsx` | Responsive nav with desktop menu and mobile `Sheet` drawer. Shows `DropdownMenuAvatar` when authenticated. |
| `footer.tsx` | 6-column grid with company info, social icons, nav links, and oversized brand text. |
| `app-sidebar.tsx` | Collapsible sidebar rendering `NavMain`, `NavDocuments`, `NavSecondary`, and `NavUser` sections. Used in the user dashboard. |
| `site-header.tsx` | Dashboard top bar with `SidebarTrigger`, "Dashboard Overview" title, and avatar dropdown. |
| `section-cards.tsx` | 4-card grid of KPI metrics: Total Revenue, New Customers, Active Accounts, Growth Rate. Currently uses hardcoded placeholder data. |
| `chart-area-interactive.tsx` | Recharts area chart with a 90-day / 30-day / 7-day range toggle. Responsive via `useIsMobile`. |
| `data-table.tsx` | TanStack Table v8 with drag-handle row reordering (`@dnd-kit`), multi-select checkboxes, column visibility toggle, and pagination. |
| `login-form.tsx` | Split layout — form on left, decorative panel on right. Includes Apple / Google / Meta OAuth buttons (UI only). |
| `sign-up-form.tsx` | Same split layout. Adds a Name field. Contains a known nested `<Field>` bug. |

### Custom Animated Components

| Component | Mechanic |
|---|---|
| `apple-cards-carousel.tsx` | Framer Motion-powered horizontal draggable card carousel with individual card expand/collapse |
| `infinite-moving-cards.tsx` | Pure-CSS `@keyframes scroll` marquee — used for the feature showcase ticker |
| `WorldMap.tsx` | SVG world map with animated connection dots (Contact page) |

---

## Server Actions & Data Flow

All data mutations go through Next.js **Server Actions** — functions marked `'use server'` that run on the Node.js server with direct access to cookies and environment variables.

### Flow

```
User interaction (form submit / button click)
    │
    ▼
Server Action called  (/src/actions/*.ts)
    │
    ├─ Reads session_token cookie
    ├─ Calls Express backend via fetch / lib/api.ts
    └─ On success: sets cookies / revalidatePath / redirect
```

### Action Files

| File | Exported Functions | Status |
|---|---|---|
| `auth.ts` | `loginAction`, `signupAction`, `setAuthCookies`, `getAuthUser`, `logoutAction` | Complete |
| `turf.ts` | `createTurfAction`, `updateTurfAction`, `deleteTurfAction`, `assignTurfAdminAction`, `updateTurfStatusAction` | Complete |
| `timeSlot.ts` | `createTimeSlotAction`, `updateTimeSlotAction`, `deleteTimeSlotAction` | Complete |
| `payment.ts` | `createPaymentOrderAction`, `verifyPaymentAction`, `refundPaymentAction` | Complete |
| `user.ts` | `updateProfileAction`, `changePasswordAction` | Complete |
| `bookingAdmin.ts` | `updateBookingStatusAction` | Complete |
| `booking.ts` | — | **Empty placeholder** |
| `admin.ts` | — | **Empty placeholder** |

### Session Cookies

| Cookie | Content | Max-Age | Flags |
|---|---|---|---|
| `session_token` | JWT from backend | 7 days | httpOnly, sameSite: lax, secure in prod |
| `user_role` | `user` / `turf_admin` / `super_admin` | 7 days | httpOnly, sameSite: lax, secure in prod |

---

## Authentication & Middleware

### `src/middleware.ts`

Runs at the edge on every request. Reads `session_token` and `user_role` cookies to enforce role-based routing.

```
Request arrives
    │
    ├─ No session_token
    │     └─ Accessing protected route? → redirect /login
    │
    ├─ Has session_token
    │     ├─ role = super_admin  → can access /super-admin/**
    │     ├─ role = turf_admin   → can access /turf-admin/**
    │     └─ role = user         → can access /user/**
    │
    └─ Wrong role for route → redirect /unauthorized
```

### Login Flow

```
1. User submits email + password on /login
2. loginAction() POSTs to backend /auth/login
3. Backend returns JWT in Set-Cookie response header
4. setAuthCookies() extracts token + role → sets httpOnly cookies
5. redirect() to /dashboard
6. /dashboard reads user_role cookie → redirects to role-specific dashboard
```

### RBAC Matrix

```
Route                    │ user │ turf_admin │ super_admin
─────────────────────────┼──────┼────────────┼────────────
/user/dashboard          │  ✓   │     ✗      │     ✗
/turf-admin/dashboard    │  ✗   │     ✓      │     ✗
/super-admin/dashboard   │  ✗   │     ✗      │     ✓
/login, /register        │  ✗   │     ✗      │     ✗  (redirected if authenticated)
Public routes            │  ✓   │     ✓      │     ✓
```

---

## API Client

### `src/lib/api.ts`

```typescript
getDataHelper<T>(endpoint: string, options?: RequestInit): Promise<T>
```

- Reads `session_token` from cookies server-side via `next/headers`
- Attaches `Authorization: Bearer <token>` header
- Throws on non-2xx responses with a structured error message
- Auto-redirects: `401 → /login`, `403 → /unauthorized`

### `src/lib/express-url.ts`

Resolves the backend base URL:

```
process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:5001"
```

> The variable is named `STRAPI_URL` for historical reasons but targets the Express/Node.js backend, not Strapi CMS.

---

## State Management

No client-side state library is used. State is handled through:

| Mechanism | Use Case |
|---|---|
| **Server Actions + cookies** | Session identity, auth state |
| **React Server Components** | Data fetching — rendered on server, no client state needed |
| **URL search params** | Filters, pagination, active tab — shareable and bookmark-friendly |
| **React `useState`** | Local UI state (open/close, form inputs) |
| **`useIsMobile` hook** | Conditional rendering based on viewport width |

---

## Styling Architecture

### Tailwind CSS 4

Uses the PostCSS pipeline (`@tailwindcss/postcss`). No `tailwind.config.js` — all configuration lives in `globals.css` via CSS custom properties.

### Design Tokens

Defined as OKLCH values for perceptual uniformity across light and dark themes:

| Token | Purpose |
|---|---|
| `--color-primary` | Brand teal — buttons, active nav, CTAs |
| `--color-secondary` | Muted supporting color |
| `--color-accent` | Highlight accents |
| `--color-destructive` | Error states, cancel actions |
| `--color-muted` | Subtle backgrounds |
| `--color-chart-1` through `-5` | Recharts data series colors |
| `--radius` + variants | Border radius scale |

### Dark Mode

Full dark theme. All shadcn/ui components swap via CSS variable overrides under a `.dark` class — no `dark:` Tailwind variants needed for primitives.

### Typography

| Font | CSS Variable | Usage |
|---|---|---|
| Geist Sans | `--font-geist-sans` | All UI text |
| Geist Mono | `--font-geist-mono` | Code, numeric data |

Loaded via `next/font` in `layout.tsx` — zero CLS, preloaded automatically.

### shadcn Configuration

```json
{
  "style": "new-york",
  "baseColor": "neutral",
  "cssVariables": true,
  "registries": [
    "https://ui.aceternity.com/registry",
    "https://shadcnblocks.com/registry"
  ]
}
```

---

## Animations

| Animation | Mechanism | Location |
|---|---|---|
| Hero floating elements | CSS `@keyframes float` + `float-delayed` (translateY oscillation) | `globals.css` + landing hero |
| Feature ticker | CSS `@keyframes scroll` (translateX) | `infinite-moving-cards.tsx` |
| Cards carousel drag | Framer Motion `drag` + `AnimatePresence` | `apple-cards-carousel.tsx` |
| Card expand/collapse | Framer Motion `layoutId` shared layout | `apple-cards-carousel.tsx` |
| Section transitions | Framer Motion `variants` + `initial/animate/exit` | Landing page sections |

> `prefers-reduced-motion` is not currently respected in custom animations — a gap to address for accessibility.

---

## Forms & Validation

### Login & Register

- Plain controlled `<input>` elements feeding `FormData` into Server Actions
- Errors returned from the Server Action and displayed inline below the form
- Zod is installed but **not yet wired client-side** — validation currently happens only on the backend

### Contact Form (`ContactForm.tsx`)

- Client component (`'use client'`)
- POSTs JSON to `/api/contact` — a Next.js API route that **does not yet exist**
- Fields: name, organisation, job title, email, phone, message

### Profile & Password

- `updateProfileAction` and `changePasswordAction` in `user.ts` accept `FormData`
- Actions are fully implemented; the UI page (`/user/profile`) is not yet built

---

## Hooks & Utilities

| File | Export | Description |
|---|---|---|
| `hooks/use-mobile.ts` | `useIsMobile()` | Returns `true` when `window.innerWidth < 768`. Uses `matchMedia` with a resize listener. |
| `hooks/use-outside-click.ts` | `useOutsideClick(ref, handler)` | Fires `handler` on mousedown outside `ref`. Used for modal/dropdown close. |
| `lib/utils.ts` | `cn(...inputs)` | Merges Tailwind classes via `clsx` + `tailwind-merge`. Prevents class conflicts. |
| `lib/express-url.ts` | `BACKEND_URL` | Resolves backend URL from env. |
| `lib/api.ts` | `getDataHelper<T>()` | Typed, authenticated GET client with redirect handling. |

---

## Environment Variables

Create `.env.local` in the `frontend/` directory:

```bash
# Backend API base URL (Express/Node.js server)
NEXT_PUBLIC_STRAPI_URL=http://localhost:5001

# Server-side backend URL (used in Server Actions — not exposed to browser)
BACKEND_URL=http://localhost:5001
```

---

## Setup & Running Locally

### Prerequisites

- Node.js >= 20.x
- FootInn backend running on port `5001`

### Install & Run

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Set NEXT_PUBLIC_STRAPI_URL=http://localhost:5001

# Start dev server
npm run dev
# → http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Adding shadcn Components

```bash
npx shadcn@latest add <component-name>
```

---

## Responsive Design

Mobile-first using Tailwind's default breakpoints:

| Breakpoint | Prefix | Min Width |
|---|---|---|
| Mobile (default) | — | 0px |
| Small | `sm:` | 640px |
| Medium | `md:` | 768px |
| Large | `lg:` | 1024px |
| Extra Large | `xl:` | 1280px |

### Responsive Patterns in Use

| Component | Mobile | Desktop |
|---|---|---|
| `navbar.tsx` | Hamburger → `Sheet` slide-in drawer | Horizontal link row |
| `app-sidebar.tsx` | Collapsible, icon-only mode | Expanded with text labels |
| `chart-area-interactive.tsx` | Hides time-range picker, compact chart | Full controls visible |
| `data-table.tsx` | Horizontal scroll | Full column display |
| Landing hero | Stacked single column | Multi-column grid |
| `section-cards.tsx` | 1-column stack | 4-column grid |
| Pricing cards | Stacked | 3-column grid |

---

## Performance Optimizations

| Optimization | Status | Detail |
|---|---|---|
| React Server Components | Active | All pages RSC by default; `'use client'` added only where needed |
| Server Actions for mutations | Active | Eliminates client-side fetch overhead; runs on server |
| `next/font` | Active | Geist fonts preloaded with zero layout shift |
| Automatic code splitting | Active | Next.js splits JS per route segment |
| Remote image allowlist | Configured | `unsplash.com` whitelisted in `next.config.ts` for `next/image` |
| `next/image` for turf images | **Not implemented** | Turf pages are stubs; must use `next/image` when built |
| Skeleton loaders | Available, unused | `<Skeleton />` exists in UI kit but not used in incomplete pages |
| React Query / SWR | **Not used** | No client-side cache or background refresh |

---

## Known Bugs & Incomplete Areas

| Issue | Location | Severity |
|---|---|---|
| Nested `<Field>` on password field | [sign-up-form.tsx](src/components/auth/sign-up-form.tsx) ~line 89 | Medium — double label/style wrapping |
| `/turfs` renders only "page" text | [app/(public)/turfs/page.tsx](src/app/(public)/turfs/page.tsx) | **Critical** — core user journey broken |
| `/turfs/[id]` renders only "page" text | [app/(public)/turfs/[id]/page.tsx](src/app/(public)/turfs/[id]/page.tsx) | **Critical** — booking flow entry point missing |
| `/turf-admin/dashboard` is a stub | [app/(turf-admin)/](src/app/(turf-admin)/) | **High** |
| `/super-admin/dashboard` is a stub | [app/(super-admin)/](src/app/(super-admin)/) | **High** |
| `/api/contact` route missing | `app/api/contact/route.ts` does not exist | High — ContactForm broken |
| `booking.ts` action is empty | [actions/booking.ts](src/actions/booking.ts) | High — no booking flow possible |
| `admin.ts` action is empty | [actions/admin.ts](src/actions/admin.ts) | High — no admin data fetching |
| No forgot/reset password pages | `app/(auth)/` | High — backend routes exist, UI missing |
| `section-cards.tsx` uses hardcoded data | [section-cards.tsx](src/components/section-cards.tsx) | Medium — not connected to backend |
| OAuth buttons are UI-only | [login-form.tsx](src/components/auth/login-form.tsx) | Medium — no action wired |
| Pricing and blog are static/hardcoded | pricing + blog pages | Low |

---

## Improvements & Recommendations

### Critical — Implement Before Launch

1. **Build `/turfs` and `/turfs/[id]`** — The most important missing work. `/turfs` needs filtering (location, price, availability). `/turfs/[id]` needs a slot picker, booking type selector, player count input, and Razorpay checkout trigger.

2. **Implement both admin dashboards** — Backend APIs for stats, bookings, users, and revenue all exist. The dashboards currently show only a logout button.

3. **Create `/api/contact` route** — Add `app/api/contact/route.ts` to handle ContactForm submissions; the form currently POSTs to a non-existent endpoint.

4. **Implement `booking.ts` actions** — The booking creation, fetch, and cancellation flow is the primary user journey but has no frontend implementation.

5. **Add password reset pages** — `/password/forgot` and `/password/reset/[token]`. Both backend endpoints are ready.

### Code Quality

6. **Fix the nested `<Field>` bug** in [sign-up-form.tsx](src/components/auth/sign-up-form.tsx) ~line 89.

7. **Wire Zod validation to forms client-side** — Add inline field-level errors before submission to reduce unnecessary round trips.

8. **Use `next/image` for all turf images** — When turf pages are built, wrap all images in `<Image>` from `next/image` for automatic optimization, lazy loading, and AVIF/WebP output.

9. **Connect `section-cards.tsx` to live data** — Replace hardcoded placeholder values with data from the backend stats endpoints.

10. **Type all Server Action return values** — Define explicit return types so calling components get type-safe success/error discrimination.

### Architecture

11. **Add `loading.tsx` per route segment** — Place skeleton-based loading states inside each route group folder to enable automatic Suspense during navigation.

12. **Add `error.tsx` per route segment** — One global error boundary is insufficient. A dashboard data failure should not crash public pages.

13. **Add `/app/api/` route handlers** — Razorpay checkout modal callbacks and OAuth redirects require API route handlers (`route.ts`), not Server Actions.

14. **Feature-grouped folder structure** — As the project scales, move from a flat `actions/` + `components/` layout to feature-grouped modules:

    ```
    src/
    ├── features/
    │   ├── auth/       (components, actions, schemas)
    │   ├── booking/
    │   ├── turf/
    │   └── admin/
    ├── shared/         (truly reusable components, hooks, lib)
    └── app/            (routing only)
    ```

### UX & Accessibility

15. **Respect `prefers-reduced-motion`** — Add to `globals.css`:
    ```css
    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.01ms !important; }
    }
    ```

16. **Accessible form labels** — Verify all inputs have proper `htmlFor`/`id` associations, not just visual proximity.

17. **OAuth button functionality or removal** — Implement OAuth (Auth.js) or remove the buttons to avoid misleading users.

### Testing

18. **No test files exist** — Add:
    - Vitest + React Testing Library for Server Actions and hooks
    - Playwright E2E covering: register → login → browse turfs → book → pay → view booking

---

## Future Scope

| Feature | Description |
|---|---|
| Real-time slot availability | Server-Sent Events to show live slot updates without page refresh |
| OAuth login | Google / Apple sign-in via Auth.js |
| Booking confirmation page | Dedicated `/book/confirm` with full summary before Razorpay modal |
| WhatsApp notifications | Booking confirmations and reminders (mentioned in Pro pricing tier) |
| Dynamic pricing UI | Turf admin UI to configure peak-hour price multipliers |
| Turf image gallery | Cloudinary-backed multi-image upload in turf management |
| PWA support | `next-pwa` for offline use and home screen install |
| SEO for turf pages | `generateStaticParams` on `/turfs/[id]` for Google indexability |
| Analytics dashboard | Occupancy heatmap, revenue trend charts for turf admins |
| i18n | Multi-language support for regional markets |

---

*Generated via full frontend codebase audit — May 2026.*
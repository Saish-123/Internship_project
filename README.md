# Mumbai Express Freight (MEF) — Responsive Logistics Web App

> Enterprise-grade shipment tracking, proof-of-delivery, and hub operations management for a fictional Mumbai Metropolitan Region freight trucking firm.

---

## 🚛 Live Demo & Deployment

| Resource | URL |
|---|---|
| **Live App** | Deploy with `npm run build` then host `dist/` on Netlify / Vercel |
| **Repository** | This repository |
| **Wireframes** | [`docs/wireframes.md`](docs/wireframes.md) |

### Deploy to Netlify / Vercel

```bash
npm run build
# Upload the dist/ folder to Netlify or connect the repo to Vercel
# Build command: npm run build
# Publish directory: dist
```

---

## 📸 Screenshots & Key Screens

### Screen 1 — Home / Quick Track Portal
- Hero search box with Mumbai freight tracking IDs (MFX-..., LR/Bilty, E-Way Bill)
- Real-time KPI stat cards (48 active trucks, 99.2% e-POD compliance, 1,420 tonnes inward)
- Live Mumbai transit corridor status bulletins (Expressway, Bhiwandi Toll, JNPT Port)
- Quick sample consignment tags for instant navigation

### Screen 2 — Shipment Listing Dashboard
- Full-text search across tracking ID, LR number, consignor/consignee name, truck plate
- Multi-faceted filter bar: Status pills, Origin Hub, Destination Hub, Cargo Priority
- Sortable columns (Date, ETA, Weight, Freight Amount) with visual sort indicators
- Responsive table (desktop) ↔ card grid (mobile) toggle
- Pagination with configurable rows per page
- Error simulation toggle to test error and retry states
- Empty state with contextual reset CTA

### Screen 3 — Shipment Detail & Proof of Delivery
- Interactive checkpoint stepper timeline with GPS coordinates and transit remarks
- SVG telematics route map of Mumbai Metropolitan Region with animated live truck marker
- Consignor and consignee party detail cards with GSTIN, address, phone, email
- Cargo manifest table with per-item weight, quantity, packaging type, and declared value
- Driver & vehicle card (handles missing avatar gracefully with initials fallback)
- Freight pricing breakdown (base rate + Fastag tolls + GST)
- Full e-POD inspector: digital signature preview, stamped bilty photo, OTP verification status
- Record POD modal with signature canvas, photo upload, and accessible validation

### Screen 4 — Multi-Step Booking Form (4 Steps)
- **Step 1**: Consignor & Consignee parties (GSTIN regex validation, hub selection)
- **Step 2**: Cargo manifest & vehicle specification (weight, packaging, priority, truck model)
- **Step 3**: GST E-Way Bill compliance & driver assignment (12-digit validation, OTP/signature toggles)
- **Step 4**: Full review summary with estimated freight invoice calculation
- Accessible error summary banner with `role="alert"` and `aria-invalid` field marking
- Step preservation (form state retained when navigating back)
- Pre-seeded realistic data for instant demo walkthrough

### Screen 5 — User Profile & Hub Preferences
- Role switcher (Hub Manager / Shipper / Fleet Driver)
- Active hub selection across all 7 Mumbai logistics hubs
- Accessibility toggles: High Contrast (WCAG AAA), Dark/Light theme, Wireframe Blueprint mode
- PWA & offline cache status display
- Demo data reset control

### Screen 6 — Admin Hub Operations Console
- Yard throughput KPIs (dock utilization, average turnaround, inward tonnage)
- Interactive loading bay allocation matrix (6 bays with Occupy/Release/Allot controls)
- Live consignment status transition dispatcher (select shipment → new status → checkpoint → broadcast)

---

## 🏗️ Architecture & Component Structure

```
src/
├── App.tsx                        # Root: Provider, BrowserRouter, lazy routes, layout
├── main.tsx                       # React 19 entry point
├── index.css                      # Tailwind base + custom WCAG focus rings + blueprint mode
├── setupTests.ts                  # Vitest + jest-dom setup
│
├── types/
│   └── logistics.ts               # Full TypeScript interfaces (Shipment, POD, Party, Cargo, etc.)
│
├── data/
│   └── seedShipments.ts           # 6 realistic Mumbai shipments with edge cases
│
├── services/
│   └── mockApi.ts                 # LocalStorage-backed mock REST API with latency simulation
│
├── store/
│   ├── index.ts                   # Redux store + typed hooks (useAppDispatch, useAppSelector)
│   ├── shipmentsSlice.ts          # Shipments CRUD, filters, sort, pagination, async thunks
│   └── uiSlice.ts                 # Theme, high contrast, wireframe mode, role, hub, toasts
│
├── components/
│   ├── common/
│   │   ├── EmptyState.tsx         # Zero-results with contextual reset action
│   │   ├── ErrorBanner.tsx        # Error alert with retry button
│   │   ├── LoadingSkeleton.tsx    # Accessible shimmer (table + card variants)
│   │   ├── SignaturePad.tsx       # HTML5 Canvas touch/mouse digital signature
│   │   ├── SkipLink.tsx           # Keyboard skip-to-content accessibility link
│   │   ├── StatusBadge.tsx        # Shipment status + cargo priority badges
│   │   └── ToastContainer.tsx     # Auto-dismiss notification toasts
│   ├── layout/
│   │   ├── Navbar.tsx             # Responsive nav, hub selector, theme/role/wireframe toggles
│   │   └── Footer.tsx             # Brand footer, hub list, demo reset control
│   ├── tracking/
│   │   ├── RouteCheckpointStepper.tsx  # Interactive timeline with progress bar
│   │   └── MumbaiRouteMap.tsx          # SVG telematics route visualization
│   └── pod/
│       └── PodModal.tsx           # Proof-of-Delivery dialog with signature + photo upload
│
├── pages/
│   ├── HomePage.tsx               # Quick tracking hero + KPIs + corridor status
│   ├── ShipmentsListPage.tsx      # Filterable, sortable, paginated listing
│   ├── ShipmentDetailPage.tsx     # Full detail with checkpoints + map + POD
│   ├── BookingFormPage.tsx        # 4-step multi-step wizard with validation
│   ├── ProfilePage.tsx            # User preferences + accessibility + PWA status
│   ├── AdminHubPage.tsx           # Dock management + status transition console
│   └── WireframePage.tsx          # Interactive wireframe blueprint viewer
│
└── __tests__/
    ├── StatusBadge.test.tsx       # 12 tests: all status/priority badge rendering
    ├── SkipLink.test.tsx          # 2 tests: accessibility skip link
    ├── LoadingSkeleton.test.tsx   # 4 tests: skeleton variants and a11y attributes
    ├── EmptyState.test.tsx        # 5 tests: empty state rendering + reset callback
    ├── ErrorBanner.test.tsx       # 5 tests: error alert + retry interaction
    ├── RouteCheckpointStepper.test.tsx  # 7 tests: timeline, progress, delay alert
    ├── seedData.test.ts           # 10 tests: data quality, edge cases, GSTIN validation
    ├── mockApi.test.ts            # 5 tests: API CRUD, search, error simulation
    ├── shipmentsSlice.test.ts     # 13 tests: all reducer actions
    └── uiSlice.test.ts            # 11 tests: theme, contrast, wireframe, toasts
```

---

## 🔧 State Management Rationale

**Redux Toolkit** was chosen over Context API because:

1. **Complex cross-cutting state**: Shipments data is consumed by 5+ pages simultaneously (listing, detail, admin, home, booking). Redux provides a single source of truth without prop drilling or deeply nested context providers.

2. **Async data flow**: `createAsyncThunk` handles the mock API's latency simulation, loading/error/success states, and error injection testing — all with automatic reducer case generation.

3. **Separation of concerns**: Two slices cleanly divide responsibilities:
   - `shipmentsSlice`: Data, filters, sorting, pagination, CRUD operations
   - `uiSlice`: Theme, accessibility preferences, role switching, toast notifications

4. **DevTools & predictability**: Redux DevTools provide time-travel debugging for tracking exactly how filters, sorts, and status transitions modify state — critical for a logistics dashboard.

---

## 🧪 Test Results

```
 Test Files  11 passed (11)
      Tests  77 passed (77)
   Duration  ~9s
```

| Test File | Tests | Coverage |
|---|---|---|
| `StatusBadge.test.tsx` | 12 | All 7 statuses + 4 priorities + size variants |
| `shipmentsSlice.test.ts` | 13 | All reducer actions, filter reset, sort toggling, pagination |
| `uiSlice.test.ts` | 11 | Theme, contrast, wireframe, role, hub, toasts (add/remove/stack) |
| `seedData.test.ts` | 10 | Edge cases, GSTIN validation, data integrity, uniqueness |
| `RouteCheckpointStepper.test.tsx` | 7 | Timeline rendering, progress bar %, delay alerts, GPS display |
| `mockApi.test.ts` | 5 | CRUD operations, case-insensitive search, error simulation |
| `EmptyState.test.tsx` | 5 | Rendering, custom props, reset callback interaction |
| `ErrorBanner.test.tsx` | 5 | Alert role, retry callback, custom title |
| `LoadingSkeleton.test.tsx` | 4 | aria-busy, table vs card variants, custom count |
| `App.test.tsx` | 3 | App mount, landmarks, navigation |
| `SkipLink.test.tsx` | 2 | Rendering, href target |

---

## ♿ Accessibility (WCAG 2.1 AA/AAA)

- **Skip-to-content link** for keyboard navigation
- **Semantic landmarks**: `<header>`, `<main>`, `<nav>`, `<footer>` with aria-labels
- **Focus management**: Visible `:focus-visible` ring (amber) with offset on all interactive elements
- **Color contrast**: Minimum 4.5:1 ratio for all text; High Contrast mode boosts to 7:1+
- **ARIA attributes**: `role="alert"`, `role="status"`, `aria-invalid`, `aria-describedby`, `aria-live="polite"`, `aria-current="page"`, `aria-pressed`, `aria-expanded`
- **Form validation**: Error summary banner with individual field messages, live error updates
- **Screen reader support**: All icons have `aria-hidden="true"`, badges have `aria-label`

---

## ⚡ Performance & PWA

- **Code splitting**: All 7 page routes lazy-loaded with `React.lazy()` + `Suspense`
- **Bundle sizes** (gzipped): Core 108 KB, largest page chunk 10 KB, CSS 8 KB
- **Service Worker** (`sw.js`): Cache-first strategy for static assets, network-first for API, offline HTML fallback
- **Web App Manifest**: Installable PWA with custom SVG icon, standalone display mode
- **Tailwind CSS purging**: Only used utilities shipped (46 KB total CSS)
- **Online/Offline detection**: Real-time banner with `navigator.onLine` event listeners

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript 7 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 3.4 |
| **Routing** | React Router DOM 7 |
| **State** | Redux Toolkit 2 + React-Redux 9 |
| **Icons** | Lucide React |
| **Testing** | Vitest 5 + React Testing Library 16 + @testing-library/user-event |
| **PWA** | Custom Service Worker + Web App Manifest |
| **Mock API** | LocalStorage-backed with latency simulation |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 📋 Edge Cases Handled

| Edge Case | Where |
|---|---|
| Very long company names (100+ chars) | Shipment `MFX-2026-JNP-04189` — truncated with `line-clamp` and `title` tooltip |
| Missing driver avatar photo | Shipments with `avatarUrl: undefined` — graceful initials fallback |
| Missing POD signature/photo | Detail page shows dashed placeholder with descriptive text |
| Empty search results | Dedicated `EmptyState` component with contextual reset CTA |
| API network errors | `ErrorBanner` with retry button; error simulation toggle on listing page |
| Offline/disconnected state | PWA service worker cache fallback + amber offline banner |
| Over-Dimensional Cargo | ODC priority badge, special handling notes, escort requirements |
| Temperature-controlled goods | Cold chain priority badge with reefer truck assignment |

---

## 📄 License

This project is a demonstration/portfolio application. Not intended for commercial use.

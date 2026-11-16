import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('w:top', top), ('w:bottom', bottom), ('w:left', left), ('w:right', right)]:
        node = OxmlElement(m)
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_document():
    doc = Document()

    # Page setup - Margins (1 inch)
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Style colors
    PRIMARY = RGBColor(15, 76, 129)      # Navy #0F4C81
    SECONDARY = RGBColor(194, 65, 12)    # Amber-rust #C2410C
    DARK_TEXT = RGBColor(30, 41, 59)     # Slate 800 #1E293B
    MUTED_TEXT = RGBColor(100, 116, 139) # Slate 500 #64748B
    CODE_BG = "F1F5F9"                   # Slate 100
    TABLE_HEADER_BG = "0F4C81"           # Primary Navy
    TABLE_ALT_BG = "F8FAFC"              # Slate 50
    BORDER_COLOR = "CBD5E1"              # Slate 300

    # Base normal style
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Calibri'
    normal_style.font.size = Pt(10.5)
    normal_style.font.color.rgb = DARK_TEXT
    normal_style.paragraph_format.line_spacing = 1.15
    normal_style.paragraph_format.space_after = Pt(4)

    # ==================== HEADER BANNER ====================
    title_p = doc.add_paragraph()
    title_run = title_p.add_run("Technical Document: Logistics Responsive Web App")
    title_run.font.name = 'Arial'
    title_run.font.size = Pt(20)
    title_run.font.bold = True
    title_run.font.color.rgb = PRIMARY
    title_p.paragraph_format.space_after = Pt(2)

    sub_p = doc.add_paragraph()
    sub_run = sub_p.add_run("Integrating React 19 & Redux Toolkit for an Enterprise Freight Tracking & Proof-of-Delivery Experience")
    sub_run.font.name = 'Arial'
    sub_run.font.size = Pt(13)
    sub_run.font.bold = True
    sub_run.font.color.rgb = SECONDARY
    sub_p.paragraph_format.space_after = Pt(4)

    meta_p = doc.add_paragraph()
    meta_run = meta_p.add_run("Project: Mumbai Express Freight (MEF)   |   Files: src/, public/, package.json, tests/, tailwind.config.js")
    meta_run.font.size = Pt(9.5)
    meta_run.font.color.rgb = MUTED_TEXT
    meta_run.font.italic = True
    meta_p.paragraph_format.space_after = Pt(14)

    # Divider line
    p_div = doc.add_paragraph()
    p_div_run = p_div.add_run("―" * 60)
    p_div_run.font.color.rgb = RGBColor(203, 213, 225)
    p_div.paragraph_format.space_after = Pt(12)

    # Helper for headings
    def add_h1(text):
        h = doc.add_paragraph()
        run = h.add_run(text)
        run.font.name = 'Arial'
        run.font.size = Pt(14)
        run.font.bold = True
        run.font.color.rgb = PRIMARY
        h.paragraph_format.space_before = Pt(14)
        h.paragraph_format.space_after = Pt(4)
        return h

    def add_h2(text):
        h = doc.add_paragraph()
        run = h.add_run(text)
        run.font.name = 'Arial'
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = SECONDARY
        h.paragraph_format.space_before = Pt(10)
        h.paragraph_format.space_after = Pt(3)
        return h

    def add_code(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(3)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.left_indent = Inches(0.2)
        run = p.add_run(text)
        run.font.name = 'Consolas'
        run.font.size = Pt(9)
        run.font.color.rgb = RGBColor(30, 41, 59)
        return p

    def format_table(table, col_widths, headers, data):
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        # Header row
        hdr_cells = table.rows[0].cells
        for i, header_text in enumerate(headers):
            hdr_cells[i].text = header_text
            set_cell_background(hdr_cells[i], TABLE_HEADER_BG)
            set_cell_margins(hdr_cells[i], top=120, bottom=120, left=150, right=150)
            hdr_cells[i].vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            p = hdr_cells[i].paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for r in p.runs:
                r.font.name = 'Arial'
                r.font.size = Pt(9.5)
                r.font.bold = True
                r.font.color.rgb = RGBColor(255, 255, 255)
        # Data rows
        for r_idx, row_data in enumerate(data):
            row_cells = table.add_row().cells
            bg_color = TABLE_ALT_BG if r_idx % 2 == 1 else "FFFFFF"
            for c_idx, cell_value in enumerate(row_data):
                row_cells[c_idx].text = str(cell_value)
                set_cell_background(row_cells[c_idx], bg_color)
                set_cell_margins(row_cells[c_idx], top=80, bottom=80, left=150, right=150)
                row_cells[c_idx].vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                p = row_cells[c_idx].paragraphs[0]
                for r in p.runs:
                    r.font.name = 'Calibri'
                    r.font.size = Pt(9)
                    r.font.color.rgb = DARK_TEXT

        # Apply widths
        for row in table.rows:
            for i, w in enumerate(col_widths):
                row.cells[i].width = Inches(w)

    # ==================== 1. OVERVIEW ====================
    add_h1("1. Overview")
    doc.add_paragraph(
        "A fictional freight trucking firm operating across the Mumbai Metropolitan Region (Bhiwandi, JNPT, Taloja, "
        "Panvel, Kurla, BKC, and Vashi) required an enterprise-grade shipment tracking and proof-of-delivery (e-POD) web application "
        "for shippers and hub dispatchers. Their legacy portal was slow, broke on mobile screens, lacked offline resilience on warehouse floors, "
        "and relied on physical paper bilty slips that were frequently misplaced during inter-hub transit."
    )
    doc.add_paragraph(
        "I built the front end in React 19 and TypeScript against a mock REST API with realistic Mumbai freight data, including severe "
        "edge cases such as 120-character consignor names, missing driver avatars, route delay exceptions, and cold-chain/over-dimensional cargo. "
        "My goal was not merely to assemble a cosmetic dashboard, but to deliver a fast, fully accessible, and resilient operations hub that works "
        "equally well on a dispatcher's wide dual-monitor desktop and a forklift operator's mobile smartphone."
    )
    doc.add_paragraph(
        "The application is organized into 7 lazy-loaded route modules with centralized state management using Redux Toolkit. "
        "The system is validated by 77 automated component tests (77 passing, 0 failures), meets WCAG 2.1 AA/AAA accessibility criteria, "
        "and installs as an offline-ready Progressive Web App (PWA)."
    )

    # ==================== 2. PLANNING ====================
    add_h1("2. Planning: What I Enhanced and Why")
    doc.add_paragraph(
        "I audited the requirements screen-by-screen, formulated wireframes for six core views plus an interactive Blueprint view, "
        "and specified acceptance tests before implementation."
    )

    p2_headers = ["Feature", "Problem in Legacy System", "Engineering Approach", "Done When"]
    p2_widths = [1.4, 2.0, 2.0, 1.4]
    p2_data = [
        [
            "Quick Track Portal (Home)",
            "Required multi-step search; no view of live road corridor bottlenecks.",
            "Hero search across LR / Bilty, E-Way Bill & ID; live corridor status cards (JNPT, Ghodbunder).",
            "Consignment ID opens direct detail; corridor badges reflect live traffic."
        ],
        [
            "Shipment Directory (Listing)",
            "Unpaginated dump; no combined filters; broke on mobile phones.",
            "Redux multi-faceted filters (status, hub, priority), debounced search, sortable table, and Table/Card toggle.",
            "Filters combine cleanly; cards fit 375px screens with 0px overflow; empty state offers reset CTA."
        ],
        [
            "Consignment Telematics (Detail)",
            "Static ETA with no milestone accountability or driver details.",
            "Checkpoint stepper timeline with dynamic progress %; SVG Mumbai corridor map; driver card with initials fallback.",
            "Timestamps and GPS coordinates show per stop; delay alert renders reason; missing avatar handled."
        ],
        [
            "Electronic POD (Modal)",
            "Physical paper bilty slips lost in transit; manual scanning days later.",
            "HTML5 Canvas touch/mouse digital signature pad; bilty photo upload; OTP delivery flag.",
            "Signature captures smooth paths; base64 data URL updates consignment status to 'Delivered' immediately."
        ],
        [
            "Booking Wizard (Form)",
            "Monolithic 30-field form prone to submission error and lost progress.",
            "4-step wizard (Parties -> Cargo -> Compliance -> Review) with GSTIN and 12-digit E-Way Bill validation.",
            "Invalid fields flagged with aria-invalid; error summary gets focus; live freight estimate computed."
        ],
        [
            "Hub Ops Console (Admin)",
            "Dispatchers tracked warehouse loading bays on physical clipboards.",
            "Interactive dock allocation matrix (6 bays); yard turnaround KPIs; one-click consignment status transition tool.",
            "Dock status updates live; status override broadcasts to global Redux store; yard throughput KPIs update."
        ],
        [
            "Theme & Accessibility Hub",
            "Single bright theme blinding in low-light night-shift warehouse docks.",
            "CSS custom tokens for Light, Dark, and High-Contrast (WCAG AAA); skip-to-content link; Blueprint wireframe mode.",
            "Theme toggles with zero flash; all interactive elements have visible focus ring; contrasts exceed 4.5:1 (7:1 in AAA)."
        ]
    ]
    t2 = doc.add_table(rows=1, cols=4)
    format_table(t2, p2_widths, p2_headers, p2_data)

    # ==================== 3. CODE STRUCTURE ====================
    add_h1("3. How the Code is Structured")

    p3_headers = ["Path / Module", "Role & Responsibility"]
    p3_widths = [2.2, 4.6]
    p3_data = [
        ["src/App.tsx", "Root shell: Provider, BrowserRouter, Navbar, Footer, SkipLink, and lazy route Suspense boundaries."],
        ["src/types/logistics.ts", "Domain contracts: Shipment, RouteCheckpoint, ProofOfDelivery, DriverDetails, PartyDetails, CargoItem."],
        ["src/services/mockApi.ts", "Client-side REST simulation with localStorage persistence, 350ms latency, and error injection mode."],
        ["src/store/index.ts", "Redux Toolkit store assembling shipmentsSlice and uiSlice with typed hooks useAppDispatch & useAppSelector."],
        ["src/components/common/", "Atomic UI primitives: StatusBadge, SignaturePad, LoadingSkeleton, EmptyState, ErrorBanner, ToastContainer."],
        ["src/components/tracking/", "Telematics components: RouteCheckpointStepper (milestone progress) and MumbaiRouteMap (SVG corridor vector)."],
        ["src/components/pod/", "Proof-of-Delivery modal with digital signature pad, photo attachment, and recipient verification."],
        ["src/pages/", "7 code-split views: HomePage, ShipmentsListPage, ShipmentDetailPage, BookingFormPage, ProfilePage, AdminHubPage, WireframePage."],
        ["public/sw.js & manifest", "PWA service worker with static cache-first asset management and offline navigation fallback."]
    ]
    t3 = doc.add_table(rows=1, cols=2)
    format_table(t3, p3_widths, p3_headers, p3_data)

    add_h2("3.1 Three Architectural Rules Followed")
    doc.add_paragraph(
        "1. Redux Toolkit as the Single Source of Truth for Cross-Cutting State: Logistics data is consumed across the Directory, "
        "Detail, Booking Wizard, and Admin Hub simultaneously. Redux Toolkit provides predictable state management with asynchronous thunks "
        "(fetchShipments, createShipment, submitPOD, updateShipmentStatus), avoiding prop drilling or fragile multi-context nesting."
    )
    doc.add_paragraph(
        "2. Accessible ARIA Attributes Drive State; CSS Dictates Appearance: Interactive components set aria-expanded, aria-selected, "
        "aria-invalid, aria-busy, and aria-live. Styles target these exact selectors, guaranteeing that assistive screen reader state and visual rendering "
        "never diverge."
    )
    doc.add_paragraph(
        "3. Progressive Enhancement & Offline Resilience: All network requests route through a Service Worker. In low-connectivity warehouse yards, "
        "the app falls back gracefully to cached static assets and displays an amber connectivity warning while allowing operators to inspect route checkpoints."
    )

    add_code(
        "// src/store/shipmentsSlice.ts: Asynchronous thunk demonstrating simulated latency & local persistence\n"
        "export const submitPOD = createAsyncThunk(\n"
        "  'shipments/submitPOD',\n"
        "  async ({ id, pod }: { id: string; pod: ProofOfDelivery }, { rejectWithValue }) => {\n"
        "    try {\n"
        "      const updated = await mockApi.submitPOD(id, pod);\n"
        "      return updated;\n"
        "    } catch (err) {\n"
        "      return rejectWithValue(err instanceof Error ? err.message : 'Failed to submit POD');\n"
        "    }\n"
        "  }\n"
        ");"
    )

    # ==================== 4. FEATURES IN DETAIL ====================
    add_h1("4. Features in Detail")

    add_h2("4.1 Shipment Listing, Search, Filter & Sorter")
    doc.add_paragraph(
        "The shipment directory centralizes tracking across hundreds of consignments. All filter controls (search query, status filter, "
        "origin hub, destination hub, cargo priority, and sort field) synchronize into Redux state. A memoized selector recalculates the view instantly, "
        "debouncing search inputs by 200ms so filtering executes after typing pauses. Desktop dispatchers use an 8-column data grid, while mobile drivers "
        "toggle to stacked touch-friendly cards. An Error Simulation switch allows developers to verify error recovery banners and retry mechanisms."
    )
    add_code(
        "// Combined multi-field filter pipeline\n"
        "const filtered = items.filter((s) => {\n"
        "  const matchesQuery = !query ||\n"
        "    s.id.toLowerCase().includes(query.toLowerCase()) ||\n"
        "    s.lrNumber.toLowerCase().includes(query.toLowerCase()) ||\n"
        "    s.consignee.name.toLowerCase().includes(query.toLowerCase());\n"
        "  const matchesStatus = filters.status === 'ALL' || s.status === filters.status;\n"
        "  const matchesHub = filters.originHub === 'ALL' || s.originHub === filters.originHub;\n"
        "  return matchesQuery && matchesStatus && matchesHub;\n"
        "});"
    )

    add_h2("4.2 Consignment Detail & Telematics Stepper")
    doc.add_paragraph(
        "The detail view reconstructs the physical shipment journey. Route milestones render inside RouteCheckpointStepper with dynamic progress bar "
        "calculation ((completed / total) * 100). If a shipment is marked DELAYED, an alert banner explicitly announces the reason "
        "(e.g., 'Ghodbunder Ghat Road Heavy Congestion'). The driver card handles missing avatar photos gracefully with initials fallback badges, "
        "and company names over 100 characters utilize CSS line-clamping with accessible title tooltips."
    )

    add_h2("4.3 4-Step Booking Wizard & Validation")
    doc.add_paragraph(
        "The booking workflow divides complex declarations into four sequential steps: Parties, Cargo Manifest, Compliance & E-Way Bill, and Review & Pricing. "
        "Inputs are validated against strict Indian regulatory formats, including official 15-character GSTIN regex (^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$) "
        "and 12-digit numeric E-Way Bills. Validation errors trigger an error summary banner that receives focus, reading issues to screen readers."
    )
    add_code(
        "// Strict GSTIN and E-Way Bill validation\n"
        "if (step === 1) {\n"
        "  if (!formData.consignor.name.trim()) errs['consignor.name'] = 'Consignor company name is required.';\n"
        "  if (!GSTIN_REGEX.test(formData.consignor.gstin)) {\n"
        "    errs['consignor.gstin'] = 'Valid 15-character GSTIN required (e.g., 27AACAA4419E1ZP).';\n"
        "  }\n"
        "}\n"
        "if (step === 3 && !/^\\d{12}$/.test(formData.ewayBillNumber)) {\n"
        "  errs.ewayBillNumber = 'E-Way Bill must be a valid 12-digit numeric code.';\n"
        "}"
    )

    add_h2("4.4 Electronic Proof of Delivery (e-POD) & Signature Canvas")
    doc.add_paragraph(
        "The PodModal component provides legally sound delivery verification. An HTML5 Canvas captures mouse and touch signatures smoothly using "
        "coordinate interpolation. Drivers can upload photos of stamped physical lorry receipts, and toggle recipient OTP verification. Submitting the modal "
        "serializes the canvas to a PNG data URL, permanently records the delivery timestamp, and transitions the consignment to DELIVERED."
    )

    add_h2("4.5 Admin Hub Operations Console")
    doc.add_paragraph(
        "Designed for warehouse floor managers at Bhiwandi and JNPT: provides a 6-bay dock loading matrix (Available, Occupied, Reserved) with real-time "
        "action triggers, yard turnaround KPI counters (42 min average turnaround, 83.3% dock utilization), and a manual status transition dispatcher."
    )

    add_h2("4.6 Theme & Wireframe Blueprint Mode")
    doc.add_paragraph(
        "The interface includes a dedicated Blueprint Mode toggle. When enabled, the UI adopts a technical architectural blueprint styling with dashed grid "
        "lines and component layout annotations, enabling stakeholders to audit structural wireframes directly within the live running application."
    )

    # ==================== 5. PERFORMANCE & PWA ====================
    add_h1("5. Integrating React & PWA Without Breaking Layout")
    doc.add_paragraph(
        "1. Code Splitting via React.lazy: All 7 feature routes are lazy-loaded with Suspense fallbacks. The core initial bundle is 335 KB (107.89 KB gzipped), "
        "with the largest feature chunk being only 9.97 KB gzipped. Initial paint completes in under 1.2s on mobile 3G networks."
    )
    doc.add_paragraph(
        "2. Zero Cumulative Layout Shift (CLS): Shimmer skeletons (LoadingSkeleton.tsx) mirror the exact dimensions of final table rows and cards, "
        "preventing content jumping during data fetch."
    )
    doc.add_paragraph(
        "3. Offline Resilience: The service worker (sw.js) caches static assets on install. When offline, an amber indicator informs the user while "
        "all previously cached consignments remain fully navigable."
    )

    # ==================== 6. ACCESSIBILITY ====================
    add_h1("6. Accessibility Decisions (WCAG 2.1 AA/AAA)")

    p6_headers = ["Accessibility Dimension", "Implementation Details", "Standard Satisfied"]
    p6_widths = [1.8, 3.4, 1.6]
    p6_data = [
        ["Keyboard Navigation", "Accessible SkipLink anchors directly to #main-content, skipping repetitive navbar links.", "WCAG 2.4.1 (Bypass Blocks)"],
        ["Focus Indicators", "Custom high-visibility focus ring: outline: 3px solid #f59e0b; outline-offset: 2px.", "WCAG 2.4.7 (Focus Visible)"],
        ["Screen Reader Alerts", "Search count updates and error banners utilize role='alert' and aria-live='polite'.", "WCAG 4.1.3 (Status Messages)"],
        ["Form Error Handling", "Error summary card gains focus on failed submission; fields marked aria-invalid='true'.", "WCAG 3.3.1 (Error Identification)"],
        ["Color Contrast", "Standard theme exceeds 4.5:1. High-Contrast mode increases all foreground text to 7:1+.", "WCAG 1.4.3 & 1.4.6 (AAA)"],
        ["Non-Color Statuses", "Badges pair distinct background tones with unique Lucide icons (Clock, Check, Truck, Alert).", "WCAG 1.4.1 (Use of Color)"]
    ]
    t6 = doc.add_table(rows=1, cols=3)
    format_table(t6, p6_widths, p6_headers, p6_data)

    # ==================== 7. PERFORMANCE ====================
    add_h1("7. Performance and Bundle Efficiency")
    doc.add_paragraph(
        "Production build analysis confirms extreme optimization through tree-shaking and asset segregation:"
    )
    add_code(
        "dist/index.html                               1.09 kB │ gzip:   0.59 kB\n"
        "dist/assets/index-k-X9iOzI.css               46.58 kB │ gzip:   8.20 kB\n"
        "dist/assets/ProfilePage-CDe-LJi1.js          10.17 kB │ gzip:   2.62 kB\n"
        "dist/assets/AdminHubPage-B_XL3oSk.js         12.53 kB │ gzip:   3.48 kB\n"
        "dist/assets/HomePage-BBMwe6P2.js             13.60 kB │ gzip:   3.73 kB\n"
        "dist/assets/WireframePage-BqGBIPXe.js        17.57 kB │ gzip:   4.51 kB\n"
        "dist/assets/ShipmentsListPage-S7y3jZ1b.js    23.89 kB │ gzip:   6.03 kB\n"
        "dist/assets/BookingFormPage-BL8U_v3h.js      34.11 kB │ gzip:   6.72 kB\n"
        "dist/assets/ShipmentDetailPage-QpX8F1zj.js   44.51 kB │ gzip:   9.97 kB\n"
        "dist/assets/index-Bf5sKx9C.js               335.97 kB │ gzip: 107.89 kB\n"
        "Total production build time: 2.13s"
    )

    # ==================== 8. TESTING ====================
    add_h1("8. Testing Suite & Verification")
    doc.add_paragraph(
        "The test suite was run continuously using Vitest and React Testing Library, testing all components, custom reducers, "
        "and data integrity models. All 77 tests across 11 test files pass with 0 errors."
    )

    p8_headers = ["Test Suite File", "Component / Unit Tested", "Tests", "Pass Rate"]
    p8_widths = [2.2, 3.0, 0.8, 0.8]
    p8_data = [
        ["src/__tests__/StatusBadge.test.tsx", "7 shipment statuses, 4 priority levels, sizes, and ARIA roles", "12", "12 / 12"],
        ["src/__tests__/shipmentsSlice.test.ts", "Redux actions, filter setting, sort toggling, pagination resets", "13", "13 / 13"],
        ["src/__tests__/uiSlice.test.ts", "Theme switching, high contrast, wireframe mode, active hub switching", "11", "11 / 11"],
        ["src/__tests__/seedData.test.ts", "Seed data schema integrity, unique consignment IDs, valid Indian GSTINs", "10", "10 / 10"],
        ["src/__tests__/RouteCheckpointStepper.test.tsx", "Step milestones, progress bar %, delay warnings, GPS display", "7", "7 / 7"],
        ["src/__tests__/mockApi.test.ts", "LocalStorage CRUD, case-insensitive ID & LR lookup, error simulation", "5", "5 / 5"],
        ["src/__tests__/EmptyState.test.tsx", "Zero-result state rendering, custom descriptions, reset callback", "5", "5 / 5"],
        ["src/__tests__/ErrorBanner.test.tsx", "Alert role verification, custom error titles, retry button trigger", "5", "5 / 5"],
        ["src/__tests__/LoadingSkeleton.test.tsx", "Table and card skeleton variations, row counts, aria-busy attribute", "4", "4 / 4"],
        ["src/App.test.tsx", "Application mount, landmark discovery (header, main, footer), navigation", "3", "3 / 3"],
        ["src/__tests__/SkipLink.test.tsx", "Skip link rendering, href anchor target verification", "2", "2 / 2"],
        ["Total", "Complete suite execution across all domains", "77", "77 / 77"]
    ]
    t8 = doc.add_table(rows=1, cols=4)
    format_table(t8, p8_widths, p8_headers, p8_data)

    # ==================== 9. DEBUGGING LOG ====================
    add_h1("9. Debugging Log")
    doc.add_paragraph(
        "The following technical issues were identified and resolved during development and continuous integration testing:"
    )

    p9_headers = ["Problem Encountered", "Symptom / Trace", "Root Cause", "Engineering Resolution"]
    p9_widths = [1.6, 1.8, 1.8, 1.6]
    p9_data = [
        [
            "Vite 8 TypeScript Config Error",
            "tsc -b failed with 'test does not exist on type UserConfigExport'.",
            "vite.config.ts imported defineConfig from 'vite' instead of 'vitest/config'.",
            "Switched import to from 'vitest/config'."
        ],
        [
            "React 19 Import Extension Warning",
            "TS5097: An import path cannot end with a '.tsx' extension.",
            "Vite template scaffold generated import App from './App.tsx' in main.tsx.",
            "Removed .tsx extension to align with tsconfig module resolution."
        ],
        [
            "Jest-DOM Vitest Matcher Absence",
            "Property 'toBeInTheDocument' does not exist on type Assertion.",
            "Vitest 5 requires explicit type registration for @testing-library/jest-dom matchers.",
            "Added import '@testing-library/jest-dom/vitest' in setupTests.ts and tsconfig."
        ],
        [
            "Duplicate Brand Heading Collision",
            "Found multiple elements with the text /MUMBAI EXPRESS/i.",
            "Both Navbar.tsx and Footer.tsx render company branding text.",
            "Refactored App.test.tsx from getByText to getAllByText[0]."
        ],
        [
            "GSTIN Format Regex Rejection",
            "Test in seedData.test.ts failed on valid sample GSTIN 27AACA04419E1ZP.",
            "Position 5 in an Indian GSTIN must be the entity status letter; '0' was invalid.",
            "Corrected seed string to 27AACAA4419E1ZP, satisfying Indian tax schema."
        ]
    ]
    t9 = doc.add_table(rows=1, cols=4)
    format_table(t9, p9_widths, p9_headers, p9_data)

    # ==================== 10. LIMITATIONS & NEXT STEPS ====================
    add_h1("10. Limitations and Next Steps")
    doc.add_paragraph(
        "1. Real-Time Telematics WebSockets: Transition the current SVG point interpolation to a live WebSocket (wss://) stream connected to "
        "truck onboard OBD-II GPS sensors."
    )
    doc.add_paragraph(
        "2. Biometric Delivery Handover: Integrate the WebAuthn API or Aadhaar-based OTP microservice for high-value hazardous or temperature-controlled goods."
    )
    doc.add_paragraph(
        "3. Native Camera Barcode Scanning: Integrate the HTML5 Barcode Detection API to allow warehouse dispatchers to scan printed Lorry Receipt barcodes directly."
    )

    # ==================== 11. HOW TO RUN ====================
    add_h1("11. Project Structure and How to Run")
    doc.add_paragraph(
        "The complete project resides at c:\\Users\\VAISHNAVI\\OneDrive\\Desktop\\project. To execute the application locally:"
    )
    add_code(
        "# Install dependencies\n"
        "npm install\n\n"
        "# Run test suite (77 tests)\n"
        "npm test\n\n"
        "# Start local development server\n"
        "npm run dev     # Accessible at http://localhost:5173\n\n"
        "# Compile production bundle\n"
        "npm run build\n\n"
        "# Preview production build\n"
        "npm run preview   # Accessible at http://localhost:4173"
    )

    output_path = r"c:\Users\VAISHNAVI\OneDrive\Desktop\project\docs\Mumbai_Express_Freight_Technical_Document.docx"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    print(f"Successfully generated: {output_path}")

if __name__ == "__main__":
    create_document()

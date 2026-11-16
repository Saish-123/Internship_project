# Mumbai Express Freight (MEF) — Responsive Web App Wireframes

## Overview & Design System
- **Company**: Mumbai Express Freight (MEF Logistics)
- **Target Audience**: Shippers, Hub Managers (Bhiwandi, JNPT, Vashi, Taloja), Fleet Drivers
- **Design Philosophy**: Fast, Mobile-First, Accessible (WCAG 2.1 AA/AAA compliant), High Information Density
- **Color Palette**: 
  - Primary Dark: `#0F172A` (Navy/Slate)
  - Accent / Amber: `#D97706` (Freight Amber)
  - Success / Green: `#059669` (Delivered)
  - Warning / Alert: `#DC2626` (Delayed / Roadworks)
  - High Contrast mode support with pure `#000000` / `#FFFFFF` outlines.

---

## Screen 1: Home / Quick Track & Operational Overview
```
+------------------------------------------------------------------------+
| [LOGO MEF]  Mumbai Express Freight     [Bhiwandi Hub v]  [Role v] [Sun] |
+------------------------------------------------------------------------+
|                                                                        |
|  HERO SECTION:                                                         |
|  "Real-Time Freight Logistics Across Mumbai Metropolitan Region"       |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  | [Search Icon] Enter Tracking No (MFX-...), LR/Bilty or E-Way Bill|  |
|  | [ Quick Track Button ]                                           |  |
|  +------------------------------------------------------------------+  |
|  Sample tags: [ MFX-2026-BHW-08942 ] [ Delayed ODC: MFX-2026-JNP ]     |
|                                                                        |
|  KPI STATS CARDS:                                                      |
|  +------------------+  +------------------+  +----------------------+  |
|  | 24 Active Trucks |  | 98.4% On-Time    |  | 1,420 Tonnes Inward  |  |
|  | [12 In Transit]  |  | [Bhiwandi Super] |  | [JNPT Port cleared]  |  |
|  +------------------+  +------------------+  +----------------------+  |
|                                                                        |
|  OPERATIONAL CORRIDORS & REAL-TIME TRAFFIC NOTICES:                    |
|  [!] Kasara Ghat Ascent: Heavy fog advisory, convoy speed 30km/h       |
|  [!] Bhiwandi Mankoli Toll: Normal flow via Fastag lanes 3-6           |
|                                                                        |
|  QUICK ACTIONS:                                                        |
|  [+ Book New Shipment]   [View All Consignments]   [Hub Dock Manager]  |
+------------------------------------------------------------------------+
| FOOTER: MEF Logistics Portal | WCAG 2.1 AA Compliant | Offline Ready   |
+------------------------------------------------------------------------+
```

---

## Screen 2: Shipment Listing Dashboard
```
+------------------------------------------------------------------------+
| [LOGO MEF] Shipments Dashboard          [Bhiwandi Hub v]  [User: Manager]|
+------------------------------------------------------------------------+
|  Breadcrumb: Home > Shipments                                          |
|  Heading: Active Consignments (Showing 6 shipments)                    |
|                                                                        |
|  SEARCH & MULTI-FACETED FILTER BAR:                                    |
|  +----------------------------------+  +-------------+  +------------+ |
|  | [Search] Consignee, LR, Truck #  |  | Status: Allv|  | Origin:Allv| |
|  +----------------------------------+  +-------------+  +------------+ |
|  +---------------+  +--------------+  +-----------------------------+  |
|  | Destin: All v |  | Priority: All|  | [Reset Filters] [Err Sim]   |  |
|  +---------------+  +--------------+  +-----------------------------+  |
|                                                                        |
|  TABLE / CARD LIST (Responsive Mobile Grid / Desktop Table):           |
|  Columns: Tracking ID | Consignor -> Consignee | Cargo | Status | Action|
|  --------------------------------------------------------------------- |
|  [MFX-2026-BHW-08942] | Mahindra -> Bajaj Auto | 6,000kg| IN TRANSIT| > |
|  LR-MH-98124          | Bhiwandi -> Pune       | Auto   | Khalapur  |   |
|  --------------------------------------------------------------------- |
|  [MFX-2026-JNP-04189] | Shri Siddhivinayak...  |28,500kg| DELAYED   | > |
|  LR-MH-94820          | JNPT -> Taloja MIDC    | ODC    | Uran Toll |   |
|  --------------------------------------------------------------------- |
|  [MFX-2026-VAS-03312] | Maha Agro Fed -> N.B.  | 3,600kg| DELIVERED | > |
|  LR-MH-81092          | Vashi -> Andheri MIDC  | Produce| [POD img] |   |
|  --------------------------------------------------------------------- |
|  PAGINATION:                                                           |
|  Showing 1 - 5 of 6 results      [Rows: 10 v]    [< Prev] [1] [2] [Next>]|
+------------------------------------------------------------------------+
```

---

## Screen 3: Shipment Detail & Proof-of-Delivery
```
+------------------------------------------------------------------------+
| [< Back to Shipments]  Shipment: MFX-2026-BHW-08942      [Download LR] |
+------------------------------------------------------------------------+
|  STATUS BADGE: [ IN TRANSIT - EXPRESS ]  ETA: Today 18:00 IST          |
|                                                                        |
|  ROUTE CHECKPOINT TIMELINE (Interactive Stepper):                      |
|  (o) Bhiwandi SuperHub  ---> (o) Majiwada Toll ---> (*) Khalapur Toll  |
|      10:15 IST (Done)            13:40 IST (Done)       Current Checkpoint
|  ---> ( ) Talegaon Exit ---> ( ) Pune Chakan Gate 4B                   |
|           Upcoming (14:30)       Destination (18:00)                   |
|                                                                        |
|  2-COLUMN DETAIL GRID:                                                 |
|  +--------------------------------+  +-------------------------------+ |
|  | CONSIGNOR & CONSIGNEE DETAILS  |  | CARGO & VEHICLE MANIFEST      | |
|  | From: Mahindra Logistics Hub   |  | Goods: Engine Gearbox & Flange| |
|  | Address: Mankoli Park, Bhiwandi|  | Weight: 6,000 kg (24 Crates)  | |
|  | GSTIN: 27AABCM8291Q1ZP        |  | Value: Rs 18,50,000           | |
|  |                                |  | Vehicle: MH-04-GP-8291        | |
|  | To: Bajaj Auto Stamping Plant  |  | Driver: Tukaram More (+91...) | |
|  | Address: MIDC Chakan Phase 2   |  | Model: BharatBenz 2823C       | |
|  +--------------------------------+  +-------------------------------+ |
|                                                                        |
|  PROOF OF DELIVERY (POD) SECTION:                                      |
|  +------------------------------------------------------------------+  |
|  | [Check] Delivered: Yes/No | Recipient Name | Relationship        |  |
|  | Signature Preview: [ Digital Signature Canvas / Preview ]        |  |
|  | Consignment Bilty Stamped Photo: [ Image Preview or Upload CTA ] |  |
|  | [ Record Proof of Delivery Modal Trigger Button ]                |  |
|  +------------------------------------------------------------------+  |
+------------------------------------------------------------------------+
```

---

## Screen 4: Multi-Step Dispatch / Booking Form
```
+------------------------------------------------------------------------+
| [LOGO MEF] Create New Consignment Note (Bilty Booking)                 |
+------------------------------------------------------------------------+
|  PROGRESS STEPPER:                                                     |
|  [1. Consignor & Consignee] -> [2. Cargo & Vehicle] -> [3. Security] -> [4. Review]|
|                                                                        |
|  STEP 1: PARTIES DETAILS                                               |
|  +---------------------------------+  +------------------------------+ |
|  | Shipper (Consignor) Name *      |  | Consignee (Receiver) Name *  | |
|  | [ e.g. Tata Motors Hub ]        |  | [ e.g. Reliance Retail DC ]  | |
|  +---------------------------------+  +------------------------------+ |
|  | Shipper GSTIN (27AAAAA0000A1Z5) * | Consignee GSTIN *              | |
|  +---------------------------------+  +------------------------------+ |
|  | Origin Hub * [ Bhiwandi v ]     |  | Destination Hub * [ Pune v ] | |
|  +---------------------------------+  +------------------------------+ |
|  | Shipper Phone (+91 98...) *     |  | Delivery Address & Pincode * | |
|  +---------------------------------+  +------------------------------+ |
|                                                                        |
|  ACCESSIBLE VALIDATION:                                                |
|  Live field error messages with aria-invalid="true" & role="alert".    |
|                                                                        |
|  NAVIGATION ACTIONS:                                                   |
|  [ < Back Step ]                              [ Continue to Step 2 > ] |
+------------------------------------------------------------------------+
```

---

## Screen 5: User Profile & Hub Operational Preferences
```
+------------------------------------------------------------------------+
| [LOGO MEF] Operator Profile & Hub Preferences                          |
+------------------------------------------------------------------------+
|  USER IDENTITY & ROLE TOGGLE:                                          |
|  [Avatar] Rajesh Deshmukh                                              |
|  Role: (o) Hub Manager   ( ) Shipper Customer   ( ) Fleet Driver       |
|                                                                        |
|  ASSIGNED LOGISTICS HUB:                                               |
|  [ Bhiwandi Central SuperHub v ]  (Quick switch to JNPT, Vashi, Taloja)|
|                                                                        |
|  ACCESSIBILITY & DISPLAY PREFERENCES:                                  |
|  - High Contrast Mode (WCAG AAA):        [ Toggle ON/OFF ]             |
|  - Dark Mode:                            [ Toggle Light / Dark ]       |
|  - Audio Chimes on Inward Dispatch:      [ Toggle ON/OFF ]             |
|  - Compact Table Density:                [ Toggle Normal / Compact ]   |
|                                                                        |
|  OFFLINE & PWA CACHE STATUS:                                           |
|  Service Worker: Active (v1.0.0)                                       |
|  Offline Storage: 6 Consignments cached for disconnected field use     |
|  [ Clear Offline Storage & Reset Mock Seed Data ]                      |
+------------------------------------------------------------------------+
```

---

## Screen 6: Admin / Hub Operations View
```
+------------------------------------------------------------------------+
| [LOGO MEF] Hub Manager Operations Console — Bhiwandi Central SuperHub  |
+------------------------------------------------------------------------+
|  YARD THROUGHPUT METRICS:                                              |
|  +----------------+  +----------------+  +---------------------------+ |
|  | 14 Trucks Dock |  | 42 Min Avg Bay |  | 3 Active Exceptions       | |
|  | 6 Bays Free    |  | Turnaround     |  | [Kasara fog, Uran detour] | |
|  +----------------+  +----------------+  +---------------------------+ |
|                                                                        |
|  LOADING DOCK ALLOCATION MATRIX:                                       |
|  Bay 1: [MH-04-GP-8291] Loading (Pune Auto)         [Release Bay]      |
|  Bay 2: [MH-46-AR-4019] Weighbridge Cleared (ODC)   [Assign Driver]    |
|  Bay 3: [ Available ]                              [Allot Truck]      |
|  Bay 4: [MH-03-CP-9102] Manifest Signed             [Print Gate Pass]  |
|                                                                        |
|  QUICK SHIPMENT STATUS TRANSITION TOOL:                                |
|  Consignment: [ MFX-2026-BHW-08942 v ]                                 |
|  Update To:   [ In Transit v ]                                         |
|  New Checkpoint Location: [ Majiwada Junction Eastern Express ]        |
|  Remarks:     [ Cleared via Fastag lane 4 ]                            |
|  [ Update Consignment Status Live ]                                    |
+------------------------------------------------------------------------+
```

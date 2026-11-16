import React, { useState } from 'react';
import { 
  Grid3X3, 
  LayoutDashboard, 
  FileText, 
  Truck, 
  User, 
  Sliders, 
  Eye, 
  ExternalLink,
  Layers
} from 'lucide-react';

export const WireframePage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<number>(1);

  const screens = [
    { id: 1, title: 'Screen 1: Home & Quick Track', icon: Truck },
    { id: 2, title: 'Screen 2: Shipments Listing', icon: LayoutDashboard },
    { id: 3, title: 'Screen 3: Consignment Detail & POD', icon: FileText },
    { id: 4, title: 'Screen 4: Multi-Step Dispatch Form', icon: Layers },
    { id: 5, title: 'Screen 5: User Profile & Hub Settings', icon: User },
    { id: 6, title: 'Screen 6: Admin Hub Operations', icon: Sliders },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200 text-xs font-bold mb-2">
          <Grid3X3 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Low-Fidelity &amp; High-Fidelity UI Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Interactive Wireframe Blueprint Inspector
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Architectural wireframe layouts and responsive grid blueprints for all six core screens of the Mumbai Express Freight web application.
        </p>
      </div>

      {/* Screen Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3" role="tablist">
        {screens.map(s => {
          const isSelected = activeScreen === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveScreen(s.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Wireframe View Area */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 space-y-6">
        {activeScreen === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Wireframe 1: Home / Landing &amp; Quick Tracking Portal
              </h2>
              <span className="text-xs font-mono text-slate-400">Layout: 12-Column Responsive Grid</span>
            </div>

            <div className="font-mono text-xs p-5 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`+------------------------------------------------------------------------+
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
+------------------------------------------------------------------------+`}</pre>
            </div>
          </div>
        )}

        {activeScreen === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Wireframe 2: Shipment Listing Dashboard &amp; Filters
              </h2>
              <span className="text-xs font-mono text-slate-400">Layout: Multi-faceted Filter Bar + Responsive Data Table</span>
            </div>

            <div className="font-mono text-xs p-5 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`+------------------------------------------------------------------------+
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
+------------------------------------------------------------------------+`}</pre>
            </div>
          </div>
        )}

        {activeScreen === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Wireframe 3: Shipment Detail, Route Map &amp; Proof of Delivery
              </h2>
              <span className="text-xs font-mono text-slate-400">Layout: Checkpoint Stepper + SVG Telematics + e-POD Card</span>
            </div>

            <div className="font-mono text-xs p-5 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`+------------------------------------------------------------------------+
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
+------------------------------------------------------------------------+`}</pre>
            </div>
          </div>
        )}

        {activeScreen === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Wireframe 4: Multi-Step Dispatch Booking Wizard
              </h2>
              <span className="text-xs font-mono text-slate-400">Layout: 4-Step Stepper + Field Validation</span>
            </div>

            <div className="font-mono text-xs p-5 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`+------------------------------------------------------------------------+
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
+------------------------------------------------------------------------+`}</pre>
            </div>
          </div>
        )}

        {activeScreen === 5 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Wireframe 5: Operator Profile &amp; Preferences
              </h2>
              <span className="text-xs font-mono text-slate-400">Layout: Persona Switching + Accessibility Controls + PWA Cache</span>
            </div>

            <div className="font-mono text-xs p-5 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`+------------------------------------------------------------------------+
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
+------------------------------------------------------------------------+`}</pre>
            </div>
          </div>
        )}

        {activeScreen === 6 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Wireframe 6: Hub Manager Operations Console
              </h2>
              <span className="text-xs font-mono text-slate-400">Layout: Dock Bay Matrix + Live Checkpoint Dispatcher</span>
            </div>

            <div className="font-mono text-xs p-5 bg-slate-950 text-emerald-400 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`+------------------------------------------------------------------------+
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
+------------------------------------------------------------------------+`}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

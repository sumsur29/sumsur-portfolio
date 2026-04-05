# CMS Visual Guide

A step-by-step visual guide to using your portfolio CMS.

---

## 1️⃣ Login Flow

```
┌─────────────────────────────────────┐
│                                     │
│     http://localhost:3000/admin     │
│                                     │
│  ┌───────────────────────────────┐  │
│  │   Admin Portal                │  │
│  │   Sumsur Portfolio CMS        │  │
│  │                               │  │
│  │   Password: [____________]    │  │
│  │                               │  │
│  │   [    Sign In    ]           │  │
│  └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
           │
           │ (Correct Password)
           ▼
┌─────────────────────────────────────┐
│                                     │
│          Dashboard Redirect         │
│  → /admin/dashboard                 │
│                                     │
└─────────────────────────────────────┘
```

---

## 2️⃣ Dashboard Layout

```
┌────────────────────────────────────────────────────────────┐
│  Sumsur Portfolio CMS                      [  Logout  ]    │
│  Content Management System                                 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌────────┬────────┬────────┬────────┐                   │
│  │📝      │✍️      │📷      │⚙️      │                   │
│  │Articles│ Poems  │ Photos │Settings│                   │
│  └────────┴────────┴────────┴────────┘                   │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │   [Active Tab Content Displays Here]                │ │
│  │                                                      │ │
│  │   • Article list & forms                            │ │
│  │   • Poem list & forms                               │ │
│  │   • Photo grid & upload                             │ │
│  │   • Settings editors                                │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 3️⃣ Articles Tab

```
┌────────────────────────────────────────────────────────────┐
│  Articles                                [+ New Article]    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  When "+ New Article" is clicked:                         │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Title:     [Life in 2036                 ]           │ │
│  │ Slug:      life-in-2036 (auto-generated)             │ │
│  │ Date:      [February 20, 2026           ]           │ │
│  │ Category:  [Essay                        ]           │ │
│  │                                                      │ │
│  │ Excerpt:                                             │ │
│  │ [A vision of humanity ten years...      ]           │ │
│  │                                                      │ │
│  │ Content (Markdown):                                  │ │
│  │ [                                        ]           │ │
│  │ [# Life in 2036                          ]           │ │
│  │ [                                        ]           │ │
│  │ [The world has changed...                ]           │ │
│  │ [                                        ]           │ │
│  │                                                      │ │
│  │ [Create Article]  [Cancel]                           │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Existing Articles:                                        │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Life in 2036: The Great Divergence     [Edit][Delete]│ │
│  │ A vision of humanity ten years...                    │ │
│  │ February 20, 2026 • Essay                            │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ AI Won't Kill SaaS                     [Edit][Delete]│ │
│  │ The hottest debate in tech...                        │ │
│  │ February 26, 2026 • Essay                            │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 4️⃣ Poems Tab

```
┌────────────────────────────────────────────────────────────┐
│  Poems                                    [+ New Poem]      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  When "+ New Poem" is clicked:                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Title:     [उड़ने दो मुझे                ]           │ │
│  │ Language:  [Hindi  ▼]                                │ │
│  │ Date:      [2024                         ]           │ │
│  │ Image:     [/poems/udhne-do.jpg          ]           │ │
│  │                                                      │ │
│  │ Context (optional):                                  │ │
│  │ [Background story about this poem...     ]           │ │
│  │                                                      │ │
│  │ Poem Text:                                           │ │
│  │ [                                        ]           │ │
│  │ [उड़ने दो मुझे                            ]           │ │
│  │ [ये क़लम मेरे पंख हैं...                  ]           │ │
│  │ [                                        ]           │ │
│  │                                                      │ │
│  │ [Create Poem]  [Cancel]                              │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Existing Poems:                                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ उड़ने दो मुझे                         [Edit][Delete]│ │
│  │ उड़ने दो मुझे ये क़लम मेरे पंख हैं...                │ │
│  │ 🇮🇳 Hindi • 2024                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 5️⃣ Photos Tab

```
┌────────────────────────────────────────────────────────────┐
│  Photo Gallery                                             │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [nature(52)] [cities(12)] [people(8)] [wildlife(15)]     │
│  [smell-good(6)] [bw(10)]                                 │
│                                                            │
│  Currently viewing: nature                                 │
│                                                            │
│  Upload to: nature                                         │
│  [Choose Files] ← Click to select images                  │
│  "Uploading and optimizing images..." (during upload)      │
│                                                            │
│  Photo Grid:                                               │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐         │
│  │        │  │        │  │        │  │        │         │
│  │ Photo1 │  │ Photo2 │  │ Photo3 │  │ Photo4 │         │
│  │        │  │        │  │        │  │        │         │
│  │[Delete]│  │[Delete]│  │[Delete]│  │[Delete]│         │
│  │filename│  │filename│  │filename│  │filename│         │
│  └────────┘  └────────┘  └────────┘  └────────┘         │
│  (Hover to see delete button)                             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 6️⃣ Settings Tab

```
┌────────────────────────────────────────────────────────────┐
│  Site Settings                                             │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [About Page]  [Social Links]                             │
│  ───────────   ─────────────                              │
│                                                            │
│  About Page Content (Markdown):                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │ # About Sumeet                                       │ │
│  │                                                      │ │
│  │ I'm a venture capitalist, writer, and photographer.  │ │
│  │                                                      │ │
│  │ ## Background                                        │ │
│  │ ...                                                  │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  [Save Settings]                                           │
│                                                            │
│  OR when Social Links tab is active:                      │
│                                                            │
│  LinkedIn URL:                                             │
│  [https://linkedin.com/in/username     ]                  │
│                                                            │
│  Instagram URL:                                            │
│  [https://instagram.com/username       ]                  │
│                                                            │
│  Email:                                                    │
│  [your@email.com                       ]                  │
│                                                            │
│  [Save Settings]                                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 7️⃣ Toast Notifications

```
Success Toast (green):
┌─────────────────────────────────────┐
│ ✓ Article created successfully     │
└─────────────────────────────────────┘
(Auto-dismisses after 3 seconds)

Error Toast (red):
┌─────────────────────────────────────┐
│ ✗ Failed to upload photo            │
└─────────────────────────────────────┘
(Auto-dismisses after 3 seconds)
```

---

## 8️⃣ Data Flow Diagram

```
           User Action
                │
                ▼
      ┌─────────────────┐
      │  Frontend Form  │
      │  (React)        │
      └─────────────────┘
                │
                │ POST/PUT/DELETE
                ▼
      ┌─────────────────┐
      │   API Route     │
      │ (Next.js)       │
      └─────────────────┘
                │
                │ Check Auth
                ▼
      ┌─────────────────┐
      │   requireAuth() │
      │  (iron-session) │
      └─────────────────┘
                │
                │ If Authorized
                ▼
      ┌─────────────────┐
      │  File Operation │
      │  (fs module)    │
      └─────────────────┘
                │
                ▼
      ┌─────────────────────────────┐
      │   Data Storage              │
      │                             │
      │ • data/articles.json        │
      │ • data/poems.ts             │
      │ • public/photos/[category]/ │
      │ • data/settings.json        │
      │ • data/about.md             │
      └─────────────────────────────┘
                │
                │ Response
                ▼
      ┌─────────────────┐
      │  Success/Error  │
      │  Toast Message  │
      └─────────────────┘
```

---

## 9️⃣ File Structure Visualization

```
sumsur-site/
│
├── app/
│   ├── admin/                      ← Admin Panel
│   │   ├── page.tsx               (Login)
│   │   └── dashboard/
│   │       └── page.tsx           (Dashboard)
│   │
│   └── api/admin/                 ← API Routes
│       ├── auth/
│       │   ├── login/route.ts     (Login endpoint)
│       │   └── logout/route.ts    (Logout endpoint)
│       ├── articles/route.ts      (Articles CRUD)
│       ├── poems/route.ts         (Poems CRUD)
│       ├── photos/
│       │   ├── route.ts           (List/Delete)
│       │   └── upload/route.ts    (Upload)
│       └── settings/route.ts      (Settings)
│
├── components/admin/              ← CMS Components
│   ├── ArticlesManager.tsx
│   ├── PoemsManager.tsx
│   ├── PhotosManager.tsx
│   └── SettingsManager.tsx
│
├── data/                          ← Content Storage
│   ├── articles.json             ◄─ Articles
│   ├── poems.ts                  ◄─ Poems
│   ├── settings.json             ◄─ Settings
│   └── about.md                  ◄─ About page
│
├── public/photos/                 ← Photo Storage
│   ├── nature/
│   ├── cities/
│   ├── people/
│   ├── wildlife/
│   ├── smell-good/
│   └── bw/
│
├── lib/
│   ├── auth.ts                    ← Auth utilities
│   └── photo-index.json          ◄─ Photo index
│
└── .env.local                     ← Secrets
    ADMIN_PASSWORD=*****
    SESSION_SECRET=*****
```

---

## 🔄 Typical Workflow

### Creating an Article

```
1. Login at /admin
   ↓
2. Click "Articles" tab
   ↓
3. Click "+ New Article"
   ↓
4. Fill in form:
   - Title (slug auto-generates)
   - Date
   - Category
   - Excerpt
   - Content (markdown)
   ↓
5. Click "Create Article"
   ↓
6. See success toast
   ↓
7. Article appears in list
   ↓
8. data/articles.json updated
```

### Uploading Photos

```
1. Login at /admin
   ↓
2. Click "Photos" tab
   ↓
3. Select category (e.g., "nature")
   ↓
4. Click "Choose Files"
   ↓
5. Select 1 or more images
   ↓
6. Files upload & optimize
   ↓
7. See success toast
   ↓
8. Photos appear in grid
   ↓
9. Files saved to public/photos/nature/
10. lib/photo-index.json updated
```

---

## 🎨 Color Scheme

```
Background:
┌────────────────────────┐
│  Gradient Dark         │
│  slate-900 → purple-900│
└────────────────────────┘

Glass Panels:
┌────────────────────────┐
│  Backdrop blur         │
│  white/10 opacity      │
│  white/10 border       │
└────────────────────────┘

Primary Actions:
┌────────────────────────┐
│  Purple → Pink         │
│  Gradient buttons      │
└────────────────────────┘

Text:
┌────────────────────────┐
│  White headings        │
│  Gray-300 body text    │
│  Gray-400 meta         │
└────────────────────────┘
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 768px):
┌──────────┐
│  Single  │
│  Column  │
│  Layout  │
└──────────┘

Tablet (768px - 1024px):
┌─────────────────┐
│  2 Columns      │
│  Side by side   │
└─────────────────┘

Desktop (> 1024px):
┌───────────────────────────┐
│  Full dashboard layout    │
│  Max-width: 1280px        │
└───────────────────────────┘
```

---

This visual guide helps you understand the CMS structure and workflow at a glance. Refer to the other documentation files for detailed technical information.

<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/plane.svg" width="80" alt="Yes Pilot Logo" />
  <h1>Yes Pilot ✈️</h1>
  <p><b>Your money, on autopilot. A $10K+ Premium SaaS Personal Finance Assistant.</b></p>
  
  [![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-black.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
  [![Vite](https://img.shields.io/badge/Vite-Purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
</div>

---

## 🌟 What is Yes Pilot?

**Yes Pilot** is not just another budgeting app. It is a highly optimized, beautifully designed **Autonomous CFO**. 
Built with bleeding-edge SaaS UI tokens (inspired by *Linear, Vercel, and Stripe*), it tracks your expenses with zero friction and uses a sophisticated **Insights Engine** to analyze your burn rate, predict anomalies, and offer human-like financial advice.

---

## 🏗️ Architecture & Folder Structure

We follow a strict, scalable enterprise-level React architecture:

```text
src/
├── components/       # Reusable UI architecture
│   ├── Charts.jsx    # Chart.js powered Doughnut & Bar graphs
│   ├── ExpenseModal  # The blazing-fast, keyboard shortcut (C) logging engine
│   └── Layout.jsx    # Secure Dashboard wrapper & Mobile Bottom Nav
├── hooks/            # Global state controllers
│   ├── useAuth.jsx   # Manages Firebase/Supabase auth & persistent sessions
│   └── useExp...js   # Manages transaction arrays and data mutations
├── pages/            # Core routing destinations
│   ├── Landing.jsx   # High-converting public marketing funnel
│   ├── Pricing.jsx   # Premium SaaS tiered pricing models
│   ├── Login.jsx     # Hyper-stylized authentication gateway
│   └── Dashboard     # The "Command Center" metric dominance hierarchy
├── services/         # External API / Database logic
│   ├── authService   # Handles complex auth promises + local storage mocks
│   └── exp...Service # Handles CRUD operations for telemetry
├── utils/            # Pure mathematical & helper functions
│   ├── cn.js         # Tailwind class merging utility
│   └── insights...   # The AI brain: calculates burn rates & anomaly detection
└── index.css         # The Vercel/Linear design token epicenter (Auroras, glass)
```

---

## 🧠 How The "Insights Engine" Works (`/utils/insightsEngine.js`)

Unlike standard apps that just display amounts, Yes Pilot actively **thinks** about your money. 

1. **Burn Rate Monitoring:** Calculates `Total Spent / Budget` and injects urgency (e.g., changes Dashboard aura to RED if >90%).
2. **Weekly Velocity Tracking:** Compares a rolling 7-day window to the previous 7-day window. If velocity spikes >15%, it alerts you.
3. **Anomaly Detection:** Matrix-compares current month categories vs previous month categories. If "Food" jumps by $50 unnaturally, it actively warns you to dial Swiggy orders back.
4. **Behavioral Text Generation:** Returns highly conversational arrays to naturally speak to the user on the dashboard.

---

## ⚡ Core Features Breakdown

### 💎 **Bento Grid Command Center**
The dashboard is meticulously designed with a strict visual hierarchy. Top metrics (Remaining Budget & Total Spend) dominate the viewport in **5XL Fonts**, eliminating cognitive load. 

### 🚀 **Keyboard-First Frictionless Input**
Logging an expense takes exactly **2 seconds**:
1. Press `C` anywhere on the dashboard.
2. The modal springs open, auto-focusing the massive amount input.
3. Type the number, click a **Quick-Chip** category, and hit `<Enter>`. Done.

### 🎨 **Vercel / Linear Aesthetic**
- Complete eradication of generic templates. 
- Deep absolute blacks (`#000`), subtle noise overlay textures, floating **Aurora** mesh gradients.
- **Glassmorphism 2.0:** 1px inset borders with deep 32px drop shadows mapped to `framer-motion` spring animations.

### 🔐 **Airtight Routing**
- **Public Sandbox:** `/` (Landing Page), `/pricing`, and `/login` are freely available and highly polished marketing funnels.
- **Protected Fortress:** `/dashboard` is heavily gated by `useAuth`. Visiting `/` while logged in securely redirects you instantly.

---

## 💻 Running Locally

To start the Yes Pilot telemetry engines on your machine:

```bash
# 1. Install Dependencies
npm install

# 2. Boot the Vite Dev Server
npm run dev

# 3. Ship it to Production
npm run build
```

_Designed and engineered for Absolute Financial Dominance._ ✈️

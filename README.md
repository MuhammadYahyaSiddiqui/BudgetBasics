# 🍯 BudgetBasics — NextGen BudgetBee
### 🏆 Aptech Web Innovation Unleashed | Flagship Project Submission

[![Version](https://img.shields.io/badge/Version-5.0_Pro-10B981.svg?style=for-the-badge&logo=appveyor)](https://github.com/MuhammadYahyaSiddiqui/BudgetBasics)
[![Platform](https://img.shields.io/badge/Platform-100%25_Client--Side_SPA-4F46E5.svg?style=for-the-badge)](https://github.com/MuhammadYahyaSiddiqui/BudgetBasics)
[![License](https://img.shields.io/badge/License-MIT-F59E0B.svg?style=for-the-badge)](LICENSE)
[![Theme](https://img.shields.io/badge/Design-Obsidian_Black_%26_Mint_Green-040707.svg?style=for-the-badge)](https://github.com/MuhammadYahyaSiddiqui/BudgetBasics)

> **BudgetBasics** is a premier, full-featured financial literacy and intelligent budgeting platform built specifically for students and young professionals. Developed for the **Aptech Web Innovation Unleashed** competition under the theme **NextGen BudgetBee**, it combines algorithmic budgeting models, interactive visual simulators, an interactive expense tracking ledger, a gamified decision classifier, dynamic AI assistance, and printable certificates into a seamless, high-performance client-side Single Page Application.

---

## 📑 Table of Contents
1. [Executive Summary & Core Mission](#1-executive-summary--core-mission)
2. [Key Highlights & Architecture](#2-key-highlights--architecture)
3. [Comprehensive Module Breakdown](#3-comprehensive-module-breakdown)
4. [Complete Mathematical & Formula Reference](#4-complete-mathematical--formula-reference)
5. [Tech Stack & Design System](#5-tech-stack--design-system)
6. [Project Directory Structure](#6-project-directory-structure)
7. [Installation & Execution Guide](#7-installation--execution-guide)
8. [Data Layer & Persistence](#8-data-layer--persistence)
9. [Evaluation Criteria Compliance](#9-evaluation-criteria-compliance)
10. [Authors & Project Credits](#10-authors--project-credits)

---

## 1. Executive Summary & Core Mission

Managing personal finances is one of the most critical life skills, yet college and university students frequently struggle with handling pocket money, freelance earnings, or stipends without a structured framework. Impulse spending on cafe outings, food delivery, and digital subscriptions often leads to month-end deficits.

**BudgetBasics (NextGen BudgetBee)** bridges this literacy gap by translating complex financial concepts into an intuitive, gamified, and actionable dashboard.

### Core Objectives:
- **Demystify Budgeting:** Break down monthly allowances using proven mathematical allocation frameworks (50/30/20, 60/20/20, 40/20/40).
- **Gamify Decision Making:** Provide instant feedback on real-world student spending scenarios (Needs vs. Wants).
- **Encourage Reverse Budgeting:** Teach the *"Pay Yourself First"* methodology to guarantee monthly savings on Day 1.
- **Empower Goal Achievement:** Help students set S.M.A.R.T. milestone projections for laptops, emergency cushions, and tuition fees.
- **Provide AI Guidance:** Offer offline client-side AI financial advisory through **BeeBot AI**.

---

## 2. Key Highlights & Architecture

- **100% Client-Side Single Page Application (SPA):** Zero server/database setup required. Runs purely in modern web browsers with lightning-fast execution.
- **Obsidian Black & Mint Green Design Engine:** Deep obsidian black (`#040707`) background with high-contrast emerald/mint accents (`#10B981` / `#00E599`) and clean light mode toggle.
- **Modern Typography:** High-end fintech font pairing using **Outfit** (headings, branding, KPI numbers) and **Plus Jakarta Sans** (body text, tables, modals).
- **Multi-Currency Support:** Real-time dynamic switching between **PKR (Rs)**, **USD ($)**, **INR (₹)**, **EUR (€)**, and **GBP (£)** across all calculations.
- **Full CRUD Expense Planner:** Add, edit, delete, filter, categorize, and export student expenses to standard CSV files.
- **Interactive Discovery Tour:** Step-by-step guided onboarding walkthrough introducing all major tools.
- **Printable Certificate of Completion:** Verified achievement certificate with customizable student name and instant PDF print capability.

---

## 3. Comprehensive Module Breakdown

### 🎯 Module 1: Budgeting Fundamentals & Deep Dive Explainers
- **Income & Inflows:** Detailed analysis of student cash streams (family allowance, freelance gigs, scholarships) with the *Golden Inflow Rule*.
- **Fixed vs. Variable Expenses:** Interactive matrix distinguishing non-negotiable living costs from controllable lifestyle outflows, featuring the *7-Day Envelope Strategy*.
- **Pay Yourself First (Reverse Budgeting):** In-depth philosophy and step-by-step habit builder (`Income - 20% Savings = Safe to Spend`).
- **Interactive Accordion Deep Dives:** Expandable inline cards providing real-life examples, pro tips, and pitfalls to avoid.
- **Benchmark Student Budget Table:** Pre-populated typical monthly breakdown (Rs. 35,000 allowance reference).

### ⚖️ Module 2: Needs vs. Wants Decision Framework & Game
- **24-Hour Cooling Rule:** 3-step impulse purchase defense guide (Pause 24h &rarr; Calculate in Work Hours &rarr; Mindful Decision).
- **Interactive Classifier Game:** Test spending intuition across realistic student items (e.g. course books, cafe lattes, gaming passes) with real-time score tracking and feedback.

### 🧮 Module 3: 50-30-20 Split Calculator & Range Sliders
- **Allocation Rule Presets:** Standard (50/30/20), Hostel Student (60/20/20), and Aggressive Saver (40/20/40).
- **Live Range Slider:** Interactive allowance adjustment from 5,000 to 150,000+ with instant recalculation.
- **Live Chart.js Doughnut Visualization:** Dynamic chart updating smoothly on every keystroke and slider input.

### 🎯 Module 4: S.M.A.R.T. Savings Goal Planner & Multi-Bucket Manager
- **Goal Definition Engine:** Custom goal names, category tags (Tech, Education, Emergency, Vehicle, Lifestyle), target amounts, and monthly contribution capacity.
- **Milestone Timeline Projection:** Computes exact months to completion, funding progress %, daily saving pace, and weekly saving pace.
- **Savings Accumulation Timeline Chart:** Interactive Line chart visualizing monthly capital accumulation.
- **Multi-Goal Buckets CRUD:** Save multiple distinct goals to LocalStorage, deposit incremental funds, and track individual progress bars.

### 📊 Module 5: Personal Salary & Expense Budget Planner (CRUD)
- **Dynamic Salary & Target Goal Configuration:** Set custom income and custom savings target percentage (1% to 90%).
- **Interactive Expense Ledger:** Record date, category, expense type (Need / Want), description, and amount.
- **Category Filter & Live Search:** Instantly filter records by Food, Transport, Education, Utilities, Entertainment, Shopping, etc.
- **CSV Data Export:** One-click download of all expense records into clean `.csv` format.
- **Real-Time KPI Cards:** Total Income, Total Spent, Spent Ratio %, Target Savings, and Remaining Net Surplus/Deficit.

### 🤖 Module 6: Dynamic Smart Financial Advisor Engine
- **Algorithmic State Evaluation:** Evaluates budget health into 4 distinct states (*Goal Achieved*, *Target at Risk*, *Wants High*, *Deficit Recovery*).
- **Automated Safe Spending Limits:** Recommends daily discretionary caps and essential reserve buffers.
- **Category Breakdown & Comparison Charts:** Chart.js Doughnut chart for category distribution and Grouped Bar chart comparing Targets vs. Actuals.

### 🛡️ Module 7: Top Student Money Mistakes & Solutions
- **Searchable Accordion Gallery:** 6 major student financial mistakes (Impulse ordering, skipping emergency cushions, unmonitored recurring subscriptions, buy-now-pay-later traps, etc.) with tangible solutions.

### 🖼️ Module 8: Visual Infographics & Knowledge Gallery
- **Visual Learning Cards:** Interactive infographic gallery with topic filters (*All Topics*, *Budgeting*, *Savings*, *Smart Spending*).
- **Detail Lightbox Modal:** Full-screen modal with comprehensive takeaways, checklists, and visual breakdowns.

### 🩺 Module 9: Financial Health Scorecard & Printable Certificate
- **4-Pillar Diagnostic Matrix:** Evaluates savings timing, impulse resistance, tracking discipline, and emergency readiness.
- **Verified Certificate of Achievement:** High-resolution printable certificate with real-time name customization and verification ID (`BB-APTECH-2026`).

### 💬 Module 10: BeeBot AI Floating Assistant & Contact Helpdesk
- **Client-Side NLP Rule Matcher:** Answers student financial queries instantly offline.
- **Suggested Quick Prompts:** One-click prompts for quick answers.
- **Voice Synthesis (Text-to-Speech):** Optional Web Speech API audio playback.
- **Zero-Backend Feedback & Contact Form:** Client-side form validation with toast notifications.

---

## 4. Complete Mathematical & Formula Reference

Every calculation on BudgetBasics is mathematically structured and executed in pure JavaScript:

### 1. The 50-30-20 & Custom Split Formula
Given a monthly allowance / income $I$:
$$\text{Needs Allocation} = I \times R_{\text{needs}}$$
$$\text{Wants Allocation} = I \times R_{\text{wants}}$$
$$\text{Savings Allocation} = I \times R_{\text{savings}}$$

Where default split ratios are:
- $R_{\text{needs}} = 0.50$, $R_{\text{wants}} = 0.30$, $R_{\text{savings}} = 0.20$
- Hostel Student model: $R_{\text{needs}} = 0.60$, $R_{\text{wants}} = 0.20$, $R_{\text{savings}} = 0.20$
- Aggressive Saver model: $R_{\text{needs}} = 0.40$, $R_{\text{wants}} = 0.20$, $R_{\text{savings}} = 0.40$

---

### 2. S.M.A.R.T. Savings Goal Projections & Pacing
Given a Goal Target Amount $T$, Current Accumulated Savings $C$, and Monthly Contribution $M$:

$$\text{Remaining to Save} = \max(0, T - C)$$
$$\text{Funding Progress (\%)} = \min\left(100, \text{round}\left(\frac{C}{T} \times 100\right)\right)$$
$$\text{Months to Target} = \lceil \frac{\text{Remaining}}{M} \rceil$$
$$\text{Weekly Saving Pace} = \text{round}\left(\frac{M}{4}\right)$$
$$\text{Daily Saving Pace} = \text{round}\left(\frac{M}{30}\right)$$

---

### 3. Expense Planner Budget Variance & Health Calculations
Given Monthly Salary $S$, Custom Target Savings Percentage $P_{\text{savings}}$, and logged expenses $E_1, E_2, \dots, E_n$:

$$\text{Total Spent} = \sum_{i=1}^{n} E_i.\text{amount}$$
$$\text{Remaining Budget} = S - \text{Total Spent}$$
$$\text{Spent Ratio (\%)} = \text{round}\left(\frac{\text{Total Spent}}{S} \times 100\right)$$

Dynamic category targets:
$$\text{Target Savings} = \text{round}\left(S \times \frac{P_{\text{savings}}}{100}\right)$$
$$\text{Target Needs} = \text{round}\left(S \times \frac{P_{\text{needs}}}{100}\right) \quad (\text{where } P_{\text{needs}} = 50\% \text{ default})$$
$$\text{Target Wants} = \max\left(0, S - \text{Target Needs} - \text{Target Savings}\right)$$

Category usage percentages:
$$\text{Needs Used (\%)} = \min\left(100, \text{round}\left(\frac{\text{Spent Needs}}{\text{Target Needs}} \times 100\right)\right)$$
$$\text{Wants Used (\%)} = \min\left(100, \text{round}\left(\frac{\text{Spent Wants}}{\text{Target Wants}} \times 100\right)\right)$$
$$\text{Daily Safe Wants Allowance} = \max\left(0, \text{round}\left(\frac{\text{Target Wants} - \text{Spent Wants}}{15}\right)\right)$$

---

### 4. Financial Health Scorecard Matrix (Score out of 40)
The diagnostic quiz evaluates 4 pillars with specific point weightings:
- **Pillar 1 (Savings Timing):** Immediate Day 1 = 10 pts, Mid-month = 6 pts, Month-end = 2 pts, Never = 0 pts.
- **Pillar 2 (Impulse Delay 24h):** Always apply 24h rule = 10 pts, Check 30% wants room = 6 pts, Buy immediately = 2 pts.
- **Pillar 3 (Expense Tracking):** Daily consistent tracking = 10 pts, Mental estimate = 6 pts, No tracking = 2 pts.
- **Pillar 4 (Emergency Cushion):** 1-2 months expenses = 10 pts, Less than 1 month = 6 pts, Zero fund = 0 pts.

$$\text{Health Score} = \sum_{j=1}^{4} \text{Pillar}_j \quad (0 \le \text{Score} \le 40)$$

| Score Range | Classification | Action Diagnosis |
| :--- | :--- | :--- |
| **34 – 40** | 🌟 Master of Financial Discipline | Optimal savings discipline and bulletproof habits. |
| **24 – 33** | 🟢 Good Financial Discipline | Solid foundation; tighten impulse delays and emergency buffer. |
| **14 – 23** | 🟡 Developing Financial Habits | Inconsistent tracking; adopt the Pay-Yourself-First habit immediately. |
| **0 – 13** | 🔴 Budget at High Risk | High month-end deficit risk; execute emergency recovery plan. |

---

## 5. Tech Stack & Design System

| Technology / Library | Version | Purpose / Role |
| :--- | :--- | :--- |
| **HTML5 (Semantic)** | 5.0 | Accessible structure, ARIA roles, microdata tags |
| **CSS3 (Custom System)** | 3.0 | CSS variables, Obsidian Dark & Mint Green palette |
| **JavaScript (ES6+)** | Modern | Pure client-side logic, modular architecture, LocalStorage |
| **Bootstrap** | 5.3.3 | Responsive grid, dropdowns, modals, and collapsible components |
| **Chart.js** | 4.4.1 | High-performance canvas chart visualizations |
| **FontAwesome** | 6.5.1 | Iconography and navigation indicators |
| **Google Fonts** | Outfit & Plus Jakarta Sans | Modern fintech typography and high legibility |

---

## 6. Project Directory Structure

```
d:/APTECH PROJECT/
├── index.html                   # Main Single Page Application entrypoint
├── css/
│   ├── main.css                 # Obsidian Black & Mint Green theme system & typography
│   ├── components.css           # Calculators, charts, modals, chatbot & table styles
│   └── responsive.css           # Mobile drawer, breakpoint scaling & print rules
├── js/
│   ├── app.js                   # Application controller, clock, currency & ticker
│   ├── calculators.js           # 50-30-20 & S.M.A.R.T savings goal calculator engine
│   ├── planner.js               # Full CRUD expense planner, advisor & CSV exporter
│   ├── quiz.js                  # Needs vs Wants game & knowledge check quizzes
│   ├── chatbot.js               # BeeBot AI client-side NLP pattern engine & TTS
│   ├── gallery.js               # Infographics gallery, live search & mistakes accordion
│   ├── offline_data.js          # Offline fallback JSON data caches
│   └── tour.js                  # Interactive step-by-step discovery tour guide
├── data/
│   ├── sample_budget.json       # Pre-configured student budget benchmarks
│   ├── mistakes.json            # Common money mistakes and recovery strategies
│   ├── chatbot_kb.json          # BeeBot AI NLP intents and answer knowledge base
│   ├── quiz_data.json           # Interactive game questions and classification data
│   ├── infographics.json        # Infographic metadata and educational points
│   └── quotes.json              # Dynamic daily financial wisdom ticker quotes
├── BudgetBasics_Aptech_Final_Project_Report.pdf # Formal PDF documentation report
├── ReadMe.doc                   # Aptech mandatory submission instructions
└── README.md                    # Technical documentation & project manifest
```

---

## 7. Installation & Execution Guide

BudgetBasics is completely self-contained with **zero dependencies or backend configuration required**.

### Option A: Instant Direct Browser Launch (Fastest)
1. Navigate to the project root folder: `d:/APTECH PROJECT/`.
2. Double-click **`index.html`** or right-click &rarr; *Open with Google Chrome / Microsoft Edge / Mozilla Firefox / Brave*.
3. All calculators, games, charts, and CRUD modules run immediately.

### Option B: Local Web Server (Recommended for full JSON fetch compatibility)
To test with local `fetch()` requests against the `data/` JSON files:
1. Open PowerShell / Command Prompt in `d:/APTECH PROJECT/`:
   ```powershell
   python -m http.server 8000
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```
3. Or using VS Code: Right-click `index.html` &rarr; **"Open with Live Server"**.

---

## 8. Data Layer & Persistence

- **LocalStorage Storage Keys:**
  - `budgetbasics_theme`: Stores active UI theme (`dark` / `light`).
  - `budgetbasics_user_salary`: Stores user configured monthly income (e.g., `35000` or `50000`).
  - `budgetbasics_user_savings_target_percent`: Stores chosen savings target (e.g., `20%`).
  - `budgetbasics_planner_expenses`: JSON array of all logged expense records.
  - `budgetbasics_saved_goals`: JSON array of custom savings goal buckets.
  - `budgetbasics_cert_name`: Stores the customized student name for certificate generation.
- **Fail-Safe Offline Mode:** If external JSON files cannot be fetched via `file://` protocol, `offline_data.js` automatically populates the application with full offline datasets.

---

## 9. Evaluation Criteria Compliance

| Evaluation Parameter | Aptech Requirement | BudgetBasics Implementation |
| :--- | :--- | :--- |
| **Theme & Purpose** | NextGen BudgetBee / Financial Literacy | 100% focused on student finance, 50-30-20 rule, and savings habits |
| **Architecture** | Client-Side SPA | 100% client-side HTML5/CSS3/ES6+, zero server requirement |
| **Responsiveness** | Mobile, Tablet, Desktop (320px+) | Fluid containers, slide drawer, responsive navbar, tested on 100% and 90% zoom |
| **Calculators & Logic** | Interactive budgeting & goal tools | Dynamic 50-30-20 slider, custom split models, multi-bucket savings estimator |
| **Data Tracking (CRUD)** | Expense Planner & Export | Add, Edit, Delete, Filter, and 1-click CSV export |
| **Interactivity & Gamification**| Educational engagement | Needs vs Wants classifier game, knowledge check quiz, financial health matrix |
| **Visual Aesthetics** | Modern, premium, accessible | Obsidian Black & Mint Green (`#040707` + `#10B981`), Outfit & Plus Jakarta Sans typography |
| **Documentation** | Complete report, ReadMe, PDF | Professional README.md, ReadMe.doc, and generated PDF report |

---

## 10. Authors & Project Credits

### 👥 Development Team & Contributors

| Team Member | Role | GitHub Profile |
| :--- | :--- | :--- |
| **Muhammad Yahya Siddiqui** | 👑 Team Lead & Lead Developer | [@MuhammadYahyaSiddiqui](https://github.com/MuhammadYahyaSiddiqui) |
| **Ibad Khan** | 💻 Frontend & UI Contributor | [@ibadlabs732](https://github.com/ibadlabs732/) |
| **Arsalan Shah** | 📊 Research & Content Contributor | [@arsalananwar382-cpu](https://github.com/arsalananwar382-cpu) |
| **Harmain Hussain** | 🎨 UI/UX & QA Contributor | [@Harmain-Hussain](https://github.com/Harmain-Hussain/) |

---

### 🏆 Academic Evaluation
- **Institution:** Aptech Computer Education
- **Competition:** Aptech Web Innovation Unleashed 2026
- **Project Theme:** NextGen BudgetBee
- **Submission Date:** September 2026

---
*Developed with excellence by Team BudgetBasics for the Aptech Web Innovation Unleashed Evaluation 2026.*

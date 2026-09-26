# BudgetBasics — NextGen BudgetBee
### Web Innovation Unleashed | Aptech Project Submission

**Project Title:** BudgetBasics — Student Financial Literacy & Smart Budgeting Portal  
**Category:** Web Innovation Unleashed  
**Theme:** NextGen BudgetBee  
**Version:** 1.0  
**Target Platform:** Pure Client-Side Single Page Application (SPA)

---

## 1. Project Overview & Problem Definition
Managing personal finances is a critical life skill, yet college students and beginners frequently struggle with handling allowances, part-time earnings, or scholarships without an intuitive framework. Discretionary spending on daily treats, subscriptions, and impulse buys often leads to month-end financial crisis.

**BudgetBasics** solves this challenge by providing an engaging, responsive educational platform featuring:
- **Budgeting Basics & Monthly Allocation Model:** Educational breakdown of Income, Fixed vs. Variable costs, and Pay-Yourself-First habits.
- **Interactive 50-30-20 Calculator:** Real-time mathematical allocation with Chart.js visualization and currency switcher.
- **Savings Goal Projection Estimator:** Dynamic milestone forecasting with month-by-month calculations.
- **Needs vs. Wants Interactive Classifier:** Gamified student spending decision game with instant feedback.
- **Session Expense Tracker (CRUD):** Add, Edit, Delete, Filter, and Export expenses to CSV.
- **Common Money Mistakes Accordion:** Real-life student scenarios with tangible impact and corrective action steps.
- **Visual Infographics & Searchable Gallery:** Lightbox modal viewing with topic-based filtering.
- **BeeBot AI Financial Assistant:** Client-side NLP rule matcher answering finance queries instantly.
- **Client-Side Validated Feedback & Contact:** Zero-backend form handling with toast confirmation.

---

## 2. Technical Architecture & Constraints Compliance
- **No-Backend Architecture:** 100% pure client-side execution. No SQL/PHP/Node server required.
- **Data Persistence:** Client-side `LocalStorage` and `SessionStorage` for user customized expense logs and preferences.
- **JSON Test Data Layer:** All knowledge base intents, quotes, sample budgets, infographics, and quiz items are served from structured JSON files in the `data/` directory.
- **Google Lighthouse Optimization:** High contrast, semantic HTML5 tags, zero layout shifts, responsive down to 320px screens.

---

## 3. Project Directory Structure
```
d:/APTECH PROJECT/
├── index.html                   # Main Single Page Application entrypoint
├── css/
│   ├── main.css                 # Theme engine, CSS variables, typography & layout
│   ├── components.css           # Calculators, CRUD table, Quiz, Chatbot styles
│   └── responsive.css           # Mobile drawer, breakpoints & print stylesheets
├── js/
│   ├── app.js                   # Main application controller, clock & counter
│   ├── calculators.js           # 50-30-20 & Savings goal calculation logic
│   ├── planner.js               # Expense planner CRUD & CSV export
│   ├── quiz.js                  # Needs vs Wants interactive game & quiz engine
│   ├── chatbot.js               # BeeBot AI client-side NLP pattern engine
│   └── gallery.js               # Infographics gallery, search & mistake accordions
├── data/
│   ├── sample_budget.json       # Pre-configured student budget benchmarks
│   ├── mistakes.json            # Money mistake scenarios & solutions
│   ├── chatbot_kb.json          # AI Chatbot NLP intents and responses
│   ├── quiz_data.json           # Interactive game items and knowledge checks
│   ├── infographics.json        # Infographic metadata and bullet points
│   └── quotes.json              # Dynamic financial quotes ticker
├── README.md                    # Technical documentation & project manifest
├── ReadMe.doc                   # Mandatory Aptech installation instructions
└── BudgetBasics_Aptech_Final_Project_Report.pdf # Final submission documentation
```

---

## 4. Installation & Execution Instructions (Mandatory)
1. **Option A (Instant Browser Launch):**
   - Double click `index.html` or right-click `index.html` -> "Open with Google Chrome / Microsoft Edge / Firefox".
2. **Option B (Recommended Local Web Server for full JSON fetch compatibility):**
   - In VS Code, install the "Live Server" extension, right-click `index.html` and select **"Open with Live Server"**.
   - Or open PowerShell in the project directory and run:
     ```powershell
     python -m http.server 8000
     ```
   - Navigate to `http://localhost:8000` in your web browser.

---

## 5. Assumptions Made
1. All monetary values represent educational benchmarks and can be toggled across PKR, USD, INR, EUR, and GBP.
2. Form submissions simulate realistic client-side interaction without transmitting PII (Personally Identifiable Information) to external servers.
3. The AI Chatbot functions offline without third-party paid API keys, utilizing client-side NLP token matching.

---
*Developed for Aptech Web Innovation Unleashed Evaluation 2026.*

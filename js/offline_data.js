/**
 * BUDGETBASICS - FALLBACK & OFFLINE DATA STORE
 * Ensures 100% functionality whether opened via http:// or file:// protocol
 */

const OFFLINE_DATA = {
  sampleBudget: {
    currency: "PKR",
    monthlyIncome: 35000,
    categories: [
      {
        type: "Needs (50%)",
        budgeted: 17500,
        items: [
          { name: "University Bus Pass & Daily Commute", amount: 6500, category: "Transport", essential: true },
          { name: "Textbooks, Stationery & Internet Bundle", amount: 4000, category: "Education", essential: true },
          { name: "Hostel Food & Campus Canteen Meals", amount: 7000, category: "Food", essential: true }
        ]
      },
      {
        type: "Wants (30%)",
        budgeted: 10500,
        items: [
          { name: "Weekend Hangouts & Fast Food Delivery", amount: 4500, category: "Food", essential: false },
          { name: "Streaming & Gaming Subscriptions", amount: 2500, category: "Entertainment", essential: false },
          { name: "Apparel, Shoes & Accessories", amount: 3500, category: "Shopping", essential: false }
        ]
      },
      {
        type: "Savings (20%)",
        budgeted: 7000,
        items: [
          { name: "Emergency Student Cushion Fund", amount: 4000, category: "Savings", essential: true },
          { name: "Laptop / Certification Goal Fund", amount: 3000, category: "Savings", essential: true }
        ]
      }
    ]
  },
  mistakes: [
    {
      id: 1,
      title: "Impulse Buying & Emotional Spending",
      category: "Spending Habits",
      icon: "fa-bolt",
      severity: "High Impact",
      scenario: "Ali saw a flashy smartwatch on flash sale for PKR 8,000 and purchased it instantly without checking his remaining monthly allowance.",
      consequence: "Ran out of cash by the 20th of the month and had to borrow money for university bus fares and exam materials.",
      correctiveAction: "Implement the '24-Hour Rule'. Wait a full day before buying non-essential items over PKR 1,500 to evaluate true necessity."
    },
    {
      id: 2,
      title: "Ignoring Small Daily Leakages ('Latte Factor')",
      category: "Daily Expenses",
      icon: "fa-mug-hot",
      severity: "Medium Impact",
      scenario: "Sara buys a PKR 350 specialty cold coffee and snacks between lectures every weekday, thinking 'it's just small change'.",
      consequence: "PKR 350 × 22 class days = PKR 7,700 per month spent unconsciously on snacks without budgeting.",
      correctiveAction: "Carry a reusable bottle and home snacks. Allocate a fixed weekly treat limit (e.g. PKR 1,000 max) to keep snacks in check."
    },
    {
      id: 3,
      title: "Unused Subscriptions & Auto-Renewals",
      category: "Recurring Costs",
      icon: "fa-credit-card",
      severity: "Medium Impact",
      scenario: "Hamza signed up for 30-day free trials on two premium fitness and streaming apps, entered card details, and forgot to cancel.",
      consequence: "Auto-deducted PKR 3,200 every month for 4 months without actively using either service.",
      correctiveAction: "Audit your bank/card statements monthly. Set calendar reminders 3 days before any free trial expires."
    },
    {
      id: 4,
      title: "Spending Without a Budget Plan",
      category: "Planning",
      icon: "fa-compass",
      severity: "Critical",
      scenario: "Zain receives his monthly allowance of PKR 25,000 and spends freely during the first two weeks, assuming the balance will last.",
      consequence: "Frequent month-end financial stress, relying on loans or skipping essential study resources.",
      correctiveAction: "Adopt the 50-30-20 Rule on day one. Allocate 50% for fixed needs, 20% into savings, and split the remaining 30% across 4 weeks."
    },
    {
      id: 5,
      title: "Delaying Savings ('I Will Save When I Earn More')",
      category: "Savings Mindset",
      icon: "fa-piggy-bank",
      severity: "Long-Term Impact",
      scenario: "Bilal believes saving only matters once he lands a full-time corporate job after graduation, saving PKR 0 from current stipend.",
      consequence: "Missed the power of compound interest and lacks an emergency safety net when unexpected medical or exam fees arise.",
      correctiveAction: "Start saving even 10% or PKR 500/month today. Habit formation is far more crucial than the initial monetary amount."
    },
    {
      id: 6,
      title: "Late Fee Penalties & Overdrafts",
      category: "Financial Management",
      icon: "fa-triangle-exclamation",
      severity: "High Impact",
      scenario: "Ayesha frequently pays utility, hostel dues, or semester exam fees 2-3 days past due date, incurring 10-15% surcharges.",
      consequence: "Wasted PKR 4,000 annually purely on late payment fines that could have gone towards textbooks or savings.",
      correctiveAction: "Schedule recurring automatic bill reminders on your smartphone or pay fixed dues on the day income is received."
    }
  ],
  infographics: [
    {
      id: "info-50-30-20",
      title: "The 50-30-20 Rule Visual Breakdown",
      topic: "budgeting",
      categoryLabel: "Budget Framework",
      summary: "Visual guide demonstrating how to divide any monthly student allowance into 50% Needs, 30% Wants, and 20% Savings.",
      icon: "fa-chart-pie",
      svgGraphic: `<svg viewBox="0 0 300 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="70" fill="none" stroke="#4F46E5" stroke-width="35" stroke-dasharray="220 220" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#F59E0B" stroke-width="35" stroke-dasharray="132 308" stroke-dashoffset="-220" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#10B981" stroke-width="35" stroke-dasharray="88 352" stroke-dashoffset="-352" />
        <text x="100" y="105" text-anchor="middle" font-weight="bold" fill="#ffffff" font-size="14">50/30/20</text>
        <rect x="190" y="50" width="12" height="12" fill="#4F46E5" rx="3" />
        <text x="210" y="61" fill="#cbd5e1" font-size="12" font-weight="bold">50% Needs</text>
        <rect x="190" y="90" width="12" height="12" fill="#F59E0B" rx="3" />
        <text x="210" y="101" fill="#cbd5e1" font-size="12" font-weight="bold">30% Wants</text>
        <rect x="190" y="130" width="12" height="12" fill="#10B981" rx="3" />
        <text x="210" y="141" fill="#cbd5e1" font-size="12" font-weight="bold">20% Savings</text>
      </svg>`,
      bulletPoints: [
        "50% Needs: Housing, groceries, commute, utilities, prescribed textbooks",
        "30% Wants: Hobbies, eating out, gaming passes, clothing shopping",
        "20% Savings: Emergency fund, laptop goal, investment reserves"
      ]
    },
    {
      id: "info-needs-vs-wants",
      title: "Needs vs Wants Decision Matrix",
      topic: "smart-spending",
      categoryLabel: "Decision Flow",
      summary: "A 3-step decision flow diagram that guides students through impulse evaluation before making any purchase.",
      icon: "fa-scale-balanced",
      svgGraphic: `<svg viewBox="0 0 300 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="260" height="40" rx="8" fill="#4F46E5" />
        <text x="150" y="45" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="12">1. Is it required for health/education?</text>
        <path d="M 150 60 L 150 80" stroke="#94a3b8" stroke-width="2" />
        <rect x="20" y="80" width="260" height="40" rx="8" fill="#F59E0B" />
        <text x="150" y="105" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="12">2. Can I afford it without borrowing?</text>
        <path d="M 150 120 L 150 140" stroke="#94a3b8" stroke-width="2" />
        <rect x="20" y="140" width="260" height="40" rx="8" fill="#10B981" />
        <text x="150" y="165" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="12">3. Apply 24-Hour Cooling Rule</text>
      </svg>`,
      bulletPoints: [
        "Step 1: Does not buying this impact safety, health, or academic grades?",
        "Step 2: Can I comfortably afford it from my current 30% wants allowance?",
        "Step 3: Wait 24 hours to test emotional excitement vs true utility."
      ]
    },
    {
      id: "info-budget-cycle",
      title: "The Student Monthly Budget Cycle",
      topic: "budgeting",
      categoryLabel: "Lifecycle",
      summary: "A 4-stage cyclical roadmap: Plan Inflow -> Track Daily Outflows -> Review Variance -> Adjust Next Month.",
      icon: "fa-arrows-spin",
      svgGraphic: `<svg viewBox="0 0 300 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="30" width="105" height="55" rx="8" fill="#1e293b" stroke="#4f46e5" stroke-width="2" />
        <text x="82" y="62" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">1. Plan Inflow</text>
        <rect x="165" y="30" width="105" height="55" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2" />
        <text x="217" y="62" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">2. Track Outflow</text>
        <rect x="165" y="115" width="105" height="55" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
        <text x="217" y="147" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">3. Review Total</text>
        <rect x="30" y="115" width="105" height="55" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2" />
        <text x="82" y="147" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">4. Adjust Habits</text>
      </svg>`,
      bulletPoints: [
        "Week 1: Allocate funds immediately upon receiving allowance",
        "Week 2 & 3: Log transactions in the Expense Tracker",
        "Week 4: Review remaining balances and transfer surplus to Savings"
      ]
    },
    {
      id: "info-savings-challenge",
      title: "30-Day Student Savings Challenge",
      topic: "saving",
      categoryLabel: "Action Plan",
      summary: "An engaging progressive savings challenge designed to save PKR 10,000+ in 30 small daily steps.",
      icon: "fa-trophy",
      svgGraphic: `<svg viewBox="0 0 300 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="30" width="75" height="130" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
        <text x="62" y="70" text-anchor="middle" fill="#3b82f6" font-size="12" font-weight="bold">Days 1-10</text>
        <text x="62" y="105" text-anchor="middle" fill="#ffffff" font-size="11">Save Rs 100</text>
        <rect x="112" y="30" width="75" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
        <text x="149" y="70" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold">Days 11-20</text>
        <text x="149" y="105" text-anchor="middle" fill="#ffffff" font-size="11">Save Rs 250</text>
        <rect x="200" y="30" width="75" height="130" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2" />
        <text x="237" y="70" text-anchor="middle" fill="#10b981" font-size="12" font-weight="bold">Days 21-30</text>
        <text x="237" y="105" text-anchor="middle" fill="#ffffff" font-size="11">Save Rs 400</text>
      </svg>`,
      bulletPoints: [
        "Day 1-10: Save PKR 100/day by cutting discretionary snacks",
        "Day 11-20: Save PKR 250/day with home-cooked meal prep",
        "Day 21-30: Save PKR 400/day through subscription audit & discounts"
      ]
    },
    {
      id: "info-grocery-hacks",
      title: "Student Smart Grocery & Dining Guide",
      topic: "smart-spending",
      categoryLabel: "Practical Hacks",
      summary: "Tactical infographics on bulk purchasing, generic brands, student meal prep, and avoiding supermarket traps.",
      icon: "fa-basket-shopping",
      svgGraphic: `<svg viewBox="0 0 300 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="100" r="50" fill="#1e293b" stroke="#ef4444" stroke-width="2" />
        <text x="75" y="95" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">Impulse</text>
        <text x="75" y="112" text-anchor="middle" fill="#ffffff" font-size="10">Fast Food</text>
        <text x="150" y="105" text-anchor="middle" fill="#cbd5e1" font-size="20" font-weight="bold">VS</text>
        <circle cx="225" cy="100" r="50" fill="#1e293b" stroke="#10b981" stroke-width="2" />
        <text x="225" y="95" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold">Smart</text>
        <text x="225" y="112" text-anchor="middle" fill="#ffffff" font-size="10">Meal Prep</text>
      </svg>`,
      bulletPoints: [
        "Never shop on an empty stomach (reduces junk purchases by 40%)",
        "Buy store-brand staple grains and pulses instead of imported brands",
        "Cook batch meals on Sundays to avoid expensive weekday deliveries"
      ]
    }
  ],
  quotes: [
    { quote: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett" },
    { quote: "A budget is telling your money where to go instead of wondering where it went.", author: "Dave Ramsey" },
    { quote: "Beware of little expenses; a small leak will sink a great ship.", author: "Benjamin Franklin" },
    { quote: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.", author: "Dave Ramsey" },
    { quote: "It’s not how much money you make, but how much money you keep.", author: "Robert Kiyosaki" },
    { quote: "Small daily habits compound into lifelong financial freedom.", author: "BudgetBee Wisdom" }
  ],
  quiz: {
    needsVsWantsQuiz: [
      {
        id: 1,
        title: "Prescribed Course Textbook",
        description: "Required reference book for your core semester programming subject.",
        cost: 2200,
        correct: "need",
        explanation: "Essential for academic success and completing graded assignments. This is a core Need."
      },
      {
        id: 2,
        title: "Designer Branded Sneakers",
        description: "Limited-edition shoes when you already own two pairs of comfortable sneakers.",
        cost: 14000,
        correct: "want",
        explanation: "You already have functional footwear. This purchase is driven by lifestyle, making it a Want."
      },
      {
        id: 3,
        title: "Monthly Public Bus Pass",
        description: "Daily transit card to commute from home to campus.",
        cost: 3000,
        correct: "need",
        explanation: "Essential transportation required to attend classes consistently. This is a Need."
      },
      {
        id: 4,
        title: "Premium 4K Video Streaming",
        description: "Ultra-HD 4-screen subscription plan.",
        cost: 1800,
        correct: "want",
        explanation: "Entertainment is great for relaxation, but premium 4K streaming is optional and falls under Wants."
      },
      {
        id: 5,
        title: "Emergency Medicine / Prescription",
        description: "Doctor-prescribed antibiotics and allergy medication.",
        cost: 1500,
        correct: "need",
        explanation: "Health and physical well-being always take top priority as a non-negotiable Need."
      },
      {
        id: 6,
        title: "Daily Gourmet Cafe Latte",
        description: "Buying an imported vanilla latte before every morning lecture.",
        cost: 7500,
        correct: "want",
        explanation: "Caffeine can be prepared affordably at home/hostel. Cafe lattes are discretionary luxury Wants."
      }
    ],
    knowledgeCheck: [
      {
        question: "According to the 50-30-20 rule, what percentage of your income should go directly into savings or debt repayment?",
        options: ["10%", "20%", "30%", "50%"],
        correctIndex: 1,
        rationale: "20% is the standard recommended target for building emergency reserves and achieving future goals."
      },
      {
        question: "Which of the following is considered a 'Fixed Expense' for a college student?",
        options: ["Weekend dining out", "Monthly hostel accommodation rent", "New video game purchase", "Concert tickets"],
        correctIndex: 1,
        rationale: "Hostel rent stays constant every month and is legally required, qualifying as a fixed expense."
      },
      {
        question: "What is the recommended student '24-Hour Rule' intended to prevent?",
        options: ["Late assignment submissions", "Impulse buying and emotional spending", "Missing class attendance", "Over-sleeping"],
        correctIndex: 1,
        rationale: "The 24-Hour Rule gives your brain emotional cooling time before buying non-essential items."
      }
    ]
  },
  chatbotKB: {
    botName: "BeeBot AI",
    disclaimer: "BeeBot is an educational assistant designed to provide financial literacy guidance. It does not provide legal, banking, or formal financial investment advice.",
    fallbackMessage: "I don't have enough specific educational information on that topic yet. Try asking me about 'Needs vs Wants', '50-30-20 Rule', 'How to save money', 'Emergency Fund', or 'Expense planning'!",
    suggestedPrompts: [
      "What is the 50-30-20 rule?",
      "How do I differentiate Needs vs Wants?",
      "How much money should a student save?",
      "How do I avoid overspending?",
      "How can a student build an Emergency Fund?",
      "What are top budget tips for hostel students?"
    ],
    intents: [
      {
        intent: "greeting",
        keywords: ["hello", "hi", "hey", "salam", "assalam", "good morning", "good evening", "howdy", "start", "aoa"],
        response: "Hello there! 👋 I am BeeBot, your NextGen BudgetBee personal finance guide. How can I help you master your student budget today?"
      },
      {
        intent: "rule_50_30_20",
        keywords: ["50", "30", "20", "formula", "split", "rule", "method", "percentage", "ratio"],
        response: "The **50-30-20 Rule** is a proven, intuitive budgeting framework:\n• **50% for Needs:** Essential expenses required for survival and education (transport, rent, basic food, utilities).\n• **30% for Wants:** Lifestyle choices, dining out, hobbies, and leisure.\n• **20% for Savings:** Building an emergency fund, future goals, or debt clearance.\n\nTry our interactive calculator in the 50-30-20 section above!"
      },
      {
        intent: "needs_vs_wants",
        keywords: ["need", "want", "needs", "wants", "difference", "essential", "priority", "classify", "what is a need"],
        response: "Here is the key difference:\n• **Needs** are absolute essentials you cannot live or study without (e.g. prescribed textbooks, hostel rent, daily meals, basic transport).\n• **Wants** are desires that enhance comfort or pleasure (e.g. brand new branded shoes, gaming passes, takeaway burgers).\n\n💡 *Golden Rule:* If removing the item causes severe harm or stops your studies, it's a Need. Otherwise, it's a Want!"
      },
      {
        intent: "how_much_save",
        keywords: ["how much", "how much should i save", "saving percentage", "ideal savings", "monthly save", "target save"],
        response: "As a student or young adult, aim to save **at least 15% to 20%** of your monthly allowance or income. Even if you can only save PKR 500 or $10 per week, the consistency builds the lifelong habit of paying yourself first!"
      },
      {
        intent: "avoid_overspending",
        keywords: ["avoid overspending", "stop overspending", "overspend", "over spending", "control spending", "spend less", "how do i avoid overspending"],
        response: "Here is BeeBot's 4-step blueprint to prevent overspending:\n1. **Use Cash / Fixed Envelope:** Keep only your weekly discretionary budget in your active wallet.\n2. **The 24-Hour Rule:** Never buy non-essential items immediately; wait 24 hours.\n3. **Cook / Batch Meal Prep:** Dining out and daily tea/coffee runs drain 40% of student cash.\n4. **Track Every Rupee/Dollar:** Log expenses in our Expense Planner tool!"
      },
      {
        intent: "emergency_fund",
        keywords: ["emergency", "emergency fund", "backup", "crisis", "savings", "save", "urgent"],
        response: "An **Emergency Fund** is a stash of money set aside exclusively for unexpected financial shocks (e.g., sudden phone repair, medical prescription, unexpected course project materials).\n\n🎯 *Student Target:* Aim to save 1 to 3 months of basic living expenses. Start by saving just PKR 500 - 1,000 every month!"
      },
      {
        intent: "hostel_tips",
        keywords: ["hostel", "roommate", "dorm", "hostelites", "hostel student", "living away", "shared"],
        response: "For students living in hostels or shared apartments:\n• **Group Grocery Buying:** Buy grains and staples in bulk with flatmates.\n• **Split Utility Tracker:** Use a shared ledger to avoid roommate conflict.\n• **Hostel 60/20/20 Rule:** Allocate 60% Needs (rent & mess), 20% Wants, and 20% Savings."
      },
      {
        intent: "impulse_buying",
        keywords: ["impulse", "urge", "shopping", "stop spending", "control", "sale", "discount", "impulsive"],
        response: "To eliminate **Impulse Buying**:\n1. Use the **24-Hour Rule**: Wait 24 hours before buying non-essential items.\n2. Calculate the item's cost in **Work Hours**: (e.g. 'This shirt costs 10 hours of my internship pay').\n3. Delete saved credit/debit card autofill from shopping apps to create friction."
      },
      {
        intent: "expense_tracking",
        keywords: ["track", "planner", "record", "log", "expenses", "spend", "management", "excel"],
        response: "Tracking expenses gives you awareness! You can use our **Expense Planner** tool on this page to log daily entries by Category (Food, Transport, Education). Review your numbers weekly to catch unnecessary micro-spending."
      },
      {
        intent: "student_discount",
        keywords: ["discount", "deal", "student id", "card", "save money", "cheap", "free"],
        response: "Always leverage your **Student ID Card**! Many software tools (GitHub Student Pack, Spotify, Notion, Figma), public transit networks, museums, and electronics stores offer 20% to 100% student discounts. Always ask before paying full price!"
      },
      {
        intent: "freelancing_income",
        keywords: ["freelance", "side hustle", "earn", "income", "part time", "job", "pocket money"],
        response: "Boost your cash flow as a student:\n• Offer skills like web development, graphic design, tutoring, or content writing.\n• Follow the **50-50 Extra Income Rule:** When you earn side cash, put 50% directly into savings and use 50% for your needs and rewards!"
      },
      {
        intent: "about_project",
        keywords: ["who are you", "what is budgetbasics", "creator", "aptech", "project", "web innovation"],
        response: "BudgetBasics is an educational web application developed for the Aptech 'Web Innovation Unleashed' initiative. It empowers students with intuitive calculators, interactive quizzes, and financial habit-building tools!"
      }
    ]
  }
};

window.OFFLINE_DATA = OFFLINE_DATA;

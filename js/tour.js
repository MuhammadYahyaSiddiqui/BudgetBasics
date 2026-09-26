/**
 * BUDGETBASICS - INTERACTIVE DISCOVERY & GUIDED WALKTHROUGH TOUR ENGINE
 * Step-by-step hands-on exploration of all 8 core platform modules with live task execution & instant exit.
 */

const tourSteps = [
  {
    stepNumber: 1,
    targetId: 'basics',
    title: 'Module 1: Budgeting 101 & Allowance Baseline',
    badge: 'Foundation',
    instruction: 'Discover how money flows for students. Enter your monthly allowance in the baseline card to establish your starting budget benchmark.',
    actionLabel: 'Try It: Enter an allowance or click Calculate',
    actionFn: () => {
      const input = document.getElementById('studentAllowanceInput') || document.getElementById('calcIncomeInput');
      if (input) {
        input.focus();
        window.playUiSound?.('click');
      }
    }
  },
  {
    stepNumber: 2,
    targetId: 'needs-wants',
    title: 'Module 2: Gamified Needs vs. Wants Challenge',
    badge: 'Gamification',
    instruction: 'Sharpen your financial decision-making! Read the active real-life scenario card and click "Need" or "Want" to score points and learn the 24-Hour Rule.',
    actionLabel: 'Try It: Click Need / Want button above',
    actionFn: () => {
      const btn = document.querySelector('.game-choice-btn');
      if (btn) {
        btn.click();
      }
    }
  },
  {
    stepNumber: 3,
    targetId: 'calculator-503020',
    title: 'Module 3: 50-30-20 Rule Calculator & Live Chart',
    badge: 'Interactive Tool',
    instruction: 'Master the 50-30-20 framework. Drag the slider or click rule presets (e.g. Hostel 60/20/20) to see the live Doughnut Chart rotate and update.',
    actionLabel: 'Try It: Click "Sample (35k)" or switch Preset',
    actionFn: () => {
      const sampleBtn = document.getElementById('btnLoadSample503020');
      if (sampleBtn) sampleBtn.click();
    }
  },
  {
    stepNumber: 4,
    targetId: 'savings-goals',
    title: 'Module 4: Savings Goal Milestone Projector',
    badge: 'Projections',
    instruction: 'Calculate exact time required for milestone purchases (e.g., Coding Laptop, Emergency Fund). Click a preset to project target completion date.',
    actionLabel: 'Try It: Select "💻 Laptop (90k)" Preset',
    actionFn: () => {
      const presetBtn = document.querySelector('.goal-preset-btn');
      if (presetBtn) presetBtn.click();
    }
  },
  {
    stepNumber: 5,
    targetId: 'expense-planner',
    title: 'Module 5: Interactive Expense Planner (CRUD)',
    badge: 'Persistence',
    instruction: 'Log daily transactions into LocalStorage. Add an expense, filter by category, check budget health alerts, and export your monthly report as CSV.',
    actionLabel: 'Try It: Enter sample expense (Rs 1,400)',
    actionFn: () => {
      const descInput = document.getElementById('expDescription');
      const amtInput = document.getElementById('expAmount');
      if (descInput) descInput.value = 'Campus Lunch & Stationery';
      if (amtInput) amtInput.value = '1400';
      const saveBtn = document.getElementById('btnSaveExpense');
      if (saveBtn) saveBtn.click();
    }
  },
  {
    stepNumber: 6,
    targetId: 'chatbotFabBtn',
    title: 'Module 6: BeeBot AI Floating Assistant',
    badge: 'AI Suite (SRS Mod 8)',
    instruction: 'Consult our smart client-side AI chatbot widget! Tap the floating BeeBot icon to ask financial questions, hear voice answers, and get quick student budget tips.',
    actionLabel: 'Try It: Open BeeBot AI Widget',
    actionFn: () => {
      const fab = document.getElementById('chatbotFabBtn');
      if (fab) fab.click();
    }
  },
  {
    stepNumber: 7,
    targetId: 'money-mistakes',
    title: 'Module 7: Money Mistakes & Visual Infographics',
    badge: 'Visual Learning',
    instruction: 'Explore the 10 fatal student financial traps and browse the interactive SVG decision matrix gallery with full-screen lightbox modal.',
    actionLabel: 'Try It: Expand an accordion mistake item',
    actionFn: () => {
      const firstAccordion = document.querySelector('#moneyMistakesAccordion .accordion-button');
      if (firstAccordion) firstAccordion.click();
    }
  },
  {
    stepNumber: 8,
    targetId: 'health-check',
    title: 'Module 8: Scorecard & Certificate of Achievement',
    badge: 'Evaluation',
    instruction: 'Evaluate your financial discipline with the 4-question health check, then claim and print your formal Aptech Certificate of Achievement!',
    actionLabel: 'Try It: Click "Calculate Health Score" or "Earn Certificate"',
    actionFn: () => {
      const scoreBtn = document.querySelector('#budgetHealthCheckForm button[type="submit"]');
      if (scoreBtn) scoreBtn.click();
    }
  }
];

let currentTourIndex = 0;
let isTourActive = false;

document.addEventListener('DOMContentLoaded', () => {
  initTourDom();
  initTourTriggers();
});

function initTourDom() {
  if (document.getElementById('budgetBasicsTourDock')) return;

  // Dark Dim & Blur Backdrop Overlay
  if (!document.getElementById('tourBackdropOverlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'tourBackdropOverlay';
    overlay.className = 'tour-backdrop-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.addEventListener('click', exitTour);
    document.body.appendChild(overlay);
  }

  const dock = document.createElement('div');
  dock.id = 'budgetBasicsTourDock';
  dock.className = 'tour-dock';
  dock.setAttribute('role', 'dialog');
  dock.setAttribute('aria-label', 'Interactive Platform Discovery Tour');

  dock.innerHTML = `
    <div class="tour-dock-header">
      <div class="d-flex align-items-center gap-2">
        <span class="tour-step-badge" id="tourStepBadge">Step 1 of 8</span>
        <span class="badge bg-warning text-dark" id="tourCategoryBadge" style="font-size: 0.7rem; font-weight: 700;">Foundation</span>
      </div>
      <button type="button" id="btnTourExit" class="tour-exit-btn" title="Exit Tour (or press Escape)">
        <i class="fa-solid fa-xmark"></i> Exit Tour
      </button>
    </div>

    <div class="tour-progress-bar-wrap">
      <div id="tourProgressBarFill" class="tour-progress-bar-fill" style="width: 12.5%;"></div>
    </div>

    <div class="tour-content-box">
      <h5 class="tour-title" id="tourStepTitle">Module 1: Budgeting 101</h5>
      <p class="tour-instruction" id="tourStepInstruction">Discover how income and allowance work.</p>
    </div>

    <div class="tour-action-card">
      <span id="tourActionLabel"><i class="fa-solid fa-hand-pointer text-warning me-1"></i> Try It: Enter allowance</span>
      <button type="button" id="btnTourRunAction" class="btn btn-sm btn-primary py-1 px-2" style="font-size: 0.75rem; white-space: nowrap;">
        <i class="fa-solid fa-play"></i> Auto Try
      </button>
    </div>

    <div class="tour-footer-controls">
      <button type="button" id="btnTourPrev" class="btn btn-sm btn-outline-secondary px-3">
        <i class="fa-solid fa-arrow-left"></i> Previous
      </button>
      <div class="d-flex gap-2">
        <button type="button" id="btnTourNext" class="btn btn-sm btn-primary px-4 fw-bold">
          Next Step <i class="fa-solid fa-arrow-right ms-1"></i>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(dock);

  // Bind dock control events
  document.getElementById('btnTourExit')?.addEventListener('click', exitTour);
  document.getElementById('btnTourPrev')?.addEventListener('click', prevTourStep);
  document.getElementById('btnTourNext')?.addEventListener('click', nextTourStep);
  document.getElementById('btnTourRunAction')?.addEventListener('click', () => {
    const step = tourSteps[currentTourIndex];
    if (step && typeof step.actionFn === 'function') {
      step.actionFn();
      window.playUiSound?.('success');
    }
  });

  // Keyboard shortcut listener (Escape to exit, Left/Right arrow to navigate)
  window.addEventListener('keydown', (e) => {
    if (!isTourActive) return;
    if (e.key === 'Escape') {
      exitTour();
    } else if (e.key === 'ArrowRight') {
      nextTourStep();
    } else if (e.key === 'ArrowLeft') {
      prevTourStep();
    }
  });
}

function initTourTriggers() {
  const startTourNavBtn = document.getElementById('btnStartTourNav');
  const startTourHeroBtn = document.getElementById('btnStartTourHero');
  const startTourDrawerBtn = document.getElementById('btnStartTourDrawer');
  const startTourAboutBtn = document.getElementById('btnStartTourAbout');

  if (startTourNavBtn) startTourNavBtn.addEventListener('click', startTour);
  if (startTourHeroBtn) startTourHeroBtn.addEventListener('click', startTour);
  if (startTourAboutBtn) startTourAboutBtn.addEventListener('click', startTour);
  if (startTourDrawerBtn) startTourDrawerBtn.addEventListener('click', () => {
    // Close drawer first then start tour
    const navMenu = document.getElementById('navMenu');
    const navBackdrop = document.getElementById('navBackdrop');
    if (navMenu) navMenu.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    startTour();
  });
}

function startTour() {
  isTourActive = true;
  currentTourIndex = 0;
  const dock = document.getElementById('budgetBasicsTourDock');
  const overlay = document.getElementById('tourBackdropOverlay');
  if (dock) dock.classList.add('active');
  if (overlay) overlay.classList.add('active');

  window.playUiSound?.('success');
  window.showToast?.('🚀 Discovery Tour Started! Follow the 8 interactive steps.', 'info');
  renderCurrentTourStep();
}

function exitTour() {
  isTourActive = false;
  const dock = document.getElementById('budgetBasicsTourDock');
  const overlay = document.getElementById('tourBackdropOverlay');
  if (dock) dock.classList.remove('active');
  if (overlay) overlay.classList.remove('active');

  // Remove any spotlights
  document.querySelectorAll('.tour-spotlight-highlight').forEach(el => {
    el.classList.remove('tour-spotlight-highlight');
  });

  window.playUiSound?.('click');
  window.showToast?.('Discovery Tour Exited. Feel free to explore anytime!', 'info');
}

function nextTourStep() {
  if (currentTourIndex < tourSteps.length - 1) {
    currentTourIndex++;
    window.playUiSound?.('click');
    renderCurrentTourStep();
  } else {
    // Tour Completed!
    exitTour();
    window.playUiSound?.('success');
    window.showToast?.('🎉 Congratulations! You have discovered all core modules of BudgetBasics.', 'success');
  }
}

function prevTourStep() {
  if (currentTourIndex > 0) {
    currentTourIndex--;
    window.playUiSound?.('click');
    renderCurrentTourStep();
  }
}

function renderCurrentTourStep() {
  const step = tourSteps[currentTourIndex];
  if (!step) return;

  // Update Dock UI
  const badge = document.getElementById('tourStepBadge');
  const catBadge = document.getElementById('tourCategoryBadge');
  const progressBar = document.getElementById('tourProgressBarFill');
  const title = document.getElementById('tourStepTitle');
  const instruction = document.getElementById('tourStepInstruction');
  const actionLabel = document.getElementById('tourActionLabel');
  const prevBtn = document.getElementById('btnTourPrev');
  const nextBtn = document.getElementById('btnTourNext');

  if (badge) badge.textContent = `Step ${step.stepNumber} of ${tourSteps.length}`;
  if (catBadge) catBadge.textContent = step.badge;
  if (progressBar) progressBar.style.width = `${(step.stepNumber / tourSteps.length) * 100}%`;
  if (title) title.textContent = step.title;
  if (instruction) instruction.textContent = step.instruction;
  if (actionLabel) actionLabel.innerHTML = `<i class="fa-solid fa-hand-pointer text-warning me-1"></i> ${step.actionLabel}`;

  if (prevBtn) {
    prevBtn.disabled = currentTourIndex === 0;
    prevBtn.style.opacity = currentTourIndex === 0 ? '0.5' : '1';
  }

  if (nextBtn) {
    nextBtn.innerHTML = currentTourIndex === tourSteps.length - 1 
      ? 'Finish Tour <i class="fa-solid fa-check ms-1"></i>' 
      : 'Next Step <i class="fa-solid fa-arrow-right ms-1"></i>';
  }

  // Remove previous spotlights
  document.querySelectorAll('.tour-spotlight-highlight').forEach(el => {
    el.classList.remove('tour-spotlight-highlight');
  });

  // Highlight & scroll to target section
  const targetElement = document.getElementById(step.targetId);
  if (targetElement) {
    targetElement.classList.add('tour-spotlight-highlight');
    const offset = 90;
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
}

window.startBudgetBasicsTour = startTour;
window.exitBudgetBasicsTour = exitTour;

/**
 * BUDGETBASICS - CALCULATORS MODULE
 * Features: 50-30-20 Interactive Split, Range Sliders, Custom Split Models,
 * and Full Custom Savings Goals Estimator & Multiple Goals Bucket Manager.
 */

let budgetChartInstance = null;
window.currentCurrency = 'PKR';
let activeSplitRule = { needs: 0.50, wants: 0.30, savings: 0.20, label: 'Standard 50/30/20' };

let savedGoals = [];
let editingGoalId = null;

const defaultSavedGoals = [
  {
    id: 'goal_1',
    name: 'Coding Laptop Upgrade',
    category: 'Tech',
    target: 90000,
    current: 15000,
    monthly: 7500,
    createdAt: '2026-09-20'
  },
  {
    id: 'goal_2',
    name: 'Student Emergency Cushion',
    category: 'Emergency',
    target: 30000,
    current: 8000,
    monthly: 5000,
    createdAt: '2026-09-22'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  init503020Calculator();
  initSavingsGoalCalculator();
  initCurrencySelector();
  initSplitRuleSelector();
});

/* ================= Currency Switcher ================= */
function initCurrencySelector() {
  const currencySelector = document.getElementById('currencySelector');
  if (currencySelector) {
    currencySelector.addEventListener('change', (e) => {
      window.currentCurrency = e.target.value;
      document.querySelectorAll('.currency-label').forEach(el => el.textContent = window.currentCurrency);
      calculate503020();
      calculateSavingsGoal();
      renderSavedGoalsBucket();
      if (window.renderExpenses) window.renderExpenses();
      window.playUiSound?.('click');
      window.showToast?.(`Currency set to ${window.currentCurrency}`, 'info');
    });
  }
}

/* ================= Split Rule Selector ================= */
function initSplitRuleSelector() {
  const ruleBtns = document.querySelectorAll('.split-rule-pill');
  ruleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ruleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const n = parseFloat(btn.dataset.needs) / 100;
      const w = parseFloat(btn.dataset.wants) / 100;
      const s = parseFloat(btn.dataset.savings) / 100;

      activeSplitRule = {
        needs: n,
        wants: w,
        savings: s,
        label: btn.textContent.trim()
      };

      document.getElementById('splitNeedsPercentLabel').textContent = `Needs (${btn.dataset.needs}%)`;
      document.getElementById('splitWantsPercentLabel').textContent = `Wants (${btn.dataset.wants}%)`;
      document.getElementById('splitSavingsPercentLabel').textContent = `Savings (${btn.dataset.savings}%)`;

      calculate503020();
      window.playUiSound?.('click');
      window.showToast?.(`Applied ${activeSplitRule.label} model`, 'info');
    });
  });
}

/* ================= 50-30-20 Calculator with Range Slider ================= */
function init503020Calculator() {
  const incomeInput = document.getElementById('calcIncomeInput');
  const incomeSlider = document.getElementById('calcIncomeSlider');
  const calculateBtn = document.getElementById('btnCalculate503020');
  const sampleBtn = document.getElementById('btnLoadSample503020');

  if (incomeInput && incomeSlider) {
    incomeInput.addEventListener('input', () => {
      incomeSlider.value = incomeInput.value;
      calculate503020();
    });

    incomeSlider.addEventListener('input', () => {
      incomeInput.value = incomeSlider.value;
      calculate503020();
    });
  }

  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      calculate503020();
      window.playUiSound?.('success');
    });
  }

  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      if (incomeInput) incomeInput.value = '35000';
      if (incomeSlider) incomeSlider.value = '35000';
      calculate503020();
      window.playUiSound?.('click');
      window.showToast?.('Loaded typical student monthly allowance (35,000)', 'success');
    });
  }

  calculate503020();
}

function calculate503020() {
  const incomeInput = document.getElementById('calcIncomeInput');
  if (!incomeInput) return;

  const income = parseFloat(incomeInput.value) || 0;
  const needsAmount = income * activeSplitRule.needs;
  const wantsAmount = income * activeSplitRule.wants;
  const savingsAmount = income * activeSplitRule.savings;

  const format = (num) => `${window.currentCurrency} ${num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const needsEl = document.getElementById('calcNeedsResult');
  const wantsEl = document.getElementById('calcWantsResult');
  const savingsEl = document.getElementById('calcSavingsResult');

  if (needsEl) needsEl.textContent = format(needsAmount);
  if (wantsEl) wantsEl.textContent = format(wantsAmount);
  if (savingsEl) savingsEl.textContent = format(savingsAmount);

  // Sync Hero Card
  const heroIncome = document.getElementById('heroSnapshotIncome');
  const heroNeeds = document.getElementById('heroSnapshotNeeds');
  const heroWants = document.getElementById('heroSnapshotWants');
  const heroSavings = document.getElementById('heroSnapshotSavings');

  if (heroIncome) heroIncome.textContent = format(income);
  if (heroNeeds) heroNeeds.textContent = format(needsAmount);
  if (heroWants) heroWants.textContent = format(wantsAmount);
  if (heroSavings) heroSavings.textContent = format(savingsAmount);

  updateBudgetChart(needsAmount, wantsAmount, savingsAmount);
}

function updateBudgetChart(needs, wants, savings) {
  const ctx = document.getElementById('budgetPieChart');
  if (!ctx) return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#F9FAFB' : '#0F172A';

  const needsPct = Math.round(activeSplitRule.needs * 100);
  const wantsPct = Math.round(activeSplitRule.wants * 100);
  const savingsPct = Math.round(activeSplitRule.savings * 100);

  const data = {
    labels: [`Needs (${needsPct}%)`, `Wants (${wantsPct}%)`, `Savings (${savingsPct}%)`],
    datasets: [{
      data: needs + wants + savings > 0 ? [needs, wants, savings] : [needsPct, wantsPct, savingsPct],
      backgroundColor: ['#4F46E5', '#F59E0B', '#10B981'],
      hoverOffset: 10,
      borderWidth: 2,
      borderColor: isDark ? '#080E0C' : '#FFFFFF'
    }]
  };

  if (budgetChartInstance) {
    budgetChartInstance.data = data;
    budgetChartInstance.options.plugins.legend.labels.color = textColor;
    budgetChartInstance.update();
  } else if (typeof Chart !== 'undefined') {
    budgetChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '66%',
        animation: {
          animateScale: true,
          animateRotate: true
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor,
              font: { family: 'Plus Jakarta Sans', weight: '700', size: 12 },
              padding: 18
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${window.currentCurrency} ${context.raw.toLocaleString()}`;
              }
            }
          }
        }
      }
    });
  }
}

/* ================= Custom Savings Goal Estimator & Goals Bucket ================= */
function initSavingsGoalCalculator() {
  loadSavedGoals();

  const targetInput = document.getElementById('goalTargetInput');
  const currentInput = document.getElementById('goalCurrentInput');
  const monthlyInput = document.getElementById('goalMonthlyInput');
  const goalNameInput = document.getElementById('goalNameInput');
  const goalCategorySelect = document.getElementById('goalCategorySelect');
  const saveGoalBtn = document.getElementById('btnSaveGoalToBucket');
  const clearGoalBtn = document.getElementById('btnClearGoalForm');
  const syncPlannerBtn = document.getElementById('btnSyncPlannerSavings');
  const addNewGoalShortcut = document.getElementById('btnAddNewGoalShortcut');

  [targetInput, currentInput, monthlyInput, goalNameInput, goalCategorySelect].forEach(input => {
    if (input) input.addEventListener('input', calculateSavingsGoal);
    if (input) input.addEventListener('change', calculateSavingsGoal);
  });

  // Preset Buttons
  document.querySelectorAll('.goal-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      editingGoalId = null;
      if (goalNameInput) goalNameInput.value = btn.dataset.name;
      if (goalCategorySelect && btn.dataset.category) goalCategorySelect.value = btn.dataset.category;
      if (targetInput) targetInput.value = btn.dataset.target;
      if (currentInput) currentInput.value = btn.dataset.current;
      if (monthlyInput) monthlyInput.value = btn.dataset.monthly;
      calculateSavingsGoal();
      if (saveGoalBtn) saveGoalBtn.innerHTML = '<i class="fa-solid fa-bookmark me-1"></i> Save to My Goal Buckets';
      window.playUiSound?.('click');
      window.showToast?.(`Loaded goal: ${btn.dataset.name}`, 'info');
    });
  });

  // Sync from Planner Target
  if (syncPlannerBtn) {
    syncPlannerBtn.addEventListener('click', () => {
      const salary = parseFloat(localStorage.getItem('budgetbasics_user_salary')) || 50000;
      const targetPct = parseFloat(localStorage.getItem('budgetbasics_user_savings_target_percent')) || 20;
      const monthlyTarget = Math.round(salary * (targetPct / 100));
      if (monthlyInput) monthlyInput.value = monthlyTarget;
      calculateSavingsGoal();
      window.playUiSound?.('success');
      window.showToast?.(`Synced ${targetPct}% savings target (${window.currentCurrency || 'PKR'} ${monthlyTarget.toLocaleString()}/mo)`, 'success');
    });
  }

  // Save Goal to Bucket
  if (saveGoalBtn) {
    saveGoalBtn.addEventListener('click', () => {
      const name = (goalNameInput?.value || '').trim();
      const category = goalCategorySelect?.value || 'Tech';
      const target = parseFloat(targetInput?.value);
      const current = parseFloat(currentInput?.value) || 0;
      const monthly = parseFloat(monthlyInput?.value);

      if (!name || isNaN(target) || target <= 0 || isNaN(monthly) || monthly <= 0) {
        window.showToast?.('Please enter a valid goal title, target amount, and monthly savings capacity.', 'error');
        return;
      }

      if (editingGoalId) {
        const index = savedGoals.findIndex(g => g.id === editingGoalId);
        if (index !== -1) {
          savedGoals[index] = {
            ...savedGoals[index],
            name,
            category,
            target,
            current,
            monthly
          };
          window.showToast?.(`Goal "${name}" updated successfully!`, 'success');
        }
        editingGoalId = null;
        saveGoalBtn.innerHTML = '<i class="fa-solid fa-bookmark me-1"></i> Save to My Goal Buckets';
      } else {
        const newGoal = {
          id: 'goal_' + Date.now(),
          name,
          category,
          target,
          current,
          monthly,
          createdAt: new Date().toISOString().split('T')[0]
        };
        savedGoals.unshift(newGoal);
        window.showToast?.(`New goal "${name}" saved to your bucket!`, 'success');
      }

      saveSavedGoals();
      renderSavedGoalsBucket();
      window.playUiSound?.('success');
    });
  }

  // Clear Form
  if (clearGoalBtn) {
    clearGoalBtn.addEventListener('click', () => {
      editingGoalId = null;
      if (goalNameInput) goalNameInput.value = 'My Custom Goal';
      if (goalCategorySelect) goalCategorySelect.value = 'Tech';
      if (targetInput) targetInput.value = '50000';
      if (currentInput) currentInput.value = '5000';
      if (monthlyInput) monthlyInput.value = '5000';
      if (saveGoalBtn) saveGoalBtn.innerHTML = '<i class="fa-solid fa-bookmark me-1"></i> Save to My Goal Buckets';
      calculateSavingsGoal();
      window.showToast?.('Form cleared for new custom goal.', 'info');
    });
  }

  // New Goal Shortcut button
  if (addNewGoalShortcut) {
    addNewGoalShortcut.addEventListener('click', () => {
      editingGoalId = null;
      if (goalNameInput) {
        goalNameInput.value = '';
        goalNameInput.placeholder = 'Type your new goal title...';
        goalNameInput.focus();
      }
      if (targetInput) targetInput.value = '';
      if (currentInput) currentInput.value = '0';
      if (monthlyInput) monthlyInput.value = '';
      if (saveGoalBtn) saveGoalBtn.innerHTML = '<i class="fa-solid fa-plus me-1"></i> Add Goal to Bucket';
      document.getElementById('savings-goals')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  calculateSavingsGoal();
  renderSavedGoalsBucket();
}

function loadSavedGoals() {
  const stored = localStorage.getItem('budgetbasics_user_savings_goals');
  if (stored) {
    try {
      savedGoals = JSON.parse(stored);
    } catch (e) {
      savedGoals = JSON.parse(JSON.stringify(defaultSavedGoals));
    }
  } else {
    savedGoals = JSON.parse(JSON.stringify(defaultSavedGoals));
    saveSavedGoals();
  }
}

function saveSavedGoals() {
  localStorage.setItem('budgetbasics_user_savings_goals', JSON.stringify(savedGoals));
}

function calculateSavingsGoal() {
  const goalName = document.getElementById('goalNameInput')?.value || 'Target Goal';
  const target = parseFloat(document.getElementById('goalTargetInput')?.value) || 0;
  const current = parseFloat(document.getElementById('goalCurrentInput')?.value) || 0;
  const monthly = parseFloat(document.getElementById('goalMonthlyInput')?.value) || 0;
  const curr = window.currentCurrency || 'PKR';

  const remaining = Math.max(0, target - current);
  let monthsRequired = 0;

  if (remaining > 0 && monthly > 0) {
    monthsRequired = Math.ceil(remaining / monthly);
  } else if (remaining === 0 && target > 0) {
    monthsRequired = 0;
  }

  const progressPercent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  // Daily and Weekly Pace
  const weeklyPace = monthly > 0 ? Math.round(monthly / 4) : 0;
  const dailyPace = monthly > 0 ? Math.round(monthly / 30) : 0;

  // Projected Target Date
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + monthsRequired);
  const targetDateStr = targetDate.toLocaleDateString([], { month: 'long', year: 'numeric' });

  const format = (num) => `${curr} ${num.toLocaleString()}`;
  const remEl = document.getElementById('goalRemainingDisplay');
  const monthsEl = document.getElementById('goalMonthsDisplay');
  const percentEl = document.getElementById('goalPercentDisplay');
  const progressBar = document.getElementById('goalProgressBar');
  const tipEl = document.getElementById('goalMotivationalTip');
  const weeklyEl = document.getElementById('goalWeeklyPace');
  const dailyEl = document.getElementById('goalDailyPace');

  if (remEl) remEl.textContent = format(remaining);
  if (monthsEl) monthsEl.textContent = monthsRequired > 0 ? `${monthsRequired} Month${monthsRequired > 1 ? 's' : ''}` : (target > 0 && remaining === 0 ? 'Goal Reached! 🎉' : '0 Months');
  if (percentEl) percentEl.textContent = `${progressPercent}%`;
  if (progressBar) progressBar.style.width = `${progressPercent}%`;
  if (weeklyEl) weeklyEl.textContent = `${format(weeklyPace)}/wk`;
  if (dailyEl) dailyEl.textContent = `${format(dailyPace)}/day`;

  // Update Savings Goal Accumulation Timeline Chart
  updateSavingsGoalTimelineChart(target, current, monthly, monthsRequired);

  if (tipEl) {
    if (progressPercent >= 100) {
      tipEl.className = 'alert alert-success mb-0';
      tipEl.innerHTML = `<strong>🎉 Goal Accomplished!</strong> You have fully accumulated <strong>${format(target)}</strong> for <em>${escapeHtml(goalName)}</em>!`;
    } else if (monthsRequired > 0) {
      tipEl.className = 'alert alert-success mb-0';
      const fasterMonthly = monthly + 1500;
      const fasterMonths = Math.ceil(remaining / fasterMonthly);
      const diff = monthsRequired - fasterMonths;

      tipEl.innerHTML = `
        <div class="d-flex align-items-start gap-2">
          <i class="fa-solid fa-wand-magic-sparkles text-success mt-1"></i>
          <div>
            <strong>Timeline Projection:</strong> Saving <strong>${format(monthly)}/month</strong> gets you <em>${escapeHtml(goalName)}</em> by <strong>${targetDateStr}</strong> (${monthsRequired} months).
            ${diff > 0 ? `<div class="small text-muted mt-1"><i class="fa-solid fa-bolt text-warning me-1"></i><strong>Speed-up Tip:</strong> Saving just ${format(1500)} extra per month reaches your goal <strong>${diff} month${diff > 1 ? 's' : ''} earlier</strong>!</div>` : ''}
          </div>
        </div>
      `;
    } else {
      tipEl.className = 'alert alert-info mb-0';
      tipEl.innerHTML = `<i class="fa-solid fa-circle-info me-1"></i> Enter your target cost and monthly contribution to project your completion timeline.`;
    }
  }
}

let savingsTimelineChartInstance = null;

function updateSavingsGoalTimelineChart(target, current, monthly, monthsRequired) {
  const ctx = document.getElementById('savingsGoalTimelineChart');
  if (!ctx) return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#F8FAFC' : '#0F172A';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

  const steps = Math.min(Math.max(monthsRequired, 3), 12);
  const labels = ['Start'];
  const dataPoints = [current];
  const targetPoints = [target];

  for (let i = 1; i <= steps; i++) {
    labels.push(`M${i}`);
    const accumulated = Math.min(target, current + (monthly * i));
    dataPoints.push(accumulated);
    targetPoints.push(target);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Accumulated Savings',
        data: dataPoints,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#FFFFFF',
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2.5
      },
      {
        label: 'Goal Target',
        data: targetPoints,
        borderColor: '#EF4444',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        borderWidth: 1.5
      }
    ]
  };

  if (savingsTimelineChartInstance) {
    savingsTimelineChartInstance.data = chartData;
    savingsTimelineChartInstance.options.scales.x.ticks.color = textColor;
    savingsTimelineChartInstance.options.scales.y.ticks.color = textColor;
    savingsTimelineChartInstance.options.scales.x.grid.color = gridColor;
    savingsTimelineChartInstance.options.scales.y.grid.color = gridColor;
    savingsTimelineChartInstance.update();
  } else if (typeof Chart !== 'undefined') {
    savingsTimelineChartInstance = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { family: 'Plus Jakarta Sans', size: 10, weight: '700' },
              color: textColor
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${window.currentCurrency || 'PKR'} ${context.raw.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 9 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { family: 'Plus Jakarta Sans', size: 9 },
              callback: function(val) {
                return (val >= 1000) ? `${val/1000}k` : val;
              }
            }
          }
        }
      }
    });
  }
}

/* ================= Render Saved Goals Bucket Grid ================= */
function renderSavedGoalsBucket() {
  const container = document.getElementById('savedGoalsContainer');
  const emptyState = document.getElementById('goalsEmptyState');
  const countEl = document.getElementById('savedGoalsCount');
  const curr = window.currentCurrency || 'PKR';

  if (!container) return;

  if (countEl) countEl.textContent = savedGoals.length;

  if (savedGoals.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = '';

  savedGoals.forEach(goal => {
    const remaining = Math.max(0, goal.target - goal.current);
    const pct = goal.target > 0 ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0;
    const months = goal.monthly > 0 && remaining > 0 ? Math.ceil(remaining / goal.monthly) : 0;
    const isCompleted = pct >= 100;
    const categoryIcon = getGoalCategoryIcon(goal.category);

    const card = document.createElement('div');
    card.className = `goal-bucket-card ${isCompleted ? 'goal-completed-card' : ''}`;
    card.innerHTML = `
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div class="d-flex align-items-center gap-2">
          <div class="goal-category-icon-box">
            ${categoryIcon}
          </div>
          <div>
            <h6 class="fw-bold mb-0">${escapeHtml(goal.name)}</h6>
            <span class="badge bg-secondary bg-opacity-10 text-secondary border px-2 py-0" style="font-size: 0.72rem;">${escapeHtml(goal.category || 'Goal')}</span>
          </div>
        </div>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-primary" onclick="editSavedGoal('${goal.id}')" title="Edit Goal" aria-label="Edit Goal">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteSavedGoal('${goal.id}')" title="Delete Goal" aria-label="Delete Goal">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-1 small">
        <span class="text-secondary fw-semibold">Saved: <strong>${curr} ${goal.current.toLocaleString()}</strong></span>
        <span class="fw-bold ${isCompleted ? 'text-success' : 'text-primary'}">${pct}%</span>
      </div>

      <div class="custom-progress mb-3">
        <div class="progress-bar-fill ${isCompleted ? 'bg-success' : 'bg-primary'}" style="width: ${pct}%;"></div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3 small text-muted">
        <span>Target: <strong>${curr} ${goal.target.toLocaleString()}</strong></span>
        <span>${isCompleted ? '<strong class="text-success"><i class="fa-solid fa-check-circle me-1"></i>Completed!</strong>' : `⏳ <strong>${months} mo</strong> left`}</span>
      </div>

      <!-- Quick Deposit Button Group -->
      <div class="d-flex gap-1 pt-2 border-top">
        <button class="btn btn-sm btn-outline-success flex-grow-1" onclick="quickDepositToGoal('${goal.id}', 1000)" title="Deposit 1,000">
          +1k
        </button>
        <button class="btn btn-sm btn-outline-success flex-grow-1" onclick="quickDepositToGoal('${goal.id}', 5000)" title="Deposit 5,000">
          +5k
        </button>
        <button class="btn btn-sm btn-outline-primary flex-grow-1" onclick="customDepositToGoal('${goal.id}')" title="Custom Deposit">
          <i class="fa-solid fa-plus me-1"></i> Custom
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function getGoalCategoryIcon(cat) {
  switch ((cat || '').toLowerCase()) {
    case 'tech': return '<i class="fa-solid fa-laptop text-primary"></i>';
    case 'education': return '<i class="fa-solid fa-graduation-cap text-warning"></i>';
    case 'emergency': return '<i class="fa-solid fa-shield-halved text-success"></i>';
    case 'vehicle': return '<i class="fa-solid fa-motorcycle text-info"></i>';
    case 'lifestyle': return '<i class="fa-solid fa-shirt text-purple"></i>';
    default: return '<i class="fa-solid fa-bullseye text-primary"></i>';
  }
}

window.quickDepositToGoal = function(id, amount) {
  const goal = savedGoals.find(g => g.id === id);
  if (!goal) return;

  goal.current += amount;
  if (goal.current > goal.target) goal.current = goal.target;

  saveSavedGoals();
  renderSavedGoalsBucket();
  window.playUiSound?.('success');
  window.showToast?.(`Deposited ${(window.currentCurrency || 'PKR')} ${amount.toLocaleString()} to "${goal.name}"!`, 'success');
};

window.customDepositToGoal = function(id) {
  const goal = savedGoals.find(g => g.id === id);
  if (!goal) return;

  const input = prompt(`Enter deposit amount for "${goal.name}" (${window.currentCurrency || 'PKR'}):`, "2000");
  if (input !== null) {
    const amt = parseFloat(input);
    if (!isNaN(amt) && amt > 0) {
      goal.current += amt;
      if (goal.current > goal.target) goal.current = goal.target;
      saveSavedGoals();
      renderSavedGoalsBucket();
      window.playUiSound?.('success');
      window.showToast?.(`Deposited ${(window.currentCurrency || 'PKR')} ${amt.toLocaleString()} to "${goal.name}"!`, 'success');
    }
  }
};

window.editSavedGoal = function(id) {
  const goal = savedGoals.find(g => g.id === id);
  if (!goal) return;

  editingGoalId = id;
  const nameInput = document.getElementById('goalNameInput');
  const catSelect = document.getElementById('goalCategorySelect');
  const targetInput = document.getElementById('goalTargetInput');
  const currentInput = document.getElementById('goalCurrentInput');
  const monthlyInput = document.getElementById('goalMonthlyInput');
  const saveBtn = document.getElementById('btnSaveGoalToBucket');

  if (nameInput) nameInput.value = goal.name;
  if (catSelect) catSelect.value = goal.category || 'Tech';
  if (targetInput) targetInput.value = goal.target;
  if (currentInput) currentInput.value = goal.current;
  if (monthlyInput) monthlyInput.value = goal.monthly;

  if (saveBtn) saveBtn.innerHTML = '<i class="fa-solid fa-check me-1"></i> Update Goal Bucket';

  calculateSavingsGoal();
  document.getElementById('savings-goals')?.scrollIntoView({ behavior: 'smooth' });
  window.showToast?.(`Editing goal: ${goal.name}`, 'info');
};

window.deleteSavedGoal = function(id) {
  const goal = savedGoals.find(g => g.id === id);
  if (!goal) return;

  if (confirm(`Are you sure you want to delete the goal "${goal.name}"?`)) {
    savedGoals = savedGoals.filter(g => g.id !== id);
    saveSavedGoals();
    renderSavedGoalsBucket();
    window.showToast?.(`Goal "${goal.name}" deleted.`, 'info');
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

window.calculate503020 = calculate503020;
window.calculateSavingsGoal = calculateSavingsGoal;
window.renderSavedGoalsBucket = renderSavedGoalsBucket;

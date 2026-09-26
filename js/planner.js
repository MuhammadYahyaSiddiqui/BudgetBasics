/**
 * BUDGETBASICS - EXPENSE PLANNER & DYNAMIC SMART FINANCIAL ADVISOR
 * Full Client-Side CRUD + Dynamic Salary & Custom Target Adaptation + 50/30/20 Health Engine
 */

let expenses = [];
let editingExpenseId = null;
let userSalary = 50000;
let userSavingsTargetPercent = 20;

const defaultExpenses = [
  { id: 'exp_1', date: '2026-09-20', category: 'Transport', type: 'Need', description: 'Monthly student transit / bus pass', amount: 3500 },
  { id: 'exp_2', date: '2026-09-21', category: 'Food', type: 'Need', description: 'Campus meals & grocery essentials', amount: 8500 },
  { id: 'exp_3', date: '2026-09-22', category: 'Education', type: 'Need', description: 'Semester course textbooks & lab notes', amount: 2400 },
  { id: 'exp_4', date: '2026-09-23', category: 'Utilities', type: 'Need', description: 'Mobile student data bundle & internet', amount: 1200 },
  { id: 'exp_5', date: '2026-09-24', category: 'Entertainment', type: 'Want', description: 'Cinema tickets & gaming subscription', amount: 2800 },
  { id: 'exp_6', date: '2026-09-25', category: 'Dining', type: 'Want', description: 'Weekend cafe meetup with study group', amount: 2200 },
  { id: 'exp_7', date: '2026-09-26', category: 'Shopping', type: 'Want', description: 'Stationery organizer & tech accessories', amount: 1800 }
];

document.addEventListener('DOMContentLoaded', () => {
  loadSalaryAndTarget();
  loadExpenses();
  initPlannerEvents();
  renderExpenses();
});

/* ================= Load & Save User Salary & Target ================= */
function loadSalaryAndTarget() {
  const storedSalary = localStorage.getItem('budgetbasics_user_salary');
  if (storedSalary && !isNaN(parseFloat(storedSalary)) && parseFloat(storedSalary) > 0) {
    userSalary = parseFloat(storedSalary);
  } else {
    userSalary = 50000;
  }

  const storedTarget = localStorage.getItem('budgetbasics_user_savings_target_percent');
  if (storedTarget && !isNaN(parseFloat(storedTarget)) && parseFloat(storedTarget) > 0) {
    userSavingsTargetPercent = parseFloat(storedTarget);
  } else {
    userSavingsTargetPercent = 20;
  }

  const salaryInput = document.getElementById('plannerSalaryInput');
  if (salaryInput) salaryInput.value = userSalary;

  const targetInput = document.getElementById('plannerTargetPercentInput');
  if (targetInput) targetInput.value = userSavingsTargetPercent;

  updateSalaryPresetActive(userSalary);
  updateTargetPresetActive(userSavingsTargetPercent);
}

function saveSalary(amount) {
  userSalary = amount;
  localStorage.setItem('budgetbasics_user_salary', amount.toString());
}

function saveSavingsTarget(percent) {
  userSavingsTargetPercent = percent;
  localStorage.setItem('budgetbasics_user_savings_target_percent', percent.toString());
}

function updateSalaryPresetActive(val) {
  document.querySelectorAll('.salary-preset-btn').forEach(btn => {
    const btnVal = parseFloat(btn.dataset.salary);
    if (btnVal === val) {
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline-primary');
    } else {
      btn.classList.remove('active', 'btn-primary');
      btn.classList.add('btn-outline-primary');
    }
  });
}

function updateTargetPresetActive(val) {
  document.querySelectorAll('.target-preset-btn').forEach(btn => {
    const btnVal = parseFloat(btn.dataset.targetPercent);
    if (btnVal === val) {
      btn.classList.add('active', 'btn-success');
      btn.classList.remove('btn-outline-success');
    } else {
      btn.classList.remove('active', 'btn-success');
      btn.classList.add('btn-outline-success');
    }
  });
}

/* ================= Load & Save Expenses ================= */
function loadExpenses() {
  const stored = localStorage.getItem('budgetbasics_planner_expenses');
  if (stored) {
    try {
      expenses = JSON.parse(stored);
      expenses.forEach(e => {
        if (!e.type) {
          e.type = isNeedCategory(e.category) ? 'Need' : 'Want';
        }
      });
    } catch (e) {
      expenses = JSON.parse(JSON.stringify(defaultExpenses));
    }
  } else {
    expenses = JSON.parse(JSON.stringify(defaultExpenses));
    saveExpenses();
  }
}

function saveExpenses() {
  localStorage.setItem('budgetbasics_planner_expenses', JSON.stringify(expenses));
}

function isNeedCategory(cat) {
  const needs = ['food', 'transport', 'education', 'utilities', 'health', 'housing', 'bills'];
  return needs.includes((cat || '').toLowerCase());
}

/* ================= Event Listeners ================= */
function initPlannerEvents() {
  const form = document.getElementById('expensePlannerForm');
  const cancelEditBtn = document.getElementById('btnCancelEdit');
  const resetDemoBtn = document.getElementById('btnResetPlannerDemo');
  const exportCsvBtn = document.getElementById('btnExportCsv');
  const categoryFilter = document.getElementById('plannerCategoryFilter');
  const salaryInput = document.getElementById('plannerSalaryInput');
  const targetPercentInput = document.getElementById('plannerTargetPercentInput');
  const expCategorySelect = document.getElementById('expCategory');
  const expTypeSelect = document.getElementById('expType');

  // Auto-sync classification when category changes in add form
  if (expCategorySelect && expTypeSelect) {
    expCategorySelect.addEventListener('change', () => {
      const isNeed = isNeedCategory(expCategorySelect.value);
      expTypeSelect.value = isNeed ? 'Need' : 'Want';
    });
  }

  // Salary input change
  if (salaryInput) {
    salaryInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) {
        saveSalary(val);
        updateSalaryPresetActive(val);
        updatePlannerSummary();
      }
    });
  }

  // Salary preset buttons
  document.querySelectorAll('.salary-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.dataset.salary);
      if (val) {
        if (salaryInput) salaryInput.value = val;
        saveSalary(val);
        updateSalaryPresetActive(val);
        updatePlannerSummary();
        window.playUiSound?.('click');
        window.showToast?.(`Monthly salary set to ${(window.currentCurrency || 'PKR')} ${val.toLocaleString()}`, 'info');
      }
    });
  });

  // Target savings percent input change
  if (targetPercentInput) {
    targetPercentInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 1 && val <= 90) {
        saveSavingsTarget(val);
        updateTargetPresetActive(val);
        updatePlannerSummary();
      }
    });
  }

  // Target preset buttons
  document.querySelectorAll('.target-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.dataset.targetPercent);
      if (val) {
        if (targetPercentInput) targetPercentInput.value = val;
        saveSavingsTarget(val);
        updateTargetPresetActive(val);
        updatePlannerSummary();
        window.playUiSound?.('click');
        window.showToast?.(`Target Savings goal updated to ${val}%`, 'success');
      }
    });
  });

  // Set today's date as default
  const dateInput = document.getElementById('expDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('expDate').value;
      const category = document.getElementById('expCategory').value;
      const type = document.getElementById('expType').value || (isNeedCategory(category) ? 'Need' : 'Want');
      const description = document.getElementById('expDescription').value.trim();
      const amount = parseFloat(document.getElementById('expAmount').value);

      if (!date || !category || !description || isNaN(amount) || amount <= 0) {
        window.showToast?.('Please fill all fields with valid positive values.', 'error');
        return;
      }

      if (editingExpenseId) {
        // Update
        const index = expenses.findIndex(x => x.id === editingExpenseId);
        if (index !== -1) {
          expenses[index] = { id: editingExpenseId, date, category, type, description, amount };
          window.showToast?.('Expense updated successfully!', 'success');
        }
        editingExpenseId = null;
        document.getElementById('btnSaveExpense').innerHTML = '<i class="fa-solid fa-plus"></i> Add Expense';
        if (cancelEditBtn) cancelEditBtn.style.display = 'none';
      } else {
        // Create
        const newExp = {
          id: 'exp_' + Date.now(),
          date,
          category,
          type,
          description,
          amount
        };
        expenses.unshift(newExp);
        window.showToast?.('Expense entry recorded!', 'success');
      }

      saveExpenses();
      renderExpenses();
      form.reset();
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      if (expTypeSelect) expTypeSelect.value = isNeedCategory(document.getElementById('expCategory').value) ? 'Need' : 'Want';
    });
  }

  // Cancel edit
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      editingExpenseId = null;
      form.reset();
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      document.getElementById('btnSaveExpense').innerHTML = '<i class="fa-solid fa-plus"></i> Add Expense';
      cancelEditBtn.style.display = 'none';
    });
  }

  // Reset data
  if (resetDemoBtn) {
    resetDemoBtn.addEventListener('click', () => {
      if (confirm('Reset your expense ledger to initial starter dataset?')) {
        expenses = JSON.parse(JSON.stringify(defaultExpenses));
        userSalary = 50000;
        userSavingsTargetPercent = 20;
        saveSalary(userSalary);
        saveSavingsTarget(userSavingsTargetPercent);
        if (salaryInput) salaryInput.value = userSalary;
        if (targetPercentInput) targetPercentInput.value = userSavingsTargetPercent;
        updateSalaryPresetActive(userSalary);
        updateTargetPresetActive(userSavingsTargetPercent);
        saveExpenses();
        renderExpenses();
        window.showToast?.('Default dataset & 20% target restored.', 'info');
      }
    });
  }

  // Export CSV
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportExpensesToCSV);
  }

  // Filter change
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      renderExpenses();
    });
  }

  // Listen for global currency changes
  const currencySelector = document.getElementById('currencySelector');
  if (currencySelector) {
    currencySelector.addEventListener('change', () => {
      renderExpenses();
    });
  }
}

/* ================= Render Expense Table ================= */
function renderExpenses() {
  const tbody = document.getElementById('expenseTableBody');
  const emptyState = document.getElementById('expenseEmptyState');
  const filterVal = document.getElementById('plannerCategoryFilter')?.value || 'all';
  const curr = window.currentCurrency || 'PKR';

  if (!tbody) return;

  let filtered = expenses;
  if (filterVal === 'Needs_All') {
    filtered = expenses.filter(e => e.type === 'Need' || isNeedCategory(e.category));
  } else if (filterVal === 'Wants_All') {
    filtered = expenses.filter(e => e.type === 'Want' || !isNeedCategory(e.category));
  } else if (filterVal !== 'all') {
    filtered = expenses.filter(e => e.category.toLowerCase() === filterVal.toLowerCase());
  }

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';

    filtered.forEach(exp => {
      const tr = document.createElement('tr');
      const badgeClass = getBadgeClass(exp.category);
      const isNeed = (exp.type === 'Need' || (!exp.type && isNeedCategory(exp.category)));
      const typeBadge = isNeed 
        ? '<span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 me-1"><i class="fa-solid fa-shield-heart me-1"></i>Need</span>' 
        : '<span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 me-1"><i class="fa-solid fa-gift me-1"></i>Want</span>';

      tr.innerHTML = `
        <td><i class="fa-regular fa-calendar text-muted me-1"></i> ${exp.date}</td>
        <td>
          <div class="d-flex align-items-center gap-1 flex-wrap">
            ${typeBadge}
            <span class="badge-category ${badgeClass}">${exp.category}</span>
          </div>
        </td>
        <td><strong>${escapeHtml(exp.description)}</strong></td>
        <td><strong class="text-primary">${curr} ${exp.amount.toLocaleString()}</strong></td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-primary" onclick="editExpense('${exp.id}')" title="Edit Entry" aria-label="Edit Entry">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteExpense('${exp.id}')" title="Delete Entry" aria-label="Delete Entry">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  updatePlannerSummary();
}

/* ================= Update Planner Summary & Smart Advisor ================= */
function updatePlannerSummary() {
  const curr = window.currentCurrency || 'PKR';
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = userSalary - totalSpent;
  const spentPercent = userSalary > 0 ? Math.round((totalSpent / userSalary) * 100) : 0;

  // Dynamic Custom Targets
  const targetSavingsPercent = Math.max(1, Math.min(90, userSavingsTargetPercent));
  let targetNeedsPercent = 50;
  if (targetSavingsPercent > 40) {
    targetNeedsPercent = Math.max(30, 100 - targetSavingsPercent - 10);
  }
  const targetWantsPercent = Math.max(0, 100 - targetNeedsPercent - targetSavingsPercent);

  const targetSavings = Math.round(userSalary * (targetSavingsPercent / 100));
  const targetNeeds = Math.round(userSalary * (targetNeedsPercent / 100));
  const targetWants = Math.round(userSalary * (targetWantsPercent / 100));

  // Actual spent split
  let spentNeeds = 0;
  let spentWants = 0;

  expenses.forEach(e => {
    if (e.type === 'Need' || (!e.type && isNeedCategory(e.category))) {
      spentNeeds += e.amount;
    } else {
      spentWants += e.amount;
    }
  });

  const remainingNeeds = targetNeeds - spentNeeds;
  const remainingWants = targetWants - spentWants;
  const needsUsedPercent = targetNeeds > 0 ? Math.min(100, Math.round((spentNeeds / targetNeeds) * 100)) : 0;
  const wantsUsedPercent = targetWants > 0 ? Math.min(100, Math.round((spentWants / targetWants) * 100)) : 0;

  // Top 4 KPI Displays
  const salaryEl = document.getElementById('plannerTotalIncomeDisplay');
  const totalEl = document.getElementById('plannerTotalSpentDisplay');
  const spentPercentSub = document.getElementById('plannerSpentPercentSubtitle');
  const remEl = document.getElementById('plannerRemainingBudgetDisplay');
  const remSub = document.getElementById('plannerBalanceSubtitle');
  const targetPercentDisplay = document.getElementById('plannerTargetPercentDisplay');
  const savingsTargetEl = document.getElementById('plannerTargetSavingsDisplay');
  const targetStatusText = document.getElementById('plannerTargetStatusText');

  if (salaryEl) salaryEl.innerHTML = `<span class="currency-label">${curr}</span> ${userSalary.toLocaleString()}`;
  if (totalEl) totalEl.innerHTML = `<span class="currency-label">${curr}</span> ${totalSpent.toLocaleString()}`;
  if (spentPercentSub) spentPercentSub.textContent = `${spentPercent}% of budget spent (${expenses.length} items)`;

  if (targetPercentDisplay) targetPercentDisplay.textContent = `${targetSavingsPercent}%`;
  if (savingsTargetEl) savingsTargetEl.innerHTML = `<span class="currency-label">${curr}</span> ${targetSavings.toLocaleString()}`;

  if (targetStatusText) {
    if (remaining >= targetSavings) {
      targetStatusText.innerHTML = `<span class="text-success fw-bold"><i class="fa-solid fa-check me-1"></i>Target Secured (${curr} ${remaining.toLocaleString()})</span>`;
    } else if (remaining > 0) {
      const diff = targetSavings - remaining;
      targetStatusText.innerHTML = `<span class="text-warning"><i class="fa-solid fa-clock me-1"></i>${curr} ${diff.toLocaleString()} to reach target</span>`;
    } else {
      targetStatusText.innerHTML = `<span class="text-danger"><i class="fa-solid fa-xmark me-1"></i>Target missed (Deficit)</span>`;
    }
  }

  if (remEl) {
    remEl.innerHTML = `<span class="currency-label">${curr}</span> ${remaining.toLocaleString()}`;
    if (remaining < 0) {
      remEl.className = 'stat-box-num text-danger';
      if (remSub) remSub.textContent = 'Deficit: Over budget!';
    } else if (remaining < targetSavings) {
      remEl.className = 'stat-box-num text-warning';
      if (remSub) remSub.textContent = `Below ${targetSavingsPercent}% Target Goal`;
    } else {
      remEl.className = 'stat-box-num text-success';
      if (remSub) remSub.textContent = `Target ${targetSavingsPercent}% Savings Achieved!`;
    }
  }

  // Allocation Percentage Labels Update
  const advNeedsPercentLabel = document.getElementById('advNeedsPercentLabel');
  const advWantsPercentLabel = document.getElementById('advWantsPercentLabel');
  const advSavingsTargetPercentLabel = document.getElementById('advSavingsTargetPercentLabel');

  if (advNeedsPercentLabel) advNeedsPercentLabel.textContent = `${targetNeedsPercent}%`;
  if (advWantsPercentLabel) advWantsPercentLabel.textContent = `${targetWantsPercent}%`;
  if (advSavingsTargetPercentLabel) advSavingsTargetPercentLabel.textContent = `${targetSavingsPercent}%`;

  // Allocation Bars Update
  const advNeedsTargetEl = document.getElementById('advNeedsTarget');
  const advNeedsSpentEl = document.getElementById('advNeedsSpent');
  const advNeedsBar = document.getElementById('advNeedsBar');
  const advNeedsRemainingEl = document.getElementById('advNeedsRemaining');

  if (advNeedsTargetEl) advNeedsTargetEl.innerHTML = `<span class="currency-label">${curr}</span> ${targetNeeds.toLocaleString()}`;
  if (advNeedsSpentEl) {
    advNeedsSpentEl.innerHTML = `<span class="currency-label">${curr}</span> ${spentNeeds.toLocaleString()} (${needsUsedPercent}%)`;
    advNeedsSpentEl.className = spentNeeds > targetNeeds ? 'small text-danger fw-bold' : 'small text-primary';
  }
  if (advNeedsBar) {
    advNeedsBar.style.width = `${Math.min(100, needsUsedPercent)}%`;
    advNeedsBar.className = `progress-bar-fill ${spentNeeds > targetNeeds ? 'bg-danger' : 'bg-primary'}`;
  }
  if (advNeedsRemainingEl) {
    if (remainingNeeds >= 0) {
      advNeedsRemainingEl.innerHTML = `Remaining: <span class="currency-label">${curr}</span> ${remainingNeeds.toLocaleString()}`;
      advNeedsRemainingEl.className = 'fw-semibold text-muted';
    } else {
      advNeedsRemainingEl.innerHTML = `Over Limit by <span class="currency-label">${curr}</span> ${Math.abs(remainingNeeds).toLocaleString()}`;
      advNeedsRemainingEl.className = 'fw-semibold text-danger';
    }
  }

  const advWantsTargetEl = document.getElementById('advWantsTarget');
  const advWantsSpentEl = document.getElementById('advWantsSpent');
  const advWantsBar = document.getElementById('advWantsBar');
  const advWantsRemainingEl = document.getElementById('advWantsRemaining');

  if (advWantsTargetEl) advWantsTargetEl.innerHTML = `<span class="currency-label">${curr}</span> ${targetWants.toLocaleString()}`;
  if (advWantsSpentEl) {
    advWantsSpentEl.innerHTML = `<span class="currency-label">${curr}</span> ${spentWants.toLocaleString()} (${wantsUsedPercent}%)`;
    advWantsSpentEl.className = spentWants > targetWants ? 'small text-danger fw-bold' : 'small text-warning';
  }
  if (advWantsBar) {
    advWantsBar.style.width = `${Math.min(100, wantsUsedPercent)}%`;
    advWantsBar.className = `progress-bar-fill ${spentWants > targetWants ? 'bg-danger' : 'bg-warning'}`;
  }
  if (advWantsRemainingEl) {
    if (remainingWants >= 0) {
      advWantsRemainingEl.innerHTML = `Remaining: <span class="currency-label">${curr}</span> ${remainingWants.toLocaleString()}`;
      advWantsRemainingEl.className = 'fw-semibold text-muted';
    } else {
      advWantsRemainingEl.innerHTML = `Over Limit by <span class="currency-label">${curr}</span> ${Math.abs(remainingWants).toLocaleString()}`;
      advWantsRemainingEl.className = 'fw-semibold text-danger';
    }
  }

  const advSavingsTargetEl = document.getElementById('advSavingsTarget');
  const advSavingsProjectedEl = document.getElementById('advSavingsProjected');
  const advSavingsBar = document.getElementById('advSavingsBar');
  const advSavingsStatusEl = document.getElementById('advSavingsStatus');

  if (advSavingsTargetEl) advSavingsTargetEl.innerHTML = `<span class="currency-label">${curr}</span> ${targetSavings.toLocaleString()}`;
  if (advSavingsProjectedEl) {
    const projected = Math.max(0, remaining);
    advSavingsProjectedEl.innerHTML = `<span class="currency-label">${curr}</span> ${projected.toLocaleString()} Current Surplus`;
  }
  if (advSavingsBar) {
    const savingsRatio = targetSavings > 0 ? Math.min(100, Math.round((Math.max(0, remaining) / targetSavings) * 100)) : 0;
    advSavingsBar.style.width = `${savingsRatio}%`;
    advSavingsBar.className = `progress-bar-fill ${remaining < targetSavings ? 'bg-warning' : 'bg-success'}`;
  }
  if (advSavingsStatusEl) {
    if (remaining >= targetSavings) {
      advSavingsStatusEl.textContent = `Status: Target Met (${targetSavingsPercent}% Goal Achieved)`;
      advSavingsStatusEl.className = 'fw-semibold text-success';
    } else if (remaining > 0) {
      advSavingsStatusEl.textContent = `Status: In Progress (${Math.round((remaining / targetSavings) * 100)}% of Target)`;
      advSavingsStatusEl.className = 'fw-semibold text-warning';
    } else {
      advSavingsStatusEl.textContent = 'Status: Savings Depleted (Deficit)';
      advSavingsStatusEl.className = 'fw-semibold text-danger';
    }
  }

  // Generate Dynamic Smart Financial Advice
  renderSmartAdvice({
    curr,
    userSalary,
    totalSpent,
    remaining,
    targetNeeds,
    targetWants,
    targetSavings,
    targetSavingsPercent,
    spentNeeds,
    spentWants,
    remainingNeeds,
    remainingWants,
    needsUsedPercent,
    wantsUsedPercent
  });

  const updatedText = document.getElementById('plannerLastUpdatedText');
  if (updatedText) {
    updatedText.textContent = `Calculated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Update Category Breakdown & Budget Comparison Charts
  updatePlannerCharts(targetNeeds, spentNeeds, targetWants, spentWants, targetSavings, remaining);
}

let plannerCategoryChartInstance = null;
let plannerBudgetCompareChartInstance = null;

function updatePlannerCharts(targetNeeds, spentNeeds, targetWants, spentWants, targetSavings, remainingSurplus) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#F8FAFC' : '#0F172A';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const curr = window.currentCurrency || 'PKR';

  // 1. Category Breakdown Doughnut Chart
  const catCanvas = document.getElementById('plannerCategoryDoughnutChart');
  if (catCanvas) {
    const categoryTotals = {};
    expenses.forEach(e => {
      const cat = e.category || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + e.amount;
    });

    const catLabels = Object.keys(categoryTotals);
    const catData = Object.values(categoryTotals);

    const defaultColors = {
      'Food': '#10B981',
      'Transport': '#3B82F6',
      'Education': '#6366F1',
      'Utilities': '#06B6D4',
      'Entertainment': '#F59E0B',
      'Dining': '#EC4899',
      'Shopping': '#8B5CF6',
      'Other': '#94A3B8'
    };

    const bgColors = catLabels.map(c => defaultColors[c] || '#64748B');

    const doughnutData = {
      labels: catLabels.length > 0 ? catLabels : ['No Expenses Logged'],
      datasets: [{
        data: catData.length > 0 ? catData : [1],
        backgroundColor: catData.length > 0 ? bgColors : ['#CBD5E1'],
        borderWidth: 2,
        borderColor: isDark ? '#080E0C' : '#FFFFFF'
      }]
    };

    if (plannerCategoryChartInstance) {
      plannerCategoryChartInstance.data = doughnutData;
      plannerCategoryChartInstance.options.plugins.legend.labels.color = textColor;
      plannerCategoryChartInstance.update();
    } else if (typeof Chart !== 'undefined') {
      plannerCategoryChartInstance = new Chart(catCanvas, {
        type: 'doughnut',
        data: doughnutData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                font: { family: 'Plus Jakarta Sans', size: 10, weight: '700' },
                color: textColor,
                padding: 10
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return ` ${context.label}: ${curr} ${context.raw.toLocaleString()}`;
                }
              }
            }
          }
        }
      });
    }
  }

  // 2. Budget vs Actual Bar Chart
  const barCanvas = document.getElementById('plannerBudgetCompareBarChart');
  if (barCanvas) {
    const barData = {
      labels: ['Needs (50%)', 'Wants (30%)', 'Savings Goal'],
      datasets: [
        {
          label: 'Budget Allocated Target',
          data: [targetNeeds, targetWants, targetSavings],
          backgroundColor: 'rgba(79, 70, 229, 0.75)',
          borderColor: '#4F46E5',
          borderWidth: 1.5,
          borderRadius: 6
        },
        {
          label: 'Actual Spent / Available',
          data: [spentNeeds, spentWants, Math.max(0, remainingSurplus)],
          backgroundColor: [
            spentNeeds > targetNeeds ? '#EF4444' : 'rgba(16, 185, 129, 0.75)',
            spentWants > targetWants ? '#EF4444' : 'rgba(245, 158, 11, 0.75)',
            remainingSurplus >= targetSavings ? '#10B981' : '#F59E0B'
          ],
          borderWidth: 1.5,
          borderRadius: 6
        }
      ]
    };

    if (plannerBudgetCompareChartInstance) {
      plannerBudgetCompareChartInstance.data = barData;
      plannerBudgetCompareChartInstance.options.plugins.legend.labels.color = textColor;
      plannerBudgetCompareChartInstance.options.scales.x.ticks.color = textColor;
      plannerBudgetCompareChartInstance.options.scales.y.ticks.color = textColor;
      plannerBudgetCompareChartInstance.options.scales.x.grid.color = gridColor;
      plannerBudgetCompareChartInstance.options.scales.y.grid.color = gridColor;
      plannerBudgetCompareChartInstance.update();
    } else if (typeof Chart !== 'undefined') {
      plannerBudgetCompareChartInstance = new Chart(barCanvas, {
        type: 'bar',
        data: barData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
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
                  return ` ${context.dataset.label}: ${curr} ${context.raw.toLocaleString()}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10, weight: '700' } }
            },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: textColor,
                font: { family: 'Plus Jakarta Sans', size: 10 },
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
}

/* ================= Dynamic Smart Financial Guidance Generator ================= */
function renderSmartAdvice(data) {
  const {
    curr,
    userSalary,
    remaining,
    targetNeeds,
    targetWants,
    targetSavings,
    targetSavingsPercent,
    spentNeeds,
    spentWants,
    remainingNeeds,
    remainingWants,
    needsUsedPercent,
    wantsUsedPercent
  } = data;

  const healthBadge = document.getElementById('budgetHealthBadge');
  const adviceTitle = document.getElementById('budgetAdviceTitle');
  const adviceBody = document.getElementById('budgetAdviceBody');

  if (!adviceBody) return;

  // Determine Budget Status
  let healthState = 'healthy';
  let badgeText = `${targetSavingsPercent}% Target On Track`;
  let badgeClass = 'badge bg-success';

  if (remaining < 0) {
    healthState = 'deficit';
    badgeText = 'Budget Deficit!';
    badgeClass = 'badge bg-danger';
  } else if (remaining < targetSavings) {
    healthState = 'target_at_risk';
    badgeText = `Target ${targetSavingsPercent}% At Risk`;
    badgeClass = 'badge bg-warning text-dark';
  } else if (spentWants > targetWants) {
    healthState = 'wants_high';
    badgeText = 'Wants High';
    badgeClass = 'badge bg-warning text-dark';
  }

  if (healthBadge) {
    healthBadge.className = badgeClass;
    healthBadge.textContent = badgeText;
  }

  const dailyWantsSafe = remainingWants > 0 ? Math.round(remainingWants / 15) : 0;

  // Safe Spending Text (Kahan kharch karein)
  let spendAdvice = '';
  if (remainingNeeds > 0) {
    spendAdvice += `You have <strong class="text-primary">${curr} ${remainingNeeds.toLocaleString()}</strong> remaining for essential Needs (groceries, transport, books). `;
  } else {
    spendAdvice += `<span class="text-danger fw-bold">Essential Needs limit exceeded by ${curr} ${Math.abs(remainingNeeds).toLocaleString()}!</span> Limit strictly to survival essentials. `;
  }

  if (remainingWants > 0) {
    spendAdvice += `For lifestyle & fun, you have <strong class="text-warning">${curr} ${remainingWants.toLocaleString()}</strong> left (~${curr} ${dailyWantsSafe.toLocaleString()}/day cap).`;
  } else {
    spendAdvice += `<span class="text-danger fw-bold">Wants allowance exhausted.</span> Pause all discretionary dining & shopping!`;
  }

  // Where to Cut Back (Kahan se bachayein)
  let cutbackAdvice = '';
  if (spentWants > targetWants) {
    cutbackAdvice = `🚨 <strong>Wants Overspend:</strong> Discretionary lifestyle spending is at <strong>${wantsUsedPercent}%</strong> of limit. Halt dining out, impulse online orders, and shopping until next month.`;
  } else if (remaining < targetSavings) {
    const shortage = targetSavings - Math.max(0, remaining);
    cutbackAdvice = `⚠️ <strong>Target Goal Gap:</strong> You need to save <strong>${curr} ${shortage.toLocaleString()}</strong> more to reach your chosen <strong>${targetSavingsPercent}% target (${curr} ${targetSavings.toLocaleString()})</strong>. Cut down on dining and non-essential shopping.`;
  } else if (spentNeeds > targetNeeds) {
    cutbackAdvice = `⚠️ <strong>High Essential Costs:</strong> Needs are consuming ${needsUsedPercent}% of your budget. Consider student discount transport passes and shared book resources.`;
  } else {
    cutbackAdvice = `✨ <strong>Goal Secured:</strong> Your savings surplus of <strong>${curr} ${remaining.toLocaleString()}</strong> successfully covers your <strong>${targetSavingsPercent}% Target Goal (${curr} ${targetSavings.toLocaleString()})</strong>!`;
  }

  // Immediate Action Checklist
  let actionList = `
    <ul class="list-unstyled mb-0 d-flex flex-column gap-2 mt-2">
      <li class="d-flex align-items-start gap-2">
        <i class="fa-solid fa-circle-check text-success mt-1"></i>
        <div><strong>1. Lock In Your Target Savings (${targetSavingsPercent}%):</strong> Transfer <strong>${curr} ${targetSavings.toLocaleString()}</strong> immediately into a separate savings/cushion fund.</div>
      </li>
      <li class="d-flex align-items-start gap-2">
        <i class="fa-solid fa-circle-check text-primary mt-1"></i>
        <div><strong>2. Daily Discretionary Cap:</strong> Keep daily non-essential spending under <strong>${curr} ${dailyWantsSafe.toLocaleString()}</strong> to preserve your target.</div>
      </li>
      <li class="d-flex align-items-start gap-2">
        <i class="fa-solid fa-circle-check text-warning mt-1"></i>
        <div><strong>3. The 24-Hour Purchase Delay:</strong> Wait 24 hours before making any impulse purchase above ${curr} 1,500.</div>
      </li>
    </ul>
  `;

  if (healthState === 'deficit') {
    if (adviceTitle) adviceTitle.textContent = 'Emergency Budget Recovery Plan';
    adviceBody.innerHTML = `
      <div class="alert alert-danger py-2 px-3 mb-3">
        <i class="fa-solid fa-triangle-exclamation me-1"></i>
        <strong>Deficit Alert:</strong> You have overspent your monthly salary by <strong>${curr} ${Math.abs(remaining).toLocaleString()}</strong>!
      </div>
      <div class="mb-2"><strong>🔴 Where to Cut Back Immediately:</strong> Stop all dining out, shopping, and entertainment subscriptions. Reallocate any remaining cash strictly to transport and core meals.</div>
      <div class="mb-2"><strong>💡 Emergency Action Steps:</strong></div>
      ${actionList}
    `;
  } else if (healthState === 'target_at_risk' || healthState === 'wants_high') {
    if (adviceTitle) adviceTitle.textContent = `Action Plan to Hit Your ${targetSavingsPercent}% Target Goal`;
    adviceBody.innerHTML = `
      <div class="mb-2"><strong>🟢 Safe Spending Limits:</strong> ${spendAdvice}</div>
      <div class="mb-2"><strong>🎯 Target Protection:</strong> ${cutbackAdvice}</div>
      <div class="mb-1"><strong>💡 Smart Action Checklist:</strong></div>
      ${actionList}
    `;
  } else {
    if (adviceTitle) adviceTitle.textContent = `Target ${targetSavingsPercent}% Savings Achieved Plan`;
    adviceBody.innerHTML = `
      <div class="mb-2"><strong>🟢 Safe Spending Limits:</strong> ${spendAdvice}</div>
      <div class="mb-2"><strong>🛡️ Spending Control:</strong> ${cutbackAdvice}</div>
      <div class="mb-1"><strong>💡 Smart Financial Growth Steps:</strong></div>
      ${actionList}
    `;
  }
}

/* ================= CRUD Helper Functions ================= */
window.editExpense = function(id) {
  const exp = expenses.find(e => e.id === id);
  if (!exp) return;

  editingExpenseId = id;
  document.getElementById('expDate').value = exp.date;
  document.getElementById('expCategory').value = exp.category;
  if (document.getElementById('expType')) {
    document.getElementById('expType').value = exp.type || (isNeedCategory(exp.category) ? 'Need' : 'Want');
  }
  document.getElementById('expDescription').value = exp.description;
  document.getElementById('expAmount').value = exp.amount;

  document.getElementById('btnSaveExpense').innerHTML = '<i class="fa-solid fa-check"></i> Update Entry';
  const cancelBtn = document.getElementById('btnCancelEdit');
  if (cancelBtn) cancelBtn.style.display = 'inline-flex';

  document.getElementById('expensePlannerForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

window.deleteExpense = function(id) {
  if (confirm('Are you sure you want to delete this expense record?')) {
    expenses = expenses.filter(e => e.id !== id);
    saveExpenses();
    renderExpenses();
    window.showToast?.('Expense entry deleted.', 'info');
  }
};

function exportExpensesToCSV() {
  if (expenses.length === 0) {
    window.showToast?.('No expenses recorded to export.', 'error');
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,ID,Date,Type,Category,Description,Amount\n";
  expenses.forEach(e => {
    const type = e.type || (isNeedCategory(e.category) ? 'Need' : 'Want');
    csvContent += `"${e.id}","${e.date}","${type}","${e.category}","${e.description.replace(/"/g, '""')}","${e.amount}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `BudgetBasics_Expense_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.showToast?.('Expense ledger exported as CSV!', 'success');
}

function getBadgeClass(cat) {
  switch ((cat || '').toLowerCase()) {
    case 'food': return 'badge-food';
    case 'transport': return 'badge-transport';
    case 'education': return 'badge-education';
    case 'utilities': return 'badge-education';
    case 'entertainment': return 'badge-entertainment';
    case 'shopping': return 'badge-shopping';
    case 'dining': return 'badge-food';
    default: return 'badge-misc';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

window.renderExpenses = renderExpenses;
window.updatePlannerSummary = updatePlannerSummary;

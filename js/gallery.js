/**
 * BUDGETBASICS - INFOGRAPHICS GALLERY, MONEY MISTAKES & GLOBAL INSTANT SEARCH ENGINE
 */

let infographicsData = [];
let mistakesData = [];

// Comprehensive Platform Feature Search Index
const platformFeatures = [
  {
    id: 'feature_basics',
    title: 'Budgeting Fundamentals & 3 Pillars',
    category: 'Learn Budgeting',
    categoryBadge: 'bg-primary',
    icon: 'fa-graduation-cap',
    target: '#basics',
    keywords: ['basics', 'income', 'fixed', 'variable', 'inflows', 'outflows', 'pay yourself first', 'allowance', 'student budget', 'table', 'pillar']
  },
  {
    id: 'feature_needs_wants',
    title: 'Needs vs. Wants Classifier & 24-Hour Rule',
    category: 'Interactive Game',
    categoryBadge: 'bg-warning text-dark',
    icon: 'fa-scale-balanced',
    target: '#needs-wants',
    keywords: ['needs', 'wants', 'classifier', 'game', 'quiz', 'impulse', '24-hour', 'delay', 'decision', 'essential', 'discretionary', 'textbook', 'dining']
  },
  {
    id: 'feature_503020',
    title: '50-30-20 Rule Budget Allocation Calculator',
    category: 'Calculators',
    categoryBadge: 'bg-success',
    icon: 'fa-calculator',
    target: '#calculator-503020',
    keywords: ['50-30-20', '50/30/20', 'calculator', 'formula', 'slider', 'needs 50', 'wants 30', 'savings 20', 'pie chart', 'doughnut', 'allocation', 'hostel', 'split']
  },
  {
    id: 'feature_savings_goals',
    title: 'S.M.A.R.T. Savings Goals & Milestones Planner',
    category: 'Practice Planning',
    categoryBadge: 'bg-info text-dark',
    icon: 'fa-bullseye',
    target: '#savings-goals',
    keywords: ['savings', 'goal', 'laptop', 'emergency', 'tuition', 'bike', 'milestones', 'bucket', 'timeline', 'daily pace', 'weekly pace', 'growth curve', 'target']
  },
  {
    id: 'feature_expense_planner',
    title: 'Personal Salary & Expense Budget Planner',
    category: 'Practice Planning',
    categoryBadge: 'bg-primary',
    icon: 'fa-table-list',
    target: '#expense-planner',
    keywords: ['planner', 'salary', 'income', 'expense', 'ledger', 'advisor', 'kpi', 'balance', 'spent', 'csv', 'print', 'chart', 'analytics', 'budget vs actual']
  },
  {
    id: 'feature_money_mistakes',
    title: '10 Common Student Money Mistakes & Solutions',
    category: 'Explore & Learn',
    categoryBadge: 'bg-danger',
    icon: 'fa-triangle-exclamation',
    target: '#money-mistakes',
    keywords: ['mistakes', 'traps', 'impulse', 'flash sales', 'loans', 'credit', 'subscriptions', 'small leaks', 'emergency', 'fomo', 'solutions', 'pitfalls']
  },
  {
    id: 'feature_infographics',
    title: 'Infographics & Visual Learning Gallery',
    category: 'Explore Resources',
    categoryBadge: 'bg-primary',
    icon: 'fa-images',
    target: '#infographics',
    keywords: ['infographics', 'gallery', 'visual', 'cards', 'saving challenges', 'pyramid', 'matrix', 'lightbox', 'rules']
  },
  {
    id: 'feature_health_check',
    title: 'Student Financial Health Scorecard & Certificate',
    category: 'Diagnostics',
    categoryBadge: 'bg-success',
    icon: 'fa-stethoscope',
    target: '#health-check',
    keywords: ['health', 'scorecard', 'certificate', 'quiz', 'score', 'discipline', 'diagnostic', 'achievement', 'print certificate']
  },
  {
    id: 'feature_beebot',
    title: 'BeeBot AI Q&A Financial Assistant',
    category: 'AI Assistant',
    categoryBadge: 'bg-warning text-dark',
    icon: 'fa-robot',
    target: '#chatbotModal',
    keywords: ['beebot', 'ai', 'chatbot', 'bot', 'assistant', 'ask', 'question', 'advice', 'help', 'q&a', 'voice']
  },
  {
    id: 'feature_sitemap',
    title: 'Interactive Full Platform Sitemap',
    category: 'Navigation',
    categoryBadge: 'bg-secondary',
    icon: 'fa-sitemap',
    target: '#sitemapModal',
    keywords: ['sitemap', 'tree', 'structure', 'architecture', 'overview', 'all pages', 'modules']
  }
];

document.addEventListener('DOMContentLoaded', () => {
  loadGalleryAndMistakes();
  initSearchAndFilterEvents();
});

async function loadGalleryAndMistakes() {
  try {
    const [infoRes, mistRes] = await Promise.all([
      fetch('data/infographics.json'),
      fetch('data/mistakes.json')
    ]);
    if (!infoRes.ok || !mistRes.ok) throw new Error('Network error');
    infographicsData = await infoRes.json();
    mistakesData = await mistRes.json();
  } catch (err) {
    if (window.OFFLINE_DATA) {
      infographicsData = window.OFFLINE_DATA.infographics || [];
      mistakesData = window.OFFLINE_DATA.mistakes || [];
    }
  }

  renderInfographics('all');
  renderMistakes();
}

function initSearchAndFilterEvents() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const topic = btn.dataset.topic;
      renderInfographics(topic);
      window.playUiSound?.('click');
    });
  });

  const searchInput = document.getElementById('globalSearchInput');
  const clearBtn = document.getElementById('btnClearGlobalSearch');
  const resultsDropdown = document.getElementById('globalSearchResultsDropdown');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = q ? 'inline-block' : 'none';
      performGlobalSearch(q);
    });

    searchInput.addEventListener('focus', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (q) performGlobalSearch(q);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      clearBtn.style.display = 'none';
      if (resultsDropdown) resultsDropdown.style.display = 'none';
      performGlobalSearch('');
      window.playUiSound?.('click');
    });
  }

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    const searchSection = document.getElementById('searchFilterSection');
    if (searchSection && !searchSection.contains(e.target)) {
      if (resultsDropdown) resultsDropdown.style.display = 'none';
    }
  });
}

function performGlobalSearch(query) {
  const resultsDropdown = document.getElementById('globalSearchResultsDropdown');
  const resultAlert = document.getElementById('searchResultAlert');

  if (!query) {
    renderInfographics('all');
    renderMistakes();
    if (resultsDropdown) resultsDropdown.style.display = 'none';
    if (resultAlert) resultAlert.style.display = 'none';
    return;
  }

  // 1. Match Platform Core Features & Calculators
  const matchedFeatures = platformFeatures.filter(f =>
    f.title.toLowerCase().includes(query) ||
    f.category.toLowerCase().includes(query) ||
    f.keywords.some(k => k.toLowerCase().includes(query))
  );

  // 2. Match Infographics
  const matchedInfo = infographicsData.filter(i => 
    i.title.toLowerCase().includes(query) ||
    i.summary.toLowerCase().includes(query) ||
    i.categoryLabel.toLowerCase().includes(query) ||
    (i.topic && i.topic.toLowerCase().includes(query))
  );

  // 3. Match Mistakes
  const matchedMistakes = mistakesData.filter(m =>
    m.title.toLowerCase().includes(query) ||
    m.scenario.toLowerCase().includes(query) ||
    m.consequence.toLowerCase().includes(query) ||
    m.correctiveAction.toLowerCase().includes(query) ||
    m.category.toLowerCase().includes(query)
  );

  const totalMatches = matchedFeatures.length + matchedInfo.length + matchedMistakes.length;

  // Render Live Instant Dropdown Box
  if (resultsDropdown) {
    if (totalMatches === 0) {
      resultsDropdown.innerHTML = `
        <div class="text-center py-4 text-muted">
          <i class="fa-solid fa-magnifying-glass fa-2x mb-2 d-block opacity-50"></i>
          <h6 class="fw-bold mb-1">No matching results found for "${escapeHtml(query)}"</h6>
          <small class="text-secondary">Try searching for <em>'50-30-20'</em>, <em>'savings'</em>, <em>'expense'</em>, <em>'needs'</em>, or <em>'mistakes'</em>.</small>
        </div>
      `;
    } else {
      let html = `<div class="d-flex justify-content-between align-items-center mb-2 px-1 border-bottom pb-2">
        <span class="small fw-bold text-muted text-uppercase"><i class="fa-solid fa-bolt text-warning me-1"></i> Instant Search Results (${totalMatches})</span>
        <small class="text-muted">Click to jump directly</small>
      </div>`;

      // Render Features
      if (matchedFeatures.length > 0) {
        html += `<div class="search-results-category-title"><i class="fa-solid fa-sliders me-1"></i> Calculators & Key Modules</div>`;
        matchedFeatures.forEach(f => {
          html += `
            <div class="search-result-item" onclick="handleSearchResultClick('${f.target}', '${f.id}')">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-3 bg-light border text-center" style="width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
                  <i class="fa-solid ${f.icon}"></i>
                </div>
                <div>
                  <strong class="d-block" style="font-size: 0.93rem;">${escapeHtml(f.title)}</strong>
                  <small class="text-muted">Jump to interactive tool</small>
                </div>
              </div>
              <span class="badge ${f.categoryBadge} search-result-badge">${escapeHtml(f.category)}</span>
            </div>
          `;
        });
      }

      // Render Infographics
      if (matchedInfo.length > 0) {
        html += `<div class="search-results-category-title"><i class="fa-solid fa-images me-1"></i> Infographics & Visual Guides</div>`;
        matchedInfo.slice(0, 4).forEach(item => {
          html += `
            <div class="search-result-item" onclick="openInfographicModal('${item.id}'); document.getElementById('globalSearchResultsDropdown').style.display='none';">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-3 bg-light border text-center" style="width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
                  <i class="fa-solid ${item.icon || 'fa-chart-pie'}"></i>
                </div>
                <div>
                  <strong class="d-block" style="font-size: 0.93rem;">${escapeHtml(item.title)}</strong>
                  <small class="text-muted">${escapeHtml(item.summary.substring(0, 60))}...</small>
                </div>
              </div>
              <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 search-result-badge">${escapeHtml(item.categoryLabel)}</span>
            </div>
          `;
        });
      }

      // Render Money Mistakes
      if (matchedMistakes.length > 0) {
        html += `<div class="search-results-category-title"><i class="fa-solid fa-triangle-exclamation me-1"></i> Money Mistakes & Solutions</div>`;
        matchedMistakes.slice(0, 3).forEach(m => {
          html += `
            <div class="search-result-item" onclick="handleSearchResultClick('#mistake_item_${m.id}', 'mistake'); toggleMistakeAccordion('mistake_item_${m.id}', true);">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-3 bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 text-center" style="width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
                  <i class="fa-solid ${m.icon || 'fa-exclamation'}"></i>
                </div>
                <div>
                  <strong class="d-block" style="font-size: 0.93rem;">${escapeHtml(m.title)}</strong>
                  <small class="text-danger">${escapeHtml(m.severity)} • ${escapeHtml(m.category)}</small>
                </div>
              </div>
              <span class="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 search-result-badge">Mistake Guide</span>
            </div>
          `;
        });
      }

      resultsDropdown.innerHTML = html;
    }
    resultsDropdown.style.display = 'block';
  }

  // Also filter bottom page modules
  const container = document.getElementById('infographicsGridContainer');
  if (container) {
    if (matchedInfo.length === 0) {
      container.innerHTML = `<div class="col-12 text-center p-4 text-muted">No infographics matching "<strong>${escapeHtml(query)}</strong>"</div>`;
    } else {
      renderInfographicsList(matchedInfo);
    }
  }

  const mistakesContainer = document.getElementById('moneyMistakesAccordion');
  if (mistakesContainer) {
    if (matchedMistakes.length === 0) {
      mistakesContainer.innerHTML = `<div class="p-4 text-center text-muted">No money mistake guides matching "<strong>${escapeHtml(query)}</strong>"</div>`;
    } else {
      renderMistakesList(matchedMistakes);
    }
  }

  if (resultAlert) {
    resultAlert.style.display = 'block';
    resultAlert.innerHTML = `<i class="fa-solid fa-magnifying-glass me-2"></i> Found <strong>${totalMatches}</strong> matching resources for "<strong>${escapeHtml(query)}</strong>" (Showing instant matches in the dropdown above).`;
  }
}

window.handleSearchResultClick = function(targetSelector, featureId) {
  const resultsDropdown = document.getElementById('globalSearchResultsDropdown');
  if (resultsDropdown) resultsDropdown.style.display = 'none';

  window.playUiSound?.('click');

  if (targetSelector === '#chatbotModal') {
    const chatbotFab = document.getElementById('chatbotFabBtn');
    const chatbotModal = document.getElementById('chatbotModal');
    if (chatbotModal && !chatbotModal.classList.contains('open')) {
      chatbotFab?.click();
    }
    return;
  }

  if (targetSelector === '#sitemapModal') {
    const sitemapModalEl = document.getElementById('sitemapModal');
    if (sitemapModalEl && typeof bootstrap !== 'undefined') {
      const modal = bootstrap.Modal.getOrCreateInstance(sitemapModalEl);
      modal.show();
    }
    return;
  }

  const targetEl = document.querySelector(targetSelector);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    targetEl.classList.remove('search-target-highlight');
    void targetEl.offsetWidth; // Trigger reflow for animation restart
    targetEl.classList.add('search-target-highlight');
    setTimeout(() => {
      targetEl.classList.remove('search-target-highlight');
    }, 2000);
  }
};

function renderInfographics(topic = 'all') {
  const container = document.getElementById('infographicsGridContainer');
  if (!container) return;

  const filtered = topic === 'all' ? infographicsData : infographicsData.filter(i => i.topic === topic);

  container.innerHTML = '';
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'infographic-card';
    const svgPreview = item.svgGraphic || `<i class="fa-solid ${item.icon} fa-3x text-warning mb-2"></i>`;

    card.innerHTML = `
      <div class="infographic-preview-box">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
          ${svgPreview}
        </div>
      </div>
      <div class="infographic-content">
        <div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-primary bg-opacity-75 text-white">${escapeHtml(item.categoryLabel)}</span>
            <small class="text-muted"><i class="fa-solid fa-layer-group me-1"></i> Visual Guide</small>
          </div>
          <h5 class="fw-bold mb-2">${escapeHtml(item.title)}</h5>
          <p class="text-secondary small mb-3">${escapeHtml(item.summary)}</p>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-primary w-100 rounded-pill" onclick="openInfographicModal('${item.id}')">
            <i class="fa-solid fa-expand me-1"></i> Explore Full Guide
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderMistakes() {
  const container = document.getElementById('moneyMistakesAccordion');
  if (!container) return;

  container.innerHTML = '';
  mistakesData.forEach((m, idx) => {
    const item = document.createElement('div');
    item.className = `accordion-item-custom ${idx === 0 ? 'open' : ''}`;
    item.id = `mistake_item_${m.id}`;

    item.innerHTML = `
      <div class="accordion-header-custom" onclick="toggleMistakeAccordion('mistake_item_${m.id}')">
        <div class="accordion-title-group">
          <div class="icon-box-danger p-2 rounded-3">
            <i class="fa-solid ${m.icon}"></i>
          </div>
          <div>
            <h6 class="fw-bold mb-0">${escapeHtml(m.title)}</h6>
            <small class="text-danger fw-semibold">${escapeHtml(m.severity)} • ${escapeHtml(m.category)}</small>
          </div>
        </div>
        <i class="fa-solid fa-chevron-down chevron-icon text-muted transition-all"></i>
      </div>
      <div class="accordion-body-custom">
        <div class="p-3 bg-light bg-opacity-50 rounded-3 mb-3 border">
          <strong><i class="fa-solid fa-user-graduate text-primary me-2"></i>Student Scenario:</strong>
          <p class="mb-0 text-secondary mt-1">${escapeHtml(m.scenario)}</p>
        </div>
        <div class="p-3 bg-danger bg-opacity-10 text-danger rounded-3 mb-3 border border-danger">
          <strong><i class="fa-solid fa-triangle-exclamation me-2"></i>Financial Consequence:</strong>
          <p class="mb-0 mt-1">${escapeHtml(m.consequence)}</p>
        </div>
        <div class="p-3 bg-success bg-opacity-10 text-success rounded-3 border border-success">
          <strong><i class="fa-solid fa-lightbulb me-2"></i>Corrective Action Plan:</strong>
          <p class="mb-0 mt-1">${escapeHtml(m.correctiveAction)}</p>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

window.toggleMistakeAccordion = function(id, forceOpen = false) {
  const el = document.getElementById(id);
  if (!el) return;
  if (forceOpen) {
    el.classList.add('open');
  } else {
    el.classList.toggle('open');
  }
};

function renderInfographicsList(list) {
  const container = document.getElementById('infographicsGridContainer');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'infographic-card';
    const svgPreview = item.svgGraphic || `<i class="fa-solid ${item.icon} fa-3x text-warning mb-2"></i>`;

    card.innerHTML = `
      <div class="infographic-preview-box">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
          ${svgPreview}
        </div>
      </div>
      <div class="infographic-content">
        <div>
          <span class="badge bg-primary bg-opacity-75 text-white mb-2">${escapeHtml(item.categoryLabel)}</span>
          <h5 class="fw-bold mb-2">${escapeHtml(item.title)}</h5>
          <p class="text-secondary small mb-3">${escapeHtml(item.summary)}</p>
        </div>
        <button class="btn btn-sm btn-outline-primary w-100 rounded-pill" onclick="openInfographicModal('${item.id}')">
          <i class="fa-solid fa-expand me-1"></i> Explore Full Guide
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderMistakesList(list) {
  const container = document.getElementById('moneyMistakesAccordion');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(m => {
    const item = document.createElement('div');
    item.className = 'accordion-item-custom open';
    item.id = `mistake_item_${m.id}`;
    item.innerHTML = `
      <div class="accordion-header-custom" onclick="toggleMistakeAccordion('mistake_item_${m.id}')">
        <div class="accordion-title-group">
          <div class="icon-box-danger p-2 rounded-3">
            <i class="fa-solid ${m.icon}"></i>
          </div>
          <div>
            <h6 class="fw-bold mb-0">${escapeHtml(m.title)}</h6>
            <small class="text-danger fw-semibold">${escapeHtml(m.severity)} • ${escapeHtml(m.category)}</small>
          </div>
        </div>
      </div>
      <div class="accordion-body-custom" style="display: block;">
        <div class="p-3 bg-light rounded-3 mb-2">
          <strong>Student Scenario:</strong> <p class="mb-0">${escapeHtml(m.scenario)}</p>
        </div>
        <div class="p-3 bg-success bg-opacity-10 text-success rounded-3">
          <strong>Action:</strong> <p class="mb-0">${escapeHtml(m.correctiveAction)}</p>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

window.openInfographicModal = function(id) {
  const item = infographicsData.find(i => i.id === id);
  if (!item) return;

  const modalTitle = document.getElementById('infographicModalTitle');
  const modalBody = document.getElementById('infographicModalBody');
  const modalElement = new bootstrap.Modal(document.getElementById('infographicDetailModal'));

  if (modalTitle) modalTitle.textContent = item.title;
  if (modalBody) {
    const svgDisplay = item.svgGraphic 
      ? `<div style="max-width: 320px; height: 180px; margin: 0 auto 1.5rem auto;">${item.svgGraphic}</div>`
      : `<i class="fa-solid ${item.icon} fa-4x text-warning mb-3 d-block"></i>`;

    modalBody.innerHTML = `
      <div class="p-4 bg-dark text-white rounded-4 text-center mb-4">
        ${svgDisplay}
        <h4 class="fw-bold">${escapeHtml(item.title)}</h4>
        <p class="text-light small mb-0">${escapeHtml(item.summary)}</p>
      </div>
      <h6 class="fw-bold mb-3">Key Framework Takeaways:</h6>
      <ul class="list-group mb-4">
        ${item.bulletPoints.map(bp => `<li class="list-group-item list-group-item-action d-flex align-items-center"><i class="fa-solid fa-circle-check text-success me-3"></i>${escapeHtml(bp)}</li>`).join('')}
      </ul>
      <div class="alert alert-info mb-0">
        <i class="fa-solid fa-circle-info me-2"></i><strong>Student Habit Tip:</strong> Review this framework before making non-essential purchases or when setting monthly limits.
      </div>
    `;
  }
  modalElement.show();
};

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

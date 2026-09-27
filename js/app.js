/**
 * BUDGETBASICS - CORE APPLICATION CONTROLLER (ENHANCED v2.0)
 * Features: Sound Engine, Theme Switcher, Health Check, Printable Certificate
 */

let soundEnabled = false;

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initClockAndCounter();
  initQuotesTicker();
  initMobileNav();
  initDesktopNavHover();
  initBackToTop();
  initSmoothScroll();
  initContactAndFeedbackForms();
  initBudgetHealthCheck();
  initCertificateGenerator();
  ensureFavicon();
});

function ensureFavicon() {
  const icon = document.querySelector("link[rel='icon']");
  if (icon) {
    icon.href = icon.href.split('?')[0] + '?v=' + Date.now();
  }
}

/* ================= Web Audio API UI Sound Engine (Disabled) ================= */
function playUiSound() {
  // UI Audio sounds completely disabled
  return;
}
window.playUiSound = playUiSound;

/* ================= Theme Engine (Light / Dark Mode Switcher) ================= */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  
  // Retrieve saved theme or default to light
  const savedTheme = localStorage.getItem('budgetbasics_theme') || 'light';
  applyTheme(savedTheme, false);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme, true);
  }

  function applyTheme(theme, showNotice = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('budgetbasics_theme', theme);
    updateThemeIcons(theme);

    // Refresh charts with updated theme colors
    if (typeof calculate503020 === 'function') calculate503020();
    if (typeof calculateSavingsGoal === 'function') calculateSavingsGoal();
    if (typeof updatePlannerSummary === 'function') updatePlannerSummary();

    if (showNotice) {
      if (typeof playUiSound === 'function') playUiSound('click');
      if (typeof showToast === 'function') {
        showToast(theme === 'dark' ? 'Dark Mode Activated 🌙' : 'Light Mode Activated ☀️', 'info');
      }
    }
  }

  function updateThemeIcons(theme) {
    const iconHtml = theme === 'dark' 
      ? '<i class="fa-solid fa-sun text-warning"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
    
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = iconHtml;
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.innerHTML = iconHtml;
      mobileThemeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      mobileThemeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);
}

/* ================= Live Clock & Visitor Counter ================= */
function initClockAndCounter() {
  const clockElement = document.getElementById('liveClockDisplay');
  const dateElement = document.getElementById('liveDateDisplay');
  const visitorElement = document.getElementById('visitorCounterDisplay');

  function updateClock() {
    const now = new Date();
    if (clockElement) {
      clockElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dateElement) {
      dateElement.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  if (visitorElement) {
    let count = parseInt(localStorage.getItem('budgetbasics_visitors') || '14820', 10);
    if (!sessionStorage.getItem('visited_this_tab')) {
      count += Math.floor(Math.random() * 3) + 1;
      localStorage.setItem('budgetbasics_visitors', count.toString());
      sessionStorage.setItem('visited_this_tab', 'true');
    }
    visitorElement.textContent = count.toLocaleString();
  }
}

/* ================= Quotes Ticker ================= */
async function initQuotesTicker() {
  const tickerContainer = document.getElementById('dynamicQuotesTicker');
  if (!tickerContainer) return;

  let quotes = [];
  try {
    const res = await fetch('data/quotes.json');
    if (!res.ok) throw new Error('Fetch failed');
    quotes = await res.json();
  } catch (err) {
    if (window.OFFLINE_DATA && window.OFFLINE_DATA.quotes) {
      quotes = window.OFFLINE_DATA.quotes;
    } else {
      quotes = [{ quote: "Beware of little expenses; a small leak will sink a great ship.", author: "Benjamin Franklin" }];
    }
  }

  const tickerHtml = quotes.map(q => `<span><strong class="text-warning">“${q.quote}”</strong> — <em>${q.author}</em></span>`).join(' &nbsp;&nbsp;✦&nbsp;&nbsp; ');
  tickerContainer.innerHTML = tickerHtml + ' &nbsp;&nbsp;✦&nbsp;&nbsp; ' + tickerHtml;
}

/* ================= Mobile Navigation Drawer ================= */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  function openDrawer() {
    navMenu.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('active');
    toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navMenu.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDrawer();
      });
    }

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeDrawer);
    }

    // Handle Mobile Dropdown Toggles (Accordion on mobile / touch)
    navMenu.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
          e.preventDefault();
          e.stopPropagation();
          const parentDropdown = toggle.closest('.dropdown');
          if (parentDropdown) {
            const isCurrentlyOpen = parentDropdown.classList.contains('open-mobile');
            // Close other mobile dropdowns in drawer
            navMenu.querySelectorAll('.dropdown.open-mobile').forEach(d => {
              if (d !== parentDropdown) d.classList.remove('open-mobile');
            });
            parentDropdown.classList.toggle('open-mobile', !isCurrentlyOpen);
            toggle.setAttribute('aria-expanded', !isCurrentlyOpen ? 'true' : 'false');
            playUiSound('click');
          }
        }
      });
    });

    // Close drawer and navigate smoothly when clicking actual target links
    navMenu.querySelectorAll('.dropdown-item, .nav-link-custom:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', (e) => {
        playUiSound('click');
        const href = link.getAttribute('href');
        closeDrawer();
        if (href && href.startsWith('#') && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            setTimeout(() => {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }, 120);
          }
        }
      });
    });
    // Special Nav Link Actions (AI Assistant and Search/Filter)
    document.querySelectorAll('#navLinkAiAssistant').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        playUiSound('click');
        closeDrawer();
        const chatbotFab = document.getElementById('chatbotFabBtn');
        const chatbotModal = document.getElementById('chatbotModal');
        const chatInput = document.getElementById('chatUserInput');
        if (chatbotModal && !chatbotModal.classList.contains('open')) {
          chatbotFab?.click();
        }
        setTimeout(() => chatInput?.focus(), 300);
      });
    });

    document.querySelectorAll('#navLinkSearchFilter').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        playUiSound('click');
        closeDrawer();
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) {
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            searchInput.focus();
            searchInput.classList.add('border-primary');
            setTimeout(() => searchInput.classList.remove('border-primary'), 1500);
          }, 350);
        }
      });
    });
  }

  // Synchronize desktop and mobile currency selectors
  const desktopCurrency = document.getElementById('currencySelector');
  const mobileCurrency = document.getElementById('mobileCurrencySelector');
  if (desktopCurrency && mobileCurrency) {
    mobileCurrency.addEventListener('change', () => {
      desktopCurrency.value = mobileCurrency.value;
      desktopCurrency.dispatchEvent(new Event('change'));
    });
    desktopCurrency.addEventListener('change', () => {
      mobileCurrency.value = desktopCurrency.value;
    });
  }
}

/* ================= Desktop Navigation Hover & Click Controller ================= */
function initDesktopNavHover() {
  const desktopDropdowns = document.querySelectorAll('.navbar-custom .nav-menu .dropdown');

  function closeAllDropdowns(except = null) {
    desktopDropdowns.forEach(dropdown => {
      if (dropdown !== except) {
        dropdown.classList.remove('is-active');
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (menu) menu.classList.remove('show');
        if (toggle) {
          toggle.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  desktopDropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    // When hovering a dropdown on desktop: close any other dropdown immediately
    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 992) {
        closeAllDropdowns(dropdown);
        dropdown.classList.add('is-active');
      }
    });

    // When mouse leaves this dropdown: clear active and open state immediately
    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 992) {
        dropdown.classList.remove('is-active');
        if (menu) menu.classList.remove('show');
        if (toggle) {
          toggle.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Clicking toggle on desktop switches state without leaving it stuck when hovering away
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth >= 992) {
          e.preventDefault();
          const willBeActive = !dropdown.classList.contains('is-active');
          closeAllDropdowns(dropdown);
          if (willBeActive) {
            dropdown.classList.add('is-active');
            if (menu) menu.classList.add('show');
            toggle.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
          } else {
            dropdown.classList.remove('is-active');
            if (menu) menu.classList.remove('show');
            toggle.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }
  });

  // When mouse leaves the entire navbar on desktop, clean up all open dropdowns
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    navbar.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 992) {
        closeAllDropdowns();
      }
    });
  }
}

/* ================= Back to Top ================= */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playUiSound('click');
  });
}

/* ================= Smooth Active Scroll ================= */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === `#${current}`) {
        link.classList.add('active');
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          const toggle = parentDropdown.querySelector('.dropdown-toggle');
          if (toggle) toggle.classList.add('active');
        }
      }
    });
  });
}

/* ================= Financial Health Scorecard ================= */
function initBudgetHealthCheck() {
  const form = document.getElementById('budgetHealthCheckForm');
  const resultCard = document.getElementById('healthCheckResultCard');
  if (!form || !resultCard) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q1 = parseInt(form.elements['hc_q1']?.value || '0', 10);
    const q2 = parseInt(form.elements['hc_q2']?.value || '0', 10);
    const q3 = parseInt(form.elements['hc_q3']?.value || '0', 10);
    const q4 = parseInt(form.elements['hc_q4']?.value || '0', 10);

    const score = q1 + q2 + q3 + q4;

    const scoreNum = document.getElementById('hcScoreNumber');
    const badgeEl = document.getElementById('hcScoreBadge');
    const descEl = document.getElementById('hcScoreDesc');

    if (scoreNum) scoreNum.textContent = `${score} / 40`;

    if (score >= 32) {
      badgeEl.className = 'badge bg-success fs-6 px-3 py-2 rounded-pill';
      badgeEl.innerHTML = '<i class="fa-solid fa-crown me-1"></i> NextGen Budget Master';
      descEl.textContent = 'Outstanding discipline! You consistently allocate funds to savings and track discretionary spending carefully.';
    } else if (score >= 22) {
      badgeEl.className = 'badge bg-primary fs-6 px-3 py-2 rounded-pill';
      badgeEl.innerHTML = '<i class="fa-solid fa-seedling me-1"></i> Growing Financial Planner';
      descEl.textContent = 'Solid baseline! By setting strict weekly dining limits and automating your 20% savings, you will achieve complete peace of mind.';
    } else {
      badgeEl.className = 'badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill';
      badgeEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-1"></i> Vulnerable to Impulse Spending';
      descEl.textContent = 'You frequently experience month-end cash shortages. Apply the 24-Hour Rule and start logging transactions in the Expense Tracker above!';
    }

    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    playUiSound('success');
    showToast('Financial Health Score calculated!', 'success');
  });
}

/* ================= Certificate Generator ================= */
function initCertificateGenerator() {
  const modalEl = document.getElementById('certificateModal');
  const btnCert = document.getElementById('btnOpenCertificateModal');
  const navCertBtn = document.getElementById('navEarnCertificateBtn');
  const nameInput = document.getElementById('certInputNameField');
  const updateNameBtn = document.getElementById('btnUpdateCertName');
  const certNameEl = document.getElementById('certStudentName');
  const certDateEl = document.getElementById('certIssueDate');

  function openCertificate() {
    if (certDateEl) {
      certDateEl.textContent = new Date().toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
    }
    if (nameInput && certNameEl) {
      if (nameInput.value.trim()) {
        certNameEl.textContent = nameInput.value.trim();
      }
    }

    // Close mobile drawer if open
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (modalEl && typeof bootstrap !== 'undefined') {
      const certModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      certModal.show();
      playUiSound('success');
    }
  }

  if (btnCert) {
    btnCert.addEventListener('click', (e) => {
      e.preventDefault();
      openCertificate();
    });
  }

  if (navCertBtn) {
    navCertBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCertificate();
    });
  }

  // Real-time Name updater
  if (nameInput && certNameEl) {
    nameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      certNameEl.textContent = val || 'Your Name';
    });
  }

  if (updateNameBtn && nameInput && certNameEl) {
    updateNameBtn.addEventListener('click', () => {
      const val = nameInput.value.trim();
      certNameEl.textContent = val || 'Your Name';
      showToast('Certificate name updated!', 'success');
      playUiSound('success');
    });
  }
}

/* ================= Print Certificate Handler ================= */
window.printCertificate = function() {
  const modalEl = document.getElementById('certificateModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const certModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    certModal.show();
  }
  
  // Trigger standard single-page landscape print
  window.print();
};

/* ================= Forms ================= */
function initContactAndFeedbackForms() {
  const stars = document.querySelectorAll('.star-rating-btn');
  let selectedRating = 5;

  stars.forEach(star => {
    star.addEventListener('click', (e) => {
      e.preventDefault();
      selectedRating = parseInt(star.dataset.rating, 10);
      stars.forEach((s, idx) => {
        if (idx < selectedRating) {
          s.classList.add('text-warning');
          s.classList.remove('text-muted');
        } else {
          s.classList.remove('text-warning');
          s.classList.add('text-muted');
        }
      });
      playUiSound('click');
    });
  });

  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fbName').value.trim();
      const email = document.getElementById('fbEmail').value.trim();
      const comments = document.getElementById('fbComments').value.trim();

      if (!name || !email || !comments) {
        showToast('Please fill out all feedback fields!', 'error');
        playUiSound('error');
        return;
      }

      if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        playUiSound('error');
        return;
      }

      showToast(`Thank you, ${name}! Your ${selectedRating}-star feedback was submitted successfully.`, 'success');
      playUiSound('success');
      feedbackForm.reset();
      stars.forEach((s, idx) => {
        if (idx < 5) s.classList.add('text-warning');
      });
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please complete all contact form fields.', 'error');
        playUiSound('error');
        return;
      }

      if (!validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        playUiSound('error');
        return;
      }

      showToast(`Thank you ${name}! Your message has been received. Our team will respond shortly.`, 'success');
      playUiSound('success');
      contactForm.reset();
    });
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container-custom');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-custom toast-${type}`;
  
  const icon = type === 'success' ? 'fa-circle-check text-success' : 
               type === 'error' ? 'fa-circle-exclamation text-danger' : 
               'fa-circle-info text-info';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

window.showToast = showToast;

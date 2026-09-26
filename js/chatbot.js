/**
 * BUDGETBASICS - AI CHATBOT & STRATEGY ENGINE (BEEBOT AI 2.0)
 * Dual-Channel NLP Matching, Voice Synthesis, Dynamic Prompting & AI Strategy Generator
 */

let chatbotKB = null;
let speechSynthEnabled = false;

document.addEventListener('DOMContentLoaded', () => {
  loadChatbotKB();
  initChatbotUI();
  initSectionChatUI();
  initAiStrategyGenerator();
});

async function loadChatbotKB() {
  try {
    const res = await fetch('data/chatbot_kb.json');
    if (!res.ok) throw new Error('Fetch failed');
    chatbotKB = await res.json();
  } catch (err) {
    if (window.OFFLINE_DATA && window.OFFLINE_DATA.chatbotKB) {
      chatbotKB = window.OFFLINE_DATA.chatbotKB;
    }
  }

  renderSuggestedPrompts('chatSuggestedPrompts', 'floating');
  renderSuggestedPrompts('sectionChatSuggestedPrompts', 'section');
}

/* ================= Floating Chatbot Widget UI ================= */
function initChatbotUI() {
  const fabBtn = document.getElementById('chatbotFabBtn');
  const closeBtn = document.getElementById('closeChatbotBtn');
  const modal = document.getElementById('chatbotModal');
  const form = document.getElementById('chatInputForm');
  const input = document.getElementById('chatUserInput');
  const ttsBtn = document.getElementById('chatTtsToggleBtn');

  if (fabBtn && modal) {
    fabBtn.addEventListener('click', () => {
      modal.classList.toggle('open');
      if (modal.classList.contains('open')) {
        input?.focus();
        window.playUiSound?.('click');
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      window.playUiSound?.('click');
    });
  }

  if (ttsBtn) {
    ttsBtn.addEventListener('click', () => {
      toggleSpeechSynthesis(ttsBtn);
    });
  }

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;

      appendChatMessage('chatMessagesBody', query, 'user');
      input.value = '';
      window.playUiSound?.('click');
      processBotResponse('chatMessagesBody', query);
    });
  }
}

/* ================= In-Page Section AI Chat Console UI ================= */
function initSectionChatUI() {
  const form = document.getElementById('sectionChatInputForm');
  const input = document.getElementById('sectionChatUserInput');
  const ttsBtn = document.getElementById('sectionChatTtsToggleBtn');
  const clearBtn = document.getElementById('clearSectionChatBtn');
  const messagesBody = document.getElementById('sectionChatMessagesBody');

  if (ttsBtn) {
    ttsBtn.addEventListener('click', () => {
      toggleSpeechSynthesis(ttsBtn);
    });
  }

  if (clearBtn && messagesBody) {
    clearBtn.addEventListener('click', () => {
      messagesBody.innerHTML = `
        <div class="chat-msg chat-msg-bot">
          Conversation cleared! 👋 Ask <strong>BeeBot AI</strong> another question or click any suggested prompt below.
        </div>
      `;
      window.playUiSound?.('click');
    });
  }

  if (form && input && messagesBody) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;

      appendChatMessage('sectionChatMessagesBody', query, 'user');
      input.value = '';
      window.playUiSound?.('click');
      processBotResponse('sectionChatMessagesBody', query);
    });
  }
}

function toggleSpeechSynthesis(btnElement) {
  speechSynthEnabled = !speechSynthEnabled;
  const iconHtml = speechSynthEnabled 
    ? '<i class="fa-solid fa-volume-high text-warning"></i>' 
    : '<i class="fa-solid fa-volume-xmark"></i>';

  // Update all TTS buttons
  const floatingTts = document.getElementById('chatTtsToggleBtn');
  const sectionTts = document.getElementById('sectionChatTtsToggleBtn');
  if (floatingTts) floatingTts.innerHTML = iconHtml;
  if (sectionTts) sectionTts.innerHTML = `${iconHtml} <span class="d-none d-sm-inline ms-1 small">${speechSynthEnabled ? 'Voice ON' : 'Voice'}</span>`;

  window.showToast?.(speechSynthEnabled ? 'BeeBot Voice Synthesis ON' : 'BeeBot Voice Synthesis OFF', 'info');
  window.playUiSound?.('click');
}

function renderSuggestedPrompts(containerId, channel = 'floating') {
  const container = document.getElementById(containerId);
  if (!container || !chatbotKB || !chatbotKB.suggestedPrompts) return;

  container.innerHTML = '';
  chatbotKB.suggestedPrompts.forEach(prompt => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'prompt-pill';
    pill.textContent = prompt;
    pill.addEventListener('click', () => {
      const targetBodyId = channel === 'section' ? 'sectionChatMessagesBody' : 'chatMessagesBody';
      appendChatMessage(targetBodyId, prompt, 'user');
      window.playUiSound?.('click');
      processBotResponse(targetBodyId, prompt);
    });
    container.appendChild(pill);
  });
}

function appendChatMessage(containerId, text, sender) {
  const body = document.getElementById(containerId);
  if (!body) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg chat-msg-${sender}`;

  if (sender === 'bot') {
    msgDiv.innerHTML = formatBotText(text);

    // Speak aloud if TTS enabled
    if (speechSynthEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanSpeakText = text.replace(/[\*\#\•\💡\🎯\👋]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanSpeakText);
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  } else {
    msgDiv.textContent = text;
  }

  body.appendChild(msgDiv);
  body.scrollTop = body.scrollHeight;
}

function processBotResponse(containerId, userQuery) {
  const body = document.getElementById(containerId);
  if (!body) return;

  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg chat-msg-bot';
  typingDiv.innerHTML = '<i class="fa-solid fa-ellipsis fa-fade"></i> BeeBot is analyzing...';
  body.appendChild(typingDiv);
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    typingDiv.remove();
    const botReply = matchQueryToIntent(userQuery);
    appendChatMessage(containerId, botReply, 'bot');
    window.playUiSound?.('success');
  }, 400);
}

function matchQueryToIntent(query) {
  if (!chatbotKB || !chatbotKB.intents) {
    return "BeeBot is loading its offline knowledge database.";
  }

  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const tokens = cleanQuery.split(/\s+/).filter(Boolean);

  let bestMatch = null;
  let highestScore = 0;

  chatbotKB.intents.forEach(intentObj => {
    let score = 0;
    intentObj.keywords.forEach(keyword => {
      const cleanKey = keyword.toLowerCase();
      if (cleanQuery.includes(cleanKey)) {
        score += 4;
      }
      tokens.forEach(tok => {
        if (tok === cleanKey) score += 2;
      });
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = intentObj;
    }
  });

  if (bestMatch && highestScore >= 2) {
    return bestMatch.response;
  }

  return chatbotKB.fallbackMessage || "I don't have enough specific educational information on that topic yet. Try asking me about 'Needs vs Wants', '50-30-20 Rule', 'Emergency Fund', or 'How to avoid overspending'!";
}

function formatBotText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

/* ================= AI Student Financial Strategy Generator ================= */
function initAiStrategyGenerator() {
  const form = document.getElementById('aiStrategyForm');
  const resultBox = document.getElementById('aiStrategyResultBox');
  if (!form || !resultBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const income = parseFloat(document.getElementById('aiIncomeInput')?.value) || 15000;
    const profile = document.getElementById('aiStudentProfileSelect')?.value || 'dayscholar';
    const weakness = document.getElementById('aiSpendingWeaknessSelect')?.value || 'food';

    const curr = window.currentCurrency || 'PKR';
    const symbol = window.currencySymbols?.[curr] || 'Rs';
    const rate = window.currencyRates?.[curr] || 1;

    let needsPct = 50, wantsPct = 30, savePct = 20;
    let profileTitle = 'Day Scholar Balanced Strategy';
    let profileTip = 'Focus on optimizing daily transit fares and carrying home meals.';

    if (profile === 'hostel') {
      needsPct = 60; wantsPct = 20; savePct = 20;
      profileTitle = 'Hostel / Dorm Survival Strategy (60/20/20)';
      profileTip = 'Bulk-buy room supplies with flatmates and set a hard ceiling on mess takeaways.';
    } else if (profile === 'working') {
      needsPct = 45; wantsPct = 25; savePct = 30;
      profileTitle = 'Working Student Wealth Builder (45/25/30)';
      profileTip = 'Automate 30% savings on the day your paycheck arrives to lock in gains.';
    } else if (profile === 'saver') {
      needsPct = 40; wantsPct = 20; savePct = 40;
      profileTitle = 'Aggressive Milestone Saver (40/20/40)';
      profileTip = 'Strip non-essentials temporarily until your laptop/exam fund is 100% funded.';
    }

    const needsAmount = Math.round(income * (needsPct / 100));
    const wantsAmount = Math.round(income * (wantsPct / 100));
    const saveAmount = Math.round(income * (savePct / 100));

    let weaknessAction = '';
    if (weakness === 'food') {
      weaknessAction = '<strong>Combat Food Drain:</strong> Limit restaurant deliveries to once a week. Prep high-protein snacks to avoid costly canteen runs.';
    } else if (weakness === 'online_shopping') {
      weaknessAction = '<strong>Block Shopping Triggers:</strong> Unsubscribe from sale flash emails and enforce the mandatory 24-Hour Cooling Rule.';
    } else if (weakness === 'gaming_subs') {
      weaknessAction = '<strong>Audit Subscriptions:</strong> Share family/student streaming plans and cancel unused recurring entertainment passes.';
    } else {
      weaknessAction = '<strong>Plug Micro-Leaks:</strong> Log every PKR/USD purchase immediately in the Expense Tracker table below.';
    }

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h6 class="fw-bold mb-0 text-primary"><i class="fa-solid fa-sparkles text-warning me-1"></i> ${profileTitle}</h6>
        <span class="badge bg-primary">${savePct}% Savings Target</span>
      </div>
      
      <div class="row g-2 text-center my-2">
        <div class="col-4">
          <div class="p-2 rounded bg-primary bg-opacity-10 border border-primary border-opacity-25">
            <small class="d-block text-muted" style="font-size: 0.72rem;">Needs (${needsPct}%)</small>
            <strong class="text-primary">${symbol} ${needsAmount.toLocaleString()}</strong>
          </div>
        </div>
        <div class="col-4">
          <div class="p-2 rounded bg-warning bg-opacity-10 border border-warning border-opacity-25">
            <small class="d-block text-muted" style="font-size: 0.72rem;">Wants (${wantsPct}%)</small>
            <strong class="text-warning">${symbol} ${wantsAmount.toLocaleString()}</strong>
          </div>
        </div>
        <div class="col-4">
          <div class="p-2 rounded bg-success bg-opacity-10 border border-success border-opacity-25">
            <small class="d-block text-muted" style="font-size: 0.72rem;">Savings (${savePct}%)</small>
            <strong class="text-success">${symbol} ${saveAmount.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      <div class="small text-secondary mt-2">
        <p class="mb-1"><i class="fa-solid fa-lightbulb text-warning me-1"></i> ${profileTip}</p>
        <p class="mb-2"><i class="fa-solid fa-shield-virus text-danger me-1"></i> ${weaknessAction}</p>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
        <span class="badge bg-dark text-light"><i class="fa-solid fa-calendar-check me-1"></i> Save ${symbol} ${(saveAmount * 6).toLocaleString()} in 6 Mo</span>
        <button type="button" class="btn btn-sm btn-outline-primary" onclick="window.print()"><i class="fa-solid fa-print me-1"></i> Save Plan</button>
      </div>
    `;

    window.playUiSound?.('success');
  });
}

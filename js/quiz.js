/**
 * BUDGETBASICS - QUIZ & INTERACTIVE CLASSIFIER MODULE
 */

let quizData = null;
let currentItemIndex = 0;
let gameScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadQuizData();
  initQuizListeners();
});

async function loadQuizData() {
  try {
    const res = await fetch('data/quiz_data.json');
    if (!res.ok) throw new Error('Fetch failed');
    quizData = await res.json();
  } catch (err) {
    console.warn('Using offline dataset fallback for quiz:', err);
    if (window.OFFLINE_DATA) {
      quizData = window.OFFLINE_DATA.quiz;
    }
  }

  renderGameCard();
  renderKnowledgeCheck();
}

function initQuizListeners() {
  const btnNeed = document.getElementById('btnClassifyNeed');
  const btnWant = document.getElementById('btnClassifyWant');
  const btnNext = document.getElementById('btnNextGameItem');
  const btnRestart = document.getElementById('btnRestartGame');

  if (btnNeed) btnNeed.addEventListener('click', () => handleGameChoice('need'));
  if (btnWant) btnWant.addEventListener('click', () => handleGameChoice('want'));
  if (btnNext) btnNext.addEventListener('click', advanceGameItem);
  if (btnRestart) btnRestart.addEventListener('click', restartGame);
}

function renderGameCard() {
  if (!quizData || !quizData.needsVsWantsQuiz) return;
  const items = quizData.needsVsWantsQuiz;

  const titleEl = document.getElementById('gameItemTitle');
  const descEl = document.getElementById('gameItemDesc');
  const priceEl = document.getElementById('gameItemPrice');
  const counterEl = document.getElementById('gameItemCounter');
  const feedbackBox = document.getElementById('gameFeedbackBox');
  const nextBtn = document.getElementById('btnNextGameItem');
  const actionBtns = document.getElementById('gameActionBtns');

  if (currentItemIndex >= items.length) {
    const gameArea = document.getElementById('gameActiveContainer');
    const resultArea = document.getElementById('gameResultsContainer');
    const finalScoreEl = document.getElementById('gameFinalScoreText');

    if (gameArea) gameArea.style.display = 'none';
    if (resultArea) resultArea.style.display = 'block';
    if (finalScoreEl) {
      finalScoreEl.innerHTML = `You scored <strong>${gameScore} / ${items.length}</strong>! ${gameScore >= 5 ? '🌟 Outstanding financial literacy!' : '👍 Great effort! Keep practicing to master your money habits.'}`;
    }
    return;
  }

  const currentItem = items[currentItemIndex];
  if (titleEl) titleEl.textContent = currentItem.title;
  if (descEl) descEl.textContent = currentItem.description;
  if (priceEl) priceEl.textContent = `${window.currentCurrency || 'PKR'} ${currentItem.cost.toLocaleString()}`;
  if (counterEl) counterEl.textContent = `Item ${currentItemIndex + 1} of ${items.length}`;

  if (feedbackBox) feedbackBox.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';
  if (actionBtns) actionBtns.style.display = 'flex';
}

function handleGameChoice(choice) {
  if (!quizData) return;
  const item = quizData.needsVsWantsQuiz[currentItemIndex];
  const isCorrect = choice === item.correct;

  if (isCorrect) gameScore++;

  const feedbackBox = document.getElementById('gameFeedbackBox');
  const nextBtn = document.getElementById('btnNextGameItem');
  const actionBtns = document.getElementById('gameActionBtns');

  if (actionBtns) actionBtns.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'inline-flex';

  if (feedbackBox) {
    feedbackBox.style.display = 'block';
    if (isCorrect) {
      feedbackBox.className = 'feedback-box feedback-correct';
      feedbackBox.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i><strong>Correct!</strong> ${item.explanation}`;
    } else {
      feedbackBox.className = 'feedback-box feedback-incorrect';
      feedbackBox.innerHTML = `<i class="fa-solid fa-circle-xmark me-2"></i><strong>Actually, it's a ${item.correct.toUpperCase()}.</strong> ${item.explanation}`;
    }
  }
}

function advanceGameItem() {
  currentItemIndex++;
  renderGameCard();
}

function restartGame() {
  currentItemIndex = 0;
  gameScore = 0;
  const gameArea = document.getElementById('gameActiveContainer');
  const resultArea = document.getElementById('gameResultsContainer');

  if (gameArea) gameArea.style.display = 'block';
  if (resultArea) resultArea.style.display = 'none';
  renderGameCard();
}

function renderKnowledgeCheck() {
  const container = document.getElementById('knowledgeCheckContainer');
  if (!container || !quizData || !quizData.knowledgeCheck) return;

  container.innerHTML = '';
  quizData.knowledgeCheck.forEach((q, idx) => {
    const qCard = document.createElement('div');
    qCard.className = 'custom-card mb-4';
    qCard.innerHTML = `
      <h5 class="fw-bold mb-3"><span class="badge bg-primary me-2">Q${idx + 1}</span> ${q.question}</h5>
      <div class="d-flex flex-column gap-2 mb-3">
        ${q.options.map((opt, optIdx) => `
          <button class="btn btn-outline-secondary text-start p-3 rounded-3 kc-option-btn" data-qid="${idx}" data-opt="${optIdx}">
            <strong class="me-2">${String.fromCharCode(65 + optIdx)}.</strong> ${opt}
          </button>
        `).join('')}
      </div>
      <div id="kcFeedback_${idx}" class="p-3 rounded-3" style="display: none; font-size: 0.95rem;"></div>
    `;
    container.appendChild(qCard);
  });

  document.querySelectorAll('.kc-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = parseInt(btn.dataset.qid, 10);
      const chosenOpt = parseInt(btn.dataset.opt, 10);
      const question = quizData.knowledgeCheck[qid];
      const feedback = document.getElementById(`kcFeedback_${qid}`);
      const parent = btn.parentElement;

      parent.querySelectorAll('button').forEach(b => b.disabled = true);

      if (chosenOpt === question.correctIndex) {
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-success');
        feedback.className = 'p-3 rounded-3 bg-success bg-opacity-10 text-success border border-success';
        feedback.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i><strong>Correct!</strong> ${question.rationale}`;
      } else {
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-danger');
        feedback.className = 'p-3 rounded-3 bg-danger bg-opacity-10 text-danger border border-danger';
        feedback.innerHTML = `<i class="fa-solid fa-circle-xmark me-2"></i><strong>Incorrect.</strong> ${question.rationale}`;
      }
      feedback.style.display = 'block';
    });
  });
}

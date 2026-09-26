import React, { useState } from 'react';
import { soundEngine } from '../utils/sound';

export default function KnowledgeQuiz({ onOpenCertificate }) {
  const questions = [
    {
      id: 1,
      question: 'Which of the following is considered a FIXED expense?',
      options: [
        'Weekend movies and dining',
        'Monthly apartment rent / hostel fee',
        'Online clothing shopping',
        'Coffee and bubble tea runs'
      ],
      correct: 1,
      explanation: 'Rent is a predictable, recurring contract commitment that remains constant each month.'
    },
    {
      id: 2,
      question: 'Under the 50/30/20 rule, what does the 20% allocation represent?',
      options: [
        'Luxury gadgets and gaming',
        'Dining and entertainment',
        'Savings, emergency cushion, and debt reduction',
        'Grocery and food deliveries'
      ],
      correct: 2,
      explanation: 'The 20% bracket is strictly reserved for paying your future self through savings and emergency reserves.'
    },
    {
      id: 3,
      question: 'How many months of basic living expenses should an ideal student emergency fund cover?',
      options: [
        '1 week',
        '3 to 6 months',
        '5 years',
        'Zero, borrow whenever needed'
      ],
      correct: 1,
      explanation: 'A 3 to 6 month liquid buffer protects you against sudden device breakdowns or stipend delays.'
    },
    {
      id: 4,
      question: 'What is the "48-Hour Rule" used for?',
      options: [
        'Paying rent before due date',
        'Waiting 48 hours before discretionary impulse purchases',
        'Studying for exams only 2 days before',
        'Exercising 48 hours continuously'
      ],
      correct: 1,
      explanation: 'The 48-hour delay cools down emotional dopamine impulses, preventing buyer remorse.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    soundEngine.playClick();
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score += 25;
    });
    return score;
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      alert('Please answer all 4 questions before checking your score!');
      return;
    }
    soundEngine.playSuccess();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();

  return (
    <section id="quiz" style={{ padding: '4rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="fintech-container">
        
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '0.75rem' }}>Mastery Check</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            Financial Literacy Knowledge Check
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            Test your understanding of core budgeting logic before generating your verified certificate.
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="fintech-card" style={{ padding: '2.25rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {questions.map((q, qIdx) => (
                <div key={q.id} style={{ borderBottom: qIdx < questions.length - 1 ? '1px solid #F1F5F9' : 'none', paddingBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800' }}>
                      {qIdx + 1}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', color: '#0F172A' }}>{q.question}</h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      let btnBg = '#F8FAFC';
                      let btnBorder = '#E2E8F0';
                      let btnColor = '#334155';

                      if (submitted) {
                        if (optIdx === q.correct) {
                          btnBg = '#D1FAE5';
                          btnBorder = '#10B981';
                          btnColor = '#065F46';
                        } else if (isSelected && optIdx !== q.correct) {
                          btnBg = '#FEE2E2';
                          btnBorder = '#EF4444';
                          btnColor = '#991B1B';
                        }
                      } else if (isSelected) {
                        btnBg = '#EFF6FF';
                        btnBorder = '#3B82F6';
                        btnColor = '#1E40AF';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(qIdx, optIdx)}
                          style={{
                            textAlign: 'left',
                            padding: '0.8rem 1rem',
                            borderRadius: '8px',
                            backgroundColor: btnBg,
                            border: `1.5px solid ${btnBorder}`,
                            color: btnColor,
                            fontSize: '0.88rem',
                            fontWeight: isSelected ? '700' : '500',
                            cursor: submitted ? 'default' : 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{ marginRight: '0.5rem', fontWeight: '800' }}>
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.85rem', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem', color: '#475569' }}>
                      <strong>Rationale:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Submit & Results Footer */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              {!submitted ? (
                <button onClick={handleSubmit} className="btn-emerald" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                  Submit Answers & Calculate Score &rarr;
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: score >= 75 ? '#059669' : '#D97706' }}>
                      Your Score: {score} / 100
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                      {score >= 75 ? '🎉 Congratulations! You have unlocked your Aptech certificate.' : 'Keep revising the 101 guide to improve your financial score!'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={handleReset} className="btn-secondary">
                      Retry Quiz 🔄
                    </button>
                    {score >= 75 && (
                      <button onClick={onOpenCertificate} className="btn-emerald">
                        Claim Certificate 🎓
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';

export default function NeedsWantsGame() {
  const allItems = [
    { name: 'Semester Tuition Fee', type: 'Needs', icon: '🎓', reason: 'Direct academic requirement for your career.' },
    { name: 'Weekly Starbucks Latte', type: 'Wants', icon: '☕', reason: 'High margin discretionary beverage.' },
    { name: 'Hostel Electricity & Water', type: 'Needs', icon: '⚡', reason: 'Essential biological and residential necessity.' },
    { name: 'Premium PS5 Video Game', type: 'Wants', icon: '🎮', reason: 'Entertainment and leisure expenditure.' },
    { name: 'Basic Prescription Medication', type: 'Needs', icon: '💊', reason: 'Critical health and physiological safety.' },
    { name: 'Designer Sneaker Collection', type: 'Wants', icon: '👟', reason: 'Fashion status purchase over utility footwear.' },
    { name: 'Study Wi-Fi High-Speed Internet', type: 'Needs', icon: '📡', reason: 'Core requirement for assignments & research.' },
    { name: 'Fine Dining Weekend Buffet', type: 'Wants', icon: '🍕', reason: 'Social luxury over nutritious meal prep.' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  const currentItem = allItems[currentIndex];

  const handleChoice = (choice) => {
    if (feedback) return;
    const isCorrect = choice === currentItem.type;
    if (isCorrect) {
      setScore(s => s + 10);
      setFeedback({ correct: true, text: `Correct! ${currentItem.reason}` });
    } else {
      setFeedback({ correct: false, text: `Incorrect! It is a ${currentItem.type}. ${currentItem.reason}` });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < allItems.length) {
        setCurrentIndex(i => i + 1);
      } else {
        setGameFinished(true);
      }
    }, 1800);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setGameFinished(false);
  };

  return (
    <section id="game" style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="fintech-container">
        
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
          <div className="badge-pill badge-navy" style={{ marginBottom: '0.75rem' }}>Gamified Knowledge Check</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            Needs vs. Wants Decision Sprint
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            Can you distinguish non-negotiable living survival needs from discretionary lifestyle wants under pressure?
          </p>
        </div>

        <div className="fintech-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem', textAlign: 'center' }}>
          
          {!gameFinished ? (
            <div>
              {/* Progress & Score Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748B' }}>
                  Question {currentIndex + 1} of {allItems.length}
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#10B981', backgroundColor: '#ECFDF5', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  Score: {score} pts
                </span>
              </div>

              {/* Item Card */}
              <div style={{ padding: '2.5rem 1.5rem', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1.5px dashed #CBD5E1', marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>{currentItem.icon}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A' }}>{currentItem.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.35rem' }}>Classify this expense:</div>
              </div>

              {/* Feedback Notice */}
              {feedback && (
                <div style={{ 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  marginBottom: '1.5rem', 
                  fontSize: '0.9rem', 
                  fontWeight: '600',
                  backgroundColor: feedback.correct ? '#D1FAE5' : '#FEE2E2',
                  color: feedback.correct ? '#065F46' : '#991B1B',
                  border: feedback.correct ? '1px solid #A7F3D0' : '1px solid #FECACA',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {feedback.text}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button 
                  onClick={() => handleChoice('Needs')}
                  disabled={feedback !== null}
                  style={{
                    backgroundColor: '#EFF6FF',
                    color: '#1E40AF',
                    border: '2px solid #BFDBFE',
                    borderRadius: '10px',
                    padding: '1rem',
                    fontWeight: '800',
                    fontSize: '1rem',
                    cursor: feedback ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => !feedback && (e.currentTarget.style.backgroundColor = '#DBEAFE')}
                  onMouseOut={e => !feedback && (e.currentTarget.style.backgroundColor = '#EFF6FF')}
                >
                  🏠 ESSENTIAL NEED (50%)
                </button>

                <button 
                  onClick={() => handleChoice('Wants')}
                  disabled={feedback !== null}
                  style={{
                    backgroundColor: '#F5F3FF',
                    color: '#6D28D9',
                    border: '2px solid #DDD6FE',
                    borderRadius: '10px',
                    padding: '1rem',
                    fontWeight: '800',
                    fontSize: '1rem',
                    cursor: feedback ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => !feedback && (e.currentTarget.style.backgroundColor = '#EDE9FE')}
                  onMouseOut={e => !feedback && (e.currentTarget.style.backgroundColor = '#F5F3FF')}
                >
                  ☕ DISCRETIONARY WANT (30%)
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🏆</div>
              <h3 style={{ fontSize: '1.6rem', color: '#0F172A', marginBottom: '0.5rem' }}>Quiz Completed!</h3>
              <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>
                You scored <strong>{score}</strong> out of {allItems.length * 10} points.
              </p>
              <div style={{ padding: '1rem', backgroundColor: '#ECFDF5', borderRadius: '8px', border: '1px solid #A7F3D0', color: '#065F46', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {score >= 70 ? '🌟 Outstanding financial acumen! You are ready to manage a complex personal budget.' : '👍 Good effort! Review the Budgeting 101 guide to sharpen your discipline.'}
              </div>
              <button onClick={handleRestart} className="btn-emerald" style={{ padding: '0.75rem 2rem' }}>
                Play Again 🔄
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

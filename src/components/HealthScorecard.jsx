import React, { useState } from 'react';
import { soundEngine } from '../utils/sound';

export default function HealthScorecard() {
  const auditQuestions = [
    { id: 1, text: 'I track and categorize all my monthly expenses regularly.', weight: 20 },
    { id: 2, text: 'I save at least 15% to 20% of my income/stipend every month.', weight: 20 },
    { id: 3, text: 'I have an emergency fund covering at least 1 to 3 months of basic living needs.', weight: 20 },
    { id: 4, text: 'I enforce a 48-hour delay before buying non-essential discretionary items.', weight: 20 },
    { id: 5, text: 'I avoid borrowing money or using Buy-Now-Pay-Later for lifestyle wants.', weight: 20 }
  ];

  const [answers, setAnswers] = useState({ 1: true, 2: false, 3: false, 4: true, 5: true });

  const toggleAnswer = (id) => {
    soundEngine.playClick();
    setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalScore = auditQuestions.reduce((acc, q) => acc + (answers[q.id] ? q.weight : 0), 0);

  const getStatus = () => {
    if (totalScore >= 80) return { label: 'Elite Wealth Master', color: '#10B981', bg: '#ECFDF5', badge: 'Tier A' };
    if (totalScore >= 60) return { label: 'Disciplined Saver', color: '#3B82F6', bg: '#EFF6FF', badge: 'Tier B' };
    if (totalScore >= 40) return { label: 'Building Foundations', color: '#D97706', bg: '#FFFBEB', badge: 'Tier C' };
    return { label: 'Financially Vulnerable', color: '#DC2626', bg: '#FEF2F2', badge: 'Needs Attention' };
  };

  const status = getStatus();

  return (
    <section id="health-check" style={{ padding: '4.5rem 0', backgroundColor: '#F8FAFC' }}>
      <div className="fintech-container">
        
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '0.75rem' }}>Automated Audit</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            Real-Time Financial Health Scorecard
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            Evaluate your personal financial discipline in 30 seconds. Check each habit you currently practice.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          
          {/* Left: Checklist */}
          <div className="fintech-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '1.25rem' }}>
              Your Financial Habits Checklist
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {auditQuestions.map((q) => {
                const isChecked = !!answers[q.id];
                return (
                  <div
                    key={q.id}
                    onClick={() => toggleAnswer(q.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: isChecked ? '#F0FDF4' : '#FFFFFF',
                      border: `1.5px solid ${isChecked ? '#86EFAC' : '#E2E8F0'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      backgroundColor: isChecked ? '#10B981' : '#F1F5F9',
                      border: `1.5px solid ${isChecked ? '#10B981' : '#CBD5E1'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: '800'
                    }}>
                      {isChecked ? '✓' : ''}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: isChecked ? '#065F46' : '#475569', fontWeight: isChecked ? '600' : '400' }}>
                      {q.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Results Meter */}
          <div className="fintech-card" style={{ padding: '2.5rem', textAlign: 'center', border: '2px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '800', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: status.bg, color: status.color, textTransform: 'uppercase' }}>
              {status.badge}
            </span>

            {/* Score Circle Display */}
            <div style={{ margin: '1.5rem 0' }}>
              <div style={{ fontSize: '4rem', fontWeight: '800', color: status.color, lineHeight: '1' }}>
                {totalScore}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.35rem' }}>Out of 100 Financial Health Index</div>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '0.75rem' }}>
              {status.label}
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {totalScore >= 80 
                ? 'Your budget discipline and impulse control are extraordinary. Maintain consistency to build substantial wealth.' 
                : totalScore >= 60 
                ? 'Great progress! Focus on boosting your emergency cushion and reviewing monthly recurring subscriptions.'
                : 'Consider adopting the 50/30/20 rule strictly to regain control of variable impulse spending.'}
            </p>

            <a href="#planner" className="btn-emerald" style={{ width: '100%' }}>
              Optimize My Budget in Planner &rarr;
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

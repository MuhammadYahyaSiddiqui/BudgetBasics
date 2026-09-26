import React, { useState } from 'react';
import { soundEngine } from '../utils/sound';

export default function MoneyMistakes() {
  const mistakes = [
    {
      id: 1,
      icon: '☕',
      severity: 'High Impact',
      title: 'The Daily Micro-Leaking Trap (Lifestyle Creep)',
      description: 'Buying Rs. 450 takeaway coffees, daily food deliveries, and ride-hails without tracking. It drains Rs. 15,000+ every single month silently.',
      symptom: 'Wondering why 80% of your allowance evaporates in the first 10 days.',
      remedy: 'Carry a refillable water flask, batch brew tea/coffee at home, and use public transit passes.'
    },
    {
      id: 2,
      icon: '💳',
      severity: 'Critical Hazard',
      title: 'Carrying Revolving Credit / BNPL Debt',
      description: 'Using "Buy Now Pay Later" or borrowing cards to fund dining and gaming. High compounding late fees trap students into cycles.',
      symptom: 'Paying minimum balances and accumulating penalty surcharges.',
      remedy: 'Follow the Golden Rule: If you cannot afford to pay cash twice for a discretionary want today, you cannot afford it.'
    },
    {
      id: 3,
      icon: '🛡️',
      severity: 'High Impact',
      title: 'Zero Emergency Cushion Buffer',
      description: 'Saving zero cash for unforeseen laptop repairs, medical emergencies, or sudden travel. Forces emergency panic loans from peers.',
      symptom: 'One minor hardware failure destroys an entire semester budget.',
      remedy: 'Maintain a liquid emergency reserve of at least PKR 20,000 in a separate bank account.'
    },
    {
      id: 4,
      icon: '📱',
      severity: 'Medium Impact',
      title: 'The Zombie Subscription Avalanche',
      description: 'Signing up for free trial streaming, cloud storage, and apps and forgetting to cancel auto-renewal subscriptions.',
      symptom: 'Hidden credit/debit card deductions occurring automatically.',
      remedy: 'Audit active app store subscriptions monthly and utilize student family plans.'
    },
    {
      id: 5,
      icon: '🏷️',
      severity: 'Medium Impact',
      title: 'Sale & Flash Discount Illusion',
      description: 'Buying clothes or gadgets purely because they are "40% OFF" during flash sales, spending money on items you never planned to acquire.',
      symptom: 'Closets full of impulse items and empty bank balance.',
      remedy: 'Enforce the 48-Hour Wishlist Rule before checking out non-essential sales.'
    },
    {
      id: 6,
      icon: '⏳',
      severity: 'Long-Term Cost',
      title: 'Delaying Compounding & Savings Habits',
      description: 'Believing that saving only matters after you earn a 6-figure corporate salary. Small consistent savings build monumental discipline.',
      symptom: 'Waiting for future perfection instead of building today habits.',
      remedy: 'Start saving even PKR 1,000/month today to build the financial muscle memory.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    soundEngine.playClick();
    setActiveIndex((prev) => (prev + 1) % mistakes.length);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setActiveIndex((prev) => (prev - 1 + mistakes.length) % mistakes.length);
  };

  const current = mistakes[activeIndex];

  return (
    <section id="mistakes" style={{ padding: '4.5rem 0', backgroundColor: '#F8FAFC' }}>
      <div className="fintech-container">
        
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill badge-navy" style={{ marginBottom: '0.75rem' }}>Pitfall Prevention Guide</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            Top Costly Student Money Mistakes
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            Avoid these common psychological traps and money leaks that secretly derail young student finances.
          </p>
        </div>

        {/* Carousel Presentation Card */}
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="fintech-card" style={{ padding: '2.5rem', position: 'relative' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{current.icon}</span>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#DC2626', backgroundColor: '#FEE2E2', padding: '0.15rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {current.severity}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>Mistake #{current.id} of {mistakes.length}</div>
                </div>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {mistakes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { soundEngine.playClick(); setActiveIndex(idx); }}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: idx === activeIndex ? '#10B981' : '#CBD5E1',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <h3 style={{ fontSize: '1.35rem', color: '#0F172A', marginBottom: '1rem' }}>
              {current.title}
            </h3>

            <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              {current.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#991B1B', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  ⚠️ The Warning Symptom:
                </div>
                <div style={{ fontSize: '0.88rem', color: '#7F1D1D' }}>
                  {current.symptom}
                </div>
              </div>

              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#065F46', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  ✅ The Actionable Fix:
                </div>
                <div style={{ fontSize: '0.88rem', color: '#064E3B' }}>
                  {current.remedy}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={handlePrev} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                &larr; Previous Mistake
              </button>
              <button onClick={handleNext} className="btn-emerald" style={{ padding: '0.5rem 1.25rem' }}>
                Next Mistake &rarr;
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

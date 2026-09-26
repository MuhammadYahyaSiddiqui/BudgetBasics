import React, { useState } from 'react';

export default function BudgetingBasics() {
  const [activeTab, setActiveTab] = useState('all');

  const cards = [
    {
      id: 'fixed',
      category: 'fixed',
      icon: '🔒',
      title: 'Fixed Expenses (Non-Negotiables)',
      subtitle: 'Predictable regular obligations',
      description: 'Expenses that remain constant every month. These are foundational bills you must pay to maintain shelter, education, and connectivity.',
      examples: ['Semester Tuition Fees', 'Apartment Rent / Hostel Dues', 'Fixed Wi-Fi & Mobile Bundles', 'Gym or Standard Commute Pass'],
      tip: 'Audit once per year. Even a 5% negotiation on fixed costs delivers massive long-term relief.'
    },
    {
      id: 'variable',
      category: 'variable',
      icon: '📊',
      title: 'Variable Expenses (Flex Spending)',
      subtitle: 'Fluctuating day-to-day choices',
      description: 'Costs that change depending on consumption, events, and seasonal habits. This category gives you the quickest levers to trim overspending.',
      examples: ['Dining Out & Weekend Cafes', 'Uber / Careem / Fuel Costs', 'Clothing & Online Shopping', 'Gaming & Entertainment Outings'],
      tip: 'Use the 48-Hour Rule for impulsive online checkouts to curb unnecessary dopamine buys.'
    },
    {
      id: 'savings',
      category: 'savings',
      icon: '🌱',
      title: 'Savings & Emergency Reserves',
      subtitle: 'Your future self insurance',
      description: 'Allocations dedicated to protecting yourself against sudden crises (laptop repair, medical) and funding long-term aspirations.',
      examples: ['3-Month Living Emergency Fund', 'High-Yield Shariah/Term Deposit', 'Skill Upgrades & Certifications', 'Long-term Device Upgrades'],
      tip: 'Always "Pay Yourself First" the instant your salary or stipend arrives before spending a single rupee.'
    }
  ];

  const filteredCards = activeTab === 'all' ? cards : cards.filter(c => c.category === activeTab);

  return (
    <section id="basics" style={{ padding: '4.5rem 0', backgroundColor: '#F8FAFC' }}>
      <div className="fintech-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill badge-navy" style={{ marginBottom: '0.75rem' }}>Financial Knowledge 101</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            Mastering Fixed vs. Variable Budgeting
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            A disciplined budget starts by understanding exactly where your money is locked and where you have full discretionary freedom to adjust.
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.75rem' }}>
            <button 
              onClick={() => setActiveTab('all')} 
              className={activeTab === 'all' ? 'btn-emerald' : 'btn-secondary'}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              All Concepts
            </button>
            <button 
              onClick={() => setActiveTab('fixed')} 
              className={activeTab === 'fixed' ? 'btn-emerald' : 'btn-secondary'}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              Fixed Costs
            </button>
            <button 
              onClick={() => setActiveTab('variable')} 
              className={activeTab === 'variable' ? 'btn-emerald' : 'btn-secondary'}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              Variable Costs
            </button>
            <button 
              onClick={() => setActiveTab('savings')} 
              className={activeTab === 'savings' ? 'btn-emerald' : 'btn-secondary'}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              Savings Rules
            </button>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {filteredCards.map((card) => (
            <div key={card.id} className="fintech-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '0.15rem' }}>{card.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700', textTransform: 'uppercase' }}>{card.subtitle}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {card.description}
                </p>

                <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem' }}>Common Student Examples:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {card.examples.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#10B981', fontWeight: '800' }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ padding: '0.85rem', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', fontSize: '0.82rem', color: '#065F46', display: 'flex', gap: '0.5rem' }}>
                <span style={{ fontWeight: '700' }}>💡 Tip:</span>
                <span>{card.tip}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

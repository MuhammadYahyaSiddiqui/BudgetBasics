import React, { useState } from 'react';

export default function Calculator503020() {
  const [income, setIncome] = useState(60000);

  const needsAmount = Math.round(income * 0.50);
  const wantsAmount = Math.round(income * 0.30);
  const savingsAmount = Math.round(income * 0.20);

  const presets = [30000, 50000, 75000, 100000, 150000];

  const formatPKR = (val) => {
    return 'PKR ' + (val || 0).toLocaleString();
  };

  return (
    <section id="calculator" style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="fintech-container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '0.75rem' }}>Core Financial Algorithm</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            The 50 / 30 / 20 Interactive Calculator
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            Harvard bankruptcy expert Senator Elizabeth Warren popularized this golden rule. Input your monthly income to see your recommended budget split.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Left Box: Controls & Input */}
          <div className="fintech-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '1.25rem' }}>
              Set Your Monthly Income
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '0.5rem' }}>
                Monthly Take-Home Income (PKR)
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: '700', color: '#64748B' }}>Rs.</span>
                <input 
                  type="number" 
                  min="5000" 
                  step="1000" 
                  value={income} 
                  onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
                  className="fintech-input" 
                  style={{ paddingLeft: '45px', fontSize: '1.2rem', fontWeight: '700' }}
                />
              </div>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginBottom: '0.35rem' }}>
                <span>PKR 10,000</span>
                <span>PKR 300,000</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="300000" 
                step="5000" 
                value={income} 
                onChange={(e) => setIncome(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
              />
            </div>

            {/* Quick Presets */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#64748B', marginBottom: '0.5rem' }}>
                Quick Income Presets:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {presets.map((amt) => (
                  <button 
                    key={amt} 
                    onClick={() => setIncome(amt)}
                    className={income === amt ? 'btn-emerald' : 'btn-secondary'}
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                  >
                    PKR {(amt / 1000)}k
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.85rem', color: '#475569' }}>
              <strong>💡 Pro Tip:</strong> If your fixed needs exceed 50%, consider downsizing non-essential subscriptions or sharing living accommodations to free up savings room.
            </div>
          </div>

          {/* Right Box: Dynamic 50/30/20 Visual Results */}
          <div className="fintech-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #F1F5F9' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0F172A' }}>
                Target Allocation Breakdown
              </h3>
              <span className="badge-pill badge-navy">Total: {formatPKR(income)}</span>
            </div>

            {/* Combined Ratio Bar */}
            <div style={{ height: '14px', width: '100%', borderRadius: '7px', overflow: 'hidden', display: 'flex', marginBottom: '2rem', backgroundColor: '#E2E8F0' }}>
              <div style={{ width: '50%', backgroundColor: '#3B82F6' }} title="50% Needs"></div>
              <div style={{ width: '30%', backgroundColor: '#8B5CF6' }} title="30% Wants"></div>
              <div style={{ width: '20%', backgroundColor: '#10B981' }} title="20% Savings"></div>
            </div>

            {/* 3 Split Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Needs Card */}
              <div style={{ padding: '1.1rem', borderRadius: '8px', border: '1.5px solid #DBEAFE', backgroundColor: '#EFF6FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>🏠</span>
                    <span style={{ fontWeight: '700', color: '#1E3A8A', fontSize: '0.95rem' }}>Needs (Essential Living)</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#BFDBFE', color: '#1E40AF', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>50%</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#3B82F6', marginTop: '0.2rem' }}>Rent, Groceries, Utilities, Tuition & Commute</div>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E3A8A' }}>
                  {formatPKR(needsAmount)}
                </div>
              </div>

              {/* Wants Card */}
              <div style={{ padding: '1.1rem', borderRadius: '8px', border: '1.5px solid #EDE9FE', backgroundColor: '#F5F3FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>☕</span>
                    <span style={{ fontWeight: '700', color: '#5B21B6', fontSize: '0.95rem' }}>Wants (Lifestyle & Joy)</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#DDD6FE', color: '#6D28D9', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>30%</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#7C3AED', marginTop: '0.2rem' }}>Dining out, Streaming, Shopping, Tech Gadgets</div>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#5B21B6' }}>
                  {formatPKR(wantsAmount)}
                </div>
              </div>

              {/* Savings Card */}
              <div style={{ padding: '1.1rem', borderRadius: '8px', border: '1.5px solid #A7F3D0', backgroundColor: '#ECFDF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>📈</span>
                    <span style={{ fontWeight: '700', color: '#065F46', fontSize: '0.95rem' }}>Savings (Future Wealth)</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#A7F3D0', color: '#047857', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>20%</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '0.2rem' }}>Emergency Buffer, Investments & Career Goals</div>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#065F46' }}>
                  {formatPKR(savingsAmount)}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

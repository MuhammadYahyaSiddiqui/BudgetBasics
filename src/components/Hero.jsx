import React from 'react';

export default function Hero({ onGetStarted }) {
  return (
    <section id="hero" style={{ padding: '4.5rem 0 3.5rem 0', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)', borderBottom: '1px solid #E2E8F0' }}>
      <div className="fintech-container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left Column: Value Proposition */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '1.25rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
              SMART FINANCIAL LITERACY FOR STUDENTS & EARLY PROS
            </div>
            
            <h1 style={{ fontSize: '2.75rem', lineHeight: '1.2', color: '#0F172A', marginBottom: '1.25rem' }}>
              Master Your Money with <span style={{ color: '#10B981' }}>BudgetBasics</span>.
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem', lineHeight: '1.7' }}>
              Take control of your student life and career finances. Plan your salary, budget effortlessly using the 50/30/20 rule, track custom savings goals, and eliminate costly money mistakes.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <a href="#planner" className="btn-emerald" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                Start Custom Budgeting &rarr;
              </a>
              <a href="#calculator" className="btn-outline-navy" style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}>
                Try 50/30/20 Calculator
              </a>
            </div>

            {/* Trust Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.85rem', fontWeight: '500' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#10B981' }}>✓</span> 100% Client-Side Privacy
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#10B981' }}>✓</span> Interactive Rule Simulations
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#10B981' }}>✓</span> Aptech Verified Certificate
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Financial Snapshot Card */}
          <div>
            <div className="fintech-card" style={{ padding: '2rem', border: '1.5px solid #E2E8F0', position: 'relative' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #F1F5F9' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Monthly Cashflow Framework</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>The 50/30/20 Rule in Action</div>
                </div>
                <span className="badge-pill badge-emerald">Optimal Split</span>
              </div>

              {/* Visual Category Breakdown Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#1E293B' }}>🏠 Needs (Rent, Utilities, Food)</span>
                    <span style={{ color: '#3B82F6' }}>50% (PKR 37,500)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#EFF6FF', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '50%', height: '100%', backgroundColor: '#3B82F6', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#1E293B' }}>☕ Wants (Outing, Subscriptions, Fun)</span>
                    <span style={{ color: '#8B5CF6' }}>30% (PKR 22,500)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#F5F3FF', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '30%', height: '100%', backgroundColor: '#8B5CF6', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#1E293B' }}>📈 Savings & Emergency Wealth</span>
                    <span style={{ color: '#10B981' }}>20% (PKR 15,000)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#ECFDF5', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '20%', height: '100%', backgroundColor: '#10B981', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Sample Monthly Income Base:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>PKR 75,000 / mo</div>
                </div>
                <a href="#planner" style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10B981', textDecoration: 'none' }}>Customize Mine &rarr;</a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

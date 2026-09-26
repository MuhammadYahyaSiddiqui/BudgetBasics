import React from 'react';

export default function SitemapModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const branches = [
    {
      pillar: 'Branch 1: Foundation & Basics',
      icon: '🚀',
      tag: 'Core Knowledge',
      nodes: [
        { label: 'Hero Introduction Banner', link: '#hero' },
        { label: 'Fixed vs. Variable Guide (101)', link: '#basics' },
        { label: 'Common Student Budget Mistakes', link: '#basics' },
        { label: 'Golden Savings Principles', link: '#basics' }
      ]
    },
    {
      pillar: 'Branch 2: Algorithmic Engines',
      icon: '🧮',
      tag: 'Interactive Calculators',
      nodes: [
        { label: '50/30/20 Ratio Calculator', link: '#calculator' },
        { label: 'Interactive Income Presets', link: '#calculator' },
        { label: 'Live Expense Ledger Tracker', link: '#planner' },
        { label: 'Multi-Goal Savings Buckets', link: '#planner' }
      ]
    },
    {
      pillar: 'Branch 3: Assessment & Games',
      icon: '🎮',
      tag: 'Gamification',
      nodes: [
        { label: 'Needs vs Wants Decision Sprint', link: '#game' },
        { label: 'Instant Feedback & Score Engine', link: '#game' },
        { label: 'Aptech Verified Certificate Generator', link: '#hero' }
      ]
    },
    {
      pillar: 'Branch 4: Meta & AI Advisory',
      icon: '🤖',
      tag: 'AI Support',
      nodes: [
        { label: 'BeeBot Interactive AI Assistant', link: '#hero' },
        { label: 'Aptech Academic Credits & Disclaimer', link: '#footer' },
        { label: 'Institutional Helpdesk Support', link: '#footer' }
      ]
    }
  ];

  return (
    <div className="fintech-modal-overlay" onClick={onClose}>
      <div 
        className="fintech-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: '#0F172A' }}>BudgetBasics Visual Sitemap Architecture</h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B' }}>Complete 4-Pillar Hierarchical React Component Tree</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#64748B', cursor: 'pointer' }}>
            ×
          </button>
        </div>

        {/* Tree Root */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0F172A', color: '#FFFFFF', padding: '0.6rem 1.25rem', borderRadius: '10px', fontWeight: '800', fontSize: '0.95rem' }}>
            <span>🌐</span> BudgetBasics Root SPA Architecture
          </div>
          <div style={{ width: '2px', height: '20px', backgroundColor: '#CBD5E1', margin: '0 auto' }}></div>
        </div>

        {/* 4 Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {branches.map((b, idx) => (
            <div key={idx} style={{ backgroundColor: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '10px', padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <span>{b.icon}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A' }}>{b.pillar}</span>
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#10B981', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{b.tag}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {b.nodes.map((n, i) => (
                    <a 
                      key={i} 
                      href={n.link}
                      onClick={onClose}
                      style={{ 
                        fontSize: '0.78rem', 
                        color: '#475569', 
                        textDecoration: 'none', 
                        padding: '0.35rem 0.5rem', 
                        borderRadius: '6px', 
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'block',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.color = '#10B981'; e.currentTarget.style.borderColor = '#10B981'; }}
                      onMouseOut={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      &bull; {n.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose} className="btn-emerald">Close Sitemap</button>
        </div>

      </div>
    </div>
  );
}

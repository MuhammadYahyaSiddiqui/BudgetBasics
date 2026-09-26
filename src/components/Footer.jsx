import React from 'react';

export default function Footer({ onOpenSitemap, onOpenCertificate }) {
  return (
    <footer id="footer" style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '4rem 0 2rem 0', borderTop: '1px solid #1E293B' }}>
      <div className="fintech-container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          {/* Col 1: Brand & Purpose */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', fontWeight: '800', fontSize: '1.2rem' }}>
                $
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#FFFFFF' }}>
                Budget<span style={{ color: '#10B981' }}>Basics</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              NextGen BudgetBee — A production-grade financial literacy and automated wealth planning platform built for modern students and early professionals.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Aptech Semester 1 Web Innovation Project
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform Modules</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><a href="#basics" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = '#10B981'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Budgeting 101 Basics</a></li>
              <li><a href="#calculator" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = '#10B981'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>50-30-20 Calculator</a></li>
              <li><a href="#planner" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = '#10B981'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Salary & Expense Planner</a></li>
              <li><a href="#game" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = '#10B981'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>Needs vs Wants Quiz</a></li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Tools</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>
                <button onClick={onOpenCertificate} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, font: 'inherit' }} onMouseOver={e => e.currentTarget.style.color = '#10B981'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>
                  🎓 Generate Certificate
                </button>
              </li>
              <li>
                <button onClick={onOpenSitemap} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, font: 'inherit' }} onMouseOver={e => e.currentTarget.style.color = '#10B981'} onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}>
                  🌳 Tree Architecture Sitemap
                </button>
              </li>
              <li><span style={{ color: '#64748B' }}>🔒 100% Client-Side Local Storage</span></li>
            </ul>
          </div>

          {/* Col 4: Institutional Disclaimer */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Academic Disclosure</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.6' }}>
              This platform is designed for educational guidance and student budget discipline. Calculations are based on standard financial heuristics. Always consult certified financial advisors for institutional investments.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid #1E293B', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
          <div>
            &copy; {new Date().getFullYear()} <strong>BudgetBasics</strong> (NextGen BudgetBee). All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Built with React 18 &amp; Hooks</span>
            <span>Aptech Computer Education</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

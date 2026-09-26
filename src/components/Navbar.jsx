import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/sound';

export default function Navbar({ 
  currency, 
  setCurrency, 
  soundEnabled, 
  setSoundEnabled, 
  onStartTour, 
  onOpenCertificate, 
  onOpenSitemap 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveTime, setLiveTime] = useState('');
  const [liveDate, setLiveDate] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    { quote: "Beware of little expenses; a small leak will sink a great ship.", author: "Benjamin Franklin" },
    { quote: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett" },
    { quote: "A budget is telling your money where to go instead of wondering where it went.", author: "Dave Ramsey" },
    { quote: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.", author: "Dave Ramsey" }
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString());
      setLiveDate(now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const handleNavClick = (e) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement & Live Metric Bar */}
      <div style={{ backgroundColor: '#0F172A', color: '#94A3B8', fontSize: '0.78rem', padding: '0.4rem 0', borderBottom: '1px solid #1E293B' }}>
        <div className="fintech-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          
          {/* Live Quote Ticker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '280px' }}>
            <span style={{ backgroundColor: '#10B981', color: '#0F172A', fontWeight: '800', fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>
              💡 DAILY TIP
            </span>
            <span style={{ color: '#E2E8F0', fontStyle: 'italic', transition: 'all 0.3s ease' }}>
              "{quotes[quoteIndex].quote}" — <span style={{ color: '#10B981', fontStyle: 'normal', fontWeight: '600' }}>{quotes[quoteIndex].author}</span>
            </span>
          </div>

          {/* Live System Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontWeight: '500' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
              <strong style={{ color: '#FFFFFF' }}>15,240+</strong> Students
            </span>
            <span>🕒 {liveTime}</span>
            <span className="desktop-nav">📅 {liveDate}</span>
          </div>

        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <div className="fintech-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          
          {/* Brand Logo */}
          <a href="#hero" onClick={handleNavClick} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontWeight: '800', fontSize: '1.3rem', boxShadow: '0 4px 8px rgba(15, 23, 42, 0.15)' }}>
              $
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.02em' }}>Budget</span>
                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#10B981', letterSpacing: '-0.02em' }}>Basics</span>
              </div>
              <div style={{ fontSize: '0.62rem', fontWeight: '700', color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>NextGen Student Financial OS</div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button 
              onClick={() => { soundEngine.playClick(); onStartTour(); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1.5px solid #A7F3D0',
                padding: '0.4rem 0.8rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🧭</span> Discover Tour
            </button>

            <a href="#basics" onClick={handleNavClick} style={{ color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              Budgeting 101
            </a>
            <a href="#calculator" onClick={handleNavClick} style={{ color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              50-30-20 Rule
            </a>
            <a href="#planner" onClick={handleNavClick} style={{ color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              Expense Planner
            </a>
            <a href="#goals" onClick={handleNavClick} style={{ color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              Savings Goals
            </a>
            <a href="#mistakes" onClick={handleNavClick} style={{ color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              10 Mistakes
            </a>
            <a href="#health-check" onClick={handleNavClick} style={{ color: '#475569', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              Health Audit
            </a>
          </nav>

          {/* Controls & Modals */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            
            {/* Currency Selector */}
            <select 
              value={currency} 
              onChange={(e) => { soundEngine.playClick(); setCurrency(e.target.value); }}
              className="fintech-input desktop-nav" 
              style={{ width: 'auto', padding: '0.4rem 0.6rem', fontSize: '0.82rem', fontWeight: '700' }}
            >
              <option value="PKR">PKR (Rs)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>

            {/* Sound FX Toggle */}
            <button 
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                soundEngine.enabled = next;
                if (next) soundEngine.playSuccess();
              }}
              className="btn-secondary"
              title="Toggle Audio Feedback"
              style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>

            {/* Sitemap Modal Button */}
            <button 
              onClick={() => { soundEngine.playClick(); onOpenSitemap(); }}
              className="btn-secondary desktop-nav"
              title="View Visual Tree Sitemap"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}
            >
              <span>🌳</span> Sitemap
            </button>

            {/* Certificate Modal Button */}
            <button 
              onClick={() => { soundEngine.playSuccess(); onOpenCertificate(); }}
              className="btn-emerald"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <span>🎓</span> Certificate
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-secondary"
              style={{ display: 'none', padding: '0.5rem 0.75rem' }}
              id="mobileMenuBtn"
            >
              ☰
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{ width: '280px', height: '100%', backgroundColor: '#FFFFFF', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0' }}>
              <span style={{ fontWeight: '800', color: '#0F172A' }}>Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            <a href="#basics" onClick={handleNavClick} style={{ textDecoration: 'none', color: '#1E293B', fontWeight: '600' }}>Budgeting 101</a>
            <a href="#calculator" onClick={handleNavClick} style={{ textDecoration: 'none', color: '#1E293B', fontWeight: '600' }}>50-30-20 Calculator</a>
            <a href="#planner" onClick={handleNavClick} style={{ textDecoration: 'none', color: '#1E293B', fontWeight: '600' }}>Expense Planner</a>
            <a href="#goals" onClick={handleNavClick} style={{ textDecoration: 'none', color: '#1E293B', fontWeight: '600' }}>Savings Goals</a>
            <a href="#game" onClick={handleNavClick} style={{ textDecoration: 'none', color: '#1E293B', fontWeight: '600' }}>Needs vs Wants Game</a>
            <a href="#mistakes" onClick={handleNavClick} style={{ textDecoration: 'none', color: '#1E293B', fontWeight: '600' }}>10 Money Mistakes</a>
            <a href="#health-check" onClick={handleNavClick} style={{ textDecoration: 'none', color: '#1E293B', fontWeight: '600' }}>Financial Health Audit</a>
          </div>
        </div>
      )}
    </>
  );
}

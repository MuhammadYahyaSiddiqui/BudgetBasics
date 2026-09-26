import React, { useEffect } from 'react';
import { soundEngine } from '../utils/sound';

export default function TourOverlay({ step, totalSteps, tourData, onNext, onPrev, onClose }) {
  if (step === null || !tourData) return null;

  const current = tourData[step];

  useEffect(() => {
    if (current && current.targetId) {
      const el = document.getElementById(current.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [step, current]);

  return (
    <>
      {/* Dark Blurred Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(3px)',
          zIndex: 9998,
          pointerEvents: 'auto'
        }}
        onClick={onClose}
      />

      {/* Floating Spotlight Card */}
      <div 
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '540px',
          width: '90%',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #10B981',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(16, 185, 129, 0.2)',
          padding: '1.75rem',
          zIndex: 9999,
          animation: 'fadeIn 0.25s ease'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>{current.icon}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#ECFDF5', color: '#065F46', padding: '0.2rem 0.6rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
              Step {step + 1} of {totalSteps}
            </span>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.25rem', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginBottom: '0.5rem' }}>
          {current.title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.25rem' }}>
          {current.description}
        </p>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={onClose} 
            className="btn-secondary" 
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            Skip Tour
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {step > 0 && (
              <button 
                onClick={() => { soundEngine.playClick(); onPrev(); }} 
                className="btn-secondary" 
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
              >
                &larr; Back
              </button>
            )}
            <button 
              onClick={() => {
                soundEngine.playClick();
                if (step + 1 < totalSteps) {
                  onNext();
                } else {
                  soundEngine.playSuccess();
                  onClose();
                }
              }} 
              className="btn-emerald" 
              style={{ fontSize: '0.82rem', padding: '0.45rem 1.1rem' }}
            >
              {step + 1 < totalSteps ? 'Next Step →' : 'Finish Tour 🎉'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

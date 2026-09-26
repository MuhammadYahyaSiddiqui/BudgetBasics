import React, { useState } from 'react';

export default function CertificateModal({ isOpen, onClose }) {
  const [recipientName, setRecipientName] = useState('Yahya Khan');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fintech-modal-overlay" onClick={onClose}>
      <div 
        className="fintech-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', padding: '2rem' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#0F172A' }}>Aptech Verified Financial Literacy Certificate</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Personalize your name and instantly generate or print your certificate</p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#64748B', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        {/* Name Input Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.4rem' }}>
            Recipient Full Name (Live Preview):
          </label>
          <input 
            type="text" 
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="fintech-input"
            style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A' }}
            placeholder="Enter your full name..."
          />
        </div>

        {/* Certificate Visual Canvas */}
        <div style={{ 
          border: '8px double #CBD5E1', 
          borderRadius: '12px', 
          padding: '2.5rem 2rem', 
          backgroundColor: '#FFFFFF', 
          textAlign: 'center', 
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          marginBottom: '1.5rem'
        }}>
          {/* Watermark / Seal */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#ECFDF5', border: '1.5px solid #10B981', color: '#065F46', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800' }}>
            ✓ VERIFIED CREDENTIAL
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.15em', color: '#10B981', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            APTECH COMPUTER EDUCATION &bull; ACADEMIC EXCELLENCE
          </div>

          <h2 style={{ fontSize: '2rem', color: '#0F172A', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Certificate of Achievement
          </h2>

          <div style={{ fontSize: '0.88rem', color: '#64748B', fontStyle: 'italic', marginBottom: '1.25rem' }}>
            This official credential certifies that
          </div>

          {/* Student Name */}
          <div style={{ 
            fontSize: '2.2rem', 
            fontWeight: '800', 
            color: '#0F172A', 
            borderBottom: '2px solid #10B981', 
            display: 'inline-block', 
            padding: '0 2rem 0.35rem 2rem', 
            marginBottom: '1.25rem',
            fontFamily: "'Poppins', sans-serif"
          }}>
            {recipientName || 'Your Name Here'}
          </div>

          <div style={{ fontSize: '0.9rem', color: '#334155', maxWidth: '520px', margin: '0 auto 1.75rem auto', lineHeight: '1.6' }}>
            has successfully mastered foundational budgeting principles, the 50/30/20 allocation framework, expense discipline, and student wealth resilience on the <strong>BudgetBasics Platform</strong>.
          </div>

          {/* Signatures & Meta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'end', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>{currentDate}</div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>ISSUE DATE</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem' }}>🏅</div>
              <div style={{ fontSize: '0.68rem', color: '#059669', fontWeight: '700' }}>BB-CERT-2026-AP</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>Aptech Evaluation Board</div>
              <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>AUTHORIZED SIGNATURE</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
          <button onClick={handlePrint} className="btn-emerald">
            <span>🖨️</span> Print / Save PDF
          </button>
        </div>

      </div>
    </div>
  );
}

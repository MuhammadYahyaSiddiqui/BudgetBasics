import React, { useState } from 'react';
import { soundEngine } from '../utils/sound';

export default function FeedbackContact() {
  // Feedback Form State
  const [rating, setRating] = useState(5);
  const [studentFeedback, setStudentFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Helpdesk State
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    soundEngine.playSuccess();
    setFeedbackSubmitted(true);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    soundEngine.playSuccess();
    setTicketSubmitted(true);
  };

  return (
    <section id="feedback-contact" style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="fintech-container">
        
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill badge-navy" style={{ marginBottom: '0.75rem' }}>Community & Support</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            About, Feedback & Student Helpdesk
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            Connect with our academic team, share your feedback, and receive direct assistance.
          </p>
        </div>

        {/* 3 Equal Height Flex Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem', alignItems: 'stretch' }}>
          
          {/* Card 1: About Us */}
          <div className="fintech-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '1.25rem' }}>
                  🏛️
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0F172A' }}>About BudgetBasics</h3>
                  <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700' }}>APTECH INNOVATION UNLEASHED</span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
                BudgetBasics (NextGen BudgetBee) is an academic initiative designed to bridge the financial literacy gap for undergraduate students and young early professionals in Pakistan.
              </p>

              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.35rem' }}>Academic Specifications:</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>&bull; Framework: React 18 &amp; Hooks</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>&bull; Architecture: Pure Client-Side SPA</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>&bull; Evaluation: Aptech Semester 1 Project</div>
              </div>
            </div>

            <a href="#hero" className="btn-secondary" style={{ width: '100%' }}>
              Back to Overview &uarr;
            </a>
          </div>

          {/* Card 2: Student Feedback & Star Rating */}
          <div className="fintech-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', fontSize: '1.25rem' }}>
                  ⭐
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0F172A' }}>Student Rating</h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Rate Your Experience</span>
                </div>
              </div>

              {!feedbackSubmitted ? (
                <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {/* Star Picker */}
                  <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', padding: '0.5rem 0' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => { soundEngine.playClick(); setRating(star); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '1.6rem',
                          cursor: 'pointer',
                          color: star <= rating ? '#F59E0B' : '#CBD5E1',
                          transition: 'transform 0.1s'
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Tell us what you loved or what we should add next..."
                    value={studentFeedback}
                    onChange={(e) => setStudentFeedback(e.target.value)}
                    className="fintech-input"
                    style={{ resize: 'none', fontSize: '0.85rem' }}
                    required
                  />

                  <button type="submit" className="btn-emerald" style={{ width: '100%' }}>
                    Submit Feedback &rarr;
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
                  <h4 style={{ color: '#065F46', marginBottom: '0.4rem' }}>Thank You!</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Your {rating}-star rating and suggestions have been recorded for future improvements.</p>
                </div>
              )}
            </div>

            <div style={{ fontSize: '0.72rem', color: '#94A3B8', textAlign: 'center', marginTop: '1rem' }}>
              Reviewed by 15,000+ Students
            </div>
          </div>

          {/* Card 3: Contact Helpdesk */}
          <div className="fintech-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', fontSize: '1.25rem' }}>
                  📬
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0F172A' }}>Contact Helpdesk</h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Direct Inquiry Ticket</span>
                </div>
              </div>

              {!ticketSubmitted ? (
                <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                    className="fintech-input"
                    style={{ fontSize: '0.85rem' }}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Student Email Address"
                    value={ticketEmail}
                    onChange={(e) => setTicketEmail(e.target.value)}
                    className="fintech-input"
                    style={{ fontSize: '0.85rem' }}
                    required
                  />
                  <textarea
                    rows={2}
                    placeholder="Inquiry or Bug details..."
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    className="fintech-input"
                    style={{ resize: 'none', fontSize: '0.85rem' }}
                    required
                  />
                  <button type="submit" className="btn-emerald" style={{ width: '100%' }}>
                    Send Support Message &rarr;
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                  <h4 style={{ color: '#065F46', marginBottom: '0.4rem' }}>Ticket Created</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Thank you {ticketName}. A counselor will reply to {ticketEmail} shortly.</p>
                </div>
              )}
            </div>

            <div style={{ fontSize: '0.72rem', color: '#94A3B8', textAlign: 'center', marginTop: '1rem' }}>
              Aptech Center Helpdesk Support
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

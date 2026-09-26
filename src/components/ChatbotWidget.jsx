import React, { useState, useRef, useEffect } from 'react';

export default function ChatbotWidget({ onOpenCertificate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Salam! I am BeeBot, your BudgetBasics AI advisor. How can I assist with your student finances today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  const presetQuestions = [
    { label: 'How does 50/30/20 work?', reply: 'The 50/30/20 rule splits your monthly take-home salary into 50% Needs (food, rent, tuition), 30% Wants (dining, hobbies), and 20% Savings (emergency fund, investments).' },
    { label: 'How big should my emergency fund be?', reply: 'For students and early pros, aim for 3 to 6 months of basic living expenses (Needs). Keep this in an accessible high-yield or savings account.' },
    { label: 'How can I save with a low stipend?', reply: '1) Automate a minimum 10% transfer on day 1. 2) Cook meals in batch. 3) Split Wi-Fi and subscriptions with hostel mates.' },
    { label: 'How do I claim my certificate?', reply: 'Click the "Get Certificate" button in the top navigation, enter your full name, and hit Print / Save as PDF!' }
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate response
    setTimeout(() => {
      let botReply = "That's a great question! For student budgeting, prioritize keeping your essential fixed costs below 50% and automate savings as soon as your stipend arrives.";
      const lower = text.toLowerCase();
      
      const foundPreset = presetQuestions.find(p => p.label.toLowerCase() === lower);
      if (foundPreset) {
        botReply = foundPreset.reply;
      } else if (lower.includes('cert') || lower.includes('degree')) {
        botReply = 'You can generate and print your Aptech-verified BudgetBasics certificate from the top right button!';
      } else if (lower.includes('salary') || lower.includes('income')) {
        botReply = 'You can set your custom income and target savings percentage in the Interactive Expense Planner section above!';
      } else if (lower.includes('needs') || lower.includes('wants')) {
        botReply = 'Needs are essentials required for living and study (50%). Wants are lifestyle choices (30%). Test your skills in the Needs vs Wants sprint game!';
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 450);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999 }}>
      
      {/* Chat Window */}
      {isOpen && (
        <div style={{ 
          width: '360px', 
          height: '500px', 
          backgroundColor: '#FFFFFF', 
          borderRadius: '16px', 
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.25), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginBottom: '1rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          
          {/* Header */}
          <div style={{ backgroundColor: '#0F172A', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#0F172A' }}>
                🐝
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>BeeBot Assistant</div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span> Active Financial AI
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1.25rem' }}
            >
              ×
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', backgroundColor: '#F8FAFC' }}>
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                style={{ 
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%'
                }}
              >
                <div style={{ 
                  padding: '0.7rem 0.9rem', 
                  borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  backgroundColor: m.sender === 'user' ? '#0F172A' : '#FFFFFF',
                  color: m.sender === 'user' ? '#FFFFFF' : '#1E293B',
                  fontSize: '0.85rem',
                  lineHeight: '1.45',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: m.sender === 'bot' ? '1px solid #E2E8F0' : 'none'
                }}>
                  {m.text}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '0.2rem', textAlign: m.sender === 'user' ? 'right' : 'left' }}>
                  {m.time}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Preset Buttons */}
          <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '0.4rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {presetQuestions.map((pq, i) => (
              <button 
                key={i}
                onClick={() => handleSend(pq.label)}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '9999px',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  color: '#334155',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {pq.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ padding: '0.75rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '0.5rem' }}
          >
            <input 
              type="text" 
              placeholder="Ask BeeBot a question..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1.5px solid #E2E8F0',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button 
              type="submit" 
              className="btn-emerald"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            >
              Send
            </button>
          </form>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#0F172A',
          color: '#10B981',
          border: '2px solid #10B981',
          boxShadow: '0 8px 16px rgba(15, 23, 42, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          transition: 'all 0.2s ease',
          transform: isOpen ? 'rotate(90deg)' : 'none'
        }}
        title="Open Financial AI Assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

    </div>
  );
}

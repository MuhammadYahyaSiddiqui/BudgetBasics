import React, { useState } from 'react';
import { soundEngine } from '../utils/sound';

export default function InfographicsGallery() {
  const [activeGraphic, setActiveGraphic] = useState(null);

  const infographics = [
    {
      id: 1,
      tag: 'Framework Visual',
      title: 'The 50 / 30 / 20 Student Cashflow Blueprint',
      subtitle: 'Complete structural allocation breakdown for allowances and stipends',
      bullets: [
        '50% Needs: Shelter, Groceries, Study Wi-Fi, Transit',
        '30% Wants: Outings, Cafes, Tech Hobbies, Subscriptions',
        '20% Savings: Emergency Fund, Future Tuition, Skills'
      ],
      diagram: {
        ratio: '50% : 30% : 20%',
        color: '#3B82F6'
      }
    },
    {
      id: 2,
      tag: 'Safety Architecture',
      title: 'The 3-Tier Emergency Cushion Pyramid',
      subtitle: 'How to build psychological safety against sudden cash shocks',
      bullets: [
        'Tier 1: Instant Mini-Buffer (PKR 10,000 for quick fixes)',
        'Tier 2: 3-Month Living Needs (Hostel + Food survival)',
        'Tier 3: Career Growth Runway (Job hunting transition fund)'
      ],
      diagram: {
        ratio: 'Tier 1 → Tier 2 → Tier 3',
        color: '#10B981'
      }
    },
    {
      id: 3,
      tag: 'Decision Matrix',
      title: 'The 48-Hour Discretionary Impulse Filter',
      subtitle: 'Cognitive defense against digital checkout impulsive spending',
      bullets: [
        'Step 1: Place non-essential desire in wishlist cart',
        'Step 2: Wait full 48 hours for dopamine level to stabilize',
        'Step 3: If still valuable after 2 days, purchase with cash'
      ],
      diagram: {
        ratio: 'Dopamine Pause → Rational Verdict',
        color: '#8B5CF6'
      }
    },
    {
      id: 4,
      tag: 'Growth Curve',
      title: 'Compounding Small Savings Velocity',
      subtitle: 'The exponential power of investing PKR 3,000 every single month',
      bullets: [
        'Habit formation builds emotional financial resilience',
        'Early investing yields massive 10-year compound interest',
        'Protects from borrowing high-interest consumer credit'
      ],
      diagram: {
        ratio: 'Linear Effort → Exponential Wealth',
        color: '#059669'
      }
    }
  ];

  return (
    <section id="infographics" style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="fintech-container">
        
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '0.75rem' }}>Visual Architecture</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            High-Resolution Financial Infographics
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            Crystal-clear conceptual diagrams designed to explain complex personal wealth mechanics at a glance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {infographics.map((item) => (
            <div 
              key={item.id} 
              className="fintech-card" 
              style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => { soundEngine.playClick(); setActiveGraphic(item); }}
            >
              <div>
                <span className="badge-pill badge-navy" style={{ marginBottom: '0.75rem' }}>{item.tag}</span>
                <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>{item.subtitle}</p>

                {/* Conceptual Schematic Box */}
                <div style={{ backgroundColor: '#F8FAFC', border: '1.5px dashed #CBD5E1', borderRadius: '8px', padding: '1.25rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: item.diagram.color, textTransform: 'uppercase' }}>
                    {item.diagram.ratio}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>Click to view full guide breakdown</div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {item.bullets.map((b, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: '#10B981', fontWeight: '800' }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: '700' }}>Inspect Full Diagram &rarr;</span>
                <span style={{ fontSize: '1.1rem' }}>🔍</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeGraphic && (
          <div className="fintech-modal-overlay" onClick={() => setActiveGraphic(null)}>
            <div className="fintech-modal-box" onClick={(e) => e.stopPropagation()} style={{ padding: '2.5rem', maxWidth: '650px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge-pill badge-emerald">{activeGraphic.tag}</span>
                <button onClick={() => setActiveGraphic(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748B' }}>×</button>
              </div>

              <h2 style={{ fontSize: '1.6rem', color: '#0F172A', marginBottom: '0.5rem' }}>{activeGraphic.title}</h2>
              <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>{activeGraphic.subtitle}</p>

              <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#10B981', marginBottom: '0.5rem' }}>
                  {activeGraphic.diagram.ratio}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Universal Student Financial Literacy Blueprint</div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem' }}>Key Architectural Takeaways:</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {activeGraphic.bullets.map((b, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#475569' }}>
                      <span style={{ color: '#10B981', fontWeight: '800', marginRight: '0.5rem' }}>•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>

              <button onClick={() => setActiveGraphic(null)} className="btn-emerald" style={{ width: '100%' }}>Close Diagram</button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

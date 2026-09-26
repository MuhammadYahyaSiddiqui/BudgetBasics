import React, { useState, useMemo } from 'react';

export default function SavingsGoalsPlanner() {
  // Salary and Target State
  const [salary, setSalary] = useState(70000);
  const [targetSavingsPercent, setTargetSavingsPercent] = useState(20);

  // Expense List State
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Hostel / Rent Share', category: 'Needs', amount: 20000 },
    { id: 2, name: 'Groceries & Mess Dues', category: 'Needs', amount: 12000 },
    { id: 3, name: 'Semester Books & Printing', category: 'Needs', amount: 3500 },
    { id: 4, name: 'Weekend Cafes & Dining', category: 'Wants', amount: 8000 },
    { id: 5, name: 'Mobile Data & Netflix', category: 'Wants', amount: 2500 }
  ]);

  // New Expense Form State
  const [newExpName, setNewExpName] = useState('');
  const [newExpCat, setNewExpCat] = useState('Needs');
  const [newExpAmt, setNewExpAmt] = useState('');

  // Savings Goals State
  const [goals, setGoals] = useState([
    { id: 1, title: 'MacBook / Coding Laptop', target: 120000, current: 45000, monthlyDeposit: 10000 },
    { id: 2, title: 'Emergency Cushion Reserve', target: 50000, current: 25000, monthlyDeposit: 5000 }
  ]);

  // New Goal Form State
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalCurrent, setNewGoalCurrent] = useState('');
  const [newGoalMonthly, setNewGoalMonthly] = useState('');

  // Calculated Metrics
  const targetSavingsAmount = Math.round((salary * targetSavingsPercent) / 100);

  const totalSpent = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  }, [expenses]);

  const needsSpent = useMemo(() => {
    return expenses.filter(e => e.category === 'Needs').reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  }, [expenses]);

  const wantsSpent = useMemo(() => {
    return expenses.filter(e => e.category === 'Wants').reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  }, [expenses]);

  const remainingBalance = salary - totalSpent;
  const actualSavingsRate = salary > 0 ? Math.round(((remainingBalance > 0 ? remainingBalance : 0) / salary) * 100) : 0;

  // Add Expense Handler
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpName.trim() || !newExpAmt || Number(newExpAmt) <= 0) return;
    const newEntry = {
      id: Date.now(),
      name: newExpName.trim(),
      category: newExpCat,
      amount: Number(newExpAmt)
    };
    setExpenses([newEntry, ...expenses]);
    setNewExpName('');
    setNewExpAmt('');
  };

  // Delete Expense
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Add Goal Handler
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim() || !newGoalTarget || Number(newGoalTarget) <= 0) return;
    const newGoal = {
      id: Date.now(),
      title: newGoalTitle.trim(),
      target: Number(newGoalTarget),
      current: Number(newGoalCurrent) || 0,
      monthlyDeposit: Number(newGoalMonthly) || 5000
    };
    setGoals([...goals, newGoal]);
    setNewGoalTitle('');
    setNewGoalTarget('');
    setNewGoalCurrent('');
    setNewGoalMonthly('');
  };

  // Quick Deposit Handler
  const handleQuickDeposit = (goalId, delta) => {
    setGoals(goals.map(g => {
      if (g.id === goalId) {
        return { ...g, current: Math.min(g.target, g.current + delta) };
      }
      return g;
    }));
  };

  // Delete Goal
  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  const formatPKR = (val) => 'PKR ' + (val || 0).toLocaleString();

  return (
    <section id="planner" style={{ padding: '4.5rem 0', backgroundColor: '#F8FAFC' }}>
      <div className="fintech-container">
        
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill badge-emerald" style={{ marginBottom: '0.75rem' }}>Personal Financial Control Center</div>
          <h2 style={{ fontSize: '2.25rem', color: '#0F172A', marginBottom: '1rem' }}>
            Interactive Expense Planner & Goal Tracker
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569' }}>
            Set your monthly income and savings target, record live expenditures, and observe instant actionable financial guidance.
          </p>
        </div>

        {/* Top Control Bar: Salary & Target Savings */}
        <div className="fintech-card" style={{ padding: '1.75rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.4rem' }}>
              Your Monthly Salary / Allowance (PKR)
            </label>
            <input 
              type="number" 
              value={salary} 
              onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
              className="fintech-input" 
              style={{ fontWeight: '700', fontSize: '1.1rem' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1E293B' }}>
                Target Savings Goal: <span style={{ color: '#10B981' }}>{targetSavingsPercent}%</span>
              </label>
              <span style={{ fontSize: '0.82rem', color: '#64748B' }}>{formatPKR(targetSavingsAmount)} / mo</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="50" 
              step="5" 
              value={targetSavingsPercent} 
              onChange={(e) => setTargetSavingsPercent(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
            />
          </div>

          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#047857', textTransform: 'uppercase' }}>Available Net Surplus</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: remainingBalance >= 0 ? '#065F46' : '#DC2626' }}>
              {formatPKR(remainingBalance)}
            </div>
          </div>
        </div>

        {/* 4 Quick KPI Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          <div className="fintech-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>TOTAL INCOME</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', marginTop: '0.2rem' }}>{formatPKR(salary)}</div>
          </div>

          <div className="fintech-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>TOTAL EXPENSES</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#E11D48', marginTop: '0.2rem' }}>{formatPKR(totalSpent)}</div>
          </div>

          <div className="fintech-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>NEEDS SPENT (MAX 50%)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#3B82F6', marginTop: '0.2rem' }}>{formatPKR(needsSpent)}</div>
          </div>

          <div className="fintech-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>WANTS SPENT (MAX 30%)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#8B5CF6', marginTop: '0.2rem' }}>{formatPKR(wantsSpent)}</div>
          </div>
        </div>

        {/* Main 2-Column: Expense Tracker & Goal Buckets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          
          {/* Column 1: Live Expense Ledger */}
          <div className="fintech-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0F172A' }}>Monthly Expense Ledger</h3>
              <span className="badge-pill badge-navy">{expenses.length} Records</span>
            </div>

            {/* Add Expense Form */}
            <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #E2E8F0' }}>
              <input 
                type="text" 
                placeholder="Expense Description (e.g. Wi-Fi Bill)" 
                value={newExpName}
                onChange={(e) => setNewExpName(e.target.value)}
                className="fintech-input"
                required
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <select 
                  value={newExpCat} 
                  onChange={(e) => setNewExpCat(e.target.value)}
                  className="fintech-input"
                >
                  <option value="Needs">🏠 Needs (50%)</option>
                  <option value="Wants">☕ Wants (30%)</option>
                  <option value="Savings">🌱 Savings (20%)</option>
                </select>
                <input 
                  type="number" 
                  placeholder="Amount (PKR)" 
                  value={newExpAmt}
                  onChange={(e) => setNewExpAmt(e.target.value)}
                  className="fintech-input"
                  min="1"
                  required
                />
              </div>
              <button type="submit" className="btn-emerald" style={{ width: '100%', padding: '0.65rem' }}>
                + Add Expense Entry
              </button>
            </form>

            {/* Expenses List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '350px', overflowY: 'auto' }}>
              {expenses.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.9rem' }}>{exp.name}</div>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      fontWeight: '700',
                      padding: '0.1rem 0.4rem', 
                      borderRadius: '4px',
                      backgroundColor: exp.category === 'Needs' ? '#DBEAFE' : exp.category === 'Wants' ? '#EDE9FE' : '#D1FAE5',
                      color: exp.category === 'Needs' ? '#1E40AF' : exp.category === 'Wants' ? '#6D28D9' : '#065F46'
                    }}>
                      {exp.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.95rem' }}>{formatPKR(exp.amount)}</span>
                    <button 
                      onClick={() => handleDeleteExpense(exp.id)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1rem', padding: '0.2rem' }}
                      title="Delete Entry"
                      onMouseOver={e => e.currentTarget.style.color = '#EF4444'}
                      onMouseOut={e => e.currentTarget.style.color = '#94A3B8'}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Custom Savings Goals Tracker */}
          <div className="fintech-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0F172A' }}>Savings Goal Buckets</h3>
              <span className="badge-pill badge-emerald">{goals.length} Active Goals</span>
            </div>

            {/* Add Goal Form */}
            <form onSubmit={handleAddGoal} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #E2E8F0' }}>
              <input 
                type="text" 
                placeholder="Goal Name (e.g. Electric Scooter / Laptop)" 
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                className="fintech-input"
                required
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <input 
                  type="number" 
                  placeholder="Target (PKR)" 
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  className="fintech-input"
                  min="1000"
                  required
                />
                <input 
                  type="number" 
                  placeholder="Current Saved (PKR)" 
                  value={newGoalCurrent}
                  onChange={(e) => setNewGoalCurrent(e.target.value)}
                  className="fintech-input"
                  min="0"
                />
              </div>
              <button type="submit" className="btn-emerald" style={{ width: '100%', padding: '0.65rem' }}>
                + Create Savings Goal
              </button>
            </form>

            {/* Goals List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '350px', overflowY: 'auto' }}>
              {goals.map((g) => {
                const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                const remaining = Math.max(0, g.target - g.current);
                return (
                  <div key={g.id} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <div>
                        <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.95rem' }}>{g.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Target: {formatPKR(g.target)}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#10B981' }}>{pct}%</span>
                        <button 
                          onClick={() => handleDeleteGoal(g.id)}
                          style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                      <div style={{ width: `${pct}%`, height: '100%', backgroundColor: '#10B981', transition: 'width 0.3s ease' }}></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: '#475569' }}>Saved: <strong>{formatPKR(g.current)}</strong> (Need {formatPKR(remaining)})</span>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button 
                          onClick={() => handleQuickDeposit(g.id, 1000)}
                          className="btn-secondary"
                          style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                        >
                          +1k
                        </button>
                        <button 
                          onClick={() => handleQuickDeposit(g.id, 5000)}
                          className="btn-secondary"
                          style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                        >
                          +5k
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

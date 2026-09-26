import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TourOverlay from './components/TourOverlay';
import Hero from './components/Hero';
import BudgetingBasics from './components/BudgetingBasics';
import KnowledgeQuiz from './components/KnowledgeQuiz';
import Calculator503020 from './components/Calculator503020';
import SavingsGoalsPlanner from './components/SavingsGoalsPlanner';
import NeedsWantsGame from './components/NeedsWantsGame';
import MoneyMistakes from './components/MoneyMistakes';
import InfographicsGallery from './components/InfographicsGallery';
import HealthScorecard from './components/HealthScorecard';
import FeedbackContact from './components/FeedbackContact';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import CertificateModal from './components/CertificateModal';
import SitemapModal from './components/SitemapModal';
import './index.css';

export default function App() {
  const [currency, setCurrency] = useState('PKR');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Modals
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Guided Tour
  const [tourStep, setTourStep] = useState(null);

  const tourStepsData = [
    {
      targetId: 'hero',
      icon: '🚀',
      title: 'Welcome to BudgetBasics',
      description: 'Your NextGen Student Financial Hub. Start by discovering the 50/30/20 cashflow framework and exploring our interactive tools.'
    },
    {
      targetId: 'basics',
      icon: '🔒',
      title: 'Fixed vs. Variable Expenses',
      description: 'Understand the difference between non-negotiable living costs (rent, tuition) and flexible discretionary spending.'
    },
    {
      targetId: 'calculator',
      icon: '🧮',
      title: 'The 50/30/20 Calculator',
      description: 'Slide your monthly income to instantly calculate optimal allocations for Needs (50%), Wants (30%), and Savings (20%).'
    },
    {
      targetId: 'planner',
      icon: '📊',
      title: 'Live Expense Ledger & Goal Buckets',
      description: 'Record your real daily expenses, track custom goal targets, and receive automated financial health guidance.'
    },
    {
      targetId: 'game',
      icon: '🎮',
      title: 'Needs vs. Wants Decision Sprint',
      description: 'Test your financial instincts in an interactive sprint game with live score tracking.'
    },
    {
      targetId: 'mistakes',
      icon: '⚠️',
      title: '10 Costly Student Money Mistakes',
      description: 'Browse our curated carousel of psychological spending traps and learn their proven remedies.'
    },
    {
      targetId: 'health-check',
      icon: '🩺',
      title: 'Financial Health Scorecard',
      description: 'Complete a 30-second audit of your daily money habits and calculate your personal financial health index.'
    },
    {
      targetId: 'quiz',
      icon: '🎓',
      title: 'Mastery Quiz & Certificate',
      description: 'Pass the 4-question knowledge check to unlock and print your Aptech-verified BudgetBasics certificate!'
    }
  ];

  return (
    <div className="budgetbasics-react-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 8-Step Interactive Guided Tour */}
      <TourOverlay 
        step={tourStep}
        totalSteps={tourStepsData.length}
        tourData={tourStepsData}
        onNext={() => setTourStep(s => s + 1)}
        onPrev={() => setTourStep(s => s - 1)}
        onClose={() => setTourStep(null)}
      />

      {/* Sticky Navigation Bar */}
      <Navbar 
        currency={currency}
        setCurrency={setCurrency}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onStartTour={() => setTourStep(0)}
        onOpenCertificate={() => setIsCertOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <Hero />
        <BudgetingBasics />
        <Calculator503020 />
        <SavingsGoalsPlanner />
        <NeedsWantsGame />
        <MoneyMistakes />
        <InfographicsGallery />
        <HealthScorecard />
        <KnowledgeQuiz onOpenCertificate={() => setIsCertOpen(true)} />
        <FeedbackContact />
      </main>

      {/* Corporate Footer */}
      <Footer 
        onOpenCertificate={() => setIsCertOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Floating BeeBot AI Widget */}
      <ChatbotWidget onOpenCertificate={() => setIsCertOpen(true)} />

      {/* Verified Certificate Modal */}
      <CertificateModal 
        isOpen={isCertOpen} 
        onClose={() => setIsCertOpen(false)} 
      />

      {/* Hierarchical 4-Pillar Sitemap Modal */}
      <SitemapModal 
        isOpen={isSitemapOpen} 
        onClose={() => setIsSitemapOpen(false)} 
      />

    </div>
  );
}

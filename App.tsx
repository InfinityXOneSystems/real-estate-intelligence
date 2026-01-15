
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PropertyAnalyzer from './components/PropertyAnalyzer';
import VoiceAgent from './components/VoiceAgent';
import { AppView, PropertyLead } from './types';

// Mock initial data for the matrix
const INITIAL_LEADS: PropertyLead[] = [
  {
    id: '1',
    address: '4521 Oak Grove Ave, Atlanta, GA',
    price: 185000,
    marketValue: 310000,
    status: 'ANALYZED',
    nexusScore: 98,
    motivationDelta: 0.92,
    healthScore: 0.45,
    distressMarkers: ['Structural Attention Needed', 'Maintenance Required'],
    ownerInfo: {
      name: 'Robert Wilson',
      financialStrain: 'High Priority',
      lastContact: 'None'
    },
    financials: {
      irr: 0.32,
      npv: 85000,
      coc: 0.18,
      exitForecast: 345000
    }
  },
  {
    id: '2',
    address: '112 Bayside Terrace, Jacksonville, FL',
    price: 420000,
    marketValue: 550000,
    status: 'NEGOTIATING',
    nexusScore: 84,
    motivationDelta: 0.65,
    healthScore: 0.82,
    distressMarkers: ['Cosmetic Update', 'Market Opportunity'],
    ownerInfo: {
      name: 'Sarah Jennings',
      financialStrain: 'Selling Asset',
      lastContact: '3 days ago'
    },
    financials: {
      irr: 0.22,
      npv: 45000,
      coc: 0.12,
      exitForecast: 610000
    }
  },
  {
    id: '3',
    address: '889 Industrial Way, Phoenix, AZ',
    price: 275000,
    marketValue: 410000,
    status: 'IDENTIFIED',
    nexusScore: 91,
    motivationDelta: 0.88,
    healthScore: 0.31,
    distressMarkers: ['Re-Entry Asset', 'High Potential'],
    ownerInfo: {
      name: 'Marcus Chen',
      financialStrain: 'Time-Sensitive',
      lastContact: 'None'
    },
    financials: {
      irr: 0.41,
      npv: 112000,
      coc: 0.24,
      exitForecast: 480000
    }
  }
];

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.DASHBOARD);
  const [leads] = useState<PropertyLead[]>(INITIAL_LEADS);
  const [selectedLead, setSelectedLead] = useState<PropertyLead | null>(null);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard leads={leads} onSelectLead={(lead) => {
          setSelectedLead(lead);
          setView(AppView.PROPERTY_ANALYSIS);
        }} />;
      case AppView.PROPERTY_ANALYSIS:
        return <PropertyAnalyzer />;
      case AppView.VOICE_AGENT:
        return <VoiceAgent />;
      case AppView.FINANCIAL_ENGINE:
        return (
          <div className="p-8 sm:p-12 text-center pb-32">
            <h2 className="text-3xl sm:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Buy <span className="text-gradient-gold">Analytics</span></h2>
            <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-lg mx-auto mb-12 uppercase tracking-[0.2em]">Predictive Modelling Engine</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-black/80 p-8 rounded-[2rem] border border-[#D4AF37]/20 shadow-2xl">
                <div className="text-4xl font-black text-gradient-gold mb-2 tracking-tighter">32.4%</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Projected IRR</div>
              </div>
              <div className="bg-black/80 p-8 rounded-[2rem] border border-[#D4AF37]/20 shadow-2xl">
                <div className="text-4xl font-black text-white mb-2 tracking-tighter">$1.2M</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Portfolio NPV</div>
              </div>
            </div>
          </div>
        );
      case AppView.LEGAL_HUB:
        return (
          <div className="p-8 sm:p-12 text-center pb-32">
            <h2 className="text-3xl sm:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Legal <span className="text-gradient-gold">Compliance</span></h2>
            <p className="text-zinc-500 text-sm sm:text-base font-medium max-w-lg mx-auto mb-12 uppercase tracking-[0.2em]">Smart Contract Generation</p>
            <div className="glass p-12 rounded-[3rem] border border-[#D4AF37]/20 max-w-2xl mx-auto">
               <div className="text-white font-bold">Select a property to generate compliance documents.</div>
            </div>
          </div>
        );
      default:
        return <Dashboard leads={leads} onSelectLead={setSelectedLead} />;
    }
  };

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <Navigation currentView={currentView} setView={setView} />
        <main className="flex-1 relative overflow-x-hidden">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;

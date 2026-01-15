
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
    distressMarkers: ['Structural Integrity Optimization', 'Deferred Maintenance Signal'],
    ownerInfo: {
      name: 'Robert Wilson',
      financialStrain: 'High Urgency',
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
    distressMarkers: ['Aesthetic Refinement Potential', 'Market Delta Opportunity'],
    ownerInfo: {
      name: 'Sarah Jennings',
      financialStrain: 'Asset Realization Focus',
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
    distressMarkers: ['Strategic Re-Entry Asset', 'High-Yield Conversion'],
    ownerInfo: {
      name: 'Marcus Chen',
      financialStrain: 'Time-Critical Disposition',
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
                <div className="text-[10px] mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Avg Strategic IRR</div>
              </div>
              <div className="bg-black/80 p-8 rounded-[2rem] border border-[#D4AF37]/20 shadow-2xl">
                <div className="text-4xl font-black text-white mb-2 tracking-tighter">12.1x</div>
                <div className="text-[10px] mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Buy Multiplier</div>
              </div>
            </div>
          </div>
        );
      case AppView.LEGAL_HUB:
        return (
          <div className="p-8 sm:p-12 max-w-4xl mx-auto pb-32">
             <h2 className="text-3xl sm:text-6xl font-black tracking-tighter mb-4 leading-none uppercase text-white">Legal <span className="text-gradient-gold">Chat</span></h2>
             <p className="text-zinc-500 text-sm sm:text-base font-medium mb-12 uppercase tracking-[0.2em]">Automated Strategic Sell Documentation</p>
             <div className="bg-black border border-[#D4AF37]/20 p-8 sm:p-10 rounded-[2rem] shadow-3xl opacity-60">
                <div className="flex items-center gap-5 mb-8">
                   <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center border border-[#D4AF37]/20">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                   </div>
                   <div>
                      <div className="text-lg font-black uppercase tracking-[0.2em] text-white">Hub Standby</div>
                      <div className="text-xs mono text-zinc-500">Verification Required</div>
                   </div>
                </div>
                <div className="h-40 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-[10px] mono text-zinc-600 tracking-[0.4em] uppercase">
                   Protocol Identification Required
                </div>
             </div>
          </div>
        );
      default:
        return <Dashboard leads={leads} onSelectLead={() => {}} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#030303]">
      <Navigation currentView={currentView} setView={setView} />
      <main className="flex-1 bg-black overflow-y-auto overflow-x-hidden relative">
        <div className="mx-auto w-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;


import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, Camera, Mic2, BarChart3, ShieldCheck, Crown } from 'lucide-react';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const items = [
    { id: AppView.DASHBOARD, label: 'Market Intelligence', icon: LayoutDashboard },
    { id: AppView.PROPERTY_ANALYSIS, label: 'Sell Vision', icon: Camera },
    { id: AppView.VOICE_AGENT, label: 'Negotiation Core', icon: Mic2 },
    { id: AppView.FINANCIAL_ENGINE, label: 'Buy Analytics', icon: BarChart3 },
    { id: AppView.LEGAL_HUB, label: 'Chat Legal', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Desktop Sidebar - Slimmer Width */}
      <nav className="hidden lg:flex w-64 border-r border-white/10 bg-[#030303] h-screen flex-col sticky top-0 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#C0C0C0] rounded-lg flex items-center justify-center shadow-lg shadow-[#D4AF37]/10">
              <Crown className="text-black w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold tracking-tighter text-lg leading-none text-white">RE-IQ 360</h1>
              <p className="text-[8px] text-white/60 uppercase tracking-widest mt-1 font-bold">Intelligence v4.2</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-3 space-y-1">
          <p className="px-3 text-[9px] text-white/40 uppercase tracking-widest font-bold mb-3 mt-2">Core Systems</p>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
                currentView === item.id 
                  ? 'active-highlight text-[#D4AF37]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={16} className={currentView === item.id ? 'text-[#D4AF37]' : 'text-white/40'} />
              <span className={`text-xs font-bold tracking-wide ${currentView === item.id ? 'text-gradient-gold' : 'text-white'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-white/5">
          <div className="glass p-4 rounded-xl border border-[#D4AF37]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[9px] mono text-[#D4AF37] font-bold uppercase tracking-tighter">System Nominal</span>
            </div>
            <p className="text-[9px] text-white/60 mono leading-relaxed">Optimization: Peak<br/>Intelligence: Tier-1</p>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] glass border-t border-white/10">
        <div className="flex items-center justify-around p-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                currentView === item.id ? 'text-[#D4AF37]' : 'text-white/60'
              }`}
            >
              <div className={`p-1 rounded-lg transition-all ${currentView === item.id ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30' : ''}`}>
                <item.icon size={18} strokeWidth={currentView === item.id ? 2.5 : 2} />
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-widest mt-1 ${currentView === item.id ? 'text-gradient-gold' : 'text-white'}`}>
                {item.id === AppView.DASHBOARD ? 'Intel' : item.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;

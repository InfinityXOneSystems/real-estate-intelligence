
import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, Camera, Mic2, FileText, BarChart3, ShieldCheck, Zap, Crown } from 'lucide-react';

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
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex w-72 border-r border-white/10 bg-[#030303] h-screen flex-col sticky top-0 z-50">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C0C0C0] rounded-lg flex items-center justify-center shadow-lg shadow-[#D4AF37]/10">
              <Crown className="text-black w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold tracking-tighter text-xl leading-none text-white">RE-IQ 360</h1>
              <p className="text-[9px] text-white uppercase tracking-widest mt-1.5 font-bold">Intelligence v4.2</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-2">
          <p className="px-4 text-[10px] text-white uppercase tracking-widest font-bold mb-4">Core Systems</p>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                currentView === item.id 
                  ? 'active-highlight text-[#D4AF37]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={currentView === item.id ? 'text-[#D4AF37]' : 'text-white/40'} />
              <span className={`text-sm font-semibold tracking-tight ${currentView === item.id ? 'text-gradient-gold' : 'text-white'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="p-8 border-t border-white/5">
          <div className="glass p-4 rounded-xl border border-[#D4AF37]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10px] mono text-[#D4AF37] font-bold uppercase tracking-tighter">System Nominal</span>
            </div>
            <p className="text-[10px] text-white mono leading-relaxed">Optimization: Peak<br/>Intelligence: Tier-1</p>
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
              className={`flex flex-col items-center gap-1.5 py-2 px-3 rounded-xl transition-all duration-300 ${
                currentView === item.id ? 'text-[#D4AF37]' : 'text-white/60'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all ${currentView === item.id ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30' : ''}`}>
                <item.icon size={20} strokeWidth={currentView === item.id ? 2.5 : 2} />
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-widest ${currentView === item.id ? 'text-gradient-gold' : 'text-white'}`}>
                {item.id === AppView.DASHBOARD ? 'Intelligence' : item.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;

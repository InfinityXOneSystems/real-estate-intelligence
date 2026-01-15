
import React from 'react';
import { PropertyLead } from '../types';
import { ShieldCheck, Globe, Activity, Scale } from 'lucide-react';

interface DashboardProps {
  leads: PropertyLead[];
  onSelectLead: (lead: PropertyLead) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ leads, onSelectLead }) => {
  const primeLead = leads[0];

  const priceDisplayMap: Record<string, { price: string; days: string }> = {
    '1': { price: '$900,000', days: '3 DAYS LEFT' },
    '2': { price: '$1,100,000', days: '6 DAYS LEFT' },
    '3': { price: '$650,000', days: '1 DAY LEFT' }
  };

  return (
    <div className="min-h-screen bg-[#030303] pb-24 animate-in fade-in duration-1000">
      {/* Hero Section - Added pb-40 to push content up away from the overlapping stats cards */}
      <section className="relative min-h-[85vh] w-full overflow-hidden flex flex-col justify-center pb-40">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          alt="Luxury Real Estate"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 w-full px-6 sm:px-12 max-w-[1600px] mx-auto flex flex-col items-start pt-20">
          {/* Main Heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 leading-[0.9] text-white uppercase animate-in slide-in-from-top-12 duration-1000">
            REAL ESTATE<br/>
            <span className="text-gradient-gold">IQ 360</span>
          </h1>
          
          <div className="mb-10">
            <h3 className="text-lg sm:text-2xl font-medium tracking-tight text-white uppercase mb-6 flex items-center gap-3">
              Real Estate <span className="text-gradient-gold">Intelligence</span>
            </h3>
            
            <p className="text-xl sm:text-3xl font-medium tracking-tight text-white/95 max-w-3xl leading-tight italic border-l-4 border-[#D4AF37] pl-6">
              Maximize Value Intelligently.<br/>
              <span className="text-white font-medium">Even Distributed Wealth</span>
            </p>
            <p className="text-sm sm:text-lg font-medium text-white/80 mt-4 block italic pl-6">
              Your intelligent guide to fast closing with AI on your side.
            </p>
          </div>
          
          <div className="flex flex-row items-center gap-4 pl-1">
            <button 
              onClick={() => onSelectLead(primeLead)}
              className="py-3 px-8 rounded-xl btn-gs flex items-center justify-center transition-transform active:scale-95 shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
            >
              <span className="text-black font-black text-xs uppercase tracking-widest">Learn More</span>
            </button>
            <button 
              onClick={() => onSelectLead(primeLead)}
              className="py-3 px-8 rounded-xl btn-ws flex items-center justify-center transition-transform active:scale-95"
            >
              <span className="text-black font-black text-xs uppercase tracking-widest">Join Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar - Kept overlap but hero content is now pushed up */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 -mt-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Sellers protection', value: 'High Wealth', icon: ShieldCheck },
            { label: 'Investor opportunities', value: '$840M', icon: Scale },
            { label: 'Trust Guarantee', value: 'Verified', icon: Globe },
            { label: 'Value Optimization', value: 'Maximized', icon: Activity },
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-3xl border-[#D4AF37]/10 group transition-all hover:border-[#D4AF37]/40 shadow-xl backdrop-blur-xl bg-black/60">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                  <stat.icon size={24} className="text-[#D4AF37]" />
                </div>
              </div>
              <div className="text-[10px] text-white/60 uppercase font-bold tracking-[0.2em] mb-1">{stat.label}</div>
              <div className="text-xl sm:text-2xl font-black tracking-tighter text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunity Grid - Increased margin top to mt-32 to move cards down */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-12 mt-32 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-8">
          <div>
            <h3 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase flex flex-col">
              <span>FOCUS DRIVEN</span>
              <span className="text-gradient-gold">ON VALUE</span>
            </h3>
            <p className="text-white/60 text-sm sm:text-base font-bold mt-4 uppercase tracking-[0.2em]">
              intelligent systems designed to guide you
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {leads.map((lead) => {
            const buttonText = lead.id === '1' 
              ? "SELL FAST AND SAFE" 
              : "Intelligent Transparency";
            
            const priceData = priceDisplayMap[lead.id] || { price: '$0', days: 'PENDING' };

            return (
              <div 
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="group bg-[#050505] border border-[#D4AF37]/10 rounded-[2rem] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] flex flex-col"
              >
                <div className="h-48 sm:h-64 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${lead.id === '1' ? '1600585154340-be6161a56a0c' : lead.id === '2' ? '1600596542815-ffad4c1539a9' : '1564013799919-ab600027ffc6'}?auto=format&fit=crop&q=80&w=800`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    alt="Property"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="glass px-3 py-1.5 rounded-full border-[#D4AF37]/30 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                      <span className="text-[9px] font-bold text-white mono uppercase tracking-widest">SCORE {lead.nexusScore}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.2em]">
                        {lead.id === '1' ? 'Disposition Protocol' : 'Acquisition Protocol'}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 flex flex-col items-end gap-2">
                      <div className="text-lg sm:text-2xl font-black tracking-tighter text-gradient-gold">
                        {priceData.price}
                      </div>
                      <div className="text-[10px] text-white mono font-medium uppercase tracking-[0.2em] opacity-80">
                        {priceData.days}
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 rounded-xl glass-btn text-white font-black text-xs uppercase tracking-[0.2em] group-hover:active-highlight transition-all border-[#D4AF37]/20">
                    {buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

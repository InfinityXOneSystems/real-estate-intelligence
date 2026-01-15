
import React from 'react';
import { PropertyLead } from '../types';
import { formatCurrency } from '../utils';
import { ArrowUpRight, ShieldCheck, Globe, Activity, Award, Scale } from 'lucide-react';

interface DashboardProps {
  leads: PropertyLead[];
  onSelectLead: (lead: PropertyLead) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ leads, onSelectLead }) => {
  const primeLead = leads[0];

  // Map of IDs to custom display strings as requested
  const priceDisplayMap: Record<string, string> = {
    '1': '900k 3 days left',
    '2': '1.1m 6 days left',
    '3': '650k 1 day left'
  };

  return (
    <div className="min-h-screen bg-[#030303] pb-32 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative h-[80vh] sm:h-[95vh] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          alt="Luxury Real Estate"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent" />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 h-full flex flex-col justify-start lg:justify-center px-6 sm:px-16 max-w-7xl mx-auto pt-24 sm:pt-32 lg:pt-0 pb-16 lg:pb-0">
          {/* Main Heading - Moved Up */}
          <h1 className="text-5xl sm:text-9xl font-medium tracking-tighter mb-10 leading-none text-white uppercase animate-in slide-in-from-top-12 duration-1000">
            REAL ESTATE<br/>
            <span className="text-gradient-gold">IQ 360</span>
          </h1>
          
          <div className="mb-12">
            {/* Real Estate Intelligence - Larger size, "Intelligence" in gold/silver gradient */}
            <h3 className="text-xl sm:text-4xl font-medium tracking-tight text-white uppercase mb-10">
              Real Estate <span className="text-gradient-gold">Intelligence</span>
            </h3>
            
            {/* Maximize Value Block - Adequate space added above via h3 mb-10 */}
            <p className="text-xl sm:text-3xl font-medium tracking-tight text-white/95 max-w-3xl leading-tight italic">
              Maximize Value Intelligently.<br/>
              <span className="text-white font-medium">Even Distributed Wealth</span>
            </p>
            <p className="text-sm sm:text-xl font-medium text-white/80 mt-4 block italic">
              Your intelligent guide to fast closing with AI on your side.
            </p>
          </div>
          
          {/* Smaller CTA Buttons Section */}
          <div className="flex flex-row items-center gap-4">
            <button 
              onClick={() => onSelectLead(primeLead)}
              className="py-3 px-8 rounded-xl sm:rounded-full btn-gs flex items-center justify-center gap-3 transition-transform active:scale-95"
            >
              <span className="text-black font-black text-xs uppercase tracking-widest">Learn More</span>
            </button>
            <button 
              onClick={() => onSelectLead(primeLead)}
              className="py-3 px-8 rounded-xl sm:rounded-full btn-ws flex items-center justify-center gap-3 transition-transform active:scale-95"
            >
              <span className="text-black font-black text-xs uppercase tracking-widest">Join Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-16 -mt-12 sm:-mt-20 relative z-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Sellers protection', value: 'High Wealth', delta: '', icon: ShieldCheck },
            { label: 'Investor opportunities', value: '$840M', delta: '', icon: Scale },
            { label: 'Trust Guranteee', value: '', delta: '', icon: Globe },
            { label: 'Value Optimization', value: 'Maximized', delta: '', icon: Activity },
          ].map((stat, i) => (
            <div key={i} className="glass p-8 sm:p-10 rounded-[2.5rem] border-[#D4AF37]/10 group transition-all hover:border-[#D4AF37]/40 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/10">
                  <stat.icon size={22} className="text-[#D4AF37]" />
                </div>
                <span className="text-[11px] font-bold text-white mono tracking-tighter">{stat.delta}</span>
              </div>
              <div className="text-[11px] sm:text-[14px] text-white uppercase font-bold tracking-[0.25em] mb-2">{stat.label}</div>
              <div className="text-2xl sm:text-4xl font-black tracking-tighter text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunity Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-16 mt-24 sm:mt-44 space-y-10 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-12">
          <div>
            <h3 className="text-4xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-white uppercase flex flex-col">
              <span>FOCUS DRIVEN</span>
              <span className="text-gradient-gold">ON VALUE</span>
            </h3>
            <p className="text-white text-base sm:text-xl font-medium mt-6 uppercase tracking-[0.15em]">
              intelligent systems designed to guide you
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {leads.map((lead) => {
            const buttonText = lead.id === '1' 
              ? "SELL FAST AND SAFE" 
              : "Intelligent Transparency";

            return (
              <div 
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="group bg-black/40 border border-[#D4AF37]/10 rounded-[2.5rem] overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)]"
              >
                <div className="h-56 sm:h-72 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${lead.id === '1' ? '1600585154340-be6161a56a0c' : lead.id === '2' ? '1600596542815-ffad4c1539a9' : '1564013799919-ab600027ffc6'}?auto=format&fit=crop&q=80&w=800`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                    alt="Property"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="glass px-4 py-1.5 rounded-full border-[#D4AF37]/40 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-[10px] font-bold text-white mono uppercase tracking-widest">CHAT {lead.nexusScore}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0 pr-4">
                      {/* Address removed as requested */}
                      <p className="text-white text-[10px] mt-2 font-bold uppercase tracking-[0.2em]">
                        {lead.id === '1' ? 'Disposition Protocol' : 'Acquisition Protocol'}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {/* Price display updated per instructions */}
                      <div className="text-lg sm:text-2xl font-black tracking-tighter text-gradient-gold">
                        {priceDisplayMap[lead.id]}
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-5 rounded-2xl glass-btn text-white font-black text-sm uppercase tracking-[0.2em] group-hover:active-highlight transition-all">
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

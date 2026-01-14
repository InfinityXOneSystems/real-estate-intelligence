
import React from 'react';
import { PropertyLead } from '../types';
import { formatCurrency } from '../utils';
import { TrendingUp, ArrowUpRight, ShieldCheck, Globe, Activity, Award, Scale } from 'lucide-react';

interface DashboardProps {
  leads: PropertyLead[];
  onSelectLead: (lead: PropertyLead) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ leads, onSelectLead }) => {
  const primeLead = leads[0];

  return (
    <div className="min-h-screen bg-[#030303] pb-32 animate-in fade-in duration-1000">
      {/* Hero Section - Marketing Focused */}
      <section className="relative h-[80vh] sm:h-[95vh] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          alt="Luxury Real Estate"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent" />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 h-full flex flex-col justify-end lg:justify-center px-6 sm:px-16 max-w-7xl mx-auto pb-16 lg:pb-0">
          <div className="flex items-center gap-3 mb-8 lg:mb-10">
            <Award size={20} className="text-white" />
            <span className="text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.3em] text-white mono">Elite Asset Acquisition</span>
          </div>
          
          <h1 className="text-5xl sm:text-9xl font-black tracking-tighter mb-4 leading-none text-white">
            REAL ESTATE<br/>
            <span className="text-gradient-gold uppercase">Intelligence.</span>
          </h1>
          
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white/95 max-w-3xl leading-tight">
            Maximize Value Intelligently.<br/>
            <span className="text-white font-medium">Even Distributed Wealth</span><br/>
            <span className="text-white/80 font-normal text-lg sm:text-2xl mt-4 block italic">Your intelligent guide to fast closing with AI on your side.</span>
          </h2>
          
          <p className="hidden sm:block text-white mt-8 max-w-xl text-xl font-medium leading-relaxed">
            Unlocking institutional-grade opportunities through autonomous deep-market analysis and elite negotiation protocols.
          </p>
          
          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button 
              onClick={() => onSelectLead(primeLead)}
              className="w-full sm:w-auto glass-btn py-5 px-12 rounded-2xl sm:rounded-full flex items-center justify-center gap-4 shadow-3xl group"
            >
              <span className="text-white font-bold text-lg tracking-tight uppercase">Access Opportunity</span>
              <ArrowUpRight size={22} className="text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 glass px-6 py-3 rounded-2xl border-white/5">
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030303] overflow-hidden bg-zinc-800">
                    <img src={`https://i.pravatar.cc/100?u=v${i}`} alt="Elite Agent" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Network Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Forced Square Grid (2x2) pattern on all screen sizes */}
      <div className="max-w-7xl mx-auto px-6 sm:px-16 -mt-12 sm:-mt-20 relative z-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Sellers protection', value: 'High Wealth', delta: '99.9%', icon: ShieldCheck },
            { label: 'Investors value', value: '$840M', delta: '+14%', icon: Scale },
            { label: 'Wealth Comps', value: 'Global', delta: 'Elite', icon: Globe },
            { label: 'Value Optimization', value: 'Maximized', delta: 'Tier-1', icon: Activity },
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
          <button className="hidden sm:flex text-[#D4AF37] font-bold hover:text-white transition-colors items-center gap-2 text-sm uppercase tracking-widest mt-6 sm:mt-0">
            Explore Portfolio <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {leads.map((lead) => {
            // Updated button text logic: Keep "SELL FAST AND SAFE" for lead 1, 
            // but change the acquisition leads to "WE WILL EARN YOU MORE"
            const buttonText = lead.id === '1' 
              ? "SELL FAST AND SAFE" 
              : "WE WILL EARN YOU MORE";

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
                    alt="Asset"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="glass px-4 py-1.5 rounded-full border-[#D4AF37]/40 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-[10px] font-bold text-white mono uppercase tracking-widest">NEXUS {lead.nexusScore}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight truncate text-white group-hover:text-gradient-gold transition-all duration-300">{lead.address}</h4>
                      <p className="text-white text-[10px] mt-2 font-bold uppercase tracking-[0.2em]">
                        {lead.id === '1' ? 'Disposition Protocol' : 'Acquisition Protocol'}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg sm:text-2xl font-black tracking-tighter text-gradient-gold">{formatCurrency(lead.price)}</div>
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


import React, { useState, useRef } from 'react';
import { analyzePropertyImage, getMarketComps } from '../geminiService';
import { blobToBase64, formatCurrency, formatPercent } from '../utils';
import { Camera, Search, Loader2, Thermometer, ShieldCheck, MapPin, Target, LayoutGrid, ArrowRight, Globe, Crown } from 'lucide-react';

const PropertyAnalyzer: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await blobToBase64(file);
      setImage(`data:${file.type};base64,${base64}`);
    }
  };

  const runFullAnalysis = async () => {
    if (!image || !address) return;
    setAnalyzing(true);
    try {
      const visionResult = await analyzePropertyImage(image.split(',')[1]);
      const marketResult = await getMarketComps(address);
      setResult({ ...visionResult, market: marketResult });
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6 sm:p-12 max-w-7xl mx-auto min-h-screen pb-32 animate-in slide-in-from-bottom-8 duration-1000">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 sm:pb-12 mb-8 sm:mb-12">
        <div className="mb-8 lg:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
              <Camera size={20} className="text-[#D4AF37]" />
            </div>
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em] mono">Asset Vision Core</span>
          </div>
          <h2 className="text-4xl sm:text-7xl font-black tracking-tighter leading-none uppercase text-white">Strategic <span className="text-gradient-gold">Scan</span></h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-[#D4AF37] transition-colors" size={16} />
            <input
              type="text"
              placeholder="Asset Address..."
              className="bg-black border border-[#D4AF37]/20 rounded-xl pl-10 pr-6 py-4 text-sm w-full sm:w-80 focus:border-[#D4AF37] outline-none transition-all font-semibold text-white placeholder:text-white/30"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="glass-btn text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95"
          >
            <LayoutGrid size={18} className="text-[#D4AF37]" />
            <span className="uppercase tracking-widest text-xs">Upload Data</span>
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        </div>
      </header>

      {!result && !analyzing && (
        <div className="relative h-[450px] sm:h-[650px] border-2 border-dashed border-[#D4AF37]/20 rounded-[3rem] bg-black overflow-hidden flex flex-col items-center justify-center">
          {image ? (
            <div className="absolute inset-0">
              <img src={image} className="h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <div className="p-10 rounded-full bg-white/5 border border-[#D4AF37]/10 mb-8">
              <Camera size={56} className="text-[#D4AF37]/40" strokeWidth={1.5} />
            </div>
          )}
          
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4 text-white">
              {image ? 'PROTOCOL STANDBY' : 'ACQUISITION DATA REQUIRED'}
            </h3>
            <button 
              disabled={!image || !address}
              onClick={runFullAnalysis}
              className="w-full sm:w-auto glass-btn py-5 px-16 rounded-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              {analyzing ? <Loader2 className="animate-spin text-[#D4AF37]" size={22} /> : <Target size={22} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />}
              <span className="text-white font-bold text-lg tracking-tight">EXECUTE ELITE ANALYSIS</span>
            </button>
          </div>
        </div>
      )}

      {analyzing && (
        <div className="h-[450px] sm:h-[650px] flex flex-col items-center justify-center space-y-8 bg-black rounded-[3rem] border border-[#D4AF37]/20 relative overflow-hidden">
          <div className="absolute inset-0"><div className="scan-line" /></div>
          <div className="relative flex flex-col items-center gap-8">
            <div className="w-20 h-20 border-t-2 border-[#D4AF37] rounded-full animate-spin shadow-[0_0_30px_rgba(212,175,55,0.4)]" />
            <div className="text-center">
              <p className="text-3xl font-black tracking-tighter italic text-gradient-gold">INGESTING INTELLIGENCE</p>
              <p className="text-white mono font-bold tracking-[0.4em] uppercase mt-4 animate-pulse text-xs">Tier-1 Vision Scraper Active</p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="space-y-8 sm:space-y-10">
            <div className="bg-black border border-[#D4AF37]/20 rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="relative aspect-video sm:aspect-[4/3]">
                <img src={image!} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6">
                  <div className="glass px-4 py-2 rounded-xl border-[#D4AF37]/50 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span className="text-[11px] font-bold text-white mono uppercase tracking-[0.2em]">Asset Identified</span>
                  </div>
                </div>
              </div>
              <div className="p-8 sm:p-12">
                <h3 className="text-3xl font-extrabold tracking-tight mb-8 flex items-center gap-3 text-white">
                  <Thermometer className="text-[#D4AF37]" size={24} />
                  Intelligence <span className="text-gradient-gold">Markers</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {result.distressMarkers.map((m: string) => (
                    <span key={m} className="bg-[#D4AF37]/10 text-white border border-[#D4AF37]/30 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-tight">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass border-[#D4AF37]/30 rounded-[3rem] p-8 sm:p-12 bg-black/80">
              <h3 className="text-white font-black uppercase mono text-[11px] tracking-[0.6em] mb-6">Strategic Recommendation</h3>
              <p className="text-4xl sm:text-6xl font-black tracking-tighter mb-8 leading-none uppercase text-gradient-gold">{result.acquisitionStrategy}</p>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-10 flex flex-col">
            <div className="flex-1 bg-black border border-[#D4AF37]/20 rounded-[3rem] p-8 sm:p-12 flex flex-col shadow-2xl">
              <h3 className="text-white font-black uppercase mono text-[11px] tracking-[0.6em] mb-8 flex items-center gap-3">
                <Search size={18} className="text-[#D4AF37]" />
                Alpha Analysis Report
              </h3>
              <div className="flex-1 max-h-[400px] overflow-y-auto pr-4 mb-10 custom-scrollbar">
                <p className="text-white leading-relaxed font-medium text-lg whitespace-pre-wrap">{result.market.text}</p>
              </div>
              
              <div className="pt-8 border-t border-white/5">
                <h4 className="text-[11px] text-white uppercase font-black tracking-[0.4em] mb-6">Market Alpha Grounds</h4>
                <div className="space-y-3">
                  {result.market.sources.map((s: any, idx: number) => (
                    <a key={idx} href={s.web?.uri || s.maps?.uri} target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
                      <div className="flex items-center gap-3 min-w-0">
                        <Globe size={16} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="text-sm font-bold tracking-tight text-white group-hover:text-white truncate">{s.web?.title || s.maps?.title || 'Intelligence Data'}</span>
                      </div>
                      <ArrowRight size={14} className="text-white group-hover:text-[#D4AF37] transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full glass-btn py-7 rounded-[2rem] flex items-center justify-center gap-4 text-xl font-black tracking-tighter hover:active-highlight group">
              <ShieldCheck size={28} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="text-white uppercase tracking-widest">WE WILL EARN YOU MORE</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyAnalyzer;


import React, { useState, useRef, useEffect } from 'react';
import { AgentMode } from '../types';
import { AGENT_CONFIGS, getGeminiInstance } from '../geminiService';
import { encode, decode, decodeAudioData } from '../utils';
import { Mic, MicOff, Volume2, ShieldCheck, Zap, Activity, Crown, Target, HeartHandshake, Sparkles } from 'lucide-react';
import { LiveServerMessage, Modality } from '@google/genai';

const VoiceAgent: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AgentMode>(AgentMode.SOL);
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('System Link Ready');
  const [transcripts, setTranscripts] = useState<string[]>([]);
  
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const toggleSession = async () => {
    if (isConnected) {
      sessionRef.current?.close();
      setIsConnected(false);
      setIsRecording(false);
      setStatus('Link Severed');
      return;
    }

    try {
      setStatus('Initializing Quantum Handshake...');
      const ai = getGeminiInstance();
      
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const config = AGENT_CONFIGS[activeMode];

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsRecording(true);
            setStatus(`${config.name} Online`);
            
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: {
                    data: encode(new Uint8Array(int16.buffer)),
                    mimeType: 'audio/pcm;rate=16000'
                  }
                });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64 = message.serverContent.modelTurn.parts[0].inlineData.data;
              const ctx = outputAudioContextRef.current!;
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64), ctx, 24000, 1);
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.outputTranscription) {
              setTranscripts(prev => [...prev.slice(-4), `AI: ${message.serverContent?.outputTranscription?.text}`]);
            }
            if (message.serverContent?.inputTranscription) {
              setTranscripts(prev => [...prev.slice(-4), `User: ${message.serverContent?.inputTranscription?.text}`]);
            }
          },
          onerror: (e) => setStatus(`System Error: ${e}`),
          onclose: () => setIsConnected(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: config.instruction,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: config.voice as any } }
          },
          outputAudioTranscription: {},
          inputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('Connection Failed');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 animate-in zoom-in-95 duration-700 pb-32">
      <header className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Crown size={28} className="text-[#D4AF37]" />
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">Quantum <span className="text-gradient-gold">Link</span></h2>
        </div>
        <p className="text-white/60 text-sm font-medium tracking-wide max-w-xl mx-auto uppercase">
          IQ 360 Intelligence Node Active
        </p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {[AgentMode.SOL, AgentMode.ATLAS].map(mode => (
          <button
            key={mode}
            disabled={isConnected}
            onClick={() => setActiveMode(mode)}
            className={`p-8 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center gap-4 group ${
              activeMode === mode 
                ? 'active-highlight text-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.1)]' 
                : 'bg-black border-white/10 text-white/50 opacity-60 hover:opacity-100 hover:border-[#D4AF37]/40'
            }`}
          >
            {mode === AgentMode.SOL ? (
              <Sparkles size={40} className="group-hover:scale-110 transition-transform text-[#D4AF37]" />
            ) : (
              <Target size={40} className="group-hover:scale-110 transition-transform" />
            )}
            <div className="text-center">
              <div className={`font-black text-xl tracking-tight ${activeMode === mode ? 'text-white' : 'text-white/80'}`}>
                {AGENT_CONFIGS[mode].name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] mono font-bold mt-1 text-white">
                {mode === AgentMode.SOL ? 'Executive Assistant' : 'Strategic Architect'}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-black border border-[#D4AF37]/20 rounded-[3rem] p-16 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
        {isConnected && (
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <div className="w-full flex items-center justify-center gap-2">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-[#D4AF37] rounded-full animate-pulse" 
                  style={{ 
                    height: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s'
                  }} 
                />
              ))}
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center">
          <button 
            onClick={toggleSession}
            className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-700 transform hover:scale-105 ${
              isConnected 
                ? 'bg-white/10 shadow-[0_0_60px_rgba(255,255,255,0.1)] border-2 border-zinc-200' 
                : 'glass-btn border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.2)]'
            }`}
          >
            {isConnected ? <MicOff size={56} className="text-white" /> : <Mic size={56} className="text-[#D4AF37]" />}
          </button>
          
          <div className="mt-12 text-center space-y-3">
            <div className={`text-2xl font-black mono tracking-tighter uppercase ${isConnected ? 'text-gradient-gold' : 'text-white/40'}`}>
              {status}
            </div>
            {isConnected && (
                <p className="text-white/40 text-xs tracking-widest uppercase animate-pulse">
                   {activeMode === AgentMode.SOL ? 'Echo Listening...' : 'Atlas Analyzing...'}
                </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-black border border-white/10 rounded-3xl p-8 min-h-[250px] flex flex-col justify-end gap-4 font-mono text-sm shadow-xl">
        <h4 className="text-white uppercase tracking-[0.4em] mb-4 border-b border-white/5 pb-4 flex justify-between font-black text-xs">
          <span>Neural Feed</span>
          <span className="text-[#D4AF37]">Live</span>
        </h4>
        {transcripts.map((t, i) => (
          <div key={i} className={`p-4 rounded-2xl ${t.startsWith('AI') ? 'text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/10' : 'text-white bg-white/5'}`}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceAgent;

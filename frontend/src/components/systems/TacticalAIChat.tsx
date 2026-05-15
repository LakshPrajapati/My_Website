import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../hooks/useChat';
import { cn } from '../../design-system/materials';
import { useAudioPsychology } from '../../hooks/useAudioPsychology';

const TacticalAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, loading, error } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useAudioPsychology();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      sendMessage(input);
      setInput('');
      playClick();
    }
  };

  return (
    <>
      {/* Floating Tactical Trigger */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); playClick(); }}
        onMouseEnter={playHover}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full bg-[#0a0d14]/80 backdrop-blur-xl border border-elite-cyan/30 flex items-center justify-center group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-elite-cyan/10 group-hover:bg-elite-cyan/20 transition-colors" />
        <div className={cn(
          "w-2 h-2 rounded-full bg-elite-cyan shadow-[0_0_10px_#00f0ff] animate-pulse-slow",
          isOpen && "bg-elite-cyan scale-125 shadow-[0_0_15px_#00f0ff]"
        )} />
        {/* Radar Ring */}
        <div className="absolute inset-0 rounded-full border border-elite-cyan/20 animate-ping opacity-20" />
      </motion.button>

      {/* Chat Terminal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-[100] w-[350px] sm:w-[400px] h-[500px] bg-[#0a0d14]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header: Tactical Metadata */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-elite-cyan tracking-[0.2em] uppercase">SYSTEM: LAKSH.OS_AI</span>
                <span className="font-mono text-[7px] text-elite-muted/50 tracking-[0.3em] mt-1 uppercase">ENCRYPTION: RSA-4096 / ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[8px] text-elite-muted uppercase tracking-widest">Online</span>
              </div>
            </div>

            {/* Message Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
            >
              <div className="space-y-1">
                <p className="font-mono text-[9px] text-elite-cyan/40 uppercase tracking-widest">[SYSTEM_INIT]</p>
                <p className="font-sans text-xs text-elite-muted/70 leading-relaxed">
                  LAKSH.OS Intelligence Kernel active. Operational directives established. State your strategic inquiry.
                </p>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "space-y-1",
                  msg.role === 'user' ? "items-end text-right" : "items-start"
                )}>
                  <p className="font-mono text-[8px] text-elite-cyan/30 uppercase tracking-widest">
                    [{msg.role === 'user' ? 'AGENT' : 'LAKSH.OS'}]
                  </p>
                  <div className={cn(
                    "inline-block max-w-[85%] p-3 rounded-sm font-sans text-xs leading-relaxed transition-all",
                    msg.role === 'user' 
                      ? "bg-white/5 border border-white/10 text-white/80" 
                      : "bg-elite-cyan/5 border border-elite-cyan/20 text-elite-cyan/90 shadow-[inset_0_0_20px_rgba(0,229,255,0.05)]"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="space-y-2 animate-pulse">
                  <p className="font-mono text-[8px] text-elite-cyan/30 uppercase tracking-widest">[LAKSH.OS]</p>
                  <div className="w-12 h-4 bg-elite-cyan/10 rounded-sm" />
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-sm">
                  <p className="font-mono text-[9px] text-red-400 whitespace-pre-wrap leading-loose">
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* Input Layer */}
            <form onSubmit={handleSubmit} className="p-4 bg-white/[0.02] border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="AWAITING INSTRUCTION..."
                  disabled={loading}
                  className="w-full bg-black/40 border border-white/5 border-b-white/20 px-4 py-3 font-mono text-[10px] text-white tracking-widest focus:outline-none focus:border-b-elite-cyan transition-all placeholder:text-elite-muted/20"
                />
                <button 
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="absolute right-2 p-2 text-elite-cyan/40 hover:text-elite-cyan transition-colors disabled:opacity-20"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <div className="mt-2 flex justify-between items-center px-1">
                <span className="font-mono text-[6px] text-elite-muted/30 tracking-[0.4em] uppercase">Status: Awaiting Command</span>
                <span className="font-mono text-[6px] text-elite-muted/30 tracking-[0.4em] uppercase">V2.4.0</span>
              </div>
            </form>

            {/* Tactical Scanline */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
              <div className="w-full h-[1px] bg-white animate-[scan_4s_linear_infinite]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TacticalAIChat;

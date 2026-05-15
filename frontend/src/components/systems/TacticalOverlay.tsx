import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../design-system/materials';
import { useAudioPsychology } from '../../hooks/useAudioPsychology';

interface TacticalOverlayProps {
  children: React.ReactNode;
  id: string;
  status?: 'ACTIVE' | 'STANDBY' | 'SECURE';
  className?: string;
  delay?: number;
}

const TacticalOverlay: React.FC<TacticalOverlayProps> = ({ children, id, status = 'ACTIVE', className, delay = 0 }) => {
  const { playHover } = useAudioPsychology();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={playHover}
      className={cn(
        "relative group rounded-xl p-[1px] overflow-hidden",
        "bg-gradient-to-br from-white/10 via-transparent to-black/50",
        "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Liquid Glass Background */}
      <div className="absolute inset-[1px] bg-[#0B1020]/60 backdrop-blur-3xl rounded-xl z-0 pointer-events-none" />
      
      {/* Operational Metadata / Frame */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 p-3 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-1 h-1 bg-elite-cyan rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-elite-cyan tracking-[0.12em] uppercase">{id}</span>
          </div>
          <span className="font-mono text-[9px] text-elite-muted/40 tracking-widest opacity-30">
            [{new Date().toISOString().split('T')[1].substring(0, 8)}]
          </span>
        </div>
        
        <div className="flex justify-between items-end opacity-20">
          <div className="w-4 h-4 border-b border-l border-white/30 rounded-bl-sm" />
          <div className="font-mono text-[8px] text-white/50 tracking-[0.2em] uppercase">{status}</div>
          <div className="w-4 h-4 border-b border-r border-white/30 rounded-br-sm" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
};

export default TacticalOverlay;

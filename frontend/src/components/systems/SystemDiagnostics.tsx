import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SystemDiagnostics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    cpu: 12,
    mem: 34,
    ai: 99.8,
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setMetrics({
          cpu: Math.floor(Math.random() * 30) + 10,
          mem: Math.floor(Math.random() * 20) + 30,
          ai: 99 + Math.random() * 0.9,
        });
      }, 500);
    } else {
      setMetrics({ cpu: 12, mem: 34, ai: 99.8 });
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="p-6 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-sm cursor-crosshair group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scanning effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-elite-cyan/20 animate-scan pointer-events-none" />

      <div className="flex justify-between items-center mb-6">
        <span className="font-mono text-[9px] tracking-[0.3em] text-elite-muted/40 uppercase">System_Diagnostics</span>
        <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-elite-cyan animate-pulse' : 'bg-white/10'}`} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] tracking-widest text-elite-muted/60 uppercase">CPU_LOAD</span>
          <span className="font-mono text-[10px] text-white tracking-widest">{metrics.cpu}%</span>
        </div>
        <div className="h-[1px] w-full bg-white/5 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-elite-cyan"
            animate={{ width: `${metrics.cpu}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] tracking-widest text-elite-muted/60 uppercase">MEM_USAGE</span>
          <span className="font-mono text-[10px] text-white tracking-widest">{metrics.mem}%</span>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <span className="font-mono text-[10px] tracking-widest text-elite-muted/60 uppercase">AI_CONFIDENCE</span>
          <span className="font-mono text-[10px] text-elite-cyan tracking-widest">{metrics.ai.toFixed(1)}%</span>
        </div>
      </div>

      {/* Timestamp footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center opacity-30">
        <span className="font-mono text-[7px] tracking-widest uppercase">TS: {new Date().toLocaleTimeString()}</span>
        <span className="font-mono text-[7px] tracking-widest uppercase">NODE_ACTIVE</span>
      </div>
    </div>
  );
};

export default SystemDiagnostics;

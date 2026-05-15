import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InitializerProps {
  onComplete: () => void;
}

const Initializer: React.FC<InitializerProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('SYSTEM_BOOT');

  const stages = [
    { threshold: 0, text: 'OS.INITIALIZING_KERNEL' },
    { threshold: 25, text: 'SECURE_HANDSHAKE.INIT' },
    { threshold: 50, text: 'NEURAL_LINK.CALIBRATING' },
    { threshold: 75, text: 'SPATIAL_INTERFACE.MOUNTING' },
    { threshold: 90, text: 'ACCESS_GRANTED.WELCOME' },
  ];

  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const percent = Math.min((currentStep / steps) * 100, 100);
      setProgress(percent);

      const currentStage = stages.reduce((acc, s) => percent >= s.threshold ? s.text : acc, stages[0].text);
      setStage(currentStage);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#03050a] flex flex-col items-center justify-center p-8 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background large grid ghost */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="w-full max-w-sm relative z-10">
        {/* Central Orb Pulse */}
        <div className="flex justify-center mb-16">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 border border-elite-cyan/30 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="w-2 h-2 bg-elite-cyan rounded-full shadow-[0_0_15px_#00f0ff]" />
          </div>
        </div>

        <div className="flex justify-between items-end mb-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-elite-cyan">{stage}</span>
          <span className="font-mono text-[10px] tracking-widest text-elite-muted/50">{Math.floor(progress)}%</span>
        </div>
        
        <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-elite-cyan shadow-[0_0_10px_#00f0ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-10 font-mono text-[8px] text-elite-muted/30 tracking-[0.2em] flex flex-col gap-2">
          <div className="flex justify-between border-l border-white/10 pl-3">
            <span>PACKET_LOAD</span>
            <span className="text-white/50">STABLE</span>
          </div>
          <div className="flex justify-between border-l border-white/10 pl-3">
            <span>SECURITY_BIT</span>
            <span className="text-white/50">2048_RSA</span>
          </div>
          <div className="flex justify-between border-l border-white/10 pl-3">
            <span>ENVIRONMENT</span>
            <span className="text-white/50">SPATIAL_DARK</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Initializer;

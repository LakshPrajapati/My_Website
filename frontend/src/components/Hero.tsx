import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '../utils/animations';
import SystemDiagnostics from './systems/SystemDiagnostics';

const Hero: React.FC = () => {
  const name = "LAKSH PRAJAPATI";
  const nameChars = name.split("");

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      
      {/* Background Data Ring */}
      <motion.div 
        className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] border border-white/5 rounded-full pointer-events-none opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-elite-cyan to-transparent" />
      </motion.div>

      <div className="relative z-10 text-center w-full max-w-7xl">
        <motion.div
          variants={animations.revealDown}
          initial="hidden"
          animate="visible"
          className="mb-8 flex flex-col items-center"
        >
          <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-elite-cyan/60 uppercase mb-4">
            [ INITIALIZING_ELITE_OS_KERNEL ]
          </span>
          <div className="h-[1px] w-12 bg-elite-cyan/30" />
        </motion.div>

        {/* Hero Title - Simplified & Single Line */}
        <motion.div
          variants={animations.revealUp}
          initial="hidden"
          animate="visible"
          className="relative inline-block mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gradient-elite whitespace-nowrap overflow-visible">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -4, scale: 1.02, color: "#ffffff" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-block transition-colors duration-300"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          
          {/* Subtle underline instead of complex glass morphism */}
          <div className="absolute -bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-elite-cyan/20 to-transparent" />
        </motion.div>

        <motion.div
          variants={animations.revealUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-8"
        >
          <p className="font-sans text-sm md:text-base text-elite-muted/60 tracking-[0.2em] uppercase max-w-3xl leading-relaxed mx-auto px-4">
            Architecting high-performance spatial interfaces and strategic logic cores for the next generation of intelligence systems.
          </p>

          {/* Core Diagnostics */}
          <div className="w-full max-w-xs mt-4">
            <SystemDiagnostics />
          </div>
        </motion.div>
      </div>

      {/* Decorative Corner Telemetry */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20 font-mono text-[8px] tracking-[0.3em] text-elite-muted uppercase">
        <p>COORDINATES: 23.0225° N, 72.5714° E</p>
        <p className="mt-1">LOCAL_TIME: {new Date().toLocaleTimeString()}</p>
      </div>
    </section>
  );
};

export default Hero;

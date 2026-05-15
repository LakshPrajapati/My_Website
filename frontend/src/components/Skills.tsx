import React from 'react';
import { motion } from 'framer-motion';
import TacticalOverlay from './systems/TacticalOverlay';
import ClassifiedHeader from './systems/ClassifiedHeader';

const Skills: React.FC = () => {
  const capabilities = [
    { category: "NEURAL LOGIC (BACKEND)", level: 92, status: "NOMINAL", items: ["Node.js", "Express", "Python", "REST APIs", "Microservices"] },
    { category: "SPATIAL UI (FRONTEND)", level: 88, status: "OPTIMIZED", items: ["React", "TypeScript", "Tailwind", "Framer Motion", "Three.js"] },
    { category: "DATA CORES (DATABASE)", level: 85, status: "SECURE", items: ["MongoDB", "PostgreSQL", "Redis", "Prisma"] },
    { category: "HARDWARE INTERFACES", level: 80, status: "CALIBRATING", items: ["C++", "Arduino", "IoT Sensors", "Serial Comms"] }
  ];

  return (
    <section id="skills" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
      
      <ClassifiedHeader 
        moduleNumber="02" 
        title="CAPABILITY EVALUATION" 
        subtitle="ANALYZING SYSTEMIC PROFICIENCY ACROSS 4 CRITICAL VECTORS." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {capabilities.map((cap, index) => (
          <TacticalOverlay 
            key={index}
            id={`CAP.${index + 1}`}
            status={cap.status as any}
            delay={index * 0.1}
          >
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-6">
                <h4 className="font-display text-[11px] md:text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
                  {cap.category}
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl text-elite-cyan font-bold tracking-tight">
                    {cap.level}
                  </span>
                  <span className="font-mono text-[9px] text-elite-muted tracking-widest">%</span>
                </div>
              </div>

              {/* Advanced HUD Progress Bar */}
              <div className="h-[1px] w-full bg-white/5 relative mb-8">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-elite-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cap.level}%` }}
                  transition={{ duration: 2, ease: "circOut", delay: 0.5 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  {/* Leading bright edge */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white shadow-[0_0_10px_#00f0ff]" />
                </motion.div>
                
                {/* Metric notches */}
                <div className="absolute top-[-2px] left-[25%] w-[1px] h-[5px] bg-white/20" />
                <div className="absolute top-[-2px] left-[50%] w-[1px] h-[5px] bg-white/20" />
                <div className="absolute top-[-2px] left-[75%] w-[1px] h-[5px] bg-white/20" />
              </div>

              {/* Data Points */}
              <div className="flex flex-wrap gap-2">
                {cap.items.map((item, i) => (
                  <span 
                    key={i} 
                    className="font-mono text-[9px] tracking-[0.12em] uppercase text-elite-muted/70 bg-black/40 border border-white/5 px-2 py-1 rounded-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </TacticalOverlay>
        ))}
      </div>

    </section>
  );
};

export default Skills;

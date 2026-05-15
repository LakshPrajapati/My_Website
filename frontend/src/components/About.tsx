import React from 'react';
import TacticalOverlay from './systems/TacticalOverlay';
import ClassifiedHeader from './systems/ClassifiedHeader';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto overflow-hidden">
      
      <ClassifiedHeader 
        moduleNumber="01" 
        title="IDENTITY ANALYSIS" 
        subtitle="EXTRACTING BIOMETRIC AND PROFESSIONAL PROFILE DATA." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Image Node */}
        <div className="lg:col-span-5 relative">
          <TacticalOverlay id="IMG.SCAN_FEED" status="SECURE" className="p-2 border-none bg-transparent">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm group">
              {/* Scanline Effect Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-30" />
              
              <img 
                src="/profile.jpg" 
                alt="Laksh Prajapati" 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />
              
              {/* Face Tracking HUD elements */}
              <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-elite-cyan/40" />
              <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-elite-cyan/40" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-elite-cyan/20 animate-pulse" />
            </div>
          </TacticalOverlay>
        </div>

        {/* Narrative Intel */}
        <div className="lg:col-span-7 space-y-8">
          <TacticalOverlay id="BIO.DATA_STREAM" className="bg-transparent border-none p-0">
            <div className="space-y-6">
              <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-gradient-elite">
                LEAD INTELLIGENCE ARCHITECT
              </h3>
              <p className="font-sans text-base md:text-lg text-elite-muted/80 leading-relaxed max-w-2xl">
                Specializing in the development of highly resilient digital architectures. My focus lies at the intersection of <span className="text-elite-cyan">complex backend logic</span> and <span className="text-white">immersive spatial design</span>. I build systems that don't just function—they dominate their environment.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="border-l border-elite-cyan/30 pl-4">
                  <span className="block font-mono text-[10px] tracking-widest text-elite-muted/40 uppercase mb-1">Status</span>
                  <span className="font-mono text-xs text-elite-cyan tracking-widest uppercase">Active Deployment</span>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <span className="block font-mono text-[10px] tracking-widest text-elite-muted/40 uppercase mb-1">Clearance</span>
                  <span className="font-mono text-xs text-white/60 tracking-widest uppercase">Level 5 (Admin)</span>
                </div>
              </div>
            </div>
          </TacticalOverlay>
        </div>
      </div>

    </section>
  );
};

export default About;

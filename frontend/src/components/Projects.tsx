import React from 'react';
import TacticalOverlay from './systems/TacticalOverlay';
import ClassifiedHeader from './systems/ClassifiedHeader';

const Projects: React.FC = () => {
  const operations = [
    {
      title: 'OP: SMART BLIND GLASSES',
      type: 'HARDWARE / SOFTWARE INTERFACE',
      status: 'DEPLOYED',
      description: 'An assistive hardware system utilizing ultrasonic sensors and Python backend logic. Processes spatial data in realtime to provide auditory navigation for visually impaired users.',
      tech: ['Python', 'Sensors', 'Audio', 'Microcontroller'],
      link: '#'
    },
    {
      title: 'OP: NEXT-GEN PORTFOLIO',
      type: 'SPATIAL WEB UI',
      status: 'ACTIVE',
      description: 'A cinematic, visionOS-inspired tactical intelligence interface. Built using advanced WebGL neural networking and hardware-accelerated Framer Motion.',
      tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind'],
      link: '#'
    }
  ];

  return (
    <section id="projects" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
      
      <ClassifiedHeader 
        moduleNumber="03" 
        title="OPERATIONS DATABASE" 
        subtitle="ARCHIVED TACTICAL DEPLOYMENTS AND ACTIVE SYSTEM BUILDS." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {operations.map((op, index) => (
          <TacticalOverlay 
            key={index}
            id={`ARCHIVE.${index + 1}`}
            status={op.status as any}
            className="flex flex-col h-full"
            delay={index * 0.2}
          >
            <div className="flex flex-col h-full relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-mono text-[8px] md:text-[9px] text-elite-cyan/60 tracking-[0.2em] uppercase">{op.type}</span>
                  <h4 className="font-display text-lg md:text-xl font-bold mt-2 group-hover:text-elite-cyan transition-colors duration-300 tracking-tight text-gradient-elite">
                    {op.title}
                  </h4>
                </div>
              </div>

              <p className="text-elite-muted/70 font-sans text-sm md:text-base mb-8 leading-relaxed">
                {op.description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {op.tech.map((t, i) => (
                    <span key={i} className="font-mono text-[8px] md:text-[9px] text-elite-muted/50 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>

                <a 
                  href={op.link} 
                  className="inline-flex items-center gap-2 font-mono text-[10px] text-white tracking-[0.15em] hover:text-elite-cyan transition-colors uppercase"
                >
                  EXTRACT DATA <span className="text-elite-cyan">→</span>
                </a>
              </div>
            </div>

            {/* Scanning Laser Effect on Hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-elite-cyan opacity-0 group-hover:opacity-50 transform -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[2000ms] ease-in-out pointer-events-none shadow-[0_0_15px_#00f0ff]" />
          </TacticalOverlay>
        ))}
      </div>

    </section>
  );
};

export default Projects;

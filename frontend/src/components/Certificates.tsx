import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '../utils/animations';
import TacticalOverlay from './systems/TacticalOverlay';
import ClassifiedHeader from './systems/ClassifiedHeader';

const Certificates: React.FC = () => {
  const records = [
    { title: 'Introduction to Machine Learning', issuer: 'Coursera', date: 'MAY.2026', id: 'CR-9042-ML', conf: '99.9%' },
    { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'APR.2026', id: 'AW-109X-CP', conf: '98.4%' },
    { title: 'Full Stack Web Development', issuer: 'Udemy', date: 'MAR.2026', id: 'UD-7741-FS', conf: '99.1%' }
  ];

  return (
    <section id="certificates" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
      
      <ClassifiedHeader 
        moduleNumber="04" 
        title="SYSTEM ACCESS TERMINAL" 
        subtitle="VERIFIED CERTIFICATIONS AND ACCREDITATIONS LOG." 
      />

      <TacticalOverlay id="TERMINAL.ROOT" className="p-0 sm:p-0">
        {/* Terminal Header Row */}
        <div className="grid grid-cols-12 gap-2 md:gap-4 p-4 md:p-6 border-b border-white/5 font-mono text-[9px] text-elite-muted/40 tracking-[0.2em] bg-[#03050a]/80 uppercase">
          <div className="col-span-3 md:col-span-2">REF_ID</div>
          <div className="col-span-9 md:col-span-5">CERTIFICATION_LOG</div>
          <div className="col-span-8 md:col-span-3 hidden md:block">ISSUING_NODE</div>
          <div className="col-span-2 hidden md:block text-right">TIMESTAMP</div>
        </div>

        {/* Terminal Records */}
        <div className="divide-y divide-white/5 bg-black/20">
          {records.map((rec, index) => (
            <motion.div 
              key={index}
              variants={animations.revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-12 gap-2 md:gap-4 p-4 md:p-6 items-center hover:bg-white/5 transition-colors group cursor-crosshair relative overflow-hidden"
            >
              {/* Highlight bar on hover */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-elite-cyan opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="col-span-3 md:col-span-2 font-mono text-[10px] text-elite-cyan/40 group-hover:text-elite-cyan transition-colors tracking-widest">
                {rec.id}
              </div>
              
              <div className="col-span-9 md:col-span-5 flex flex-col gap-1">
                <span className="font-display text-sm md:text-base font-medium transition-colors tracking-normal text-gradient-elite">
                  {rec.title}
                </span>
                {/* Mobile view issuer fallback */}
                <span className="md:hidden font-mono text-[8px] text-elite-muted/50 uppercase tracking-widest">{rec.issuer}</span>
              </div>

              <div className="col-span-8 md:col-span-3 hidden md:block font-sans text-xs md:text-sm text-elite-muted/60 group-hover:text-elite-muted transition-colors">
                {rec.issuer}
              </div>

              <div className="col-span-2 hidden md:block text-right font-mono text-[10px] text-elite-muted/30">
                {rec.date}
              </div>
            </motion.div>
          ))}
        </div>
      </TacticalOverlay>

    </section>
  );
};

export default Certificates;

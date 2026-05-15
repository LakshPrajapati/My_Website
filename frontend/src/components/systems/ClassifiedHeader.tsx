import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '../../utils/animations';

interface ClassifiedHeaderProps {
  moduleNumber: string;
  title: string;
  subtitle: string;
}

const ClassifiedHeader: React.FC<ClassifiedHeaderProps> = ({ moduleNumber, title, subtitle }) => {
  const titleChars = title.split("");

  return (
    <div className="relative mb-24 group/header">
      {/* Background Module Number */}
      <div className="module-bg-number opacity-[0.015] -translate-x-10 -translate-y-10 group-hover/header:opacity-[0.02] transition-opacity duration-1000">
        {moduleNumber}
      </div>

      <motion.div
        variants={animations.revealDown}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        {/* MOD Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] tracking-[0.4em] text-elite-cyan/60 uppercase">
            [ MOD.{moduleNumber} ]
          </span>
          <div className="h-[1px] w-12 bg-elite-cyan/20" />
        </div>

        <div className="flex flex-col items-start">
          {/* Section Title - Simplified */}
          <div className="relative inline-block py-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight uppercase text-gradient-elite flex flex-wrap">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{ 
                    y: -2,
                    scale: 1.02,
                    color: "#ffffff"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="inline-block transition-colors duration-300"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
            
            {/* Minimal Underline Indicator */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-elite-cyan/20 w-0 group-hover/header:w-full transition-all duration-700 ease-out" />
          </div>
          
          <motion.p 
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 0.8 }}
            className="mt-6 font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase max-w-xl text-gradient-elite opacity-60"
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default ClassifiedHeader;

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SignatureDecryption: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Neural Zoom effect based on scroll
  const scale = useTransform(scrollY, [0, 500], [1, 5]);
  const opacity = useTransform(scrollY, [200, 500], [0, 1]);
  const containerOpacity = useTransform(scrollY, [0, 300, 600], [1, 0.5, 0]);

  const [decryptedText, setDecryptedText] = useState('LAKSH.OS');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Array(8).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
      setDecryptedText(random);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* The Neural Lock Graphic */}
      <motion.div 
        style={{ scale, opacity: containerOpacity }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-32 h-32 md:w-48 md:h-48 border border-elite-cyan/30 rounded-full flex items-center justify-center relative">
          {/* Rotating Rings */}
          <motion.div 
            className="absolute inset-0 border-t border-elite-cyan rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-4 border-b border-white/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] md:text-xs text-elite-cyan tracking-[0.3em] mb-2 uppercase">DECRYPTING</span>
            <span className="font-mono text-xl md:text-2xl text-white tracking-widest font-bold">{decryptedText}</span>
          </div>
        </div>
      </motion.div>

      {/* Background Cascading Strings */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 gap-4 p-8 opacity-20 pointer-events-none"
      >
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="font-mono text-[8px] md:text-[10px] text-elite-cyan/20 truncate uppercase">
            {Array(10).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('')}
          </div>
        ))}
      </motion.div>

      {/* Signature Message */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="font-mono text-[10px] text-elite-muted/40 tracking-[0.5em] uppercase mb-4">SCROLL_TO_AUTHORIZE</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-elite-cyan/40 to-transparent" />
      </motion.div>
    </div>
  );
};

export default SignatureDecryption;

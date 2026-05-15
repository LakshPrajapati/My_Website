import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../design-system/materials';

const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-elite-cyan rounded-full pointer-events-none z-[10000] mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Reactive Lens / Glow */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999] border border-elite-cyan/30 flex items-center justify-center",
          isHovering ? "bg-elite-cyan/10 backdrop-blur-sm" : "bg-transparent"
        )}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        {isHovering && (
          <motion.div 
            className="w-1 h-1 bg-elite-cyan rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </>
  );
};

export default Cursor;

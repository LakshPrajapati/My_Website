import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '../design-system/materials';
import { useAudioPsychology } from '../hooks/useAudioPsychology';
import UserPanel from './auth/UserPanel';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('00_HOME');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { playHover, playClick } = useAudioPsychology();

  const navLinks = [
    { id: '00_HOME', name: 'OVERVIEW', href: '#home', subId: 'BOOT.00' },
    { id: '01_PROFILE', name: 'INTELLIGENCE', href: '#about', subId: 'ANALYSIS.01' },
    { id: '02_MATRIX', name: 'CAPABILITY', href: '#skills', subId: 'EVAL.02' },
    { id: '03_OPS', name: 'OPERATIONS', href: '#projects', subId: 'OPS.03' },
    { id: '04_ACHIEVEMENTS', name: 'TERMINAL', href: '#certificates', subId: 'ACCESS.04' },
    { id: '05_SECURE', name: 'COMMS', href: '#contact', subId: 'TX.05' },
  ];

  // Dynamic values based on scroll
  const width = useTransform(scrollY, [0, 100], ['100%', 'auto']);
  const y = useTransform(scrollY, [0, 100], [0, 16]);
  const borderRadius = useTransform(scrollY, [0, 100], ['0px', '100px']);
  
  useEffect(() => {
    const handleScroll = (latest: number) => {
      setIsScrolled(latest > 50);
    };
    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    playClick();
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[60] flex justify-center px-4 pointer-events-none"
        style={{ y }}
      >
        <motion.div
          className={cn(
            "flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-700 ease-out pointer-events-auto",
            isScrolled 
              ? "bg-[#0a0d14]/80 backdrop-blur-3xl border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.9)]" 
              : "bg-transparent border-transparent"
          )}
          style={{ width, borderRadius }}
        >
          {/* System Identifier */}
          <div className="flex items-center gap-3 md:gap-4 group cursor-pointer" onMouseEnter={playHover}>
            <div className="relative w-8 h-8 rounded-full bg-elite-cyan/10 border border-elite-cyan/30 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,240,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
               <div className="w-1.5 h-1.5 bg-elite-cyan rounded-full animate-pulse-slow shadow-[0_0_10px_#00f0ff]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[9px] md:text-[10px] tracking-[0.2em] font-semibold leading-none text-gradient-elite">
                LAKSH.OS <span className="hidden sm:inline text-elite-cyan/60 font-mono">v4.2.9</span>
              </span>
              <span className="font-mono text-[6px] md:text-[7px] text-elite-muted/50 tracking-widest mt-1 uppercase">SECURE_ENVIRONMENT</span>
            </div>
          </div>

          {/* Tactical Navigation Links (Desktop) */}
          <ul className="hidden lg:flex items-center gap-0 mx-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href}
                  onClick={() => { setActiveItem(link.id); playClick(); }}
                  onMouseEnter={playHover}
                  className="relative px-5 py-2 group flex flex-col items-center"
                >
                  <span className="font-mono text-[7px] text-elite-cyan/40 tracking-widest mb-1 group-hover:text-elite-cyan/80 transition-colors">
                    {link.subId}
                  </span>
                  <span className={cn(
                    "relative z-10 text-[9px] font-display font-medium tracking-[0.3em] transition-all duration-300",
                    activeItem === link.id ? "text-elite-white" : "text-elite-muted group-hover:text-elite-white"
                  )}>
                    {link.name}
                  </span>
                  
                  {activeItem === link.id && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-elite-cyan shadow-[0_0_8px_#00f0ff]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions & Telemetry */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden xl:flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="text-[7px] font-mono text-elite-muted uppercase tracking-[0.3em]">NET_TX</span>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-1 h-2 rounded-full ${i <= 2 ? 'bg-elite-cyan' : 'bg-white/10'} animate-pulse`} />
                ))}
              </div>
            </div>
            
            <UserPanel />
            
            <button 
              className="lg:hidden p-2 text-elite-white hover:text-elite-cyan transition-colors z-50"
              onClick={toggleMenu}
              onMouseEnter={playHover}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="4" y1="9" x2="20" y2="9"></line>
                    <line x1="4" y1="15" x2="20" y2="15"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[55] bg-[#03050a]/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            
            <ul className="flex flex-col items-center gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a 
                    href={link.href}
                    onClick={() => { setIsMenuOpen(false); playClick(); }}
                    className="flex flex-col items-center group"
                  >
                    <span className="font-mono text-[8px] text-elite-cyan/40 tracking-[0.4em] mb-2">{link.subId}</span>
                    <span className="font-display text-xl tracking-[0.5em] text-elite-muted group-hover:text-elite-white transition-colors">{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            
            <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-4 opacity-30">
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="font-mono text-[7px] tracking-[0.5em] text-elite-muted">ENCRYPTED_CONNECTION</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import React from 'react';
import { Github, Linkedin, Code2, Mail } from 'lucide-react';

const Footer: React.FC = () => {

  const networkNodes = [
    { name: 'GITHUB', icon: Github, link: 'https://github.com/LakshPrajapati' },
    { name: 'LINKEDIN', icon: Linkedin, link: 'https://www.linkedin.com/in/lakshya-prajapati-261abb392/' },
    { name: 'LEETCODE', icon: Code2, link: 'https://leetcode.com/u/laksh_prajapati/' },
    { name: 'EMAIL', icon: Mail, link: 'mailto:lakshprajapatiofficial@gmail.com' },
  ];

  return (
    <footer className="relative w-full bg-[#030408] pt-20 pb-10 overflow-hidden">
      
      {/* Subtle Environmental Activity: Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-elite-cyan/20 opacity-30 transform -translate-x-full animate-[scan_8s_ease-in-out_infinite]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* CENTER IDENTITY SECTION */}
        <div className="flex flex-col items-center text-center space-y-8">
          {/* LP LOGO MARK - Intelligence Core (Spherized) */}
          <div className="relative group">
            <div className="absolute -inset-6 bg-elite-cyan/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative w-20 h-20 flex items-center justify-center border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
              {/* Spherical Gloss/Refraction */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60" />
              <div className="absolute top-2 left-4 w-6 h-3 bg-white/10 rounded-full blur-[2px] rotate-[-20deg]" />
              
              <span className="relative z-10 font-display text-2xl font-light text-white tracking-[0.2em] drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                LP
              </span>
              
              {/* Core Pulse Indicator */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-elite-cyan/80 rounded-full animate-pulse shadow-[0_0_8px_#00f0ff]" />
            </div>
          </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="font-display text-base md:text-lg font-bold tracking-[0.5em] leading-none ml-[0.5em] uppercase text-gradient-elite">LAKSH PRAJAPATI</h2>
              <div className="h-[1px] w-12 bg-elite-cyan/10" />
              <p className="font-mono text-[9px] text-elite-muted/30 tracking-[0.3em] uppercase leading-relaxed max-w-[320px]">
                CLASSIFIED INTELLIGENCE OS • ALL DATA STRICTLY MONITORED
              </p>
            </div>
        </div>

        {/* HORIZONTAL CHANNELS (Authorized Network) */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {networkNodes.map((node, i) => (
            <a
              key={i}
              href={node.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all duration-300"
            >
              <div className="p-3.5 rounded-full border border-white/5 bg-white/[0.02] group-hover:border-elite-cyan/30 group-hover:bg-elite-cyan/5 transition-all shadow-lg">
                <node.icon className="w-4 h-4 text-elite-muted/50 group-hover:text-elite-cyan transition-colors" />
              </div>
              <span className="font-mono text-[8px] text-elite-muted/20 group-hover:text-elite-cyan/40 tracking-[0.2em] transition-colors uppercase font-medium">
                {node.name}
              </span>
            </a>
          ))}
        </div>

        {/* FOOTER BOTTOM (Metadata) */}
        <div className="w-full mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-10">
          <div className="flex gap-4 font-mono text-[8px] tracking-[0.2em] uppercase">
            <span>PACKET: 0x99A4</span>
            <span>TX_VALID: TRUE</span>
          </div>
          <div className="font-mono text-[8px] tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} INTELLIGENCE CORE. ALL DIRECTIVES RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

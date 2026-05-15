import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../design-system/materials';
import TacticalOverlay from './systems/TacticalOverlay';
import ClassifiedHeader from './systems/ClassifiedHeader';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmitStatus, setTransmitStatus] = useState<'IDLE' | 'ENCRYPTING' | 'TRANSMITTING' | 'SUCCESS' | 'FAILED'>('IDLE');
  
  // Fake signal analysis graph heights
  const [signal, setSignal] = useState(Array.from({length: 20}, () => Math.random() * 100));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (transmitStatus === 'TRANSMITTING') {
      interval = setInterval(() => {
        setSignal(Array.from({length: 20}, () => Math.random() * 100));
      }, 100);
    } else {
      setSignal(Array.from({length: 20}, () => 10)); // Flatline when idle
    }
    return () => clearInterval(interval);
  }, [transmitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transmitStatus !== 'IDLE' && transmitStatus !== 'FAILED' && transmitStatus !== 'SUCCESS') return;
    
    setIsSubmitting(true);
    setTransmitStatus('ENCRYPTING');
    
    // Fake encryption delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTransmitStatus('TRANSMITTING');

    try {
      const response = await fetch('https://formspree.io/f/xojrovav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setTransmitStatus('SUCCESS');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setTransmitStatus('IDLE'), 5000);
      } else {
        setTransmitStatus('FAILED');
        setTimeout(() => setTransmitStatus('IDLE'), 4000);
      }
    } catch (error) {
      setTransmitStatus('FAILED');
      setTimeout(() => setTransmitStatus('IDLE'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClasses = "w-full bg-black/40 border border-white/5 border-b-white/20 rounded-sm px-4 py-3 text-elite-white placeholder:text-elite-muted/30 font-sans text-sm focus:outline-none focus:border-b-elite-cyan transition-all";

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
      
      <ClassifiedHeader 
        moduleNumber="05" 
        title="ENCRYPTED GATEWAY" 
        subtitle="SECURE TRANSMISSION PROTOCOL. ALL PACKETS ARE E2E ENCRYPTED." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Signal Analysis / Telemetry */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <TacticalOverlay id="SYS.TELEMETRY" className="p-6">
            <h4 className="font-mono text-[9px] text-elite-muted/40 tracking-[0.2em] uppercase mb-6 border-b border-white/5 pb-2">SIGNAL_ANALYSIS</h4>
            
            {/* Fake Audio/Signal Graph */}
            <div className="h-24 flex items-end justify-between gap-1 mb-6 opacity-60">
              {signal.map((height, i) => (
                <motion.div 
                  key={i}
                  className="w-full bg-elite-cyan/80 rounded-t-sm"
                  animate={{ height: `${height}%` }}
                  transition={{ type: 'tween', duration: 0.1 }}
                />
              ))}
            </div>

            <div className="space-y-4 font-mono text-[10px] tracking-widest uppercase">
              <div className="flex justify-between border-l border-elite-cyan/30 pl-3">
                <span className="text-elite-muted/40">CHANNEL_STATUS</span>
                <span className={transmitStatus === 'IDLE' ? 'text-white/60' : 'text-elite-cyan animate-pulse'}>
                  {transmitStatus === 'IDLE' ? 'LISTENING' : transmitStatus}
                </span>
              </div>
              <div className="flex justify-between border-l border-white/10 pl-3">
                <span className="text-elite-muted/40">ENCRYPTION</span>
                <span className="text-green-500/60">RSA-4096</span>
              </div>
              <div className="flex justify-between border-l border-white/10 pl-3">
                <span className="text-elite-muted/40">TARGET_NODE</span>
                <span className="text-white/40">LAKSH_CORE_HQ</span>
              </div>
            </div>
          </TacticalOverlay>
        </div>

        {/* Transmission Form */}
        <div className="col-span-1 lg:col-span-7">
          <TacticalOverlay id="TX.DATA_PACKET" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-mono text-[9px] text-elite-muted/40 tracking-[0.2em] uppercase mb-2">IDENTIFICATION_KEY</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder="Enter your identity" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[9px] text-elite-muted/40 tracking-[0.2em] uppercase mb-2">RETURN_SIGNAL (EMAIL)</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="Enter return address" disabled={isSubmitting} />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block font-mono text-[9px] text-elite-muted/40 tracking-[0.2em] uppercase mb-2">DIRECTIVE_SUBJECT</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClasses} placeholder="Context of transmission" disabled={isSubmitting} />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-mono text-[9px] text-elite-muted/40 tracking-[0.2em] uppercase mb-2">PAYLOAD_DATA</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className={cn(inputClasses, "resize-none")} placeholder="Type your payload..." disabled={isSubmitting}></textarea>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  type="submit" 
                  disabled={isSubmitting || transmitStatus === 'SUCCESS'}
                  className={cn(
                    "w-full font-display text-[11px] font-bold tracking-[0.3em] py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 uppercase",
                    transmitStatus === 'SUCCESS' ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                    transmitStatus === 'FAILED' ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                    "bg-elite-cyan/5 hover:bg-elite-cyan/10 border border-elite-cyan/20 text-elite-cyan disabled:opacity-50"
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.span key={transmitStatus} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {transmitStatus === 'IDLE' && 'INITIATE TRANSMISSION'}
                      {transmitStatus === 'ENCRYPTING' && 'ENCRYPTING PAYLOAD...'}
                      {transmitStatus === 'TRANSMITTING' && 'UPLOADING DATA...'}
                      {transmitStatus === 'SUCCESS' && 'PACKET RECEIVED.'}
                      {transmitStatus === 'FAILED' && 'TRANSMISSION FAILED. RETRY.'}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </TacticalOverlay>
        </div>

      </div>
    </section>
  );
};

export default Contact;

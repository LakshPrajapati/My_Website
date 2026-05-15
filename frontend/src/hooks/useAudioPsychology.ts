import { useCallback, useRef, useEffect } from 'react';

export const useAudioPsychology = () => {
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize on first user interaction to comply with browser autoplay policies
    const initAudio = () => {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const playClick = useCallback(() => {
    if (!audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.current.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.05);
  }, []);

  const playHover = useCallback(() => {
    if (!audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, audioCtx.current.currentTime);
    
    gainNode.gain.setValueAtTime(0.02, audioCtx.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  }, []);

  const playSystemHum = useCallback(() => {
    if (!audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, audioCtx.current.currentTime); // Low hum
    
    gainNode.gain.setValueAtTime(0, audioCtx.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.03, audioCtx.current.currentTime + 1);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.current.currentTime + 3);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 3);
  }, []);

  return { playClick, playHover, playSystemHum };
};

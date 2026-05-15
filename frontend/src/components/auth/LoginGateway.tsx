import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Github, Chrome, Shield, Lock } from 'lucide-react';

const LoginGateway: React.FC = () => {
  const { signInWithGoogle, signInWithGithub } = useAuth();

  return (
    <div className="min-h-screen bg-[#03050a] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
      
      {/* Cinematic Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-elite-cyan/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-elite-purple/5 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-[#0a0d14]/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-elite-cyan tracking-[0.4em] uppercase">Tactical Access Terminal</span>
            <span className="font-mono text-[7px] text-elite-muted/50 tracking-[0.3em] mt-1 uppercase">LAKSH.OS / AUTH_PROX_v4.2</span>
          </div>
          <Lock className="w-4 h-4 text-elite-muted/30" />
        </div>

        {/* Identity Core */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 rounded-full bg-elite-cyan/5 border border-elite-cyan/20 flex items-center justify-center mb-6 relative group">
            <div className="absolute inset-0 rounded-full border border-elite-cyan/40 animate-ping opacity-20" />
            <Shield className="w-8 h-8 text-elite-cyan opacity-80" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-[0.3em] text-white text-center">IDENTITY VERIFICATION</h1>
          <p className="font-mono text-[9px] text-elite-muted/60 tracking-[0.2em] mt-4 uppercase text-center max-w-[280px]">
            Please provide your credentials to bridge the neural link with LAKSH.OS
          </p>
        </div>

        {/* Auth Actions */}
        <div className="space-y-4">
          <button 
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-xl transition-all group"
          >
            <Chrome className="w-5 h-5 text-elite-muted group-hover:text-white transition-colors" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-elite-muted group-hover:text-white transition-colors">GOOGLE_OAUTH</span>
          </button>

          <button 
            onClick={signInWithGithub}
            className="w-full flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-xl transition-all group"
          >
            <Github className="w-5 h-5 text-elite-muted group-hover:text-white transition-colors" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-elite-muted group-hover:text-white transition-colors">GITHUB_OAUTH</span>
          </button>
        </div>

        {/* Security Metadata */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-2 opacity-30">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[7px] tracking-[0.4em] text-elite-muted">ENCRYPTED_CONNECTION_ACTIVE</span>
          </div>
          <span className="font-mono text-[6px] tracking-[0.5em] text-elite-muted uppercase">Public Key: 0x88A...F12</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginGateway;

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

const UserPanel: React.FC = () => {
  const { profile, logout } = useAuth();

  if (!profile) return null;

  return (
    <div className="flex items-center gap-2 md:gap-4 pl-4 md:pl-6 border-l border-white/10 ml-2 md:ml-6">
      <div className="hidden md:flex flex-col items-end">
        <span className="font-mono text-[9px] text-elite-white tracking-widest leading-none uppercase truncate max-w-[120px]">
          {profile.displayName}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-[7px] text-elite-cyan tracking-[0.2em] uppercase">
            {profile.role}
          </span>
          <div className="w-[1px] h-2 bg-white/10" />
          <span className="font-mono text-[7px] text-elite-muted/60 tracking-[0.2em] uppercase">
            LVL_{profile.intelligenceLevel}
          </span>
        </div>
      </div>

      <div className="relative group cursor-pointer" onClick={logout}>
        <div className="w-9 h-9 rounded-full border border-elite-cyan/30 overflow-hidden relative bg-elite-cyan/5">
          {profile.photoURL ? (
            <img 
              src={profile.photoURL} 
              alt="Profile" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-elite-cyan/50" />
            </div>
          )}
          
          {/* Logout Overlay */}
          <div className="absolute inset-0 bg-[#03050a]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <LogOut className="w-4 h-4 text-red-500" />
          </div>
        </div>
        
        {/* Glow Ring */}
        <div className="absolute -inset-1 rounded-full border border-elite-cyan/10 group-hover:border-red-500/30 transition-colors animate-pulse-slow" />
      </div>
    </div>
  );
};

export default UserPanel;

import React from 'react';
import { WifiOff, CheckCircle } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-start gap-2.5 animate-in slide-in-from-bottom duration-300">
      <div className="p-1.5 rounded-xl bg-white/20 shrink-0">
        <WifiOff className="w-4 h-4 text-amber-200" />
      </div>
      <div className="text-xs">
        <p className="font-bold flex items-center gap-1">
          Offline Mode Active
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
        </p>
        <p className="text-[11px] text-amber-100 mt-0.5 leading-tight">
          You are browsing without internet. The 3D studio, rate card, and AI boutique concierge remain fully operational!
        </p>
      </div>
    </div>
  );
};

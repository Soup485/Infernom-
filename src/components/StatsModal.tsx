import React from 'react';
import { Trophy, Flame, Target, RotateCcw, X, Award } from 'lucide-react';

export interface GameStats {
  played: number;
  won: number;
  lost: number;
  currentStreak: number;
  maxStreak: number;
}

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  onResetStats: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onResetStats
}) => {
  if (!isOpen) return null;

  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-md bg-zinc-900 border-4 border-black p-6 shadow-[8px_8px_0px_#000] pixel-card">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white border-2 border-black bg-zinc-800 hover:bg-zinc-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-amber-500/20 border-2 border-black shadow-[2px_2px_0px_#000] text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-pixel text-sm sm:text-base font-bold text-amber-400">ESTADÍSTICAS</h2>
            <p className="font-silkscreen text-xs text-zinc-400 mt-1">REGISTRO DE PARTIDAS ARCADE</p>
          </div>
        </div>

        {/* Primary Numbers Grid in Pixel Font */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-zinc-950 border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col items-center justify-center">
            <span className="font-pixel text-xl sm:text-2xl text-white">{stats.played}</span>
            <span className="font-silkscreen text-[11px] text-zinc-400 mt-1">JUGADAS</span>
          </div>

          <div className="p-3 bg-zinc-950 border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col items-center justify-center">
            <span className="font-pixel text-xl sm:text-2xl text-emerald-400">{winRate}%</span>
            <span className="font-silkscreen text-[11px] text-zinc-400 mt-1">VICTORIAS</span>
          </div>

          <div className="p-3 bg-zinc-950 border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-pixel text-xl sm:text-2xl text-amber-400">{stats.currentStreak}</span>
            </div>
            <span className="font-silkscreen text-[11px] text-zinc-400 mt-1">RACHA ACTUAL</span>
          </div>

          <div className="p-3 bg-zinc-950 border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="font-pixel text-xl sm:text-2xl text-yellow-400">{stats.maxStreak}</span>
            </div>
            <span className="font-silkscreen text-[11px] text-zinc-400 mt-1">RÉCORD</span>
          </div>
        </div>

        {/* Detailed counts */}
        <div className="p-3 bg-black border-2 border-zinc-800 mb-6 flex items-center justify-between font-silkscreen text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>GANADAS: <strong className="text-emerald-400 font-pixel text-xs">{stats.won}</strong></span>
          </div>
          <div>
            <span>PERDIDAS: <strong className="text-red-400 font-pixel text-xs">{stats.lost}</strong></span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t-2 border-zinc-800">
          <button
            onClick={() => {
              if (window.confirm('¿Reiniciar estadísticas a cero?')) {
                onResetStats();
              }
            }}
            className="flex items-center gap-1 font-pixel text-[9px] text-zinc-400 hover:text-red-400 transition-colors py-2 px-2"
          >
            <RotateCcw className="w-3 h-3" />
            REINICIAR
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-xs border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Flame,
  Shield,
  Zap,
  Swords,
  Timer,
  ChevronRight,
  CheckCircle2,
  Lock,
  Coins,
  Home
} from 'lucide-react';
import { MapNode, OVERWORLD_NODES } from '../data/progression';

interface NodeMapProps {
  currentNodeId: string;
  unlockedNodeIds: string[];
  completedNodeIds: string[];
  pixelCoins: number;
  sessionStats: {
    laylaNodesCleared: number;
    kaleaNodesCleared: number;
    asukaNodesCleared: number;
    bossesCleared: number;
  };
  onSelectNode: (node: MapNode) => void;
  onOpenShop: () => void;
  onOpenEndings: () => void;
  onReturnToMenu?: () => void;
}

export const NodeMap: React.FC<NodeMapProps> = ({
  currentNodeId,
  unlockedNodeIds,
  completedNodeIds,
  pixelCoins,
  sessionStats,
  onSelectNode,
  onOpenShop,
  onOpenEndings,
  onReturnToMenu
}) => {
  const stages = [1, 2, 3, 4, 5];

  const getNodeBadge = (node: MapNode) => {
    if (node.type === 'boss') {
      return {
        label: 'JEFE ARCADE',
        border: 'border-amber-400 bg-amber-950/80 text-amber-300',
        icon: <Timer className="w-3.5 h-3.5 text-amber-400 animate-spin" />
      };
    }
    if (node.type === 'route_layla') {
      return {
        label: 'RUTA VERDE · LAYLA',
        border: 'border-emerald-500 bg-emerald-950/80 text-emerald-300',
        icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />
      };
    }
    if (node.type === 'route_kalea') {
      return {
        label: 'RUTA AZUL · KALEA',
        border: 'border-cyan-500 bg-cyan-950/80 text-cyan-300',
        icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />
      };
    }
    return {
      label: 'RUTA ROJA · ASUKA',
      border: 'border-red-600 bg-red-950/80 text-red-300',
      icon: <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-3 py-2 px-2 sm:px-4">
      {/* Top Bar with Coin Counter & Shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-zinc-950 border-4 border-black pixel-card shadow-[4px_4px_0_#000]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/90 border-2 border-amber-500 text-amber-300 font-pixel text-xs shadow-[2px_2px_0_#000]">
            <Coins className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{pixelCoins} PIXEL COINS</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[9px] font-pixel text-zinc-400">
            <span className="text-emerald-400">Layla: {sessionStats.laylaNodesCleared}</span>
            <span>·</span>
            <span className="text-cyan-400">Kalea: {sessionStats.kaleaNodesCleared}</span>
            <span>·</span>
            <span className="text-red-400">Asuka: {sessionStats.asukaNodesCleared}</span>
            <span>·</span>
            <span className="text-amber-400">Jefes: {sessionStats.bossesCleared}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onReturnToMenu && (
            <button
              type="button"
              onClick={onReturnToMenu}
              className="px-2.5 sm:px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-[10px] nes-btn uppercase flex items-center gap-1.5 cursor-pointer"
              title="Volver al menú principal"
            >
              <Home className="w-3.5 h-3.5" />
              <span>MENÚ</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenShop}
            className="px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white font-pixel text-[10px] nes-btn uppercase flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>TIENDA RETRO</span>
          </button>

          <button
            type="button"
            onClick={onOpenEndings}
            className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-pixel text-[10px] nes-btn uppercase flex items-center gap-1.5"
          >
            <Swords className="w-3 h-3 text-rose-400" />
            <span>FINALES</span>
          </button>
        </div>
      </div>

      {/* Overworld Map Presentation */}
      <div className="bg-zinc-900 border-4 border-black pixel-card p-3 sm:p-4 shadow-[6px_6px_0_#000] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b-2 border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-amber-400" />
            <h2 className="font-pixel text-xs sm:text-sm text-amber-400 tracking-wider">
              MAPA DE NODOS RETRO (OVERWORLD)
            </h2>
          </div>
          <span className="font-pixel text-[9px] text-zinc-400">
            SELECCIONA TU RUTA · AVANZA HACIA EL JEFE
          </span>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4 text-[8px] font-pixel">
          <div className="p-1.5 bg-emerald-950/60 border border-emerald-600/60 text-emerald-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Layla (+10 Coins · 6 HP)</span>
          </div>
          <div className="p-1.5 bg-cyan-950/60 border border-cyan-600/60 text-cyan-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Kalea (+25 Coins · 4 HP)</span>
          </div>
          <div className="p-1.5 bg-red-950/60 border border-red-600/60 text-red-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Asuka (+50 Coins · 3 HP)</span>
          </div>
          <div className="p-1.5 bg-amber-950/60 border border-amber-600/60 text-amber-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Jefe (Doble Coins · Timer)</span>
          </div>
        </div>

        {/* Stage Columns / Branching Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {stages.map((stageNum) => {
            const stageNodes = Object.values(OVERWORLD_NODES).filter((n) => n.stage === stageNum);

            return (
              <div key={stageNum} className="flex flex-col gap-2 relative">
                <div className="text-center font-pixel text-[9px] text-zinc-400 bg-zinc-950 border border-zinc-800 py-1">
                  ETAPA {stageNum} {stageNum === 3 || stageNum === 5 ? '★ BOSS' : ''}
                </div>

                <div className="flex flex-col gap-2 justify-center h-full">
                  {stageNodes.map((node) => {
                    const isUnlocked = unlockedNodeIds.includes(node.id);
                    const isCompleted = completedNodeIds.includes(node.id);
                    const isCurrent = currentNodeId === node.id;
                    const badge = getNodeBadge(node);

                    return (
                      <motion.button
                        key={node.id}
                        whileHover={isUnlocked ? { scale: 1.02 } : {}}
                        whileTap={isUnlocked ? { scale: 0.98 } : {}}
                        onClick={() => isUnlocked && onSelectNode(node)}
                        disabled={!isUnlocked}
                        className={`w-full text-left p-2.5 border-3 transition-all relative flex flex-col gap-1 ${
                          isCompleted
                            ? 'bg-zinc-900 border-zinc-600 opacity-80'
                            : isCurrent
                            ? 'bg-zinc-950 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)] ring-2 ring-amber-400'
                            : isUnlocked
                            ? 'bg-zinc-950 border-zinc-700 hover:border-zinc-400 cursor-pointer'
                            : 'bg-zinc-950/40 border-zinc-900 text-zinc-600 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {/* Status Icon */}
                        <div className="flex items-center justify-between">
                          <span className={`px-1.5 py-0.5 border text-[7px] font-pixel flex items-center gap-1 ${badge.border}`}>
                            {badge.icon}
                            {badge.label}
                          </span>

                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : !isUnlocked ? (
                            <Lock className="w-3.5 h-3.5 text-zinc-600" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                          )}
                        </div>

                        {/* Node Name */}
                        <div className="font-pixel text-[10px] text-white mt-1">
                          {node.name}
                        </div>

                        {/* Description */}
                        <div className="font-pixel text-[7.5px] text-zinc-400 leading-tight">
                          {node.description}
                        </div>

                        {/* Reward */}
                        <div className="flex items-center justify-between text-[7px] font-pixel mt-1 pt-1 border-t border-zinc-800">
                          <span className="text-amber-400 flex items-center gap-0.5">
                            <Coins className="w-2.5 h-2.5" /> +{node.rewardCoins}
                          </span>
                          <span className="text-rose-400">
                            {node.hp} VIDAS
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-zinc-950 border-4 border-black pixel-card shadow-[4px_4px_0_#000]">
        {onReturnToMenu && (
          <button
            type="button"
            onClick={onReturnToMenu}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-xs nes-btn uppercase flex items-center gap-2 cursor-pointer shadow-[2px_2px_0_#000]"
          >
            <Home className="w-4 h-4" />
            <span>← VOLVER AL MENÚ PRINCIPAL</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenShop}
            className="px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white font-pixel text-[9px] nes-btn uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>TIENDA RETRO</span>
          </button>
          <button
            type="button"
            onClick={onOpenEndings}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-pixel text-[9px] nes-btn uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <Swords className="w-3 h-3 text-rose-400" />
            <span>FINALES</span>
          </button>
        </div>
      </div>
    </div>
  );
};

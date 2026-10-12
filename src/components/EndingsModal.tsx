import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Heart, Sparkles, X, CheckCircle2, Lock, Flame, Shield, Zap, Play, Home } from 'lucide-react';
import { ShyStudentPixelSprite, ShyStudentMood } from './WaifuCompanion';
import { soundManager } from '../utils/audio';

interface EndingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionStats: {
    laylaNodesCleared: number;
    kaleaNodesCleared: number;
    asukaNodesCleared: number;
    bossesCleared: number;
    totalLivesLostInSession: number;
    currentPerfectStreakPerCopilot: {
      facil: number;
      normal: number;
      dificil: number;
    };
  };
}

interface EndingCutscene {
  title: string;
  subtitle: string;
  character: string;
  quote: string;
  mood: ShyStudentMood;
  diff: 'facil' | 'normal' | 'dificil';
}

export const EndingsModal: React.FC<EndingsModalProps> = ({
  isOpen,
  onClose,
  sessionStats
}) => {
  const [activeCutscene, setActiveCutscene] = useState<EndingCutscene | null>(null);

  if (!isOpen) return null;

  // Conditions
  const isTrueEndingUnlocked =
    sessionStats.laylaNodesCleared >= 3 &&
    sessionStats.kaleaNodesCleared >= 3 &&
    sessionStats.asukaNodesCleared >= 3 &&
    sessionStats.totalLivesLostInSession === 0;

  const isGoodEndingLayla = sessionStats.currentPerfectStreakPerCopilot.facil >= 5;
  const isGoodEndingKalea = sessionStats.currentPerfectStreakPerCopilot.normal >= 5;
  const isGoodEndingAsuka = sessionStats.currentPerfectStreakPerCopilot.dificil >= 5;

  const isAnyGoodEndingUnlocked = isGoodEndingLayla || isGoodEndingKalea || isGoodEndingAsuka;

  const handleOpenCutscene = (cutscene: EndingCutscene) => {
    soundManager.playWin();
    setActiveCutscene(cutscene);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border-4 border-black pixel-card p-3 sm:p-5 shadow-[8px_8px_0_#000] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="font-pixel text-sm sm:text-base text-amber-400">
              SISTEMA DE MÚLTIPLES FINALES
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black border-2 border-black font-pixel text-[9px] nes-btn uppercase flex items-center gap-1 cursor-pointer"
              title="Volver al menú"
            >
              <Home className="w-3 h-3" />
              <span>MENÚ</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
          {/* 1. TRUE ENDING: DIOS DEL AHORCADO */}
          <div className={`p-3 border-3 ${isTrueEndingUnlocked ? 'border-amber-400 bg-amber-950/40' : 'border-zinc-800 bg-zinc-900/60'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-pixel text-xs text-amber-300">
                  TRUE ENDING: "DIOS DEL AHORCADO"
                </h3>
              </div>
              <span className={`font-pixel text-[8px] px-2 py-0.5 border ${isTrueEndingUnlocked ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                {isTrueEndingUnlocked ? '¡DESBLOQUEADO!' : 'BLOQUEADO'}
              </span>
            </div>

            <p className="font-pixel text-[8.5px] text-zinc-400 leading-relaxed mb-3">
              Condición: Superar al menos 3 nodos en cada una de las 3 rutas (Layla, Kalea, Asuka) sin agotar todas las vidas en una sola sesión.
            </p>

            {/* Current Progress bar */}
            <div className="grid grid-cols-3 gap-2 text-[8px] font-pixel mb-3">
              <div className="p-1.5 bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <span className="text-emerald-400">Layla:</span>
                <span className="text-white">{sessionStats.laylaNodesCleared}/3</span>
              </div>
              <div className="p-1.5 bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <span className="text-cyan-400">Kalea:</span>
                <span className="text-white">{sessionStats.kaleaNodesCleared}/3</span>
              </div>
              <div className="p-1.5 bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <span className="text-red-400">Asuka:</span>
                <span className="text-white">{sessionStats.asukaNodesCleared}/3</span>
              </div>
            </div>

            {/* Scene Preview if Unlocked */}
            {isTrueEndingUnlocked ? (
              <div className="p-3 bg-zinc-950 border-2 border-amber-400 text-center flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-20 overflow-hidden"><ShyStudentPixelSprite mood="celebrating" difficultyId="facil" /></div>
                  <div className="w-16 h-20 overflow-hidden"><ShyStudentPixelSprite mood="blushing" difficultyId="normal" /></div>
                  <div className="w-16 h-20 overflow-hidden"><ShyStudentPixelSprite mood="smug" difficultyId="dificil" /></div>
                </div>
                <p className="font-pixel text-[9px] text-amber-300">
                  ¡LAYLA, KALEA Y ASUKA SE REÚNEN PARA CORONARTE COMO EL DIOS DEL AHORCADO!
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenCutscene({
                    title: 'TRUE ENDING: DIOS DEL AHORCADO',
                    subtitle: 'Coronación Suprema por las 3 Copilotos',
                    character: 'Layla, Kalea & Asuka',
                    quote: '¡Asombroso! Dominaste todas las palabras y caminos. Asuka admite tu grandeza a regañadientes, Kalea no puede ocultar su sonrojo y Layla celebra con flores tu título indiscutible: ¡DIOS DEL AHORCADO!',
                    mood: 'celebrating',
                    diff: 'facil'
                  })}
                  className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-[8px] nes-btn uppercase flex items-center gap-1 shadow-[2px_2px_0_#000]"
                >
                  <Play className="w-2.5 h-2.5 fill-black" /> VER ESCENA COMPLETA
                </button>
              </div>
            ) : (
              <div className="text-center p-2 bg-zinc-950/80 border border-dashed border-zinc-800 text-[8px] font-pixel text-zinc-500">
                Completa los requisitos en el mapa para revelar la escena final con las 3 copilotos juntas.
              </div>
            )}
          </div>

          {/* 2. GOOD ENDING: CONFESIÓN / AMISTAD MÁXIMA */}
          <div className={`p-3 border-3 ${isAnyGoodEndingUnlocked ? 'border-rose-500 bg-rose-950/30' : 'border-zinc-800 bg-zinc-900/60'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <h3 className="font-pixel text-xs text-rose-300">
                  GOOD ENDING: "CONFESIÓN / AMISTAD MÁXIMA"
                </h3>
              </div>
              <span className={`font-pixel text-[8px] px-2 py-0.5 border ${isAnyGoodEndingUnlocked ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                {isAnyGoodEndingUnlocked ? '¡DESBLOQUEADO!' : 'BLOQUEADO'}
              </span>
            </div>

            <p className="font-pixel text-[8.5px] text-zinc-400 leading-relaxed mb-3">
              Condición: Completar 5 palabras consecutivas con 0 errores (Racha Perfecta) en la copiloto seleccionada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[8px] font-pixel mb-2">
              <div className={`p-2 border flex flex-col justify-between gap-1.5 ${isGoodEndingLayla ? 'border-amber-400 bg-amber-950/80 text-amber-200' : 'border-zinc-800 bg-zinc-950 text-zinc-400'}`}>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-amber-400">Layla:</span>
                    <span>{sessionStats.currentPerfectStreakPerCopilot.facil}/5</span>
                  </div>
                  <div className="text-[7px] text-zinc-400">
                    {isGoodEndingLayla ? '★ Vínculo de Ternura Eterna' : 'Racha perfecta requerida'}
                  </div>
                </div>
                {isGoodEndingLayla && (
                  <button
                    type="button"
                    onClick={() => handleOpenCutscene({
                      title: 'GOOD ENDING: LAYLA',
                      subtitle: 'Vínculo de Ternura Eterna',
                      character: 'Layla',
                      quote: '¡Sabía que lo lograrías! 5 palabras perfectas seguidas sin un solo fallo... Estudiar y jugar a tu lado es lo más bonito de mis días. ¡Prométeme que seguiremos jugando siempre juntos!',
                      mood: 'celebrating',
                      diff: 'facil'
                    })}
                    className="w-full py-1 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-[7.5px] nes-btn uppercase"
                  >
                    VER ESCENA
                  </button>
                )}
              </div>

              <div className={`p-2 border flex flex-col justify-between gap-1.5 ${isGoodEndingKalea ? 'border-cyan-400 bg-cyan-950/80 text-cyan-200' : 'border-zinc-800 bg-zinc-950 text-zinc-400'}`}>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-400">Kalea:</span>
                    <span>{sessionStats.currentPerfectStreakPerCopilot.normal}/5</span>
                  </div>
                  <div className="text-[7px] text-zinc-400">
                    {isGoodEndingKalea ? '★ Confesión Tsundere Desbloqueada' : 'Racha perfecta requerida'}
                  </div>
                </div>
                {isGoodEndingKalea && (
                  <button
                    type="button"
                    onClick={() => handleOpenCutscene({
                      title: 'GOOD ENDING: KALEA',
                      subtitle: 'Confesión Tsundere',
                      character: 'Kalea',
                      quote: '¡N-No es como si me importara que tuvieras 5 aciertos seguidos sin un solo fallo! Baka... pero... reconozco que tienes agallas. Quizás... solo quizás... me alegra ser tu copiloto.',
                      mood: 'blushing',
                      diff: 'normal'
                    })}
                    className="w-full py-1 bg-cyan-400 hover:bg-cyan-300 text-black font-pixel text-[7.5px] nes-btn uppercase"
                  >
                    VER ESCENA
                  </button>
                )}
              </div>

              <div className={`p-2 border flex flex-col justify-between gap-1.5 ${isGoodEndingAsuka ? 'border-red-500 bg-red-950/80 text-red-200' : 'border-zinc-800 bg-zinc-950 text-zinc-400'}`}>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-red-400">Asuka:</span>
                    <span>{sessionStats.currentPerfectStreakPerCopilot.dificil}/5</span>
                  </div>
                  <div className="text-[7px] text-zinc-400">
                    {isGoodEndingAsuka ? '★ Reconocimiento de Piloto de Élite' : 'Racha perfecta requerida'}
                  </div>
                </div>
                {isGoodEndingAsuka && (
                  <button
                    type="button"
                    onClick={() => handleOpenCutscene({
                      title: 'GOOD ENDING: ASUKA',
                      subtitle: 'Reconocimiento de Piloto de Élite',
                      character: 'Asuka',
                      quote: '¡¿5 palabras complejas seguidas sin cometer ni un solo error?! Hmph... tendré que admitirlo: no eres el novato que creí. Has demostrado tener madera de élite. ¡No me avergüenzo de haber luchado a tu lado!',
                      mood: 'smug',
                      diff: 'dificil'
                    })}
                    className="w-full py-1 bg-red-500 hover:bg-red-400 text-white font-pixel text-[7.5px] nes-btn uppercase"
                  >
                    VER ESCENA
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="border-t-2 border-zinc-800 pt-2.5 mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-2 border-black font-pixel text-[9px] nes-btn uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>VOLVER AL MENÚ / JUEGO</span>
          </button>
          <span className="font-pixel text-[7.5px] text-zinc-500 hidden sm:inline">
            4 FINALES DISPONIBLES
          </span>
        </div>

        {/* Visual Novel Cutscene Modal Overlay */}
        {activeCutscene && (
          <div className="absolute inset-0 bg-black/95 p-3 sm:p-5 z-50 flex flex-col items-center justify-center animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-zinc-950 border-4 border-amber-400 p-4 pixel-card shadow-[6px_6px_0_#000] flex flex-col items-center gap-3">
              <div className="w-full flex items-center justify-between border-b border-zinc-800 pb-2">
                <div>
                  <h3 className="font-pixel text-xs text-amber-400">{activeCutscene.title}</h3>
                  <span className="font-pixel text-[8px] text-zinc-400">{activeCutscene.subtitle}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCutscene(null)}
                  className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Character sprite visual */}
              <div className="w-28 h-32 overflow-hidden bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center">
                <ShyStudentPixelSprite
                  mood={activeCutscene.mood}
                  difficultyId={activeCutscene.diff}
                />
              </div>

              {/* VN Dialogue Box */}
              <div className="w-full p-3 bg-zinc-900 border-2 border-zinc-700 font-pixel text-[8.5px] text-zinc-200 leading-relaxed text-center relative shadow-[2px_2px_0_#000]">
                <span className="font-bold text-amber-400 block mb-1 uppercase">
                  {activeCutscene.character}:
                </span>
                "{activeCutscene.quote}"
              </div>

              <button
                type="button"
                onClick={() => setActiveCutscene(null)}
                className="px-5 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-[9px] nes-btn uppercase shadow-[2px_2px_0_#000]"
              >
                CERRAR FINAL
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

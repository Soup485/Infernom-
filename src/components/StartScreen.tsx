import React from 'react';
import { motion } from 'motion/react';
import {
  Play,
  HelpCircle,
  Trophy,
  Volume2,
  VolumeX,
  Music,
  Tv,
  Heart,
  Flame,
  Swords,
  ShieldAlert,
  Sparkles,
  Zap
} from 'lucide-react';
import { DifficultyId, DIFFICULTIES, CATEGORIES } from '../data/words';
import { ShyStudentPixelSprite } from './WaifuCompanion';
import { soundManager } from '../utils/audio';

interface StartScreenProps {
  selectedDifficulty: DifficultyId;
  onSelectDifficulty: (diff: DifficultyId) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onStartGame: () => void;
  onOpenHowToPlay: () => void;
  onOpenStats: () => void;
  onOpenOverworld?: () => void;
  onOpenShop?: () => void;
  onOpenEndings?: () => void;
  pixelCoins?: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  musicEnabled: boolean;
  onToggleMusic: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
  selectedCategory,
  onSelectCategory,
  onStartGame,
  onOpenHowToPlay,
  onOpenStats,
  onOpenOverworld,
  onOpenShop,
  onOpenEndings,
  pixelCoins = 0,
  soundEnabled,
  onToggleSound,
  musicEnabled,
  onToggleMusic,
  crtEnabled,
  onToggleCrt
}) => {
  const handleDifficultyClick = (diff: DifficultyId) => {
    soundManager.playClick();
    onSelectDifficulty(diff);
  };

  const handleCategoryClick = (catId: string) => {
    soundManager.playClick();
    onSelectCategory(catId);
  };

  const handleStartClick = () => {
    soundManager.playCorrect();
    onStartGame();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-2.5 sm:gap-3.5 py-2 sm:py-3 px-2 sm:px-4">
      {/* 1. RETRO TITLE HERO BANNER */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full text-center flex flex-col items-center"
      >
        {/* Arcade Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-zinc-900 border-2 border-black text-[9px] font-pixel text-amber-400 shadow-[2px_2px_0_#000] mb-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>EDICIÓN RETRO NES ARCADE · 1 PLAYER READY</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>

        {/* Main Title: El Ahorcado 8-bit */}
        <div className="relative px-4 py-2 sm:py-3 bg-zinc-950 border-4 border-black pixel-card shadow-[6px_6px_0_#000] w-full max-w-xl">
          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-amber-400" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-amber-400" />
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-amber-400" />
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-amber-400" />

          <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-amber-400 drop-shadow-[3px_3px_0_#000] uppercase">
            EL AHORCADO
          </h1>
          <div className="mt-0.5 flex items-center justify-center gap-2 sm:gap-3">
            <span className="font-pixel text-base sm:text-xl text-rose-500 drop-shadow-[2px_2px_0_#000]">
              8-BIT
            </span>
            <span className="text-zinc-600 font-pixel text-xs">✦</span>
            <span className="font-silkscreen text-[11px] sm:text-xs text-zinc-300 tracking-wider">
              PALABRAS EN ESPAÑOL
            </span>
          </div>
          <p className="font-silkscreen text-[11px] text-zinc-400 mt-1">
            Adivina la palabra secreta antes de que se complete la figura del ahorcado.
          </p>
        </div>
      </motion.div>

      {/* 2. CHOOSE YOUR DIFFICULTY & COPILOTO */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="w-full flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2 text-zinc-300 font-pixel text-xs">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="uppercase text-amber-300 font-bold">ELIGE LA DIFICULTAD</span>
        </div>

        {/* 3 Difficulty Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full">
          {/* FÁCIL */}
          <button
            type="button"
            onClick={() => handleDifficultyClick('facil')}
            className={`text-left p-2 sm:p-2.5 border-4 transition-all duration-200 cursor-pointer flex flex-col justify-between relative group touch-manipulation ${
              selectedDifficulty === 'facil'
                ? 'bg-amber-950/40 border-amber-400 shadow-[4px_4px_0_#000] -translate-y-0.5'
                : 'bg-zinc-900 border-black shadow-[3px_3px_0_#000] hover:border-zinc-500 hover:-translate-y-0.5'
            }`}
          >
            {/* Active Indicator */}
            {selectedDifficulty === 'facil' && (
              <span className="absolute -top-3 right-3 px-2 py-0.5 bg-amber-400 text-black font-pixel text-[8px] font-bold border-2 border-black shadow-[2px_2px_0_#000] animate-pulse">
                ★ SELECCIONADO
              </span>
            )}

            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-pixel text-xs text-amber-300 font-bold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  MODO FÁCIL
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-amber-950 border border-amber-500 text-amber-300 shadow-[1px_1px_0_#000]">
                    +10 COINS
                  </span>
                  <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-zinc-950 border border-amber-500 text-amber-300">
                    6 HP
                  </span>
                </div>
              </div>

              {/* Character Box */}
              <div className="flex items-center gap-2.5 p-1.5 bg-zinc-950 border-2 border-amber-500 my-0.5 shadow-[2px_2px_0_#000]">
                <div className="shrink-0 p-1 bg-black border border-amber-400">
                  <ShyStudentPixelSprite mood="blushing" difficultyId="facil" />
                </div>
                <div className="flex flex-col">
                  <span className="font-pixel text-[8px] text-amber-400">COPILOTO:</span>
                  <strong className="font-pixel text-xs text-amber-300">
                    LAYLA
                  </strong>
                </div>
              </div>
            </div>
          </button>

          {/* NORMAL */}
          <button
            type="button"
            onClick={() => handleDifficultyClick('normal')}
            className={`text-left p-2 sm:p-2.5 border-4 transition-all duration-200 cursor-pointer flex flex-col justify-between relative group touch-manipulation ${
              selectedDifficulty === 'normal'
                ? 'bg-teal-950/40 border-teal-400 shadow-[4px_4px_0_#000] -translate-y-0.5'
                : 'bg-zinc-900 border-black shadow-[3px_3px_0_#000] hover:border-zinc-500 hover:-translate-y-0.5'
            }`}
          >
            {/* Active Indicator */}
            {selectedDifficulty === 'normal' && (
              <span className="absolute -top-3 right-3 px-2 py-0.5 bg-teal-400 text-black font-pixel text-[8px] font-bold border-2 border-black shadow-[2px_2px_0_#000] animate-pulse">
                ★ SELECCIONADO
              </span>
            )}

            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-pixel text-xs text-teal-300 font-bold flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-teal-400" />
                  MODO NORMAL
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-teal-950 border border-teal-500 text-teal-300 shadow-[1px_1px_0_#000]">
                    +20 COINS
                  </span>
                  <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-zinc-950 border border-teal-500 text-teal-300">
                    4 HP
                  </span>
                </div>
              </div>

              {/* Character Box */}
              <div className="flex items-center gap-2.5 p-1.5 bg-zinc-950 border-2 border-teal-500 my-0.5 shadow-[2px_2px_0_#000]">
                <div className="shrink-0 p-1 bg-black border border-teal-400">
                  <ShyStudentPixelSprite mood="tsundere" difficultyId="normal" />
                </div>
                <div className="flex flex-col">
                  <span className="font-pixel text-[8px] text-teal-400">COPILOTO:</span>
                  <strong className="font-pixel text-xs text-teal-300">
                    KALEA
                  </strong>
                </div>
              </div>
            </div>
          </button>

          {/* DIFÍCIL */}
          <button
            type="button"
            onClick={() => handleDifficultyClick('dificil')}
            className={`text-left p-2 sm:p-2.5 border-4 transition-all duration-200 cursor-pointer flex flex-col justify-between relative group touch-manipulation ${
              selectedDifficulty === 'dificil'
                ? 'bg-red-950/40 border-red-500 shadow-[4px_4px_0_#000] -translate-y-0.5'
                : 'bg-zinc-900 border-black shadow-[3px_3px_0_#000] hover:border-zinc-500 hover:-translate-y-0.5'
            }`}
          >
            {/* Active Indicator */}
            {selectedDifficulty === 'dificil' && (
              <span className="absolute -top-3 right-3 px-2 py-0.5 bg-red-500 text-white font-pixel text-[8px] font-bold border-2 border-black shadow-[2px_2px_0_#000] animate-pulse">
                ★ SELECCIONADO
              </span>
            )}

            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-pixel text-xs text-red-400 font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  MODO DIFÍCIL
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-red-950 border border-red-500 text-red-400 shadow-[1px_1px_0_#000]">
                    +35 COINS
                  </span>
                  <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-zinc-950 border border-red-500 text-red-400">
                    3 HP
                  </span>
                </div>
              </div>

              {/* Character Box */}
              <div className="flex items-center gap-2.5 p-1.5 bg-zinc-950 border-2 border-red-500 my-0.5 shadow-[2px_2px_0_#000]">
                <div className="shrink-0 p-1 bg-black border border-red-500">
                  <ShyStudentPixelSprite mood="smug" difficultyId="dificil" />
                </div>
                <div className="flex flex-col">
                  <span className="font-pixel text-[8px] text-red-400">COPILOTO:</span>
                  <strong className="font-pixel text-xs text-red-400">
                    ASUKA
                  </strong>
                </div>
              </div>
            </div>
          </button>
        </div>
      </motion.div>

      {/* 3. CHOOSE CATEGORY (OPTIONAL PILLS) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="w-full flex flex-col items-center gap-2"
      >
        <span className="text-zinc-400 font-pixel text-[10px] uppercase">
          2. CATEGORÍA DE PALABRAS:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
          {CATEGORIES.map((cat) => {
            const isCatSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-1.5 font-pixel text-[9px] border-2 transition-all cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0_#000] ${
                  isCatSelected
                    ? 'bg-amber-400 text-black border-black font-bold -translate-y-0.5'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 4. THE PROMINENT "PLAY" ARCADE BUTTON & RPG OVERWORLD ACCESS */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="w-full flex flex-col items-center gap-2 mt-1 px-1"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 w-full max-w-md sm:max-w-none">
          <button
            type="button"
            onClick={handleStartClick}
            className="w-full sm:w-auto justify-center group relative px-6 py-3 sm:px-10 sm:py-3.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-pixel text-sm sm:text-base md:text-lg border-4 border-black shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000] hover:shadow-[8px_8px_0_#000] active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center gap-2 sm:gap-3 select-none touch-manipulation animate-pulse hover:animate-none"
          >
            <Play className="w-5 h-5 fill-black shrink-0" />
            <span className="tracking-wider">JUGAR RÁPIDO</span>
          </button>

          {onOpenOverworld && (
            <button
              type="button"
              onClick={() => {
                soundManager.playCorrect();
                onOpenOverworld();
              }}
              className="w-full sm:w-auto justify-center px-5 py-3 sm:px-8 sm:py-3.5 bg-purple-700 hover:bg-purple-600 text-white font-pixel text-xs sm:text-sm border-4 border-black shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000] hover:shadow-[8px_8px_0_#000] active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center gap-2 nes-btn uppercase touch-manipulation"
            >
              <Swords className="w-4 h-4 text-amber-300 shrink-0" />
              <span>MAPA DE NODOS (RPG)</span>
            </button>
          )}
        </div>

        {/* Shortcuts for Shop and Endings */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-0.5">
          {onOpenShop && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenShop();
              }}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-amber-300 border-2 border-black font-pixel text-[9px] shadow-[2px_2px_0_#000] flex items-center gap-1.5 touch-manipulation cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>TIENDA ({pixelCoins} COINS)</span>
            </button>
          )}

          {onOpenEndings && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenEndings();
              }}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-rose-300 border-2 border-black font-pixel text-[9px] shadow-[2px_2px_0_#000] flex items-center gap-1.5 touch-manipulation cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <Trophy className="w-3 h-3 text-rose-400" />
              <span>FINALES MÚLTIPLES</span>
            </button>
          )}
        </div>

        <span className="font-pixel text-[8.5px] text-zinc-400 text-center">
          ▼ ELIGE JUGAR DIRECTO O EXPLORAR EL MAPA DE NODOS CON JEFES ▼
        </span>
      </motion.div>

      {/* 5. AUXILIARY BUTTONS (HOW TO PLAY, STATS, AUDIO, CRT) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 pt-2 sm:pt-3 border-t-2 border-zinc-800/80"
      >
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenHowToPlay();
          }}
          className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-black text-zinc-300 font-pixel text-[9px] shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>CÓMO JUGAR</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenStats();
          }}
          className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border-2 border-black text-zinc-300 font-pixel text-[9px] shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>ESTADÍSTICAS</span>
        </button>

        <button
          type="button"
          onClick={onToggleSound}
          className={`px-3 py-2 border-2 border-black font-pixel text-[9px] shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-zinc-900 text-amber-300 hover:bg-zinc-800'
              : 'bg-zinc-950 text-zinc-600'
          }`}
          title="Activar o silenciar efectos sonoros"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-zinc-600" />
          )}
          <span>SFX {soundEnabled ? 'ON' : 'OFF'}</span>
        </button>

        <button
          type="button"
          onClick={onToggleMusic}
          className={`px-3 py-2 border-2 border-black font-pixel text-[9px] shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-colors cursor-pointer ${
            musicEnabled
              ? 'bg-zinc-900 text-amber-300 hover:bg-zinc-800'
              : 'bg-zinc-950 text-zinc-600'
          }`}
          title="Música chiptune de fondo"
        >
          <Music className={`w-3.5 h-3.5 ${musicEnabled ? 'text-amber-400' : 'text-zinc-600'}`} />
          <span>BGM {musicEnabled ? 'ON' : 'OFF'}</span>
        </button>

        <button
          type="button"
          onClick={onToggleCrt}
          className={`px-3 py-2 border-2 border-black font-pixel text-[9px] shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-colors cursor-pointer ${
            crtEnabled
              ? 'bg-zinc-900 text-emerald-400 hover:bg-zinc-800'
              : 'bg-zinc-950 text-zinc-600'
          }`}
          title="Filtro de líneas de escaneo CRT"
        >
          <Tv className={`w-3.5 h-3.5 ${crtEnabled ? 'text-emerald-400' : 'text-zinc-600'}`} />
          <span>CRT {crtEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </motion.div>
    </div>
  );
};

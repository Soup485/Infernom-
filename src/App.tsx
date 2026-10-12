/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Volume2,
  VolumeX,
  Music,
  HelpCircle,
  Users,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Flame,
  CheckCircle,
  XCircle,
  Tv,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import {
  WordItem,
  CATEGORIES,
  DIFFICULTIES,
  DifficultyId,
  getRandomWord,
  getStarterClueLetters,
  normalizeChar,
  isCharMatch,
  isWordComplete
} from './data/words';
import { soundManager } from './utils/audio';
import { HangmanDrawing } from './components/HangmanDrawing';
import { WordDisplay } from './components/WordDisplay';
import { Keyboard } from './components/Keyboard';
import { StatsModal, GameStats } from './components/StatsModal';
import { ChallengeModal } from './components/ChallengeModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { WaifuCompanion } from './components/WaifuCompanion';
import { StartScreen } from './components/StartScreen';
import { NodeMap } from './components/NodeMap';
import { ShopModal } from './components/ShopModal';
import { EndingsModal } from './components/EndingsModal';
import {
  MapNode,
  OVERWORLD_NODES,
  ShopItem
} from './data/progression';

const MAX_MISTAKES = 6; // 8-bit: 6 vidas / 6 partes del muñeco de palitos
const INITIAL_STATS: GameStats = {
  played: 0,
  won: 0,
  lost: 0,
  currentStreak: 0,
  maxStreak: 0
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'START' | 'OVERWORLD' | 'GAME'>('START');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyId>('normal');

  // Progression & Overworld Map State
  const [currentNodeId, setCurrentNodeId] = useState<string>('node_1_layla');
  const [unlockedNodeIds, setUnlockedNodeIds] = useState<string[]>(['node_1_layla', 'node_1_kalea', 'node_1_asuka']);
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]);
  const [activeMapNode, setActiveMapNode] = useState<MapNode | null>(null);

  // PixelCoins & Shop Inventory
  const [pixelCoins, setPixelCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ahorcado_pixel_coins');
      return saved ? parseInt(saved, 10) : 50;
    } catch {
      return 50;
    }
  });

  const [purchasedItemIds, setPurchasedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ahorcado_purchased_items');
      return saved ? JSON.parse(saved) : ['theme_default', 'acc_none'];
    } catch {
      return ['theme_default', 'acc_none'];
    }
  });

  const [activePaletteId, setActivePaletteId] = useState<string>(() => {
    try {
      return localStorage.getItem('ahorcado_active_palette') || 'theme_default';
    } catch {
      return 'theme_default';
    }
  });

  const [activeAccessoryId, setActiveAccessoryId] = useState<string>(() => {
    try {
      return localStorage.getItem('ahorcado_active_accessory') || 'none';
    } catch {
      return 'none';
    }
  });

  // Session Stats for Multiple Endings
  const [sessionStats, setSessionStats] = useState({
    laylaNodesCleared: 0,
    kaleaNodesCleared: 0,
    asukaNodesCleared: 0,
    bossesCleared: 0,
    totalLivesLostInSession: 0,
    currentPerfectStreakPerCopilot: {
      facil: 0,
      normal: 0,
      dificil: 0
    }
  });

  // Boss Battle Timer
  const [isBossBattle, setIsBossBattle] = useState<boolean>(false);
  const [bossTimeRemaining, setBossTimeRemaining] = useState<number>(45);
  const [bossMaxTime, setBossMaxTime] = useState<number>(45);

  // Modals
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isEndingsOpen, setIsEndingsOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState<boolean>(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const [lastRewardCoins, setLastRewardCoins] = useState<number>(10);

  // Word item and starter clues
  const [currentWordItem, setCurrentWordItem] = useState<WordItem>(() =>
    getRandomWord('normal', 'todos')
  );
  const [starterClues, setStarterClues] = useState<string[]>(() =>
    getStarterClueLetters(currentWordItem.word, currentWordItem.difficulty)
  );

  // Guessed letters initialized with the starter clues
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(() =>
    new Set(starterClues)
  );

  const [mistakes, setMistakes] = useState<number>(0);
  const [gameState, setGameState] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [waifuEvent, setWaifuEvent] = useState<'START' | 'HIT' | 'MISS' | 'WIN' | 'LOSE'>('START');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => soundManager.enabled);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => soundManager.musicEnabled);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);

  // Stats in localStorage
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem('ahorcado_stats');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STATS;
  });

  const saveStats = useCallback((newStats: GameStats) => {
    setStats(newStats);
    try {
      localStorage.setItem('ahorcado_stats', JSON.stringify(newStats));
    } catch {
      // ignore
    }
  }, []);

  const resetStats = useCallback(() => {
    saveStats(INITIAL_STATS);
  }, [saveStats]);

  // Start a new round with starter clue letters according to difficulty or active map node
  const startNewGame = useCallback(
    (
      customWord?: WordItem,
      category = selectedCategory,
      difficulty = selectedDifficulty,
      mapNode?: MapNode
    ) => {
      const targetDiff = mapNode ? mapNode.difficulty : difficulty;
      const nextWord = customWord || getRandomWord(targetDiff, category);
      const clues = getStarterClueLetters(nextWord.word, nextWord.difficulty);

      setCurrentWordItem(nextWord);
      setStarterClues(clues);
      setGuessedLetters(new Set(clues));
      setMistakes(0);
      setGameState('PLAYING');
      setWaifuEvent('START');
      setShowHint(false);

      if (mapNode) {
        setActiveMapNode(mapNode);
        if (mapNode.isBoss) {
          setIsBossBattle(true);
          const limit = mapNode.bossTimeLimitSec || 50;
          setBossTimeRemaining(limit);
          setBossMaxTime(limit);
        } else {
          setIsBossBattle(false);
        }
      } else {
        setActiveMapNode(null);
        setIsBossBattle(false);
      }
    },
    [selectedCategory, selectedDifficulty]
  );

  const handleStartGame = useCallback(() => {
    soundManager.playCorrect();
    startNewGame(undefined, selectedCategory, selectedDifficulty);
    setCurrentScreen('GAME');
  }, [startNewGame, selectedCategory, selectedDifficulty]);

  // Launch node from Overworld Map
  const handleSelectMapNode = useCallback((node: MapNode) => {
    soundManager.playCorrect();
    setSelectedDifficulty(node.difficulty);
    startNewGame(undefined, selectedCategory, node.difficulty, node);
    setCurrentScreen('GAME');
  }, [startNewGame, selectedCategory]);

  // Boss Countdown Timer
  useEffect(() => {
    if (!isBossBattle || currentScreen !== 'GAME' || gameState !== 'PLAYING') return;

    const timer = setInterval(() => {
      setBossTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time out is a game over
          setGameState('LOST');
          setWaifuEvent('LOSE');
          soundManager.playLose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBossBattle, currentScreen, gameState]);

  // Buy item from shop
  const handleBuyShopItem = useCallback((item: ShopItem) => {
    if (pixelCoins >= item.price && !purchasedItemIds.includes(item.id)) {
      const nextCoins = pixelCoins - item.price;
      const nextPurchased = [...purchasedItemIds, item.id];
      setPixelCoins(nextCoins);
      setPurchasedItemIds(nextPurchased);
      soundManager.playWin();

      try {
        localStorage.setItem('ahorcado_pixel_coins', String(nextCoins));
        localStorage.setItem('ahorcado_purchased_items', JSON.stringify(nextPurchased));
      } catch {}

      if (item.category === 'palette') {
        setActivePaletteId(item.id);
        try {
          localStorage.setItem('ahorcado_active_palette', item.id);
        } catch {}
      } else if (item.category === 'accessory') {
        const acc = item.spriteAccessoryId || 'none';
        setActiveAccessoryId(acc);
        try {
          localStorage.setItem('ahorcado_active_accessory', acc);
        } catch {}
      }
    } else {
      soundManager.playWrong();
    }
  }, [pixelCoins, purchasedItemIds]);

  const handleEquipPalette = useCallback((paletteId: string) => {
    soundManager.playLetterClick();
    setActivePaletteId(paletteId);
    try {
      localStorage.setItem('ahorcado_active_palette', paletteId);
    } catch {}
  }, []);

  const handleEquipAccessory = useCallback((accessoryId: string) => {
    soundManager.playLetterClick();
    setActiveAccessoryId(accessoryId);
    try {
      localStorage.setItem('ahorcado_active_accessory', accessoryId);
    } catch {}
  }, []);

  const currentMaxMistakes = useMemo(() => {
    if (activeMapNode) return activeMapNode.hp;
    if (selectedDifficulty === 'facil') return 6;
    if (selectedDifficulty === 'normal') return 4;
    return 3;
  }, [selectedDifficulty, activeMapNode]);

  // Handle letter guess
  const handleGuess = useCallback(
    (rawLetter: string) => {
      if (gameState !== 'PLAYING') return;

      const letter = normalizeChar(rawLetter);
      if (!letter || guessedLetters.has(letter)) return;

      // Update guessed letters
      const nextGuessed = new Set(guessedLetters);
      nextGuessed.add(letter);
      setGuessedLetters(nextGuessed);

      // Check if letter exists in target word
      let isHit = false;
      for (const ch of currentWordItem.word) {
        if (isCharMatch(ch, letter)) {
          isHit = true;
          break;
        }
      }

      if (isHit) {
        soundManager.playCorrect();
        // Check if full word is completed
        if (isWordComplete(currentWordItem.word, nextGuessed)) {
          setGameState('WON');
          setWaifuEvent('WIN');
          soundManager.playWin();
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 }
            });
          } catch {
            // ignore
          }
          const newWon = stats.won + 1;
          const newPlayed = stats.played + 1;
          const newStreak = stats.currentStreak + 1;
          const newMaxStreak = Math.max(stats.maxStreak, newStreak);
          saveStats({
            ...stats,
            won: newWon,
            played: newPlayed,
            currentStreak: newStreak,
            maxStreak: newMaxStreak
          });

          // Currency & Node progression rewards
          // Modo Rápido: Fácil = 10 Coins, Normal = 20 Coins, Difícil = 35 Coins
          let coinsEarned = 10;
          if (activeMapNode) {
            coinsEarned = activeMapNode.rewardCoins;
            if (activeMapNode.isBoss) {
              coinsEarned = activeMapNode.rewardCoins * 2; // Boss double coin reward
            }
          } else {
            if (selectedDifficulty === 'facil') coinsEarned = 10;
            if (selectedDifficulty === 'normal') coinsEarned = 20;
            if (selectedDifficulty === 'dificil') coinsEarned = 35;
          }

          setLastRewardCoins(coinsEarned);

          setPixelCoins((prev) => {
            const updated = prev + coinsEarned;
            try {
              localStorage.setItem('ahorcado_pixel_coins', String(updated));
            } catch {}
            return updated;
          });

          // Update Overworld progression
          if (activeMapNode) {
            setCompletedNodeIds((prev) => Array.from(new Set([...prev, activeMapNode.id])));
            setUnlockedNodeIds((prev) => Array.from(new Set([...prev, ...activeMapNode.connections])));
          }

          // Update Session Stats for Endings
          setSessionStats((prev) => {
            const next = { ...prev };
            if (activeMapNode) {
              if (activeMapNode.type === 'route_layla') next.laylaNodesCleared += 1;
              if (activeMapNode.type === 'route_kalea') next.kaleaNodesCleared += 1;
              if (activeMapNode.type === 'route_asuka') next.asukaNodesCleared += 1;
              if (activeMapNode.type === 'boss') next.bossesCleared += 1;
            } else {
              if (selectedDifficulty === 'facil') next.laylaNodesCleared += 1;
              if (selectedDifficulty === 'normal') next.kaleaNodesCleared += 1;
              if (selectedDifficulty === 'dificil') next.asukaNodesCleared += 1;
            }

            // Check if 0 mistakes in this word for perfect streak condition
            const copilotKey = selectedDifficulty;
            const updatedCopilotStreaks = { ...next.currentPerfectStreakPerCopilot };
            if (mistakes === 0) {
              updatedCopilotStreaks[copilotKey] = (updatedCopilotStreaks[copilotKey] || 0) + 1;
            } else {
              updatedCopilotStreaks[copilotKey] = 0;
            }
            next.currentPerfectStreakPerCopilot = updatedCopilotStreaks;

            return next;
          });
        } else {
          setWaifuEvent('HIT');
        }
      } else {
        const nextMistakes = mistakes + 1;
        setMistakes(nextMistakes);
        soundManager.playWrong();

        // Check if all lives lost for this difficulty (6 in facil, 4 in normal, 3 in dificil)
        if (nextMistakes >= currentMaxMistakes) {
          setGameState('LOST');
          setWaifuEvent('LOSE');
          soundManager.playLose();
          const newLost = stats.lost + 1;
          const newPlayed = stats.played + 1;
          saveStats({
            ...stats,
            lost: newLost,
            played: newPlayed,
            currentStreak: 0
          });

          // Track session lives lost for True Ending check
          setSessionStats((prev) => ({
            ...prev,
            totalLivesLostInSession: prev.totalLivesLostInSession + 1,
            currentPerfectStreakPerCopilot: {
              ...prev.currentPerfectStreakPerCopilot,
              [selectedDifficulty]: 0
            }
          }));
        } else {
          setWaifuEvent('MISS');
        }
      }
    },
    [
      gameState,
      guessedLetters,
      currentWordItem,
      mistakes,
      stats,
      saveStats,
      currentMaxMistakes,
      activeMapNode,
      selectedDifficulty
    ]
  );

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isStatsOpen || isChallengeOpen || isHowToPlayOpen) return;
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (currentScreen !== 'GAME') {
        if (e.key === 'Enter') {
          soundManager.playCorrect();
          startNewGame(undefined, selectedCategory, selectedDifficulty);
          setCurrentScreen('GAME');
        }
        return;
      }

      const key = e.key.toUpperCase();
      if (/^[A-ZÑÁÉÍÓÚÜ]$/.test(key)) {
        handleGuess(key);
      } else if (key === 'ENTER' && gameState !== 'PLAYING') {
        startNewGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleGuess,
    isStatsOpen,
    isChallengeOpen,
    isHowToPlayOpen,
    gameState,
    startNewGame,
    currentScreen,
    selectedCategory,
    selectedDifficulty
  ]);

  // List of wrong letters chosen so far
  const wrongLetters = useMemo(() => {
    const wordNormalizedSet = new Set<string>();
    for (const ch of currentWordItem.word) {
      if (ch !== ' ' && ch !== '-' && ch !== "'") {
        wordNormalizedSet.add(normalizeChar(ch));
      }
    }
    const wrongs: string[] = [];
    guessedLetters.forEach((l) => {
      if (!wordNormalizedSet.has(l)) {
        wrongs.push(l);
      }
    });
    return wrongs;
  }, [currentWordItem.word, guessedLetters]);

  // Change category
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    startNewGame(undefined, catId, selectedDifficulty);
  };

  // Change difficulty: "EN SERIO?", "DAME ALGO JUSTO", "DAME GOD OF WAR"
  const handleDifficultyChange = (diffId: DifficultyId) => {
    setSelectedDifficulty(diffId);
    soundManager.playLetterClick();
    startNewGame(undefined, selectedCategory, diffId);
  };

  // Toggle sound SFX
  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  // Toggle 8-bit chiptune BGM music
  const handleToggleMusic = () => {
    const newState = soundManager.toggleMusic();
    setMusicEnabled(newState);
  };

  const remainingLives = Math.max(0, currentMaxMistakes - mistakes);

  const activeCategoryObj = useMemo(() => {
    return (
      CATEGORIES.find((c) => c.id === selectedCategory) || {
        id: 'todos',
        name: 'Todas las temáticas',
        icon: '✨'
      }
    );
  }, [selectedCategory]);

  const activeDifficultyObj = useMemo(() => {
    return (
      DIFFICULTIES.find((d) => d.id === selectedDifficulty) || DIFFICULTIES[1]
    );
  }, [selectedDifficulty]);

  const themeClass = useMemo(() => {
    if (activePaletteId === 'theme_gameboy') return 'theme-gameboy';
    if (activePaletteId === 'theme_synthwave') return 'theme-synthwave';
    if (activePaletteId === 'theme_cyberpunk') return 'theme-cyberpunk';
    return '';
  }, [activePaletteId]);

  return (
    <div
      className={`h-screen max-h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-amber-400 selection:text-black ${
        crtEnabled ? 'crt-scanlines' : ''
      } ${themeClass}`}
    >
      {/* 1. 8-BIT ARCADE CABINET TOP BAR */}
      <header className="w-full border-b-2 sm:border-b-4 border-black bg-zinc-900 sticky top-0 z-40 shadow-[0_2px_0_#000] shrink-0">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 h-11 sm:h-12 flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Brand Wordmark & Menu Switch */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {currentScreen !== 'START' && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setCurrentScreen('START');
                }}
                className="px-2 sm:px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-[8.5px] sm:text-[9px] font-bold border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1 transition-colors cursor-pointer shrink-0 touch-manipulation"
                title="Volver al menú principal"
              >
                <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>MENÚ</span>
              </button>
            )}

            {currentScreen === 'GAME' && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setCurrentScreen('OVERWORLD');
                }}
                className="hidden sm:flex px-1.5 sm:px-2 py-1 bg-purple-700 hover:bg-purple-600 text-white font-pixel text-[8.5px] sm:text-[9px] font-bold border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 items-center gap-1 transition-colors cursor-pointer shrink-0 touch-manipulation"
                title="Ver mapa de nodos RPG"
              >
                <span>MAPA</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setCurrentScreen('START');
              }}
              className="font-pixel text-[11px] sm:text-sm md:text-base font-bold text-amber-400 flex items-center gap-1 drop-shadow-[2px_2px_0_#000] text-left hover:text-amber-300 transition-colors cursor-pointer shrink-0 touch-manipulation"
              title="Ir al menú principal"
            >
              <span className="hidden sm:inline">EL AHORCADO 8-BIT</span>
              <span className="sm:hidden">AHORCADO</span>
            </button>

            {/* Pixel Coins Counter */}
            <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-amber-950/80 border border-amber-500 font-pixel text-[8px] sm:text-[8.5px] text-amber-300 shrink-0">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
              <span>{pixelCoins}</span>
            </div>
          </div>

          {/* Quick Category, Streak & Actions in Game */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {currentScreen === 'GAME' && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                {isBossBattle ? (
                  <div className="flex items-center gap-1 font-pixel text-[8.5px] sm:text-[9px] text-amber-300 bg-red-950 px-2 py-0.5 border border-red-600 animate-pulse shrink-0">
                    <Flame className="w-3 h-3 text-red-500" />
                    <span>BOSS: {bossTimeRemaining}s</span>
                  </div>
                ) : (
                  <span className="hidden lg:inline font-pixel font-bold text-amber-300 bg-black px-2 py-0.5 border border-zinc-800 text-[10px] shrink-0">
                    {activeCategoryObj.icon} {currentWordItem.category.toUpperCase()}
                  </span>
                )}

                {stats.currentStreak > 0 && (
                  <div className="hidden sm:flex items-center gap-1 font-pixel text-[9px] text-amber-400 bg-amber-950/80 px-2 py-0.5 border border-black shrink-0">
                    <Flame className="w-3 h-3 fill-amber-400" />
                    <span>{stats.currentStreak}</span>
                  </div>
                )}

                {/* Toggle Hint: Clearly synchronized and highlighted */}
                <button
                  type="button"
                  onClick={() => {
                    setShowHint(!showHint);
                    soundManager.playLetterClick();
                  }}
                  className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 font-pixel text-[9px] sm:text-[10px] border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer touch-manipulation shrink-0 transition-all ${
                    showHint
                      ? 'bg-amber-400 text-black font-bold ring-2 ring-amber-300 animate-pulse'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                  title="Ver u ocultar pista de la palabra"
                >
                  <Lightbulb className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${showHint ? 'text-black fill-black' : 'text-amber-400 fill-amber-400'}`} />
                  <span className="font-pixel text-[8px] sm:text-[8.5px]">{showHint ? 'PISTA ON' : 'PISTA'}</span>
                </button>
              </div>
            )}

            {/* Console Action Controls */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-1">
              {/* Shop button */}
              <button
                onClick={() => setIsShopOpen(true)}
                className="p-1 sm:p-1.5 bg-purple-700 hover:bg-purple-600 text-amber-300 border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0"
                title="Tienda Retro"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>

              {/* CRT Toggle */}
              <button
                onClick={() => setCrtEnabled(!crtEnabled)}
                className={`hidden sm:flex p-1 sm:p-1.5 border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0 ${
                  crtEnabled ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-400'
                }`}
                title={crtEnabled ? 'Desactivar efecto CRT' : 'Activar efecto CRT 8-bit'}
                aria-label="Filtro CRT"
              >
                <Tv className="w-3.5 h-3.5" />
              </button>

              {/* BGM Toggle */}
              <button
                onClick={handleToggleMusic}
                className={`p-1 sm:p-1.5 border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0 ${
                  musicEnabled ? 'bg-emerald-400 text-black' : 'bg-zinc-800 text-zinc-400'
                }`}
                title={musicEnabled ? 'Música 8-bit ON' : 'Música 8-bit OFF'}
                aria-label="Música 8-bit"
              >
                <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>

              {/* SFX Toggle */}
              <button
                onClick={handleToggleSound}
                className={`p-1 sm:p-1.5 border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0 ${
                  soundEnabled
                    ? 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
                    : 'bg-zinc-900 text-zinc-600'
                }`}
                title={soundEnabled ? 'SFX ON' : 'SFX OFF'}
                aria-label="Efectos de sonido"
              >
                {soundEnabled ? <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              </button>

              {/* 2P Challenge */}
              <button
                onClick={() => setIsChallengeOpen(true)}
                className="hidden sm:flex p-1 sm:px-2 sm:py-1 font-pixel text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 items-center gap-1 cursor-pointer shrink-0"
                title="Retar a un amigo"
              >
                <Users className="w-3.5 h-3.5" />
                <span>2P</span>
              </button>

              {/* Stats */}
              <button
                onClick={() => setIsStatsOpen(true)}
                className="hidden md:flex p-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0"
                title="Estadísticas"
                aria-label="Estadísticas"
              >
                <Trophy className="w-3.5 h-3.5" />
              </button>

              {/* Help */}
              <button
                onClick={() => setIsHowToPlayOpen(true)}
                className="hidden md:flex p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0"
                title="Cómo jugar"
                aria-label="Cómo jugar"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY: START SCREEN, OVERWORLD NODE MAP, OR ARENA */}
      {currentScreen === 'START' && (
        <main className="flex-1 min-h-0 w-full flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden p-2 sm:p-4">
          <StartScreen
            selectedDifficulty={selectedDifficulty}
            onSelectDifficulty={(diff) => setSelectedDifficulty(diff)}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onStartGame={handleStartGame}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            onOpenStats={() => setIsStatsOpen(true)}
            onOpenOverworld={() => setCurrentScreen('OVERWORLD')}
            onOpenShop={() => setIsShopOpen(true)}
            onOpenEndings={() => setIsEndingsOpen(true)}
            pixelCoins={pixelCoins}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            musicEnabled={musicEnabled}
            onToggleMusic={handleToggleMusic}
            crtEnabled={crtEnabled}
            onToggleCrt={() => setCrtEnabled(!crtEnabled)}
          />
        </main>
      )}

      {currentScreen === 'OVERWORLD' && (
        <main className="flex-1 min-h-0 w-full flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden p-2 sm:p-4">
          <NodeMap
            currentNodeId={currentNodeId}
            unlockedNodeIds={unlockedNodeIds}
            completedNodeIds={completedNodeIds}
            pixelCoins={pixelCoins}
            sessionStats={sessionStats}
            onSelectNode={handleSelectMapNode}
            onOpenShop={() => setIsShopOpen(true)}
            onOpenEndings={() => setIsEndingsOpen(true)}
            onReturnToMenu={() => {
              soundManager.playClick();
              setCurrentScreen('START');
            }}
          />
        </main>
      )}

      {currentScreen === 'GAME' && (
        <main className="flex-1 min-h-0 max-w-5xl w-full mx-auto px-2 sm:px-4 py-1 sm:py-1.5 flex flex-col justify-between overflow-hidden">
          {/* Boss Battle Arcade Bar */}
          {isBossBattle && (
            <div className="shrink-0 p-1.5 bg-red-950 border-3 border-black text-red-100 flex items-center justify-between shadow-[2px_2px_0_#000] mb-1">
              <div className="flex items-center gap-2 font-pixel text-[9px] text-amber-300">
                <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                <span>¡BATALLA CONTRA JEFE! DOBLE MONEDAS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[9px] text-white">TIEMPO: {bossTimeRemaining}s</span>
                <div className="w-24 h-2 bg-zinc-950 border border-red-500 overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{ width: `${(bossTimeRemaining / bossMaxTime) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Revealed Hint Banner */}
          {showHint && (
            <div className="shrink-0 p-2 bg-amber-950/80 border-2 border-black text-amber-200 flex items-center gap-2 shadow-[2px_2px_0_#000] mb-1">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="font-silkscreen text-xs">
                <strong className="font-pixel text-[9px] text-amber-300 mr-1.5">PISTA:</strong>
                <span>{currentWordItem.hint}</span>
              </div>
            </div>
          )}

          {/* Central Arena: Hangman, Secret Word & Waifu Copilot */}
          <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center my-auto">
            {/* Columna Izquierda: Hangman (Stick figure en horca de madera) */}
            <div className="hidden md:flex md:col-span-3 flex-col items-center justify-center shrink-0">
              <HangmanDrawing
                mistakes={mistakes}
                maxMistakes={currentMaxMistakes}
                isGameOver={gameState === 'LOST'}
                isWon={gameState === 'WON'}
              />
              {/* Fallos debajo del ahorcado (Desktop) */}
              {wrongLetters.length > 0 && (
                <div className="mt-1.5 w-full max-w-[200px] bg-zinc-950 border-2 border-red-900/80 p-1 flex flex-col items-center gap-0.5 shadow-[2px_2px_0_#000]">
                  <span className="font-pixel text-[8px] text-red-400 font-bold">FALLOS ({wrongLetters.length}/{currentMaxMistakes}):</span>
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {wrongLetters.map((l) => (
                      <span
                        key={l}
                        className="px-1.5 py-0.2 bg-red-950 border border-red-700 text-red-300 font-pixel text-[8.5px] line-through shadow-[1px_1px_0_#000]"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile View: Hangman + Waifu side by side row on small screens */}
            <div className="grid grid-cols-2 md:hidden gap-1.5 sm:gap-2 w-full max-w-lg mx-auto shrink-0 items-start">
              <div className="w-full flex flex-col items-center">
                <HangmanDrawing
                  mistakes={mistakes}
                  maxMistakes={currentMaxMistakes}
                  isGameOver={gameState === 'LOST'}
                  isWon={gameState === 'WON'}
                />
                {/* Fallos debajo del ahorcado (Android / Mobile) */}
                {wrongLetters.length > 0 && (
                  <div className="mt-1 w-full bg-zinc-950 border border-red-900 p-0.5 flex flex-col items-center gap-0.5 shadow-[1px_1px_0_#000]">
                    <span className="font-pixel text-[7.5px] text-red-400 font-bold">FALLOS:</span>
                    <div className="flex flex-wrap items-center justify-center gap-0.5">
                      {wrongLetters.map((l) => (
                        <span
                          key={l}
                          className="px-1 py-0.2 bg-red-950 border border-red-700 text-red-300 font-pixel text-[7.5px] line-through shadow-[1px_1px_0_#000]"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col items-center">
                <WaifuCompanion
                  lastEvent={waifuEvent}
                  mistakes={mistakes}
                  maxMistakes={currentMaxMistakes}
                  difficultyId={selectedDifficulty}
                  targetWord={currentWordItem.word}
                  accessoryId={activeAccessoryId}
                />
              </div>
            </div>

            {/* Columna Centro: Word Display & Game Outcome State */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center px-1">
              {/* Word length & difficulty indicator */}
              <div className="font-pixel text-[9px] sm:text-[10px] md:text-[11px] text-zinc-300 flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
                <span>{currentWordItem.word.replace(/\s/g, '').length} LETRAS</span>
                <span>·</span>
                <span className={
                  currentWordItem.difficulty === 'facil'
                    ? 'text-emerald-400 font-bold'
                    : currentWordItem.difficulty === 'dificil'
                    ? 'text-red-400 font-bold'
                    : 'text-teal-400 font-bold'
                }>
                  {currentWordItem.difficulty === 'facil'
                    ? 'FÁCIL (LAYLA)'
                    : currentWordItem.difficulty === 'dificil'
                    ? 'DIFÍCIL (ASUKA)'
                    : 'NORMAL (KALEA)'}
                </span>
                <span>·</span>
                <span className="text-zinc-400 font-bold">
                  {currentMaxMistakes - mistakes} HP
                </span>
              </div>

              {/* The Secret Word Tiles */}
              <WordDisplay
                word={currentWordItem.word}
                guessedLetters={guessedLetters}
                starterClues={starterClues}
                revealAll={gameState === 'LOST'}
                isWon={gameState === 'WON'}
              />
            </div>

            {/* Columna Derecha: Desktop Waifu Companion */}
            <div className="hidden md:flex md:col-span-4 flex-col items-center justify-center shrink-0">
              <WaifuCompanion
                lastEvent={waifuEvent}
                mistakes={mistakes}
                maxMistakes={currentMaxMistakes}
                difficultyId={selectedDifficulty}
                targetWord={currentWordItem.word}
                accessoryId={activeAccessoryId}
              />
            </div>
          </div>

          {/* Bottom Area: Virtual 8-bit Keyboard (during PLAYING) or Dedicated Victory / Game-Over Menu (when round ends) */}
          <div className="w-full shrink-0 border-t-2 border-black bg-zinc-950/90 py-1.5 sm:py-2 px-1 sm:px-4">
            {gameState === 'PLAYING' ? (
              <Keyboard
                onLetterClick={handleGuess}
                guessedLetters={guessedLetters}
                targetWord={currentWordItem.word}
                disabled={false}
              />
            ) : gameState === 'WON' ? (
              /* DEDICATED VICTORY CONTAINER - ZERO OVERLAP WITH KEYBOARD */
              <div className="w-full max-w-xl mx-auto p-2 sm:p-3 bg-emerald-950 border-3 sm:border-4 border-black text-emerald-100 shadow-[4px_4px_0_#000] flex flex-col items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm text-emerald-300 font-bold tracking-wide">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <span>¡STAGE CLEAR! GANASTE</span>
                </div>

                <div className="px-3 py-0.5 sm:py-1 bg-amber-950/90 border-2 border-amber-500 font-pixel text-[9px] sm:text-[10px] text-amber-300 flex items-center gap-1.5 shadow-[2px_2px_0_#000]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>+{lastRewardCoins} PIXEL COINS GANADAS</span>
                </div>

                {/* Exclusive end-of-round action buttons - beautifully aligned and tap-friendly */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-0.5 w-full max-w-md">
                  <button
                    onClick={() => startNewGame()}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 text-black font-pixel text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer touch-manipulation transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SIGUIENTE</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentScreen('OVERWORLD');
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white font-pixel text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer touch-manipulation transition-all"
                  >
                    <span>MAPA</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentScreen('START');
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-pixel text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer touch-manipulation transition-all"
                    title="Volver al menú principal"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>MENÚ</span>
                  </button>
                </div>
              </div>
            ) : (
              /* DEDICATED GAME OVER CONTAINER */
              <div className="w-full max-w-xl mx-auto p-2 sm:p-3 bg-red-950 border-3 sm:border-4 border-black text-red-100 shadow-[4px_4px_0_#000] flex flex-col items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-2 font-pixel text-xs sm:text-sm text-red-400 font-bold tracking-wide">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  <span>¡GAME OVER!</span>
                </div>
                <div className="bg-black border border-red-700 px-3 py-1 w-full max-w-xs text-center shadow-[inset_1px_1px_0_#000]">
                  <span className="font-pixel text-[8px] text-zinc-400 block">ERA:</span>
                  <span className="font-pixel text-sm sm:text-base text-white tracking-widest block font-bold">
                    {currentWordItem.word}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-0.5 w-full max-w-md">
                  <button
                    onClick={() => startNewGame()}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-200 text-black font-pixel text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer touch-manipulation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>REINTENTAR</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentScreen('OVERWORLD');
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-700 hover:bg-purple-600 text-white font-pixel text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer touch-manipulation"
                  >
                    <span>MAPA</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentScreen('START');
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-[10px] sm:text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer touch-manipulation"
                    title="Volver al menú principal"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>MENÚ</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* 3. ULTRA-SLIM BOTTOM BAR */}
      <footer className="w-full border-t-2 border-black bg-zinc-900 py-1 px-2 sm:px-4 text-center font-pixel text-zinc-500 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 shrink-0">
            <span className="font-pixel text-[8.5px] sm:text-[9.5px] text-zinc-400 whitespace-nowrap">
              <span className="hidden sm:inline">EL AHORCADO 8-BIT · NES EDITION</span>
              <span className="sm:hidden">AHORCADO 8-BIT</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 text-zinc-400 overflow-x-auto no-scrollbar shrink-0">
            {currentScreen !== 'START' && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setCurrentScreen('START');
                }}
                className="hover:text-amber-400 transition-colors flex items-center gap-1 font-pixel text-[8px] cursor-pointer text-amber-300 touch-manipulation px-1 py-0.5"
                title="Volver al menú principal"
              >
                <Home className="w-2.5 h-2.5" />
                MENÚ
              </button>
            )}
            {currentScreen === 'GAME' && (
              <button
                onClick={() => startNewGame()}
                className="hover:text-amber-400 transition-colors flex items-center gap-1 font-pixel text-[8px] cursor-pointer touch-manipulation px-1 py-0.5"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                RESET
              </button>
            )}
            <button
              onClick={() => setIsShopOpen(true)}
              className="hover:text-amber-400 transition-colors font-pixel text-[8px] cursor-pointer text-amber-300 touch-manipulation px-1 py-0.5"
            >
              TIENDA
            </button>
            <button
              onClick={() => setIsEndingsOpen(true)}
              className="hover:text-rose-400 transition-colors font-pixel text-[8px] cursor-pointer text-rose-300 touch-manipulation px-1 py-0.5"
            >
              FINALES
            </button>
            <button
              onClick={() => setIsChallengeOpen(true)}
              className="hover:text-amber-400 transition-colors font-pixel text-[8px] cursor-pointer touch-manipulation px-1 py-0.5"
            >
              2P RETO
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        pixelCoins={pixelCoins}
        purchasedItemIds={purchasedItemIds}
        activePaletteId={activePaletteId}
        activeAccessoryId={activeAccessoryId}
        onBuyItem={handleBuyShopItem}
        onEquipPalette={handleEquipPalette}
        onEquipAccessory={handleEquipAccessory}
      />

      <EndingsModal
        isOpen={isEndingsOpen}
        onClose={() => setIsEndingsOpen(false)}
        sessionStats={sessionStats}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        onResetStats={resetStats}
      />

      <ChallengeModal
        isOpen={isChallengeOpen}
        onClose={() => setIsChallengeOpen(false)}
        onStartCustomGame={(customItem) => startNewGame(customItem)}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />
    </div>
  );
}

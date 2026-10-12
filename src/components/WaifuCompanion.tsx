import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, Heart, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { formatRetroText } from '../utils/text';

export type ShyStudentMood =
  | 'shy'
  | 'blushing'
  | 'nervous'
  | 'celebrating'
  | 'apologetic'
  | 'tsundere'
  | 'smug';

interface WaifuCompanionProps {
  lastEvent: 'START' | 'HIT' | 'MISS' | 'WIN' | 'LOSE';
  mistakes: number;
  maxMistakes: number;
  difficultyId: string;
  targetWord?: string;
  accessoryId?: string;
}

export type LaylaAnimType = 'idle' | 'hit' | 'miss';
export type KaleaAnimType = 'idle' | 'hit' | 'miss' | 'win' | 'lose';
export type AsukaAnimType = 'idle' | 'hit' | 'miss' | 'win' | 'lose';

// 8-bit Anime Pixel Art SVG Sprite
// Fácil: Layla (cabello amarillo con 2 coletas, sistema de animación frame-by-frame 8-bit: 3 animaciones)
// Normal: Kalea (cabello largo negro y vincha con flor, copiloto tsundere con sistema de animaciones 8-bit frame-by-frame)
// Difícil: Asuka (cabello cobrizo con twintails, copiloto arrogante con sistema de animaciones 8-bit frame-by-frame)
export const ShyStudentPixelSprite: React.FC<{
  mood: ShyStudentMood;
  isBouncing?: boolean;
  difficultyId?: string;
  lastEvent?: 'START' | 'HIT' | 'MISS' | 'WIN' | 'LOSE';
  accessoryId?: string;
  mistakes?: number;
}> = ({ mood, isBouncing, difficultyId = 'facil', lastEvent, accessoryId = 'none', mistakes = 0 }) => {
  const isEasy = difficultyId === 'facil';
  const isNormal = difficultyId === 'normal';
  const isHard = difficultyId === 'dificil';

  // ★★★ SISTEMA DE ANIMACIONES 8-BIT FRAME-BY-FRAME PARA LAYLA (MODO FÁCIL: 3 ANIMACIONES) ★★★
  const [laylaAnimType, setLaylaAnimType] = useState<LaylaAnimType>('idle');
  const [laylaAnimFrame, setLaylaAnimFrame] = useState<number>(0);

  // ★★★ SISTEMA DE ANIMACIONES 8-BIT FRAME-BY-FRAME PARA KALEA (MODO NORMAL) ★★★
  const [kaleaAnimType, setKaleaAnimType] = useState<KaleaAnimType>('idle');
  const [kaleaAnimFrame, setKaleaAnimFrame] = useState<number>(0);

  // ★★★ SISTEMA DE ANIMACIONES 8-BIT FRAME-BY-FRAME PARA ASUKA (MODO DIFÍCIL) ★★★
  const [asukaAnimType, setAsukaAnimType] = useState<AsukaAnimType>('idle');
  const [asukaAnimFrame, setAsukaAnimFrame] = useState<number>(0);

  // Sincronizar el tipo de animación de Layla según el evento de juego (Solo 3 animaciones: empezar/idle, acierto, fallo)
  useEffect(() => {
    if (!isEasy) return;

    if (lastEvent === 'HIT') {
      setLaylaAnimType('hit');
      setLaylaAnimFrame(0);
    } else if (lastEvent === 'MISS') {
      setLaylaAnimType('miss');
      setLaylaAnimFrame(0);
    } else {
      // START, WIN, LOSE u otros eventos vuelven/permanecen en reposo ('idle')
      setLaylaAnimType('idle');
      setLaylaAnimFrame(0);
    }
  }, [lastEvent, isEasy]);

  // Sincronizar el tipo de animación de Kalea según el evento de juego
  useEffect(() => {
    if (!isNormal) return;

    if (lastEvent === 'HIT') {
      setKaleaAnimType('hit');
      setKaleaAnimFrame(0);
    } else if (lastEvent === 'MISS') {
      setKaleaAnimType('miss');
      setKaleaAnimFrame(0);
    } else if (lastEvent === 'WIN') {
      setKaleaAnimType('win');
      setKaleaAnimFrame(0);
    } else if (lastEvent === 'LOSE') {
      setKaleaAnimType('lose');
      setKaleaAnimFrame(0);
    } else if (lastEvent === 'START') {
      setKaleaAnimType('idle');
      setKaleaAnimFrame(0);
    }
  }, [lastEvent, isNormal]);

  // Sincronizar el tipo de animación de Asuka según el evento de juego
  useEffect(() => {
    if (!isHard) return;

    if (lastEvent === 'HIT') {
      setAsukaAnimType('hit');
      setAsukaAnimFrame(0);
    } else if (lastEvent === 'MISS') {
      setAsukaAnimType('miss');
      setAsukaAnimFrame(0);
    } else if (lastEvent === 'WIN') {
      setAsukaAnimType('win');
      setAsukaAnimFrame(0);
    } else if (lastEvent === 'LOSE') {
      setAsukaAnimType('lose');
      setAsukaAnimFrame(0);
    } else if (lastEvent === 'START') {
      setAsukaAnimType('idle');
      setAsukaAnimFrame(0);
    }
  }, [lastEvent, isHard]);

  // Controlador de temporizador frame-by-frame 8-bit para Layla (Optimizado para fluir con dinamismo)
  useEffect(() => {
    if (!isEasy) return;

    let timer: NodeJS.Timeout;

    if (laylaAnimType === 'idle') {
      // 1. Animación "Idle" (Espera / Inactiva) - Bucle suave y natural:
      const idleDurations = [1100, 180, 550, 550];
      timer = setTimeout(() => {
        setLaylaAnimFrame((prev) => (prev + 1) % 4);
      }, idleDurations[laylaAnimFrame] ?? 800);
    } else if (laylaAnimType === 'hit') {
      // 2. Animación "Acierto / Victoria Parcial" - Rápida y alegre:
      const hitDurations = [120, 180, 380, 240];
      if (laylaAnimFrame < 3) {
        timer = setTimeout(() => {
          setLaylaAnimFrame((prev) => prev + 1);
        }, hitDurations[laylaAnimFrame]);
      } else {
        timer = setTimeout(() => {
          setLaylaAnimType('idle');
          setLaylaAnimFrame(0);
        }, hitDurations[3]);
      }
    } else if (laylaAnimType === 'miss') {
      // 3. Animación "Fallo / Pérdida de Vida" - Fluida y reconfortante:
      const missDurations = [180, 260, 320, 200];
      if (laylaAnimFrame < 3) {
        timer = setTimeout(() => {
          setLaylaAnimFrame((prev) => prev + 1);
        }, missDurations[laylaAnimFrame]);
      } else {
        timer = setTimeout(() => {
          setLaylaAnimType('idle');
          setLaylaAnimFrame(0);
        }, missDurations[3]);
      }
    }

    return () => clearTimeout(timer);
  }, [isEasy, laylaAnimType, laylaAnimFrame]);

  // Controlador de temporizador frame-by-frame 8-bit para Kalea (Optimizado para fluir ágilmente)
  useEffect(() => {
    if (!isNormal) return;

    let timer: NodeJS.Timeout;

    if (kaleaAnimType === 'idle') {
      // 1. Animación "Idle" (Espera / Orgullosa):
      const idleDurations = [1100, 700, 500, 600];
      timer = setTimeout(() => {
        setKaleaAnimFrame((prev) => (prev + 1) % 4);
      }, idleDurations[kaleaAnimFrame] ?? 800);
    } else if (kaleaAnimType === 'hit') {
      // 2. Animación "Acierto / Victoria Parcial" (Orgullo disimulado):
      const hitDurations = [180, 300, 420, 260];
      if (kaleaAnimFrame < 3) {
        timer = setTimeout(() => {
          setKaleaAnimFrame((prev) => prev + 1);
        }, hitDurations[kaleaAnimFrame]);
      } else {
        timer = setTimeout(() => {
          setKaleaAnimType('idle');
          setKaleaAnimFrame(0);
        }, hitDurations[3]);
      }
    } else if (kaleaAnimType === 'miss') {
      // 3. Animación "Fallo / Pérdida de Vida" (Enojo / Reclamo tsundere):
      const missDurations = [180, 280, 360, 260];
      if (kaleaAnimFrame < 3) {
        timer = setTimeout(() => {
          setKaleaAnimFrame((prev) => prev + 1);
        }, missDurations[kaleaAnimFrame]);
      } else {
        timer = setTimeout(() => {
          setKaleaAnimType('idle');
          setKaleaAnimFrame(0);
        }, missDurations[3]);
      }
    } else if (kaleaAnimType === 'win') {
      // 4. Animación "Victoria Total / Partida Ganada" (Felicidad oculta):
      const winDurations = [300, 300, 300, 300];
      timer = setTimeout(() => {
        setKaleaAnimFrame((prev) => (prev + 1) % 4);
      }, winDurations[kaleaAnimFrame] ?? 300);
    } else if (kaleaAnimType === 'lose') {
      // 5. Animación "Derrota / Game Over" (Frustración / Desesperación):
      const loseDurations = [600, 700, 700, 3000];
      if (kaleaAnimFrame < 3) {
        timer = setTimeout(() => {
          setKaleaAnimFrame((prev) => prev + 1);
        }, loseDurations[kaleaAnimFrame]);
      }
    }

    return () => clearTimeout(timer);
  }, [isNormal, kaleaAnimType, kaleaAnimFrame]);

  // Controlador de temporizador frame-by-frame 8-bit para Asuka (Modo Difícil)
  useEffect(() => {
    if (!isHard) return;

    let timer: NodeJS.Timeout;

    if (asukaAnimType === 'idle') {
      // 1. Animación "Idle" (Espera / Arrogante)
      // Frame 0: Sonrisa de lado, brazos cruzados, mirando con superioridad
      // Frame 1: Guiña un ojo o levanta una ceja con desafío
      // Frame 2: Vuelve a la postura inicial con un leve movimiento de cabello
      const idleDurations = [1200, 600, 650];
      timer = setTimeout(() => {
        setAsukaAnimFrame((prev) => (prev + 1) % 3);
      }, idleDurations[asukaAnimFrame] ?? 800);
    } else if (asukaAnimType === 'hit') {
      // 2. Animación "Acierto" (Sorpresa molesta)
      // Frame 0: Postura normal de idle
      // Frame 1: Abre los ojos de golpe por la sorpresa y baja los brazos un segundo
      // Frame 2: Vuelve a cruzarse de brazos con una mueca como diciendo "bueno, tuviste suerte"
      const hitDurations = [200, 450, 450];
      if (asukaAnimFrame < 2) {
        timer = setTimeout(() => {
          setAsukaAnimFrame((prev) => prev + 1);
        }, hitDurations[asukaAnimFrame]);
      } else {
        timer = setTimeout(() => {
          setAsukaAnimType('idle');
          setAsukaAnimFrame(0);
        }, hitDurations[2]);
      }
    } else if (asukaAnimType === 'miss') {
      // 3. Animación "Fallo / Pierdes Vida" (Burla directa con Smirk y Ceja Alzada)
      // Frame 0: Reacción inicial burlona
      // Frame 1: Sonrisa ladina (smirk) pronunciada con colmillo y ceja derecha alzada
      // Frame 2: Mantiene la pose desafiante y burlona mientras habla el diálogo
      const missDurations = [250, 1500, 2500];
      if (asukaAnimFrame < 2) {
        timer = setTimeout(() => {
          setAsukaAnimFrame((prev) => prev + 1);
        }, missDurations[asukaAnimFrame]);
      } else {
        timer = setTimeout(() => {
          setAsukaAnimType('idle');
          setAsukaAnimFrame(0);
        }, missDurations[2]);
      }
    } else if (asukaAnimType === 'win') {
      // 4. Animación "Victoria" (Reconocimiento forzado)
      // Frame 0: Asuka de pie
      // Frame 1: Da un pequeño salto o levanta el puño con orgullo
      // Frame 2: Se cruza de brazos sonriendo con autosuficiencia ("por supuesto que ganarías conmigo")
      const winDurations = [350, 400, 500];
      timer = setTimeout(() => {
        setAsukaAnimFrame((prev) => (prev + 1) % 3);
      }, winDurations[asukaAnimFrame] ?? 400);
    } else if (asukaAnimType === 'lose') {
      // 5. Animación "Game Over" (Decepción absoluta)
      // Frame 0: Asuka seria
      // Frame 1: Gira el cuerpo hacia un lado (dando la espalda)
      // Frame 2: El sprite desaparece de la pantalla con una expresión de "qué pérdida de tiempo"
      const loseDurations = [800, 1000, 4000];
      if (asukaAnimFrame < 2) {
        timer = setTimeout(() => {
          setAsukaAnimFrame((prev) => prev + 1);
        }, loseDurations[asukaAnimFrame]);
      }
    }

    return () => clearTimeout(timer);
  }, [isHard, asukaAnimType, asukaAnimFrame]);

  // Cálculos de desplazamientos en la cuadrícula de 8-bits (píxeles enteros)
  let laylaYOffset = 0;
  let kaleaYOffset = 0;
  let kaleaXOffset = 0;
  let asukaYOffset = 0;
  let asukaXOffset = 0;
  let asukaHairOffset = 0;
  let isAsukaTurnedBack = false;
  let isFadeOut = false;

  if (isEasy) {
    if (laylaAnimType === 'idle') {
      if (laylaAnimFrame === 2) laylaYOffset = -1; // Respiración Arriba (+1 píxel hacia arriba)
      else laylaYOffset = 0;
    } else if (laylaAnimType === 'hit') {
      if (laylaAnimFrame === 1) laylaYOffset = 1;
      else if (laylaAnimFrame === 2) laylaYOffset = -2;
      else laylaYOffset = 0;
    } else if (laylaAnimType === 'miss') {
      if (laylaAnimFrame === 1) laylaYOffset = 1;
      else laylaYOffset = 0;
    }
  }

  if (isNormal) {
    if (kaleaAnimType === 'idle') {
      if (kaleaAnimFrame === 1) kaleaXOffset = 1; // Cabeza / busto gira sutilmente al lado
      else if (kaleaAnimFrame === 3) kaleaYOffset = -1; // Pequeño movimiento de respiración
    } else if (kaleaAnimType === 'hit') {
      if (kaleaAnimFrame === 1) kaleaXOffset = 1; // Desvía la mirada y postura hacia el lado
      else if (kaleaAnimFrame === 2) kaleaYOffset = -1; // Orgullo erguido
    } else if (kaleaAnimType === 'miss') {
      if (kaleaAnimFrame === 0) kaleaYOffset = -1; // Sobresalto y tensión
      else if (kaleaAnimFrame === 2) kaleaXOffset = (kaleaAnimFrame % 2 === 0 ? 1 : -1); // Temblor indignado
    } else if (kaleaAnimType === 'win') {
      if (kaleaAnimFrame === 1) {
        kaleaYOffset = -2; // Pequeño salto involuntario de emoción
      } else if (kaleaAnimFrame === 2) {
        kaleaYOffset = -1;
        kaleaXOffset = 1; // Vuelve a fingir desinterés mirando a un lado
      } else if (kaleaAnimFrame === 3) {
        kaleaXOffset = 1;
      }
    } else if (kaleaAnimType === 'lose') {
      if (kaleaAnimFrame >= 1) kaleaYOffset = 1; // Cabeza agachada
      if (kaleaAnimFrame === 3) isFadeOut = true; // Desvanecimiento
    }
  }

  if (isHard) {
    if (asukaAnimType === 'idle') {
      if (asukaAnimFrame === 1) asukaXOffset = 1; // Guiño desafiante ladeado
      else if (asukaAnimFrame === 2) asukaHairOffset = 1; // Leve oscilación de cabello
    } else if (asukaAnimType === 'hit') {
      if (asukaAnimFrame === 1) asukaYOffset = -1; // Sobresalto de sorpresa
    } else if (asukaAnimType === 'miss') {
      if (asukaAnimFrame === 1) asukaYOffset = -1; // Risa hacia arriba
      else if (asukaAnimFrame === 2) asukaYOffset = 1; // Inclinación hacia adelante burlándose
    } else if (asukaAnimType === 'win') {
      if (asukaAnimFrame === 1) asukaYOffset = -2; // Salto triunfante
    } else if (asukaAnimType === 'lose') {
      if (asukaAnimFrame >= 1) isAsukaTurnedBack = true; // Da la espalda
      if (asukaAnimFrame === 2) isFadeOut = true; // Desaparece de la pantalla
    }
  }

  return (
    <div
      className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 select-none ${
        isBouncing ? 'animate-bounce' : ''
      } ${
        isFadeOut
          ? 'opacity-0 scale-95 transition-all duration-1000 ease-out'
          : 'opacity-100 scale-100 transition-all duration-200'
      }`}
    >
      {/* Anime Sweat Drop when nervous (Modo Normal) */}
      {isNormal && mood === 'nervous' && (
        <svg
          viewBox="0 0 8 10"
          className="absolute top-1 -right-1 w-3.5 h-4 text-sky-400 animate-pulse pointer-events-none"
          style={{ shapeRendering: 'crispEdges' }}
        >
          <rect x="3" y="1" width="2" height="2" fill="#38bdf8" />
          <rect x="2" y="3" width="4" height="4" fill="#38bdf8" />
          <rect x="1" y="5" width="6" height="3" fill="#0284c7" />
          <rect x="2" y="8" width="4" height="2" fill="#0284c7" />
          <rect x="3" y="4" width="1" height="2" fill="#ffffff" />
        </svg>
      )}

      {/* ★★★ EFECTOS DE PARTÍCULAS 8-BIT PARA ASUKA (MODO DIFÍCIL) ★★★ */}
      {/* 1. Floating Sparkles when celebrating (Modo Difícil Victoria) */}
      {isHard && (asukaAnimType === 'win' || mood === 'celebrating') && (
        <svg
          viewBox="0 0 16 16"
          className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-pulse pointer-events-none"
          style={{ shapeRendering: 'crispEdges' }}
        >
          <rect x="7" y="1" width="2" height="14" fill="#facc15" />
          <rect x="1" y="7" width="14" height="2" fill="#facc15" />
          <rect x="5" y="5" width="6" height="6" fill="#fef08a" />
          <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
        </svg>
      )}

      {/* 2. Marca de burla sonora 'HA!' en Fallo */}
      {isHard && (asukaAnimType === 'miss' || mood === 'smug' || lastEvent === 'MISS') && (
        <div className="absolute -top-2.5 -right-2 font-pixel text-[8px] font-bold text-amber-300 bg-red-950/90 border border-red-500 px-1 py-0.5 shadow pointer-events-none animate-bounce">
          HA!
        </div>
      )}

      {/* 3. Exclamación de decepción al dar la espalda en Game Over Frame 1 */}
      {isHard && asukaAnimType === 'lose' && asukaAnimFrame === 1 && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-pixel text-[8px] font-bold text-zinc-300 bg-black/90 border border-zinc-600 px-1 pointer-events-none">
          ...
        </div>
      )}

      {/* ★★★ EFECTOS DE PARTÍCULAS 8-BIT PARA LAYLA (MODO FÁCIL: ACIERTO Y FALLO) ★★★ */}
      {/* 1. Destellos y estrellitas doradas en Acierto (Frame 2) */}
      {isEasy && laylaAnimType === 'hit' && laylaAnimFrame === 2 && (
        <svg
          viewBox="0 0 32 32"
          className="absolute inset-0 w-full h-full pointer-events-none animate-pulse"
          style={{ shapeRendering: 'crispEdges' }}
        >
          <rect x="2" y="2" width="2" height="2" fill="#facc15" />
          <rect x="3" y="1" width="1" height="4" fill="#fef08a" />
          <rect x="1" y="2" width="4" height="1" fill="#fef08a" />
          <rect x="2" y="2" width="1" height="1" fill="#ffffff" />

          <rect x="27" y="3" width="2" height="2" fill="#facc15" />
          <rect x="28" y="2" width="1" height="4" fill="#fef08a" />
          <rect x="26" y="3" width="4" height="1" fill="#fef08a" />
          <rect x="28" y="3" width="1" height="1" fill="#ffffff" />
        </svg>
      )}

      {/* 2. Gota de sudor anime en Fallo Frame 1 */}
      {isEasy && laylaAnimType === 'miss' && laylaAnimFrame === 1 && (
        <svg
          viewBox="0 0 8 10"
          className="absolute top-1.5 right-1 w-3.5 h-4 pointer-events-none"
          style={{ shapeRendering: 'crispEdges' }}
        >
          <rect x="3" y="1" width="2" height="2" fill="#38bdf8" />
          <rect x="2" y="3" width="4" height="4" fill="#38bdf8" />
          <rect x="1" y="5" width="6" height="3" fill="#0284c7" />
          <rect x="2" y="8" width="4" height="2" fill="#0284c7" />
          <rect x="3" y="4" width="1" height="2" fill="#ffffff" />
        </svg>
      )}

      {/* ★★★ EFECTOS DE PARTÍCULAS 8-BIT PARA KALEA (MODO NORMAL) ★★★ */}
      {/* 1. Símbolo de vena de enojo tsundere (💢) en Fallo Frame 1 y 2 */}
      {isNormal && kaleaAnimType === 'miss' && (kaleaAnimFrame === 1 || kaleaAnimFrame === 2) && (
        <svg
          viewBox="0 0 16 16"
          className="absolute -top-2.5 -right-1 w-5 h-5 text-rose-500 animate-pulse pointer-events-none"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* Cruz de vena de enojo anime #f43f5e / #e11d48 */}
          <rect x="6" y="2" width="4" height="12" fill="#f43f5e" />
          <rect x="2" y="6" width="12" height="4" fill="#f43f5e" />
          <rect x="7" y="3" width="2" height="10" fill="#fda4af" />
          <rect x="3" y="7" width="10" height="2" fill="#fda4af" />
          <rect x="1" y="4" width="3" height="2" fill="#be123c" />
          <rect x="12" y="4" width="3" height="2" fill="#be123c" />
          <rect x="1" y="10" width="3" height="2" fill="#be123c" />
          <rect x="12" y="10" width="3" height="2" fill="#be123c" />
        </svg>
      )}

      {/* 2. Destellos menta/esmeralda reprimidos en Victoria Total Frame 1 */}
      {isNormal && kaleaAnimType === 'win' && kaleaAnimFrame === 1 && (
        <svg
          viewBox="0 0 32 32"
          className="absolute inset-0 w-full h-full pointer-events-none animate-pulse"
          style={{ shapeRendering: 'crispEdges' }}
        >
          <rect x="3" y="3" width="2" height="2" fill="#2dd4bf" />
          <rect x="4" y="2" width="1" height="4" fill="#5eead4" />
          <rect x="2" y="3" width="4" height="1" fill="#5eead4" />
          <rect x="3" y="3" width="1" height="1" fill="#ffffff" />

          <rect x="26" y="4" width="2" height="2" fill="#2dd4bf" />
          <rect x="27" y="3" width="1" height="4" fill="#5eead4" />
          <rect x="25" y="4" width="4" height="1" fill="#5eead4" />
          <rect x="27" y="4" width="1" height="1" fill="#ffffff" />
        </svg>
      )}

      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[2px_2px_0px_#000]"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* === 1. CABELLO TRASERO === */}
        {isEasy ? (
          /* ★★★ LAYLA: DOS COLETAS RUBIAS MUY LARGAS Y VOLUMINOSAS EN CASCADA (GOLDEN TWIN TAILS) ★★★ */
          <g id="layla-twintails-cascada-gold" transform={`translate(0, ${laylaYOffset})`}>
            {/* Masa principal trasera recogida en amarillo dorado */}
            <rect x="5" y="6" width="22" height="15" fill="#ca8a04" />
            <rect x="6" y="7" width="20" height="13" fill="#eab308" />
            <rect x="7" y="8" width="18" height="10" fill="#facc15" />

            {/* COLETA IZQUIERDA EN CASCADA (Larga, voluminosa, con rebote dinámico) */}
            <rect x="0" y="8" width="5" height="21" fill="#a16207" />
            <rect x="1" y="9" width="4" height="20" fill="#ca8a04" />
            <rect x="0" y="11" width="4" height="17" fill="#eab308" />
            <rect x="1" y="12" width="3" height="15" fill="#facc15" />
            <rect x="2" y="13" width="2" height="11" fill="#fef08a" />
            <rect x="0" y="27" width="3" height="3" fill="#a16207" />
            <rect x="1" y="28" width="2" height="2" fill="#ca8a04" />
            {/* Rebote extra hacia afuera en salto de victoria o acierto */}
            {laylaYOffset === -2 && (
              <>
                <rect x="-1" y="10" width="2" height="12" fill="#ca8a04" />
                <rect x="-1" y="13" width="1" height="8" fill="#facc15" />
              </>
            )}

            {/* COLETA DERECHA EN CASCADA (Larga, voluminosa, con rebote dinámico) */}
            <rect x="27" y="8" width="5" height="21" fill="#a16207" />
            <rect x="27" y="9" width="4" height="20" fill="#ca8a04" />
            <rect x="28" y="11" width="4" height="17" fill="#eab308" />
            <rect x="28" y="12" width="3" height="15" fill="#facc15" />
            <rect x="28" y="13" width="2" height="11" fill="#fef08a" />
            <rect x="29" y="27" width="3" height="3" fill="#a16207" />
            <rect x="29" y="28" width="2" height="2" fill="#ca8a04" />
            {/* Rebote extra hacia afuera en salto de victoria o acierto */}
            {laylaYOffset === -2 && (
              <>
                <rect x="31" y="10" width="2" height="12" fill="#ca8a04" />
                <rect x="32" y="13" width="1" height="8" fill="#facc15" />
              </>
            )}

            {/* Lazos/Broches futuristas en la base de las coletas en violeta y oro */}
            <rect x="3" y="7" width="3" height="4" fill="#3b0764" />
            <rect x="4" y="8" width="2" height="2" fill="#a855f7" />
            <rect x="4" y="8" width="1" height="1" fill="#facc15" />

            <rect x="26" y="7" width="3" height="4" fill="#3b0764" />
            <rect x="26" y="8" width="2" height="2" fill="#a855f7" />
            <rect x="27" y="8" width="1" height="1" fill="#facc15" />
          </g>
        ) : isNormal ? (
          /* ★★★ KALEA: CABELLO LARGO Y ABUNDANTE COLOR NEGRO CON VOLUMEN Y CAÍDA ELEGANTE ★★★ */
          <g id="kalea-black-back-hair">
            {/* Masa principal abundante del cabello trasero en negro azabache lustroso */}
            <rect x="3" y="5" width="26" height="23" fill="#09090b" />
            <rect x="2" y="7" width="6" height="21" fill="#18181b" />
            <rect x="24" y="7" width="6" height="21" fill="#18181b" />

            {/* Capas intermedias con brillo grafito y reflejos azul noche */}
            <rect x="1" y="10" width="4" height="18" fill="#1e1b4b" />
            <rect x="27" y="10" width="4" height="18" fill="#1e1b4b" />
            <rect x="2" y="13" width="2" height="14" fill="#27272a" />
            <rect x="28" y="13" width="2" height="14" fill="#27272a" />
            <rect x="3" y="15" width="1" height="10" fill="#3f3f46" />
            <rect x="28" y="15" width="1" height="10" fill="#3f3f46" />

            {/* Caída inferior larga con sombreado profundo */}
            <rect x="3" y="27" width="5" height="4" fill="#050507" />
            <rect x="24" y="27" width="5" height="4" fill="#050507" />
            <rect x="4" y="28" width="3" height="3" fill="#18181b" />
            <rect x="25" y="28" width="3" height="3" fill="#18181b" />
          </g>
        ) : (
          /* ★★★ MODO DIFÍCIL: DOS COLETAS GEMELAS LARGAS NARANJA COBRIZO / ROJO BRILLANTE CON PASADORES GEOMÉTRICOS ★★★ */
          <g id="hard-copper-red-twintails" transform={isHard ? `translate(${asukaXOffset}, ${asukaYOffset + asukaHairOffset})` : undefined}>
            {/* Masa trasera principal de cabello recogida */}
            <rect x="5" y="6" width="22" height="16" fill="#7c2d12" />
            <rect x="6" y="7" width="20" height="14" fill="#c2410c" />
            <rect x="7" y="8" width="18" height="11" fill="#ea580c" />

            {/* COLETA GEMELA IZQUIERDA (TWIN TAIL LARGA Y VOLUMINOSA) */}
            <rect x="1" y="8" width="4" height="20" fill="#7c2d12" />
            <rect x="2" y="9" width="3" height="19" fill="#c2410c" />
            <rect x="0" y="11" width="3" height="15" fill="#ea580c" />
            <rect x="1" y="12" width="2" height="12" fill="#f97316" />
            <rect x="2" y="13" width="1" height="7" fill="#fdba74" />
            <rect x="1" y="27" width="2" height="3" fill="#7c2d12" />

            {/* COLETA GEMELA DERECHA (TWIN TAIL LARGA Y VOLUMINOSA) */}
            <rect x="27" y="8" width="4" height="20" fill="#7c2d12" />
            <rect x="27" y="9" width="3" height="19" fill="#c2410c" />
            <rect x="29" y="11" width="3" height="15" fill="#ea580c" />
            <rect x="29" y="12" width="2" height="12" fill="#f97316" />
            <rect x="29" y="13" width="1" height="7" fill="#fdba74" />
            <rect x="29" y="27" width="2" height="3" fill="#7c2d12" />

            {/* PASADOR GEOMÉTRICO IZQUIERDO: ROJO OSCURO CON CENTRO AMARILLO EN LA BASE DE LA COLETA */}
            <rect x="2" y="7" width="5" height="5" fill="#450a0a" />
            <rect x="3" y="8" width="3" height="3" fill="#991b1b" />
            <rect x="3" y="8" width="2" height="2" fill="#facc15" />
            <rect x="4" y="9" width="1" height="1" fill="#fef08a" />

            {/* PASADOR GEOMÉTRICO DERECHO: ROJO OSCURO CON CENTRO AMARILLO EN LA BASE DE LA COLETA */}
            <rect x="25" y="7" width="5" height="5" fill="#450a0a" />
            <rect x="26" y="8" width="3" height="3" fill="#991b1b" />
            <rect x="27" y="8" width="2" height="2" fill="#facc15" />
            <rect x="27" y="9" width="1" height="1" fill="#fef08a" />
          </g>
        )}

        {/* === 2. ROSTRO Y PIEL ANIME DELICADA === */}
        <g id="anime-face-skin" transform={isEasy ? `translate(0, ${laylaYOffset})` : isHard ? `translate(${asukaXOffset}, ${asukaYOffset})` : undefined}>
          {isHard && isAsukaTurnedBack ? (
            /* Espalda de la cabeza: masa de cabello cobrizo/rojo recogida y cuello visible */
            <>
              <rect x="8" y="9" width="16" height="13" fill="#c2410c" />
              <rect x="10" y="10" width="12" height="11" fill="#ea580c" />
              <rect x="11" y="21" width="10" height="2" fill="#7c2d12" />
              <rect x="12" y="22" width="8" height="2" fill="#fde68a" />
            </>
          ) : (
            <>
              <rect x="8" y="9" width="16" height="12" fill="#fef3c7" />
              <rect x="10" y="21" width="12" height="2" fill="#fef3c7" />
              <rect x="12" y="23" width="8" height="1" fill="#fde68a" />
              <rect x="13" y="22" width="6" height="2" fill="#fed7aa" />
            </>
          )}
        </g>

        {/* === 3. CABELLO DELANTERO Y ACCESORIOS === */}
        {isEasy ? (
          /* ★★★ LAYLA: CABELLO AMARILLO DORADO BRILLANTE, FLEQUILLO RECTO Y GAFAS TECNOLÓGICAS EN LA FRENTE ★★★ */
          <g id="layla-front-golden-tech" transform={`translate(0, ${laylaYOffset})`}>
            {/* Volumen superior amarillo dorado brillante */}
            <rect x="6" y="4" width="20" height="5" fill="#eab308" />
            <rect x="7" y="4" width="18" height="4" fill="#facc15" />
            <rect x="10" y="4" width="12" height="2" fill="#fef08a" />
            <rect x="12" y="5" width="8" height="1" fill="#ffffff" opacity="0.75" />

            {/* GAFAS TECNOLÓGICAS / BROCHES TECNOLÓGICOS EN LA FRENTE */}
            {/* Montura tecnológica futurista sobre el flequillo */}
            <rect x="9" y="5" width="14" height="3" fill="#1e1b4b" />
            <rect x="10" y="5" width="5" height="3" fill="#312e81" />
            <rect x="17" y="5" width="5" height="3" fill="#312e81" />
            {/* Lentes visor cian / holo-tech brillantes */}
            <rect x="11" y="6" width="3" height="2" fill="#06b6d4" />
            <rect x="11" y="6" width="1" height="1" fill="#cffafe" />
            <rect x="18" y="6" width="3" height="2" fill="#06b6d4" />
            <rect x="18" y="6" width="1" height="1" fill="#cffafe" />
            {/* Destello extra en las gafas tecnológicas durante acierto */}
            {laylaAnimType === 'hit' && laylaAnimFrame === 2 ? (
              <>
                <rect x="12" y="5" width="2" height="2" fill="#ffffff" />
                <rect x="19" y="5" width="2" height="2" fill="#ffffff" />
              </>
            ) : null}
            {/* Puente y detalles dorados del dispositivo */}
            <rect x="15" y="6" width="2" height="1" fill="#facc15" />
            <rect x="9" y="6" width="1" height="1" fill="#fbbf24" />
            <rect x="22" y="6" width="1" height="1" fill="#fbbf24" />

            {/* FLEQUILLO RECTO característico de Layla */}
            <rect x="7" y="8" width="18" height="3" fill="#facc15" />
            {/* Línea recta inferior del flequillo sobre los ojos */}
            <rect x="8" y="10" width="16" height="1" fill="#eab308" />
            <rect x="9" y="11" width="14" height="1" fill="#ca8a04" />
            <rect x="10" y="9" width="12" height="1" fill="#fef08a" />

            {/* Mechones laterales enmarcando el rostro con volumen */}
            <rect x="5" y="9" width="3" height="15" fill="#facc15" />
            <rect x="6" y="11" width="2" height="12" fill="#fef08a" />
            <rect x="5" y="21" width="3" height="3" fill="#ca8a04" />

            <rect x="24" y="9" width="3" height="15" fill="#facc15" />
            <rect x="24" y="11" width="2" height="12" fill="#fef08a" />
            <rect x="24" y="21" width="3" height="3" fill="#ca8a04" />
          </g>
        ) : isNormal ? (
          /* ★★★ KALEA: CABELLO NEGRO LUSTRADO CON ELEGANTE VINCHA Y FLOR LUMINOSA TAL COMO EL RETRATO ★★★ */
          <g id="kalea-front-black-vincha">
            {/* Volumen superior negro profundo con brillo grafito */}
            <rect x="6" y="4" width="20" height="5" fill="#09090b" />
            <rect x="7" y="4" width="18" height="4" fill="#18181b" />
            <rect x="10" y="4" width="12" height="2" fill="#27272a" />
            <rect x="12" y="5" width="8" height="1" fill="#52525b" opacity="0.6" />

            {/* VINCHA ELEGANTE EN EL CABELLO (HEADBAND TAL COMO EL RETRATO) */}
            <rect x="6" y="5" width="20" height="2" fill="#1e1b4b" />
            <rect x="7" y="5" width="18" height="1" fill="#0284c7" />
            <rect x="9" y="5" width="14" height="1" fill="#38bdf8" />

            {/* FLOR LUMINOSA EN EL CABELLO (TAL COMO EL RETRATO DE NOCHE) */}
            {/* Pétalos exteriores azul cian / neón */}
            <rect x="4" y="5" width="4" height="4" fill="#0284c7" />
            <rect x="5" y="4" width="2" height="6" fill="#38bdf8" />
            <rect x="3" y="6" width="6" height="2" fill="#38bdf8" />
            {/* Núcleo blanco brillante de la flor */}
            <rect x="5" y="6" width="2" height="2" fill="#ffffff" />
            <rect x="6" y="6" width="1" height="1" fill="#cffafe" />

            {/* Flequillo geométrico anime negro lustroso */}
            <rect x="7" y="7" width="18" height="3" fill="#18181b" />
            <rect x="8" y="10" width="4" height="2" fill="#09090b" />
            <rect x="14" y="10" width="4" height="3" fill="#09090b" />
            <rect x="20" y="10" width="4" height="2" fill="#09090b" />

            {/* Mechones laterales negros que enmarcan el rostro */}
            <rect x="4" y="9" width="4" height="17" fill="#18181b" />
            <rect x="5" y="11" width="2" height="14" fill="#27272a" />
            <rect x="4" y="24" width="4" height="4" fill="#09090b" />

            <rect x="24" y="9" width="4" height="17" fill="#18181b" />
            <rect x="25" y="11" width="2" height="14" fill="#27272a" />
            <rect x="24" y="24" width="4" height="4" fill="#09090b" />
          </g>
        ) : !isAsukaTurnedBack ? (
          /* ★★★ MODO DIFÍCIL: CABELLO FRONTAL NARANJA COBRIZO / ROJO BRILLANTE ★★★ */
          <g id="hard-front-copper-red" transform={isHard ? `translate(${asukaXOffset}, ${asukaYOffset})` : undefined}>
            {/* Volumen superior naranja cobrizo y rojo fuego */}
            <rect x="6" y="4" width="20" height="5" fill="#c2410c" />
            <rect x="7" y="4" width="18" height="4" fill="#ea580c" />
            <rect x="10" y="4" width="12" height="2" fill="#f97316" />
            <rect x="11" y="5" width="10" height="1" fill="#fdba74" />

            {/* Flequillo geométrico anime enmarcando la frente */}
            <rect x="7" y="7" width="18" height="3" fill="#ea580c" />
            <rect x="8" y="10" width="4" height="2" fill="#c2410c" />
            <rect x="13" y="10" width="3" height="3" fill="#c2410c" />
            <rect x="14" y="11" width="1" height="3" fill="#ea580c" />
            <rect x="20" y="10" width="4" height="2" fill="#c2410c" />

            {/* Mechones laterales que caen enmarcando el rostro con volumen */}
            <rect x="5" y="9" width="3" height="14" fill="#ea580c" />
            <rect x="6" y="11" width="2" height="11" fill="#f97316" />
            <rect x="5" y="21" width="2" height="3" fill="#7c2d12" />

            <rect x="24" y="9" width="3" height="14" fill="#ea580c" />
            <rect x="24" y="11" width="2" height="11" fill="#f97316" />
            <rect x="25" y="21" width="2" height="3" fill="#7c2d12" />
          </g>
        ) : null}

        {/* === 4. EXPRESIONES FACIALES SEGÚN MODO Y EMOCIÓN === */}
        {isEasy ? (
          /* ★★★ LAYLA (MODO FÁCIL): SISTEMA DE 3 EXPRESIONES 8-BIT FRAME-BY-FRAME (EMPEZAR/ESPERA, ACIERTO, FALLO) ★★★ */
          <g id="layla-expression-frame" transform={`translate(0, ${laylaYOffset})`}>
            {laylaAnimType === 'hit' ? (
              /* 2. ACIERTO / VICTORIA PARCIAL:
                 Frame 0: Inicio reposo
                 Frame 1: Preparación (flexión, mirada atenta hacia arriba)
                 Frame 2: Salto y Celebración (ojos felices arco ^_^, sonrisa amplia, manitas arriba)
                 Frame 3: Retorno con sonrisa radiante */
              <>
                {laylaAnimFrame === 1 ? (
                  /* Frame 1 (Preparación): Cejas atentas y mirada expectante */
                  <>
                    <rect x="10" y="12" width="4" height="1" fill="#a16207" />
                    <rect x="18" y="12" width="4" height="1" fill="#a16207" />

                    <rect x="10" y="12" width="4" height="4" fill="#0f172a" />
                    <rect x="11" y="13" width="2" height="2" fill="#0284c7" />
                    <rect x="10" y="12" width="2" height="2" fill="#ffffff" />

                    <rect x="18" y="12" width="4" height="4" fill="#0f172a" />
                    <rect x="19" y="13" width="2" height="2" fill="#0284c7" />
                    <rect x="18" y="12" width="2" height="2" fill="#ffffff" />

                    <rect x="14" y="18" width="4" height="1" fill="#e11d48" />
                  </>
                ) : laylaAnimFrame === 2 ? (
                  /* Frame 2 (Salto / Celebración): Ojos en arco ^_^, sonrisa amplia abierta, manitas arriba */
                  <>
                    <rect x="10" y="13" width="4" height="1" fill="#0f172a" />
                    <rect x="11" y="12" width="2" height="1" fill="#0f172a" />
                    <rect x="18" y="13" width="4" height="1" fill="#0f172a" />
                    <rect x="19" y="12" width="2" height="1" fill="#0f172a" />

                    <rect x="8" y="15" width="4" height="2" fill="#fb7185" />
                    <rect x="20" y="15" width="4" height="2" fill="#fb7185" />

                    <rect x="13" y="17" width="6" height="2" fill="#e11d48" />
                    <rect x="14" y="18" width="4" height="1" fill="#fda4af" />
                    <rect x="15" y="19" width="2" height="1" fill="#e11d48" />

                    {/* Manitas arriba celebrando */}
                    <rect x="7" y="18" width="2" height="3" fill="#fef3c7" />
                    <rect x="23" y="18" width="2" height="3" fill="#fef3c7" />
                  </>
                ) : (
                  /* Frame 0 y 3: Retorno con sonrisa radiante */
                  <>
                    <rect x="10" y="11" width="4" height="1" fill="#a16207" />
                    <rect x="18" y="11" width="4" height="1" fill="#a16207" />

                    <rect x="10" y="12" width="4" height="4" fill="#0f172a" />
                    <rect x="11" y="13" width="2" height="3" fill="#0284c7" />
                    <rect x="10" y="12" width="2" height="2" fill="#ffffff" />
                    <rect x="18" y="12" width="4" height="4" fill="#0f172a" />
                    <rect x="19" y="13" width="2" height="3" fill="#0284c7" />
                    <rect x="18" y="12" width="2" height="2" fill="#ffffff" />

                    <rect x="8" y="16" width="4" height="2" fill="#fda4af" />
                    <rect x="20" y="16" width="4" height="2" fill="#fda4af" />

                    <rect x="13" y="17" width="6" height="2" fill="#e11d48" />
                    <rect x="14" y="18" width="4" height="1" fill="#f43f5e" />
                  </>
                )}
              </>
            ) : laylaAnimType === 'miss' ? (
              /* 3. FALLO / PÉRDIDA DE VIDA:
                 Frame 0: Sobresalto / Sorpresa (ojos abiertos de par en par, boca 'o')
                 Frame 1: Preocupación tierna (cejas caídas con pena tierna, boca apenada)
                 Frame 2: Consuelo y mimo (ojos entrecerrados amables, sonrisa reconfortante cariñosa)
                 Frame 3: Retorno sereno a calma */
              <>
                {laylaAnimFrame === 0 ? (
                  /* Frame 0: Sobresalto / Sorpresa */
                  <>
                    <rect x="10" y="10" width="4" height="1" fill="#a16207" />
                    <rect x="18" y="10" width="4" height="1" fill="#a16207" />

                    <rect x="9" y="12" width="5" height="4" fill="#ffffff" />
                    <rect x="11" y="13" width="2" height="2" fill="#0284c7" />
                    <rect x="11" y="13" width="1" height="1" fill="#0f172a" />

                    <rect x="18" y="12" width="5" height="4" fill="#ffffff" />
                    <rect x="19" y="13" width="2" height="2" fill="#0284c7" />
                    <rect x="19" y="13" width="1" height="1" fill="#0f172a" />

                    <rect x="15" y="17" width="2" height="3" fill="#881337" />
                    <rect x="15" y="18" width="2" height="1" fill="#e11d48" />
                  </>
                ) : laylaAnimFrame === 1 ? (
                  /* Frame 1: Preocupación tierna */
                  <>
                    <rect x="10" y="12" width="2" height="1" fill="#a16207" />
                    <rect x="12" y="11" width="2" height="1" fill="#a16207" />
                    <rect x="18" y="11" width="2" height="1" fill="#a16207" />
                    <rect x="20" y="12" width="2" height="1" fill="#a16207" />

                    <rect x="10" y="13" width="4" height="3" fill="#0f172a" />
                    <rect x="11" y="14" width="2" height="2" fill="#0284c7" />
                    <rect x="10" y="13" width="2" height="1" fill="#ffffff" />

                    <rect x="18" y="13" width="4" height="3" fill="#0f172a" />
                    <rect x="19" y="14" width="2" height="2" fill="#0284c7" />
                    <rect x="18" y="13" width="2" height="1" fill="#ffffff" />

                    <rect x="8" y="16" width="3" height="1" fill="#fda4af" />
                    <rect x="21" y="16" width="3" height="1" fill="#fda4af" />

                    <rect x="14" y="18" width="4" height="1" fill="#9f1239" />
                    <rect x="13" y="19" width="1" height="1" fill="#9f1239" />
                    <rect x="18" y="19" width="1" height="1" fill="#9f1239" />
                  </>
                ) : laylaAnimFrame === 2 ? (
                  /* Frame 2: Consuelo y mimo cariñoso */
                  <>
                    <rect x="10" y="11" width="4" height="1" fill="#a16207" />
                    <rect x="18" y="11" width="4" height="1" fill="#a16207" />

                    <rect x="10" y="13" width="4" height="2" fill="#0f172a" />
                    <rect x="11" y="14" width="2" height="1" fill="#38bdf8" />
                    <rect x="18" y="13" width="4" height="2" fill="#0f172a" />
                    <rect x="19" y="14" width="2" height="1" fill="#38bdf8" />

                    <rect x="8" y="16" width="4" height="2" fill="#fda4af" />
                    <rect x="20" y="16" width="4" height="2" fill="#fda4af" />

                    <rect x="14" y="17" width="4" height="1" fill="#e11d48" />
                    <rect x="13" y="16" width="1" height="1" fill="#e11d48" />
                    <rect x="18" y="16" width="1" height="1" fill="#e11d48" />
                    <rect x="15" y="18" width="2" height="1" fill="#f43f5e" />
                  </>
                ) : (
                  /* Frame 3: Retorno sereno */
                  <>
                    <rect x="10" y="11" width="4" height="1" fill="#a16207" />
                    <rect x="18" y="11" width="4" height="1" fill="#a16207" />
                    <rect x="10" y="12" width="4" height="4" fill="#0f172a" />
                    <rect x="11" y="13" width="2" height="3" fill="#0284c7" />
                    <rect x="10" y="12" width="2" height="2" fill="#ffffff" />
                    <rect x="18" y="12" width="4" height="4" fill="#0f172a" />
                    <rect x="19" y="13" width="2" height="3" fill="#0284c7" />
                    <rect x="18" y="12" width="2" height="2" fill="#ffffff" />
                    <rect x="14" y="18" width="4" height="1" fill="#e11d48" />
                  </>
                )}
              </>
            ) : (
              /* 1. IDLE (CUANDO EMPIEZAS / ESPERA / POR DEFECTO):
                 Frame 0: Neutro mirando al frente con sonrisa cálida
                 Frame 1: Parpadeo (ojos se cierran en línea de 1px)
                 Frame 2: Respiración Arriba (+1px busto, ojos abiertos)
                 Frame 3: Respiración Abajo (vuelve a reposo) */
              <>
                {/* Cejas suaves y gentiles en castaño/dorado suave */}
                <rect x="10" y="11" width="4" height="1" fill="#a16207" />
                <rect x="18" y="11" width="4" height="1" fill="#a16207" />

                {laylaAnimFrame === 1 ? (
                  /* Frame 1: Parpadeo - ojos se cierran en línea recta de 1px */
                  <>
                    <rect x="10" y="14" width="4" height="1" fill="#0f172a" />
                    <rect x="9" y="13" width="1" height="1" fill="#0f172a" />
                    <rect x="18" y="14" width="4" height="1" fill="#0f172a" />
                    <rect x="22" y="13" width="1" height="1" fill="#0f172a" />
                  </>
                ) : (
                  /* Frame 0, 2 y 3: Ojos grandes expresivos azules con brillo tierno y pupilas agrandadas */
                  <>
                    {/* Ojo Izquierdo: Pupila agrandada con brillo tierno */}
                    <rect x="10" y="12" width="4" height="4" fill="#0f172a" />
                    <rect x="10" y="13" width="3" height="3" fill="#0284c7" />
                    <rect x="11" y="13" width="2" height="3" fill="#38bdf8" />
                    <rect x="10" y="12" width="2" height="2" fill="#ffffff" />
                    <rect x="12" y="14" width="1" height="1" fill="#e0f2fe" />

                    {/* Ojo Derecho: Pupila agrandada con brillo tierno */}
                    <rect x="18" y="12" width="4" height="4" fill="#0f172a" />
                    <rect x="19" y="13" width="3" height="3" fill="#0284c7" />
                    <rect x="19" y="13" width="2" height="3" fill="#38bdf8" />
                    <rect x="18" y="12" width="2" height="2" fill="#ffffff" />
                    <rect x="20" y="14" width="1" height="1" fill="#e0f2fe" />
                  </>
                )}

                {/* 2 píxeles de rubor suave (color rosa claro) justo debajo de las pestañas inferiores */}
                <rect x="11" y="16" width="2" height="1" fill="#fbcfe8" />
                <rect x="19" y="16" width="2" height="1" fill="#fbcfe8" />

                {/* Rubor rosado dulce y acogedor en las mejillas */}
                <rect x="8" y="16" width="3" height="2" fill="#fda4af" opacity="0.85" />
                <rect x="21" y="16" width="3" height="2" fill="#fda4af" opacity="0.85" />
                <rect x="8" y="17" width="2" height="1" fill="#f43f5e" opacity="0.5" />
                <rect x="22" y="17" width="2" height="1" fill="#f43f5e" opacity="0.5" />

                {/* Boca: Sonrisa curvada limpia en forma de U (3px de ancho) */}
                <rect x="14" y="19" width="3" height="1" fill="#e11d48" />
                <rect x="13" y="18" width="1" height="1" fill="#e11d48" />
                <rect x="17" y="18" width="1" height="1" fill="#e11d48" />
                <rect x="14" y="18" width="3" height="1" fill="#fda4af" />
              </>
            )}
          </g>
        ) : isNormal ? (
          /* ★★★ KALEA (MODO NORMAL): SISTEMA DE 5 ANIMACIONES 8-BIT FRAME-BY-FRAME ★★★ */
          <g id="kalea-expression-frame" transform={`translate(${kaleaXOffset}, ${kaleaYOffset})`}>
            {kaleaAnimType === 'hit' ? (
              /* 2. ACIERTO / VICTORIA PARCIAL (Orgullo disimulado tsundere):
                 Frame 0: Expresión neutral/seria de idle
                 Frame 1: Sus ojos se abren un poco por el acierto y sonrojo rosado tenue
                 Frame 2: Desvía la mirada hacia un lado con pequeña sonrisa contenida
                 Frame 3: Vuelve lentamente a su postura seria */
              <>
                {kaleaAnimFrame === 1 ? (
                  /* Frame 1: Sorpresa positiva disimulada con ojos abiertos y sonrojo tenue */
                  <>
                    <rect x="10" y="10" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="10" width="4" height="1" fill="#042f2e" />

                    <rect x="10" y="11" width="4" height="5" fill="#042f2e" />
                    <rect x="11" y="12" width="2" height="3" fill="#14b8a6" />
                    <rect x="10" y="11" width="2" height="2" fill="#ffffff" />

                    <rect x="18" y="11" width="4" height="5" fill="#042f2e" />
                    <rect x="19" y="12" width="2" height="3" fill="#14b8a6" />
                    <rect x="18" y="11" width="2" height="2" fill="#ffffff" />

                    {/* Sonrojo rosado tenue */}
                    <rect x="8" y="16" width="3" height="1" fill="#fda4af" opacity="0.9" />
                    <rect x="21" y="16" width="3" height="1" fill="#fda4af" opacity="0.9" />

                    <rect x="14" y="18" width="4" height="1" fill="#9f1239" />
                  </>
                ) : kaleaAnimFrame === 2 ? (
                  /* Frame 2: Desvía la mirada hacia un lado con sonrisa contenida y rubor tsundere */
                  <>
                    <rect x="10" y="10" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="10" width="4" height="1" fill="#042f2e" />

                    {/* Mirada desviada a un lado */}
                    <rect x="11" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="13" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="12" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="19" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="21" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="20" y="12" width="1" height="1" fill="#ffffff" />

                    {/* Rubor tsundere marcado en mejillas */}
                    <rect x="8" y="16" width="4" height="2" fill="#fb7185" opacity="0.85" />
                    <rect x="20" y="16" width="4" height="2" fill="#fb7185" opacity="0.85" />

                    {/* Sonrisa contenida de lado */}
                    <rect x="14" y="18" width="3" height="1" fill="#9f1239" />
                    <rect x="17" y="17" width="2" height="1" fill="#be123c" />
                  </>
                ) : (
                  /* Frame 0 y 3: Postura seria original */
                  <>
                    <rect x="10" y="10" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="10" width="4" height="1" fill="#042f2e" />

                    <rect x="10" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="11" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="10" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="18" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="19" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="18" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="8" y="16" width="3" height="1" fill="#fb7185" opacity="0.65" />
                    <rect x="21" y="16" width="3" height="1" fill="#fb7185" opacity="0.65" />

                    <rect x="14" y="18" width="4" height="1" fill="#9f1239" />
                  </>
                )}
              </>
            ) : kaleaAnimType === 'miss' ? (
              /* 3. FALLO / PÉRDIDA DE VIDA (Enojo y regaño tsundere):
                 Frame 0: Sobresalto molesto
                 Frame 1: Frunce el ceño de golpe y boca torcida enojada
                 Frame 2: Cabeza inclinada con vena pixelada y boca de reclamo
                 Frame 3: Suspira pesadamente y cruza brazos negando */
              <>
                {kaleaAnimFrame === 1 ? (
                  /* Frame 1: Ceño fruncido y boca torcida enojada */
                  <>
                    <rect x="10" y="11" width="4" height="1" fill="#042f2e" />
                    <rect x="13" y="12" width="1" height="1" fill="#042f2e" />
                    <rect x="18" y="11" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="12" width="1" height="1" fill="#042f2e" />

                    <rect x="10" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="11" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="10" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="18" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="19" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="18" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="8" y="16" width="4" height="2" fill="#f43f5e" opacity="0.8" />
                    <rect x="20" y="16" width="4" height="2" fill="#f43f5e" opacity="0.8" />

                    {/* Boca torcida enojada */}
                    <rect x="13" y="18" width="4" height="1" fill="#881337" />
                    <rect x="17" y="19" width="2" height="1" fill="#881337" />
                  </>
                ) : kaleaAnimFrame === 2 ? (
                  /* Frame 2: Reclamo indignado y enojo activo */
                  <>
                    <rect x="10" y="11" width="4" height="1" fill="#042f2e" />
                    <rect x="13" y="12" width="1" height="1" fill="#042f2e" />
                    <rect x="18" y="11" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="12" width="1" height="1" fill="#042f2e" />

                    <rect x="10" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="11" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="10" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="18" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="19" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="18" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="8" y="16" width="4" height="2" fill="#f43f5e" opacity="0.9" />
                    <rect x="20" y="16" width="4" height="2" fill="#f43f5e" opacity="0.9" />

                    {/* Boca abierta reclamando */}
                    <rect x="14" y="17" width="4" height="2" fill="#881337" />
                    <rect x="15" y="18" width="2" height="1" fill="#fda4af" />
                  </>
                ) : (
                  /* Frame 0 y 3: Resoplido o tensión */
                  <>
                    <rect x="10" y="11" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="11" width="4" height="1" fill="#042f2e" />

                    <rect x="10" y="13" width="4" height="3" fill="#042f2e" />
                    <rect x="11" y="14" width="2" height="1" fill="#0f766e" />

                    <rect x="18" y="13" width="4" height="3" fill="#042f2e" />
                    <rect x="19" y="14" width="2" height="1" fill="#0f766e" />

                    <rect x="8" y="16" width="3" height="1" fill="#fb7185" opacity="0.7" />
                    <rect x="21" y="16" width="3" height="1" fill="#fb7185" opacity="0.7" />

                    {/* Boca pequeña de resoplido */}
                    <rect x="15" y="18" width="2" height="1" fill="#881337" />
                  </>
                )}
              </>
            ) : kaleaAnimType === 'win' ? (
              /* 4. VICTORIA FINAL (Alegría a regañadientes):
                 Frame 1: Brinco de alegría con ojos en arco y destellos
                 Frame 2: Se cruza de brazos y sonríe de lado ("bueno, lo logramos")
                 Frame 3: Pose final estática con sonrisa leve y mejillas sonrojadas */
              <>
                {kaleaAnimFrame === 1 ? (
                  /* Frame 1: Brinco de alegría y emoción reprimida */
                  <>
                    <rect x="10" y="11" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="11" width="4" height="1" fill="#042f2e" />

                    {/* Ojos felices en arco ^_^ */}
                    <rect x="10" y="13" width="4" height="1" fill="#042f2e" />
                    <rect x="11" y="12" width="2" height="1" fill="#042f2e" />
                    <rect x="18" y="13" width="4" height="1" fill="#042f2e" />
                    <rect x="19" y="12" width="2" height="1" fill="#042f2e" />

                    <rect x="8" y="15" width="4" height="2" fill="#fb7185" />
                    <rect x="20" y="15" width="4" height="2" fill="#fb7185" />

                    <rect x="14" y="17" width="4" height="2" fill="#be123c" />
                    <rect x="15" y="18" width="2" height="1" fill="#fda4af" />
                  </>
                ) : (
                  /* Frame 2 y 3: Sonrisa contenida de lado y rubor */
                  <>
                    <rect x="10" y="10" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="10" width="4" height="1" fill="#042f2e" />

                    <rect x="10" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="11" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="10" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="18" y="12" width="4" height="4" fill="#042f2e" />
                    <rect x="19" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="18" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="8" y="16" width="4" height="2" fill="#fb7185" opacity="0.85" />
                    <rect x="20" y="16" width="4" height="2" fill="#fb7185" opacity="0.85" />

                    <rect x="14" y="18" width="4" height="1" fill="#9f1239" />
                    <rect x="17" y="17" width="2" height="1" fill="#be123c" />
                  </>
                )}
              </>
            ) : kaleaAnimType === 'lose' ? (
              /* 5. DERROTA / GAME OVER (Frustración total):
                 Frame 0: Ojos muy abiertos incrédulos
                 Frame 1: Gira el cuerpo dando la espalda
                 Frame 2: Exclamación de decepción / cabeza agachada
                 Frame 3: Fade out */
              <>
                {kaleaAnimFrame === 0 ? (
                  /* Frame 0: Incredulidad y frustración */
                  <>
                    <rect x="10" y="10" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="10" width="4" height="1" fill="#042f2e" />

                    <rect x="9" y="11" width="5" height="5" fill="#042f2e" />
                    <rect x="10" y="12" width="3" height="3" fill="#ffffff" />
                    <rect x="11" y="13" width="1" height="1" fill="#0f766e" />

                    <rect x="18" y="11" width="5" height="5" fill="#042f2e" />
                    <rect x="19" y="12" width="3" height="3" fill="#ffffff" />
                    <rect x="20" y="13" width="1" height="1" fill="#0f766e" />

                    <rect x="14" y="18" width="4" height="2" fill="#881337" />
                  </>
                ) : (
                  /* Frame 1, 2, 3: Decepción y cabeza agachada */
                  <>
                    <rect x="10" y="12" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="12" width="4" height="1" fill="#042f2e" />

                    <rect x="10" y="14" width="4" height="1" fill="#042f2e" />
                    <rect x="18" y="14" width="4" height="1" fill="#042f2e" />

                    <rect x="14" y="18" width="4" height="1" fill="#881337" />
                  </>
                )}
              </>
            ) : (
              /* 1. IDLE (ESPERA / TSUNDERE CLÁSICA):
                 Frame 0: Postura altanera con puchero tsundere mirando al frente
                 Frame 1: Gira ligeramente la cabeza hacia un lado (fingiendo indiferencia)
                 Frame 2: Vuelve al centro, parpadeando despacio
                 Frame 3: Respiración manteniendo actitud orgullosa */
              <>
                {/* Cejas: Inclinadas 1px en diagonal hacia el centro (expresión de leve enojo/orgullo) */}
                <rect x="10" y="10" width="2" height="1" fill="#09090b" />
                <rect x="12" y="11" width="2" height="1" fill="#09090b" />

                <rect x="18" y="11" width="2" height="1" fill="#09090b" />
                <rect x="20" y="10" width="2" height="1" fill="#09090b" />

                {kaleaAnimFrame === 2 ? (
                  /* Frame 2: Parpadeo despacio con mueca de impaciencia */
                  <>
                    <rect x="10" y="14" width="4" height="1" fill="#09090b" />
                    <rect x="18" y="14" width="4" height="1" fill="#09090b" />
                  </>
                ) : kaleaAnimFrame === 1 ? (
                  /* Frame 1: Mirada desviada al lado como si ignorara al jugador */
                  <>
                    <rect x="11" y="12" width="4" height="4" fill="#09090b" />
                    <rect x="13" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="12" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="19" y="12" width="4" height="4" fill="#09090b" />
                    <rect x="21" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="20" y="12" width="1" height="1" fill="#ffffff" />
                  </>
                ) : (
                  /* Frame 0 y 3: Ojos grandes expresivos mirando al frente con orgullo */
                  <>
                    <rect x="10" y="12" width="4" height="4" fill="#09090b" />
                    <rect x="11" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="10" y="12" width="1" height="1" fill="#ffffff" />

                    <rect x="18" y="12" width="4" height="4" fill="#09090b" />
                    <rect x="19" y="13" width="2" height="2" fill="#0f766e" />
                    <rect x="18" y="12" width="1" height="1" fill="#ffffff" />
                  </>
                )}

                {/* Rubor rosado o rojizo notorio en las mejillas (demuestra que finge indiferencia pero se avergüenza) */}
                <rect x="7" y="16" width="4" height="2" fill="#fb7185" opacity="0.9" />
                <rect x="8" y="16" width="2" height="1" fill="#f43f5e" />

                <rect x="20" y="16" width="4" height="2" fill="#fb7185" opacity="0.9" />
                <rect x="21" y="16" width="2" height="1" fill="#f43f5e" />

                {/* Boca: Pequeño puchero en zig-zag (~) o w tsundere clásica */}
                <rect x="13" y="18" width="1" height="1" fill="#9f1239" />
                <rect x="14" y="17" width="1" height="1" fill="#9f1239" />
                <rect x="15" y="18" width="1" height="1" fill="#9f1239" />
                <rect x="16" y="17" width="1" height="1" fill="#9f1239" />
                <rect x="17" y="18" width="1" height="1" fill="#9f1239" />
              </>
            )}
          </g>
        ) : isHard ? (
          /* ★★★ MODO DIFÍCIL: ASUKA (EXPRESIÓN MÁS SERIA, SEVERA Y ALTANERA) ★★★ */
          <g id="asuka-expression-frame">
            {mood === 'celebrating' ? (
              // Pose triunfante de superioridad (victoria de piloto de élite)
              <>
                {/* Cejas triunfantes */}
                <rect x="10" y="10" width="4" height="1" fill="#7c2d12" />
                <rect x="18" y="10" width="4" height="1" fill="#7c2d12" />

                {/* Ojos abiertos con superioridad */}
                <rect x="10" y="12" width="4" height="3" fill="#09090b" />
                <rect x="11" y="13" width="2" height="2" fill="#0284c7" />
                <rect x="10" y="12" width="1" height="1" fill="#ffffff" />
                <rect x="12" y="14" width="1" height="1" fill="#facc15" />

                <rect x="18" y="12" width="4" height="3" fill="#09090b" />
                <rect x="19" y="13" width="2" height="2" fill="#0284c7" />
                <rect x="18" y="12" width="1" height="1" fill="#ffffff" />
                <rect x="20" y="14" width="1" height="1" fill="#facc15" />

                {/* Rubor tenue de orgullo */}
                <rect x="8" y="16" width="3" height="1" fill="#f43f5e" opacity="0.8" />
                <rect x="21" y="16" width="3" height="1" fill="#f43f5e" opacity="0.8" />

                {/* Sonrisa triunfante y altanera */}
                <rect x="14" y="17" width="5" height="2" fill="#9f1239" />
                <rect x="15" y="18" width="3" height="1" fill="#be123c" />
              </>
            ) : (asukaAnimType === 'miss' || mood === 'smug' || lastEvent === 'MISS' || mood === 'nervous' || mistakes > 0) ? (
              // CUANDO EL JUGADOR FALLA / INCREMENTA FALLOS: Expresión decidida, orgullosa y severa (sin mueca burlona/smirk torcido)
              <>
                {/* Cejas decididas y firmes, inclinadas con seriedad */}
                <rect x="10" y="11" width="4" height="1" fill="#7c2d12" />
                <rect x="13" y="12" width="1" height="1" fill="#7c2d12" />

                <rect x="18" y="11" width="4" height="1" fill="#7c2d12" />
                <rect x="18" y="12" width="1" height="1" fill="#7c2d12" />

                {/* Ojos azules nítidos, enfocados y penetrantes */}
                <rect x="10" y="12" width="4" height="3" fill="#09090b" />
                <rect x="11" y="13" width="2" height="2" fill="#0284c7" />
                <rect x="10" y="12" width="1" height="1" fill="#ffffff" />
                <rect x="12" y="14" width="1" height="1" fill="#38bdf8" />

                <rect x="18" y="12" width="4" height="3" fill="#09090b" />
                <rect x="19" y="13" width="2" height="2" fill="#0284c7" />
                <rect x="18" y="12" width="1" height="1" fill="#ffffff" />
                <rect x="20" y="14" width="1" height="1" fill="#38bdf8" />

                {/* Rubor sutil y elegante */}
                <rect x="8" y="16" width="3" height="1" fill="#f43f5e" opacity="0.75" />
                <rect x="21" y="16" width="3" height="1" fill="#f43f5e" opacity="0.75" />

                {/* Boca firme y recta de reproche o concentración (limpia, centrada, sin mueca de lado ni colmillo) */}
                <rect x="13" y="18" width="6" height="1" fill="#9f1239" />
                <rect x="14" y="19" width="4" height="1" fill="#881337" />
              </>
            ) : mood === 'apologetic' ? (
              // Derrota / Game Over: Mirada seria de desaprobación
              <>
                {/* Cejas de desaprobación */}
                <rect x="10" y="11" width="4" height="1" fill="#7c2d12" />
                <rect x="18" y="11" width="4" height="1" fill="#7c2d12" />

                {/* Ojos serios */}
                <rect x="10" y="13" width="4" height="2" fill="#09090b" />
                <rect x="11" y="13" width="2" height="2" fill="#0284c7" />
                <rect x="10" y="13" width="1" height="1" fill="#ffffff" />

                <rect x="18" y="13" width="4" height="2" fill="#09090b" />
                <rect x="19" y="13" width="2" height="2" fill="#0284c7" />
                <rect x="18" y="13" width="1" height="1" fill="#ffffff" />

                <rect x="9" y="16" width="3" height="1" fill="#fb7185" opacity="0.6" />
                <rect x="20" y="16" width="3" height="1" fill="#fb7185" opacity="0.6" />

                {/* Boca cerrada pequeña y neutral */}
                <rect x="14" y="18" width="4" height="1" fill="#881337" />
              </>
            ) : (
              // Base / Idle: Mirada orgullosa, segura y estilizada de piloto de élite
              <>
                {/* Cejas parejas y estilizadas */}
                <rect x="10" y="11" width="4" height="1" fill="#7c2d12" />
                <rect x="18" y="11" width="4" height="1" fill="#7c2d12" />

                {/* Ojos expresivos y seguros */}
                <rect x="10" y="12" width="4" height="3" fill="#09090b" />
                <rect x="11" y="13" width="2" height="2" fill="#0284c7" />
                <rect x="10" y="12" width="1" height="1" fill="#ffffff" />
                <rect x="12" y="14" width="1" height="1" fill="#38bdf8" />

                <rect x="18" y="12" width="4" height="3" fill="#09090b" />
                <rect x="19" y="13" width="2" height="2" fill="#0284c7" />
                <rect x="18" y="12" width="1" height="1" fill="#ffffff" />
                <rect x="20" y="14" width="1" height="1" fill="#38bdf8" />

                {/* Rubor suave */}
                <rect x="8" y="16" width="3" height="1" fill="#fb7185" opacity="0.6" />
                <rect x="21" y="16" width="3" height="1" fill="#fb7185" opacity="0.6" />

                {/* Boca centrada, confiada y limpia */}
                <rect x="13" y="18" width="6" height="1" fill="#9f1239" />
                <rect x="14" y="19" width="4" height="1" fill="#be123c" />
              </>
            )}
          </g>
        ) : null}

        {/* === 5. VESTIMENTA === */}
        {isHard ? (
          /* ★★★ VESTIMENTA ROJA DE ASUKA (PLUGSUIT ROJO EVA-02) ★★★ */
          <g id="asuka-red-plugsuit">
            {/* Estructura ajustada en tonos rojos intensos */}
            <rect x="9" y="23" width="14" height="8" fill="#dc2626" />
            <rect x="7" y="25" width="4" height="6" fill="#b91c1c" />
            <rect x="21" y="25" width="4" height="6" fill="#b91c1c" />
            <rect x="10" y="24" width="12" height="7" fill="#ef4444" />

            {/* Detalles negros estructurados en el cuello */}
            <rect x="11" y="22" width="10" height="2" fill="#18181b" />
            <rect x="12" y="22" width="8" height="1" fill="#27272a" />

            {/* Detalles negros estructurados en los hombros */}
            <rect x="6" y="24" width="3" height="5" fill="#18181b" />
            <rect x="7" y="25" width="2" height="3" fill="#27272a" />
            <rect x="23" y="24" width="3" height="5" fill="#18181b" />
            <rect x="23" y="25" width="2" height="3" fill="#27272a" />

            {/* Diseño característico del traje de piloto en el centro del pecho (verde y amarillo) */}
            <rect x="13" y="24" width="6" height="6" fill="#18181b" />
            {/* Detalle verde central (núcleo del traje de piloto) */}
            <rect x="14" y="24" width="4" height="3" fill="#22c55e" />
            <rect x="15" y="25" width="2" height="1" fill="#4ade80" />
            {/* Detalle amarillo central del traje */}
            <rect x="14" y="27" width="4" height="2" fill="#facc15" />
            <rect x="15" y="27" width="2" height="1" fill="#fef08a" />

            {/* Franjas estilizadas del plugsuit en amarillo y naranja */}
            <rect x="11" y="25" width="2" height="5" fill="#f97316" />
            <rect x="12" y="26" width="1" height="4" fill="#facc15" />
            <rect x="19" y="25" width="2" height="5" fill="#f97316" />
            <rect x="19" y="26" width="1" height="4" fill="#facc15" />
          </g>
        ) : isNormal ? (
          /* ★★★ KALEA: ATUENDO EN EL BUSTO CON CUELLO DE MARINERO OSCURO (AZUL MARINO/NEGRO) Y DETALLES MENTA ★★★ */
          <g id="kalea-sailor-uniform">
            {/* Base simétrica en tonos oscuros (azul marino / negro profundo) */}
            <rect x="9" y="23" width="14" height="8" fill="#090d16" />
            <rect x="7" y="25" width="4" height="6" fill="#0f172a" />
            <rect x="21" y="25" width="4" height="6" fill="#0f172a" />

            {/* Cuello de marinero simétrico estructurado en azul marino/negro */}
            <rect x="10" y="22" width="12" height="3" fill="#1e293b" />
            <rect x="8" y="23" width="3" height="4" fill="#1e293b" />
            <rect x="21" y="23" width="3" height="4" fill="#1e293b" />

            {/* Ribetes claros / menta digital en las solapas del marinero */}
            <rect x="10" y="22" width="12" height="1" fill="#5eead4" />
            <rect x="8" y="23" width="1" height="4" fill="#5eead4" />
            <rect x="23" y="23" width="1" height="4" fill="#5eead4" />

            {/* Pechera central clara contrastante */}
            <rect x="12" y="23" width="8" height="4" fill="#f8fafc" />
            <rect x="13" y="24" width="6" height="3" fill="#f1f5f9" />

            {/* Pañuelo / broche central estilizado en menta brillante */}
            <rect x="14" y="24" width="4" height="3" fill="#14b8a6" />
            <rect x="15" y="25" width="2" height="4" fill="#2dd4bf" />
            <rect x="14" y="27" width="1" height="3" fill="#0f766e" />
            <rect x="17" y="27" width="1" height="3" fill="#0f766e" />
            <rect x="15" y="25" width="2" height="1" fill="#99f6e4" />
          </g>
        ) : (
          /* ★★★ LAYLA (MODO FÁCIL): CUELLO Y HOMBROS CON CHAQUETA FUTURISTA/ESTUDIANTIL EN TONOS BLANCO, VIOLETA OSCURO Y DETALLES DORADOS ★★★ */
          <g id="layla-futuristic-student-jacket" transform={`translate(0, ${laylaYOffset})`}>
            {/* Base del busto y torso en violeta oscuro / azul noche */}
            <rect x="9" y="23" width="14" height="8" fill="#2e1065" />
            <rect x="7" y="25" width="4" height="6" fill="#1e1b4b" />
            <rect x="21" y="25" width="4" height="6" fill="#1e1b4b" />

            {/* Chaqueta exterior estructurada en blanco brillante sobre hombros y cuello */}
            <rect x="6" y="24" width="4" height="6" fill="#ffffff" />
            <rect x="22" y="24" width="4" height="6" fill="#ffffff" />
            <rect x="7" y="24" width="2" height="5" fill="#f8fafc" />
            <rect x="23" y="24" width="2" height="5" fill="#f8fafc" />

            {/* Cuello de la chaqueta blanca */}
            <rect x="10" y="22" width="12" height="3" fill="#ffffff" />
            <rect x="9" y="23" width="2" height="3" fill="#e2e8f0" />
            <rect x="21" y="23" width="2" height="3" fill="#e2e8f0" />

            {/* Solapas interiores y forro en violeta oscuro profundo */}
            <rect x="11" y="23" width="10" height="2" fill="#3b0764" />
            <rect x="12" y="24" width="8" height="2" fill="#581c87" />

            {/* Ribetes y hombreras con acentos dorados tecnológicos característicos */}
            <rect x="6" y="23" width="4" height="1" fill="#facc15" />
            <rect x="22" y="23" width="4" height="1" fill="#facc15" />
            <rect x="6" y="25" width="1" height="4" fill="#fbbf24" />
            <rect x="25" y="25" width="1" height="4" fill="#fbbf24" />

            {/* Broche / corbatín central futurista con gema violeta y marco dorado */}
            <rect x="13" y="24" width="6" height="5" fill="#1e1b4b" />
            <rect x="14" y="24" width="4" height="4" fill="#facc15" />
            <rect x="15" y="25" width="2" height="2" fill="#a855f7" />
            <rect x="15" y="25" width="1" height="1" fill="#c084fc" />
            {/* Cinta estilizada inferior en violeta y oro */}
            <rect x="14" y="28" width="4" height="2" fill="#7e22ce" />
            <rect x="15" y="29" width="2" height="1" fill="#facc15" />
          </g>
        )}
        {/* === 6. ACCESORIOS DESBLOQUEABLES DE LA TIENDA RETRO === */}
        {accessoryId === 'glasses' && (
          <g id="acc-sunglasses">
            {/* Gafas oscuras 8-bit estilo Thug Life */}
            <rect x="7" y="13" width="7" height="3" fill="#000000" />
            <rect x="18" y="13" width="7" height="3" fill="#000000" />
            <rect x="14" y="14" width="4" height="1" fill="#000000" />
            {/* Brillo blanco en los lentes */}
            <rect x="8" y="13" width="2" height="1" fill="#ffffff" />
            <rect x="19" y="13" width="2" height="1" fill="#ffffff" />
          </g>
        )}

        {accessoryId === 'ribbon' && (
          <g id="acc-ribbon">
            {/* Lazo escarlata en la cabeza */}
            <rect x="14" y="1" width="4" height="3" fill="#dc2626" />
            <rect x="12" y="0" width="3" height="3" fill="#ef4444" />
            <rect x="17" y="0" width="3" height="3" fill="#ef4444" />
            <rect x="15" y="1" width="2" height="2" fill="#fecaca" />
          </g>
        )}

        {accessoryId === 'crown' && (
          <g id="acc-crown">
            {/* Corona dorada de campeón 8-bit */}
            <rect x="11" y="0" width="10" height="2" fill="#eab308" />
            <rect x="11" y="-2" width="2" height="2" fill="#facc15" />
            <rect x="15" y="-3" width="2" height="3" fill="#fef08a" />
            <rect x="19" y="-2" width="2" height="2" fill="#facc15" />
            {/* Gemas en la corona */}
            <rect x="12" y="0" width="1" height="1" fill="#ef4444" />
            <rect x="15" y="-1" width="2" height="1" fill="#3b82f6" />
            <rect x="19" y="0" width="1" height="1" fill="#10b981" />
          </g>
        )}
      </svg>
    </div>
  );
};

export const WaifuCompanion: React.FC<WaifuCompanionProps> = ({
  lastEvent,
  mistakes,
  maxMistakes,
  difficultyId,
  accessoryId = 'none'
}) => {
  const [currentDialogue, setCurrentDialogue] = useState<string>(() => {
    if (difficultyId === 'facil') {
      return '¡Hola de nuevo, qué alegría que hayas venido a jugar conmigo! Prometo ayudarte en todo lo que pueda para que ganemos.';
    }
    if (difficultyId === 'dificil') {
      return '¿En serio tuviste el valor de elegir este nivel? Qué patético, dudo que dures ni dos minutos con esta palabra.';
    }
    return '¡Soy Kalea! No es que me importes, pero concéntrate en adivinar las letras.';
  });
  const [mood, setMood] = useState<ShyStudentMood>('shy');
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const prevEventRef = useRef<string>('');

  const isEasy = difficultyId === 'facil';
  const isNormal = difficultyId === 'normal';
  const isHard = difficultyId === 'dificil';

  // Trigger dialogue and expressions based on game events and difficulty mode
  useEffect(() => {
    setIsBouncing(true);
    const bounceTimer = setTimeout(() => setIsBouncing(false), 500);

    // Audio chirp when she speaks
    soundManager.playWaifuChirp();

    if (lastEvent === 'START') {
      if (isEasy) {
        // Layla: 1. Al iniciar la partida (Bienvenida y entusiasmo)
        const phrases = [
          '¡Hola de nuevo, qué alegría que hayas venido a jugar conmigo! Prometo ayudarte en todo lo que pueda para que ganemos.',
          '¡Me pone tan contenta verte por aquí! He elegido una palabra muy bonita para nosotros. ¿Listo?',
          '¡Ji, ji! Me emociona mucho jugar contigo hoy. Tómate todo el tiempo del mundo, yo te cuido las espaldas.',
          '¡Qué emoción empezar otra partida a tu lado! Relájate y disfruta, vamos a resolver esto con calma.',
          '¡Hola, cari... ejem, hola! Digo... ¡qué gusto tenerte aquí! Hagamos de esta partida algo divertido.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('blushing');
      } else if (isHard) {
        // Asuka: 1. Al iniciar la partida (Desafío y burla)
        const phrases = [
          '¿En serio tuviste el valor de elegir este nivel? Qué patético, dudo que dures ni dos minutos con esta palabra.',
          '¿Vienes a perder el tiempo o crees que tienes lo necesario para competir conmigo? ¡Muéstrame algo de talento por una vez!',
          'Tres vidas solamente y palabras complejas. Si caes en tres turnos, no digas que no te lo advertí.',
          '¿De verdad crees que puedes seguirme el ritmo? Ja, prepárate para morder el polvo.',
          'No esperes compasión ni pistas regaladas aquí. O piensas rápido o te vas a casa.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('smug');
      } else {
        // Kalea: 1. Al iniciar la partida (Bienvenida a regañadientes y entrada dramática)
        const phrases = [
          'No es como que quisiera jugar contigo, ¿eh? Solo pasaba por aquí y... bueno, supongo que te ayudaré un poco con este panel.',
          '¿De verdad elegiste este nivel? Hmph... No esperes que te resuelva todo, vas a tener que esforzarte.',
          'Muy bien, empecemos. Y que conste que estoy aquí solo porque no tengo nada mejor que hacer, ¡no te hagas ilusiones!',
          'Te advierto que no voy a tener paciencia si te equivocas demasiado. ¡Más te vale concentrarte!',
          'No vayas a pensar que estaba esperando a que entraras a jugar. ¡Tengo cosas mejores que hacer, así que apárasela rápido!',
          '¿Otra vez por aquí? Hmph. Supongo que te acompañaré un rato, pero no te acostumbres a mi ayuda.',
          'Te advierto que si pierdes rápido, me voy a marchar. ¡Pon atención desde el primer intento!'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('tsundere');
      }
    } else if (lastEvent === 'HIT') {
      if (isEasy) {
        // Layla: 2. Cuando aciertas una letra (Celebración y afecto)
        const phrases = [
          '¡Ay, lo hiciste genial! Eres súper inteligente, me encanta cuando aciertas así.',
          '¡Qué orgullo! Cada vez lo haces mejor, te mereces un abrazo virtual por eso.',
          '¡Siiii! ¡Esa letra era perfecta! Mi corazoncito se pone feliz cuando le atinas.',
          '¡Qué rapidez y qué talento! De verdad me impresiona lo bien que se te da esto.',
          '¡Eso es, mi querido jugador! Vas volando hacia la victoria, ¡sigue así!'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('celebrating');
      } else if (isHard) {
        // Asuka: 2. Cuando aciertas una letra (Reconocimiento a regañadientes)
        const phrases = [
          'Hmph... Una casualidad, seguro. No te creas un genio por un simple acierto.',
          'Bien hecho, supongo... Pero no celebres todavía, lo verdaderamente difícil apenas comienza.',
          'Pasable. Aunque con el poco margen de vidas que tienes, más te vale no volver a dudar.',
          'Mmh, no estuvo mal. Sorprendente para alguien como tú, pero no te me confíes.',
          'Atinaste una... Gran cosa. Aún te quedan bastantes casilleros vacíos, así que no te distraigas.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('smug');
      } else {
        // Kalea: 2. Cuando aciertas una letra (Orgullosa, contenta y en negación)
        const phrases = [
          'B-bueno, supongo que no estuvo tan mal... ¡Pero no te creas tanto por un solo acierto!',
          'Hmph, al menos tienes un poco de sentido común. No te vayas a emocionar, ¿eh?',
          'Esa letra... fue pura suerte, seguro. Aunque, bueno, admito que estuvo pasable.',
          '¡Vaya! Parece que tu cerebro sí funciona de vez en cuando. Sigue así, supongo.',
          '¡No te creas un genio solo por atinarle a esa! Cualquiera con dos dedos de frente lo habría hecho.',
          'A-ah... ¿Ves? Te dije que prestando un poco de atención saldría. Aunque supongo que tú pusiste de tu parte, un poquito.',
          'Hmph, qué casualidad tan más grande. Pero bueno, avanza con la siguiente antes de que cambie de opinión.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('tsundere');
      }
    } else if (lastEvent === 'MISS') {
      if (isEasy) {
        // Layla: 3. Cuando fallas una letra / Pierdes vida (Consuelo y mimo)
        const phrases = [
          'No te preocupes por un desliz, a cualquiera le pasa. Estoy aquí contigo, así que respira hondo.',
          'Ay, un pequeño tropezón... No pasa nada absoluto, todavía tienes muchas oportunidades y yo creo en ti.',
          'Oh... no pongas esa carita, un error no define nada. Vamos a concentrarnos juntitos para la que sigue, ¿sí?',
          'Tranquilo, mi niño... las equivocaciones son normales. Date un respiro y piénsalo con calma.',
          'Ay, me duele un poquito cuando fallas, ¡pero sé que te vas a recuperar enseguida! Ánimo.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('nervous');
      } else if (isHard) {
        // Asuka: 3. Cuando fallas una letra / Pierdes vida (Burla y regaño duro)
        const phrases = [
          '¡Jaja! ¿De verdad ibas a adivinar eso? Qué movimiento tan torpe.',
          '¡Otra vida menos! A este paso vas a romper el récord mundial de fracasos estrepitosos.',
          '¿Estás adivinando al azar o tu cerebro simplemente se desconectó? ¡Qué vergüenza me das!',
          '¡¿Pero qué haces?! Te quedan poquísimas vidas y sigues regalando intentos a lo tonto.',
          '¡Basta de vacilar! Un error más y esto se acaba. ¿Vas a ponerte serio de una vez o qué?'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('smug');
      } else {
        // Kalea: 3. Cuando fallas una letra / Pierdes vida (Enojo, regaños y leve vergüenza)
        const phrases = [
          '¡¿Estás ciego o qué?! ¡¿Cómo vas a fallar una letra tan obvia?! ¡Baka!',
          '¡Ten más cuidado! Te quedan pocas vidas y no pienso rescatarte si pierdes por descuido.',
          'Ay, por favor... concéntrate de una vez. No es que me preocupe por ti, ¡sino que me da vergüenza ver cómo pierdes!',
          '¡Hmph! Otro error tonto. Si sigues así, vas a arruinar la partida tú solito.',
          '¡Oye! ¿Estás jugando con los ojos cerrados o qué te pasa? ¡Qué frustración contigo!',
          '¡Baka! ¿Cómo vas a arriesgar una vida en eso? Me vas a dar un dolor de cabeza...',
          'Si sigues fallando así, voy a tener que cobrarte por cada pista. ¡Despierta ya!'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('tsundere');
      }
    } else if (lastEvent === 'WIN') {
      if (isEasy) {
        // Layla: 4. Cuando ganas la partida (Victoria y ternura)
        const phrases = [
          '¡Lo logramos! ¡Eres el mejor! Estoy tan, tan feliz de que hayamos ganado juntos.',
          '¡Yupi! ¡Victoria absoluta! Sabía que podías hacerlo, eres brillante en esto.',
          '¡Increíble! Has dejado el panel reluciente. De verdad, me alegra muchísimo ver tu éxito.',
          '¡Lo hiciste perfecto de principio a fin! Estoy aplaudiéndote desde aquí, ¡te fue excelente!'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('celebrating');
      } else if (isHard) {
        // Asuka: 4. Cuando ganas la partida (Victoria e impacto)
        const phrases = [
          '¿Lo... lograste? Ugh, supongo que subestimé un poco tu suerte. ¡Pero no te acostumbres!',
          'Victoria inesperada. Aunque la mayor parte del mérito fue mi presencia exigente... ¡pero bien jugado!',
          'Vaya, parece que al final sí tenías algo de cerebro guardado. Nada mal, supongo.',
          '¡Ganaste! Pero no te creas la gran cosa, la próxima vez no te la voy a poner tan fácil.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('smug');
      } else {
        // Kalea: 4. Cuando ganas la partida (Alegría disimulada y felicidad oculta)
        const phrases = [
          '¡N-no está nada mal! Aunque obviamente ganaste porque yo te di las pistas correctas, ¿entendido?',
          'Lo logramos... pero que conste que tú hiciste la mitad del trabajo pesada. ¡Igual... buen trabajo, supongo!',
          '¡Hmph! Al final sí pudiste. N-no es que dudara de ti ni nada parecido, pero admito que me impresionaste un poco.',
          '¡G-ganamos! No vayas a creer que estoy feliz por ti, solo me alegra haber terminado este panel... ¡T-tonto!',
          'No estuvo tan mal... Digo, ¡por fin terminaste! Ya era hora de que demostraras algo de nivel.',
          'P-pues claro que ganaríamos, con una guía como yo era obvio. ¡Pero supongo que tú también lo hiciste bien, no te enorgullezcas!',
          '¡V-victoria! Hmph, me alegro un poco, pero no me mires con esa cara de triunfo.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('blushing');
      }
    } else if (lastEvent === 'LOSE') {
      if (isEasy) {
        // Layla: 5. Cuando pierdes la partida (Game Over dulce)
        const phrases = [
          'Ay... nos quedamos sin intentos, pero no te pongas triste, por favor. Lo importante es que nos divertimos.',
          'No pasa nada si hoy la suerte no nos acompañó. Descansa un ratito y cuando quieras lo intentamos de nuevo, ¿de acuerdo?',
          'Se acabaron las vidas, pero para mí igual jugaste de maravilla. ¡No te des por vencido!',
          'Un pequeño traspié, nada más. Sacúdete el polvo, sonríe y verás que la próxima vez lo conseguimos.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('apologetic');
      } else if (isHard) {
        // Asuka: 5. Cuando pierdes la partida (Game Over despiadado)
        const phrases = [
          '¡Era obvio! Con ese nivel de torpeza no podías esperar ganar. ¡Vuelve a intentarlo cuando practiques más!',
          'Derrota total. Qué desastre... Ríndete de una vez si no piensas esforzarte en serio.',
          'Te lo dije desde el principio. Este nivel no es para cualquiera y tú acabas de comprobarlo.',
          '¿Ya te quedaste sin vidas? Qué aburrido. Vete a jugar en el Modo Fácil si no puedes con la presión.'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('smug');
      } else {
        // Kalea: 5. Cuando pierdes la partida (Frustración, enojo y reproche)
        const phrases = [
          '¡¿Pero cómo pudiste perder?! ¡Te lo advertí mil veces! Ahora me vas a hacer quedar mal...',
          'Tsk... qué desastre. Te quedaste sin vidas por no prestar atención. Vamos, dale a reintentar, no pienso dejar que termine así.',
          '¡Ahhh! ¡Qué rabia! Estuvimos tan cerca... Más te vale empezar otra partida ahora mismo y compensarlo.',
          'Increíble... fallaste la palabra. En fin, supongo que tendré que seguir cuidándote. ¡Vamos otra vez!',
          'Te lo dije una y otra vez, pero prefieres ignorarme. ¡Tú te lo buscaste por terco!',
          'Qué final tan predecible... Vete a practicar un poco más antes de volver a retarme, ¿quieres?',
          'Me rehúso a seguir viendo esto. ¡Se acabó! Y no me culpes a mí por tu derrota, ¿entendido?'
        ];
        const pick = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentDialogue(pick);
        setMood('tsundere');
      }
    }

    prevEventRef.current = lastEvent;

    return () => clearTimeout(bounceTimer);
  }, [lastEvent, isEasy, isNormal, isHard, dialogueIndex]);

  // Click on her to interact
  const handleCompanionClick = () => {
    soundManager.playWaifuChirp();
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    let extraPhrases: string[] = [];
    if (isEasy) {
      // Layla
      extraPhrases = [
        '¡Hola de nuevo, qué alegría que hayas venido a jugar conmigo! Prometo ayudarte en todo lo que pueda para que ganemos.',
        '¡Me pone tan contenta verte por aquí! He elegido una palabra muy bonita para nosotros. ¿Listo?',
        '¡Ji, ji! Me emociona mucho jugar contigo hoy. Tómate todo el tiempo del mundo, yo te cuido las espaldas.',
        '¡Qué emoción empezar otra partida a tu lado! Relájate y disfruta, vamos a resolver esto con calma.',
        '¡Hola, cari... ejem, hola! Digo... ¡qué gusto tenerte aquí! Hagamos de esta partida algo divertido.',
        'Tranquilo, mi niño... las equivocaciones son normales. Date un respiro y piénsalo con calma.',
        '¡Eso es, mi querido jugador! Vas volando hacia la victoria, ¡sigue así!'
      ];
      setMood('blushing');
    } else if (isHard) {
      // Asuka
      extraPhrases = [
        '¿En serio tuviste el valor de elegir este nivel? Qué patético, dudo que dures ni dos minutos con esta palabra.',
        '¿Vienes a perder el tiempo o crees que tienes lo necesario para competir conmigo? ¡Muéstrame algo de talento por una vez!',
        'Tres vidas solamente y palabras complejas. Si caes en tres turnos, no digas que no te lo advertí.',
        '¿De verdad crees que puedes seguirme el ritmo? Ja, prepárate para morder el polvo.',
        'No esperes compasión ni pistas regaladas aquí. O piensas rápido o te vas a casa.',
        '¡Basta de vacilar! Un error más y esto se acaba. ¿Vas a ponerte serio de una vez o qué?'
      ];
      setMood('smug');
    } else {
      // Kalea: Frases Tsundere interactivas
      extraPhrases = [
        'No es como que quisiera jugar contigo, ¿eh? Solo pasaba por aquí y... bueno, supongo que te ayudaré un poco con este panel.',
        '¿De verdad elegiste este nivel? Hmph... No esperes que te resuelva todo, vas a tener que esforzarte.',
        'Muy bien, empecemos. Y que conste que estoy aquí solo porque no tengo nada mejor que hacer, ¡no te hagas ilusiones!',
        'Te advierto que no voy a tener paciencia si te equivocas demasiado. ¡Más te vale concentrarte!',
        '¡Hmph! Tampoco te equivoques tanto, o tendré que ayudarte a la fuerza. ¡Concéntrate!',
        '¡¿Q-qué me miras tanto?! Solo concéntrate en adivinar las letras... ¡Baka!'
      ];
      setMood('tsundere');
    }

    setDialogueIndex((prev) => prev + 1);
    setCurrentDialogue(extraPhrases[(dialogueIndex + 1) % extraPhrases.length]);
  };

  const getStatusBadge = () => {
    if (isEasy) {
      switch (mood) {
        case 'celebrating':
          return { label: '¡FELIZ!', color: 'text-amber-400 bg-amber-950/80 border-amber-500' };
        case 'blushing':
          return { label: '¡SONROJADA!', color: 'text-rose-400 bg-rose-950/80 border-rose-500' };
        case 'nervous':
          return { label: '¡NERVIOSA!', color: 'text-amber-400 bg-amber-950/80 border-amber-600' };
        case 'apologetic':
          return { label: 'DISCULPAS', color: 'text-zinc-300 bg-zinc-900 border-zinc-700' };
        default:
          return { label: 'DULCE', color: 'text-amber-300 bg-amber-950/80 border-amber-600' };
      }
    }

    if (isHard) {
      switch (mood) {
        case 'smug':
          return { label: '¡ANTA BAKA!', color: 'text-red-400 bg-red-950/80 border-red-600' };
        case 'celebrating':
          return { label: '¡É L I T E!', color: 'text-amber-400 bg-amber-950/80 border-amber-500' };
        default:
          return { label: 'EVA PILOT', color: 'text-red-400 bg-red-950/80 border-red-600' };
      }
    }

    // Normal: Kalea
    switch (mood) {
      case 'tsundere':
        return { label: 'TSUNDERE', color: 'text-teal-300 bg-teal-950/80 border-teal-500' };
      case 'blushing':
        return { label: '¡H-MPH!', color: 'text-rose-400 bg-rose-950/80 border-rose-500' };
      case 'celebrating':
        return { label: '¡RECONOCIDO!', color: 'text-emerald-400 bg-emerald-950/80 border-emerald-500' };
      default:
        return { label: 'PELO NEGRO', color: 'text-zinc-200 bg-zinc-950/80 border-cyan-500' };
    }
  };

  const badge = getStatusBadge();

  const getCompanionTitle = () => {
    if (isEasy) return 'LAYLA · MODO FÁCIL';
    if (isNormal) return 'KALEA · MODO NORMAL';
    return 'ASUKA · MODO DIFÍCIL';
  };

  return (
    <aside
      aria-label="Copiloto del Ahorcado"
      className="w-full bg-zinc-900 border-2 sm:border-3 border-black pixel-card p-1.5 sm:p-2.5 shadow-[3px_3px_0px_#000] relative flex flex-col gap-1 sm:gap-1.5"
    >
      {/* Header Tag with Name & Status */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-1">
        <div className="flex items-center gap-1 min-w-0">
          {isHard ? (
            <Flame className="w-3 h-3 text-red-500 animate-pulse shrink-0" />
          ) : (
            <Heart className={`w-3 h-3 animate-pulse shrink-0 ${isEasy ? 'text-amber-400 fill-amber-400' : 'text-teal-400 fill-teal-400'}`} />
          )}
          <span className={`font-pixel text-[9px] sm:text-[10px] font-bold tracking-tight truncate ${isEasy ? 'text-amber-300' : isNormal ? 'text-teal-300' : 'text-red-400'}`}>
            {getCompanionTitle()}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <span
            className={`font-pixel text-[7.5px] sm:text-[8px] px-1.5 py-0.2 border ${badge.color}`}
          >
            {badge.label}
          </span>
          <button
            type="button"
            onClick={handleCompanionClick}
            className="p-0.5 hover:bg-zinc-800 text-zinc-400 hover:text-amber-300 border border-zinc-700 transition-colors"
            title="Toca para interactuar con la copiloto"
            aria-label="Hablar con la copiloto"
          >
            <Sparkles className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Main Container: Student Pixel Sprite + RPG Dialogue Box */}
      <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-1.5 sm:gap-2">
        {/* Clickable 8-bit Student Sprite */}
        <button
          type="button"
          onClick={handleCompanionClick}
          className="relative group p-0.5 sm:p-1 bg-zinc-950 border-2 border-black shadow-[1px_1px_0_#000] hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-none shrink-0"
          title={isEasy ? "¡Haz clic en Layla!" : isNormal ? "¡Haz clic en Kalea!" : "¡Haz clic en Asuka!"}
          aria-label="Interactuar con el avatar de la copiloto"
        >
          <ShyStudentPixelSprite
            mood={mood}
            isBouncing={isBouncing}
            difficultyId={difficultyId}
            lastEvent={lastEvent}
            accessoryId={accessoryId}
            mistakes={mistakes}
          />
          {/* Badge icon on hover */}
          <span className={`absolute -bottom-1 -right-1 border border-black p-0.5 text-white shadow-[1px_1px_0_#000] ${isEasy ? 'bg-amber-500' : isNormal ? 'bg-teal-600' : 'bg-red-600'}`}>
            <MessageCircle className="w-2.5 h-2.5" />
          </span>
        </button>

        {/* 8-bit RPG Style Speech Bubble */}
        <div className="relative w-full bg-black border-2 border-zinc-700 p-1.5 sm:p-2 shadow-[inset_1px_1px_0_#18181b] min-h-[48px] sm:min-h-[56px] max-h-[76px] sm:max-h-[90px] flex flex-col justify-between overflow-hidden">
          {/* Speech arrow */}
          <div
            className="hidden sm:block lg:hidden absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-6 border-r-black"
            style={{ shapeRendering: 'crispEdges' }}
          />
          <div
            className="block sm:hidden lg:block absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-6 border-b-black"
            style={{ shapeRendering: 'crispEdges' }}
          />

          <p className="font-sans text-[11px] sm:text-xs text-zinc-100 leading-snug font-medium line-clamp-3 overflow-hidden">
            "{formatRetroText(currentDialogue)}"
          </p>

          <div className="flex items-center justify-between mt-0.5 text-[7.5px] sm:text-[8px] font-pixel text-zinc-500">
            <span className="text-zinc-500 flex items-center gap-1">
              {isHard ? (
                <Flame className="w-2.5 h-2.5 text-red-500 inline" />
              ) : (
                <Heart className={`w-2.5 h-2.5 inline ${isEasy ? 'text-amber-400' : 'text-teal-400'}`} />
              )}
              {isEasy ? 'Layla' : isNormal ? 'Kalea' : 'Asuka'}
            </span>
            <span className={isEasy ? 'text-amber-400 animate-pulse' : isNormal ? 'text-teal-400 animate-pulse' : 'text-red-400 animate-pulse'}>▼</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

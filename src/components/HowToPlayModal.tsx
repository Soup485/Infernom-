import React from 'react';
import { HelpCircle, X, ShieldAlert, CheckCircle2, Keyboard, Lightbulb, Sparkles, Heart } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-lg bg-zinc-900 border-4 border-black p-6 shadow-[8px_8px_0px_#000] pixel-card max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white border-2 border-black bg-zinc-800 hover:bg-zinc-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-amber-500/20 border-2 border-black shadow-[2px_2px_0px_#000] text-amber-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-pixel text-sm sm:text-base font-bold text-amber-400">CÓMO JUGAR</h2>
            <p className="font-silkscreen text-xs text-zinc-400 mt-1">PERSONA DE PALITOS · PIXEL ART</p>
          </div>
        </div>

        <div className="space-y-3 font-silkscreen text-xs text-zinc-300">
          <div className="flex items-start gap-3 p-3 bg-red-950/40 border-2 border-red-900">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-pixel text-[10px] text-red-300 block mb-1">
                VIDAS SEGÚN DIFICULTAD:
              </strong>
              <span>
                • <strong>¿EN SERIO? (6 Vidas)</strong>: Cabeza, tronco, brazo izq., brazo der., pierna izq., pierna der.<br/>
                • <strong>ALGO JUSTO (4 Vidas)</strong>: Cabeza, tronco, ambos brazos, ambas piernas.<br/>
                • <strong>GOD OF WAR (3 Vidas)</strong>: 1. Cabeza bonita, 2. Cuerpo y brazos, 3. Piernas (Game Over).
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-950/40 border-2 border-amber-900">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-pixel text-[10px] text-amber-300 block mb-1">
                3 NIVELES DE DIFICULTAD (MODO RÁPIDO):
              </strong>
              <div className="space-y-1 text-[11px]">
                <p>• <strong className="text-emerald-400">FÁCIL (Layla)</strong>: Palabras cortas (3-5 letras) · 6 Vidas · <span className="text-amber-300 font-bold">+10 Pixel Coins</span>.</p>
                <p>• <strong className="text-teal-400">NORMAL (Kalea)</strong>: Palabras intermedias (5-7 letras) · 4 Vidas · <span className="text-teal-300 font-bold">+20 Pixel Coins</span>.</p>
                <p>• <strong className="text-red-400">DIFÍCIL (Asuka)</strong>: Palabras complejas (8-12+ letras) · 3 Vidas · <span className="text-red-300 font-bold">+35 Pixel Coins</span>.</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-950 border-2 border-zinc-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-pixel text-[10px] text-emerald-400 block mb-1">
                PALABRAS COTIDIANAS EN ESPAÑOL:
              </strong>
              <span>
                Todas las palabras son fáciles y comunes (animales, comida, hogar, naturaleza, deportes). ¡Nada de términos raros!
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-purple-950/40 border-2 border-purple-800">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-pixel text-[10px] text-amber-300 block mb-1">
                MAPA DE NODOS, TIENDA & FINALES MÚLTIPLES:
              </strong>
              <span>
                • <strong>Mapa de Nodos RPG</strong>: Escoge rutas entre Layla (+10 Coins), Kalea (+25 Coins) o Asuka (+50 Coins). Enfréntate a Jefes Arcade con barra de tiempo límite para ganar el doble de monedas.<br/>
                • <strong>Tienda Retro</strong>: Usa tus PixelCoins para desbloquear paletas (Game Boy, Synthwave, Cyberpunk), accesorios sprite (gafas, lazo, corona) y soundtest.<br/>
                • <strong>True Ending ("Dios del Ahorcado")</strong>: Supera al menos 3 nodos en cada ruta sin perder vidas en una sesión.<br/>
                • <strong>Good Ending ("Confesión / Amistad")</strong>: Racha de 5 victorias con 0 fallos con una copiloto.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-pink-950/40 border-2 border-pink-800">
            <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-pixel text-[10px] text-rose-300 block mb-1">
                COPILOTOS SORPRESA:
              </strong>
              <span>
                Cada dificultad cuenta con una copiloto anime exclusiva y secreta que reacciona en tiempo real a tus aciertos, fallos y victorias. ¡Descúbrelas seleccionando cada dificultad en el menú principal!
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-950 border-2 border-zinc-800">
            <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-pixel text-[10px] text-indigo-300 block mb-1">
                REVELACIÓN AL PERDER:
              </strong>
              <span>
                Si pierdes las 6 vidas, la palabra secreta se muestra en grande de inmediato al final.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-950 border-2 border-zinc-800">
            <Keyboard className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
            <div>
              <strong className="font-pixel text-[10px] text-zinc-200 block mb-1">
                TECLADO CON Ñ Y ACENTOS:
              </strong>
              <span>
                Puedes usar el teclado en pantalla o tu teclado físico. La letra A descubre tanto A como Á.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t-2 border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-xs border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            ¡JUGAR YA!
          </button>
        </div>
      </div>
    </div>
  );
};

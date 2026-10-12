import React, { useState } from 'react';
import { Users, Sparkles, X, AlertCircle } from 'lucide-react';
import { WordItem } from '../data/words';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomGame: (customWord: WordItem) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  onStartCustomGame
}) => {
  const [wordInput, setWordInput] = useState('');
  const [hintInput, setHintInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWord = wordInput.trim().toUpperCase();

    if (cleanWord.length < 3) {
      setError('La palabra debe tener al menos 3 letras.');
      return;
    }
    if (cleanWord.length > 20) {
      setError('La palabra no puede tener más de 20 letras.');
      return;
    }
    const validLettersRegex = /^[A-ZÁÉÍÓÚÜÑ\s]+$/;
    if (!validLettersRegex.test(cleanWord)) {
      setError('Solo letras en español (sin números).');
      return;
    }

    const customItem: WordItem = {
      id: `custom_${Date.now()}`,
      word: cleanWord,
      category: 'Desafío 2P',
      hint: hintInput.trim() || 'Palabra puesta por tu amigo',
      difficulty: cleanWord.length <= 5 ? 'facil' : cleanWord.length <= 7 ? 'normal' : 'dificil'
    };

    onStartCustomGame(customItem);
    setWordInput('');
    setHintInput('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-md bg-zinc-900 border-4 border-black p-6 shadow-[8px_8px_0px_#000] pixel-card">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white border-2 border-black bg-zinc-800 hover:bg-zinc-700 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-indigo-500/20 border-2 border-black shadow-[2px_2px_0px_#000] text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-pixel text-sm sm:text-base font-bold text-indigo-400">RETAR AMIGO</h2>
            <p className="font-silkscreen text-xs text-zinc-400 mt-1">MODO 2 JUGADORES ARCADE</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-pixel text-[10px] text-zinc-300 mb-2">
              PALABRA SECRETA:
            </label>
            <input
              type="text"
              value={wordInput}
              onChange={(e) => {
                setWordInput(e.target.value);
                setError(null);
              }}
              placeholder="EJ: GUITARRA"
              maxLength={20}
              autoFocus
              className="w-full px-4 py-2.5 bg-black border-2 border-zinc-700 text-white font-pixel text-xs sm:text-sm uppercase tracking-wider focus:outline-none focus:border-amber-400 shadow-[inset_2px_2px_0px_#000]"
            />
            <span className="font-silkscreen text-[11px] text-zinc-400 mt-1.5 block">
              Tu amigo tendrá 6 vidas antes de que se complete el muñeco.
            </span>
          </div>

          <div>
            <label className="block font-pixel text-[10px] text-zinc-300 mb-2">
              PISTA (OPCIONAL):
            </label>
            <input
              type="text"
              value={hintInput}
              onChange={(e) => setHintInput(e.target.value)}
              placeholder="Ej: Instrumento musical de 6 cuerdas"
              maxLength={60}
              className="w-full px-4 py-2.5 bg-black border-2 border-zinc-700 text-white font-silkscreen text-xs focus:outline-none focus:border-amber-400 shadow-[inset_2px_2px_0px_#000]"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-red-950 border-2 border-red-700 text-xs text-red-200 font-silkscreen">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 bg-black border-2 border-zinc-800 font-silkscreen text-xs text-zinc-400 space-y-1">
            <p className="font-pixel text-[9px] text-amber-400">REGLAS DEL RETO:</p>
            <p>• 6 vidas para la persona de palitos.</p>
            <p>• Recibirá 1 a 2 letras iniciales de pista.</p>
            <p>• Si pierde, verá la palabra al final.</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="font-pixel text-[10px] text-zinc-400 hover:text-white px-3 py-2"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-black font-pixel text-xs border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              ¡INICIAR!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

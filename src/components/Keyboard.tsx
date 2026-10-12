import React from 'react';
import { normalizeChar } from '../data/words';

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
  guessedLetters: Set<string>;
  targetWord: string;
  disabled: boolean;
}

export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export const Keyboard: React.FC<KeyboardProps> = ({
  onLetterClick,
  guessedLetters,
  targetWord,
  disabled
}) => {
  const wordChars = React.useMemo(() => {
    const set = new Set<string>();
    for (const ch of targetWord) {
      if (ch !== ' ' && ch !== '-' && ch !== "'") {
        set.add(normalizeChar(ch));
      }
    }
    return set;
  }, [targetWord]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-1 sm:gap-1.5 px-0.5 sm:px-1 py-0.5 select-none touch-manipulation">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1.5">
          {row.map((letter) => {
            const normalized = normalizeChar(letter);
            const isGuessed = guessedLetters.has(normalized);
            const isCorrect = isGuessed && wordChars.has(normalized);
            const isWrong = isGuessed && !wordChars.has(normalized);
            const isButtonDisabled = disabled || isGuessed;

            let buttonStyle = 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 active:translate-x-0.5 active:translate-y-0.5 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer';

            if (isCorrect) {
              buttonStyle = 'bg-emerald-950 border-2 border-black text-emerald-400 opacity-90 cursor-not-allowed shadow-[1px_1px_0px_#000] translate-x-0.5 translate-y-0.5';
            } else if (isWrong) {
              buttonStyle = 'bg-zinc-950 border-2 border-black text-zinc-600 line-through opacity-40 cursor-not-allowed shadow-none translate-x-0.5 translate-y-0.5';
            } else if (disabled) {
              buttonStyle = 'bg-zinc-900 border-2 border-black text-zinc-600 cursor-not-allowed opacity-50 shadow-none';
            }

            return (
              <button
                key={letter}
                type="button"
                onClick={() => onLetterClick(letter)}
                disabled={isButtonDisabled}
                aria-label={`Letra ${letter}`}
                className={`h-8 sm:h-9 md:h-10 min-w-[25px] sm:min-w-[34px] md:min-w-[38px] flex-1 max-w-[38px] sm:max-w-[42px] font-pixel text-[10px] sm:text-xs md:text-sm flex items-center justify-center transition-all touch-manipulation ${buttonStyle}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

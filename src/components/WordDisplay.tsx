import React from 'react';
import { motion } from 'motion/react';
import { normalizeChar } from '../data/words';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  starterClues?: string[]; // 1 to 2 letters given as hint
  revealAll?: boolean;
  isWon?: boolean;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  word,
  guessedLetters,
  starterClues = [],
  revealAll = false,
  isWon = false
}) => {
  const words = word.split(' ');
  const maxWordLength = Math.max(...words.map((w) => w.length), 0);
  const totalLetters = word.replace(/\s/g, '').length;

  // Compute responsive letter box size classes based on word length
  const getBoxClasses = () => {
    if (maxWordLength >= 12 || totalLetters >= 14) {
      return {
        box: 'w-4.5 h-6.5 min-w-[18px] sm:w-6 sm:h-8 md:w-8 md:h-10 border sm:border-2 md:border-3',
        text: 'text-[9.5px] sm:text-xs md:text-sm',
        underline: 'w-3.5 sm:w-5 h-0.5 sm:h-1',
        gap: 'gap-0.5 sm:gap-1',
        groupGap: 'gap-x-1.5 gap-y-1 sm:gap-x-2.5 sm:gap-y-1.5'
      };
    }
    if (maxWordLength >= 8 || totalLetters >= 8) {
      return {
        box: 'w-5.5 h-7.5 min-w-[22px] sm:w-7 sm:h-9 md:w-9 md:h-11 border-2 md:border-3',
        text: 'text-[11px] sm:text-sm md:text-base',
        underline: 'w-4 sm:w-5.5 h-0.5 sm:h-1',
        gap: 'gap-0.5 sm:gap-1',
        groupGap: 'gap-x-2 gap-y-1 sm:gap-x-3 sm:gap-y-1.5'
      };
    }
    return {
      box: 'w-7 h-9 sm:w-9 sm:h-11 md:w-11 md:h-13 border-2 sm:border-3 md:border-4',
      text: 'text-sm sm:text-base md:text-xl',
      underline: 'w-5.5 sm:w-8 h-1',
      gap: 'gap-1 sm:gap-1.5',
      groupGap: 'gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2'
    };
  };

  const styleClasses = getBoxClasses();

  return (
    <div className="flex flex-col items-center my-1 sm:my-2 px-1 w-full max-w-full select-none overflow-hidden">
      {/* Letter slots grid in Pixel Art */}
      <div className={`flex flex-wrap items-center justify-center max-w-full ${styleClasses.groupGap}`}>
        {words.map((subWord, wordIndex) => (
          <div key={wordIndex} className={`flex items-center ${styleClasses.gap} shrink-0`}>
            {Array.from(subWord).map((char, charIndex) => {
              const normalized = normalizeChar(char);
              const isGuessed = guessedLetters.has(normalized);
              const isStarterClue = starterClues.includes(normalized);
              const showLetter = isGuessed || revealAll;
              const isMissedLetter = revealAll && !isGuessed;

              return (
                <div
                  key={charIndex}
                  className="relative flex flex-col items-center justify-center shrink-0"
                >
                  {/* Pixel Tile Box */}
                  <div
                    className={`${styleClasses.box} flex items-center justify-center border-black font-pixel ${styleClasses.text} font-bold transition-transform ${
                      isWon
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-[3px_3px_0px_#000]'
                        : isMissedLetter
                        ? 'bg-red-950 border-red-500 text-red-300 shadow-[3px_3px_0px_#000] animate-pulse'
                        : isGuessed
                        ? isStarterClue
                          ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-[3px_3px_0px_#000]'
                          : 'bg-zinc-800 border-zinc-500 text-white shadow-[3px_3px_0px_#000]'
                        : 'bg-zinc-900 border-zinc-700 text-transparent shadow-[2px_2px_0px_#000]'
                    }`}
                    style={{
                      boxShadow: showLetter ? '2px 2px 0px #000' : '1px 1px 0px #000'
                    }}
                  >
                    {showLetter ? (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        className={
                          isMissedLetter
                            ? 'text-red-400 font-pixel'
                            : isWon
                            ? 'text-emerald-300 font-pixel'
                            : isStarterClue
                            ? 'text-amber-300 font-pixel'
                            : 'text-zinc-100 font-pixel'
                        }
                      >
                        {char}
                      </motion.span>
                    ) : (
                      <span className="w-3 sm:w-4 h-1 sm:h-1.5 bg-zinc-600" />
                    )}
                  </div>

                  {/* Pixel underline token */}
                  <div
                    className={`mt-1 ${styleClasses.underline} transition-colors ${
                      isWon
                        ? 'bg-emerald-400'
                        : isMissedLetter
                        ? 'bg-red-500'
                        : isGuessed
                        ? isStarterClue
                          ? 'bg-amber-400'
                          : 'bg-zinc-300'
                        : 'bg-zinc-700'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Starter Clues Banner in Pixel Font */}
      {starterClues.length > 0 && !revealAll && !isWon && (
        <div className="mt-3 flex items-center gap-2 font-silkscreen text-[11px] text-amber-300 bg-amber-950/60 border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
          <span className="font-bold">★ LETRAS INICIALES:</span>
          <span className="font-pixel text-[10px] text-amber-400">
            {starterClues.join(' · ')}
          </span>
        </div>
      )}
    </div>
  );
};

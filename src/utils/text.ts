/**
 * Utility for formatting and sanitizing retro game text and ensuring
 * proper glyphs and Spanish accents (C, Í, Ñ, Á, É, Ó, Ú).
 */
export const formatRetroText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/\b0erebro\b/gi, 'cerebro')
    .replace(/0EREBRO/g, 'CEREBRO')
    .replace(/DES0ONE0TÓ/g, 'DESCONECTÓ')
    .replace(/des0one0t/gi, 'desconect')
    .replace(/([a-záéíóúñÁÉÍÓÚÑ])0([a-záéíóúñÁÉÍÓÚÑ])/gi, '$1c$2')
    .replace(/S1AGE/g, 'STAGE')
    .replace(/s1age/g, 'stage')
    .replace(/N0RMAL/g, 'NORMAL')
    .replace(/n0rmal/g, 'normal')
    .replace(/DIFI[¢i|!]CIL/gi, 'DIFÍCIL');
};

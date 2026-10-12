import React from 'react';
import { AlertTriangle, Skull, Sparkles } from 'lucide-react';

interface HangmanDrawingProps {
  mistakes: number;
  maxMistakes: number; // 6 (facil), 4 (normal), 3 (dificil / God of War)
  isGameOver: boolean;
  isWon: boolean;
}

// 8-bit Pixel Heart Component
const PixelHeart: React.FC<{ active: boolean; isLastLife?: boolean }> = ({ active, isLastLife }) => (
  <svg
    viewBox="0 0 10 9"
    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
      active
        ? isLastLife
          ? 'text-red-500 fill-red-500 animate-pulse'
          : 'text-rose-500 fill-rose-500'
        : 'text-zinc-800 fill-zinc-800 opacity-40'
    }`}
    style={{ shapeRendering: 'crispEdges' }}
  >
    <rect x="1" y="0" width="3" height="1" fill="currentColor" />
    <rect x="6" y="0" width="3" height="1" fill="currentColor" />
    <rect x="0" y="1" width="5" height="1" fill="currentColor" />
    <rect x="5" y="1" width="5" height="1" fill="currentColor" />
    <rect x="0" y="2" width="10" height="3" fill="currentColor" />
    <rect x="1" y="5" width="8" height="1" fill="currentColor" />
    <rect x="2" y="6" width="6" height="1" fill="currentColor" />
    <rect x="3" y="7" width="4" height="1" fill="currentColor" />
    <rect x="4" y="8" width="2" height="1" fill="currentColor" />
  </svg>
);

export const HangmanDrawing: React.FC<HangmanDrawingProps> = ({
  mistakes,
  maxMistakes = 3,
  isGameOver,
  isWon
}) => {
  const remainingLives = Math.max(0, maxMistakes - mistakes);
  const isGodOfWar = maxMistakes === 3;

  // Parts visibility:
  // In God of War (3 Lives):
  // 1 Fallo (2 Vidas): Cabeza adorable
  // 2 Fallos (1 Vida): Torso estilo túnica con cinturón
  // 3 Fallos (0 Vidas): Brazo derecho (Game Over)
  let showHead = false;
  let showTorso = false;
  let showArmLeft = false;
  let showArmRight = false;
  let showLegLeft = false;
  let showLegRight = false;

  if (isGodOfWar) {
    showHead = mistakes >= 1;
    showTorso = mistakes >= 2;
    showArmLeft = mistakes >= 2;
    showArmRight = mistakes >= 2;
    showLegLeft = mistakes >= 3;
    showLegRight = mistakes >= 3;
  } else if (maxMistakes === 4) {
    showHead = mistakes >= 1;
    showTorso = mistakes >= 2;
    showArmLeft = mistakes >= 3;
    showArmRight = mistakes >= 3;
    showLegLeft = mistakes >= 4;
    showLegRight = mistakes >= 4;
  } else {
    // 6 Vidas (Fácil - ¿En serio?)
    showHead = mistakes >= 1;
    showTorso = mistakes >= 2;
    showArmLeft = mistakes >= 3;
    showArmRight = mistakes >= 4;
    showLegLeft = mistakes >= 5;
    showLegRight = mistakes >= 6;
  }

  const getStageLabel = () => {
    if (mistakes === 0) return '0 FALLOS (HORCA VACÍA)';
    if (isGodOfWar) {
      const parts = [
        '0 FALLOS (HORCA VACÍA)',
        '1. CABEZA BONITA',
        '2. CUERPO Y BRAZOS',
        '3. PIERNAS (GAME OVER)'
      ];
      return parts[mistakes] || 'GAME OVER';
    }
    if (maxMistakes === 4) {
      const parts = [
        '0 FALLOS (HORCA VACÍA)',
        '1. CABEZA',
        '2. TORSO',
        '3. BRAZOS',
        '4. PIERNAS (GAME OVER)'
      ];
      return parts[mistakes] || 'DERROTA';
    }
    const parts = [
      '0 FALLOS (HORCA VACÍA)',
      '1. CABEZA',
      '2. TORSO',
      '3. BRAZO IZQ',
      '4. BRAZO DER',
      '5. PIERNA IZQ',
      '6. PIERNA DER (GAME OVER)'
    ];
    return parts[mistakes] || 'DERROTA';
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-2 sm:p-2.5 bg-zinc-900 border-2 sm:border-3 border-black pixel-card rounded-none w-full max-w-sm mx-auto shadow-[3px_3px_0px_#000]">
      {/* 8-bit Header: Lives & Status */}
      <div className="w-full flex items-center justify-between mb-1.5 border-b border-zinc-800 pb-1 px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="font-pixel text-[9px] sm:text-[10px] text-amber-400 uppercase tracking-tighter">
            HP:
          </span>
          <div className="flex items-center gap-0.5 sm:gap-1">
            {Array.from({ length: maxMistakes }).map((_, idx) => (
              <PixelHeart
                key={idx}
                active={idx < remainingLives}
                isLastLife={remainingLives === 1 && idx === 0}
              />
            ))}
          </div>
        </div>

        {/* State Badge in Pixel Font */}
        <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[8.5px]">
          {isGameOver && (
            <span className="flex items-center gap-1 text-red-400 bg-red-950/80 px-1.5 py-0.5 border border-red-700 animate-pulse">
              <Skull className="w-2.5 h-2.5" />
              0 HP
            </span>
          )}
          {isWon && (
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 border border-emerald-600">
              <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
              SALVO
            </span>
          )}
          {!isGameOver && !isWon && remainingLives === 1 && (
            <span className="flex items-center gap-1 text-amber-300 bg-amber-950/80 px-1.5 py-0.5 border border-amber-600 animate-bounce">
              <AlertTriangle className="w-2.5 h-2.5" />
              1 HP
            </span>
          )}
          {!isGameOver && !isWon && remainingLives > 1 && (
            <span className="text-zinc-400 px-1 py-0.2 bg-zinc-950 border border-zinc-800 text-[8px]">
              {remainingLives}/{maxMistakes}
            </span>
          )}
        </div>
      </div>

      {/* PIXEL ART CANVAS: Charming Wooden Gallows & Cute Hangman */}
      <div className="relative w-full aspect-4/3 max-h-[140px] sm:max-h-[160px] md:max-h-[175px] flex items-center justify-center bg-zinc-950 border-3 sm:border-4 border-black p-1.5 shadow-[inset_3px_3px_0_#18181b]">
        {/* Subtle Pixel Starfield / Cozy Night Sky */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#475569 1.5px, transparent 0)',
            backgroundSize: '12px 12px'
          }}
        />

        <svg
          viewBox="0 0 160 140"
          className="w-full h-full max-h-[130px] sm:max-h-[150px] md:max-h-[165px] overflow-visible select-none"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* Suelo: Césped verde brillante con flores silvestres pixeladas */}
          <rect x="8" y="132" width="144" height="4" fill="#15803d" />
          <rect x="10" y="130" width="140" height="2" fill="#4ade80" />
          <rect x="8" y="136" width="144" height="4" fill="#14532d" />

          {/* Flores silvestres pixeladas en el césped */}
          {/* Flor 1: Margarita pequeña */}
          <rect x="18" y="127" width="2" height="3" fill="#22c55e" />
          <rect x="17" y="125" width="4" height="2" fill="#ffffff" />
          <rect x="18" y="125" width="2" height="2" fill="#facc15" />

          {/* Flor 2: Flor roja pequeña */}
          <rect x="135" y="127" width="2" height="3" fill="#22c55e" />
          <rect x="134" y="125" width="4" height="2" fill="#f43f5e" />
          <rect x="135" y="125" width="2" height="2" fill="#fef08a" />

          {/* HORCA DE MADERA BONITA CON HOJAS DE ENREDADERA */}
          <g id="pixel-wooden-gallows">
            {/* Base platform con vetas de madera */}
            <rect x="20" y="126" width="55" height="5" fill="#854d0e" />
            <rect x="22" y="124" width="51" height="2" fill="#ca8a04" />
            <rect x="20" y="130" width="55" height="2" fill="#451a03" />

            {/* Base soportes en diagonal */}
            <rect x="30" y="120" width="4" height="4" fill="#a16207" />
            <rect x="26" y="124" width="4" height="2" fill="#854d0e" />
            <rect x="55" y="120" width="4" height="4" fill="#a16207" />
            <rect x="59" y="124" width="4" height="2" fill="#854d0e" />

            {/* Poste vertical principal (madera cálida con reflejo de luz) */}
            <rect x="42" y="16" width="6" height="110" fill="#854d0e" />
            <rect x="42" y="16" width="2" height="110" fill="#eab308" />
            <rect x="46" y="16" width="2" height="110" fill="#451a03" />

            {/* Viga superior horizontal */}
            <rect x="42" y="16" width="70" height="6" fill="#854d0e" />
            <rect x="42" y="16" width="70" height="2" fill="#eab308" />
            <rect x="42" y="20" width="70" height="2" fill="#451a03" />

            {/* Soporte diagonal */}
            <rect x="48" y="32" width="4" height="4" fill="#a16207" />
            <rect x="52" y="28" width="4" height="4" fill="#a16207" />
            <rect x="56" y="24" width="4" height="4" fill="#a16207" />
            <rect x="60" y="22" width="4" height="3" fill="#ca8a04" />

            {/* Enredaderas verdes decorativas (Cute ivy vines) */}
            <rect x="40" y="45" width="2" height="4" fill="#22c55e" />
            <rect x="39" y="46" width="2" height="2" fill="#86efac" />
            <rect x="48" y="60" width="2" height="4" fill="#22c55e" />
            <rect x="49" y="61" width="2" height="2" fill="#86efac" />
            <rect x="40" y="80" width="2" height="4" fill="#22c55e" />
            <rect x="39" y="81" width="2" height="2" fill="#86efac" />

            {/* Cuerda dorada de cáñamo */}
            <rect x="105" y="22" width="2" height="18" fill="#facc15" />
            <rect x="104" y="26" width="4" height="2" fill="#ca8a04" />
            <rect x="104" y="32" width="4" height="2" fill="#ca8a04" />
            <rect x="103" y="38" width="6" height="3" fill="#a16207" />
          </g>

          {/* CELEBRACIÓN DE VICTORIA (Estrellitas y destellos brillantes) */}
          {isWon && (
            <g id="victory-sparkles" fill="#facc15">
              <rect x="85" y="35" width="3" height="3" />
              <rect x="86" y="34" width="1" height="5" />
              <rect x="84" y="36" width="5" height="1" />

              <rect x="125" y="36" width="3" height="3" />
              <rect x="126" y="35" width="1" height="5" />
              <rect x="124" y="37" width="5" height="1" />
            </g>
          )}

          {/* AUREOLA BONITA FLOTANTE (Si perdió / Game Over) */}
          {isGameOver && (
            <g id="pixel-halo" fill="#fde047">
              <rect x="98" y="32" width="16" height="2" />
              <rect x="96" y="33" width="2" height="2" />
              <rect x="114" y="33" width="2" height="2" />
              <rect x="102" y="30" width="8" height="1" fill="#fef08a" />
            </g>
          )}

          {/* 1. CABEZA BONITA DEL PERSONAJE */}
          {showHead && (
            <g id="cute-head">
              {/* Contorno exterior negro redondeado */}
              <rect x="99" y="40" width="14" height="2" fill="#000" />
              <rect x="97" y="42" width="18" height="2" fill="#000" />
              <rect x="95" y="44" width="22" height="10" fill="#000" />
              <rect x="97" y="54" width="18" height="2" fill="#000" />
              <rect x="99" y="56" width="14" height="2" fill="#000" />

              {/* Relleno color carne suave y cálido */}
              <rect
                x="99"
                y="42"
                width="14"
                height="14"
                fill={isGameOver ? '#991b1b' : isWon ? '#065f46' : '#fed7aa'}
              />
              <rect
                x="97"
                y="44"
                width="18"
                height="10"
                fill={isGameOver ? '#991b1b' : isWon ? '#065f46' : '#fed7aa'}
              />

              {/* Flequillo / Cabello castaño lindo arriba */}
              {!isGameOver && !isWon && (
                <g fill="#78350f">
                  <rect x="99" y="41" width="14" height="2" />
                  <rect x="97" y="43" width="5" height="2" />
                  <rect x="109" y="43" width="5" height="2" />
                  <rect x="104" y="43" width="2" height="2" fill="#92400e" />
                </g>
              )}

              {/* OJOS Y ROSTRO BONITO */}
              {isGameOver ? (
                // Ojos mareados / X linda con lagrimita pixelada
                <g fill="#f87171">
                  {/* Ojo izquierdo en X */}
                  <rect x="99" y="46" width="2" height="2" />
                  <rect x="101" y="48" width="2" height="2" />
                  <rect x="103" y="46" width="2" height="2" />
                  <rect x="99" y="50" width="2" height="2" />
                  <rect x="103" y="50" width="2" height="2" />

                  {/* Ojo derecho en X */}
                  <rect x="107" y="46" width="2" height="2" />
                  <rect x="109" y="48" width="2" height="2" />
                  <rect x="111" y="46" width="2" height="2" />
                  <rect x="107" y="50" width="2" height="2" />
                  <rect x="111" y="50" width="2" height="2" />

                  {/* Boca triste ondulada */}
                  <rect x="103" y="53" width="6" height="1" fill="#fca5a5" />

                  {/* Lagrimita celeste pixelada */}
                  <rect x="97" y="50" width="2" height="3" fill="#38bdf8" />
                </g>
              ) : isWon ? (
                // Ojos felices (^ ^), mejillas sonrosadas y gran sonrisa
                <g>
                  {/* Ojos arqueados de felicidad ^ ^ */}
                  <rect x="99" y="47" width="4" height="2" fill="#34d399" />
                  <rect x="100" y="46" width="2" height="1" fill="#34d399" />
                  <rect x="107" y="47" width="4" height="2" fill="#34d399" />
                  <rect x="108" y="46" width="2" height="1" fill="#34d399" />

                  {/* Mejillas sonrojadas brillantes */}
                  <rect x="98" y="50" width="3" height="2" fill="#f43f5e" />
                  <rect x="110" y="50" width="3" height="2" fill="#f43f5e" />

                  {/* Sonrisa radiante abierta */}
                  <rect x="102" y="52" width="7" height="2" fill="#ffffff" />
                  <rect x="103" y="53" width="5" height="1" fill="#ec4899" />
                </g>
              ) : (
                // Expresión normal encantadora: ojos grandes con brillo y rubor
                <g>
                  {/* Ojo izquierdo grande con brillo blanco */}
                  <rect x="99" y="46" width="4" height="4" fill="#0f172a" />
                  <rect x="99" y="46" width="2" height="2" fill="#ffffff" />

                  {/* Ojo derecho grande con brillo blanco */}
                  <rect x="107" y="46" width="4" height="4" fill="#0f172a" />
                  <rect x="107" y="46" width="2" height="2" fill="#ffffff" />

                  {/* Mejillas sonrosadas (Cute Rosy Blush) */}
                  <rect x="97" y="50" width="3" height="2" fill="#fb7185" opacity="0.85" />
                  <rect x="110" y="50" width="3" height="2" fill="#fb7185" opacity="0.85" />

                  {/* Boca linda */}
                  {remainingLives === 1 ? (
                    // Boca nerviosa y gotita de sudor azul
                    <>
                      <rect x="103" y="53" width="5" height="1" fill="#b45309" />
                      {/* Gotita de sudor en la sien */}
                      <rect x="113" y="43" width="2" height="3" fill="#38bdf8" />
                      <rect x="114" y="42" width="1" height="1" fill="#bae6fd" />
                    </>
                  ) : (
                    // Sonrisa dulce
                    <rect x="103" y="52" width="5" height="1" fill="#b45309" />
                  )}
                </g>
              )}
            </g>
          )}

          {/* 2. TORSO DEL PERSONAJE */}
          {showTorso && (
            <g id="cute-torso">
              {isGodOfWar ? (
                // Túnica espartana bonita con detalles dorados
                <>
                  <rect x="97" y="58" width="18" height="32" fill="#000" />
                  {/* Túnica roja carmesí */}
                  <rect
                    x="99"
                    y="58"
                    width="14"
                    height="30"
                    fill={isGameOver ? '#991b1b' : isWon ? '#047857' : '#dc2626'}
                  />
                  {/* Cuello y pechera dorada */}
                  <rect x="102" y="58" width="8" height="3" fill="#fef08a" />
                  <rect x="104" y="61" width="4" height="8" fill="#ca8a04" />
                  {/* Cinturón espartano con hebilla dorada */}
                  <rect x="99" y="72" width="14" height="3" fill="#78350f" />
                  <rect x="104" y="72" width="4" height="3" fill="#facc15" />
                  {/* Falda de túnica con tablas */}
                  <rect x="102" y="85" width="2" height="3" fill="#7f1d1d" />
                  <rect x="108" y="85" width="2" height="3" fill="#7f1d1d" />
                </>
              ) : (
                // Ropa bonita estándar: Camiseta retro linda con cinturón
                <>
                  <rect x="98" y="58" width="16" height="30" fill="#000" />
                  {/* Camisa azul índigo linda */}
                  <rect
                    x="100"
                    y="58"
                    width="12"
                    height="28"
                    fill={isGameOver ? '#450a0a' : isWon ? '#047857' : '#3b82f6'}
                  />
                  {/* Cuello blanco lindo */}
                  <rect x="103" y="58" width="6" height="2" fill="#ffffff" />
                  {/* Botones blancos */}
                  <rect x="105" y="63" width="2" height="2" fill="#ffffff" />
                  <rect x="105" y="68" width="2" height="2" fill="#ffffff" />
                  {/* Cinturón marrón con hebilla dorada */}
                  <rect x="100" y="74" width="12" height="3" fill="#78350f" />
                  <rect x="104" y="74" width="4" height="3" fill="#facc15" />
                </>
              )}
            </g>
          )}

          {/* 3. BRAZO DERECHO BONITO */}
          {showArmRight && (
            <g id="cute-arm-right">
              {/* Brazo con manga y manita linda */}
              <rect x="114" y="60" width="5" height="5" fill="#000" />
              <rect x="117" y="64" width="5" height="5" fill="#000" />
              <rect x="120" y="68" width="5" height="5" fill="#000" />
              <rect x="124" y="73" width="6" height="6" fill="#000" />

              {/* Relleno de manga */}
              <rect
                x="115"
                y="61"
                width="3"
                height="3"
                fill={isGodOfWar ? '#dc2626' : isWon ? '#059669' : '#3b82f6'}
              />
              <rect
                x="118"
                y="65"
                width="3"
                height="3"
                fill={isGodOfWar ? '#f59e0b' : '#60a5fa'}
              />

              {/* Manito color carne redonda linda */}
              <rect
                x="121"
                y="69"
                width="3"
                height="3"
                fill={isGameOver ? '#991b1b' : isWon ? '#059669' : '#fed7aa'}
              />
              <rect
                x="125"
                y="74"
                width="4"
                height="4"
                fill={isGameOver ? '#991b1b' : isWon ? '#059669' : '#fed7aa'}
              />
            </g>
          )}

          {/* BRAZO IZQUIERDO BONITO */}
          {showArmLeft && (
            <g id="cute-arm-left">
              <rect x="93" y="60" width="5" height="5" fill="#000" />
              <rect x="90" y="64" width="5" height="5" fill="#000" />
              <rect x="87" y="68" width="5" height="5" fill="#000" />
              <rect x="83" y="73" width="6" height="6" fill="#000" />

              {/* Manga */}
              <rect
                x="94"
                y="61"
                width="3"
                height="3"
                fill={isGodOfWar ? '#dc2626' : isWon ? '#059669' : '#3b82f6'}
              />
              <rect
                x="91"
                y="65"
                width="3"
                height="3"
                fill={isGodOfWar ? '#f59e0b' : '#60a5fa'}
              />

              {/* Manito color carne linda */}
              <rect
                x="88"
                y="69"
                width="3"
                height="3"
                fill={isGameOver ? '#991b1b' : isWon ? '#059669' : '#fed7aa'}
              />
              <rect
                x="84"
                y="74"
                width="4"
                height="4"
                fill={isGameOver ? '#991b1b' : isWon ? '#059669' : '#fed7aa'}
              />
            </g>
          )}

          {/* PIERNA IZQUIERDA BONITA */}
          {showLegLeft && (
            <g id="cute-leg-left">
              <rect x="99" y="88" width="5" height="12" fill="#000" />
              <rect x="97" y="100" width="7" height="6" fill="#000" />

              {/* Pantalón o pierna con sandalia espartana */}
              <rect
                x="100"
                y="88"
                width="3"
                height="11"
                fill={isGodOfWar ? '#fed7aa' : '#1e3a8a'}
              />

              {/* Detalle espartano (tiras doradas/cuero) o pantalón */}
              {isGodOfWar && (
                <>
                  <rect x="100" y="92" width="3" height="1" fill="#78350f" />
                  <rect x="100" y="95" width="3" height="1" fill="#ca8a04" />
                </>
              )}

              {/* Botita o Sandalia linda */}
              <rect
                x="98"
                y="99"
                width="5"
                height="5"
                fill={isGodOfWar ? '#a16207' : '#78350f'}
              />
              <rect x="97" y="103" width="6" height="2" fill="#451a03" />
              <rect x="99" y="100" width="2" height="1" fill="#facc15" />
            </g>
          )}

          {/* PIERNA DERECHA BONITA */}
          {showLegRight && (
            <g id="cute-leg-right">
              <rect x="108" y="88" width="5" height="12" fill="#000" />
              <rect x="108" y="100" width="7" height="6" fill="#000" />

              {/* Pantalón o pierna con sandalia espartana */}
              <rect
                x="109"
                y="88"
                width="3"
                height="11"
                fill={isGodOfWar ? '#fed7aa' : '#1e3a8a'}
              />

              {/* Detalle espartano (tiras doradas/cuero) */}
              {isGodOfWar && (
                <>
                  <rect x="109" y="92" width="3" height="1" fill="#78350f" />
                  <rect x="109" y="95" width="3" height="1" fill="#ca8a04" />
                </>
              )}

              {/* Botita o Sandalia linda */}
              <rect
                x="109"
                y="99"
                width="5"
                height="5"
                fill={isGodOfWar ? '#a16207' : '#78350f'}
              />
              <rect x="109" y="103" width="6" height="2" fill="#451a03" />
              <rect x="111" y="100" width="2" height="1" fill="#facc15" />
            </g>
          )}
        </svg>
      </div>

      {/* 8-bit Stepped Progress Bar matching maxMistakes */}
      <div className="w-full mt-2">
        <div className="w-full h-2 bg-black border border-zinc-700 flex p-0.5 gap-0.5">
          {Array.from({ length: maxMistakes }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 transition-colors duration-150 ${
                i < mistakes
                  ? mistakes === maxMistakes
                    ? 'bg-red-500'
                    : mistakes === maxMistakes - 1
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                  : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>
        <div className="mt-1.5 text-center w-full">
          <div className="font-pixel text-[8.5px] sm:text-[9.5px] text-zinc-100 tracking-wider font-bold bg-zinc-950 px-2 py-0.5 border border-zinc-700 shadow-[1px_1px_0_#000] max-w-full truncate">
            {getStageLabel()}
          </div>
        </div>
      </div>
    </div>
  );
};

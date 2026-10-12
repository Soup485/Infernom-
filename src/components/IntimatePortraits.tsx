import React from 'react';
import laylaDesktopArt from '../assets/images/layla_desktop_art_1791722573429.jpg';
import kaleaNightBalconyArt from '../assets/images/kalea_night_balcony_1791725579794.jpg';
import asukaSunsetPixel from '../assets/images/asuka_sunset_pixel_1791723363303.jpg';

interface PortraitCardProps {
  portraitId: string;
}

export const PortraitCard: React.FC<PortraitCardProps> = ({ portraitId }) => {
  if (portraitId === 'art_layla') {
    // 1. RETRATO: LAYLA (Guía de Estilo: Y2K Pastel Micro-Pixel Art / PC-98 / Desktop UI)
    // Ilustración digital de alta fidelidad basada en pixel art detallado (PC-98 / 16-32 bits refinado).
    // Píxeles limpios, uniformes y micro-detallados, con sombreado de dithering suave.
    // Paleta: Rosas pastel, malva, lila, lavanda, blanco marfil y acentos en magenta oscuro o violeta profundo.
    return (
      <div className="relative w-80 sm:w-96 max-w-full bg-[#1e132b] border-4 border-pink-300 p-2 overflow-hidden shadow-[8px_8px_0_#000] flex flex-col items-center select-none">
        {/* Y2K Pastel OS Title Bar */}
        <div className="w-full flex justify-between items-center px-2 py-1 mb-1.5 font-pixel text-[8px] bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 text-purple-950 border-2 border-black shadow-[2px_2px_0_#000]">
          <div className="flex items-center gap-1.5 font-bold">
            <span>🌸</span>
            <span>RETRATO: LAYLA · CuteOS v1.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[7.5px] text-purple-900">2:03 PM</span>
            <span className="text-[9px]">📶</span>
            <div className="w-3.5 h-2 border border-purple-900 bg-emerald-400" title="Batería 100%" />
            <div className="flex items-center gap-0.5 ml-1 font-bold text-[8px]">
              <span className="px-1 bg-pink-200 border border-black hover:bg-pink-100">_</span>
              <span className="px-1 bg-pink-200 border border-black hover:bg-pink-100">□</span>
              <span className="px-1 bg-rose-400 text-white border border-black hover:bg-rose-500">✕</span>
            </div>
          </div>
        </div>

        {/* Micro-Pixel Art High-Fidelity Canvas Container */}
        <div className="relative w-full aspect-square bg-[#22132d] border-2 border-black overflow-hidden flex items-center justify-center shadow-inner">
          <img
            src={laylaDesktopArt}
            alt="Retrato: Layla (Y2K Pastel Micro-Pixel Art PC-98)"
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Animated Floating Pastel Hearts & Twinkling Pixel Stars Overlay Effect */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {[
              { left: '12%', delay: '0s', duration: '3.2s', size: '11px', color: '#f472b6' },
              { left: '30%', delay: '1.4s', duration: '3.8s', size: '13px', color: '#fbcfe8' },
              { left: '46%', delay: '0.7s', duration: '2.9s', size: '10px', color: '#ec4899' },
              { left: '74%', delay: '2.1s', duration: '3.5s', size: '12px', color: '#f472b6' },
              { left: '88%', delay: '1.0s', duration: '3.1s', size: '11px', color: '#e879f9' },
              { left: '22%', delay: '2.6s', duration: '4.0s', size: '9px', color: '#fbcfe8' }
            ].map((heart, idx) => (
              <div
                key={`heart-${idx}`}
                className="absolute font-pixel select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(236,72,153,0.6)]"
                style={{
                  left: heart.left,
                  bottom: '10px',
                  fontSize: heart.size,
                  color: heart.color,
                  animation: `pastelHeartFloat ${heart.duration} ease-in-out infinite`,
                  animationDelay: heart.delay
                }}
              >
                ♥
              </div>
            ))}

            {[
              { top: '10%', left: '8%', delay: '0s', size: 'text-[9px]', color: '#fef08a' },
              { top: '22%', left: '44%', delay: '0.6s', size: 'text-[8px]', color: '#ffffff' },
              { top: '14%', right: '12%', delay: '1.2s', size: 'text-[9px]', color: '#fbcfe8' },
              { top: '44%', left: '36%', delay: '1.8s', size: 'text-[8px]', color: '#fde047' },
              { top: '36%', right: '8%', delay: '0.9s', size: 'text-[9px]', color: '#e879f9' },
              { bottom: '26%', left: '10%', delay: '1.5s', size: 'text-[8px]', color: '#ffffff' },
              { bottom: '18%', right: '32%', delay: '2.2s', size: 'text-[9px]', color: '#fef08a' }
            ].map((star, idx) => (
              <div
                key={`star-${idx}`}
                className={`absolute ${star.size} select-none pointer-events-none flex items-center justify-center font-pixel`}
                style={{
                  top: star.top,
                  bottom: (star as any).bottom,
                  left: star.left,
                  right: (star as any).right,
                  color: star.color,
                  animation: `pastelStarTwinkle 1.8s ease-in-out infinite`,
                  animationDelay: star.delay
                }}
              >
                ✦
              </div>
            ))}
          </div>
        </div>

        {/* In-Game Text Card Footer */}
        <div className="w-full text-center mt-2 px-1">
          <div className="font-pixel text-[8.5px] text-pink-300 font-bold tracking-wide">
            [RETRATO: LAYLA]
          </div>
          <div className="font-pixel text-[7px] text-zinc-300 mt-1 leading-relaxed">
            Ilustración especial de Layla relajándose en su escritorio virtual en tonos pastel.
          </div>
          <div className="font-pixel text-[6.5px] text-pink-400 mt-1 flex items-center justify-center gap-1">
            <span>✨</span>
            <span>DESTELLOS DE ESTRELLAS Y CORAZONES FLOTANTES ACTIVADOS</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    );
  }

  if (portraitId === 'art_kalea') {
    // 2. RETRATO: KALEA (Night Balcony / Cyberpunk Pixel)
    // Estética: Micro-pixel art de alta definición estilo PC-98 / synthwave nocturno, con luces cian, magenta y sombras profundas.
    // Personaje: Kalea recostada pensativa sobre el barandal de la azotea urbana, viento moviendo su cabello y flor decorativa iluminada.
    // Fondo: Vista panorámica de rascacielos futuristas (Neo-Kyoto), cielo estrellado con nubes/auroras de neón y luna.
    // Efecto Visual: Sutil destello de luces de neón en rascacielos y pequeñas estrellas parpadeando en el cielo nocturno.
    return (
      <div className="relative w-80 sm:w-96 max-w-full bg-[#080718] border-4 border-cyan-400 p-2 overflow-hidden shadow-[8px_8px_0_#000] flex flex-col items-center select-none">
        {/* PC-98 Synthwave Retro Header */}
        <div className="w-full flex justify-between items-center px-2 py-1 mb-1.5 font-pixel text-[8px] bg-gradient-to-r from-purple-950 via-indigo-950 to-cyan-950 text-cyan-300 border-2 border-black shadow-[2px_2px_0_#000]">
          <div className="flex items-center gap-1.5 font-bold">
            <span>🌃</span>
            <span>RETRATO: KALEA · NIGHT BALCONY</span>
          </div>
          <div className="flex items-center gap-1.5 text-[7px] text-fuchsia-300 font-pixel">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>NEO-KYOTO · 01:24 AM</span>
          </div>
        </div>

        {/* High-Fidelity Micro-Pixel Art Image Container */}
        <div className="relative w-full aspect-square bg-[#05030f] border-2 border-black overflow-hidden flex items-center justify-center shadow-inner">
          <img
            src={kaleaNightBalconyArt}
            alt="Retrato: Kalea (Night Balcony / Cyberpunk Pixel)"
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Efecto Visual: Destello de luces de neón en los rascacielos y letreros */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Destello en la flor de cabello de Kalea */}
            <div
              className="absolute w-2 h-2 rounded-full bg-cyan-200/90 shadow-[0_0_8px_#38bdf8] animate-pulse"
              style={{
                top: '32%',
                left: '23.5%',
                animation: 'pulse 1.8s ease-in-out infinite'
              }}
            />

            {/* Pulsos de neón magenta y cian en letreros y ventanas de rascacielos */}
            {[
              { top: '24%', left: '4.5%', size: 'w-2 h-6', color: 'bg-fuchsia-500/30 shadow-[0_0_8px_#ec4899]', delay: '0s' },
              { top: '51%', left: '55%', size: 'w-2.5 h-2', color: 'bg-cyan-400/40 shadow-[0_0_6px_#22d3ee]', delay: '0.6s' },
              { top: '42%', left: '81.5%', size: 'w-3 h-4', color: 'bg-amber-300/30 shadow-[0_0_6px_#fde047]', delay: '1.2s' },
              { top: '54%', left: '76.5%', size: 'w-2 h-2.5', color: 'bg-fuchsia-400/40 shadow-[0_0_6px_#f43f5e]', delay: '0.3s' },
              { top: '61%', left: '62.5%', size: 'w-2.5 h-2.5', color: 'bg-cyan-300/40 shadow-[0_0_8px_#06b6d4]', delay: '1.5s' }
            ].map((neon, idx) => (
              <div
                key={`neon-pulse-${idx}`}
                className={`absolute ${neon.size} ${neon.color} pointer-events-none animate-pulse`}
                style={{
                  top: neon.top,
                  left: neon.left,
                  animationDelay: neon.delay,
                  animationDuration: '1.6s'
                }}
              />
            ))}

            {/* Pequeñas estrellas y nebulosas parpadeando en el cielo nocturno */}
            {[
              { top: '8%', left: '16%', delay: '0s', size: 'text-[9px]', color: '#e0e7ff' },
              { top: '14%', left: '42%', delay: '0.7s', size: 'text-[8px]', color: '#67e8f9' },
              { top: '10%', left: '68%', delay: '1.4s', size: 'text-[9px]', color: '#fbcfe8' },
              { top: '19%', left: '88%', delay: '0.3s', size: 'text-[8px]', color: '#ffffff' },
              { top: '22%', left: '52%', delay: '1.9s', size: 'text-[8.5px]', color: '#c084fc' },
              { top: '12%', left: '33%', delay: '1.1s', size: 'text-[8px]', color: '#fef08a' }
            ].map((star, idx) => (
              <div
                key={`night-star-${idx}`}
                className={`absolute ${star.size} select-none pointer-events-none font-pixel`}
                style={{
                  top: star.top,
                  left: star.left,
                  color: star.color,
                  animation: 'pastelStarTwinkle 1.8s ease-in-out infinite',
                  animationDelay: star.delay
                }}
              >
                ✦
              </div>
            ))}
          </div>
        </div>

        {/* In-Game Text Card Footer */}
        <div className="w-full text-center mt-2 px-1">
          <div className="font-pixel text-[8.5px] text-cyan-300 font-bold tracking-wide">
            [RETRATO: KALEA]
          </div>
          <div className="font-pixel text-[7px] text-zinc-300 mt-1 leading-relaxed">
            Ilustración especial de Kalea contemplando la ciudad nocturna desde la azotea.
          </div>
          <div className="font-pixel text-[6.5px] text-fuchsia-400 mt-1 flex items-center justify-center gap-1">
            <span>✨</span>
            <span>DESTELLO DE NEÓN EN RASCACIELOS Y ESTRELLAS NOCTURNAS ACTIVADOS</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    );
  }

  if (portraitId === 'art_asuka') {
    // 3. RETRATO: ASUKA (Mecha Pilot / Sunset Pixel)
    // Estética: Micro-pixel art de alta fidelidad estilo anime de los 90 (PC-98 / 16-bits refinado) con gradientes cálidos.
    // Personaje: Asuka en primer plano mirando con expresión confiada y desafiante, cabello rojizo al viento, broches A10 y plugsuit rojo/naranja.
    // Fondo: Atardecer dramático en tonos naranja, rosado y azul purpúreo, mecha rojo gigante entre edificios, postes y cableado.
    // Efecto Visual: Parpadeo de luz en los ojos del mecha y destellos en los cables del atardecer.
    return (
      <div className="relative w-80 sm:w-96 max-w-full bg-[#1b0a08] border-4 border-amber-500 p-2 overflow-hidden shadow-[8px_8px_0_#000] flex flex-col items-center select-none">
        {/* Frame Title */}
        <div className="w-full flex justify-between items-center px-2 py-1 mb-1.5 font-pixel text-[8px] bg-gradient-to-r from-red-950 via-amber-950 to-orange-950 text-amber-200 border-2 border-black shadow-[2px_2px_0_#000]">
          <div className="flex items-center gap-1.5 font-bold">
            <span>🔥</span>
            <span>RETRATO: ASUKA · SUNSET MECHA PILOT</span>
          </div>
          <div className="flex items-center gap-1 text-[7px] text-amber-300 font-pixel">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
            <span>18:42 SUNSET</span>
          </div>
        </div>

        {/* High-Fidelity Micro-Pixel Art Canvas Container */}
        <div className="relative w-full aspect-square bg-[#120404] border-2 border-black overflow-hidden flex items-center justify-center shadow-inner">
          <img
            src={asukaSunsetPixel}
            alt="Retrato: Asuka (Mecha Pilot / Sunset Pixel)"
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Efecto Visual: Parpadeo de luz en los ojos del mecha */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Ojo/Sensor óptico superior del mecha */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-amber-200/90 shadow-[0_0_8px_#fde047] animate-pulse"
              style={{
                top: '21.5%',
                left: '41%',
                animation: 'pulse 1.4s ease-in-out infinite'
              }}
            />
            {/* Ojo/Sensor óptico inferior del mecha */}
            <div
              className="absolute w-2 h-2 rounded-full bg-orange-300/90 shadow-[0_0_6px_#f97316] animate-ping"
              style={{
                top: '28.5%',
                left: '43.5%',
                animationDuration: '2.4s'
              }}
            />

            {/* Efecto Visual: Destellos en los cables y tendido eléctrico del atardecer */}
            {[
              { top: '44%', left: '8%', delay: '0s', size: 'text-[9px]', color: '#fef08a' },
              { top: '49%', left: '23%', delay: '0.8s', size: 'text-[8px]', color: '#fdba74' },
              { top: '53%', left: '33%', delay: '1.5s', size: 'text-[9px]', color: '#ffffff' },
              { top: '47%', right: '28%', delay: '0.4s', size: 'text-[8px]', color: '#fde047' },
              { top: '51%', right: '14%', delay: '1.2s', size: 'text-[9px]', color: '#ffffff' },
              { top: '45%', right: '6%', delay: '1.9s', size: 'text-[8px]', color: '#fed7aa' }
            ].map((sparkle, idx) => (
              <div
                key={`cable-glint-${idx}`}
                className={`absolute ${sparkle.size} select-none pointer-events-none font-pixel`}
                style={{
                  top: sparkle.top,
                  left: (sparkle as any).left,
                  right: (sparkle as any).right,
                  color: sparkle.color,
                  animation: 'pastelStarTwinkle 1.6s ease-in-out infinite',
                  animationDelay: sparkle.delay
                }}
              >
                ✦
              </div>
            ))}
          </div>
        </div>

        {/* In-Game Text Card Footer */}
        <div className="w-full text-center mt-2 px-1">
          <div className="font-pixel text-[8.5px] text-amber-300 font-bold tracking-wide">
            [RETRATO: ASUKA]
          </div>
          <div className="font-pixel text-[7px] text-zinc-300 mt-1 leading-relaxed">
            Ilustración exclusiva de Asuka junto a su unidad mecha bajo el atardecer urbano.
          </div>
          <div className="font-pixel text-[6.5px] text-amber-400 mt-1 flex items-center justify-center gap-1">
            <span>✨</span>
            <span>PARPADEO ÓPTICO DEL MECHA Y DESTELLOS EN CABLES URBANOS ACTIVADOS</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Alias export for backwards compatibility
export const IntimatePortraitCard = PortraitCard;


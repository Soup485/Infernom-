import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Coins,
  Palette,
  Sparkles,
  Image,
  Music2,
  Check,
  Lock,
  Volume2,
  Home
} from 'lucide-react';
import { ShopItem, SHOP_ITEMS } from '../data/progression';
import { soundManager } from '../utils/audio';
import { PortraitCard } from './IntimatePortraits';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixelCoins: number;
  purchasedItemIds: string[];
  activePaletteId: string;
  activeAccessoryId: string;
  onBuyItem: (item: ShopItem) => void;
  onEquipPalette: (paletteId: string) => void;
  onEquipAccessory: (accessoryId: string) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  pixelCoins,
  purchasedItemIds,
  activePaletteId,
  activeAccessoryId,
  onBuyItem,
  onEquipPalette,
  onEquipAccessory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'palette' | 'accessory' | 'gallery' | 'soundtrack'>('all');
  const [previewGalleryItem, setPreviewGalleryItem] = useState<ShopItem | null>(null);

  if (!isOpen) return null;

  const filteredItems = SHOP_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handlePlaySoundtrack = (item: ShopItem) => {
    soundManager.playCorrect();
    // Chirp / Sound demonstration
    soundManager.playWaifuChirp();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border-4 border-black pixel-card p-3 sm:p-5 shadow-[8px_8px_0_#000] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-pixel text-sm sm:text-base text-amber-400">
              TIENDA RETRO & COLECCIONABLES
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-amber-950/90 border-2 border-amber-500 text-amber-300 font-pixel text-[10px] sm:text-xs">
              <Coins className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>{pixelCoins} COINS</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black border-2 border-black font-pixel text-[9px] nes-btn uppercase flex items-center gap-1 cursor-pointer"
              title="Volver al menú"
            >
              <Home className="w-3 h-3" />
              <span className="hidden sm:inline">MENÚ</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 cursor-pointer"
              title="Cerrar tienda"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[
            { id: 'all', label: 'TODO', icon: <Sparkles className="w-3 h-3" /> },
            { id: 'palette', label: 'PALETAS UI', icon: <Palette className="w-3 h-3" /> },
            { id: 'accessory', label: 'ACCESORIOS', icon: <Sparkles className="w-3 h-3" /> },
            { id: 'gallery', label: 'RETRATOS', icon: <Image className="w-3 h-3" /> },
            { id: 'soundtrack', label: 'SOUNDTEST', icon: <Music2 className="w-3 h-3" /> }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-2.5 py-1 font-pixel text-[9px] border-2 transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-black border-amber-500 shadow-[2px_2px_0_#000]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredItems.map((item) => {
            const isPurchased = item.price === 0 || purchasedItemIds.includes(item.id);
            const isEquippedPalette = item.category === 'palette' && activePaletteId === item.id;
            const isEquippedAccessory = item.category === 'accessory' && activeAccessoryId === (item.spriteAccessoryId || 'none');
            const canAfford = pixelCoins >= item.price;

            return (
              <div
                key={item.id}
                className="bg-zinc-900/90 border-2 border-zinc-800 p-2.5 flex flex-col justify-between gap-2 relative hover:border-zinc-700"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <h3 className="font-pixel text-[10px] sm:text-xs text-white">
                        {item.name}
                      </h3>
                    </div>

                    {item.previewColor && (
                      <span
                        className="w-3.5 h-3.5 border border-white/40 shadow-[1px_1px_0_#000]"
                        style={{ backgroundColor: item.previewColor }}
                      />
                    )}
                  </div>

                  <p className="font-pixel text-[8px] text-zinc-400 leading-relaxed mb-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2">
                  <div className="font-pixel text-[9px]">
                    {item.price === 0 ? (
                      <span className="text-emerald-400">GRATIS</span>
                    ) : isPurchased ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> ADQUIRIDO
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Coins className="w-3 h-3" /> {item.price}
                      </span>
                    )}
                  </div>

                  {item.category === 'palette' && (
                    <button
                      type="button"
                      disabled={!isPurchased}
                      onClick={() => {
                        if (isPurchased) onEquipPalette(item.id);
                      }}
                      className={`px-2.5 py-1 font-pixel text-[8px] nes-btn ${
                        isEquippedPalette
                          ? 'bg-emerald-600 text-white'
                          : isPurchased
                          ? 'bg-amber-500 hover:bg-amber-400 text-black'
                          : 'bg-zinc-800 text-zinc-500 opacity-50'
                      }`}
                    >
                      {isEquippedPalette ? 'EQUIPADO' : isPurchased ? 'EQUIPAR' : 'BLOQUEADO'}
                    </button>
                  )}

                  {item.category === 'accessory' && (
                    <button
                      type="button"
                      disabled={!isPurchased}
                      onClick={() => {
                        if (isPurchased) onEquipAccessory(item.spriteAccessoryId || 'none');
                      }}
                      className={`px-2.5 py-1 font-pixel text-[8px] nes-btn ${
                        isEquippedAccessory
                          ? 'bg-emerald-600 text-white'
                          : isPurchased
                          ? 'bg-amber-500 hover:bg-amber-400 text-black'
                          : 'bg-zinc-800 text-zinc-500 opacity-50'
                      }`}
                    >
                      {isEquippedAccessory ? 'EQUIPADO' : isPurchased ? 'EQUIPAR' : 'BLOQUEADO'}
                    </button>
                  )}

                  {item.category === 'gallery' && (
                    <button
                      type="button"
                      disabled={!isPurchased}
                      onClick={() => isPurchased && setPreviewGalleryItem(item)}
                      className={`px-2.5 py-1 font-pixel text-[8px] nes-btn ${
                        isPurchased
                          ? 'bg-purple-600 hover:bg-purple-500 text-white'
                          : 'bg-zinc-800 text-zinc-500 opacity-50'
                      }`}
                    >
                      {isPurchased ? 'VER ARTE' : 'BLOQUEADO'}
                    </button>
                  )}

                  {item.category === 'soundtrack' && (
                    <button
                      type="button"
                      disabled={!isPurchased}
                      onClick={() => isPurchased && handlePlaySoundtrack(item)}
                      className={`px-2.5 py-1 font-pixel text-[8px] nes-btn flex items-center gap-1 ${
                        isPurchased
                          ? 'bg-teal-600 hover:bg-teal-500 text-white'
                          : 'bg-zinc-800 text-zinc-500 opacity-50'
                      }`}
                    >
                      <Volume2 className="w-2.5 h-2.5" />
                      {isPurchased ? 'REPRODUCIR' : 'BLOQUEADO'}
                    </button>
                  )}

                  {!isPurchased && (
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => onBuyItem(item)}
                      className={`px-3 py-1 font-pixel text-[8px] nes-btn uppercase ${
                        canAfford
                          ? 'bg-amber-400 hover:bg-amber-300 text-black'
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      COMPRAR
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="border-t-2 border-zinc-800 pt-2.5 mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-2 border-black font-pixel text-[9px] nes-btn uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>VOLVER AL MENÚ / JUEGO</span>
          </button>
          <span className="font-pixel text-[7.5px] text-zinc-500 hidden sm:inline">
            COLECCIONA RECOMPENSAS ARCADE
          </span>
        </div>

        {/* Gallery Preview Modal Overlay */}
        {previewGalleryItem && (
          <div className="absolute inset-0 bg-black/95 p-3 z-50 flex flex-col items-center justify-center gap-2.5 animate-in fade-in duration-200">
            {previewGalleryItem.id.startsWith('art_') ? (
              <PortraitCard portraitId={previewGalleryItem.id} />
            ) : (
              <div className="w-64 h-64 bg-zinc-900 border-4 border-amber-400 flex flex-col items-center justify-center p-3 text-center pixel-card">
                <span className="text-5xl mb-2">{previewGalleryItem.icon}</span>
                <h3 className="font-pixel text-xs text-amber-400 mb-1">
                  {previewGalleryItem.name}
                </h3>
                <p className="font-pixel text-[8px] text-zinc-300 leading-relaxed">
                  {previewGalleryItem.description}
                </p>
                <span className="font-pixel text-[7px] text-amber-400 mt-2">
                  ★ ILUSTRACIÓN ESPECIAL DESBLOQUEADA ★
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setPreviewGalleryItem(null)}
              className="px-5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-pixel text-[9px] nes-btn border-2 border-black"
            >
              VOLVER A LA TIENDA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

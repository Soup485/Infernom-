import { DifficultyId } from './words';

export type NodeType = 'route_layla' | 'route_kalea' | 'route_asuka' | 'boss';

export interface MapNode {
  id: string;
  stage: number; // 1 to 5
  type: NodeType;
  name: string;
  description: string;
  difficulty: DifficultyId;
  rewardCoins: number;
  hp: number;
  isBoss?: boolean;
  bossTimeLimitSec?: number; // e.g. 45s
  connections: string[]; // next node IDs
  x: number; // grid position for rendering map
  y: number;
}

export interface NodeMapState {
  currentNodeId: string;
  unlockedNodeIds: string[];
  completedNodeIds: string[];
  totalWordsGuessed: number;
  sessionStats: {
    laylaNodesCleared: number;
    kaleaNodesCleared: number;
    asukaNodesCleared: number;
    bossesCleared: number;
    totalLivesLostInSession: number;
    currentPerfectStreakPerCopilot: {
      facil: number;
      normal: number;
      dificil: number;
    };
  };
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'palette' | 'accessory' | 'gallery' | 'soundtrack';
  price: number;
  description: string;
  icon: string;
  previewColor?: string;
  themeClass?: string;
  spriteAccessoryId?: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  // UI Themes / Palettes
  {
    id: 'theme_default',
    name: 'NES Clásico',
    category: 'palette',
    price: 0,
    description: 'Estilo Arcade oscuro original con detalles ámbar y neón.',
    icon: '🕹️',
    themeClass: 'theme-nes'
  },
  {
    id: 'theme_gameboy',
    name: 'Game Boy 1989',
    category: 'palette',
    price: 60,
    description: 'Paleta verdosa monocromática nostálgica de 4 tonos.',
    icon: '📟',
    previewColor: '#8bac0f',
    themeClass: 'theme-gameboy'
  },
  {
    id: 'theme_synthwave',
    name: 'Synthwave Neón',
    category: 'palette',
    price: 100,
    description: 'Vibrante contraste morado, magenta y cian retrofuturista.',
    icon: '🌆',
    previewColor: '#f43f5e',
    themeClass: 'theme-synthwave'
  },
  {
    id: 'theme_cyberpunk',
    name: 'Cyberpunk 2088',
    category: 'palette',
    price: 150,
    description: 'Tonos amarillos eléctricos, negro obsidiana y cian.',
    icon: '⚡',
    previewColor: '#eab308',
    themeClass: 'theme-cyberpunk'
  },

  // Sprite Accessories
  {
    id: 'acc_none',
    name: 'Sin Accesorio',
    category: 'accessory',
    price: 0,
    description: 'Apariencia clásica de cada copiloto.',
    icon: '🎀',
    spriteAccessoryId: 'none'
  },
  {
    id: 'acc_glasses',
    name: 'Gafas Pixel 8-Bit',
    category: 'accessory',
    price: 75,
    description: 'Gafas de sol retro de thug life para un toque genial.',
    icon: '🕶️',
    spriteAccessoryId: 'glasses'
  },
  {
    id: 'acc_ribbon',
    name: 'Lazo Escarlata',
    category: 'accessory',
    price: 90,
    description: 'Lazo ceremonial rojo en el cabello para las copilotos.',
    icon: '🎀',
    spriteAccessoryId: 'ribbon'
  },
  {
    id: 'acc_crown',
    name: 'Corona de Campeón',
    category: 'accessory',
    price: 180,
    description: 'Corona dorada de rey de 8 bits con gemas brillantes.',
    icon: '👑',
    spriteAccessoryId: 'crown'
  },

  // Galería / Ilustraciones Desbloqueables
  {
    id: 'art_layla',
    name: 'Retrato: Layla',
    category: 'gallery',
    price: 120,
    description: 'Ilustración especial de Layla relajándose en su escritorio virtual en tonos pastel.',
    icon: '🌸'
  },
  {
    id: 'art_kalea',
    name: 'Retrato: Kalea',
    category: 'gallery',
    price: 140,
    description: 'Ilustración especial de Kalea contemplando la ciudad nocturna desde la azotea.',
    icon: '🌃'
  },
  {
    id: 'art_asuka',
    name: 'Retrato: Asuka',
    category: 'gallery',
    price: 160,
    description: 'Ilustración exclusiva de Asuka junto a su unidad mecha bajo el atardecer urbano.',
    icon: '🔥'
  },

  // Soundtest / Chiptunes
  {
    id: 'sound_anthem',
    name: 'Himno de Batalla 8-Bit',
    category: 'soundtrack',
    price: 80,
    description: 'Pista musical acelerada para desafiar a los jefes.',
    icon: '🎵'
  },
  {
    id: 'sound_victory',
    name: 'Melodía de la Victoria Arcade',
    category: 'soundtrack',
    price: 110,
    description: 'Fanfarria triunfal de 8 canales sintetizada.',
    icon: '🎺'
  }
];

// OVERWORLD NODE MAP DEFINITION
export const OVERWORLD_NODES: Record<string, MapNode> = {
  // STAGE 1: INICIO
  node_1_layla: {
    id: 'node_1_layla',
    stage: 1,
    type: 'route_layla',
    name: 'Colina de Layla',
    description: 'Palabras cortas · 6 Vidas · Pistas directas',
    difficulty: 'facil',
    rewardCoins: 10,
    hp: 6,
    connections: ['node_2_layla', 'node_2_kalea'],
    x: 1,
    y: 1
  },
  node_1_kalea: {
    id: 'node_1_kalea',
    stage: 1,
    type: 'route_kalea',
    name: 'Sendero de Kalea',
    description: 'Palabras intermedias · 4 Vidas · Pistas equilibradas',
    difficulty: 'normal',
    rewardCoins: 25,
    hp: 4,
    connections: ['node_2_kalea', 'node_2_asuka'],
    x: 1,
    y: 2
  },
  node_1_asuka: {
    id: 'node_1_asuka',
    stage: 1,
    type: 'route_asuka',
    name: 'Fortaleza Asuka',
    description: 'Palabras complejas · 3 Vidas · Modo Espartano',
    difficulty: 'dificil',
    rewardCoins: 50,
    hp: 3,
    connections: ['node_2_kalea', 'node_2_asuka'],
    x: 1,
    y: 3
  },

  // STAGE 2: CAMINO MEDIO
  node_2_layla: {
    id: 'node_2_layla',
    stage: 2,
    type: 'route_layla',
    name: 'Jardín Soleado',
    description: 'Ruta Verde · Layla · Recompensa 10 Monedas',
    difficulty: 'facil',
    rewardCoins: 10,
    hp: 6,
    connections: ['node_boss_1'],
    x: 2,
    y: 1
  },
  node_2_kalea: {
    id: 'node_2_kalea',
    stage: 2,
    type: 'route_kalea',
    name: 'Torre del Trueno',
    description: 'Ruta Azul · Kalea · Recompensa 25 Monedas',
    difficulty: 'normal',
    rewardCoins: 25,
    hp: 4,
    connections: ['node_boss_1'],
    x: 2,
    y: 2
  },
  node_2_asuka: {
    id: 'node_2_asuka',
    stage: 2,
    type: 'route_asuka',
    name: 'Cráter Volcánico',
    description: 'Ruta Roja · Asuka · Recompensa 50 Monedas (3 HP)',
    difficulty: 'dificil',
    rewardCoins: 50,
    hp: 3,
    connections: ['node_boss_1'],
    x: 2,
    y: 3
  },

  // BOSS 1 (Aparece al avanzar por la primera etapa)
  node_boss_1: {
    id: 'node_boss_1',
    stage: 3,
    type: 'boss',
    name: 'JEFE: LEVIATÁN PIXEL',
    description: '¡JEFE RETRO! Palabra larga con tiempo límite. Doble recompensa.',
    difficulty: 'dificil',
    rewardCoins: 100,
    hp: 4,
    isBoss: true,
    bossTimeLimitSec: 50,
    connections: ['node_3_layla', 'node_3_kalea', 'node_3_asuka'],
    x: 3,
    y: 2
  },

  // STAGE 4: RAMIFICACIÓN AVANZADA
  node_3_layla: {
    id: 'node_3_layla',
    stage: 4,
    type: 'route_layla',
    name: 'Santuario de Flores',
    description: 'Ruta Verde · Layla · Recompensa 10 Monedas',
    difficulty: 'facil',
    rewardCoins: 10,
    hp: 6,
    connections: ['node_boss_final'],
    x: 4,
    y: 1
  },
  node_3_kalea: {
    id: 'node_3_kalea',
    stage: 4,
    type: 'route_kalea',
    name: 'Abismo de Cristal',
    description: 'Ruta Azul · Kalea · Recompensa 25 Monedas',
    difficulty: 'normal',
    rewardCoins: 25,
    hp: 4,
    connections: ['node_boss_final'],
    x: 4,
    y: 2
  },
  node_3_asuka: {
    id: 'node_3_asuka',
    stage: 4,
    type: 'route_asuka',
    name: 'Templo de Fuego Espartano',
    description: 'Ruta Roja · Asuka · Recompensa 50 Monedas (3 HP)',
    difficulty: 'dificil',
    rewardCoins: 50,
    hp: 3,
    connections: ['node_boss_final'],
    x: 4,
    y: 3
  },

  // BOSS FINAL: DILUVIO ARQUITECTÓNICO
  node_boss_final: {
    id: 'node_boss_final',
    stage: 5,
    type: 'boss',
    name: 'JEFE SUPREMO: KRAKEN 8-BIT',
    description: '¡BATALLA FINAL! Desafío contra el reloj para coronar tu sesión.',
    difficulty: 'dificil',
    rewardCoins: 200,
    hp: 3,
    isBoss: true,
    bossTimeLimitSec: 45,
    connections: [],
    x: 5,
    y: 2
  }
};

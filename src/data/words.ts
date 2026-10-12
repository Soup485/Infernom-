export type DifficultyId = 'facil' | 'normal' | 'dificil';

export interface DifficultyInfo {
  id: DifficultyId;
  name: string;
  badge: string;
  icon: string;
  maxLives: number;
  description: string;
}

export const DIFFICULTIES: DifficultyInfo[] = [
  {
    id: 'facil',
    name: '¿EN SERIO?',
    badge: 'EN SERIO?',
    icon: '🐣',
    maxLives: 6,
    description: 'Palabras cortas (3-5 letras) · 6 VIDAS · 2 pistas'
  },
  {
    id: 'normal',
    name: 'DAME ALGO JUSTO',
    badge: 'ALGO JUSTO',
    icon: '⚔️',
    maxLives: 4,
    description: 'Palabras equilibradas (5-7 letras) · 4 VIDAS'
  },
  {
    id: 'dificil',
    name: 'DAME GOD OF WAR',
    badge: 'GOD OF WAR',
    icon: '🔥',
    maxLives: 3,
    description: 'Palabras largas (8+ letras) · 3 VIDAS · Modo Espartano'
  }
];

export interface WordItem {
  id: string;
  word: string;
  category: string;
  hint: string;
  difficulty: DifficultyId;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'todos', name: 'Todas', icon: '✨', description: 'Palabras comunes variadas' },
  { id: 'animales', name: 'Animales', icon: '🐶', description: 'Animales conocidos' },
  { id: 'comida', name: 'Comida', icon: '🍎', description: 'Alimentos cotidianos' },
  { id: 'hogar', name: 'Hogar', icon: '🏠', description: 'Cosas de la casa' },
  { id: 'naturaleza', name: 'Naturaleza', icon: '🌲', description: 'Elementos del clima y el paisaje' },
  { id: 'deportes', name: 'Deportes', icon: '⚽', description: 'Juegos y actividades' }
];

export const WORD_BANK: WordItem[] = [
  // ==========================================
  // DIFICULTAD FÁCIL: "¿EN SERIO?" (Palabras cortas: 3 a 5 letras)
  // ==========================================
  // 1. Animales (Palabras cortas)
  { id: 'f_gato', word: 'GATO', category: 'animales', hint: 'Un felino doméstico pequeño que suele decir miau.', difficulty: 'facil' },
  { id: 'f_perro', word: 'PERRO', category: 'animales', hint: 'El mejor amigo del hombre, un animal leal.', difficulty: 'facil' },
  { id: 'f_oso', word: 'OSO', category: 'animales', hint: 'Un animal grande y peludo que duerme en invierno.', difficulty: 'facil' },
  { id: 'f_pato', word: 'PATO', category: 'animales', hint: 'Ave acuática que nada en los estanques y hace cuac.', difficulty: 'facil' },
  { id: 'f_vaca', word: 'VACA', category: 'animales', hint: 'Animal de granja que nos da leche.', difficulty: 'facil' },

  // 2. Comida (Palabras cortas)
  { id: 'f_pan', word: 'PAN', category: 'comida', hint: 'Alimento básico hecho de harina horneada.', difficulty: 'facil' },
  { id: 'f_uva', word: 'UVA', category: 'comida', hint: 'Fruta pequeña y redonda, verde o morada.', difficulty: 'facil' },
  { id: 'f_mani', word: 'MANI', category: 'comida', hint: 'Fruto seco pequeño que se come tostado o salado.', difficulty: 'facil' },
  { id: 'f_agua', word: 'AGUA', category: 'comida', hint: 'Líquido vital que bebemos todos los días.', difficulty: 'facil' },
  { id: 'f_cafe', word: 'CAFE', category: 'comida', hint: 'Bebida caliente y energizante para despertar por la mañana.', difficulty: 'facil' },
  { id: 'f_leche', word: 'LECHE', category: 'comida', hint: 'Bebida blanca que nos dan las vacas.', difficulty: 'facil' },

  // 3. Hogar (Palabras cortas)
  { id: 'f_casa', word: 'CASA', category: 'hogar', hint: 'El lugar donde vivimos y nos resguardamos.', difficulty: 'facil' },
  { id: 'f_mesa', word: 'MESA', category: 'hogar', hint: 'Mueble con patas donde comemos o estudiamos.', difficulty: 'facil' },
  { id: 'f_cama', word: 'CAMA', category: 'hogar', hint: 'Mueble suave donde dormimos por las noches.', difficulty: 'facil' },
  { id: 'f_llave', word: 'LLAVE', category: 'hogar', hint: 'Objeto de metal que usamos para abrir las puertas.', difficulty: 'facil' },
  { id: 'f_vaso', word: 'VASO', category: 'hogar', hint: 'Recipiente pequeño para beber líquidos.', difficulty: 'facil' },

  // 4. Naturaleza (Palabras cortas)
  { id: 'f_sol', word: 'SOL', category: 'naturaleza', hint: 'Estrella brillante que nos da luz y calor de día.', difficulty: 'facil' },
  { id: 'f_flor', word: 'FLOR', category: 'naturaleza', hint: 'Parte colorida y bonita de las plantas.', difficulty: 'facil' },
  { id: 'f_arbol', word: 'ARBOL', category: 'naturaleza', hint: 'Planta gigante con tronco de madera y hojas.', difficulty: 'facil' },
  { id: 'f_luna', word: 'LUNA', category: 'naturaleza', hint: 'Satélite natural que brilla en el cielo nocturno.', difficulty: 'facil' },
  { id: 'f_mar', word: 'MAR', category: 'naturaleza', hint: 'Gran masa de agua salada que cubre el planeta.', difficulty: 'facil' },

  // 5. Deportes (Palabras cortas)
  { id: 'f_gol', word: 'GOL', category: 'deportes', hint: 'Anotación clave en el fútbol.', difficulty: 'facil' },
  { id: 'f_tenis', word: 'TENIS', category: 'deportes', hint: 'Deporte donde se usa una raqueta y una pelota pequeña.', difficulty: 'facil' },
  { id: 'f_balon', word: 'BALON', category: 'deportes', hint: 'Esfera que se patea o lanza en muchos juegos.', difficulty: 'facil' },
  { id: 'f_meta', word: 'META', category: 'deportes', hint: 'El punto final al que todos quieren llegar corriendo.', difficulty: 'facil' },
  { id: 'f_nado', word: 'NADO', category: 'deportes', hint: 'Deporte olímpico en el agua.', difficulty: 'facil' },
  { id: 'f_yin', word: 'YIN', category: 'deportes', hint: 'Concepto de equilibrio y energía en artes marciales orientales.', difficulty: 'facil' },

  // ==========================================
  // DIFICULTAD NORMAL: "DAME ALGO JUSTO" (Nivel Intermedio: 5 a 7 letras)
  // ==========================================
  // 1. Animales (Nivel Intermedio)
  { id: 'n_tigre', word: 'TIGRE', category: 'animales', hint: 'Gran felino salvaje con rayas naranjas y negras.', difficulty: 'normal' },
  { id: 'n_cebra', word: 'CEBRA', category: 'animales', hint: 'Animal africano parecido a un caballo pero con rayas blancas y negras.', difficulty: 'normal' },
  { id: 'n_aguila', word: 'AGUILA', category: 'animales', hint: 'Ave rapaz de gran vista que vuela muy alto en las montañas.', difficulty: 'normal' },
  { id: 'n_conejo', word: 'CONEJO', category: 'animales', hint: 'Animal peludo de orejas largas que salta y come zanahorias.', difficulty: 'normal' },
  { id: 'n_jirafa', word: 'JIRAFA', category: 'animales', hint: 'Animal alto de cuello muy largo y manchas marrones.', difficulty: 'normal' },
  { id: 'n_pastor', word: 'PASTOR', category: 'animales', hint: 'Raza de perro muy inteligente y protectora.', difficulty: 'normal' },
  { id: 'n_delfin', word: 'DELFIN', category: 'animales', hint: 'Mamífero marino muy inteligente que vive en grupos y salta en el agua.', difficulty: 'normal' },
  { id: 'n_tortuga', word: 'TORTUGA', category: 'animales', hint: 'Reptil de marcha lenta que carga un caparazón duro en su espalda.', difficulty: 'normal' },
  { id: 'n_ardilla', word: 'ARDILLA', category: 'animales', hint: 'Pequeño roedor de cola larga y frondosa que colecciona bellotas.', difficulty: 'normal' },
  { id: 'n_hamster', word: 'HAMSTER', category: 'animales', hint: 'Roedor pequeño y doméstico que guarda comida en sus mejillas.', difficulty: 'normal' },

  // 2. Comida (Nivel Intermedio)
  { id: 'n_pizza', word: 'PIZZA', category: 'comida', hint: 'Plato italiano redondo cubierto de queso y salsa de tomate.', difficulty: 'normal' },
  { id: 'n_queso', word: 'QUESO', category: 'comida', hint: 'Alimento derivado de la leche, favorito de los ratones.', difficulty: 'normal' },
  { id: 'n_sandia', word: 'SANDIA', category: 'comida', hint: 'Fruta grande, verde por fuera y roja y dulce por dentro.', difficulty: 'normal' },
  { id: 'n_arroz', word: 'ARROZ', category: 'comida', hint: 'Grano pequeño y blanco que sirve de base para muchos platos.', difficulty: 'normal' },
  { id: 'n_helado', word: 'HELADO', category: 'comida', hint: 'Postre frío y dulce hecho de crema o leche congelada.', difficulty: 'normal' },
  { id: 'n_burrito', word: 'BURRITO', category: 'comida', hint: 'Comida envuelta en tortilla de harina con carne y frijoles.', difficulty: 'normal' },
  { id: 'n_platano', word: 'PLATANO', category: 'comida', hint: 'Fruta alargada de cáscara amarilla y pulpa dulce.', difficulty: 'normal' },
  { id: 'n_naranja', word: 'NARANJA', category: 'comida', hint: 'Cítrico redondo de color brillante rico en vitamina C.', difficulty: 'normal' },
  { id: 'n_galleta', word: 'GALLETA', category: 'comida', hint: 'Pequeño horneado dulce y crujiente que suele comerse con leche.', difficulty: 'normal' },
  { id: 'n_yogur', word: 'YOGUR', category: 'comida', hint: 'Producto lácteo fermentado, cremoso y ligeramente ácido.', difficulty: 'normal' },

  // 3. Hogar (Nivel Intermedio)
  { id: 'n_silla', word: 'SILLA', category: 'hogar', hint: 'Mueble con respaldo individual para sentarse en la mesa.', difficulty: 'normal' },
  { id: 'n_reloj', word: 'RELOJ', category: 'hogar', hint: 'Objeto que usamos para ver qué hora es.', difficulty: 'normal' },
  { id: 'n_espejo', word: 'ESPEJO', category: 'hogar', hint: 'Superficie de vidrio donde puedes ver tu reflejo.', difficulty: 'normal' },
  { id: 'n_cocina', word: 'COCINA', category: 'hogar', hint: 'Habitación de la casa donde se preparan los alimentos.', difficulty: 'normal' },
  { id: 'n_sillon', word: 'SILLON', category: 'hogar', hint: 'Asiento grande, acolchado y cómodo para la sala.', difficulty: 'normal' },
  { id: 'n_ventana', word: 'VENTANA', category: 'hogar', hint: 'Abertura en la pared con vidrio para ver hacia afuera y dejar entrar luz.', difficulty: 'normal' },
  { id: 'n_sabana', word: 'SABANA', category: 'hogar', hint: 'Pieza de tela que se coloca sobre el colchón para dormir.', difficulty: 'normal' },
  { id: 'n_armario', word: 'ARMARIO', category: 'hogar', hint: 'Mueble grande con puertas para colgar y guardar ropa.', difficulty: 'normal' },
  { id: 'n_lampara', word: 'LAMPARA', category: 'hogar', hint: 'Objeto que ilumina las habitaciones conectándose a la electricidad.', difficulty: 'normal' },
  { id: 'n_cortina', word: 'CORTINA', category: 'hogar', hint: 'Tela que cuelga de las ventanas para bloquear la luz.', difficulty: 'normal' },

  // 4. Naturaleza (Nivel Intermedio)
  { id: 'n_playa', word: 'PLAYA', category: 'naturaleza', hint: 'Costa de arena junto al mar donde la gente toma el sol.', difficulty: 'normal' },
  { id: 'n_fuego', word: 'FUEGO', category: 'naturaleza', hint: 'Calor y llamas producidos al quemar algo.', difficulty: 'normal' },
  { id: 'n_tierra', word: 'TIERRA', category: 'naturaleza', hint: 'El planeta en el que vivimos y también el suelo que pisamos.', difficulty: 'normal' },
  { id: 'n_selva', word: 'SELVA', category: 'naturaleza', hint: 'Bosque tropical muy denso con gran variedad de plantas y animales.', difficulty: 'normal' },
  { id: 'n_viento', word: 'VIENTO', category: 'naturaleza', hint: 'Corriente de aire que se mueve con fuerza en la atmósfera.', difficulty: 'normal' },
  { id: 'n_piedra', word: 'PIEDRA', category: 'naturaleza', hint: 'Fragmento de roca duro y sólido que encuentras en el suelo.', difficulty: 'normal' },
  { id: 'n_volcan', word: 'VOLCAN', category: 'naturaleza', hint: 'Montaña que expulsa lava ardiente y gases desde su interior.', difficulty: 'normal' },
  { id: 'n_cascada', word: 'CASCADA', category: 'naturaleza', hint: 'Caída de agua desde una altura considerable en un río.', difficulty: 'normal' },
  { id: 'n_planeta', word: 'PLANETA', category: 'naturaleza', hint: 'Gran cuerpo celeste que gira alrededor de una estrella como el Sol.', difficulty: 'normal' },
  { id: 'n_brisa', word: 'BRISA', category: 'naturaleza', hint: 'Viento suave y fresco que sopla agradablemente.', difficulty: 'normal' },

  // 5. Deportes (Nivel Intermedio)
  { id: 'n_futbol', word: 'FUTBOL', category: 'deportes', hint: 'Deporte donde dos equipos patean un balón hacia una portería.', difficulty: 'normal' },
  { id: 'n_boxeo', word: 'BOXEO', category: 'deportes', hint: 'Deporte de combate donde dos personas usan guantes en un cuadrilátero.', difficulty: 'normal' },
  { id: 'n_pista', word: 'PISTA', category: 'deportes', hint: 'Circuito cerrado donde compiten los corredores.', difficulty: 'normal' },
  { id: 'n_ciclo', word: 'CICLO', category: 'deportes', hint: 'Ruta o vuelta en bicicleta dentro de un circuito deportivo.', difficulty: 'normal' },
  { id: 'n_regata', word: 'REGATA', category: 'deportes', hint: 'Competencia de velocidad entre embarcaciones o veleros.', difficulty: 'normal' },
  { id: 'n_atleta', word: 'ATLETA', category: 'deportes', hint: 'Persona que practica disciplinas de correr, saltar o lanzar.', difficulty: 'normal' },
  { id: 'n_patin', word: 'PATIN', category: 'deportes', hint: 'Calzado con ruedas o cuchillas para deslizarse sobre superficies.', difficulty: 'normal' },
  { id: 'n_campo', word: 'CAMPO', category: 'deportes', hint: 'Terreno delimitado donde se juegan partidos de varios deportes.', difficulty: 'normal' },
  { id: 'n_guante', word: 'GUANTE', category: 'deportes', hint: 'Protección para las manos usada en béisbol o boxeo.', difficulty: 'normal' },
  { id: 'n_medalla', word: 'MEDALLA', category: 'deportes', hint: 'Premio brillante que se cuelga en el cuello del ganador.', difficulty: 'normal' },
  { id: 'n_portero', word: 'PORTERO', category: 'deportes', hint: 'Jugador encargado de evitar que el balón entre a su arco.', difficulty: 'normal' },

  // ==========================================
  // DIFICULTAD DIFÍCIL: "DAME GOD OF WAR" / ASUKA (Palabras complejas y técnicas de 8 a 12+ letras)
  // ==========================================
  // A. Naturaleza y Ciencia (Técnicas)
  { id: 'd_atmosfera', word: 'ATMOSFERA', category: 'naturaleza', hint: 'Capa de gases que rodea un planeta o cuerpo celeste.', difficulty: 'dificil' },
  { id: 'd_ecosistema', word: 'ECOSISTEMA', category: 'naturaleza', hint: 'Comunidad de seres vivos e interacción con su entorno físico.', difficulty: 'dificil' },
  { id: 'd_relampago', word: 'RELAMPAGO', category: 'naturaleza', hint: 'Resplandor vivo y deslumbrante producido por una descarga eléctrica.', difficulty: 'dificil' },
  { id: 'd_terremoto', word: 'TERREMOTO', category: 'naturaleza', hint: 'Sacudida violenta de la corteza terrestre por choque de placas.', difficulty: 'dificil' },
  { id: 'd_cordillera', word: 'CORDILLERA', category: 'naturaleza', hint: 'Gran cadena continua de montañas o elevaciones geográficas.', difficulty: 'dificil' },
  { id: 'd_cascadas', word: 'CASCADAS', category: 'naturaleza', hint: 'Gran caída continua de agua desde una altura considerable.', difficulty: 'dificil' },
  { id: 'd_fotosintesis', word: 'FOTOSINTESIS', category: 'naturaleza', hint: 'Proceso metabólico vegetal que sintetiza materia usando luz solar.', difficulty: 'dificil' },
  { id: 'd_termodinamica', word: 'TERMODINAMICA', category: 'naturaleza', hint: 'Rama de la física que estudia las transferencias de calor y energía.', difficulty: 'dificil' },
  { id: 'd_metamorfosis', word: 'METAMORFOSIS', category: 'naturaleza', hint: 'Transformación biológica radical en el desarrollo de un ser.', difficulty: 'dificil' },

  // B. Tecnología y Mecánica
  { id: 'd_automatico', word: 'AUTOMATICO', category: 'hogar', hint: 'Sistema que funciona por sí solo sin intervención manual constante.', difficulty: 'dificil' },
  { id: 'd_algoritmo', word: 'ALGORITMO', category: 'hogar', hint: 'Conjunto ordenado de operaciones para resolver un problema.', difficulty: 'dificil' },
  { id: 'd_interfaz', word: 'INTERFAZ', category: 'hogar', hint: 'Conexión física o lógica que permite la comunicación entre sistemas.', difficulty: 'dificil' },
  { id: 'd_mecanismo', word: 'MECANISMO', category: 'hogar', hint: 'Estructura de piezas combinadas para transmitir un movimiento.', difficulty: 'dificil' },
  { id: 'd_pantalla', word: 'PANTALLA', category: 'hogar', hint: 'Superficie sobre la que se proyectan imágenes o información digital.', difficulty: 'dificil' },
  { id: 'd_polimorfismo', word: 'POLIMORFISMO', category: 'hogar', hint: 'Principio técnico que permite múltiples formas de comportamiento.', difficulty: 'dificil' },

  // C. Conceptos Avanzados y Abstractos
  { id: 'd_arquitectura', word: 'ARQUITECTURA', category: 'hogar', hint: 'Arte y técnica de diseñar y construir edificios y estructuras.', difficulty: 'dificil' },
  { id: 'd_estrategia', word: 'ESTRATEGIA', category: 'deportes', hint: 'Plan y serie de acciones meditadas para lograr un objetivo principal.', difficulty: 'dificil' },
  { id: 'd_estructura', word: 'ESTRUCTURA', category: 'hogar', hint: 'Disposición y orden de las partes dentro de un todo.', difficulty: 'dificil' },
  { id: 'd_laberinto', word: 'LABERINTO', category: 'hogar', hint: 'Lugar formado por calles y encrucijadas de complejo trazado.', difficulty: 'dificil' },
  { id: 'd_universo', word: 'UNIVERSO', category: 'naturaleza', hint: 'Conjunto de todo lo existente, incluyendo materia, energía y espacio.', difficulty: 'dificil' },
  { id: 'd_caleidoscopio', word: 'CALEIDOSCOPIO', category: 'hogar', hint: 'Tubo óptico con espejos que multiplica figuras geométricas simétricas.', difficulty: 'dificil' },
  { id: 'd_sinestesia', word: 'SINESTESIA', category: 'hogar', hint: 'Percepción cruzada donde un estímulo evoca sensaciones de otro sentido.', difficulty: 'dificil' },
  { id: 'd_quintaesencia', word: 'QUINTAESENCIA', category: 'naturaleza', hint: 'Expresión más pura, refinada y esencial de una materia o concepto.', difficulty: 'dificil' },
  { id: 'd_arquetipo', word: 'ARQUETIPO', category: 'hogar', hint: 'Modelo o prototipo fundamental transmitido en el imaginario colectivo.', difficulty: 'dificil' }
];

/**
 * Normalizes a Spanish character:
 * Maps accented vowels (Á, É, Í, Ó, Ú, Ü) to their base vowel (A, E, I, O, U).
 * Preserves 'Ñ' as a distinct Spanish letter.
 */
export function normalizeChar(char: string): string {
  const upper = char.toUpperCase();
  switch (upper) {
    case 'Á':
      return 'A';
    case 'É':
      return 'E';
    case 'Í':
      return 'I';
    case 'Ó':
      return 'O';
    case 'Ú':
    case 'Ü':
      return 'U';
    default:
      return upper;
  }
}

/**
 * Returns true if a given guessed letter matches a character in the target word.
 */
export function isCharMatch(targetChar: string, guessedLetter: string): boolean {
  return normalizeChar(targetChar) === normalizeChar(guessedLetter);
}

/**
 * Returns true if the entire word has been guessed.
 */
export function isWordComplete(word: string, guessedLetters: Set<string>): boolean {
  for (const ch of word) {
    if (ch === ' ' || ch === '-' || ch === "'") continue;
    const normalized = normalizeChar(ch);
    if (!guessedLetters.has(normalized)) {
      return false;
    }
  }
  return true;
}

/**
 * Selects 1 or 2 distinct letters from the target word to provide as a starter hint
 * according to the selected difficulty:
 * - 'facil' ("¿EN SERIO?"): 2 clue letters (or all minus 1 if short)
 * - 'normal' ("DAME ALGO JUSTO"): 1 to 2 clue letters
 * - 'dificil' ("DAME GOD OF WAR"): 1 clue letter for Spartan test
 */
export function getStarterClueLetters(word: string, difficulty: DifficultyId = 'normal'): string[] {
  const uniqueChars: string[] = [];
  for (const ch of word) {
    if (ch === ' ' || ch === '-' || ch === "'") continue;
    const norm = normalizeChar(ch);
    if (!uniqueChars.includes(norm)) {
      uniqueChars.push(norm);
    }
  }

  if (uniqueChars.length <= 1) {
    return uniqueChars;
  }

  const shuffled = [...uniqueChars].sort(() => Math.random() - 0.5);

  let clueCount = 1;
  if (difficulty === 'facil') {
    clueCount = Math.min(2, uniqueChars.length - 1);
  } else if (difficulty === 'normal') {
    clueCount = word.length >= 6 ? 2 : 1;
  } else if (difficulty === 'dificil') {
    // Spartan GOD OF WAR difficulty: only 1 clue letter!
    clueCount = 1;
  }

  return shuffled.slice(0, Math.min(clueCount, uniqueChars.length - 1));
}

/**
 * Gets a random word filtered by difficulty and/or category.
 */
export function getRandomWord(difficulty: DifficultyId = 'normal', category: string = 'todos'): WordItem {
  let pool = WORD_BANK.filter(w => w.difficulty === difficulty);
  
  if (category !== 'todos') {
    const categoryPool = pool.filter(w => w.category === category);
    if (categoryPool.length > 0) {
      pool = categoryPool;
    }
  }

  if (pool.length === 0) {
    pool = WORD_BANK.filter(w => w.difficulty === difficulty);
  }
  if (pool.length === 0) {
    pool = WORD_BANK;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

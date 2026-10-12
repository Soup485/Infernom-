// 8-Bit Chiptune Sound Effects & Retro BGM Synthesizer
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public musicEnabled: boolean = false;
  private bgmInterval: number | null = null;
  private currentStep: number = 0;

  constructor() {
    const savedSfx = localStorage.getItem('ahorcado_sound_enabled');
    if (savedSfx !== null) {
      this.enabled = savedSfx === 'true';
    }
    const savedMusic = localStorage.getItem('ahorcado_music_enabled');
    if (savedMusic !== null) {
      this.musicEnabled = savedMusic === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('ahorcado_sound_enabled', String(this.enabled));
    if (this.enabled) {
      this.playLetterClick();
    }
    return this.enabled;
  }

  public toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem('ahorcado_music_enabled', String(this.musicEnabled));
    if (this.musicEnabled) {
      this.startBGM();
    } else {
      this.stopBGM();
    }
    return this.musicEnabled;
  }

  // 8-Bit Background Chiptune Loop
  public startBGM() {
    if (!this.musicEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    this.stopBGM();

    // 8-bit melody sequence (frequencies in Hz)
    // Classic upbeat NES arcade progression (C4, E4, G4, A4, G4, E4, D4, C4...)
    const melody = [
      261.63, 0, 329.63, 0, 392.00, 0, 440.00, 392.00,
      329.63, 0, 293.66, 0, 261.63, 0, 0, 0,
      329.63, 0, 392.00, 0, 523.25, 0, 392.00, 329.63,
      293.66, 0, 329.63, 0, 261.63, 0, 0, 0
    ];

    const bass = [
      130.81, 130.81, 164.81, 164.81, 196.00, 196.00, 220.00, 196.00,
      164.81, 164.81, 146.83, 146.83, 130.81, 130.81, 130.81, 130.81,
      164.81, 164.81, 196.00, 196.00, 261.63, 261.63, 196.00, 164.81,
      146.83, 146.83, 164.81, 164.81, 130.81, 130.81, 130.81, 130.81
    ];

    const stepDuration = 140; // ms per 16th note

    this.bgmInterval = window.setInterval(() => {
      if (!this.ctx || !this.musicEnabled) return;

      const now = this.ctx.currentTime;
      const noteFreq = melody[this.currentStep % melody.length];
      const bassFreq = bass[this.currentStep % bass.length];

      // Play lead melody pulse note
      if (noteFreq > 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(noteFreq, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }

      // Play bass triangle note
      if (bassFreq > 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(bassFreq, now);
        bassGain.gain.setValueAtTime(0.05, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.13);
      }

      this.currentStep++;
    }, stepDuration);
  }

  public stopBGM() {
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  // 8-bit UI click
  public playClick() {
    this.playLetterClick();
  }

  public playLetterClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.02); // A5

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // ignore
    }
  }

  // 8-bit coin / item chime
  public playCorrect() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Note 1: B5
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(987.77, now);
      gain1.gain.setValueAtTime(0.1, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.07);

      // Note 2: E6
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1318.51, now + 0.07);
      gain2.gain.setValueAtTime(0.12, now + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.07);
      osc2.stop(now + 0.28);
    } catch {
      // ignore
    }
  }

  // 8-bit damage / wrong letter buzz
  public playWrong() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.18);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // ignore
    }
  }

  // 8-bit cute waifu companion vocal blip (Animal Crossing / Pokémon style text blip)
  public playWaifuChirp() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      // Pleasant cute high-pitched chirp: 880Hz gliding to 1100Hz
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1174, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore
    }
  }

  // 8-bit Stage Clear Victory Fanfare
  public playWin() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Classic NES Level Complete melody: C5, E5, G5, C6, G5, C6
      const notes = [
        { f: 523.25, d: 0.09 },
        { f: 659.25, d: 0.09 },
        { f: 783.99, d: 0.09 },
        { f: 1046.50, d: 0.18 },
        { f: 783.99, d: 0.09 },
        { f: 1046.50, d: 0.45 }
      ];

      let elapsed = 0;
      notes.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(n.f, now + elapsed);
        gain.gain.setValueAtTime(0.12, now + elapsed);
        gain.gain.exponentialRampToValueAtTime(0.001, now + elapsed + n.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + elapsed);
        osc.stop(now + elapsed + n.d);
        elapsed += n.d;
      });
    } catch {
      // ignore
    }
  }

  // 8-bit Game Over Melancholic Tune
  public playLose() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Classic NES Game Over: F4, E4, D#4, D4 -> long low C4
      const notes = [
        { f: 349.23, d: 0.15 },
        { f: 329.63, d: 0.15 },
        { f: 311.13, d: 0.15 },
        { f: 293.66, d: 0.18 },
        { f: 261.63, d: 0.55 }
      ];

      let elapsed = 0;
      notes.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(n.f, now + elapsed);
        gain.gain.setValueAtTime(0.14, now + elapsed);
        gain.gain.exponentialRampToValueAtTime(0.001, now + elapsed + n.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + elapsed);
        osc.stop(now + elapsed + n.d);
        elapsed += n.d;
      });
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();

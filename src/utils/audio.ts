// Web Audio API Indian Ambient Raga & Soundscape Generator
class LuxurySoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private nodes: (AudioNode | number)[] = [];
  private masterGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play micro click / tactile silk rustle sound
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio context may require user gesture
    }
  }

  // Play sacred temple chime / drop into bag
  playBagSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [659.25, 880, 1046.5, 1318.5]; // E5, A5, C6, E6 harmonic bell
      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);

        gain.gain.setValueAtTime(0.08, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.9);
      });
    } catch {
      // fallback
    }
  }

  // Start Indian Meditative Tanpura / Temple Soundscape for Muse Film
  startAmbience() {
    try {
      this.init();
      if (!this.ctx || this.isPlaying) return;
      this.isPlaying = true;

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.001, this.ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.22, this.ctx.currentTime + 1.5);
      master.connect(this.ctx.destination);
      this.masterGain = master;

      // Base Tanpura Drone Frequencies (Root C#3: 138.59Hz, Fifth G#3: 207.65Hz, Octave C#4: 277.18Hz)
      const droneNotes = [138.59, 207.65, 277.18, 415.30];
      droneNotes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + i * 80, this.ctx.currentTime);

        // Slow pulsing LFO for breathing silk texture
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.12 + i * 0.04, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        lfo.connect(lfoGain.gain);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);

        osc.start();
        lfo.start();
        this.nodes.push(osc, lfo, gain, filter);
      });

      // Temple singing bell periodic shimmer
      const bellInterval = window.setInterval(() => {
        if (!this.isPlaying || !this.ctx) return;
        const bellFreqs = [554.37, 830.61, 1108.73];
        const f = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];
        const bellOsc = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();
        bellOsc.type = 'sine';
        bellOsc.frequency.setValueAtTime(f, this.ctx.currentTime);
        bellGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.0);
        bellOsc.connect(bellGain);
        bellGain.connect(master);
        bellOsc.start();
        bellOsc.stop(this.ctx.currentTime + 3.1);
      }, 4200);

      this.nodes.push(bellInterval);
    } catch {
      // Audio handling
    }
  }

  stopAmbience() {
    if (!this.isPlaying || !this.ctx) return;
    this.isPlaying = false;
    if (this.masterGain) {
      try {
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      this.nodes.forEach((n) => {
        if (typeof n === 'number') {
          clearInterval(n);
        } else if ('stop' in n && typeof (n as AudioScheduledSourceNode).stop === 'function') {
          try {
            (n as AudioScheduledSourceNode).stop();
          } catch {
            // ignore
          }
        }
      });
      this.nodes = [];
    }, 900);
  }

  toggleAmbience(): boolean {
    if (this.isPlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundManager = new LuxurySoundscape();

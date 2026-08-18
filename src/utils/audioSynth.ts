// Web Audio API Synth for organ/chant drone & ambient monastic ambiance
class AmbianceSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public start(type: 'organ_drone' | 'gregorian_bell') {
    this.stop();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 3);
      this.gainNode.connect(this.ctx.destination);

      if (type === 'organ_drone') {
        // Soft fifths organ chord (D2, A2, D3, F#3/F3)
        const freqs = [73.42, 110.00, 146.83, 220.00];
        freqs.forEach((freq) => {
          const osc = this.ctx!.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

          // Add subtle LFO for organic warmth
          const lfo = this.ctx!.createOscillator();
          const lfoGain = this.ctx!.createGain();
          lfo.frequency.value = 0.2;
          lfoGain.gain.value = 0.8;
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(this.gainNode!);
          osc.start();
          this.oscillators.push(osc);
        });
      } else if (type === 'gregorian_bell') {
        // High harmonic bell chime
        const freqs = [293.66, 440.0, 587.33, 880.0];
        freqs.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
          osc.connect(this.gainNode!);
          osc.start();
          this.oscillators.push(osc);
        });
      }

      this.isPlaying = true;
    } catch (e) {
      console.warn('Web Audio initialized fail', e);
    }
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
        setTimeout(() => {
          this.oscillators.forEach(osc => osc.stop());
          this.oscillators = [];
          if (this.ctx) this.ctx.close();
          this.ctx = null;
          this.isPlaying = false;
        }, 1500);
      } catch (e) {
        this.oscillators.forEach(osc => osc.stop());
        this.oscillators = [];
        this.ctx = null;
        this.isPlaying = false;
      }
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const ambianceSynth = new AmbianceSynth();

// Speech Synthesis Reader
class TextReader {
  private synth: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isReading = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, onEnd?: () => void, rate: number = 0.95) {
    this.stop();
    if (!this.synth) return;

    // Strip HTML or markdown tags if any
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\*/g, '');

    this.utterance = new SpeechSynthesisUtterance(cleanText);
    this.utterance.rate = rate;
    this.utterance.pitch = 0.98;

    // Try picking a nice English/Latin voice if available
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Samantha') || v.name.includes('Serena'))) || voices[0];
    if (preferredVoice) {
      this.utterance.voice = preferredVoice;
    }

    this.utterance.onend = () => {
      this.isReading = false;
      if (onEnd) onEnd();
    };

    this.utterance.onerror = () => {
      this.isReading = false;
    };

    this.isReading = true;
    this.synth.speak(this.utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isReading = false;
    }
  }

  public getIsReading() {
    return this.isReading;
  }
}

export const textReader = new TextReader();

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private createOscillator(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playClick() {
    this.createOscillator(800, 0.1, 'sine');
  }

  playPurchase() {
    if (!this.audioContext || !this.enabled) return;
    
    this.createOscillator(523.25, 0.1, 'triangle');
    setTimeout(() => this.createOscillator(659.25, 0.1, 'triangle'), 50);
    setTimeout(() => this.createOscillator(783.99, 0.15, 'triangle'), 100);
  }

  playAchievement() {
    if (!this.audioContext || !this.enabled) return;
    
    this.createOscillator(523.25, 0.15, 'square');
    setTimeout(() => this.createOscillator(659.25, 0.15, 'square'), 80);
    setTimeout(() => this.createOscillator(783.99, 0.15, 'square'), 160);
    setTimeout(() => this.createOscillator(1046.50, 0.3, 'square'), 240);
  }

  playUpgrade() {
    if (!this.audioContext || !this.enabled) return;
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.createOscillator(440 + i * 100, 0.1, 'sawtooth');
      }, i * 50);
    }
  }

  playError() {
    if (!this.audioContext || !this.enabled) return;
    
    this.createOscillator(200, 0.2, 'sawtooth');
    setTimeout(() => this.createOscillator(150, 0.2, 'sawtooth'), 100);
  }

  toggleSound(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();

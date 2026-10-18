// Lightweight Web Audio API synthesizer for Tactical Sci-Fi / Military HUD Sound Effects
class TacticalAudio {
  constructor() {
    this.ctx = null
    this.enabled = true
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
  }

  toggleSound() {
    this.enabled = !this.enabled
    if (this.enabled) {
      this.playBeep(880, 0.08, 'sine')
    }
    return this.enabled
  }

  playBeep(freq = 800, duration = 0.05, type = 'sine') {
    if (!this.enabled) return
    try {
      this.init()
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch (e) {
      // AudioContext autoplay restrictions or disabled
    }
  }

  playClick() {
    this.playBeep(1200, 0.03, 'square')
  }

  playConfirm() {
    if (!this.enabled) return
    this.playBeep(659, 0.06, 'triangle')
    setTimeout(() => {
      this.playBeep(987, 0.08, 'sine')
    }, 60)
  }

  playRadar() {
    if (!this.enabled) return
    this.playBeep(440, 0.1, 'sine')
    setTimeout(() => {
      this.playBeep(880, 0.12, 'sine')
    }, 120)
  }
}

export const sound = new TacticalAudio()

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { sound } from '../utils/audio'
import { getRandomTacticalImage, getLiveRandomImage } from '../utils/images'
import { 
  Play, 
  Download, 
  Crosshair, 
  Shield, 
  Radio, 
  RefreshCw, 
  Flame, 
  ChevronRight,
  Sparkles
} from 'lucide-vue-next'

const emit = defineEmits(['openPreRegister', 'openTrailer'])

// Dynamic random hero background image
const currentHeroImage = ref(getRandomTacticalImage('warfare', 1, 1920, 1080))
const isGlitching = ref(false)

// Function to cycle or randomize the hero image dynamically
const randomizeHeroImage = () => {
  sound.playRadar()
  isGlitching.value = true
  setTimeout(() => {
    currentHeroImage.value = getLiveRandomImage('soldier,warfare', 1920, 1080)
    isGlitching.value = false
  }, 250)
}

// Countdown timer state
const timeLeft = ref({
  hours: '08',
  minutes: '42',
  seconds: '19'
})

let timerInterval = null

onMounted(() => {
  let totalSeconds = 8 * 3600 + 42 * 60 + 19
  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--
      const h = Math.floor(totalSeconds / 3600)
      const m = Math.floor((totalSeconds % 3600) / 60)
      const s = totalSeconds % 60
      timeLeft.value = {
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      }
    }
  }, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <section id="hero" class="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden tactical-grid">
    <!-- Background Image with dynamic randomizer -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="currentHeroImage" 
        alt="Delta Force Tactical Operations" 
        :class="['w-full h-full object-cover object-center transition-all duration-700 filter brightness-40 contrast-125', isGlitching ? 'scale-105 blur-sm opacity-50' : 'scale-100 opacity-100']"
      />
      <!-- Vignette and Dark Gradients -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#080a0f] via-transparent to-[#080a0f]"></div>
      <div class="absolute inset-0 scanline opacity-30 pointer-events-none"></div>
    </div>

    <!-- HUD Overlay Corner Markers -->
    <div class="absolute top-32 left-8 hidden md:block text-slate-500 font-mono text-xs pointer-events-none">
      <div class="flex items-center space-x-2 text-cyan-400">
        <Crosshair class="w-4 h-4 animate-spin-slow" />
        <span>RECON COORDINATES: 33.3152° N, 44.3661° E</span>
      </div>
      <p class="text-slate-500 mt-1">SECTOR: AHSARAH // ZONE-04 EXTRACTION</p>
    </div>

    <!-- Hero Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
      <div class="max-w-3xl">
        <!-- Top Status Tags -->
        <div class="inline-flex items-center space-x-3 mb-6 bg-slate-900/80 border border-cyan-500/30 px-3.5 py-1.5 rounded-sm clip-tactical backdrop-blur-md">
          <span class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span class="text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
            SEASON 02: AH SARAH // SERANGAN TAKTIS
          </span>
          <span class="text-slate-600">|</span>
          <span class="text-amber-400 text-xs font-mono font-semibold flex items-center">
            <Flame class="w-3.5 h-3.5 mr-1" /> GLOBAL RELEASE
          </span>
        </div>

        <!-- Main Title -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
          TAKTIK TANPA BATAS. <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            PERANG MULTI-MATRA.
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg sm:text-xl text-slate-300 font-['Rajdhani'] font-medium max-w-2xl leading-relaxed mb-8">
          Masuki medan pertempuran taktis next-gen. Kendalikan operator spesialis dengan persenjataan tercanggih, kuasai kendaraan darat, laut, dan udara dalam pertempuran masif 32v32, atau pertaruhkan segalanya dalam mode ekstraksi intensif.
        </p>

        <!-- Live Extraction Drop Countdown -->
        <div class="mb-8 p-4 bg-slate-900/80 border-l-4 border-cyan-400 border-r border-t border-b border-slate-800 clip-tactical max-w-lg backdrop-blur-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-semibold flex items-center">
                <Radio class="w-3.5 h-3.5 mr-1.5 animate-pulse" /> CLASSIFIED DROP SCHEDULE
              </p>
              <p class="text-xs text-slate-300 font-medium">Reset Kontrak Operasi Rahasia Global</p>
            </div>
            <!-- Timer Display -->
            <div class="flex items-center space-x-2 font-mono font-bold text-white text-lg">
              <div class="bg-black/60 px-2.5 py-1 rounded border border-slate-700 text-cyan-300">
                {{ timeLeft.hours }}<span class="text-[9px] block text-slate-400 font-normal">JAM</span>
              </div>
              <span class="text-cyan-400 animate-pulse">:</span>
              <div class="bg-black/60 px-2.5 py-1 rounded border border-slate-700 text-cyan-300">
                {{ timeLeft.minutes }}<span class="text-[9px] block text-slate-400 font-normal">MEN</span>
              </div>
              <span class="text-cyan-400 animate-pulse">:</span>
              <div class="bg-black/60 px-2.5 py-1 rounded border border-slate-700 text-amber-400">
                {{ timeLeft.seconds }}<span class="text-[9px] block text-slate-400 font-normal">DET</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="flex flex-wrap items-center gap-4 mb-10">
          <button 
            @click="sound.playConfirm(); emit('openPreRegister')" 
            class="px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-['Chakra_Petch'] font-bold text-base tracking-wider uppercase clip-tactical transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center group">
            <Download class="w-5 h-5 mr-2.5 transform group-hover:scale-110 transition" />
            <span>MAIN SEKARANG GRATIS</span>
            <ChevronRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
          </button>

          <button 
            @click="sound.playClick(); emit('openTrailer')" 
            class="px-7 py-4 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-600 hover:border-cyan-400 font-['Chakra_Petch'] font-semibold text-base tracking-wider uppercase clip-tactical transition duration-300 flex items-center group backdrop-blur-sm">
            <div class="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3 border border-cyan-500/50 group-hover:bg-cyan-400 group-hover:text-black transition">
              <Play class="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>TONTON TRAILER RESMI</span>
          </button>

          <!-- Random Image Regenerator Button -->
          <button 
            @click="randomizeHeroImage" 
            title="Muat Visual Taktis Acak Baru"
            class="px-4 py-4 bg-black/70 hover:bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/50 font-mono text-xs uppercase clip-tactical transition flex items-center"
          >
            <RefreshCw :class="['w-4 h-4 mr-2', isGlitching ? 'animate-spin' : '']" />
            <span>ACAK VISUAL BACKGROUND</span>
          </button>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-800/80 pt-6">
          <div class="bg-black/40 border border-slate-800/80 p-3 rounded clip-tactical">
            <div class="text-xl sm:text-2xl font-black text-cyan-400 font-['Chakra_Petch']">32 VS 32</div>
            <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider">GRAND WARFARE</div>
          </div>
          <div class="bg-black/40 border border-slate-800/80 p-3 rounded clip-tactical">
            <div class="text-xl sm:text-2xl font-black text-amber-400 font-['Chakra_Petch']">100% FREE</div>
            <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider">NO PAY-TO-WIN</div>
          </div>
          <div class="bg-black/40 border border-slate-800/80 p-3 rounded clip-tactical">
            <div class="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch']">UNREAL 5</div>
            <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider">GRAPHICS ENGINE</div>
          </div>
          <div class="bg-black/40 border border-slate-800/80 p-3 rounded clip-tactical">
            <div class="text-xl sm:text-2xl font-black text-emerald-400 font-['Chakra_Petch']">CROSS-PLAY</div>
            <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider">PC • MOBILE • CONSOLE</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Gradient Transition -->
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080a0f] to-transparent pointer-events-none"></div>
  </section>
</template>

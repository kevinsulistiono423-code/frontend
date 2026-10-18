<script setup>
import { ref } from 'vue'
import { sound } from '../utils/audio'
import { 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Radio, 
  Crosshair,
  Download
} from 'lucide-vue-next'

import { onMounted } from 'vue'

const emit = defineEmits(['openPreRegister', 'openTrailer'])

const isMuted = ref(false)
const mobileMenuOpen = ref(false)
const serverStatus = ref({
  region: 'AS-JAKARTA-01',
  status: 'ONLINE',
  pingMs: 16,
  version: 'V2.4.0-HAWK_OPS',
  season: 'SEASON 02: AH SARAH PROTOCOL',
  satLink: 'LOCKED',
  securityClearance: 'LVL-4'
})

const fetchServerStatus = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/v1/servers/status')
    if (res.ok) {
      const data = await res.json()
      serverStatus.value = { ...serverStatus.value, ...data }
    }
  } catch (e) {
    // offline fallback
  }
}

onMounted(() => {
  fetchServerStatus()
})

const toggleAudio = () => {
  const enabled = sound.toggleSound()
  isMuted.value = !enabled
}

const handleNavClick = (sectionId) => {
  sound.playClick()
  mobileMenuOpen.value = false
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#080a0f]/90 backdrop-blur-md border-b border-cyan-500/20">
    <!-- Top Tactical Status Bar -->
    <div class="hidden md:flex items-center justify-between px-6 py-1 bg-black/60 text-[11px] font-mono tracking-wider border-b border-white/5 text-slate-400">
      <div class="flex items-center space-x-6">
        <span :class="['flex items-center', serverStatus.status === 'ONLINE' ? 'text-emerald-400' : serverStatus.status === 'MAINTENANCE' ? 'text-amber-400' : 'text-red-400']">
          <span :class="['w-1.5 h-1.5 rounded-full mr-2', serverStatus.status === 'ONLINE' ? 'bg-emerald-400 animate-ping' : serverStatus.status === 'MAINTENANCE' ? 'bg-amber-400' : 'bg-red-400']"></span>
          SERVER STATUS: {{ serverStatus.region }} [{{ serverStatus.pingMs }}ms] // {{ serverStatus.status }}
        </span>
        <span class="text-slate-500">//</span>
        <span>VERSION: {{ serverStatus.version }}</span>
        <span class="text-slate-500">//</span>
        <span class="text-amber-400">{{ serverStatus.season }}</span>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-cyan-400 font-semibold flex items-center">
          <Radio class="w-3.5 h-3.5 mr-1 animate-pulse" /> SAT-LINK: {{ serverStatus.satLink || 'LOCKED' }}
        </span>
        <span class="text-slate-500">|</span>
        <span class="hover:text-white cursor-pointer transition">SECURITY CLEARANCE: {{ serverStatus.securityClearance || 'LVL-4' }}</span>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="#" @click.prevent="handleNavClick('hero')" class="flex items-center space-x-3 group">
          <div class="relative w-11 h-11 bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-center clip-tactical group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <svg class="w-7 h-7 text-cyan-400 transform group-hover:scale-110 transition duration-300" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 2 22 22 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
              <polygon points="12 7 6 18 18 18" fill="currentColor" opacity="0.3"/>
              <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2"/>
            </svg>
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-amber-400"></div>
          </div>
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="text-2xl font-black tracking-widest text-white uppercase font-['Chakra_Petch'] group-hover:text-cyan-400 transition">
                DELTA<span class="text-cyan-400">FORCE</span>
              </span>
              <span class="text-[10px] px-1 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono rounded">
                OPS
              </span>
            </div>
            <p class="text-[10px] tracking-[0.25em] text-slate-400 font-mono -mt-1">
              TACTICAL WARFARE GLOBAL
            </p>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center space-x-8 text-sm font-semibold tracking-wider font-['Rajdhani']">
          <button @click="handleNavClick('operators')" class="text-slate-300 hover:text-cyan-400 transition flex items-center group py-2">
            <span class="text-cyan-500/50 mr-1 text-xs group-hover:text-cyan-400">//</span> OPERATOR
          </button>
          <button @click="handleNavClick('modes')" class="text-slate-300 hover:text-cyan-400 transition flex items-center group py-2">
            <span class="text-cyan-500/50 mr-1 text-xs group-hover:text-cyan-400">//</span> MODE TEMPUR
          </button>
          <button @click="handleNavClick('recon')" class="text-slate-300 hover:text-cyan-400 transition flex items-center group py-2">
            <span class="text-cyan-500/50 mr-1 text-xs group-hover:text-cyan-400">//</span> RECON RANDOM
          </button>
          <button @click="handleNavClick('gunsmith')" class="text-slate-300 hover:text-cyan-400 transition flex items-center group py-2">
            <span class="text-cyan-500/50 mr-1 text-xs group-hover:text-cyan-400">//</span> ARSENAL
          </button>
          <button @click="handleNavClick('intel')" class="text-slate-300 hover:text-cyan-400 transition flex items-center group py-2">
            <span class="text-cyan-500/50 mr-1 text-xs group-hover:text-cyan-400">//</span> INTEL
          </button>
          <button @click="handleNavClick('specs')" class="text-slate-300 hover:text-cyan-400 transition flex items-center group py-2">
            <span class="text-cyan-500/50 mr-1 text-xs group-hover:text-cyan-400">//</span> SPESIFIKASI
          </button>
        </nav>

        <!-- Right Action Items -->
        <div class="hidden sm:flex items-center space-x-4">
          <!-- Audio SFX Toggle -->
          <button 
            @click="toggleAudio" 
            title="Toggle Tactical Sound Effects"
            class="p-2.5 rounded border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition">
            <Volume2 v-if="!isMuted" class="w-4 h-4 text-cyan-400" />
            <VolumeX v-else class="w-4 h-4 text-slate-500" />
          </button>

          <!-- Pre-register / Play Free CTA -->
          <button 
            @click="emit('openPreRegister')" 
            class="relative group px-6 py-2.5 overflow-hidden font-['Chakra_Petch'] font-bold text-sm tracking-wider uppercase text-black bg-cyan-400 hover:bg-cyan-300 transition duration-300 clip-tactical shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center">
            <Download class="w-4 h-4 mr-2" />
            <span>MAIN GRATIS</span>
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex items-center sm:hidden space-x-2">
          <button 
            @click="toggleAudio" 
            class="p-2 rounded border border-slate-700 bg-slate-900 text-slate-300">
            <Volume2 v-if="!isMuted" class="w-4 h-4 text-cyan-400" />
            <VolumeX v-else class="w-4 h-4 text-slate-500" />
          </button>
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="p-2 rounded border border-slate-700 bg-slate-900 text-slate-200 hover:text-cyan-400">
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden bg-[#0c0f17] border-b border-cyan-500/20 px-6 py-6 space-y-4">
      <div class="flex flex-col space-y-3 font-['Rajdhani'] font-semibold text-lg">
        <button @click="handleNavClick('operators')" class="text-left text-slate-200 hover:text-cyan-400 py-1 border-b border-white/5">
          // OPERATOR & SPESIALIS
        </button>
        <button @click="handleNavClick('modes')" class="text-left text-slate-200 hover:text-cyan-400 py-1 border-b border-white/5">
          // MODE PERMAINAN
        </button>
        <button @click="handleNavClick('recon')" class="text-left text-slate-200 hover:text-cyan-400 py-1 border-b border-white/5">
          // SAT-RECON (RANDOM FEED)
        </button>
        <button @click="handleNavClick('gunsmith')" class="text-left text-slate-200 hover:text-cyan-400 py-1 border-b border-white/5">
          // ARSENAL SENJATA
        </button>
        <button @click="handleNavClick('intel')" class="text-left text-slate-200 hover:text-cyan-400 py-1 border-b border-white/5">
          // INTEL LAPANGAN
        </button>
        <button @click="handleNavClick('specs')" class="text-left text-slate-200 hover:text-cyan-400 py-1 border-b border-white/5">
          // SPESIFIKASI SISTEM
        </button>
      </div>

      <div class="pt-4 flex flex-col gap-3">
        <button 
          @click="emit('openPreRegister'); mobileMenuOpen = false" 
          class="w-full py-3 bg-cyan-400 hover:bg-cyan-300 font-bold text-black font-['Chakra_Petch'] text-center clip-tactical">
          MAIN SEKARANG GRATIS
        </button>
        <button 
          @click="emit('openTrailer'); mobileMenuOpen = false" 
          class="w-full py-3 border border-slate-700 bg-slate-900 text-white font-bold font-['Chakra_Petch'] text-center clip-tactical">
          TONTON CINEMATIC TRAILER
        </button>
      </div>
    </div>
  </header>
</template>

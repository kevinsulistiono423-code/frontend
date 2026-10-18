<script setup>
import { ref } from 'vue'
import { sound } from '../utils/audio'
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Layers, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  Smartphone,
  Gamepad2
} from 'lucide-vue-next'

const specTier = ref('recommended') // 'minimum' or 'recommended'

const platforms = [
  { name: 'PC (Steam)', desc: 'DirectX 12 / High FPS', icon: Monitor, tag: 'Tersedia Sekarang' },
  { name: 'PC (Epic Games)', desc: 'Launcher Resmi Global', icon: Monitor, tag: 'Tersedia Sekarang' },
  { name: 'PlayStation 5', desc: 'DualSense Haptic & 4K', icon: Gamepad2, tag: 'Konsol Next-Gen' },
  { name: 'Xbox Series X|S', desc: '120 FPS Tactical Mode', icon: Gamepad2, tag: 'Konsol Next-Gen' },
  { name: 'iOS (App Store)', desc: 'iPhone 13 ke atas / iPad', icon: Smartphone, tag: 'Mobile Cross-Progression' },
  { name: 'Android (Google Play)', desc: 'Snapdragon 8 Gen 1+', icon: Smartphone, tag: 'Mobile Cross-Progression' }
]

const specs = {
  minimum: [
    { label: 'Sistem Operasi', val: 'Windows 10 64-bit (Version 1909 ke atas)' },
    { label: 'Prosesor (CPU)', val: 'Intel Core i5-6500 / AMD Ryzen 5 1500X' },
    { label: 'Kartu Grafis (GPU)', val: 'NVIDIA GeForce GTX 1060 5GB / AMD Radeon RX 5500 XT' },
    { label: 'Memori RAM', val: '16 GB RAM' },
    { label: 'DirectX', val: 'Version 12' },
    { label: 'Penyimpanan', val: '80 GB ruang kosong (SSD Sangat Disarankan)' },
    { label: 'Koneksi Jaringan', val: 'Koneksi Internet Broadband Stabil' }
  ],
  recommended: [
    { label: 'Sistem Operasi', val: 'Windows 11 64-bit (Update Terkini)' },
    { label: 'Prosesor (CPU)', val: 'Intel Core i7-10700K / AMD Ryzen 7 3700X' },
    { label: 'Kartu Grafis (GPU)', val: 'NVIDIA GeForce RTX 3060 12GB / AMD Radeon RX 6700 XT' },
    { label: 'Memori RAM', val: '32 GB Dual-Channel DDR4/DDR5' },
    { label: 'DirectX', val: 'Version 12 Ultimate' },
    { label: 'Penyimpanan', val: '120 GB NVMe M.2 SSD' },
    { label: 'Koneksi Jaringan', val: 'Koneksi Internet Serat Optik Rendah Latensi' }
  ]
}
</script>

<template>
  <section id="specs" class="py-24 bg-[#080a0f] relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <div class="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          <Cpu class="w-4 h-4 animate-spin-slow" />
          <span>HARDWARE ARCHITECTURE // KEBUTUHAN PERANGKAT PC & PLATFORM</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          SPESIFIKASI SISTEM & <span class="text-cyan-400 font-chakra">CROSS-PLAY</span>
        </h2>
        <p class="text-slate-400 mt-3 text-base sm:text-lg font-rajdhani">
          Delta Force dirancang dengan optimasi mendalam untuk berjalan mulus dari kartu grafis mainstream hingga rig kompetitif 240Hz.
        </p>
      </div>

      <!-- Cross-Platform Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
        <div 
          v-for="(p, pi) in platforms" 
          :key="pi"
          class="p-4 bg-slate-900/60 border border-slate-800 rounded clip-tactical hover:border-cyan-500/50 transition group flex flex-col justify-between"
        >
          <div>
            <component :is="p.icon" class="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition" />
            <div class="text-sm font-bold text-white font-chakra leading-tight mb-1">{{ p.name }}</div>
            <div class="text-[11px] text-slate-400 font-mono">{{ p.desc }}</div>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-amber-400">
            {{ p.tag }}
          </div>
        </div>
      </div>

      <!-- Spec Comparison Box -->
      <div class="bg-slate-900/40 border border-slate-800 clip-tactical p-6 sm:p-10 shadow-2xl">
        <!-- Switcher Buttons -->
        <div class="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-6 mb-6">
          <div class="flex items-center space-x-3">
            <button 
              @click="sound.playClick(); specTier = 'minimum'"
              :class="[
                'px-5 py-2.5 font-chakra font-bold text-xs uppercase tracking-wider rounded border transition',
                specTier === 'minimum' ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'
              ]"
            >
              SPESIFIKASI MINIMUM (1080P 60FPS)
            </button>
            <button 
              @click="sound.playClick(); specTier = 'recommended'"
              :class="[
                'px-5 py-2.5 font-chakra font-bold text-xs uppercase tracking-wider rounded border transition',
                specTier === 'recommended' ? 'bg-amber-500 text-black border-amber-400 font-bold' : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white'
              ]"
            >
              SPESIFIKASI REKOMENDASI (1440P / 144+ FPS)
            </button>
          </div>

          <div class="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/40 px-3 py-1.5 rounded">
            <ShieldCheck class="w-4 h-4 mr-1 text-emerald-400" />
            <span>PROTEKSI: ACE ANTI-CHEAT SERVER-LEVEL ENCRYPTION</span>
          </div>
        </div>

        <!-- Spec Table -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="(item, sidx) in specs[specTier]" 
            :key="sidx"
            class="flex items-start justify-between p-3.5 bg-black/50 border border-slate-800/80 rounded"
          >
            <span class="text-xs font-mono text-slate-400 uppercase tracking-wider">{{ item.label }}:</span>
            <span class="text-xs sm:text-sm font-semibold text-white font-mono text-right max-w-[60%]">{{ item.val }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { sound } from '../utils/audio'
import { 
  ChevronUp, 
  ShieldCheck, 
  Globe, 
  ExternalLink,
  Flame,
  Radio
} from 'lucide-vue-next'

const scrollToTop = () => {
  sound.playClick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-[#050609] border-t border-cyan-500/20 text-slate-400 font-['Rajdhani'] relative">
    <!-- Top Classification Stripe -->
    <div class="border-b border-white/5 bg-black/60 py-2 px-6 flex items-center justify-between font-mono text-[11px] text-slate-500">
      <div class="flex items-center space-x-2">
        <span class="w-2 h-2 bg-amber-400 rounded-full animate-ping mr-1"></span>
        <span class="text-amber-400 font-bold">CLASSIFICATION: RESTRICTED // GLOBAL TACTICAL DIRECTIVE</span>
      </div>
      <div class="hidden sm:block text-slate-600">
        SECURITY PROTOCOL DF-7729 // ALL RIGHTS RESERVED
      </div>
    </div>

    <!-- Main Footer Body -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <!-- Brand Column -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-cyan-950 border border-cyan-500 flex items-center justify-center clip-tactical shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <svg class="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 2 22 22 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
                <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div>
              <span class="text-2xl font-black tracking-widest text-white uppercase font-['Chakra_Petch']">
                DELTA<span class="text-cyan-400">FORCE</span>
              </span>
              <p class="text-[10px] tracking-widest text-slate-500 font-mono -mt-1">
                NEXT-GEN MILITARY TACTICAL SHOOTER
              </p>
            </div>
          </div>

          <p class="text-slate-400 text-sm max-w-sm leading-relaxed">
            Delta Force adalah game tembak-menembak taktis multi-matra gratis generasi terbaru yang menggabungkan pertempuran darat, laut, dan udara dalam skala perang masif serta mode ekstraksi menegangkan.
          </p>

          <!-- Studio Badges -->
          <div class="flex items-center space-x-4 pt-2 text-xs font-mono text-slate-400">
            <span class="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">
              UNREAL ENGINE 5
            </span>
            <span class="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">
              TEAM JADE / TiMi
            </span>
            <span class="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">
              LEVEL INFINITE
            </span>
          </div>
        </div>

        <!-- Quick Nav 1 -->
        <div>
          <h4 class="text-sm font-bold text-white font-['Chakra_Petch'] uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
            MODE & GAMEPLAY
          </h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#modes" class="hover:text-cyan-400 transition">Havoc Warfare (32v32)</a></li>
            <li><a href="#modes" class="hover:text-cyan-400 transition">Hazard Operations (Ekstraksi)</a></li>
            <li><a href="#modes" class="hover:text-cyan-400 transition">Black Hawk Down Campaign</a></li>
            <li><a href="#operators" class="hover:text-cyan-400 transition">Roster Operator Elit</a></li>
            <li><a href="#gunsmith" class="hover:text-cyan-400 transition">Gunsmith & Custom Weapon</a></li>
          </ul>
        </div>

        <!-- Quick Nav 2 -->
        <div>
          <h4 class="text-sm font-bold text-white font-['Chakra_Petch'] uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
            INTEL & RECON
          </h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#recon" class="hover:text-cyan-400 transition">Feed Satelit Recon Acak</a></li>
            <li><a href="#intel" class="hover:text-cyan-400 transition">Catatan Rilis Patch</a></li>
            <li><a href="#intel" class="hover:text-cyan-400 transition">Kejuaraan Global Esport</a></li>
            <li><a href="#specs" class="hover:text-cyan-400 transition">Kebutuhan Spesifikasi PC</a></li>
            <li><a href="#specs" class="hover:text-cyan-400 transition">Anti-Cheat System & Security</a></li>
          </ul>
        </div>

        <!-- Community & Socials -->
        <div>
          <h4 class="text-sm font-bold text-white font-['Chakra_Petch'] uppercase tracking-wider mb-4 border-l-2 border-purple-400 pl-2">
            KOMUNITAS RESMI
          </h4>
          <div class="space-y-2 text-sm">
            <a href="https://discord.com" target="_blank" class="flex items-center hover:text-cyan-400 transition group">
              <span>Discord Markas Delta Force</span>
              <ExternalLink class="w-3.5 h-3.5 ml-1 opacity-60 group-hover:opacity-100" />
            </a>
            <a href="https://youtube.com" target="_blank" class="flex items-center hover:text-cyan-400 transition group">
              <span>YouTube Channel Resmi</span>
              <ExternalLink class="w-3.5 h-3.5 ml-1 opacity-60 group-hover:opacity-100" />
            </a>
            <a href="https://twitter.com" target="_blank" class="flex items-center hover:text-cyan-400 transition group">
              <span>Twitter / X (@DeltaForceGame)</span>
              <ExternalLink class="w-3.5 h-3.5 ml-1 opacity-60 group-hover:opacity-100" />
            </a>
            <a href="https://reddit.com" target="_blank" class="flex items-center hover:text-cyan-400 transition group">
              <span>Reddit r/DeltaForceGame</span>
              <ExternalLink class="w-3.5 h-3.5 ml-1 opacity-60 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <div>
          © 2026 DELTA FORCE // TiMi Studio Group & Team Jade. Dilindungi hak cipta.
        </div>
        
        <!-- Back to Top Button -->
        <button 
          @click="scrollToTop" 
          class="flex items-center space-x-2 text-cyan-400 hover:text-white px-3 py-1.5 rounded border border-slate-800 bg-slate-900/60 transition"
        >
          <span>KEMBALI KE ATAS</span>
          <ChevronUp class="w-4 h-4" />
        </button>
      </div>
    </div>
  </footer>
</template>

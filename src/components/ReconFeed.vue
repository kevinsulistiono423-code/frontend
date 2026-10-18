<script setup>
import { ref } from 'vue'
import { sound } from '../utils/audio'
import { tacticalImageIds, getLiveRandomImage } from '../utils/images'
import { 
  Radio, 
  RefreshCw, 
  Maximize2, 
  Crosshair, 
  Eye, 
  MapPin, 
  Layers, 
  Compass,
  Camera,
  Activity
} from 'lucide-vue-next'

// Initial randomized surveillance cards
const generateRandomSurveillanceItems = () => {
  const sectors = ['SECTOR-01 OLYMPUS', 'SECTOR-02 CRACKED', 'SECTOR-03 AHSARAH', 'SECTOR-04 TRENCH', 'SECTOR-05 BLACK-SITE', 'SECTOR-06 DOCKYARD']
  const threats = ['THREAT: HIGH', 'THREAT: EXTREME', 'EXTRACTION SECURED', 'HOSTILE SQUAD', 'AIR PATROL', 'RECON ACTIVE']
  const coordinates = ['33°18\'44"N 44°21\'58"E', '35°41\'12"N 51°24\'55"E', '31°31\'00"N 35°00\'00"E', '34°02\'11"N 71°35\'00"E', '36°11\'00"N 43°58\'00"E', '32°53\'00"N 13°11\'00"E']

  return tacticalImageIds.slice(0, 6).map((id, index) => {
    const randomSig = Math.floor(Math.random() * 999999)
    return {
      id: index + 1,
      sector: sectors[index % sectors.length],
      threat: threats[index % threats.length],
      coord: coordinates[index % coordinates.length],
      elevation: `${Math.floor(Math.random() * 800 + 120)}m`,
      imageUrl: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=600&q=80&sig=${randomSig}`,
      timestamp: `UTC ${new Date().toISOString().substring(11, 19)}`,
      mode: ['INFRARED', 'OPTICAL', 'NIGHT-VISION', 'DRONE-HUD'][index % 4]
    }
  })
}

const reconItems = ref(generateRandomSurveillanceItems())
const activeFilter = ref('ALL')
const isScanning = ref(false)
const visionMode = ref('standard') // 'standard', 'nightvision', 'thermal', 'cyber'

// Re-roll all random recon images dynamically
const refreshRandomRecon = () => {
  sound.playRadar()
  isScanning.value = true
  setTimeout(() => {
    // Generate new set with randomized order and seeds
    const shuffled = [...tacticalImageIds].sort(() => 0.5 - Math.random())
    const sectors = ['SECTOR-07 VORTEX', 'SECTOR-08 QUARRY', 'SECTOR-09 BUNKER', 'SECTOR-10 DELTA-VALLEY', 'SECTOR-11 RED-DESERT', 'SECTOR-12 CROSSROAD']
    const threats = ['THREAT: CRITICAL', 'EXTRACTION READY', 'SNIPER NEST', 'CONVOY DETECTED', 'RADAR JAMMED', 'UAV ACTIVE']

    reconItems.value = shuffled.slice(0, 6).map((id, index) => {
      const randomSig = Math.floor(Math.random() * 999999)
      return {
        id: index + 1,
        sector: sectors[index % sectors.length],
        threat: threats[index % threats.length],
        coord: `${Math.floor(Math.random() * 60 + 10)}°${Math.floor(Math.random() * 60)}'N ${Math.floor(Math.random() * 60 + 10)}°${Math.floor(Math.random() * 60)}'E`,
        elevation: `${Math.floor(Math.random() * 900 + 100)}m`,
        imageUrl: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=600&q=80&sig=${randomSig}`,
        timestamp: `UTC ${new Date().toISOString().substring(11, 19)}`,
        mode: ['INFRARED', 'OPTICAL', 'NIGHT-VISION', 'DRONE-HUD'][index % 4]
      }
    })
    isScanning.value = false
  }, 400)
}

// Fullscreen image preview modal
const selectedImage = ref(null)
const openPreview = (item) => {
  sound.playClick()
  selectedImage.value = item
}
const closePreview = () => {
  selectedImage.value = null
}
</script>

<template>
  <section id="recon" class="py-24 bg-[#0a0d14] relative border-t border-b border-cyan-500/20 overflow-hidden">
    <!-- Background Tactical Elements -->
    <div class="absolute inset-0 tactical-grid opacity-40 pointer-events-none"></div>
    <div class="absolute -right-40 top-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -left-40 bottom-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div class="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2">
            <Radio class="w-4 h-4 animate-pulse" />
            <span>SAT-LINK RECONNAISSANCE // LIVE SATELLITE FEED</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            FEED RECON TAKTIS <span class="text-cyan-400 font-['Chakra_Petch']">ACAK GLOBAL</span>
          </h2>
          <p class="text-slate-400 max-w-2xl mt-2 text-base font-['Rajdhani']">
            Pantau citra satelit dan data intelijen acak dari zona konflik aktif Delta Force di seluruh belahan dunia secara real-time.
          </p>
        </div>

        <!-- Vision Mode Selector & Randomizer Button -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Vision filter buttons -->
          <div class="flex items-center bg-black/60 p-1 rounded border border-slate-800 text-xs font-mono">
            <button 
              @click="sound.playClick(); visionMode = 'standard'"
              :class="['px-3 py-1.5 rounded transition', visionMode === 'standard' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white']">
              STANDARD
            </button>
            <button 
              @click="sound.playClick(); visionMode = 'nightvision'"
              :class="['px-3 py-1.5 rounded transition', visionMode === 'nightvision' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-white']">
              NVG (NIGHT)
            </button>
            <button 
              @click="sound.playClick(); visionMode = 'thermal'"
              :class="['px-3 py-1.5 rounded transition', visionMode === 'thermal' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white']">
              THERMAL
            </button>
          </div>

          <!-- Randomize Feed Button -->
          <button 
            @click="refreshRandomRecon" 
            :disabled="isScanning"
            class="px-5 py-2.5 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-400 text-cyan-300 hover:text-white font-['Chakra_Petch'] font-bold text-xs uppercase clip-tactical flex items-center transition shadow-[0_0_15px_rgba(0,240,255,0.2)] disabled:opacity-50">
            <RefreshCw :class="['w-4 h-4 mr-2', isScanning ? 'animate-spin text-cyan-400' : '']" />
            <span>{{ isScanning ? 'MEMINDAI SATELIT...' : 'AMBIL GAMBAR RECON ACAK' }}</span>
          </button>
        </div>
      </div>

      <!-- Feed Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in reconItems" 
          :key="item.id"
          class="group bg-slate-900/70 border border-slate-800 hover:border-cyan-500/60 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 relative tactical-border shadow-lg"
        >
          <!-- Top HUD Data Strip -->
          <div class="bg-black/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span class="flex items-center text-cyan-400 font-semibold">
              <Crosshair class="w-3.5 h-3.5 mr-1" /> {{ item.sector }}
            </span>
            <span :class="['font-semibold px-1.5 py-0.5 rounded text-[10px]', item.threat.includes('HIGH') || item.threat.includes('CRITICAL') || item.threat.includes('EXTREME') ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40']">
              {{ item.threat }}
            </span>
          </div>

          <!-- Image Container with Vision Mode Effects -->
          <div class="relative h-60 overflow-hidden bg-black cursor-pointer" @click="openPreview(item)">
            <img 
              :src="item.imageUrl" 
              :alt="item.sector" 
              :class="[
                'w-full h-full object-cover transition-all duration-500 group-hover:scale-105',
                visionMode === 'nightvision' ? 'filter hue-rotate-90 saturate-200 contrast-125 brightness-90' : '',
                visionMode === 'thermal' ? 'filter invert hue-rotate-180 contrast-150' : '',
                visionMode === 'standard' ? 'filter contrast-110 brightness-95' : ''
              ]"
              loading="lazy"
            />
            
            <!-- Scanline and Glitch Lines Overlay -->
            <div class="absolute inset-0 scanline opacity-40 pointer-events-none"></div>

            <!-- Drone Crosshairs & Telemetry Overlay -->
            <div class="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none opacity-80 group-hover:opacity-100 transition">
              <div class="flex justify-between items-start text-[10px] font-mono text-cyan-300 bg-black/40 px-2 py-0.5 rounded max-w-fit">
                <span>MODE: {{ item.mode }}</span>
              </div>
              <div class="flex justify-between items-end text-[10px] font-mono text-white bg-black/60 px-2 py-1 rounded">
                <span class="flex items-center text-slate-300"><MapPin class="w-3 h-3 mr-1 text-cyan-400" /> {{ item.coord }}</span>
                <span class="text-amber-400 font-semibold">ALT: {{ item.elevation }}</span>
              </div>
            </div>

            <!-- Hover Preview Trigger Icon -->
            <div class="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
              <div class="p-3 bg-cyan-400 text-black rounded-full font-bold shadow-lg transform scale-90 group-hover:scale-100 transition">
                <Maximize2 class="w-5 h-5" />
              </div>
            </div>
          </div>

          <!-- Card Bottom Info -->
          <div class="p-4 bg-slate-950/60 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-900">
            <span class="flex items-center text-slate-400">
              <Activity class="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> {{ item.timestamp }}
            </span>
            <button 
              @click.stop="openPreview(item)" 
              class="text-cyan-400 hover:text-white flex items-center transition font-semibold">
              INSPEKSI INTEL <Eye class="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div 
      v-if="selectedImage" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      @click="closePreview"
    >
      <div 
        class="bg-[#0b0e14] border-2 border-cyan-400 max-w-4xl w-full clip-tactical overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.3)] relative"
        @click.stop
      >
        <!-- Modal Top Bar -->
        <div class="bg-black/90 px-6 py-3 border-b border-cyan-500/30 flex items-center justify-between font-mono text-xs">
          <div class="flex items-center space-x-2 text-cyan-400 font-bold">
            <Crosshair class="w-4 h-4" />
            <span>SATELLITE HIGH-RES INTEL // {{ selectedImage.sector }}</span>
          </div>
          <button 
            @click="closePreview" 
            class="text-slate-400 hover:text-white font-bold text-sm px-2 py-1 bg-slate-800 rounded">
            ✕ TUTUP
          </button>
        </div>

        <!-- Full Image -->
        <div class="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
          <img 
            :src="selectedImage.imageUrl" 
            :alt="selectedImage.sector" 
            :class="[
              'w-full max-h-[70vh] object-contain',
              visionMode === 'nightvision' ? 'filter hue-rotate-90 saturate-200 contrast-125' : '',
              visionMode === 'thermal' ? 'filter invert hue-rotate-180 contrast-150' : ''
            ]"
          />
          <div class="absolute inset-0 scanline opacity-30 pointer-events-none"></div>
        </div>

        <!-- Telemetry Details Footer -->
        <div class="p-6 bg-slate-950 flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-t border-slate-800">
          <div>
            <div class="text-slate-400 text-[10px]">KOORDINAT TARGET:</div>
            <div class="text-white font-bold text-sm">{{ selectedImage.coord }}</div>
          </div>
          <div>
            <div class="text-slate-400 text-[10px]">STATUS ANCAMAN:</div>
            <div class="text-amber-400 font-bold text-sm">{{ selectedImage.threat }}</div>
          </div>
          <div>
            <div class="text-slate-400 text-[10px]">KETINGGIAN UAV:</div>
            <div class="text-cyan-400 font-bold text-sm">{{ selectedImage.elevation }}</div>
          </div>
          <div>
            <div class="text-slate-400 text-[10px]">WAKTU TANGKAPAN:</div>
            <div class="text-slate-300 font-bold text-sm">{{ selectedImage.timestamp }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

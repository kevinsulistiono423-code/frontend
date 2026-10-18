<script setup>
import { ref } from 'vue'
import { sound } from '../utils/audio'
import { operatorImages, tacticalImageIds } from '../utils/images'
import { 
  Crosshair, 
  Shield, 
  Zap, 
  HeartPulse, 
  Wrench, 
  Target, 
  RefreshCw, 
  Radio, 
  ChevronRight 
} from 'lucide-vue-next'

const operators = [
  {
    id: 'assault',
    callsign: 'D-WOLF',
    realName: 'Kai Silva',
    role: 'ASSAULT (PENYERANG)',
    roleDesc: 'Spesialis pertempuran jarak dekat dan penetrasi garis depan dengan mobilitas tinggi.',
    icon: Zap,
    image: operatorImages.assault,
    badgeColor: 'border-red-500 text-red-400 bg-red-950/30',
    stats: {
      firepower: 95,
      mobility: 90,
      utility: 65,
      defense: 70
    },
    tacticalGear: 'Exo-Skeletal Grappling Hook',
    ultimateAbility: 'Overload Sprint & Adrenaline Boost',
    passive: 'Tactical Slide Reload',
    quote: '"Kecepatan adalah baju zirah terbaik di medan tempur."'
  },
  {
    id: 'recon',
    callsign: 'LUNA',
    realName: 'Mai Xiaowen',
    role: 'RECON (PENGINTAI)',
    roleDesc: 'Ahli pelacakan intelijen, deteksi posisi musuh, dan eliminasi presisi jarak jauh.',
    icon: Target,
    image: operatorImages.recon,
    badgeColor: 'border-cyan-500 text-cyan-400 bg-cyan-950/30',
    stats: {
      firepower: 85,
      mobility: 80,
      utility: 95,
      defense: 55
    },
    tacticalGear: 'Micro-Recon Arrow (Tag Sensor)',
    ultimateAbility: 'Satellite EMP Orbit Strike',
    passive: 'Heartbeat Sensor Ping',
    quote: '"Tidak ada target yang bisa bersembunyi dari mataku."'
  },
  {
    id: 'support',
    callsign: 'STINGER',
    realName: 'Roy Smee',
    role: 'SUPPORT (MEDIK & LOGISTIK)',
    roleDesc: 'Menjaga keberlangsungan regu dengan drone medis nano dan tabir asap pelindung.',
    icon: HeartPulse,
    image: operatorImages.support,
    badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-950/30',
    stats: {
      firepower: 65,
      mobility: 70,
      utility: 98,
      defense: 80
    },
    tacticalGear: 'Nano-Mist Medical UAV',
    ultimateAbility: 'Combat Revive Beacon',
    passive: 'Squad Supply Crate Carrier',
    quote: '"Regu ini tidak akan jatuh selama aku masih berdiri."'
  },
  {
    id: 'engineer',
    callsign: 'SHEPHERD',
    realName: 'David Shepherd',
    role: 'ENGINEER (PERTAHANAN & ZIRAH)',
    roleDesc: 'Ahli peroboh kendaraan lapis baja dan benteng pertahanan pertahanan sonik.',
    icon: Wrench,
    image: operatorImages.engineer,
    badgeColor: 'border-amber-500 text-amber-400 bg-amber-950/30',
    stats: {
      firepower: 88,
      mobility: 60,
      utility: 82,
      defense: 95
    },
    tacticalGear: 'Sonic Paralysis Trap',
    ultimateAbility: 'Javelin Anti-Tank Missile',
    passive: 'Composite Armor Plating',
    quote: '"Baja atau beton, tidak ada benteng yang tak bisa kutembus."'
  }
]

const activeIndex = ref(0)
const activeOperator = ref(operators[0])

const selectOperator = (index) => {
  sound.playClick()
  activeIndex.value = index
  activeOperator.value = operators[index]
}

// Randomize active operator image dynamically
const shuffleOperatorImage = () => {
  sound.playRadar()
  const randomId = tacticalImageIds[Math.floor(Math.random() * tacticalImageIds.length)]
  const randomSig = Math.floor(Math.random() * 99999)
  activeOperator.value.image = `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=800&h=1000&q=80&sig=${randomSig}`
}
</script>

<template>
  <section id="operators" class="py-24 bg-[#080a0f] relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          <Crosshair class="w-4 h-4 animate-spin-slow" />
          <span>OPERATOR DATABASE // G.T.I. OPERATIONAL FORCES</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          ROSTER OPERATOR <span class="text-cyan-400 font-['Chakra_Petch']">SPESIALIS ELIT</span>
        </h2>
        <p class="text-slate-400 mt-3 text-base sm:text-lg font-['Rajdhani']">
          Setiap operator memiliki peran taktis unik, gadget futuristik, dan persenjataan khusus untuk mengamankan kemenangan regu.
        </p>
      </div>

      <!-- Class Selection Bar -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <button 
          v-for="(op, idx) in operators" 
          :key="op.id"
          @click="selectOperator(idx)"
          :class="[
            'p-4 text-left transition-all duration-300 clip-tactical relative border',
            activeIndex === idx 
              ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)]' 
              : 'bg-black/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
          ]"
        >
          <div class="flex items-center justify-between mb-2">
            <component :is="op.icon" :class="['w-5 h-5', activeIndex === idx ? 'text-cyan-400' : 'text-slate-500']" />
            <span class="text-[10px] font-mono text-slate-500">CLASS // 0{{ idx + 1 }}</span>
          </div>
          <div class="text-lg font-black font-['Chakra_Petch'] text-white tracking-wide">
            {{ op.callsign }}
          </div>
          <div class="text-xs font-mono text-cyan-400/80">
            {{ op.role.split(' ')[0] }}
          </div>
          <div v-if="activeIndex === idx" class="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"></div>
        </button>
      </div>

      <!-- Operator Detailed Showcase Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 border border-slate-800 p-6 sm:p-10 rounded-sm clip-tactical relative">
        <!-- Background HUD Watermark -->
        <div class="absolute right-10 bottom-10 font-mono text-8xl font-black text-slate-800/10 pointer-events-none select-none">
          {{ activeOperator.callsign }}
        </div>

        <!-- Left Column: Operator Image with Tactical Card Effect -->
        <div class="lg:col-span-5 relative">
          <div class="relative h-[440px] sm:h-[500px] rounded overflow-hidden border border-cyan-500/30 shadow-2xl tactical-border">
            <img 
              :src="activeOperator.image" 
              :alt="activeOperator.callsign" 
              class="w-full h-full object-cover object-top transition duration-700 filter brightness-95 contrast-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div class="absolute inset-0 scanline opacity-30 pointer-events-none"></div>

            <!-- Callsign Card Overlay -->
            <div class="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-md border border-slate-700 rounded clip-tactical">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono text-cyan-400">NAMA ASLI: {{ activeOperator.realName }}</span>
                  <h3 class="text-2xl font-black text-white font-['Chakra_Petch']">{{ activeOperator.callsign }}</h3>
                </div>
                <!-- Shuffle Operator Image Button -->
                <button 
                  @click="shuffleOperatorImage" 
                  title="Ganti visual foto operator secara acak"
                  class="p-2.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 rounded transition flex items-center text-xs font-mono"
                >
                  <RefreshCw class="w-3.5 h-3.5 mr-1" />
                  <span>ACAK FOTO</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Tactical Dossier & Combat Stats -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Role Badge -->
          <div class="flex items-center space-x-3">
            <span :class="['px-3 py-1 text-xs font-mono font-bold uppercase rounded border', activeOperator.badgeColor]">
              {{ activeOperator.role }}
            </span>
            <span class="text-xs font-mono text-slate-500">OPERATIONAL STATUS: COMBAT READY</span>
          </div>

          <!-- Description & Lore -->
          <div>
            <h3 class="text-3xl font-black text-white tracking-wide mb-2 font-['Chakra_Petch']">
              SPESIALISASI TEMPUR // {{ activeOperator.callsign }}
            </h3>
            <p class="text-slate-300 font-['Rajdhani'] text-lg leading-relaxed">
              {{ activeOperator.roleDesc }}
            </p>
            <p class="italic text-cyan-400 text-sm font-mono mt-2">
              {{ activeOperator.quote }}
            </p>
          </div>

          <!-- Combat Attributes / Stats Bars -->
          <div class="space-y-3 bg-black/40 p-4 border border-slate-800 rounded">
            <div class="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center">
              <Crosshair class="w-3.5 h-3.5 mr-1 text-cyan-400" /> INDEKS PERFORMA TEMPUR (COMBAT RATINGS)
            </div>

            <!-- Firepower -->
            <div>
              <div class="flex justify-between text-xs font-mono mb-1">
                <span class="text-slate-300">DAYA TEMBAK (FIREPOWER)</span>
                <span class="text-cyan-400 font-bold">{{ activeOperator.stats.firepower }}%</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full rounded-full transition-all duration-500" :style="{ width: `${activeOperator.stats.firepower}%` }"></div>
              </div>
            </div>

            <!-- Mobility -->
            <div>
              <div class="flex justify-between text-xs font-mono mb-1">
                <span class="text-slate-300">MOBILITAS & KECEPATAN (MOBILITY)</span>
                <span class="text-amber-400 font-bold">{{ activeOperator.stats.mobility }}%</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500" :style="{ width: `${activeOperator.stats.mobility}%` }"></div>
              </div>
            </div>

            <!-- Utility / Recon -->
            <div>
              <div class="flex justify-between text-xs font-mono mb-1">
                <span class="text-slate-300">UTILITAS TAKTIS (INTEL & SUPPORT)</span>
                <span class="text-emerald-400 font-bold">{{ activeOperator.stats.utility }}%</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-500 to-emerald-300 h-full rounded-full transition-all duration-500" :style="{ width: `${activeOperator.stats.utility}%` }"></div>
              </div>
            </div>

            <!-- Defense -->
            <div>
              <div class="flex justify-between text-xs font-mono mb-1">
                <span class="text-slate-300">KETAHANAN ZIRAH (DEFENSE)</span>
                <span class="text-purple-400 font-bold">{{ activeOperator.stats.defense }}%</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-purple-300 h-full rounded-full transition-all duration-500" :style="{ width: `${activeOperator.stats.defense}%` }"></div>
              </div>
            </div>
          </div>

          <!-- Tactical Loadout Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 bg-black/60 border border-slate-800 rounded">
              <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">TACTICAL GADGET</span>
              <span class="text-sm font-bold text-white font-['Chakra_Petch']">{{ activeOperator.tacticalGear }}</span>
            </div>
            <div class="p-3 bg-black/60 border border-slate-800 rounded">
              <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">ULTIMATE ABILITY</span>
              <span class="text-sm font-bold text-white font-['Chakra_Petch']">{{ activeOperator.ultimateAbility }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

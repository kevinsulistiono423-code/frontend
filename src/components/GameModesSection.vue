<script setup>
import { ref } from 'vue'
import { sound } from '../utils/audio'
import { modeImages, tacticalImageIds } from '../utils/images'
import { 
  Users, 
  ShieldAlert, 
  Compass, 
  Crosshair, 
  RefreshCw, 
  Flame, 
  Map, 
  Clock, 
  Award 
} from 'lucide-vue-next'

const modes = [
  {
    id: 'havoc',
    title: 'HAVOC WARFARE',
    subtitle: 'PERANG GRAND 32V32 SKALA PENUH',
    badge: '32 VS 32 COMBAT',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
    description: 'Pertempuran spektakuler multi-matra dengan 64 pemain secara serentak. Kendarai tank tempur utama, helikopter serbu siluman, perahu cepat bersenjata, dan kuasai titik-titik strategis dalam peta skala raksasa dengan kehancuran lingkungan dinamis.',
    image: modeImages.havoc,
    features: [
      { label: 'Kapasitas Pemain', val: '64 Pemain (32 vs 32)' },
      { label: 'Kendaraan Tempur', val: 'Tank, Helikopter, LAV, Boat' },
      { label: 'Objektif Tempur', val: 'Sektor Penaklukan & Garis Depan' },
      { label: 'Durasi Match', val: '25 - 35 Menit' }
    ],
    mapHighlights: ['Ascension Valley', 'Cracked City', 'Threshold Basin']
  },
  {
    id: 'hazard',
    title: 'HAZARD OPERATIONS',
    subtitle: 'EKSTRAKSI TAKTIS PVPVE BERISIKO TINGGI',
    badge: 'EXTRACTION SHOOTER',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    description: 'Bentuk regu 3 operator dan infiltrasi zona berbahaya Ahsarah. Hadapi pasukan militer bayaran AI dan tim pemain rival untuk mengamankan MandelBrick berharga tinggi, lalu bertahan hidup hingga zona ekstraksi terakhir tiba.',
    image: modeImages.hazard,
    features: [
      { label: 'Format Regu', val: 'Trio (3-Operator Squads)' },
      { label: 'Tipe Ancaman', val: 'PvPvE Hardcore Extraction' },
      { label: 'Taruhan Loot', val: 'Kehilangan Seluruh Perlengkapan Jika Gugur' },
      { label: 'Peluang Ekstraksi', val: 'Zona Helikopter & Pintu Bunker Bawah Tanah' }
    ],
    mapHighlights: ['Ahsarah Ruins', 'Zero Dam Complex', 'Space City Terminal']
  },
  {
    id: 'blackhawk',
    title: 'BLACK HAWK DOWN',
    subtitle: 'KAMPANYE SINEMATIK LEGENDARIS REMASTERED',
    badge: 'CINEMATIC CAMPAIGN',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
    description: 'Kisah militer paling ikonik dalam sejarah game taktis kembali hadir dengan grafis Unreal Engine 5. Rasakan ketegangan pertempuran Mogadishu 1993 bersama regu Delta Force dan US Army Rangers dengan rekonstruksi fotorealistik dan audio surround imersif.',
    image: modeImages.blackhawk,
    features: [
      { label: 'Mode Cerita', val: 'Solo & Co-Op Squad Campaign' },
      { label: 'Visual Engine', val: 'Unreal Engine 5 Fotorealistik' },
      { label: 'Otentisitas', val: 'Konsultan Taktis Veteran US Militer' },
      { label: 'Misi Ikonik', val: 'Operasi Gothic Serpent & Crash Site' }
    ],
    mapHighlights: ['Mogadishu City Center', 'Crash Site Super 6-4', 'Olympic Hotel']
  }
]

const currentModeIndex = ref(0)
const activeMode = ref(modes[0])

const selectMode = (idx) => {
  sound.playClick()
  currentModeIndex.value = idx
  activeMode.value = modes[idx]
}

const randomizeModeImage = () => {
  sound.playRadar()
  const randomId = tacticalImageIds[Math.floor(Math.random() * tacticalImageIds.length)]
  const randomSig = Math.floor(Math.random() * 99999)
  activeMode.value.image = `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=1200&h=700&q=80&sig=${randomSig}`
}
</script>

<template>
  <section id="modes" class="py-24 bg-[#0a0d14] relative border-t border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <div class="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          <Compass class="w-4 h-4 animate-spin-slow" />
          <span>COMBAT THEATERS // TIGA MODE PERMAINAN UTAMA</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          MEDAN TEMPUR <span class="text-amber-400 font-chakra">MULTI-DIMENSI</span>
        </h2>
        <p class="text-slate-400 mt-3 text-base sm:text-lg font-rajdhani">
          Dari peperangan kolosal 64 pemain hingga ekspedisi ekstraksi berisiko tinggi dan nostalgia kampanye Black Hawk Down legendaris.
        </p>
      </div>

      <!-- Mode Selector Tabs -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button 
          v-for="(m, idx) in modes" 
          :key="m.id"
          @click="selectMode(idx)"
          :class="[
            'px-6 py-3.5 font-chakra font-bold text-sm uppercase tracking-wider clip-tactical transition-all duration-300 border flex items-center',
            currentModeIndex === idx 
              ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]' 
              : 'bg-black/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
          ]"
        >
          <span class="font-mono text-xs mr-2 font-normal opacity-70">0{{ idx + 1 }}//</span>
          <span>{{ m.title }}</span>
        </button>
      </div>

      <!-- Mode Showcase Container -->
      <div class="bg-slate-900/40 border border-slate-800 clip-tactical overflow-hidden shadow-2xl relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <!-- Left: Big Visual with Randomizer -->
          <div class="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] overflow-hidden group">
            <img 
              :src="activeMode.image" 
              :alt="activeMode.title" 
              class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter brightness-90 contrast-115"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            <div class="absolute inset-0 scanline opacity-25 pointer-events-none"></div>

            <!-- Top Left Mode Badge -->
            <div class="absolute top-4 left-4">
              <span :class="['px-3 py-1 font-mono text-xs font-bold uppercase rounded border backdrop-blur-md', activeMode.badgeColor]">
                {{ activeMode.badge }}
              </span>
            </div>

            <!-- Bottom Left Image Randomizer -->
            <div class="absolute bottom-4 left-4">
              <button 
                @click="randomizeModeImage" 
                class="px-3.5 py-2 bg-black/80 hover:bg-black text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-mono rounded clip-tactical flex items-center transition"
              >
                <RefreshCw class="w-3.5 h-3.5 mr-1.5" />
                <span>ACAK GAMBAR MEDAN TEMPUR</span>
              </button>
            </div>
          </div>

          <!-- Right: Mode Dossier & Attributes -->
          <div class="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div class="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
                {{ activeMode.subtitle }}
              </div>
              <h3 class="text-3xl sm:text-4xl font-black text-white font-chakra mb-4">
                {{ activeMode.title }}
              </h3>
              <p class="text-slate-300 font-rajdhani text-base sm:text-lg leading-relaxed mb-6">
                {{ activeMode.description }}
              </p>

              <!-- Features Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div 
                  v-for="(f, i) in activeMode.features" 
                  :key="i"
                  class="p-3 bg-black/50 border border-slate-800 rounded text-xs font-mono"
                >
                  <div class="text-slate-400 text-[10px] uppercase">{{ f.label }}</div>
                  <div class="text-white font-bold text-sm mt-0.5">{{ f.val }}</div>
                </div>
              </div>

              <!-- Map Highlights -->
              <div>
                <span class="text-xs font-mono text-cyan-400 block mb-2 flex items-center">
                  <Map class="w-3.5 h-3.5 mr-1" /> PETA UTAMA TERSEDIA:
                </span>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(map, mi) in activeMode.mapHighlights" 
                    :key="mi"
                    class="px-3 py-1 bg-slate-800/80 text-slate-200 border border-slate-700 rounded text-xs font-mono">
                    {{ map }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Quick Action -->
            <div class="pt-4 border-t border-slate-800">
              <a 
                href="#hero" 
                class="inline-flex items-center text-sm font-bold text-cyan-400 hover:text-white font-chakra uppercase tracking-wider group">
                <span>GABUNG PERTEMPURAN SEKARANG</span>
                <span class="ml-2 transform group-hover:translate-x-1 transition">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

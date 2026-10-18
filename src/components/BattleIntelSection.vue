<script setup>
import { ref } from 'vue'
import { sound } from '../utils/audio'
import { tacticalImageIds } from '../utils/images'
import { 
  FileText, 
  Calendar, 
  Tag, 
  ArrowUpRight, 
  RefreshCw, 
  Radio, 
  Trophy, 
  Layers 
} from 'lucide-vue-next'

const categories = ['SEMUA', 'PATCH NOTES', 'TURNAMEN', 'PANDUAN TAKTIS', 'KOMUNITAS']
const selectedCategory = ref('SEMUA')

const initialArticles = [
  {
    id: 1,
    title: 'Catatan Rilis Patch 2.4: Optimalisasi MandelBrick & Balancing Sniper AWM',
    summary: 'Peningkatan stabilitas server Asia Tenggara, penyesuaian drop rate item legendaris di Ahsarah, dan perbaikan recoil control.',
    category: 'PATCH NOTES',
    date: '16 OKTOBER 2026',
    readTime: '4 Min Baca',
    image: `https://images.unsplash.com/photo-${tacticalImageIds[1]}?auto=format&fit=crop&w=600&h=400&q=80`
  },
  {
    id: 2,
    title: 'Kejuaraan Dunia Delta Force Global Invitational 2026 Diumumkan!',
    summary: 'Total hadiah $500,000 USD! 32 tim terbaik dari regional Asia, Eropa, dan Amerika akan bertarung di Grand Warfare 32v32.',
    category: 'TURNAMEN',
    date: '14 OKTOBER 2026',
    readTime: '6 Min Baca',
    image: `https://images.unsplash.com/photo-${tacticalImageIds[3]}?auto=format&fit=crop&w=600&h=400&q=80`
  },
  {
    id: 3,
    title: 'Panduan Ekstraksi Solo: Cara Menembus Ahsarah Tanpa Terdeteksi',
    summary: 'Rute patroli tersembunyi, timing ekstraksi helikopter malam hari, dan strategi penggunaan drone recon untuk pemain solo.',
    category: 'PANDUAN TAKTIS',
    date: '11 OKTOBER 2026',
    readTime: '8 Min Baca',
    image: `https://images.unsplash.com/photo-${tacticalImageIds[4]}?auto=format&fit=crop&w=600&h=400&q=80`
  },
  {
    id: 4,
    title: 'Sorotan Komunitas: Modifikasi Senjata Paling Mematikan Minggu Ini',
    summary: 'Koleksi loadout kustom kreasi komunitas dengan TTK (Time to Kill) tercepat di mode Havoc Warfare.',
    category: 'KOMUNITAS',
    date: '08 OKTOBER 2026',
    readTime: '3 Min Baca',
    image: `https://images.unsplash.com/photo-${tacticalImageIds[7]}?auto=format&fit=crop&w=600&h=400&q=80`
  }
]

const articles = ref(initialArticles)

const filterCategory = (cat) => {
  sound.playClick()
  selectedCategory.value = cat
}

// Re-roll random images for articles
const randomizeArticleImages = () => {
  sound.playRadar()
  const shuffled = [...tacticalImageIds].sort(() => 0.5 - Math.random())
  articles.value.forEach((a, i) => {
    const sig = Math.floor(Math.random() * 99999)
    a.image = `https://images.unsplash.com/photo-${shuffled[i % shuffled.length]}?auto=format&fit=crop&w=600&h=400&q=80&sig=${sig}`
  })
}
</script>

<template>
  <section id="intel" class="py-24 bg-[#0a0d14] relative border-t border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div class="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2">
            <Radio class="w-4 h-4 animate-pulse" />
            <span>FIELD DISPATCH // BERITA & INTEL MEDAN TEMPUR</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            INTEL & LAPORAN <span class="text-cyan-400 font-['Chakra_Petch']">TERBARU</span>
          </h2>
          <p class="text-slate-400 max-w-xl mt-2 text-base font-['Rajdhani']">
            Dapatkan pembaruan taktis langsung dari markas komando, pengumuman kejuaraan esport, dan tips bertahan hidup.
          </p>
        </div>

        <!-- Randomize Image Button -->
        <button 
          @click="randomizeArticleImages" 
          class="px-4 py-2.5 bg-black/60 hover:bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-300 rounded text-xs font-mono flex items-center transition max-w-fit"
        >
          <RefreshCw class="w-3.5 h-3.5 mr-2" />
          <span>ACAK GAMBAR BERITA</span>
        </button>
      </div>

      <!-- Categories Filter Tabs -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="filterCategory(cat)"
          :class="[
            'px-4 py-2 text-xs font-mono tracking-wider rounded border transition',
            selectedCategory === cat 
              ? 'bg-cyan-500 text-black font-bold border-cyan-400' 
              : 'bg-black/50 text-slate-400 border-slate-800 hover:text-white'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <article 
          v-for="art in (selectedCategory === 'SEMUA' ? articles : articles.filter(a => a.category === selectedCategory))" 
          :key="art.id"
          class="group bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
        >
          <div>
            <!-- Thumbnail with scanline -->
            <div class="relative h-48 overflow-hidden bg-black">
              <img 
                :src="art.image" 
                :alt="art.title" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90"
                loading="lazy"
              />
              <div class="absolute inset-0 scanline opacity-25 pointer-events-none"></div>
              <div class="absolute top-3 left-3 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                {{ art.category }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-5">
              <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span class="flex items-center"><Calendar class="w-3 h-3 mr-1" /> {{ art.date }}</span>
                <span>{{ art.readTime }}</span>
              </div>
              <h3 class="text-base font-bold text-white font-['Chakra_Petch'] group-hover:text-cyan-400 transition leading-snug mb-2 line-clamp-2">
                {{ art.title }}
              </h3>
              <p class="text-xs text-slate-400 font-['Rajdhani'] line-clamp-3 leading-relaxed">
                {{ art.summary }}
              </p>
            </div>
          </div>

          <!-- Footer Read Link -->
          <div class="px-5 pb-5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-white">
            <span>BACA LAPORAN LENGKAP</span>
            <ArrowUpRight class="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

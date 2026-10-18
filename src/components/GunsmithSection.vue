<script setup>
import { ref, computed } from 'vue'
import { sound } from '../utils/audio'
import { tacticalImageIds } from '../utils/images'
import { 
  Crosshair, 
  Settings, 
  Sliders, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  ChevronRight,
  Disc
} from 'lucide-vue-next'

const weapons = [
  {
    id: 'm4a1',
    name: 'M4A1-CARBINE',
    type: 'ASSAULT RIFLE',
    caliber: '5.56x45mm NATO',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&h=500&q=80',
    base: {
      damage: 72,
      fireRate: 80,
      accuracy: 75,
      range: 68,
      control: 70
    }
  },
  {
    id: 'awm',
    name: 'AWM PRECISION',
    type: 'SNIPER RIFLE',
    caliber: '.338 Lapua Magnum',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&h=500&q=80',
    base: {
      damage: 98,
      fireRate: 25,
      accuracy: 96,
      range: 95,
      control: 40
    }
  },
  {
    id: 'mp5',
    name: 'MP5-SD TACTICAL',
    type: 'SUBMACHINE GUN',
    caliber: '9x19mm Parabellum',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&h=500&q=80',
    base: {
      damage: 60,
      fireRate: 92,
      accuracy: 70,
      range: 48,
      control: 85
    }
  },
  {
    id: 'pkm',
    name: 'PKM HEAVY SUPPORT',
    type: 'LIGHT MACHINE GUN',
    caliber: '7.62x54mmR',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&h=500&q=80',
    base: {
      damage: 84,
      fireRate: 68,
      accuracy: 62,
      range: 78,
      control: 52
    }
  }
]

const activeWeaponIndex = ref(0)
const selectedWeapon = ref(weapons[0])

// Attachments state
const attachments = ref({
  optic: 'holographic', // 'iron', 'holographic', 'acog'
  muzzle: 'suppressor', // 'none', 'compensator', 'suppressor'
  magazine: 'extended' // 'standard', 'extended', 'drum'
})

const selectWeapon = (idx) => {
  sound.playClick()
  activeWeaponIndex.value = idx
  selectedWeapon.value = weapons[idx]
}

const setAttachment = (category, value) => {
  sound.playConfirm()
  attachments.value[category] = value
}

// Compute dynamic stats modified by attachments
const currentStats = computed(() => {
  const base = selectedWeapon.value.base
  let d = base.damage
  let r = base.range
  let a = base.accuracy
  let c = base.control
  let fr = base.fireRate

  // Optic effects
  if (attachments.value.optic === 'acog') {
    a += 12
    r += 10
    c -= 5
  } else if (attachments.value.optic === 'holographic') {
    a += 6
  }

  // Muzzle effects
  if (attachments.value.muzzle === 'suppressor') {
    c += 8
    r -= 4
    a += 4
  } else if (attachments.value.muzzle === 'compensator') {
    c += 15
    a += 2
  }

  // Magazine effects
  if (attachments.value.magazine === 'drum') {
    c -= 12
    fr -= 4
  } else if (attachments.value.magazine === 'extended') {
    c -= 5
  }

  return {
    damage: Math.min(100, Math.max(10, d)),
    fireRate: Math.min(100, Math.max(10, fr)),
    accuracy: Math.min(100, Math.max(10, a)),
    range: Math.min(100, Math.max(10, r)),
    control: Math.min(100, Math.max(10, c))
  }
})

// Shuffle weapon photo with random tactical image
const shuffleWeaponImage = () => {
  sound.playRadar()
  const randomId = tacticalImageIds[Math.floor(Math.random() * tacticalImageIds.length)]
  const randomSig = Math.floor(Math.random() * 99999)
  selectedWeapon.value.image = `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=800&h=500&q=80&sig=${randomSig}`
}
</script>

<template>
  <section id="gunsmith" class="py-24 bg-[#080a0f] relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <div class="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          <Sliders class="w-4 h-4 animate-spin-slow" />
          <span>GUNSMITH LABORATORY // MODIFIKASI SENJATA TANPA BATAS</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          ARSENAL & SISTEM <span class="text-cyan-400 font-['Chakra_Petch']">GUNSMITH</span>
        </h2>
        <p class="text-slate-400 mt-3 text-base sm:text-lg font-['Rajdhani']">
          Lebih dari 40 pilihan komponen modifikasi: laras, peredam, teleskop termal, hingga kaliber peluru untuk menyesuaikan gaya tempur Anda.
        </p>
      </div>

      <!-- Weapon Platform Selector -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <button 
          v-for="(w, idx) in weapons" 
          :key="w.id"
          @click="selectWeapon(idx)"
          :class="[
            'p-4 text-left border clip-tactical transition duration-200',
            activeWeaponIndex === idx 
              ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)] text-white' 
              : 'bg-black/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
          ]"
        >
          <div class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{{ w.type }}</div>
          <div class="text-lg font-black font-['Chakra_Petch']">{{ w.name }}</div>
          <div class="text-xs font-mono text-slate-500 mt-1">{{ w.caliber }}</div>
        </button>
      </div>

      <!-- Main Gunsmith Bench -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/50 border border-slate-800 p-6 sm:p-10 clip-tactical relative">
        <!-- Weapon Visual Showcase -->
        <div class="lg:col-span-7 relative">
          <div class="relative h-72 sm:h-96 rounded overflow-hidden border border-slate-800 bg-black flex items-center justify-center tactical-border">
            <img 
              :src="selectedWeapon.image" 
              :alt="selectedWeapon.name" 
              class="w-full h-full object-cover filter brightness-95 contrast-125"
            />
            <div class="absolute inset-0 scanline opacity-30 pointer-events-none"></div>

            <!-- Tactical Attachment Pins on Image -->
            <div class="absolute top-1/4 left-1/4 bg-cyan-500 text-black px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center shadow-lg animate-pulse">
              <Crosshair class="w-3 h-3 mr-1" /> OPTIC: {{ attachments.optic.toUpperCase() }}
            </div>
            <div class="absolute top-1/2 left-8 bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center shadow-lg">
              <ShieldCheck class="w-3 h-3 mr-1" /> MUZZLE: {{ attachments.muzzle.toUpperCase() }}
            </div>
            <div class="absolute bottom-1/4 right-1/4 bg-emerald-500 text-black px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center shadow-lg">
              <Disc class="w-3 h-3 mr-1" /> MAG: {{ attachments.magazine.toUpperCase() }}
            </div>

            <!-- Shuffle Random Image Button -->
            <div class="absolute bottom-4 right-4">
              <button 
                @click="shuffleWeaponImage" 
                class="px-3 py-1.5 bg-black/80 hover:bg-slate-900 border border-slate-700 text-cyan-300 hover:text-white rounded text-xs font-mono flex items-center transition"
              >
                <RefreshCw class="w-3.5 h-3.5 mr-1" />
                <span>ACAK FOTO SENJATA</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Gunsmith Customizer Controls & Live Stats -->
        <div class="lg:col-span-5 space-y-6">
          <div class="border-b border-slate-800 pb-4">
            <div class="text-xs font-mono text-cyan-400">BENCH // CALIBER {{ selectedWeapon.caliber }}</div>
            <h3 class="text-3xl font-black text-white font-['Chakra_Petch']">{{ selectedWeapon.name }}</h3>
          </div>

          <!-- Attachment Selectors -->
          <div class="space-y-4">
            <!-- 1. Optics -->
            <div>
              <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">1. OPTICAL SIGHT:</span>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  @click="setAttachment('optic', 'iron')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.optic === 'iron' ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  IRON SIGHT
                </button>
                <button 
                  @click="setAttachment('optic', 'holographic')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.optic === 'holographic' ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  HOLO RED-DOT
                </button>
                <button 
                  @click="setAttachment('optic', 'acog')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.optic === 'acog' ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  4X ACOG SCOPE
                </button>
              </div>
            </div>

            <!-- 2. Muzzle -->
            <div>
              <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">2. MUZZLE DEVICE:</span>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  @click="setAttachment('muzzle', 'none')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.muzzle === 'none' ? 'bg-amber-500 text-black font-bold border-amber-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  STANDARD
                </button>
                <button 
                  @click="setAttachment('muzzle', 'suppressor')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.muzzle === 'suppressor' ? 'bg-amber-500 text-black font-bold border-amber-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  SUPPRESSOR
                </button>
                <button 
                  @click="setAttachment('muzzle', 'compensator')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.muzzle === 'compensator' ? 'bg-amber-500 text-black font-bold border-amber-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  COMPENSATOR
                </button>
              </div>
            </div>

            <!-- 3. Magazine -->
            <div>
              <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">3. MAGAZINE TYPE:</span>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  @click="setAttachment('magazine', 'standard')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.magazine === 'standard' ? 'bg-emerald-500 text-black font-bold border-emerald-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  STANDARD 30R
                </button>
                <button 
                  @click="setAttachment('magazine', 'extended')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.magazine === 'extended' ? 'bg-emerald-500 text-black font-bold border-emerald-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  EXTENDED 45R
                </button>
                <button 
                  @click="setAttachment('magazine', 'drum')"
                  :class="['px-2.5 py-1.5 text-xs font-mono rounded border transition text-center', attachments.magazine === 'drum' ? 'bg-emerald-500 text-black font-bold border-emerald-400' : 'bg-black/40 text-slate-300 border-slate-800 hover:border-slate-700']">
                  DRUM MAG 60R
                </button>
              </div>
            </div>
          </div>

          <!-- Live Dynamic Stats HUD -->
          <div class="bg-black/60 p-4 border border-slate-800 rounded space-y-2.5">
            <div class="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex justify-between">
              <span>STATISTIK SENJATA DINAMIS</span>
              <span>SYNCHRONIZED</span>
            </div>

            <!-- Damage -->
            <div>
              <div class="flex justify-between text-xs font-mono">
                <span class="text-slate-400">DAMAGE:</span>
                <span class="text-white font-bold">{{ currentStats.damage }}</span>
              </div>
              <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div class="bg-red-400 h-full transition-all duration-300" :style="{ width: `${currentStats.damage}%` }"></div>
              </div>
            </div>

            <!-- Accuracy -->
            <div>
              <div class="flex justify-between text-xs font-mono">
                <span class="text-slate-400">ACCURACY:</span>
                <span class="text-cyan-400 font-bold">{{ currentStats.accuracy }}</span>
              </div>
              <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div class="bg-cyan-400 h-full transition-all duration-300" :style="{ width: `${currentStats.accuracy}%` }"></div>
              </div>
            </div>

            <!-- Range -->
            <div>
              <div class="flex justify-between text-xs font-mono">
                <span class="text-slate-400">RANGE:</span>
                <span class="text-amber-400 font-bold">{{ currentStats.range }}</span>
              </div>
              <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div class="bg-amber-400 h-full transition-all duration-300" :style="{ width: `${currentStats.range}%` }"></div>
              </div>
            </div>

            <!-- Recoil Control -->
            <div>
              <div class="flex justify-between text-xs font-mono">
                <span class="text-slate-400">RECOIL CONTROL:</span>
                <span class="text-emerald-400 font-bold">{{ currentStats.control }}</span>
              </div>
              <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div class="bg-emerald-400 h-full transition-all duration-300" :style="{ width: `${currentStats.control}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

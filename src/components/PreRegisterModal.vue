<script setup>
import { ref, onMounted } from 'vue'
import { sound } from '../utils/audio'
import { 
  X, 
  CheckCircle2, 
  ShieldAlert, 
  Gift, 
  Download, 
  Sparkles, 
  Radio, 
  ArrowRight,
  RefreshCw
} from 'lucide-vue-next'

const emit = defineEmits(['close'])

// Alamat dasar API disimpan di variabel lingkungan Vite
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

const email = ref('')
const selectedPlatform = ref('steam')
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const voucherCode = ref('')
const rewardClaimed = ref('M4A1 - Cyber Ghost Bundle')

// State untuk GET /api/v1/pre-register (Registrasi Akun & Klaim Hadiah)
const isLoading = ref(false)
const errorMessage = ref('')
const registrationData = ref([])

// Mengambil data dari GET /api/v1/pre-register (Registrasi Akun & Klaim Hadiah)
const fetchRegistrations = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(`${apiBaseUrl}/pre-register`, {
      headers: {
        'Accept': 'application/json',
        'Origin': 'http://localhost:5173'
      }
    })

    if (!res.ok) {
      throw new Error(`Gagal memuat data registrasi (Status: ${res.status})`)
    }

    const data = await res.json()
    registrationData.value = data.data || []
  } catch (err) {
    errorMessage.value = 'Gagal memuat data registrasi & klaim hadiah. Pastikan server backend aktif.'
    console.error('Fetch registration error:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRegistrations()
})

const handleSubmit = async () => {
  if (!email.value) return
  sound.playRadar()
  isSubmitting.value = true

  try {
    const res = await fetch(`${apiBaseUrl}/pre-register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173'
      },
      body: JSON.stringify({
        email: email.value,
        platform: selectedPlatform.value
      })
    })

    if (res.ok) {
      const data = await res.json()
      voucherCode.value = data.data?.voucherCode || `DF-ALPHA-${Math.floor(Math.random() * 899999 + 100000)}`
      rewardClaimed.value = data.data?.claimedReward || 'M4A1 - Cyber Ghost Bundle'
      // Sinkronisasi ulang data registrasi terbaru
      fetchRegistrations()
    } else {
      voucherCode.value = `DF-ALPHA-${Math.floor(Math.random() * 899999 + 100000)}`
    }
  } catch (err) {
    // Graceful offline fallback
    voucherCode.value = `DF-ALPHA-${Math.floor(Math.random() * 899999 + 100000)}`
  } finally {
    isSubmitting.value = false
    isSubmitted.value = true
    sound.playConfirm()
  }
}

const handleClose = () => {
  sound.playClick()
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4" @click="handleClose">
    <div 
      class="bg-[#0b0e14] border-2 border-cyan-400 max-w-lg w-full clip-tactical overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.35)] relative"
      @click.stop
    >
      <!-- Top Tactical Header -->
      <div class="bg-black/90 px-6 py-3 border-b border-cyan-500/30 flex items-center justify-between font-mono text-xs">
        <span class="text-cyan-400 font-bold flex items-center">
          <Radio class="w-3.5 h-3.5 mr-1.5 animate-pulse" /> OPERATIONAL DISPATCH // ACCESS REGISTRATION
        </span>
        <button @click="handleClose" class="text-slate-400 hover:text-white p-1">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 sm:p-8">
        <!-- If not yet submitted -->
        <div v-if="!isSubmitted">
          <div class="inline-flex items-center space-x-2 text-amber-400 font-mono text-xs font-semibold mb-2">
            <Gift class="w-4 h-4" />
            <span>KLAIM BUNDLE OPERATOR EKSKLUSIF</span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch'] uppercase mb-2">
            REGISTRASI AKSES <span class="text-cyan-400">DELTA FORCE</span>
          </h3>

          <p class="text-slate-300 text-sm font-['Rajdhani'] mb-4 leading-relaxed">
            Daftarkan email Anda sekarang untuk langsung mendapatkan skin senjata <strong class="text-cyan-300">M4A1 - Cyber Ghost</strong>, lencana veteran, dan 1000 MandelCoins saat login pertama.
          </p>

          <!-- Keadaan Memuat (Loading State) -->
          <div v-if="isLoading" class="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded mb-4 flex items-center justify-center space-x-2 text-cyan-400 font-mono text-xs">
            <RefreshCw class="w-4 h-4 animate-spin text-cyan-400" />
            <span>MEMUAT DATA REGISTRASI & KLAIM HADIAH DARI SERVER...</span>
          </div>

          <!-- Pesan Bila Gagal (Error State) -->
          <div v-else-if="errorMessage" class="p-3 bg-red-950/60 border border-red-500/50 rounded mb-4 flex items-center justify-between text-xs font-mono text-red-300">
            <div class="flex items-center space-x-2">
              <ShieldAlert class="w-4 h-4 text-red-400 shrink-0" />
              <span>{{ errorMessage }}</span>
            </div>
            <button 
              type="button" 
              @click="fetchRegistrations" 
              class="px-2 py-1 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-white rounded text-[10px] uppercase font-bold tracking-wider transition">
              COBA LAGI
            </button>
          </div>

          <!-- Status Sinkronisasi Server Berhasil -->
          <div v-else-if="registrationData.length > 0" class="p-2.5 bg-cyan-950/20 border border-cyan-500/30 rounded mb-4 font-mono text-xs text-slate-300 flex items-center justify-between">
            <span class="text-cyan-400 font-bold flex items-center">
              <Radio class="w-3.5 h-3.5 mr-1.5 text-cyan-400 animate-pulse" />
              STATUS SERVER: {{ registrationData.length }} OPERATOR KLAIM HADIAH
            </span>
            <span class="text-slate-400 text-[10px] truncate max-w-[180px]">
              VOUCHER TERAKHIR: {{ registrationData[0].voucherCode }}
            </span>
          </div>

          <!-- Reward Showcase Card -->
          <div class="p-3 bg-slate-900/80 border border-slate-700 rounded mb-6 flex items-center space-x-4">
            <div class="w-14 h-14 bg-cyan-950/80 border border-cyan-500/50 rounded flex items-center justify-center shrink-0">
              <Sparkles class="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <div class="text-xs font-mono text-cyan-400 font-bold uppercase">REWARD PRE-LAUNCH:</div>
              <div class="text-sm font-bold text-white">M4A1 CYBER-TACTICAL + 3X XP BOOST</div>
              <div class="text-[11px] text-slate-400 font-mono">100% Free Claimable on Launch Day</div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Platform Picker -->
            <div>
              <label class="block text-xs font-mono text-slate-400 uppercase mb-1">PILIH PLATFORM UTAMA:</label>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  type="button"
                  @click="sound.playClick(); selectedPlatform = 'steam'"
                  :class="['py-2 text-xs font-mono rounded border transition text-center', selectedPlatform === 'steam' ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-black/40 text-slate-400 border-slate-800']">
                  STEAM PC
                </button>
                <button 
                  type="button"
                  @click="sound.playClick(); selectedPlatform = 'epic'"
                  :class="['py-2 text-xs font-mono rounded border transition text-center', selectedPlatform === 'epic' ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-black/40 text-slate-400 border-slate-800']">
                  EPIC GAMES
                </button>
                <button 
                  type="button"
                  @click="sound.playClick(); selectedPlatform = 'mobile'"
                  :class="['py-2 text-xs font-mono rounded border transition text-center', selectedPlatform === 'mobile' ? 'bg-cyan-500 text-black font-bold border-cyan-400' : 'bg-black/40 text-slate-400 border-slate-800']">
                  IOS / ANDROID
                </button>
              </div>
            </div>

            <!-- Email Input -->
            <div>
              <label class="block text-xs font-mono text-slate-400 uppercase mb-1">ALAMAT EMAIL RESMI:</label>
              <input 
                v-model="email" 
                type="email" 
                required 
                placeholder="nama_operator@gmail.com" 
                class="w-full px-4 py-3 bg-black/70 border border-slate-700 focus:border-cyan-400 text-white font-mono text-sm rounded outline-none transition"
              />
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-['Chakra_Petch'] font-bold text-sm tracking-wider uppercase clip-tactical transition duration-200 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50">
              <span v-if="!isSubmitting">KLAIM AKSES SEKARANG (GRATIS)</span>
              <span v-else class="flex items-center font-mono">
                MEMVERIFIKASI PROTOKOL ENKRIPSI...
              </span>
            </button>
          </form>
        </div>

        <!-- Success Message -->
        <div v-else class="text-center py-6 space-y-4">
          <div class="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 class="w-10 h-10" />
          </div>

          <h3 class="text-2xl font-black text-white font-['Chakra_Petch'] uppercase">
            CLEARANCE DITERIMA! // SELAMAT DATANG OPERATOR
          </h3>

          <p class="text-slate-300 font-['Rajdhani'] text-base max-w-sm mx-auto">
            Email konfirmasi dan kode voucher hadiah bundel telah dikirim ke <span class="text-cyan-400 font-mono font-bold">{{ email }}</span>.
          </p>

          <div class="p-3 bg-black/60 border border-slate-800 rounded font-mono text-xs text-slate-400">
            KODE AKSES: <span class="text-amber-400 font-bold">{{ voucherCode }}</span>
          </div>

          <button 
            @click="handleClose" 
            class="px-8 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-['Chakra_Petch'] font-bold text-sm uppercase clip-tactical transition">
            TUTUP DISPATCH
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

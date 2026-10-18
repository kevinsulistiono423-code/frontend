<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  Filter, 
  Radio, 
  Terminal, 
  Database, 
  AlertTriangle,
  Gift,
  ExternalLink
} from 'lucide-vue-next'

const emit = defineEmits(['navigateHome'])

// Alamat dasar API dari variabel lingkungan Vite (sesuai blueprint bagian 4)
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

// State Data
const registrations = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const searchQuery = ref('')
const selectedPlatformFilter = ref('ALL')

// State Modal Form (Bootstrap Modal untuk Tambah & Ubah)
const showFormModal = ref(false)
const isEditMode = ref(false)
const isSubmitting = ref(false)
const formError = ref('')

const formData = ref({
  id: null,
  email: '',
  platform: 'steam',
  status: 'VERIFIED'
})

// State Modal Konfirmasi Hapus (Bootstrap Modal Konfirmasi)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const isDeleting = ref(false)

// Navigasi kembali ke Landing Page
const goHome = () => {
  if (emit) {
    emit('navigateHome')
  }
  window.history.pushState(null, '', '/')
  window.dispatchEvent(new Event('popstate'))
}

// 1. READ ALL: GET /api/v1/pre-register
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
      throw new Error(`Gagal memuat data dari API (HTTP ${res.status}: ${res.statusText})`)
    }

    const json = await res.json()
    registrations.value = json.data || []
  } catch (err) {
    errorMessage.value = err.message || 'Gagal terhubung ke REST API backend. Pastikan server aktif di port 8080.'
  } finally {
    isLoading.value = false
  }
}

// Filter data berdasarkan search query & platform
const filteredRegistrations = computed(() => {
  return registrations.value.filter(item => {
    const matchesSearch = 
      (item.email && item.email.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (item.voucherCode && item.voucherCode.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (String(item.id).includes(searchQuery.value))

    const matchesPlatform = 
      selectedPlatformFilter.value === 'ALL' || 
      (item.platform && item.platform.toLowerCase() === selectedPlatformFilter.value.toLowerCase())

    return matchesSearch && matchesPlatform
  })
})

// Buka Modal Tambah Data Baru
const openAddModal = () => {
  isEditMode.value = false
  formError.value = ''
  formData.value = {
    id: null,
    email: '',
    platform: 'steam',
    status: 'VERIFIED'
  }
  showFormModal.value = true
}

// Buka Modal Ubah Data
const openEditModal = (item) => {
  isEditMode.value = true
  formError.value = ''
  formData.value = {
    id: item.id,
    email: item.email || '',
    platform: item.platform || 'steam',
    status: item.status || 'VERIFIED'
  }
  showFormModal.value = true
}

// Tutup Modal Form
const closeFormModal = () => {
  showFormModal.value = false
  formError.value = ''
}

// 2. CREATE (POST) & 3. UPDATE (PUT) Handler
const handleFormSubmit = async () => {
  if (!formData.value.email || !formData.value.email.includes('@')) {
    formError.value = 'Alamat email wajib diisi dengan format valid.'
    return
  }

  isSubmitting.value = true
  formError.value = ''
  successMessage.value = ''

  try {
    if (isEditMode.value) {
      // Endpoint: PUT /api/v1/pre-register/:id
      const res = await fetch(`${apiBaseUrl}/pre-register/${formData.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:5173'
        },
        body: JSON.stringify({
          email: formData.value.email,
          platform: formData.value.platform,
          status: formData.value.status
        })
      })

      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.message || `Gagal memperbarui data (HTTP ${res.status})`)
      }

      successMessage.value = `Data operatif #${formData.value.id} (${formData.value.email}) berhasil diperbarui!`
    } else {
      // Endpoint: POST /api/v1/pre-register
      const res = await fetch(`${apiBaseUrl}/pre-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:5173'
        },
        body: JSON.stringify({
          email: formData.value.email,
          platform: formData.value.platform
        })
      })

      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.message || `Gagal menambah data registrasi (HTTP ${res.status})`)
      }

      successMessage.value = `Registrasi operatif baru berhasil ditambahkan! Kode Voucher: ${result.data?.voucherCode || 'DF-ALPHA'}`
    }

    closeFormModal()
    await fetchRegistrations()
  } catch (err) {
    formError.value = err.message || 'Terjadi kesalahan saat memproses data.'
  } finally {
    isSubmitting.value = false
  }
}

// Konfirmasi Hapus Data
const confirmDelete = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

// Tutup Modal Konfirmasi Hapus
const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
}

// 4. DELETE: DELETE /api/v1/pre-register/:id
const handleDeleteConfirmed = async () => {
  if (!itemToDelete.value) return

  isDeleting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const res = await fetch(`${apiBaseUrl}/pre-register/${itemToDelete.value.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Origin': 'http://localhost:5173'
      }
    })

    const result = await res.json()
    if (!res.ok) {
      throw new Error(result.message || `Gagal menghapus data registrasi (HTTP ${res.status})`)
    }

    successMessage.value = `Data registrasi operatif #${itemToDelete.value.id} (${itemToDelete.value.email}) berhasil dihapus.`
    closeDeleteModal()
    await fetchRegistrations()
  } catch (err) {
    errorMessage.value = err.message || 'Gagal menghapus data dari server.'
  } finally {
    isDeleting.value = false
  }
}

// Format tanggal ISO menjadi tanggal lokal yang rapi
const formatDate = (isoString) => {
  if (!isoString) return '-'
  try {
    const d = new Date(isoString)
    return d.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return isoString
  }
}

onMounted(() => {
  fetchRegistrations()
})
</script>

<template>
  <div class="dashboard-page min-h-screen bg-[#080a0f] text-slate-100 font-['Rajdhani'] selection:bg-cyan-500 selection:text-black">
    <!-- Top Navigation Header -->
    <header class="bg-[#0b0e14] border-b border-cyan-500/30 sticky top-0 z-40 shadow-lg backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button 
            @click="goHome"
            class="px-3 py-1.5 bg-slate-900 hover:bg-cyan-500 hover:text-black text-cyan-400 border border-cyan-500/40 rounded font-mono text-xs font-bold transition flex items-center space-x-1.5"
            title="Kembali ke Landing Page Utama"
          >
            <ArrowLeft class="w-4 h-4" />
            <span>KEMBALI KE BERANDA</span>
          </button>

          <div class="h-6 w-px bg-slate-800"></div>

          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-cyan-950 border border-cyan-500 rounded flex items-center justify-center">
              <Database class="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h1 class="text-lg font-black font-['Chakra_Petch'] text-white tracking-wider flex items-center">
                DELTA FORCE <span class="text-cyan-400 ml-1.5">// HQ DASHBOARD</span>
              </h1>
              <p class="text-[10px] font-mono text-slate-400">MANAGEMENT LAYANAN REGISTRASI AKUN & KLAIM HADIAH</p>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <div class="hidden sm:flex items-center space-x-2 bg-black/60 px-3 py-1 rounded border border-slate-800 font-mono text-xs">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="text-emerald-400 font-semibold">REST API LIVE</span>
            <span class="text-slate-500 text-[10px]">({{ apiBaseUrl }})</span>
          </div>

          <button 
            @click="openAddModal"
            class="px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-['Chakra_Petch'] font-bold text-xs uppercase tracking-wider rounded transition flex items-center space-x-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <Plus class="w-4 h-4" />
            <span>TAMBAH REGISTRASI</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <!-- Feedback Banners -->
      <div v-if="successMessage" class="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded flex items-center justify-between text-emerald-300 font-mono text-xs animate-fadeIn">
        <div class="flex items-center space-x-2.5">
          <CheckCircle2 class="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{{ successMessage }}</span>
        </div>
        <button @click="successMessage = ''" class="text-emerald-400 hover:text-white font-bold ml-4 text-sm">&times;</button>
      </div>

      <div v-if="errorMessage" class="p-4 bg-red-950/60 border border-red-500/50 rounded flex items-center justify-between text-red-300 font-mono text-xs animate-fadeIn">
        <div class="flex items-center space-x-2.5">
          <ShieldAlert class="w-5 h-5 text-red-400 shrink-0" />
          <span>{{ errorMessage }}</span>
        </div>
        <button @click="fetchRegistrations" class="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded text-white font-bold uppercase text-[10px]">
          COBA LAGI
        </button>
      </div>

      <!-- Quick Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 bg-[#0e121b] border border-slate-800 rounded">
          <div class="flex items-center justify-between text-slate-400 font-mono text-xs mb-1">
            <span>TOTAL OPERATIF TERDAFTAR</span>
            <Users class="w-4 h-4 text-cyan-400" />
          </div>
          <div class="text-3xl font-black font-['Chakra_Petch'] text-cyan-400">
            {{ registrations.length }}
          </div>
          <div class="text-[11px] font-mono text-slate-500 mt-1">Status Clearance: All Verified</div>
        </div>

        <div class="p-4 bg-[#0e121b] border border-slate-800 rounded">
          <div class="flex items-center justify-between text-slate-400 font-mono text-xs mb-1">
            <span>PLATFORM STEAM</span>
            <span class="text-cyan-400 font-mono text-xs font-bold">PC</span>
          </div>
          <div class="text-3xl font-black font-['Chakra_Petch'] text-white">
            {{ registrations.filter(r => r.platform?.toLowerCase() === 'steam').length }}
          </div>
          <div class="text-[11px] font-mono text-slate-500 mt-1">Pemain Steam PC Terdaftar</div>
        </div>

        <div class="p-4 bg-[#0e121b] border border-slate-800 rounded">
          <div class="flex items-center justify-between text-slate-400 font-mono text-xs mb-1">
            <span>PLATFORM EPIC GAMES</span>
            <span class="text-amber-400 font-mono text-xs font-bold">STORE</span>
          </div>
          <div class="text-3xl font-black font-['Chakra_Petch'] text-amber-400">
            {{ registrations.filter(r => r.platform?.toLowerCase() === 'epic').length }}
          </div>
          <div class="text-[11px] font-mono text-slate-500 mt-1">Pemain Epic Games Terdaftar</div>
        </div>

        <div class="p-4 bg-[#0e121b] border border-slate-800 rounded">
          <div class="flex items-center justify-between text-slate-400 font-mono text-xs mb-1">
            <span>BUNDLE HADIAH DIKLAIM</span>
            <Gift class="w-4 h-4 text-emerald-400" />
          </div>
          <div class="text-3xl font-black font-['Chakra_Petch'] text-emerald-400">
            100%
          </div>
          <div class="text-[11px] font-mono text-slate-500 mt-1">M4A1 Cyber Ghost Paket</div>
        </div>
      </div>

      <!-- Action & Filter Bar -->
      <div class="p-4 bg-[#0e121b] border border-slate-800 rounded flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <Search class="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari email, ID, atau kode voucher..." 
            class="w-full pl-9 pr-4 py-2 bg-black/60 border border-slate-700 focus:border-cyan-400 text-white font-mono text-xs rounded outline-none transition"
          />
        </div>

        <!-- Filter Platform & Action Buttons -->
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div class="flex items-center space-x-2">
            <Filter class="w-4 h-4 text-slate-500" />
            <select 
              v-model="selectedPlatformFilter"
              class="bg-black/60 border border-slate-700 text-slate-300 font-mono text-xs px-3 py-2 rounded outline-none focus:border-cyan-400"
            >
              <option value="ALL">SEMUA PLATFORM</option>
              <option value="steam">Steam PC</option>
              <option value="epic">Epic Games</option>
              <option value="xbox">Xbox Series</option>
              <option value="ps5">PlayStation 5</option>
              <option value="mobile">iOS / Android</option>
            </select>
          </div>

          <button 
            @click="fetchRegistrations"
            class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded font-mono text-xs flex items-center space-x-1.5 transition"
            title="Muat Ulang Data Registrasi"
          >
            <RefreshCw :class="['w-3.5 h-3.5', isLoading ? 'animate-spin text-cyan-400' : '']" />
            <span>REFRESH</span>
          </button>

          <button 
            @click="openAddModal"
            class="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-['Chakra_Petch'] font-bold text-xs uppercase rounded transition flex items-center space-x-1"
          >
            <Plus class="w-4 h-4" />
            <span>TAMBAH DATA</span>
          </button>
        </div>
      </div>

      <!-- Main Data Table (Tabel Layanan Registrasi Akun & Klaim Hadiah) -->
      <div class="bg-[#0e121b] border border-slate-800 rounded overflow-hidden shadow-2xl">
        <div class="px-6 py-4 border-b border-slate-800/80 bg-black/40 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Radio class="w-4 h-4 text-cyan-400 animate-pulse" />
            <h2 class="text-base font-bold font-['Chakra_Petch'] uppercase tracking-wider text-white">
              TABEL LAYANAN // DATABASE REGISTRASI AKUN & KLAIM HADIAH
            </h2>
          </div>
          <span class="text-xs font-mono text-slate-400">
            Menampilkan {{ filteredRegistrations.length }} dari {{ registrations.length }} operatif
          </span>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading && registrations.length === 0" class="p-16 text-center">
          <RefreshCw class="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
          <p class="font-mono text-sm text-cyan-300">MEMUAT DATA REGISTRASI DARI ENDPOINT BACKEND...</p>
          <p class="font-mono text-xs text-slate-500 mt-1">GET {{ apiBaseUrl }}/pre-register</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredRegistrations.length === 0" class="p-16 text-center">
          <Database class="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 class="text-lg font-bold font-['Chakra_Petch'] text-slate-300 uppercase">TIDAK ADA DATA REGISTRASI</h3>
          <p class="text-slate-500 font-mono text-xs mt-1">
            {{ searchQuery ? 'Tidak ada data operatif yang cocok dengan kata kunci pencarian.' : 'Belum ada pendaftaran akun yang tersimpan di database.' }}
          </p>
          <button 
            @click="openAddModal" 
            class="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-['Chakra_Petch'] font-bold text-xs uppercase rounded transition inline-flex items-center space-x-1.5"
          >
            <Plus class="w-4 h-4" />
            <span>TAMBAH REGISTRASI PERTAMA</span>
          </button>
        </div>

        <!-- Data Table (Styled with Bootstrap table classes) -->
        <div v-else class="overflow-x-auto">
          <table class="table table-dark table-hover w-full text-left font-['Rajdhani']">
            <thead>
              <tr class="bg-black/60 border-b border-slate-800 text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                <th class="py-3.5 px-4 w-14">#ID</th>
                <th class="py-3.5 px-4">EMAIL OPERATOR</th>
                <th class="py-3.5 px-4">PLATFORM</th>
                <th class="py-3.5 px-4">KODE AKSES VOUCHER</th>
                <th class="py-3.5 px-4">HADIAH TERKLAIM</th>
                <th class="py-3.5 px-4">WAKTU DAFTAR</th>
                <th class="py-3.5 px-4">STATUS</th>
                <th class="py-3.5 px-4 text-center w-36">AKSI</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 font-mono text-xs">
              <tr 
                v-for="item in filteredRegistrations" 
                :key="item.id" 
                class="hover:bg-slate-900/60 transition group"
              >
                <!-- ID -->
                <td class="py-3.5 px-4 font-bold text-slate-400">
                  #{{ item.id }}
                </td>

                <!-- Email -->
                <td class="py-3.5 px-4 text-white font-semibold">
                  <span class="text-sm font-['Rajdhani'] font-bold text-slate-100 block">{{ item.email }}</span>
                  <span class="text-[10px] text-slate-500">Operatif Terverifikasi</span>
                </td>

                <!-- Platform Badge -->
                <td class="py-3.5 px-4">
                  <span 
                    :class="[
                      'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border',
                      item.platform?.toLowerCase() === 'steam' ? 'bg-cyan-950/60 text-cyan-400 border-cyan-500/40' :
                      item.platform?.toLowerCase() === 'epic' ? 'bg-amber-950/60 text-amber-400 border-amber-500/40' :
                      item.platform?.toLowerCase() === 'xbox' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40' :
                      item.platform?.toLowerCase() === 'ps5' ? 'bg-blue-950/60 text-blue-400 border-blue-500/40' :
                      'bg-purple-950/60 text-purple-400 border-purple-500/40'
                    ]"
                  >
                    {{ item.platform || 'STEAM' }}
                  </span>
                </td>

                <!-- Voucher Code -->
                <td class="py-3.5 px-4">
                  <span class="px-2 py-1 bg-black/80 border border-slate-700 text-amber-300 rounded font-bold tracking-wider text-xs">
                    {{ item.voucherCode }}
                  </span>
                </td>

                <!-- Claimed Reward -->
                <td class="py-3.5 px-4 text-slate-300 font-['Rajdhani'] text-sm">
                  <div class="flex items-center space-x-1.5">
                    <Gift class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{{ item.claimedReward || 'M4A1 - Cyber Ghost Bundle' }}</span>
                  </div>
                </td>

                <!-- Registered At -->
                <td class="py-3.5 px-4 text-slate-400 text-[11px]">
                  {{ formatDate(item.registeredAt) }}
                </td>

                <!-- Status Badge -->
                <td class="py-3.5 px-4">
                  <span 
                    :class="[
                      'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border',
                      item.status === 'VERIFIED' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40' : 'bg-red-950/60 text-red-400 border-red-500/40'
                    ]"
                  >
                    {{ item.status || 'VERIFIED' }}
                  </span>
                </td>

                <!-- Actions: Ubah & Hapus -->
                <td class="py-3.5 px-4 text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <!-- Tombol Ubah (Edit) -->
                    <button 
                      @click="openEditModal(item)"
                      class="btn btn-sm btn-outline-info px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500 hover:text-black text-cyan-400 border border-cyan-500/40 rounded transition flex items-center space-x-1 text-xs"
                      title="Ubah Data Registrasi Ini"
                    >
                      <Edit3 class="w-3.5 h-3.5" />
                      <span>Ubah</span>
                    </button>

                    <!-- Tombol Hapus (Delete) dengan Konfirmasi -->
                    <button 
                      @click="confirmDelete(item)"
                      class="btn btn-sm btn-outline-danger px-2.5 py-1 bg-red-500/10 hover:bg-red-600 hover:text-white text-red-400 border border-red-500/40 rounded transition flex items-center space-x-1 text-xs"
                      title="Hapus Data Registrasi Ini"
                    >
                      <Trash2 class="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- ========================================================================= -->
    <!-- MODEL BOOTSTRAP: FORM TAMBAH / UBAH REGISTRASI AKUN & KLAIM HADIAH        -->
    <!-- ========================================================================= -->
    <div 
      v-if="showFormModal" 
      class="modal fade show d-block fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      @click.self="closeFormModal"
    >
      <div class="modal-dialog modal-dialog-centered max-w-lg w-full" role="document">
        <div class="modal-content bg-[#0b0e14] border-2 border-cyan-400 rounded-lg shadow-[0_0_50px_rgba(0,240,255,0.35)] overflow-hidden">
          <!-- Modal Header -->
          <div class="modal-header bg-black/90 px-6 py-4 border-b border-cyan-500/30 flex items-center justify-between">
            <h5 class="modal-title font-['Chakra_Petch'] font-black uppercase tracking-wider text-white text-base flex items-center space-x-2">
              <span class="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping"></span>
              <span>{{ isEditMode ? '// UBAH DATA REGISTRASI OPERATIF' : '// FORMULIR REGISTRASI OPERATIF BARU' }}</span>
            </h5>
            <button 
              type="button" 
              class="btn-close text-slate-400 hover:text-white text-xl font-mono leading-none" 
              @click="closeFormModal"
              aria-label="Tutup"
            >
              &times;
            </button>
          </div>

          <!-- Modal Body -->
          <form @submit.prevent="handleFormSubmit">
            <div class="modal-body p-6 space-y-4">
              <!-- Error in form -->
              <div v-if="formError" class="p-3 bg-red-950/70 border border-red-500/60 rounded text-red-300 font-mono text-xs flex items-center space-x-2">
                <AlertTriangle class="w-4 h-4 text-red-400 shrink-0" />
                <span>{{ formError }}</span>
              </div>

              <p class="text-xs font-mono text-slate-400 leading-relaxed">
                {{ isEditMode 
                  ? 'Perbarui informasi operatif untuk ID #' + formData.id + '. Perubahan akan disimpan langsung ke database SQLite.' 
                  : 'Tambahkan data registrasi baru yang akan memanggil endpoint POST /api/v1/pre-register sesuai kontrak REST API.' 
                }}
              </p>

              <!-- Form Input: Email -->
              <div class="mb-3">
                <label class="form-label block text-xs font-mono text-cyan-400 uppercase font-semibold mb-1.5">
                  ALAMAT EMAIL RESMI OPERATOR <span class="text-red-400">*</span>
                </label>
                <input 
                  v-model="formData.email" 
                  type="email" 
                  required 
                  placeholder="operator.alpha@gmail.com" 
                  class="form-control w-full px-4 py-2.5 bg-black/80 border border-slate-700 focus:border-cyan-400 text-white font-mono text-sm rounded outline-none transition"
                />
              </div>

              <!-- Form Input: Platform -->
              <div class="mb-3">
                <label class="form-label block text-xs font-mono text-cyan-400 uppercase font-semibold mb-1.5">
                  PLATFORM GAME UTAMA <span class="text-red-400">*</span>
                </label>
                <select 
                  v-model="formData.platform" 
                  class="form-select form-control w-full px-4 py-2.5 bg-black/80 border border-slate-700 focus:border-cyan-400 text-white font-mono text-sm rounded outline-none transition"
                >
                  <option value="steam">Steam PC</option>
                  <option value="epic">Epic Games Store</option>
                  <option value="xbox">Xbox Series X|S</option>
                  <option value="ps5">PlayStation 5</option>
                  <option value="mobile">Mobile (iOS / Android)</option>
                </select>
              </div>

              <!-- Form Input: Status (Khusus Edit Mode) -->
              <div v-if="isEditMode" class="mb-3">
                <label class="form-label block text-xs font-mono text-cyan-400 uppercase font-semibold mb-1.5">
                  STATUS CLEARANCE REGISTRASI
                </label>
                <select 
                  v-model="formData.status" 
                  class="form-select form-control w-full px-4 py-2.5 bg-black/80 border border-slate-700 focus:border-cyan-400 text-white font-mono text-sm rounded outline-none transition"
                >
                  <option value="VERIFIED">VERIFIED (Terverifikasi)</option>
                  <option value="PENDING">PENDING (Menunggu Verifikasi)</option>
                  <option value="SUSPENDED">SUSPENDED (Ditangguhkan)</option>
                </select>
              </div>

              <!-- Info Klaim Hadiah Otomatis -->
              <div class="p-3 bg-slate-900/80 border border-slate-800 rounded flex items-center space-x-3 text-xs font-mono text-slate-300">
                <Gift class="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span class="text-white font-bold block">Paket Hadiah Terhubung:</span>
                  <span class="text-slate-400">M4A1 - Cyber Ghost Bundle (Otomatis ditautkan)</span>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer bg-black/70 px-6 py-4 border-t border-slate-800 flex items-center justify-end space-x-3">
              <button 
                type="button" 
                class="btn btn-secondary px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded uppercase font-bold transition" 
                @click="closeFormModal"
              >
                Batal
              </button>
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="btn btn-primary px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-['Chakra_Petch'] font-black text-xs uppercase tracking-wider rounded transition flex items-center space-x-1.5 disabled:opacity-50"
              >
                <RefreshCw v-if="isSubmitting" class="w-3.5 h-3.5 animate-spin" />
                <span>{{ isSubmitting ? 'MENYIMPAN DATA...' : (isEditMode ? 'SIMPAN PERUBAHAN' : 'TAMBAH DATA BARU') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODEL BOOTSTRAP: KONFIRMASI HAPUS DATA (MINTA KONFIRMASI SEBELUM MENGHAPUS) -->
    <!-- ========================================================================= -->
    <div 
      v-if="showDeleteModal" 
      class="modal fade show d-block fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      @click.self="closeDeleteModal"
    >
      <div class="modal-dialog modal-dialog-centered max-w-md w-full" role="document">
        <div class="modal-content bg-[#0b0e14] border-2 border-red-500/80 rounded-lg shadow-[0_0_50px_rgba(239,68,68,0.35)] overflow-hidden">
          <!-- Header Modal Konfirmasi -->
          <div class="modal-header bg-black/90 px-6 py-4 border-b border-red-500/30 flex items-center justify-between">
            <h5 class="modal-title font-['Chakra_Petch'] font-black uppercase tracking-wider text-red-400 text-base flex items-center space-x-2">
              <ShieldAlert class="w-5 h-5 text-red-500" />
              <span>// KONFIRMASI HAPUS DATA</span>
            </h5>
            <button 
              type="button" 
              class="btn-close text-slate-400 hover:text-white text-xl font-mono leading-none" 
              @click="closeDeleteModal"
              aria-label="Tutup"
            >
              &times;
            </button>
          </div>

          <!-- Body Modal Konfirmasi -->
          <div class="modal-body p-6 space-y-4">
            <p class="text-slate-300 font-['Rajdhani'] text-sm leading-relaxed">
              Apakah Anda yakin ingin menghapus data registrasi operatif ini secara permanen dari server database?
            </p>

            <!-- Detail Record to Delete -->
            <div v-if="itemToDelete" class="p-3 bg-red-950/30 border border-red-500/40 rounded font-mono text-xs space-y-1">
              <div class="text-white font-bold">#ID: {{ itemToDelete.id }}</div>
              <div class="text-slate-300">Email: <span class="text-cyan-400">{{ itemToDelete.email }}</span></div>
              <div class="text-slate-300">Voucher: <span class="text-amber-400">{{ itemToDelete.voucherCode }}</span></div>
              <div class="text-slate-300">Platform: <span class="uppercase text-slate-200">{{ itemToDelete.platform }}</span></div>
            </div>

            <div class="p-2.5 bg-black/60 border border-slate-800 rounded text-[11px] font-mono text-red-400 flex items-center space-x-2">
              <AlertTriangle class="w-4 h-4 shrink-0 text-red-400" />
              <span>PERINGATAN: Tindakan ini memanggil DELETE /api/v1/pre-register/{{ itemToDelete?.id }} dan tidak dapat dibatalkan.</span>
            </div>
          </div>

          <!-- Footer Modal Konfirmasi -->
          <div class="modal-footer bg-black/70 px-6 py-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button 
              type="button" 
              class="btn btn-secondary px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded uppercase font-bold transition" 
              @click="closeDeleteModal"
            >
              Batal
            </button>
            <button 
              type="button" 
              :disabled="isDeleting"
              class="btn btn-danger px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-['Chakra_Petch'] font-black text-xs uppercase tracking-wider rounded transition flex items-center space-x-1.5 disabled:opacity-50"
              @click="handleDeleteConfirmed"
            >
              <RefreshCw v-if="isDeleting" class="w-3.5 h-3.5 animate-spin" />
              <span>{{ isDeleting ? 'MENGHAPUS...' : 'YA, HAPUS DATA' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Standard Bootstrap Modal backdrop and fade animations */
.modal-backdrop.show {
  opacity: 0.8;
}

.table > :not(caption) > * > * {
  border-bottom-width: 1px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.25s ease-out forwards;
}
</style>

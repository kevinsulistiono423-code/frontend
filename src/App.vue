<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ReconFeed from './components/ReconFeed.vue'
import OperatorsSection from './components/OperatorsSection.vue'
import GameModesSection from './components/GameModesSection.vue'
import GunsmithSection from './components/GunsmithSection.vue'
import BattleIntelSection from './components/BattleIntelSection.vue'
import SystemSpecsSection from './components/SystemSpecsSection.vue'
import PreRegisterModal from './components/PreRegisterModal.vue'
import TrailerModal from './components/TrailerModal.vue'
import FooterSection from './components/FooterSection.vue'
import DashboardView from './components/DashboardView.vue'

// Deteksi Rute /dashboard (Mendukung path /dashboard maupun hash #/dashboard)
const currentPath = ref(window.location.pathname)
const currentHash = ref(window.location.hash)

const isDashboard = computed(() => {
  const p = currentPath.value.toLowerCase()
  const h = currentHash.value.toLowerCase()
  return p === '/dashboard' || p === '/dashboard/' || h === '#/dashboard' || h === '#dashboard'
})

const handlePopstate = () => {
  currentPath.value = window.location.pathname
  currentHash.value = window.location.hash
}

onMounted(() => {
  window.addEventListener('popstate', handlePopstate)
  window.addEventListener('hashchange', handlePopstate)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopstate)
  window.removeEventListener('hashchange', handlePopstate)
})

const navigateToDashboard = () => {
  window.history.pushState(null, '', '/dashboard')
  currentPath.value = '/dashboard'
}

const navigateToHome = () => {
  window.history.pushState(null, '', '/')
  currentPath.value = '/'
  currentHash.value = ''
}

const showPreRegister = ref(false)
const showTrailer = ref(false)

const openPreRegister = () => {
  showPreRegister.value = true
}

const closePreRegister = () => {
  showPreRegister.value = false
}

const openTrailer = () => {
  showTrailer.value = true
}

const closeTrailer = () => {
  showTrailer.value = false
}
</script>

<template>
  <!-- Rute /dashboard: Menampilkan Halaman Dashboard Layanan -->
  <DashboardView v-if="isDashboard" @navigate-home="navigateToHome" />

  <!-- Rute /: Landing Page Asli (Komponen Utuh Tanpa Diubah) -->
  <div v-else class="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col font-['Rajdhani'] selection:bg-cyan-500 selection:text-black">
    <!-- Navbar -->
    <Navbar 
      @open-pre-register="openPreRegister" 
      @open-trailer="openTrailer" 
    />

    <!-- Main Content -->
    <main class="flex-grow">
      <!-- 1. Hero Section -->
      <HeroSection 
        @open-pre-register="openPreRegister" 
        @open-trailer="openTrailer" 
      />

      <!-- 2. Satellite Recon Random Feed (Special Random Image Module) -->
      <ReconFeed />

      <!-- 3. Operators Roster & Combat Attributes -->
      <OperatorsSection />

      <!-- 4. Game Modes (Havoc, Hazard, Black Hawk Down) -->
      <GameModesSection />

      <!-- 5. Arsenal & Gunsmith Customizer -->
      <GunsmithSection />

      <!-- 6. Battle Intel & News Feed -->
      <BattleIntelSection />

      <!-- 7. Hardware Specs & Platforms -->
      <SystemSpecsSection />
    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Interactive Modals -->
    <PreRegisterModal 
      v-if="showPreRegister" 
      @close="closePreRegister" 
    />

    <TrailerModal 
      v-if="showTrailer" 
      @close="closeTrailer" 
    />

    <!-- Tombol Akses Cepat Dashboard Taktis (/dashboard) -->
    <button 
      @click="navigateToDashboard"
      class="fixed bottom-6 right-6 z-40 px-3.5 py-2 bg-black/90 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/50 rounded font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)] transition flex items-center space-x-1.5 backdrop-blur-md cursor-pointer"
      title="Buka Halaman Dashboard Manajemen /dashboard"
    >
      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
      <span>HQ DASHBOARD</span>
    </button>
  </div>
</template>

<style>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>

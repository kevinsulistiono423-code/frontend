<script setup>
import { sound } from '../utils/audio'
import { X, Play, Radio, Volume2 } from 'lucide-vue-next'

const emit = defineEmits(['close'])

const handleClose = () => {
  sound.playClick()
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4" @click="handleClose">
    <div 
      class="bg-[#0b0e14] border-2 border-cyan-400 max-w-4xl w-full clip-tactical overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.4)] relative"
      @click.stop
    >
      <!-- Top Bar -->
      <div class="bg-black/90 px-6 py-3 border-b border-cyan-500/30 flex items-center justify-between font-mono text-xs">
        <span class="text-cyan-400 font-bold flex items-center">
          <Radio class="w-3.5 h-3.5 mr-1.5 animate-pulse" /> CLASSIFIED CINEMATIC STREAM // OFFICIAL GAMEPLAY TRAILER
        </span>
        <button @click="handleClose" class="text-slate-400 hover:text-white p-1">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Video Aspect Ratio Frame -->
      <div class="relative w-full aspect-video bg-black flex items-center justify-center">
        <!-- Embedded official Delta Force trailer -->
        <iframe 
          class="w-full h-full"
          src="https://www.youtube-nocookie.com/embed/Xy3rW068fO8?autoplay=1&rel=0&modestbranding=1" 
          title="Delta Force Official Trailer" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      </div>

      <!-- Footer Info -->
      <div class="px-6 py-4 bg-slate-950 flex items-center justify-between font-mono text-xs text-slate-400 border-t border-slate-800">
        <span class="text-slate-300">STREAM QUALITY: 4K UHD 60FPS // DOLBY ATMOS</span>
        <span class="text-amber-400 font-bold">RATING: PEGI 16 / ESRB TEEN</span>
      </div>
    </div>
  </div>
</template>

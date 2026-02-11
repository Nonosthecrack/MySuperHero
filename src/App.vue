<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content container">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <h1 class="app-title">My Super Hero</h1>
          <span class="app-subtitle">Recherche</span>
        </div>
      </div>
    </header>

    <main class="app-main container">
      <div>
        <SearchBar v-if="!selectedHero" @selectHero="selectHero" />
        <HeroDetails v-else :hero="selectedHero" @close="selectedHero = null" />
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import HeroDetails from './components/HeroDetails.vue';
import type { SuperHero } from './types/SuperHero';

const selectedHero = ref<SuperHero | null>(null);
const selectHero = (hero: SuperHero) => {
  selectedHero.value = hero;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
<style scoped>
  .app { min-height:100vh; }
  .app-header { background:var(--surface); border-bottom:1px solid rgba(255,255,255,0.04); position:sticky; top:0; z-index:50; }
  .header-content { display:flex; align-items:center; justify-content:space-between; padding:0.75rem 0; }
  .app-title { margin:0; font-size:1.25rem; font-weight:700; color:var(--text); }
  .app-subtitle { color:var(--muted); font-size:0.95rem; margin-left:0.5rem; }
  .settings-button { padding:0.45rem 0.75rem; border-radius:6px; border:1px solid #e5e7eb; background:white; cursor:pointer; }
  .app-main { padding:1.25rem 0; min-height:calc(100vh - 140px); }
  .welcome-card { background:white; padding:1rem; border:1px solid #e5e7eb; border-radius:8px; text-align:center; }
  .welcome-icon { font-size:2.25rem; margin-bottom:0.5rem; }
  .welcome-card h2 { margin:0 0 0.5rem; }
  .app-footer { text-align:center; padding:1rem 0; color:#6b7280; }
  @media (max-width:768px) { .header-content { padding:0.5rem 0; flex-direction:column; gap:0.5rem; } }
</style>
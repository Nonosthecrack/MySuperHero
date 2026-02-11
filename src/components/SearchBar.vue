<template>
  <div class="search-container container">
    <div class="search-box">
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Rechercher un super-héros..."
        class="search-input"
      />
      <button @click="handleSearch" class="search-button" :disabled="!searchQuery.trim()">Rechercher</button>
    </div>

    <div v-if="isLoading" class="loading">Recherche en cours...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="searchResults.length > 0" class="results-list">
      <div v-for="hero in searchResults" :key="hero.id" @click="$emit('selectHero', hero)" class="hero-row">
        <img :src="hero.image.url" alt="" class="thumb" />
        <div class="meta">
          <div class="name">{{ hero.name }}</div>
          <div class="sub">{{ hero.biography.publisher || '—' }} • {{ hero.biography.alignment || '—' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { superheroService } from '../services/superhero.service';
import type { SuperHero } from '../types/SuperHero';

const emit = defineEmits<{
  selectHero: [hero: SuperHero]
}>();

const searchQuery = ref('');
const searchResults = ref<SuperHero[]>([]);
const isLoading = ref(false);
const error = ref('');

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return;

  isLoading.value = true;
  error.value = '';
  searchResults.value = [];

  try {
    const result = await superheroService.searchByName(searchQuery.value);
    
    if (result.response === 'success' && result.results) {
      searchResults.value = result.results;
    } else if (result.response === 'error') {
      error.value = 'Aucun héros trouvé avec ce nom';
    }
  } catch (err) {
    error.value = 'Une erreur est survenue lors de la recherche';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.search-container { padding: 1rem 0; }
.search-box { display:flex; gap:0.5rem; margin-bottom:1rem; }
.search-input { flex:1; padding:0.6rem 0.75rem; border:1px solid rgba(255,255,255,0.06); border-radius:6px; background:var(--surface); color:var(--text); }
.search-button { padding:0.6rem 0.9rem; border-radius:6px; background:transparent; color:var(--text); border:1px solid rgba(255,255,255,0.06); }
.loading { color:var(--muted); padding:0.75rem 0; }
.error-message { color:var(--danger); background:rgba(239,68,68,0.08); padding:0.6rem; border-radius:6px; }
.results-list { display:flex; flex-direction:column; gap:0.5rem; }
.hero-row { display:flex; gap:0.75rem; align-items:center; padding:0.5rem; background:var(--surface); border:1px solid rgba(255,255,255,0.03); border-radius:6px; cursor:pointer; }
.hero-row:hover { background:rgba(255,255,255,0.02); }
.thumb { width:48px; height:48px; object-fit:cover; border-radius:4px; }
.meta .name { font-weight:600; color:var(--text); }
.meta .sub { font-size:0.85rem; color:var(--muted); }
</style>
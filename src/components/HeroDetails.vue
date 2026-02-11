<template>
  <div v-if="hero" class="hero-details container">
    <button @click="$emit('close')" class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Retour
    </button>

    <div class="hero-header">
      <div class="hero-image-large">
        <img :src="hero.image.url" :alt="hero.name" />
      </div>
      <div class="hero-basic">
        <h1 class="hero-title">{{ hero.name }}</h1>
        <p class="hero-fullname">{{ hero.biography['full-name'] || '—' }}</p>
      </div>
    </div>

    <div class="details-grid">
      <section class="detail-card powerstats-card">
        <h2 class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Statistiques
        </h2>
        <div class="stats-grid">
          <div v-for="(value, key) in hero.powerstats" :key="key" class="stat-item">
            <div class="stat-header">
              <span class="stat-name">{{ formatStatName(key) }}</span>
              <span class="stat-value">{{ value || 'N/A' }}</span>
            </div>
            <div class="stat-bar">
              <div 
                class="stat-fill" 
                :style="{ width: `${value || 0}%` }"
                :class="getStatClass(value)"
              ></div>
            </div>
          </div>
        </div>
      </section>

      
      <section class="detail-card">
        <h2 class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Biographie
        </h2>
        <div class="bio-grid">
          <div class="bio-item">
            <span class="bio-label">Nom complet</span>
            <span class="bio-value">{{ hero.biography['full-name'] || 'Inconnu' }}</span>
          </div>
          <div class="bio-item">
            <span class="bio-label">Alter ego</span>
            <span class="bio-value">{{ hero.biography['alter-egos'] }}</span>
          </div>
          <div class="bio-item">
            <span class="bio-label">Lieu de naissance</span>
            <span class="bio-value">{{ hero.biography['place-of-birth'] || 'Inconnu' }}</span>
          </div>
          <div class="bio-item">
            <span class="bio-label">Première apparition</span>
            <span class="bio-value">{{ hero.biography['first-appearance'] || 'Inconnue' }}</span>
          </div>
          <div class="bio-item">
            <span class="bio-label">Éditeur</span>
            <span class="bio-value publisher">{{ hero.biography.publisher }}</span>
          </div>
          <div class="bio-item">
            <span class="bio-label">Alignement</span>
            <span class="bio-value alignment" :class="hero.biography.alignment">
              {{ hero.biography.alignment }}
            </span>
          </div>
        </div>
        <div v-if="hero.biography.aliases.length > 0" class="aliases">
          <span class="bio-label">Alias</span>
          <div class="alias-tags">
            <span v-for="(alias, index) in hero.biography.aliases" :key="index" class="alias-tag">
              {{ alias }}
            </span>
          </div>
        </div>
      </section>

      
      <section class="detail-card">
        <h2 class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Apparence
        </h2>
        <div class="appearance-grid">
          <div class="appearance-item">
            <span class="appearance-icon">⚧</span>
            <div>
              <span class="appearance-label">Genre</span>
              <span class="appearance-value">{{ hero.appearance.gender || 'Inconnu' }}</span>
            </div>
          </div>
          <div class="appearance-item">
            <span class="appearance-icon">🧬</span>
            <div>
              <span class="appearance-label">Race</span>
              <span class="appearance-value">{{ hero.appearance.race || 'Inconnue' }}</span>
            </div>
          </div>
          <div class="appearance-item">
            <span class="appearance-icon">📏</span>
            <div>
              <span class="appearance-label">Taille</span>
              <span class="appearance-value">{{ hero.appearance.height[1] || hero.appearance.height[0] || 'Inconnue' }}</span>
            </div>
          </div>
          <div class="appearance-item">
            <span class="appearance-icon">⚖️</span>
            <div>
              <span class="appearance-label">Poids</span>
              <span class="appearance-value">{{ hero.appearance.weight[1] || hero.appearance.weight[0] || 'Inconnu' }}</span>
            </div>
          </div>
          <div class="appearance-item">
            <span class="appearance-icon">👁️</span>
            <div>
              <span class="appearance-label">Yeux</span>
              <span class="appearance-value">{{ hero.appearance['eye-color'] || 'Inconnus' }}</span>
            </div>
          </div>
          <div class="appearance-item">
            <span class="appearance-icon">💇</span>
            <div>
              <span class="appearance-label">Cheveux</span>
              <span class="appearance-value">{{ hero.appearance['hair-color'] || 'Inconnus' }}</span>
            </div>
          </div>
        </div>
      </section>

      
      <section class="detail-card">
        <h2 class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Travail
        </h2>
        <div class="work-content">
          <div class="work-item">
            <span class="work-label">Occupation</span>
            <p class="work-text">{{ hero.work.occupation || 'Inconnue' }}</p>
          </div>
          <div class="work-item">
            <span class="work-label">Base d'opération</span>
            <p class="work-text">{{ hero.work.base || 'Inconnue' }}</p>
          </div>
        </div>
      </section>

      
      <section class="detail-card">
        <h2 class="section-title">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Connexions
        </h2>
        <div class="work-content">
          <div class="work-item">
            <span class="work-label">Affiliations</span>
            <p class="work-text">{{ hero.connections['group-affiliation'] || 'Aucune' }}</p>
          </div>
          <div class="work-item">
            <span class="work-label">Proches</span>
            <p class="work-text">{{ hero.connections.relatives || 'Inconnus' }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SuperHero } from '../types/SuperHero';

defineProps<{
  hero: SuperHero | null
}>();

defineEmits<{
  close: []
}>();

const formatStatName = (key: string): string => {
  const names: Record<string, string> = {
    intelligence: 'Intelligence',
    strength: 'Force',
    speed: 'Vitesse',
    durability: 'Endurance',
    power: 'Pouvoir',
    combat: 'Combat'
  };
  return names[key] || key;
};

const getStatClass = (value: string): string => {
  const num = parseInt(value);
  if (num >= 80) return 'stat-excellent';
  if (num >= 60) return 'stat-good';
  if (num >= 40) return 'stat-average';
  return 'stat-low';
};
</script>

<style scoped>
  .hero-details { padding: 1.25rem 0; }

  .back-button {
    padding:0.6rem 0.9rem;
    border-radius:8px;
    border: none;
    background: var(--accent);
    color: var(--bg);
    cursor: pointer;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 6px 18px rgba(6,182,212,0.12);
    transition: transform 0.12s ease, box-shadow 0.12s ease;
  }

  .back-button:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(6,182,212,0.18); }

  .hero-header { display:flex; gap:1rem; align-items:center; margin-bottom:1rem; }

  .hero-image-large { width:160px; height:160px; overflow:hidden; border-radius:8px; border:1px solid rgba(255,255,255,0.04); background:var(--card); }
  .hero-image-large img { width:100%; height:100%; object-fit:cover; }

  .hero-basic .hero-title { margin:0; font-size:1.25rem; font-weight:700; color:var(--text); }
  .hero-fullname { margin:0.25rem 0 0; color:var(--muted); }

  .details-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem; }
  .detail-card { background:var(--surface); border:1px solid rgba(255,255,255,0.03); padding:1rem; border-radius:8px; }

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.icon {
  width: 28px;
  height: 28px;
}

.powerstats-card {
  grid-column: 1 / -1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-name {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-bar {
  height: 10px;
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.stat-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 1s ease;
  position: relative;
}

.stat-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.stat-excellent {
  background: linear-gradient(90deg, #10b981, #06b6d4);
}

.stat-good {
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
}

.stat-average {
  background: linear-gradient(90deg, #f59e0b, #06b6d4);
}

.stat-low {
  background: linear-gradient(90deg, #6b7280, #9ca3af);
}

.bio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.bio-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bio-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.bio-value {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text);
}

.bio-value.publisher {
  color: #fbbf24;
  font-weight: 700;
}

.bio-value.alignment {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  text-transform: uppercase;
}

.bio-value.alignment.good {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.5);
}

.bio-value.alignment.bad {
  background: rgba(220, 38, 38, 0.2);
  color: #f87171;
  border: 1px solid rgba(220, 38, 38, 0.5);
}

.bio-value.alignment.neutral {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.5);
}

.aliases {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(6, 182, 212, 0.2);
}

.alias-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.alias-tag {
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.03);
  border-radius: 20px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
}

.appearance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.appearance-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  transition: all 0.15s ease;
}

.appearance-item:hover {
  background: rgba(255,255,255,0.03);
  transform: translateY(-2px);
}

.appearance-icon {
  font-size: 2rem;
}

.appearance-label {
  display: block;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.appearance-value {
  display: block;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.work-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.work-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.work-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.work-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.6;
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
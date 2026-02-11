<template>
  <div class="flex flex-wrap">
    <HeroCard v-for="hero in heroes" :key="hero.id" :hero="hero" />
  </div>
  <div v-if="heroes.length === 0 && !loading">
    Aucun héros trouvé.
  </div>
</template>

<script setup lang="ts">
import { useHeroStore } from "@/stores/heroStore";
import HeroCard from "./HeroCard.vue";

const heroStore = useHeroStore();
const { heroes, loading } = heroStore;
</script>

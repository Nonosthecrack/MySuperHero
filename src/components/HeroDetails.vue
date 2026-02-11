<template>
  <div v-if="selectedHero" class="p-4">
    <h1 class="text-2xl font-bold">{{ selectedHero.name }}</h1>
    <img :src="selectedHero.images.md" :alt="selectedHero.name" class="w-48 h-48 object-cover" />
    <h2 class="text-xl mt-4">Statistiques :</h2>
    <ul>
      <li v-for="(value, key) in selectedHero.powerstats" :key="key">
        {{ key }} : {{ value }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useHeroStore } from "@/stores/heroStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const heroStore = useHeroStore();
const { selectedHero, fetchHeroById } = heroStore;

onMounted(() => {
  fetchHeroById(route.params.id as string);
});
</script>

<template>
  <div>
    <SearchBar />
    <div class="mt-4">
      <button
        @click="fetchHeroesByAlignment('good')"
        class="p-2 bg-green-500 text-white rounded mr-2"
      >
        Héros Bons
      </button>
      <button
        @click="fetchHeroesByAlignment('bad')"
        class="p-2 bg-red-500 text-white rounded"
      >
        Héros Méchants
      </button>
    </div>
    <HeroList />
  </div>
</template>

<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import HeroList from "@/components/HeroList.vue";
import { useHeroStore } from "@/stores/heroStore";

const heroStore = useHeroStore();
const { fetchHeroesByAlignment } = heroStore;
</script>

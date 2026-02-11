<template>
  <div class="p-4">
    <input
      v-model="query"
      @keyup.enter="search"
      placeholder="Rechercher un héros..."
      class="p-2 border rounded"
    />
    <button @click="search" class="ml-2 p-2 bg-blue-500 text-white rounded">
      Rechercher
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHeroStore } from "@/stores/heroStore";

const query = ref("");
const heroStore = useHeroStore();

const search = () => {
  heroStore.fetchHeroesByName(query.value);
};
</script>

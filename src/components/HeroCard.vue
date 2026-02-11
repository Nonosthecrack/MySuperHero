<template>
  <div class="border p-4 m-2 rounded shadow" @click="selectHero">
    <h2 class="text-xl font-bold">{{ hero.name }}</h2>
    <img :src="hero.images.md" :alt="hero.name" class="w-32 h-32 object-cover" />
    <p>Alignement : {{ hero.biography.alignment }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Hero } from "@/types/hero";
import { useRouter } from "vue-router";

const props = defineProps<{ hero: Hero }>();
const router = useRouter();

const selectHero = () => {
  router.push({ name: "hero", params: { id: props.hero.id } });
};
</script>

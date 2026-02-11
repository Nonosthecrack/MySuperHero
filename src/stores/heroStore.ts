import { defineStore } from "pinia";
import { ref } from "vue";
import { searchHeroes, getHeroById, getHeroesByAlignment } from "@/services/api";
import type { Hero } from "@/types/hero";

export const useHeroStore = defineStore("hero", () => {
  const heroes = ref<Hero[]>([]);
  const selectedHero = ref<Hero | null>(null);
  const loading = ref(false);

  const fetchHeroesByName = async (name: string) => {
    loading.value = true;
    heroes.value = await searchHeroes(name);
    loading.value = false;
  };

  const fetchHeroById = async (id: string) => {
    loading.value = true;
    selectedHero.value = await getHeroById(id);
    loading.value = false;
  };

  const fetchHeroesByAlignment = async (alignment: string) => {
    loading.value = true;
    heroes.value = await getHeroesByAlignment(alignment);
    loading.value = false;
  };

  return { heroes, selectedHero, loading, fetchHeroesByName, fetchHeroById, fetchHeroesByAlignment };
});

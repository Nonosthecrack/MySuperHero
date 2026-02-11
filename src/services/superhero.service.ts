import type { SuperHero, SearchResult } from '../types/SuperHero';


export const superheroService = {
  async searchByName(name: string): Promise<SearchResult> {
    try {
      const response = await fetch(`/api/superhero/search/${encodeURIComponent(name)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching hero:', error);
      throw new Error('Erreur lors de la recherche du héros');
    }
  },

  async getHeroById(id: string): Promise<SuperHero> {
    try {
      const response = await fetch(`/api/superhero/${encodeURIComponent(id)}`);
      const data = await response.json();
      
      if (data.response === 'error') {
        throw new Error(data.error);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching hero:', error);
      throw new Error('Erreur lors de la récupération du héros');
    }
  },

  async getPowerstats(id: string) {
    try {
      const response = await fetch(`/api/superhero/${encodeURIComponent(id)}/powerstats`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching powerstats:', error);
      throw error;
    }
  },

  async getBiography(id: string) {
    try {
      const response = await fetch(`/api/superhero/${encodeURIComponent(id)}/biography`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching biography:', error);
      throw error;
    }
  },

  async getAppearance(id: string) {
    try {
      const response = await fetch(`/api/superhero/${encodeURIComponent(id)}/appearance`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching appearance:', error);
      throw error;
    }
  },

  async getWork(id: string) {
    try {
      const response = await fetch(`/api/superhero/${encodeURIComponent(id)}/work`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching work:', error);
      throw error;
    }
  },

  async getConnections(id: string) {
    try {
      const response = await fetch(`/api/superhero/${encodeURIComponent(id)}/connections`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching connections:', error);
      throw error;
    }
  }
};
import axios from "axios";

const API_URL = "https://superheroapi.com/api/";
const API_KEY = import.meta.env.VITE_API_KEY;

export const searchHeroes = async (name: string) => {
  const response = await axios.get(`${API_URL}${API_KEY}/search/${name}`);
  return response.data.results;
};

export const getHeroById = async (id: string) => {
  const response = await axios.get(`${API_URL}${API_KEY}/${id}`);
  return response.data;
};

export const getHeroesByAlignment = async (alignment: string) => {
  const response = await axios.get(`${API_URL}${API_KEY}/all`);
  const allHeroes = response.data;
  return allHeroes.filter((hero: Hero) => hero.biography.alignment === alignment);
};

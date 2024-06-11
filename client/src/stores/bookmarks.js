
import { defineStore } from 'pinia';
import axios from 'axios';

export const useBookmarksStore = defineStore('bookmarks', {
  state: () => ({
    recipes: [],
    drinks: [],
    restaurants: [],
    nutrition: [],
    activeTab: 'recipes',
  }),
  actions: {
    async fetchRecipes() {
      try {
        const response = await axios.get('API_ENDPOINT_FOR_RECIPES');
        this.recipes = response.data;
      } catch (error) {
        console.error('Failed to fetch recipes', error);
      }
    },
    async fetchDrinks() {
      try {
        const response = await axios.get('API_ENDPOINT_FOR_DRINKS');
        this.drinks = response.data;
      } catch (error) {
        console.error('Failed to fetch drinks', error);
      }
    },
    async fetchRestaurants(uuid) {
      try {
        const response = await axios.get(`http://localhost:3001/api/favorite?uuid=${uuid}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch restaurants', error);
      }
    },
    async fetchNutrition() {
      try {
        const response = await axios.get('API_ENDPOINT_FOR_NUTRITION');
        this.nutrition = response.data;
      } catch (error) {
        console.error('Failed to fetch nutrition', error);
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
});

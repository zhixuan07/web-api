
<script setup>
import { ref, onMounted } from 'vue';
import { useBookmarksStore } from '@/stores/bookmarks';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import RestaurantCard from '@/components/RestaurantCard.vue';
const userStore = useUserStore();
const bookmarksStore = useBookmarksStore();
const activeTab = ref('recipes');
const restaurants = ref([]);
const {fetchRecipes, fetchDrinks, fetchRestaurants, fetchNutrition, getRestaurants } = bookmarksStore;

const setTab = async (tab) => {
  activeTab.value = tab;
  switch (tab) {
    case 'recipes':
      fetchRecipes();
      break;
    case 'drinks':
      fetchDrinks();
      break;
    case 'restaurants':
     const response = await axios.get(`http://localhost:3001/api/favorite?uuid=${userStore.getUser.uuid}`);
      restaurants.value = response.data;
      break;
    case 'nutrition':
      fetchNutrition();
      break;
  }
};

onMounted(() => {
  fetchRecipes();
});
</script>

<template>
    <div class="container mx-auto p-4">
      <div role="tablist" class="tabs tabs-boxed">
        <button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'recipes' }" @click="setTab('recipes')">Recipes</button>
        <button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'drinks' }" @click="setTab('drinks')">Drinks</button>
        <button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'restaurants' }" @click="setTab('restaurants')">Restaurants</button>
        <button role="tab" class="tab" :class="{ 'tab-active': activeTab === 'nutrition' }" @click="setTab('nutrition')">Nutrition</button>
      </div>
      <div class="content p-4 border rounded-lg bg-white shadow-md">
        <div v-if="activeTab === 'recipes'">
          <h2 class="text-2xl font-bold mb-4">Recipes</h2>
          <ul class="list-disc list-inside">
            <li v-for="recipe in recipes" :key="recipe.id">{{ recipe.name }}</li>
          </ul>
        </div>
        <div v-if="activeTab === 'drinks'">
          <h2 class="text-2xl font-bold mb-4">Drinks</h2>
          <ul class="list-disc list-inside">
            <li v-for="drink in drinks" :key="drink.id">{{ drink.name }}</li>
          </ul>
        </div>
        <div v-if="activeTab === 'restaurants'">
          <h2 class="text-2xl font-bold mb-4">Restaurants</h2>
          <div v-for="restaurant in restaurants" :key="restaurant.location_id" class="grid grid-cols-2 gap-4">
            <RestaurantCard
              :location_id="restaurant.location_id"
              :name="restaurant.name"
              :rating="restaurant.rating"
              :address="restaurant.address"
              :image="restaurant.photo ? restaurant.photo.images.small.url : null"
              :review="restaurant.num_reviews"
              :align="'horizontal'"
              :deleteFavorite="true"
            />
          </div>
        </div>
        <div v-if="activeTab === 'nutrition'">
          <h2 class="text-2xl font-bold mb-4">Nutrition Information</h2>
          <ul class="list-disc list-inside">
            <li v-for="info in nutrition" :key="info.id">{{ info.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
 
  
  <style>
  /* Add any additional styles if necessary */
  </style>
  
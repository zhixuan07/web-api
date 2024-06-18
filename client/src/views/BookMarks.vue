
<script setup>
import { ref, onMounted } from 'vue';
import { useBookmarksStore } from '@/stores/bookmarks';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import RestaurantCard from '@/components/restaurant/RestaurantCard.vue';
import RecipeCard from '@/components/recipe/RecipeCard.vue';
import DrinkCard from '@/components/drink/DrinkCard.vue';

const userStore = useUserStore();
const bookmarksStore = useBookmarksStore();
const activeTab = ref('recipes');
const restaurants = ref([]);
const recipes = ref([]);
const drinks = ref([]);
const {fetchRecipes, fetchDrinks, fetchRestaurants, fetchNutrition, getRestaurants } = bookmarksStore;

const setTab = async (tab) => {
  activeTab.value = tab;
  switch (tab) {
    case 'recipes':
      const recipes_response = await axios.get(`http://localhost:3004/api/recipe_favourites?uuid=${userStore.getUser.uuid}`);
      recipes.value = recipes_response.data;
      break;
    case 'drinks':
      const drinks_response = await axios.get(`http://localhost:3003/api/drink_favourites?uuid=${userStore.getUser.uuid}`);
      drinks.value = drinks_response.data;
      break;
    case 'restaurants':
     const restaurants_response = await axios.get(`http://localhost:3001/api/restaurant_favourites?uuid=${userStore.getUser.uuid}`);
      restaurants.value = restaurants_response.data;
      break;
    
  }
};


onMounted(async() => {
  const recipes_response = await axios.get(`http://localhost:3004/api/recipe_favourites?uuid=${userStore.getUser.uuid}`);
      recipes.value = recipes_response.data;
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
        <!---------------------------------------------------------------------->
        <div v-if="activeTab === 'recipes'">
          <h2 class="text-2xl font-bold mb-4">Recipes</h2>
          <div v-if="recipes" v-for="recipe in recipes" :key="recipe.idMeal" class="grid grid-row-3 gap-4">
            <RecipeCard
              :recipe="recipe"
              :deleteFavorite="true"
              :align="'horizontal'"
            />
          </div>
          <div v-else>
            <h1> No recipe saved</h1>
          </div>
        </div>
        <!---------------------------------------------------------------------->
        <div v-if="activeTab === 'drinks'">
          <h2 class="text-2xl font-bold mb-4">Drinks</h2>
          <div v-if="drinks" v-for="drink in drinks" :key="drink.idDrink" class="grid grid-row-3 gap-4">
            <DrinkCard
              :drink="drink"
              :deleteFavorite="true"
              :align="'horizontal'"
            />
        </div>
        <div v-else>
          <h1> No drink saved</h1>
        </div>
      </div>
      <!---------------------------------------------------------------------->
        <div v-if="activeTab === 'restaurants'">
          <h2 class="text-2xl font-bold mb-4">Restaurants</h2>
          <div v-if="restaurants!==null" v-for="restaurant in restaurants" :key="restaurant.location_id" class="grid grid-row-2 gap-4">
            <RestaurantCard
              :location_id="restaurant.location_id"
              :name="restaurant.name"
              :rating="restaurant.rating"
              :address="restaurant.address"
              :image="restaurant.image_url"
              :review="restaurant.num_reviews"
              :phone="restaurant.phone"
              :align="'horizontal'"
              :deleteFavorite="true"
              />
          </div>
          <div v-else-if="restaurants ==null">
            <h1> No restaurant saved</h1>
          </div>
        </div>
      
    </div>
    </div>
  </template>
  
 
  
  <style>
  /* Add any additional styles if necessary */
  </style>
  
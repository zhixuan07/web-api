<script setup>
///////////////// Import Modules //////////////////////////////////////////////////////
import axios from 'axios'
import { onMounted, ref } from 'vue'
import RecipeCard from './RecipeCard.vue';
///////////////// Constants //////////////////////////////////////////////////////
const latest_recipes = ref([])
const errorMessage = ref('')
const loading = ref(false)
///////////////// Functions //////////////////////////////////////////////////////
// Fetch latest recipes from the server API
async function fetchLatestRecipes () {
    try {
      const response = await axios.get(`http://localhost:3004/api/latest_recipes`, {
      })
      latest_recipes.value = response.data.meals.slice(0, 5)
      
    } catch (error) {
      console.error(error)
      errorMessage.value = 'Failed to fetch latest_recipes'
    } finally {
      loading.value = false // Set loading to false after the request completes
    }
  
}
///////////////// Initialized //////////////////////////////////////////////////////

onMounted(async() => {
  await fetchLatestRecipes()
  console.log(latest_recipes.value)
})

</script>
<template>
  <div class="px-10 py-4">
    <h1 class="font-bold text-2xl mb-2">Latest Recipes</h1>
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    <div v-else class="flex flex-row w-full gap-4">
      <div
        v-for="recipe of latest_recipes"
        :key="recipe.idMeal"
        class="card w-1/5 bg-base-100 border"
      >
        <RecipeCard :recipe="recipe" :align="'vertical'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

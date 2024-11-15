<script setup>
///////////////// Import Modules //////////////////////////////////////////////////////
import { onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import RecipeCard from '@/components/recipe/RecipeCard.vue';
///////////////// Constants //////////////////////////////////////////////////////
const route = useRoute()
const recipes = ref([])
const param = route.params.name
///////////////// Functions //////////////////////////////////////////////////////
async function searchRecipeByName() {
  try {
    const response = await axios.get('http://localhost:3004/api/search_recipes', {
      params: {
        name: param
      }
    })
    recipes.value = response.data.meals
  } catch (error) {
    console.error(error)
  }
}
///////////////// Initialized //////////////////////////////////////////////////////
onMounted(async() => {
  await searchRecipeByName();
})
</script>

<template>
  <div>
    <div class="flex justify-center m-5">
        <h1 class="text-2xl font-semibold"> Related Recipes to {{ param }}</h1>
    </div>
    <div class="grid grid-cols-5 w-full gap-4 px-10">
      <div
        v-if="recipes"
        v-for="recipe of recipes"
        :key="recipe.idMeal"
        class="bg-base-100 border"
      >
        <RecipeCard :recipe="recipe" :align="'vertical'" />
      </div>
      <div v-else class="flex justify-center">
          <h1>No Recipe Found</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

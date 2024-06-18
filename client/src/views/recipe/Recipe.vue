<script setup>
///////////////// Import //////////////////////////////////////////////////////
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LatestRecipe from '@/components/recipe/LatestRecipe.vue'
///////////////// Constants //////////////////////////////////////////////////////
const searchInput = ref(null)
const router = useRouter()
///////////////// Constants //////////////////////////////////////////////////////
async function searchRecipe() {
  if (searchInput.value) {
    await router.push({ name: 'recipes', params: { name: searchInput.value } })
  } else {
    alert('Please enter a recipe name')
  }
}
</script>

<template>
  <div class="text-3xl flex justify-center m-10 font-bold">
    <h1
      class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-6xl font-black"
    >
      Find Recipes
      <i class="fa-solid fa-utensils"></i>
    </h1>
  </div>

  <div class="flex flex-row justify-center w-full gap-3">
    <input
      type="text"
      placeholder="Search recipe name"
      class="input input-bordered w-full max-w-xs"
      v-model="searchInput"
    />
    <button
      @click="searchRecipe"
      class="block ml-18 px-6 py-2 w-40 m bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 sm:text-sm"
    >
      Search
    </button>
  </div>

  <div>
    <LatestRecipe />
  </div>
</template>

<style lang="scss" scoped></style>

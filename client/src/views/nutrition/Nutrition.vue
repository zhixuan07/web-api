<script setup>
import { ref } from 'vue'
import NutritionList from '@/components/nutrition/NutritionList.vue'
import axios from 'axios';

const nutritions = ref()
const searchInput = ref('')

async function searchNutrition(){
 const response = await axios.post('http://localhost:3002/api/nutrition', {
   query: searchInput.value
 })
 nutritions.value = response.data
 
}
</script>

<template>
  <div class="px-10 mt-10">
    <div class="text-3xl flex justify-center m-10 font-bold">
      <h1
        class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-6xl font-black"
      >
        Find Nutrition 
        <i class="fa-solid fa-utensils"></i>
      </h1>
    </div>
    <div class="flex flex-row justify-center w-full gap-3">
      <textarea
        type="text"
        placeholder="Enter a query"
        class="textarea textarea-bordered textarea-lg w-full"
        v-model="searchInput"
      ></textarea>
      <button
        @click="searchNutrition"
        class="block ml-18 px-6 py-2 w-40 m bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 sm:text-sm"
      >
        Search
      </button>
    </div>

    <div class="px-10">
      <NutritionList v-if="nutritions" :nutritions="nutritions" />
    </div>
   
  </div>
</template>

<style lang="scss" scoped></style>

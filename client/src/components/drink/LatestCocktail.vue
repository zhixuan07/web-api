<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import DrinkCard from '@/components/drink/DrinkCard.vue';

const latest_cocktails = ref([])
const errorMessage = ref('')
const loading = ref(false)

// Fetch latest drinks from the server API
const fetchLatestCocktails = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/api/latest_cocktails`, {
      })
      latest_cocktails.value = response.data.drinks.slice(0, 5)
      
    } catch (error) {
      console.error(error)
      errorMessage.value = 'Failed to fetch latest_cocktails'
    } finally {
      loading.value = false // Set loading to false after the request completes
    }
  
}

onMounted(async() => {
  await fetchLatestCocktails()
  
})

</script>
<template>
  <div class="px-10 py-4">
    <h1 class="font-bold text-2xl mb-2">Latest Cocktails</h1>
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    <div v-else class="flex flex-row w-full gap-4">
      <div
        v-for="drink of latest_cocktails"
        :key="drink.idDrink"
        class="card w-1/5 bg-base-100 border"
      >
        <DrinkCard :drink="drink" :align="'vertical'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
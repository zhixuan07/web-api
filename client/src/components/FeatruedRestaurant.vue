<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import RestaurantCard from './RestaurantCard.vue';
const loading = ref(false)
const klRestaurants = ref([])
const errorMessage = ref('')
const fetchKlRestaurants = async () => {
loading.value = true // Set loading to true before making the request
  // Make the API request to fetch restaurants using the obtained location
  try {
    const response = await axios.get(`http://localhost:3000/api/restaurants`, {
      params: {
        latitude: '3.139',
        longitude: '101.6869',
        limit: '5',
        currency: 'MYR',
        distance: '1000',
        open_now: 'false',
        lunit: 'km',
        lang: 'en_US',
        min_rating:'5'
      }
    })
    klRestaurants.value = response.data.data
    klRestaurants.value = klRestaurants.value.filter((restaurant) => restaurant.name)
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to fetch restaurants'
  }finally {
      loading.value = false // Set loading to false after the request completes
    }
}
onMounted(() => {
  fetchKlRestaurants()
})
</script>
<template>
  <div class="px-10 py-4">
    <h1 class="font-bold text-2xl mb-2">Featured Restaurant Near Kuala Lumpur</h1>
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    <div v-else class="flex flex-row w-full gap-4">
      <div
        v-for="restaurant of klRestaurants"
        :key="restaurant.location_id"
        class="card w-1/5 bg-base-100 border"
      >
      <RestaurantCard
          :name="restaurant.name"
          :rating="restaurant.rating"
          :address="restaurant.address"
          :image="restaurant.photo ? restaurant.photo.images.small.url : null"
          :review="restaurant.num_reviews"
          :align="'vertical'">
        </RestaurantCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

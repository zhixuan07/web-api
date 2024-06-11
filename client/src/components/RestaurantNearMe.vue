<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import RestaurantCard from './RestaurantCard.vue'
const restaurants = ref([])
const location = ref(null)
const errorMessage = ref('')
const loading = ref(false)

const getLocation = () => {
  loading.value = true
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    errorMessage.value = 'Geolocation is not supported by this browser.'
  }
}

const onSuccess = (position) => {
  location.value = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }

  // Call the API to fetch restaurants using the obtained location
  fetchRestaurants()
}

const onError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage.value = 'User denied the request for Geolocation.'
      break
    case error.POSITION_UNAVAILABLE:
      errorMessage.value = 'Location information is unavailable.'
      break
    case error.TIMEOUT:
      errorMessage.value = 'The request to get user location timed out.'
      break
    case error.UNKNOWN_ERROR:
      errorMessage.value = 'An unknown error occurred.'
      break
  }
}

const fetchRestaurants = async () => {
  if (location.value) {
    // Make the API request to fetch restaurants using the obtained location
    try {
      const response = await axios.get(`http://localhost:3001/api/restaurants`, {
        params: {
          latitude: location.value.latitude,
          longitude: location.value.longitude,
          limit: '5',
          currency: 'MYR',
          distance: '1000',
          open_now: 'false',
          lunit: 'km',
          lang: 'en_US',
          min_rating: '4'
        }
      })
      restaurants.value = response.data.data
      restaurants.value = restaurants.value.filter((restaurant) => restaurant.name)
    } catch (error) {
      console.error(error)
      errorMessage.value = 'Failed to fetch restaurants'
    } finally {
      loading.value = false // Set loading to false after the request completes
    }
  }
}

onMounted(() => {
  getLocation()
})
</script>
<template>
  <div class="px-10 py-4">
    <h1 class="font-bold text-2xl mb-2">Featured Restaurant Near Me</h1>
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    <div v-else class="flex flex-row w-full gap-4">
      <div
        v-for="restaurant of restaurants"
        :key="restaurant.location_id"
        class="card w-1/5 bg-base-100 border"
      >
        <RestaurantCard
          :location_id="restaurant.location_id"
          :name="restaurant.name"
          :address="restaurant.address"
          :align="'vertical'"
        >
        </RestaurantCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

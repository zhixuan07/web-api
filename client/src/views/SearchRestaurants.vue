<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter,useRoute } from 'vue-router';
import RelatedRestaurants from '@/components/RelatedRestaurants.vue'
const location = ref(null)
const restaurants = ref()
const route = useRoute()
const loading = ref(false)  
const param = route.params.address
const errorMessage = ref('')

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
    loading.value = true
    // Make the API request to fetch restaurants using the obtained location
    try {
      const response = await axios.get(`http://localhost:3001/api/restaurants`, {
        params: {
          latitude: location.value.latitude,
          longitude: location.value.longitude,
          limit: '10',
          currency: 'MYR',
          distance: '1000',
          open_now: 'false',
          lunit: 'km',
          lang: 'en_US',
          min_rating:'4'
        }
      })
      restaurants.value = response.data.data
      restaurants.value = restaurants.value.filter(restaurant => restaurant.name)
      
    } catch (error) {
      console.error(error)
      errorMessage.value = 'Failed to fetch restaurants'
    } finally {
      loading.value = false // Set loading to false after the request completes
    }
  }
}
const getGeoCoder = async () => {
  const response = await axios.get(`http://localhost:3001/api/geocode`, {
    params: {
      address: param
    }
  })
  location.value = {
    latitude: response.data.results[0].geometry.location.lat,
    longitude: response.data.results[0].geometry.location.lng
  }
  console.log(location.value.latitude)
  console.log(response.data.results[0].geometry.location.lat)
  fetchRestaurants()
}

onMounted(()=>{
    getGeoCoder()
})

</script>

<template>
    <div>
       <RelatedRestaurants :location="param" :restaurant="restaurants"></RelatedRestaurants>
    </div>
</template>



<style lang="scss" scoped>

</style>
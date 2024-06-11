<script setup>
///////////////// Import Modules //////////////////////////////////////////////////////
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import FeatruedRestaurant from '@/components/FeatruedRestaurant.vue'
import RestaurantNearMe from '@/components/RestaurantNearMe.vue'
///////////////// Fucntion //////////////////////////////////////////////////////
const searchInput = ref('')
const router = useRouter()


////////////// Function //////////////////////////////////////////////////////////
const searchRestaurant = async () => {
  if(searchInput.value){
    await router.push({name: 'restaurants', params: {address: searchInput.value}})
  }else{
    alert('Please enter a address or city name to search for restaurants')
  }
}
const addToFavourite = () => {
  alert('Added to Favourite')
}

</script>

<template>
  <div>
    <div class="text-3xl flex justify-center m-10 font-bold">
      <h1
        class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-6xl font-black"
      >
        Find Place to Eat 
        <i class="fa-solid fa-utensils"></i>
      </h1>
    </div>

    <div class="flex flex-row justify-center w-full gap-3">
     
        <input type="text" placeholder="Search address or city name" class="input input-bordered w-full max-w-xs" v-model="searchInput"/>
          <button
            @click="searchRestaurant"
            class="block ml-18 px-6 py-2 w-40 m bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 sm:text-sm"
          >
            Search
          </button>
        </div>
      
    </div>
    <div class="p-10" >
        <RestaurantNearMe />
        <FeatruedRestaurant />
    </div> 
    

   

</template>

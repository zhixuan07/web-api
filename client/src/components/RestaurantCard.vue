<script setup>
import StarRating from './StarRating.vue'
const props = defineProps({
  name: {type: String},
  address: {type: String},
  phone: {type: String},
  image:{type: String},
  website: {type: String},
  rating: {type: String},
  review: {type: String},
  css : {type: String},
  align: {type: String}
  
})

const addToFavourite = async ()=>{

}
</script>

<template>
  <div v-if="props.align === 'horizontal'" class="bg-white shadow-md rounded-md">
    <div :class="props.css ? props.css :'flex flex-row gap-3'">
      <div>
        <img
          v-if="props.image"
          :src="props.image"
          alt="restaurant image"
          class="w-48 h-48 object-cover"
        />
        <img
          v-else
          src="https://via.placeholder.com/150"
          alt="restaurant image"
          class="w-full h-48 object-cover"
        />
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold pl-2">{{ props.name }}</h1>
        <div class="flex flex-row gap-2 items-center pl-2" v-if="props.rating">
          <StarRating :rating="props.rating" />
          <p class="text-gray-500 text-sm">{{ props.rating }}</p>
        </div>
        <div class="flex flex-row gap-2 items-center pl-2" v-else>
        
          <p class="text-gray-500 text-sm">No Rating</p>
        </div>


        <div class="flex justify-start items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="text-gray-500 text-sm">{{ props.address }}</p>
        </div>
        <div class="flex justify-start items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clip-rule="evenodd"
            />
          </svg>

          <p v-if="props.phone" class="text-gray-500">{{ props.phone }}</p>
          <p v-else class="text-gray-500">N/A</p>
        </div>
        <div class="flex justify-start items-center gap-2" v-if="props.website">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <a  :href="props.website" target="_blank">View Website</a>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="props.align ==='vertical'" >
    
        <figure class="relative">
          <img
            v-if="props.image"
            :src="props.image"
            alt="restaurant image"
            class="w-full h-80 object-cover"
          />
          <img
            v-else
            src="https://via.placeholder.com/150"
            alt="restaurant image"
            class="w-full h-90 object-cover"
          />
          <div class="card-actions absolute top-0 right-0 p-2">
            <button class="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
             
            </button>
          </div>
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ props.name }}</h2>
          <StarRating :rating="props.rating" :review="props.review"/>
        </div>
    </div>

</template>

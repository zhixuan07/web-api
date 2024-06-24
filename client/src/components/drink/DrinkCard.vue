<script setup>
import axios from 'axios'

import { Teleport, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import DrinkModal from '../modals/DrinkModal.vue'

const isOpen = ref(false)
const useUser = useUserStore()

const props = defineProps({
  drink: Object,
  deleteFavorite: Boolean,
  align: String
})

const openModal = () => {
  isOpen.value = true
  document.body.classList.add('overflow-hidden')
}

const closeModal = () => {
  isOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

async function addToFavourite(props) {
  try {
    if (!useUser.isAuthenticated) {
      alert('Please login to add to Favourite')
      return
    }
    const response = await axios.post('http://localhost:3003/api/drink_favourite', {
      uuid: useUser.getUser.uuid,
      idDrink: props.drink.idDrink,
      strDrink: props.drink.strDrink,
      strInstructions: props.drink.strInstructions,
      strDrinkThumb: props.drink.strDrinkThumb,
      strCategory: props.drink.strCategory,
      strIngredients: props.drink
    })
    if (response.status === 200) {
      alert('Added to Favourite')
    }
  } catch (error) {
    if (error.response.status === 400) {
      alert('Already in Bookmark')
    } else {
      alert('Failed to add to Favourite')
    }
  }
}
async function deleteFavorite(props) {
  try {
    const response = await axios.delete(`http://localhost:3003/api/drink_favourite`, {
      params: {
        idMeal: props.drink.idDrink,
        uuid: useUser.getUser.uuid
      }
    })

    if (response.status === 200) {
      alert(response.data.message)
    } else {
      alert(response.data.error)
    }
  } catch (error) {
    alert('Failed to delete')
    console.error('Error deleting favorite:', error)
  }
  window.location.reload()
}
</script>

<template>
  <div>
    <div v-if="props.align == 'vertical'">
      <figure class="relative">
        <img
          v-if="props.drink.strDrinkThumb"
          :src="props.drink.strDrinkThumb"
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
          <button class="btn" @click="addToFavourite(props)">
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
        <h2 class="card-title">{{ props.drink.strDrink }}</h2>
        <button @click="openModal" class="btn">View drink</button>
      </div>

      <Teleport to="body">
        <div
          v-if="isOpen"
          class="fixed inset-0 flex items-center justify-center h-full bg-gray-400 bg-opacity-50"
        >
          <DrinkModal
            :drink_id="props.drink.idDrink"
            :drink_name="props.drink.strDrink"
            :drink_instruction="props.drink.strInstructions"
            :drink_ingredient="props.drink"
            :strMealThumb="props.drink.strDrinkThumb"
            :drink_category="props.drink.strCategory"
            @close="closeModal"
          />
        </div>
      </Teleport>
    </div>

    <div v-if="props.align === 'horizontal'" class="bg-white shadow-md rounded-md">
      <div :class="props.css ? props.css : 'flex flex-row gap-3'">
        <div>
          <img
            v-if="props.drink.strDrinkThumb"
            :src="props.drink.strDrinkThumb"
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
        <div class="flex flex-col gap-2 relative w-full">
          <h1 class="text-2xl font-bold pl-2">{{ props.drink.strDrink }}</h1>

          <div>
            <button @click="openModal" class="btn">View drink</button>
          </div>
          <div class="absolute top-1/2 right-1" v-if="props.deleteFavorite">
            <button @click="deleteFavorite(props)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0,0,256,256"
              >
                <g
                  fill="#C41919"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <g transform="scale(8.53333,8.53333)">
                    <path
                      d="M13,3c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-5.98633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5.98633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805zM6,8v16c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-16z"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Teleport to="body">
        <div
          v-if="isOpen"
          class="fixed inset-0 flex items-center justify-center h-full bg-gray-400 bg-opacity-50"
        >
          <DrinkModal
            :drink_id="props.drink.idDrink"
            :drink_name="props.drink.strDrink"
            :drink_instruction="props.drink.strInstructions"
            :drink_ingredient="props.drink.strIngredients"
            :strMealThumb="props.drink.strDrinkThumb"
            :drink_category="props.drink.strCategory"
            @close="closeModal"
          />
        </div>
      </Teleport>
    </div>
  </div>
</template>
<script setup>
import { computed } from '@vue/reactivity'
import { ref } from 'vue'

const drink = defineProps({
  drink_id: String,
  drink_name: String,
  drink_category: String,
  drink_image: String,
  drink_instruction: String,
  drink_ingredient: Object
})
defineEmits('close')
</script>

<template>
  <div class="max-w-2xl h-3/5 p-6 bg-white rounded-md shadow-xl overflow-auto">
    <div class="flex items-center justify-between p-3">
      <h3 class="text-2xl">{{ drink.drink_name }}</h3>

      <svg
        @click="$emit('close')"
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8 text-red-900 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div class="mt-3 p-4">
      <h2 class="text-xl font-semibold">Instructions</h2>
      <h2>{{ drink.drink_instruction }}</h2>
    </div>

    <div class="flex flex-row justify-start p-4 gap-10 mt-2">
      <div class="mr-3">
        <h2 class="text-xl font-semibold">Ingredients</h2>
        <ul>
          <template v-for="(el, ind) of new Array(20)">
            <li v-if="drink.drink_ingredient[`strIngredient${ind + 1}`]">
              {{ ind + 1 }} : {{ drink.drink_ingredient[`strIngredient${ind + 1}`] }}
            </li>
          </template>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-semibold">Measures</h2>
        <ul>
          <template v-for="(el, ind) of new Array(20)">
            <li v-if="drink.drink_ingredient[`strMeasure${ind + 1}`]">
              {{ drink.drink_ingredient[`strMeasure${ind + 1}`] }}
            </li>
          </template>
        </ul>
      </div>
    </div>

    <div class="mt-5 flex justify-end">
      <button
        @click="$emit('close')"
        class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
      >
        Close
      </button>
      
    </div>
  </div>
</template>
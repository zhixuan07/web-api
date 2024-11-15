<script setup>
///////////////// Import Modules //////////////////////////////////////////////////////
import { onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import DrinkCard from '@/components/drink/DrinkCard.vue';
///////////////// Constants //////////////////////////////////////////////////////
const route = useRoute()
const drinks = ref([])
const param = route.params.name
///////////////// Functions //////////////////////////////////////////////////////
async function searchDrinkName() {
  try {
    const response = await axios.get('http://localhost:3003/api/search_cocktails', {
      params: {
        name: param
      }
    })
    drinks.value = response.data.drinks
  } catch (error) {
    console.error(error)
  }
}
///////////////// Initialized //////////////////////////////////////////////////////
onMounted(async() => {
  await searchDrinkName();
})
</script>

<template>
  <div>
    <div class="flex justify-center m-5">
        <h1 class="text-2xl font-semibold"> Related drinks to {{ param }}</h1>
    </div>
    <div class="grid grid-cols-5 w-full gap-4 px-10">
      <div
        v-for="drink of drinks"
        :key="drink.idDrink"
        class="bg-base-100 border"
      >
        <DrinkCard :drink="drink" :align="'vertical'"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
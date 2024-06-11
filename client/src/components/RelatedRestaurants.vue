<script setup>
import RestaurantCard from './RestaurantCard.vue'

const props = defineProps({
  location: { type: String },
  restaurant: { type: Object }
})
</script>
<template>
  <div class="px-20 py-10">
    <h1 class="text-2xl font-bold mb-4">Related Restaurant in {{ props.location }}</h1>
    <div class="grid grid-cols-2 gap-4">
      <div v-for="restaurant of props.restaurant" :key="restaurant.location_id">
        <RestaurantCard
          :name="restaurant.name"
          :rating="restaurant.rating"
          :address="restaurant.address"
          :image="restaurant.photo ? restaurant.photo.images.small.url : null"
          :review="restaurant.num_reviews"
          :phone="restaurant.phone"
          :align="'horizontal'"
        >
        </RestaurantCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

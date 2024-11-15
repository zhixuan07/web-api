<script setup>
const props = defineProps({
  nutritions: Object
})
</script>
<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Calories</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="nutritions of props.nutritions.foods" :key="nutritions.food_name">
          <th><img :src="nutritions.photo.thumb" /></th>
          <th>{{ nutritions.food_name }}</th>
          <th>{{ nutritions.serving_qty }}</th>
          <th>{{ nutritions.serving_unit }}</th>
          <th>{{ nutritions.nf_calories }}</th>
          <th>{{ nutritions.serving_weight_grams }}g</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>

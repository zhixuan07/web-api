<!-- src/components/StarRating.vue -->
<template>
    <div class="star-rating">
      <span v-for="star in 5" :key="star" class="star">
        <i class="fas" :class="star <= Math.round(rating) ? 'fa-star' : 'fa-star-o'"></i>
      </span>
      <p>{{ review }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rating: {
        type: String,
        required: true,
      },
      review:{
        type: String,
        required: true,
      }
    },
  };
  </script>
   
  <style scoped>
  .star-rating {
    display: flex;
    align-items: center;
  }
  
  .star {
    color: gold;
    margin-right: 5px;
  }
  
  .fa-star-o {
    color: #ae3c3c;
  }
  </style>
  
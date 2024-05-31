<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api')
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

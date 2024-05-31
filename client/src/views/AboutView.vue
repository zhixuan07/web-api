<template>
  <div class="about">
    <h1>This is about Savor Spot /(>w<)/</h1>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search for a restaurant..." class="search-bar" />
      <button @click="search" class="search-button">Search</button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  
  .search-bar {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .search-button {
    padding: 10px 15px;
    margin-left: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
}
</style>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      console.log('Searching for:', this.searchQuery);
      // Implement your search logic here
      // For example, you can send the search query to an API or filter a list of restaurants
    }
  }
};
</script>

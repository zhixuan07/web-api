<script setup>
// todo: Create hero section about the website description
</script>

<template>
   <section class="hero bg-cover bg-center" style="background-image: url('path-to-your-hero-image.jpg');">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-lg">
          <h1 class="mb-5 text-5xl font-bold">Welcome to Foodie</h1>
          <p class="mb-5">Discover the best recipes, drinks, restaurants, and nutrition tips all in one place.</p>
          <RouterLink to="/recipe" class="btn btn-primary">Get Started</RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-10 bg-base-200">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-10">Our Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h3 class="card-title">Recipes</h3>
              <p>Find the best recipes to cook your favorite meals.</p>
              <RouterLink to="/recipe" class="btn btn-primary">Explore Recipes</RouterLink>
            </div>
          </div>
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h3 class="card-title">Drinks</h3>
              <p>Discover refreshing drinks and cocktails.</p>
              <RouterLink to="/drink" class="btn btn-primary">Explore Drinks</RouterLink>
            </div>
          </div>
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h3 class="card-title">Restaurants</h3>
              <p>Find the best places to dine out.</p>
              <RouterLink to="/restaurant" class="btn btn-primary">Find Restaurants</RouterLink>
            </div>
          </div>
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h3 class="card-title">Nutrition</h3>
              <p>Get the best nutrition tips and advice.</p>
              <RouterLink to="/nutrition" class="btn btn-primary">Learn More</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<style scoped>
.hero {
  height: 50vh;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
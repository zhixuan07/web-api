<script setup>
import {ref} from 'vue'
const mobileMenuOpen = ref(false);
import sideBar from './sideBar.vue';

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    console.log(mobileMenuOpen.value);
};

</script>

<template>
     <div :class="mobileMenuOpen ? 'flex' :'hidden'" class="absolute top-0 left-0">
            <sideBar class="sm:hidden" />
      </div>
    <div class="  flex overflow-x-auto h-fit bg-slate-100 sticky top-0">
        <div class="sm:hidden ">
      <button @click="toggleMobileMenu" class=" p-2">
        <!-- You can use a burger/hamburger icon here -->
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
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
     
    </div>
        <div>
            navbar
        </div>
    </div>
</template>
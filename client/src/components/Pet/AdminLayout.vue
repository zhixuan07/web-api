<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
const mobileMenuOpen = ref(false)
const router = useRouter()
const userStore = useUserStore()
const toggleNav = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
const logout = () => {
  localStorage.removeItem('token')
  router.push('/admin/login')
}
</script>

<template>
  <div class="flex">
    <div>
      <aside
        class="bg-[#1c212c] h-screen w-64 hidden sm:flex flex-col items-center pt-5 pb-2 space-y-7 relative"
      >
        <div class="w-full pr-3 pl-4 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
          <div
            class="font-QuicksandMedium pl-4 text-gray-400/60 flex gap-2 items-center text-[15px] uppercase"
          >
            <img
              src="../../assets/Pet/pet_logo.svg"
              alt="logo"
              class="h-10 w-10 text-amber-700 fill-current"
            />
            PetCare Admin
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <router-link to="/admin/products" class="font-QuicksandMedium">Products</router-link>
            </div>
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <router-link class="font-QuicksandMedium" to="/admin/appointments"
                >Appointment</router-link
              >
            </div>
          </div>
        </div>

        <!-- menu items -->
        <div class="w-full pr-3 pl-4 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
          <div class="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase">
            Profile
          </div>

          <div class="w-full flex items-center gap-x-1.5 group select-none">
            <div
              class="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"
              ></div>
            </div>
            <div
              class="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <span class="font-QuicksandMedium" @click="logout">log out</span>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <div class="flex-grow h-screen overflow-x-auto">
      <div class="sm:hidden w-screen sticky top-0 bg-[#1c212c]">
        <div @click="toggleNav" class="flex justify-start items-center h-10 md:hidden">
          <button type="button" class="text-white ml-4 focus:outline-none">
            <svg viewBox="0 0 24 24" class="w-7 h-7 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
        <nav :class="mobileMenuOpen ? 'flex-col' : 'hidden'">
          <div class="w-full flex items-center gap-x-1.5 group select-none">
           
          </div>
          
        </nav>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

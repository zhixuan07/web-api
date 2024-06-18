<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const errmsg = ref(null);
const userStore = useUserStore();
const showPassword = ref(false);

const user = {
  email: "",
  password: "",
};

async function login(ev) {
  ev.preventDefault();
  const response = await axios.post("http://localhost:3000/api/login", {
    email: user.email,
    password: user.password,
  });
  if(response.status === 200){
    const {token, user} = response.data
    userStore.setToken(token)
    userStore.setUser(user)
    router.push('/restaurant')
  }else{
    alert(response.data.error)
  }
}
</script>

<template>
    <div class="bg-white shadow-xl rounded px-8 py-7 pt-4 pb-8 w-80">
      <form @submit="login">
        <div class="mb-7 flex justify-center">
          <h1
            class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black"
          >
            Login
          </h1>
        </div>
        <div class="mb-8">
          <label class="block mb-2 sm:text-sm">Email</label>
          <input
            class="rounded shadow appearance-none border px-2 py-2 w-full"
            type="email"
            placeholder="Email"
            v-model="user.email"
          />
        </div>
  
        <div class="mb-8">
          <label class="block mb-2 sm:text-sm">Password</label>
          
          <input
            v-if="showPassword"
            class="rounded border shadow appearance-none px-2 py-2 w-full"
            type="text"
            placeholder="Password"
            v-model="user.password"
          />
          <input
          v-else="!showPassword"
            class="rounded border shadow appearance-none px-2 py-2 w-full"
            type="password"
            placeholder="Password"
            v-model="user.password"
          />
  
          <p class="text-red-700 text-sm mt-1" v-if="errmsg">{{ errmsg }}</p>
        </div>
  
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              name="show password"
              type="checkbox"
              id="showPassword"
              v-model="showPassword"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-200 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Show Password</label>
          </div>
        </div>
  
        <div class="w-full flex flex-col items-center mt-2">
          <button
            type="submit"
            class="block ml-18 px-6 py-2 w-48 mb-4 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 sm:text-sm"
          >
            Login
          </button>
          
        </div>
      </form>
      <div class="mt-2 text-sm">
        <p>
          Don't have an account?
          <span
            ><router-link to="/register" class="text-blue-700 hover:text-blue-400"
              >Register</router-link
            >
          </span>
        </p>
       
      </div>
    </div>
  </template>
  

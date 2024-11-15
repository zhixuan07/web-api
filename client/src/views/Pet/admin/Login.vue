<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {useUserStore} from '../../../stores/user'
import axios from "axios";
const router = useRouter();
const errmsg = ref(null);
const userStore = useUserStore();
const admin = {
    email: '',
    password: '',
   
}

async function login(ev) {
  ev.preventDefault();

  try {
    const response = await axios.post("http://localhost:3000/api/login", {
      email: admin.email,
      password: admin.password,
    });


    if (response.status === 200) {
      const { token, user } = response.data;
      userStore.setToken(token);
      router.push('/admin/products');
    } else {
      alert(response.data.error || 'Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred while trying to log in. Please check your credentials and try again.');
  }
}

</script>
<template>
    
        <div class="flex flex-col items-center justify-center h-full">
            <h1 class="text-5xl text-white font-bold mb-4">PetWeb</h1>
            <h2 class="text-2xl text-white font-bold mb-8">Admin Login</h2>

            <form class="bg-white p-8 rounded-lg shadow-md" @submit="login">
                <div class="mb-4">
                    <label class="text-gray-800 block mb-2"
                        >Email:</label
                    >
                    <input
                        type="text"
                        v-model="admin.email"
                        name="email"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="text-gray-800 block mb-2"
                        >Password:</label
                    >
                    <input
                        type="password"
                        v-model="admin.password"
                        name="password"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="bg-theme text-white  bg-red-400 text-lg font-semibold py-2 px-4 rounded-lg hover:bg-opacity-80"
                >
                    Login
                </button>
                <p class="text-red-500 text-sm mt-2">{{errmsg}}</p>
            </form>
        </div>
   
</template>

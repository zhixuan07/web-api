<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const errmsg = ref(null)
const user = {
  username:'',
  email:'',
  password:'',
  password_confirmation:''
};

async function register (ev){
  ev.preventDefault()
  const response = await axios.post('http://localhost:3000/api/register',
  {
    username: user.username,
    email: user.email,
    password: user.password,
  })
  console.log(response.status)
  if(response.status === 201){
    alert(response.data.message)
    router.push('/login')
  }else{
    errmsg.value = response.data.error
  }
}

</script>
<template>
  <div class="bg-white shadow-md  rounded px-8 py-5 pt-4 pb-5 w-80 sm:p-12 mx-auto">
    <form @submit.prevent="register">
      <div class="mb-7 flex justify-center">
        <h1
          class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-black"
        >
          Register
        </h1>
      </div>
      <div class="mb-3">
        <label class="block mb-2 sm:text-sm">Name</label>
        <input
          class="rounded shadow appearance-none border px-2 py-2 w-full"
          type="text"
          placeholder="Name"
          v-model="user.username"
        />
      </div>
      
      <div class="mb-3">
        <label class="block mb-2 sm:text-sm">Email</label>
        <input
          class="rounded shadow appearance-none border px-2 py-2 w-full"
          type="email"
          placeholder="Email"
          v-model="user.email"
        />
      </div>
      <div class="mb-3">
        <label class="block mb-2 sm:text-sm">Password</label>
        <input
          class="rounded border shadow appearance-none px-2 py-2 w-full"
          type="password"
          placeholder="Password"
          v-model="user.password"
        />
        <p class="text-red-700 text-sm" v-if="errmsg">{{ errmsg }}</p>
      </div>

      <div class="mb-3">
        <label class="block mb-2 sm:text-sm">Password Confirmation</label>
        <input
          class="rounded border shadow appearance-none px-2 py-2 w-full"
          type="password"
          placeholder="Password-confirmation"
          v-model="user.password_confirmation"
        />
        <p class="text-red-700 text-sm" v-if="errmsg">{{ errmsg }}</p>
      </div>

      <div class="w-full flex flex-col items-center">
        <button
          class="block ml-18 px-6 py-2 w-48 mb-4 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 sm:text-sm"
          
        >
          Register
        </button>
       
      </div>
    </form>

    <div class="mt-3 text-sm">
      <p>
        Already have account?
        <span
          ><router-link to="/login" class="text-blue-700 hover:text-blue-400">Login</router-link>
        </span>
      </p>
     
    </div>
  </div>
</template>

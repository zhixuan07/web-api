<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

// Create the service object
const service = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  pet: '',
}

const proceedCheckout = () => {

}
</script>

<template>
  <div class="flex justify-center w-screen h-screen">
    <div class="shadow-lg h-fit px-20 py-10">
        <div>
            <label>Customer Name</label>
            <input
                type="text"
                v-model="service.name"
                class="bg-white py-2 px-1 rounded-lg border"
                required />
            <label>Customer Email</label>
            <input
                type="email"
                v-model="service.email"
                class="bg-white py-2 px-1 rounded-lg border"
                required />
            <label>Customer Phone</label>
            <input
                type="tel"
                v-model="service.phone"
                class="bg-white py-2 px-1 rounded-lg border"
                required />
        </div>
      <div class="">
        <label class="label"> Type of Service </label>
        <select class="select select-bordered" v-model="service.service">
          <option>Pick one</option>
          <option value="Bath and brush">Bath and Brush-RM50</option>
          <option value="Haircut and Styling">Haircut and Styling-RM65</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label>Date</label>
        <input
          type="date"
          id="expiryDate"
          v-model="service.date"
          class="bg-white py-2 px-1 rounded-lg border"
          required
        />
        <label>Time</label>
        <input
          type="time"
          id="expiryDate"
          v-model="service.time"
          class="bg-white py-2 px-1 rounded-lg border"
          required
        />
        <label>Type of pet</label>
        <select class="bg-white py-2 px-2 rounded-lg border" v-model="service.pet">
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        
        <button class="btn btn-secondary mt-3" @click="proceedCheckout">Submit</button>
      </div>
    </div>
  </div>
</template>

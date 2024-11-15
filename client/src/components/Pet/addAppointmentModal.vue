<script setup>
import axios from 'axios'
import { ref } from 'vue';
const nameError = ref('')
const emailError = ref('')
const phoneError = ref('')
function stripHTMLTags(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, '')
}
const appointment = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  service: '',
  pet: ''
}

defineEmits('close')

async function add ()  {
  try {
    const inputValid = validateAll()
    if (!inputValid) {

      return
    }


    const sanitizedAppointment = {
      name: stripHTMLTags(appointment.name),
      email: stripHTMLTags(appointment.email),
      phone: stripHTMLTags(appointment.phone),
      date: stripHTMLTags(appointment.date),
      time: stripHTMLTags(appointment.time),
      service: stripHTMLTags(appointment.service),
      pet: stripHTMLTags(appointment.pet)
    }

    await axios.post('http://localhost:3003/api/appointment', sanitizedAppointment).then((response) => {
      if (response.status === 200) {
        $emit('close')
      } else {
        console.log(response)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
function validateUsername(username) {
  const regex = /^[a-zA-Z0-9]*$/
  return regex.test(username)
}
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function validatePhoneNumber(phone) {
  const regex = /^\+?[0-9\s-]*$/
  return regex.test(phone)
}
function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

  if (regex.test(password)) {
    alert('Password is Strong.')
    return true
  } else {
    alert(
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    )
    return false
  }
}

function validateAll() {
  let valid = true
  if (!validateUsername(appointment.name)) {
    nameError.value = 'Invalid name'
    valid = false
  } else {
    nameError.value = ''
  }
  if (!validateEmail(appointment.email)) {
    emailError.value = 'Invalid email'
    valid = false
  } else {
    emailError.value = ''
  }
  if (!validatePhoneNumber(appointment.phone)) {
    phoneError.value = 'Invalid phone number'
    valid = false
  } else {
    phoneError.value = ''
  }
  return valid
}
</script>
<template>
  <div class="h-full w-3/5 p-6 bg-white rounded-md shadow-xl overflow-auto">
    <div class="flex items-center justify-between p-3">
      <h3 class="text-2xl">Add Appointment</h3>

      <svg
        @click="$emit('close')"
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8 text-red-900 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700">Customer Name</label>
      <input type="text" v-model="appointment.name" class="w-full px-3 py-2 border rounded-md" />
      <p class="text-red-500 text-xs">{{ nameError }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Customer Email</label>
      <input type="text" v-model="appointment.email" class="w-full px-3 py-2 border rounded-md" />
      <p class="text-red-500 text-xs">{{ emailError }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Customer Phone</label>
      <input type="text" v-model="appointment.phone" class="w-full px-3 py-2 border rounded-md" />
      <p class="text-red-500 text-xs">{{ phoneError }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Date</label>
      <input type="date" v-model="appointment.date" class="w-full px-3 py-2 border rounded-md" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Time</label>
      <input type="time" v-model="appointment.time" class="w-full px-3 py-2 border rounded-md" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700">Type of Pet</label>
      <select v-model="appointment.pet" class="w-full px-3 py-2 border rounded-md">
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="label"> Type of Service </label>
      <select class="select select-bordered" v-model="appointment.service">
        <option>Pick one</option>
        <option value="Bath and brush">Bath and Brush-RM50</option>
        <option value="Haircut and Styling">Haircut and Styling-RM65</option>
      </select>
    </div>

    <div class="text-center">
      <button @click="add" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Add
      </button>
    </div>
  </div>
</template>

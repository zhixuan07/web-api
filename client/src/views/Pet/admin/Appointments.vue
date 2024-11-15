<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import updateAppointmentModal from '../../../components/Pet/updateAppointmentModal.vue'
import addAppointmentModal from '@/components/Pet/addAppointmentModal.vue'

const services = ref([])
const serviceInfo = ref([])
const openUpdateModal = ref(false)
const openAddModal = ref(false)
const searchInput = ref('')


function stripHTMLTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}
onMounted(async () => {
    const response = await axios.get('http://localhost:3003/api/appointments');
    if (response.status === 200) {
         
    services.value = response.data.map(service => ({
        ...service,
        name: stripHTMLTags(service.name),
        email: stripHTMLTags(service.email),
        phone: stripHTMLTags(service.phone),
        date: stripHTMLTags(service.date),
        time: stripHTMLTags(service.time),
        service: stripHTMLTags(service.service),
        pet: stripHTMLTags(service.pet),
        status: stripHTMLTags(service.status)
    }));
    }else{
        alert(response.data.error)
    }

   
});

const openUpdateAppointmentModal = (service) => {
  serviceInfo.value = service
  console.log(serviceInfo.value)
  openUpdateModal.value = true
  document.body.classList.add('overflow-hidden')
}

const closeUpdateAppointmentModal = () => {
  openUpdateModal.value = false
  document.body.classList.remove('overflow-hidden')
}
const openAddAppointmentModal = () => {
  openAddModal.value = true
  document.body.classList.add('overflow-hidden')
}
const closeAddAppointmentModal = () => {
  openAddModal.value = false
  document.body.classList.remove('overflow-hidden')
}
const deleteAppointment = async (id) => {
  cancelAppointment(id)
}

watch(searchInput, (value) => {})
</script>

<template>
  <div class="overflow-x-auto overflow-y-auto border-gray-200 flex flex-col py-4">
    <div class="flex p-10">
      <h1 class="text-2xl font-semibold">Manage Appointments</h1>
    </div>
    <div class="flex flex-row justify-end mr-4 mb-2 space-x-2">
      <input
        type="text"
        placeholder="Search appointment"
        class="border-2 border-gray-300 py-2 px-4 rounded-lg"
        v-model="searchInput"
      />
      <button
        class="bg-blue-700 rounded-lg border-1 p-2 hover:bg-blue-800 text-white"
        @click="openAddAppointmentModal"
      >
        New Appointment
      </button>
    </div>
    <table
      class="table-auto bg-white border-collapse border-r-2 border-l-2 border-gray-100 ml-2 mr-2"
    >
      <thead>
        <tr class="text-xs w-full text-center">
          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Name
          </th>
          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Email
          </th>
          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Phone
          </th>

          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Date
          </th>
          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Time
          </th>
          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Type of Service
          </th>
          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Type of Pet
          </th>

          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Status
          </th>
          <th
            class="py-2 px-4 bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service[i]" class="text-xs">
          <td class="border py-2 px-4 border-gray-200">
            {{ service.name }}
          </td>
          <td class="border py-2 px-4 border-gray-200">
            {{ service.email }}
          </td>
          <td class="border py-2 px-4 border-gray-200">
            {{ service.phone }}
          </td>
          <td class="border py-2 px-4 border-gray-200">
            {{ service.date }}
          </td>
          <td class="border py-2 px-4 border-gray-200">
            {{ service.time }}
          </td>
          <td class="border py-2 px-4 border-gray-200">
            {{ service.service }}
          </td>
          <td class="border py-2 px-4 border-gray-200">
            {{ service.pet }}
          </td>
          <td class="border py-2 px-4 border-gray-200">
            {{ service.status }}
          </td>

          <td
            class="border border-gray-200 py-2 px-4"
            v-if="service.Status !== 'Cancelled' && service.Status !== 'Completed'"
          >
            <button
              class="bg-orange-600 rounded-lg h-10 w-20 m-1 text-white hover:bg-orange-500"
              @click="openUpdateAppointmentModal(service)"
            >
              Update Appointment
            </button>
            <button
              class="bg-red-600 rounded-lg h-10 w-20 m-1 text-white hover:bg-red-500"
              @click="deleteAppointment(service.id)"
            >
              Cancel Appointment
            </button>
          </td>
          <td v-else class="border border-gray-200 py-2 px-4">No action</td>
        </tr>
        <p v-if="!services.values">Appointment Not Found</p>
      </tbody>
    </table>
    <Teleport to="body">
      <div
        v-if="openUpdateModal"
        class="fixed inset-0 flex items-center justify-center h-full bg-gray-400 bg-opacity-50"
      >
        <updateAppointmentModal @close="closeUpdateAppointmentModal" :service_id="serviceInfo.id" />
      </div>
      <div
        v-if="openAddModal"
        class="fixed inset-0 flex items-center justify-center h-full bg-gray-400 bg-opacity-50"
      >
        <addAppointmentModal @close="closeAddAppointmentModal" />
      </div>
    </Teleport>
  </div>
</template>

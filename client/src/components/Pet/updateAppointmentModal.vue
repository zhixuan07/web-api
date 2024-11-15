<script setup>
import { ref,defineEmits } from 'vue';


const service = defineProps({
    service_id :String,
})
const status = ref('');

defineEmits('close')

 
function updateAppointment(serviceID, serviceStatus){
   
    
}

</script>

<template>
    <div class="w-2/5 h-fit rounded-lg bg-white overflow-auto shadow-lg">
        <div class="flex items-center justify-between">
            <p class="text-2xl text-black  p-2">Update Appointment </p>
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
        <div>
            <div class="flex flex-col p-4">
                <label class="text-lg text-black">Appointment Status</label>
                <select class="border-2 border-gray-300 py-2 px-4  rounded-lg" v-model="status">
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    
                </select>
        
                <button
                    class="bg-orange-600 rounded-lg h-10 w-20  mt-2  text-white"
                    @click="updateAppointment(service.service_id, status)"
                >
                    Update
                </button>
            </div>
        </div>

    </div>
</template>
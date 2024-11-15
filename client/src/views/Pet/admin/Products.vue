<script setup>
import axios from 'axios'
import { ref, onMounted, computed, watch } from 'vue'
import addProductModal from '../../../components/Pet/addProductModal.vue'
import editProductModal from '../../../components/Pet/editProductModal.vue'

defineEmits('close')

const products = ref([])
const searchInput = ref('')
const isAddOpen = ref(false)
const isEditOpen = ref(false)

const selectedProduct = ref(null)

onMounted(async () => {
  const response = await axios.get('http://localhost:3001/api/products')
  products.value = response.data
})

//watch search input and filter products based on search input
watch(searchInput, (value) => {})

const openAddModal = () => {
  isAddOpen.value = true
  document.body.classList.add('overflow-hidden')
}
const closeAddModal = () => {
  isAddOpen.value = false
  document.body.classList.remove('overflow-hidden')
}

const openEditModal = (product) => {
  selectedProduct.value = { ...product }
  console.log(selectedProduct)
  isEditOpen.value = true
}

const closeEditModal = () => {
  isEditOpen.value = false
  selectedProduct.value = null
}

const delete_product = (id) => {
  console.log(id)
}
</script>

<template>
  <div class="flex p-10">
    <h1 class="text-2xl font-semibold">Manage Products</h1>
  </div>

  <div class="flex flex-grow justify-end mb-2">
    <input
      type="text"
      v-model="searchInput"
      class="w-1/5 p-2 border border-gray-300 rounded mr-2"
      placeholder="Search"
    />
    <button class="bg-blue-800 w-36 h-12 text-white rounded-lg mr-4" @click="openAddModal">
      Add Product
    </button>
  </div>

  <div class="border-gray-200 overflow-y-auto">
    <table
      class="bg-white border-collapse border-r-2 table-fixed border-l-2 border-gray-100 ml-2 mr-2"
    >
      <thead>
        <tr class="text-xs">
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            SKU Code
          </th>
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Name
          </th>
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Price
          </th>
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Image
          </th>
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Description
          </th>
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Category
          </th>
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Brand
          </th>
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Stock
          </th>
          <th
            class="py-2 px-4 min-w-[100px] bg-gray-200 text-gray-600 font-semibold uppercase border-b border-r border-gray-100"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.sku" class="text-xs text-center">
          <td class="border border-gray-200">{{ product.sku }}</td>
          <td class="border border-gray-200">{{ product.name }}</td>
          <td class="border border-gray-200">{{ product.price }}</td>
          <td class="border border-gray-200">
            <img :src="product.image_path" alt="Product Image" class="h-12 w-12 object-cover" />
          </td>
          <td class="text-xs border border-gray-200">
            {{ product.description }}
          </td>
          <td class="border border-gray-200">
            {{ product.category }}
          </td>
          <td class="border border-gray-200">{{ product.brand }}</td>
          <td class="border border-gray-200">{{ product.stock }}</td>
          <td class="text-white border border-gray-200">
            <button
              @click="openEditModal(product)"
              class="px-1 py-2 m-1 w-16 bg-blue-600 hover:bg-blue-500 rounded-xl"
            >
              Edit
            </button>
            <button
              @click="delete_product(product.sku)"
              class="px-1 py-2 m-1 w-16 bg-red-600 hover:bg-red-500 rounded-xl"
            >
              Delete
            </button>
          </td>
        </tr>
        <p v-if="!products.values">Product Not Found</p>
      </tbody>
    </table>
    <Teleport to="body">
      <div
        v-if="isAddOpen"
        class="fixed inset-0 flex items-center justify-center h-full bg-gray-400 bg-opacity-50"
      >
        <addProductModal @close="closeAddModal" />
      </div>
    </Teleport>
    <Teleport to="body">
      <div
        v-if="isEditOpen"
        class="fixed inset-0 flex items-center justify-center h-full bg-gray-400 bg-opacity-50"
      >
        <editProductModal :product="selectedProduct" @close="closeEditModal" />
      </div>
    </Teleport>
  </div>
</template>

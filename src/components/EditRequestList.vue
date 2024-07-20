<script setup>
import { computed, onMounted } from 'vue';
import { useRequestStore } from '../stores/requestStore';

const emit = defineEmits(['edit']);

const requestStore = useRequestStore();
    const requests = computed(() => requestStore.requests);
    onMounted(() => {
      requestStore.fetchAllRequests();  
    });


const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const handleEdit = (id) => {
  console.log("Editing request with ID:", id); 
  emit('edit', id);
};

const handleDelete = async (id) => {
  try {
    await requestStore.deleteRequest(id);
    console.log("Request deleted successfully with ID:", id); 
  } catch (error) {
    console.error("Error deleting the request with ID:", id, error); 
  }
};
</script>

<template>
  <div class="container mx-auto p-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="request in requests" :key="request.id" class="-backdrop-hue-rotate-60 hover:backdrop-hue-rotate-60 bg-white/30 shadow-2xl rounded-md">
        <div class="border-b border-white p-4 bg-cyan-600 rounded-t-lg">
          <h4 class="text-lg text-center font-bold text-zinc-100">{{ request.requestName }}</h4>
         
        </div>
        <div class="p-6 flex flex-col">
          <p class="text-sm text-zinc-500 mb-2"><strong>Subject:</strong> {{ request.subject }}</p>
          <p class="text-sm text-zinc-500 mb-2"><strong>Description:</strong> {{ request.description }}</p>
          <p class="text-sm text-zinc-500 mt-auto mb-2"><strong>Date:</strong> {{ formatDate(request.requestDate) }}</p>
          <button @click="handleEdit(request.id)" class="bg-cyan-400 text-white py-2 px-6 rounded-md shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 mt-3">Edit</button>
          <button @click="handleDelete(request.id)" class="bg-amber-600 text-white py-2 px-6 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-3">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

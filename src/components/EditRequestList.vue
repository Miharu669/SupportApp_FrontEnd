<script setup>
import { useRequestStore } from '../stores/requestStore';
import { computed, onMounted, defineEmits } from 'vue';

const requestStore = useRequestStore();
const requests = computed(() => requestStore.requests);
const emit = defineEmits(['edit']);

onMounted(() => {
  requestStore.fetchAllRequests();
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const emitEdit = (id) => {
  emit('edit', id);
};
</script>
<template>
    <div class="container mx-auto p-10">
      <h2 class="text-2xl font-bold mb-6">Edit Requests</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="request in requests" :key="request.id" class="bg-zinc-200 shadow-lg rounded-lg">
          <div class="border-b border-white p-4 bg-amber-500 rounded-t-lg">
            <h4 class="text-lg text-center font-bold text-zinc-100">{{ request.requesterName }}</h4>
          </div>
          <div class="p-6 flex flex-col">
            <p class="text-sm text-zinc-500 mb-2"><strong>Topic:</strong> {{ request.topic }}</p>
            <p class="text-sm text-zinc-500 mb-2"><strong>Description:</strong> {{ request.description }}</p>
            <p class="text-sm text-zinc-500 mt-auto mb-2"><strong>Date:</strong> {{ formatDate(request.requestDate) }}</p>
            <button class="bg-amber-600 text-white py-2 px-6 rounded-3xl shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 mt-3" @click="emitEdit(request.id)">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </template>
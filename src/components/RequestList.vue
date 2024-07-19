<script>
import { computed, onMounted } from 'vue';
import {useRequestStore} from '../stores/requestStore.js';

export default {
  name: 'RequestsList',
  setup() {
    const requestStore = useRequestStore();
    const requests = computed(() => requestStore.requests);
    onMounted(() => {
      requestStore.fetchAllRequests();  
    });

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return { requests, formatDate };
  },
};
</script>
<template>
    <div class="container mx-auto p-10">
      <h2 class="text-2xl font-bold mb-6">Request List</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="request in requests" :key="request.id" class="bg-zinc-200 shadow-lg rounded-lg">
          <div class="border-b border-white p-4 bg-amber-500 rounded-t-lg">
            <h4 class="text-lg text-center font-bold text-zinc-100">{{ request.requesterName }}</h4>
          </div>
          <div class="p-6 flex flex-col">
            <p class="text-sm text-zinc-500 mb-2"><strong>Topic:</strong> {{ request.topic }}</p>
            <p class="text-sm text-zinc-500 mb-2"><strong>Description:</strong> {{ request.description }}</p>
            <p class="text-sm text-zinc-500 mt-auto mb-2"><strong>Date:</strong> {{ formatDate(request.requestDate) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
<script setup>
import { ref, watch } from 'vue';
import { useRequestStore } from '../stores/requestStore';

const emit = defineEmits(['cancel', 'saved']);
const props = defineProps({
  id: [Number, String],
});

const requestStore = useRequestStore();

const newRequest = ref({
  requestName: '',
  subject: '',
  description: '',
  date: '',
});



const formatDate = (date) => {
  const d = new Date(date);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
};


watch(() => props.id, async (newVal) => {
  if (newVal) {
    const request = requestStore.getRequestById(Number(newVal));
    if (request) {
      newRequest.value = { ...request, date: formatDate(request.date) };
    }
  } else {
    resetForm();
  }
}, { immediate: true });

const handleSubmit = async () => {
  try {
    if (props.id) {
      await requestStore.updateRequest(Number(props.id), newRequest.value);
    } else {
      await requestStore.addRequest(newRequest.value);
    }
    resetForm();
    emit('saved');
  } catch (error) {
    console.error("Error submitting the request:", error);
  }
};

const resetForm = () => {
  newRequest.value = {
    requestName: '',
    subject: '',
    description: '',
    date: '',
  };
};
</script>

<template>
  <div class="container mx-auto p-6 max-w-md">
    <div class="-backdrop-hue-rotate-60 hover:backdrop-hue-rotate-60 bg-white/30 shadow-2xl rounded-lg">
      <div class="border-b border-white p-4 bg-cyan-500 rounded-t-lg">
        <h5 class="text-lg text-center font-bold text-zinc-100">{{ props.id ? 'Edit Request' : 'Request Form' }}</h5>
      </div>
      <div class="p-4">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="requesterName" class="block text-zinc-500 text-sm font-semibold mb-1">Name</label>
            <input v-model="newRequest.requestName" type="text" id="name" placeholder="Name"
              class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required />
          </div>
          <div class="mb-4">
            <label for="topic" class="block text-zinc-500 text-sm font-semibold mb-1">Subject</label>
            <input v-model="newRequest.subject" type="text" id="subject" placeholder="Subject"
              class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-zinc-500 text-sm font-semibold mb-1">Description</label>
            <textarea v-model="newRequest.description" id="description" rows="3" placeholder="Description"
              class="form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required></textarea>
          </div>
          <div class="mb-4">
            <label for="date" class="block text-zinc-500 text-sm font-semibold mb-1">Date</label>
            <input v-model="newRequest.date" type="date" id="date"
              class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required />
          </div>
          <div class="flex justify-center gap-4">
            <button type="submit"
              class="bg-amber-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500">{{ props.id ? 'Update' : 'Submit' }}</button>
            <button type="button" @click="$emit('cancel')"
              class="bg-zinc-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


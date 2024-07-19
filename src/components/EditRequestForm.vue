<script setup>
import { ref } from "vue";
import { useRequestStore } from "../stores/requestStore";

const newRequest = ref({
  requesterName: "",
  topic: "",
  description: "",
  date: "",
});

const requestStore = useRequestStore();

const handleSubmit = async () => {
  try {
    await requestStore.addRequest(newRequest.value);
    resetForm();
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
};

const resetForm = () => {
  newRequest.value.requesterName = "";
  newRequest.value.topic = "";
  newRequest.value.description = "";
  newRequest.value.date = "";
};
</script>
<template>
    <div class="container mx-auto p-10 ">
      <div class="bg-zinc-200 shadow-lg rounded-lg">
        <div class="border-b border-white p-4 bg-amber-500 rounded-t-lg">
          <h5 class="text-xl text-center font-bold  text-zinc-100">Request Form</h5>
        </div>
        <div class="p-6">
          <form @submit.prevent="handleSubmit">
  
            <div class="mb-6">
              <label for="requesterName" class="block text-zinc-500 text-sm font-semibold mb-2">Requester Name</label>
              <input v-model="newRequest.requesterName" type="text" id="requesterName" placeholder="Name"
                class="form-input mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required />
            </div>
  
            <div class="mb-6">
              <label for="topic" class="block text-zinc-500 text-sm font-semibold mb-2">Topic</label>
              <input v-model="newRequest.topic" type="text" id="topic" placeholder="Topic"
                class="form-input mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required />
            </div>
  
            <div class="mb-6">
              <label for="description" class="block text-zinc-500 text-sm font-semibold mb-2">Description</label>
              <textarea v-model="newRequest.description" id="description" rows="3" placeholder="Description"
                class="form-textarea mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required></textarea>
            </div>
  
            <div class="mb-6">
              <label for="date" class="block text-zinc-500 text-sm font-semibold mb-2">Date</label>
              <input v-model="newRequest.date" type="date" id="date"
                class="form-input mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required />
            </div>
  
            <div class="flex justify-center gap-6">
              <button type="submit"
                class="bg-amber-600 text-white py-2 px-6 rounded-3xl shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500">Submit</button>
              <button type="reset"
                class="bg-zinc-600 text-white py-2 px-6 rounded-3xl shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500">Reset</button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
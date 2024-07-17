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
    console.error("Error submitting the request:", error);
  }
};

// Function to reset the form fields
const resetForm = () => {
  newRequest.value.requesterName = "";
  newRequest.value.topic = "";
  newRequest.value.description = "";
  newRequest.value.date = "";
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="bg-white shadow-md rounded-lg border border-gray-200">
      <div class="border-b border-gray-200 p-4">
        <h5 class="text-xl font-semibold">New Request Form</h5>
      </div>
      <div class="p-4">
        <form @submit.prevent="handleSubmit">
        
          <div class="mb-4">
            <label for="requesterName" class="block text-gray-700 text-sm font-medium mb-2">Requester Name</label>
            <input
              v-model="newRequest.requesterName"
              type="text"
              id="requesterName"
              placeholder="Enter requester name"
              class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
         
          <div class="mb-4">
            <label for="topic" class="block text-gray-700 text-sm font-medium mb-2">Topic</label>
            <input
              v-model="newRequest.topic"
              type="text"
              id="topic"
              placeholder="Enter topic"
              class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div class="mb-4">
            <label for="description" class="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              v-model="newRequest.description"
              id="description"
              rows="3"
              placeholder="Enter description"
              class="form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            ></textarea>
          </div>
       
          <div class="mb-4">
            <label for="date" class="block text-gray-700 text-sm font-medium mb-2">Date</label>
            <input
              v-model="newRequest.date"
              type="date"
              id="date"
              class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div class="flex gap-2">
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
            <button type="reset" class="bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">Reset</button>
            <router-link to="/request-list" class="bg-transparent text-blue-500 py-2 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">Cancel</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
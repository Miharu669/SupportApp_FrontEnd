<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
<template>
  <nav class="bg-cyan-500 p-3 relative z-10">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-gray-700 text-2xl font-semibold">
        <router-link to="/home" class="hover:text-orange-500 flex items-center space-x-2">
          <img class="w-8 h-8" src="./../assets/vue.svg" alt="SupportApp Logo">
          <span>SupportApp</span>
        </router-link>
      </div>
      <div class="hidden md:flex space-x-4">
        <router-link to="/new-request" class="text-gray-600 hover:text-white font-semibold">Create Request</router-link>
        <router-link to="/edit-request/:id" class="text-gray-600 hover:text-white font-semibold">Edit
          Request</router-link>
        <router-link to="/request-list" class="text-gray-600 hover:text-white font-semibold">All Requests</router-link>
      </div>
      <button @click="toggleMenu" class="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <div v-if="isMenuOpen"
        class="md:hidden absolute top-16 right-4 bg-white text-gray-400 p-4 rounded-lg shadow-lg z-20">
        <router-link to="/new-request" class="block py-2 hover:text-orange-400">Create Request</router-link>
        <router-link to="/edit-request/:id" class="block py-2 hover:text-orange-400">Edit Request</router-link>
        <router-link to="/request-list" class="block py-2 hover:text-orange-400">All Requests</router-link>
      </div>
    </div>
  </nav>
</template>

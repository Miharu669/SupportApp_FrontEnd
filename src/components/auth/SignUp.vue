<template>
    <div class="bg-transparent flex justify-center items-center">
      <!-- Left: Image -->
      <div class="w-1/2 h-screen hidden lg:block">
        <img src="./../../../public/doctor5.png" alt="Placeholder Image" class="object-cover w-full h-full">
      </div>
      <!-- Right: Login Form -->
      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 class="text-2xl font-semibold mb-4">Sign up</h1>
        <form @submit.prevent="register">
          <!-- Username Input -->
          <div class="mb-4">
            <label for="username" class="block text-gray-600">Username</label>
            <input type="text" id="username" v-model="username" required class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
          </div>
          <!-- Password Input -->
          <div class="mb-4">
            <label for="password" class="block text-gray-600">Password</label>
            <input type="password" id="password" v-model="password" required class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-600">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" >
          </div>
          
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Register</button>
        </form>
        <!-- Sign up Link -->
        <div class="mt-6 text-blue-500 text-center">
          <a href="#" class="hover:underline">Log in Here</a>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const route = useRoute()
const router = useRouter()

const store = useAuthStore()


function register() {
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!")
        return
    }

    const newUser = {
        username: username.value,
        password: password.value
    }

    store.register(newUser)
    router.push('/')
}
</script>
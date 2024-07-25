<template>
  <div class="bg-transparent flex justify-center items-center">
    <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="./../../../public/doctor5.png" alt="Placeholder Image" class="object-cover w-full h-full">
    </div>
    <!-- Right: Login Form -->
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4">Login</h1>
      <form @submit.prevent="login">
        <!-- Username Input -->
        <div class="mb-4">
          <label for="username" class="block text-gray-600">Username</label>
          <input type="text" id="username" v-model="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
        </div>
        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password</label>
          <input type="password" id="password" v-model="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off">
        </div>
        <!-- Login Button -->
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
      </form>
      <!-- Sign up Link -->
      <div class="mt-6 text-blue-500 text-center">
        <a href="/signup" class="hover:underline">Sign up Here</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const remember = ref(false);

    const route = useRoute();
    const router = useRouter();

    const store = useAuthStore();

    async function login() {
      try {
        await store.login(username.value, password.value);
        const redirectPath = route.query.redirect || "/home";
        router.push(redirectPath);
      } catch (error) {
        alert(error.message);
      }
    }

    onMounted(() => {
      if (store.currentUser?.isAuthenticated) {
        const redirectPath = route.query.redirect || "/home";
        router.push(redirectPath);
      }
    });

    return {
      username,
      password,
      remember,
      login
    };
  }
}
</script>

<style scoped>
</style>
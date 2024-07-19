<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <RouterView />
  <Footer />
 
</template>

<style scoped>

main {
  width: 100% ;
  margin: 0 auto;
  background-color: #888;
  min-height: calc(100vh - 110px);
}
</style>

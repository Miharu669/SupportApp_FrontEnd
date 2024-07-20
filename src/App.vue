<script setup>
import { RouterView } from 'vue-router'
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
  background-image: url("./assets/images/background.jpg");
  background-position: center; 
  background-repeat: no-repeat; 
  background-size: cover; 
  width: 100% ;
  margin: 0 auto;
  background-color: white;
  min-height: calc(100vh - 110px);
}
</style>

<script setup>
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();

const showNavbar = computed(() => route.path !== "/", "/signup");
const showFooter = computed(() => route.path !== "/", "/signup");
</script>

<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <RouterView />
    <Footer v-if="showFooter" />
  </div>
</template>

<style scoped>
main {
  background-image: url("./assets/images/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  min-height: calc(100vh - 112px);
}
</style>
1
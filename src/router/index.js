import { createRouter, createWebHistory } from "vue-router";
import Request from "./../views/RequestView.vue";
import HomeView from "../views/HomeView.vue";


const routes = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    { path: '/request', 
      name: 'Request', 
      component: Request },
  ]

});

export default router;
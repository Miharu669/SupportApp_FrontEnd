import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewRequest from "../views/NewRequestView.vue";
import EditRequest from "../views/EditRequestView.vue"
import RequestList from '../views/RequestListView.vue';


const routes = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    { path: '/new-request', 
      name: 'Request', 
      component: NewRequest },
      { 
        path: '/edit-request/:id', 
        name: 'EditRequestView', 
        component: EditRequest
      },
      { path: '/request-list', 
        name: 'RequestList', 
        component: RequestList 
      },
  ]

});

export default router;
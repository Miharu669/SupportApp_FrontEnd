import { createRouter, createWebHistory } from "vue-router";


const HomeView = () => import("../views/HomeView.vue");
const NewRequestView = () => import("../views/NewRequestView.vue");
const EditRequestView = () => import("../views/EditRequestView.vue");
const RequestListView = () => import("../views/RequestListView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { title: "Home" }
  },
  {
    path: "/new-request",
    name: "NewRequest",
    component: NewRequestView,
    meta: { title: "New Request" }
  },
  {
    path: "/edit-request/:id",
    name: "EditRequest",
    component: EditRequestView,
    props: true,
    meta: { title: "Edit Request" }
  },
  {
    path: "/request-list",
    name: "RequestList",
    component: RequestListView,
    meta: { title: "Request List" }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Your App Name`;
  next();
});

export default router;
import { createRouter, createWebHistory } from "vue-router";

const LoginView = () => import("../views/LoginView.vue");
const HomeView = () => import("../views/HomeView.vue");
const NewRequestView = () => import("../views/NewRequestView.vue");
const EditRequestView = () => import("../views/EditRequestView.vue");
const RequestListView = () => import("../views/RequestListView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
      meta: { title: "SupportApp" },
    },
    {
      path: "/home",
      name: "Home",
      component: HomeView,
      meta: { title: "SupportApp" },
    },
    {
      path: "/new-request",
      name: "NewRequest",
      component: NewRequestView,
      meta: { title: "New Request" },
    },
    {
      path: "/edit-request/:id",
      name: "EditRequest",
      component: EditRequestView,
      props: true,
      meta: { title: "Edit Request" },
    },
    {
      path: "/request-list",
      name: "RequestList",
      component: RequestListView,
      meta: { title: "Request List" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "SupportApp";
  next();
});

export default router;

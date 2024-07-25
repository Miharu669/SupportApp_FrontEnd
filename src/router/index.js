import { createRouter, createWebHistory } from "vue-router";

const LoginView = () => import("../views/guards/LoginView.vue")
const HomeView = () => import("../views/HomeView.vue");
const NewRequestView = () => import("../views/NewRequestView.vue");
const EditRequestView = () => import("../views/EditRequestView.vue");
const RequestListView = () => import("../views/RequestListView.vue");
import SignUp from "@/components/auth/SignUp.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: "/",
    name: "Login",
    component: LoginView,
    
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true },
    
  },
  {
    path: "/new-request",
    name: "NewRequest",
    component: NewRequestView,
    meta: { requiresAuth: true },
    
  },
  {
    path: "/edit-request/:id",
    name: "EditRequest",
    component: EditRequestView,
    props: true,
    meta: { requiresAuth: true },
    
  },
  {
    path: "/request-list",
    name: "RequestList",
    component: RequestListView,
    meta: { requiresAuth: true },
   
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
  },
 
],


});


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Your App Name`;
  next();
});

router.beforeEach((to, from) => {
  const store = useAuthStore();
  if (to.meta.requiresAuth && !store.user.isAuthenticated) {
    return { name: "login" };
  }
});

export default router;
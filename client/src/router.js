import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      props: { role: 'user'}
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/Login.vue"),
      props: { role: 'admin'}
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue")
    },
    {
      path: "/eventorganizer",
      name: "eventorganizer",
      component: () => import("./views/Login.vue"),
      props: { role: 'eo'}
    }
  ]
});

import Vue from "vue";
import Router from "vue-router";
import Homepage from "./views/mainapp/Homepage.vue";
import Reservation from "./views/mainapp/Reservation.vue";
import Home from "./views/mainapp/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage,
      children: [
        {
          path: "",
          name: "landing",
          component: Home,
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
        },
        {
          // idEvent=, Event=
          path: "/event",
          name: "event",
          component: () => import("./views/mainapp/Event.vue"),
          props: route => ({ id: route.query.idEvent })
        },
        {
          path: "/event/result",
          name: "searcheventresult",
          component: () => import("./components/ResultSearch.vue")
        },
        {
          // idEvent=, Event=
          path: "/reservation",
          name: "reservation",
          component: Reservation,
          props: route => ({ id: route.query.idEvent }),
          children: [
              {
                path: "/order",
                name: "reservation",
                component: () => import("./components/ReservationForm.vue"),
              },
              {
                path: "/checkout",
                name: "checkout",
                component: () => import("./components/CheckoutForm.vue"),
              },
          ]
        },
      ]
    },
    // belum config routes dashboard
    {
       path: "/:role/dashboard",
       name: "dashboard",
       component: Home,
       props: true,
       children: [],
    },
  ]
});

import Vue from "vue";
import Router from "vue-router";
import Homepage from "./views/mainapp/Homepage.vue";
import Reservation from "./views/mainapp/Reservation.vue";
import Home from "./views/mainapp/Home.vue";
import Dashboard from "./views/dashboard/Dashboard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
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
                name: "order",
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
       component: Dashboard,
       props: true,
       meta: {
         requireAuth: true,
       },
       children: [
         {
           path: "/:role/dashboard/reservation",
           name: "user-reservation",
           component: () => import("./views/dashboard/user/Reservation.vue"),
           props: true,
         },
         {
           path: "/:role/dashboard/reservation/list",
           name: "user-reservation-list",
           component: () => import("./views/dashboard/user/ReservationList.vue"),
           props: true,
         },
         {
           path: "/:role/dashboard/reservation/checkorder",
           name: "user-reservation-checkorder",
           component: () => import("./views/dashboard/user/ConfirmationOrder.vue"),
           props: true,
         },
         {
           path: "/:role/dashboard/profile",
           name: "user-reservation-profile",
           component: () => import("./views/dashboard/user/Profile.vue"),
           props: true,
         },
         {
           path: "/:role/dashboard/reservation/history",
           name: "user-reservation-history",
           component: () => import("./views/dashboard/user/RiwayatReservasi.vue"),
           props: true,
         }
       ],
    },
    {
      path: "*",
      name: "notfound",
      component: Home,
    },
  ]
});

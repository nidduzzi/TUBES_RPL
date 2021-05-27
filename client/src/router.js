import Vue from "vue";
import Router from "vue-router";
import Homepage from "./views/mainapp/Homepage.vue";
import Reservation from "./views/mainapp/Reservation.vue";
import Home from "./views/mainapp/Home.vue";
import userDashboard from "./views/dashboard/userDashboard.vue";
import adminDashboard from "./views/dashboard/adminDashboard.vue";
import EODashboard from "./views/dashboard/EODashboard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Homepage,
      meta: {
        notAdmin: true,
      },
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
                props: route => ({ event: route.query.event })
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
       path: "/user/dashboard",
       name: "user-dashboard",
       component: userDashboard,
       meta: {
         requireUser: true,
       },
       children: [
         {
           path: "/user/dashboard/notifications",
           name: "user-notications",
           component: () => import("./views/dashboard/user/Notifications.vue"),
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
           path: "/user/dashboard/profile",
           name: "user-profile",
           component: () => import("./views/dashboard/user/Profile.vue"),
           props: true,
         },
         {
           path: "/:role/dashboard/reservation/history",
           name: "user-reservation-history",
           component: () => import("./views/dashboard/user/RiwayatReservasi.vue"),
           props: true,
         },
         {
           path: "/user/dashboard/eoregister",
           name: "user-eo-registration",
           component: () => import("./views/dashboard/user/RegisterEO.vue"),
           meta: {
             notEO : true,
           },
           props: true,
         },
       ],
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: adminDashboard,
      meta: {
        requireAdmin: true,
      },
      children: [
         {
           path: "/admin/dashboard/profile",
           name: "admin-profile",
           component: () => import("./views/dashboard/admin/Profile.vue"),
           props: true,
         },
         {
           path: "/admin/dashboard/event",
           name: "admin-event",
           component: () => import("./views/dashboard/admin/EOManage.vue"),
           props: true,
         },
         {
           path: "/:role/dashboard/userlist",
           name: "admin-userlist",
           component: () => import("./views/dashboard/admin/UserManage.vue"),
           props: true,
         },
         {
           path: "/:role/dashboard/report",
           name: "admin-report",
           component: () => import("./views/dashboard/admin/Laporan.vue"),
           props: true,
         }
       ],
    },
    {
      path: "/eo/dashboard/",
       name: "eo-dashboard",
       component: EODashboard,
       meta: {
         requireEO: true,
       },
       children: [
         {
           path: "/eo/dashboard/notifications",
           name: "eo-notications",
           component: () => import("./views/dashboard/EO/Notifications.vue"),
           props: true,
         },
         {
           path: "/eo/dashboard/welcome",
           name: "eo-welcome",
           component: () => import("./views/dashboard/EO/Welcome.vue"),
           props: true,
         },
         {
           path: "/eo/dashboard/profile",
           name: "eo-profile",
           component: () => import("./views/dashboard/EO/Profile.vue"),
           props: true,
         },
         {
           path: "/eo/dashboard/event",
           name: "eo-event",
           component: () => import("./views/dashboard/EO/EventManage.vue"),
           props: true,
         },
         {
           path: "/eo/dashboard/event/create",
           name: "eo-event-create",
           component: () => import("./views/dashboard/EO/CreateEvent.vue"),
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

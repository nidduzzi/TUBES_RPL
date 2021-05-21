import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import NProgress from 'nprogress';
import VueFormulate from '@braid/vue-formulate'
import dotenv from 'dotenv'
import axios from "axios";

dotenv.config();
Vue.config.productionTip = false;

router.beforeResolve((to, from,next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.auth.status.loggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

Vue.use(VueFormulate);

let isRefreshing = false;
axios.interceptors.response.use(
  response => {
    return response;
  },
  async err => {
    const {
      response: {status}
    } = err;
    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        await store.dispatch("auth/refresh").then(
          ({status, headers, data}) => {
            if(status === 200 || status === 204){
              isRefreshing = false;
              localStorage.user = JSON.stringify(data);
              document.cookie = headers['set-cookie'];
            }
          })
      }
    }else {
      return Promise.reject(err);
    }
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

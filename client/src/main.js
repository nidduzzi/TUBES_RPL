import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import NProgress from 'nprogress';
import VueFormulate from '@braid/vue-formulate'
import dotenv from 'dotenv'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

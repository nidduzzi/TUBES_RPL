import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import NProgress from 'nprogress';
import VueFormulate from '@braid/vue-formulate'

Vue.config.productionTip = false;

router.beforeResolve((to, from,next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

Vue.use(VueFormulate);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

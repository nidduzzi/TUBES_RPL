import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import NProgress from 'nprogress';
import VueFormulate from '@braid/vue-formulate';
import interceptorRun from './helpers/interceptor';
import AsyncComputed from 'vue-async-computed';
Vue.config.productionTip = false;

router.beforeResolve((to, from,next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.beforeEach((to,from,next) => {
  // admin guard
  if(store.state.auth.user) {
    if(to.matched.some(record => record.meta.notAdmin)){
      if(!(store.state.auth.user.auth[0].role == 'admin')){
        next()
        return
      }
      next('/admin/dashboard')
    } 
  }

  // dashboard admin guard
  if(to.matched.some(record => record.meta.requireAdmin)) {
    if (store.state.auth.status.loggedIn && store.state.auth.user.auth[0].role == 'admin') {
      next()
      return
    }
    if(store.state.auth.status.loggedIn && store.state.auth.user.auth[0].role == 'user'){
      next('/user/dashboard')
    } else {
      next('/admin')
    }
    
  } else {
    next()
  }

  // user guard
  if(to.matched.some(record => record.meta.requireUser)) {
    if (store.state.auth.status.loggedIn && store.state.auth.user.auth[0].role == 'user') {
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
Vue.use(AsyncComputed);
Vue.use(VueFormulate);

interceptorRun();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

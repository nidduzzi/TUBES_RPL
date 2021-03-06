import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import NProgress from 'nprogress';
import VueFormulate from '@braid/vue-formulate';
import interceptorRun from './helpers/interceptor';
import Notifications from 'vue-notification'
import moment from 'moment';
Vue.prototype.moment = moment;

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

  // register eo guard
  if(to.matched.some(record => record.meta.notEO)) {
    if(store.state.auth.user != null){
      if(store.state.auth.user.auth.length > 1) {
        if (!(store.state.auth.user.auth[1].role == 'eo')) {
          next()
          return
        }
      } else {
        next()
        return
      }
      next('/eo/dashboard/welcome')
    }
  } else {
    next()
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

  // eo guard
  if(to.matched.some(record => record.meta.requireEO)) {
    if (store.state.auth.status.loggedIn && store.state.auth.user.auth[1].role == 'eo') {
      next()
      return
    }
    next('/eventorganizer')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
Vue.use(AsyncComputed);
Vue.use(VueFormulate);
Vue.use(Notifications);

interceptorRun();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

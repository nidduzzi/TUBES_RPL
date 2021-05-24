import axios from 'axios';
import store from '../store';

export default function interceptorRun(){
   axios.interceptors.response.use(
      res => res,
      async err => {
         const {
            response: {status}
         } = err;
         let isRefreshing = false;
         if (status === 401) {
            // logout for production
            // store.dispatch('auth/logout');
            if (!isRefreshing) {
               isRefreshing = true;
               const res = await store.dispatch("auth/refresh", store.state.auth.user.auth[0].role);
                  if(res){
                     console.log(res);
                  }
            }
         } else {
            return Promise.reject(err);
         }
      }
   )
}
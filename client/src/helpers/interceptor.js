import axios from "axios";
import authService from "../services/auth.service";
import store from "../store";

export default function interceptorRun() {
  const interceptor = axios.interceptors.response.use(
    res => res,
    err => {
      const {
        response: { status }
      } = err;
      // Reject promise if usual error
      if (status !== 401) {
        return Promise.reject(err);
      }
      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axios.interceptors.response.eject(interceptor);
      return authService
        .refreshToken(store.state.auth.user.auth[0].role)
        .then(tmp => {
          store.commit("auth/refresh", tmp.data);
          err.response.config.headers["Authorization"] =
            "Bearer " + tmp.jwtToken;
          console.log("interceptor redirecting to original request");
          return axios(err.response.config);
        })
        .catch(error => {
          this.router.push("/login");
          return Promise.reject(error);
        })
        .finally(interceptorRun);
    }
  );
}

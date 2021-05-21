import axios from 'axios';
import getCookie from './handle-cookie'
const API_AUTH = `${process.env.VUE_APP_BASE_API}/users/`;

class AuthService {
  login(user) {
    return axios
      .post(API_AUTH + "authenticate", {
        username: user.username,
        password: user.password,
        email: user.email
      },
      {withCredentials: true}
      )
      .then(response => {
        if (response.data.jwtToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          document.cookie = response.headers['set-cookie'];
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  refreshToken() {
    return axios
    .post(API_AUTH + "refresh-token", {
      headers : {
        "Cookie" : getCookie("refreshToken"),
      }
    }, {withCredentials: true})
    .then(response => {
      return response.data;
    });
  }
}

export default new AuthService();
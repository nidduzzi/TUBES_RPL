import axios from 'axios';
import getCookie from './handle-cookie'
import authHeader from './auth-header';

const API_AUTH = `${process.env.VUE_APP_BASE_API}/`;

class AuthService {
  // USER
  login(user) {
    return axios
      .post(API_AUTH + "users/authenticate", {
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

  // ADMIN
  adminLogin(admin){
    return axios
      .post(API_AUTH + "admins/authenticate",
        {
          username: admin.username,
          password: admin.password
        },
        {
          withCredentials: true
        },
      )
      .then(response => {
        if (response.data.jwtToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          document.cookie = response.headers['set-cookie'];
        }
        return response.data;
      })
  }

  logout() {
    localStorage.removeItem(`user`);
  }

  // action to token
  refreshToken(role) {
    return axios
    .post(API_AUTH + `${role}s/refresh-token`, {
      headers : {
        "Cookie" : getCookie("refreshToken"),
      }
    }, 
    {
      withCredentials: true
    })
    .then(response => {
        if (response.data.jwtToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          document.cookie = response.headers['set-cookie'];
          location.reload();
        }
        return response.data;
      });
  }

  revokeToken(role){
    return axios.post(API_AUTH + `${role}/revoke-token`,
     { 
       headers: { 
         ...authHeader(), 
         "Cookie" : getCookie("refreshToken"),
        }
     }, 
     {
       withCredentials: true
     })
    .then(response => {
      return response.data;
    })
  }

  getRefreshTokenList(id, role){
    return axios
      .post(API_AUTH + `${role}s/${id}/refresh-tokens`,
      {
        headers: authHeader(),
      })
      .then(response => {
        return response.data;
      })
  }
}


export default new AuthService();
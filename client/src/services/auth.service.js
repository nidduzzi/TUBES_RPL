import axios from 'axios';

const API_AUTH = `${process.env.VUE_APP_BASE_API}/users/authenticate`;

class AuthService {
  login(user) {
    return axios
      .post(API_AUTH, {
        username: user.username,
        password: user.password,
        email: user.email
      })
      .then(response => {
        if (response.data.jwtToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
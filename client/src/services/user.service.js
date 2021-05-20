import axios from 'axios';
import authHeader from "./auth-header";

const API_USER = `${process.env.VUE_APP_BASE_API}/users/`;

class UserService {
  getUser(id) {
    return axios.get(API_USER + id, { headers: authHeader()});
  }

//   getUserBoard() {
//     return axios.get(API_URL + 'user', { headers: authHeader() });
//   }

//   getModeratorBoard() {
//     return axios.get(API_URL + 'mod', { headers: authHeader() });
//   }

//   getAdminBoard() {
//     return axios.get(API_URL + 'admin', { headers: authHeader() });
//   }
}

export default new UserService();
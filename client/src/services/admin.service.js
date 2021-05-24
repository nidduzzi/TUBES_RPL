import axios from 'axios';
import authHeader from "./auth-header";

const API_ADMIN = `${process.env.VUE_APP_BASE_API}/admins`;

class AdminService {
  // get admin by id
  getAdmin(id) {
    return axios.get(
      API_ADMIN + "/" + id, 
      { 
       headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  // create Admin
  registerAdmin(data) {
    return axios.post(
      API_ADMIN,
      data
      )
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }
}

export default new AdminService();
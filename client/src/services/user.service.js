import axios from 'axios';
import authHeader from "./auth-header";

const API_USER = `${process.env.VUE_APP_BASE_API}/users`;

class UserService {
  // register User
  registerUser(data){
    return axios
      .post(
        API_USER,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }
  // get user
  getUser(id) {
    return axios.get(
      API_USER + "/" + id,
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

  getUsersQuery(q,h) {
    return axios.get(
      API_USER, 
      { 
        headers: authHeader(), 
        params : {q, h} 
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  // update user
  updateUser(id, data, header){
    return axios.put(
      API_USER + "/" + id, data,
      {
        headers: {
          ...authHeader(),
          ...header,
        }
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  // terminate
  terminateUser(id, optBody){
    return axios.put(
      API_USER + "/terminate/" + id,
      {
        headers: authHeader(),
        body : optBody
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  unterminateUser(id){
    return axios.delete(
      API_USER + "/terminate/" + id,
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

  // suspend
  suspendUser(id, optBody){
    return axios.put(
      API_USER + "/suspend/" + id,
      {
        headers: authHeader(),
        body : optBody
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  unsuspendUser(id){
    return axios.delete(
      API_USER + "/suspend/" + id,
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

  // warn
  warnUser(id, optBody){
    return axios.post(
      API_USER + "/warn/" + id,
      {
        headers: authHeader(),
        body: optBody
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  // user verifikasi email
  verifyEmail(verifToken){
    return axios.get(API_USER + "/verify-email/" + verifToken)
    .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  // resend verifikasi email
  resendVerifyEmail(id){
    return axios.get(
      API_USER + "/" + id + "/resend-verification",
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

  // profile picture
  getProfilePicture(id){
    return axios.get(
      API_USER + "/" + id + "/profilePicture",
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

  updateProfilePicture(id, config){
    return axios.put(API_USER + "/" + id + "/profilePicture",
      {
        headers: 
        {
          ...authHeader(),
          ...config
        }
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  removeProfilePicture(id){
    return axios.delete(
      API_USER + "/" + id + "/profilePicture",
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

  // user notification
  getNotif(id){
    return axios.get(
      API_USER + "/" + id + "/notifications", 
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

  // admin privilege on user
  getRefreshTokenList(id){
    return axios.get(
      API_USER + "/" + id + "/refresh-tokens", 
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

  getReservationUserList(id){
    return axios.get(
      API_USER + "/" + id + "/reservations", 
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
}

export default new UserService();
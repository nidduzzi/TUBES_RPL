import axios from 'axios';
import authHeader from "./auth-header";

const API_USER = `${process.env.VUE_APP_BASE_API}/users`;

class UserService {
  // get user
  getUser(id) {
    return axios.get(API_USER + "/" + id, { headers: authHeader()});
  }

  getUsersQuery(q,h) {
    return axios.get(API_USER, { headers: authHeader(), params : {q, h} });
  }

  // update user
  updateUser(id, config){
    return axios.put(API_USER + "/" + id, {headers: authHeader(), ...config});
  }

  // terminate
  terminateUser(id, optBody){
    return axios.put(API_USER + "/terminate/" + id, {headers: authHeader(), body : optBody});
  }

  unterminateUser(id){
    return axios.delete(API_USER + "/terminate/" + id, {headers: authHeader()});
  }

  // suspend
  suspendUser(id, optBody){
    return axios.put(API_USER + "/suspend/" + id, {headers: authHeader(), body : optBody});
  }

  unsuspendUser(id){
    return axios.delete(API_USER + "/suspend/" + id, {headers: authHeader()});
  }

  // warn
  warnUser(id, optBody){
    return axios.post(API_USER + "/warn/" + id, {headers: authHeader(), body: optBody});
  }

  // user verifikasi email
  verifyEmail(verifToken){
    return axios.get(API_USER + "/verify-email/" + verifToken);
  }

  // resend verifikasi email
  resendVerifyEmail(id){
    return axios.get(API_USER + "/" + id + "/resend-verification", { headers: authHeader() });
  }

  // profile picture
  getProfilePicture(id){
    return axios.get(API_USER + "/" + id + "/profilePicture", { headers: authHeader() });
  }

  updateProfilePicture(id, config){
    return axios.put(API_USER + "/" + id + "/profilePicture", {headers: authHeader(), ...config});
  }

  removeProfilePicture(id, config){
    return axios.delete(API_USER + "/" + id + "/profilePicture", {headers: authHeader(), ...config});
  }

  // user notification
  getNotif(id){
    return axios.get(API_USER + "/" + id + "/notifications", { headers: authHeader() });
  }

  // admin privilege on user
  getRefreshTokenList(id){
    return axios.get(API_USER + "/" + id + "/refresh-tokens", { headers: authHeader() })
  }

  getReservationUserList(id){
    return axios.get(API_USER + "/" + id + "/reservations", { headers: authHeader() })
  }
}

export default new UserService();
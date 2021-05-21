import axios from 'axios';
import authHeader from "./auth-header";

const API_EO = `${process.env.VUE_APP_BASE_API}/eventoOrganizers`;

class EOService {
  // get eo
  getEO(id) {
    return axios.get(API_EO + "/" + id, { headers: authHeader()});
  }

  getEOQuery(q,h) {
    return axios.get(API_EO, { headers: authHeader(), params : {q, h} });
  }

  // create eo
  registerEO(data) {
    return axios.post(API_EO, { headers: authHeader(), body: data });
  }

  // update eo, add allowed user
  updateEO(id, data){
    return axios.put(API_EO + "/" + id, {headers: authHeader(), body: data});
  }

  // get all event on specific eo
  getEOEvent(idEO){
    return axios.get(API_EO + "/" + idEO + "/events" , {headers: authHeader() });
  }

  // verified eo by admin
  verifyEO(id){
    return axios.put(API_EO + "/verify/" + id, {headers: authHeader()});
  }

  // unverified eo by admin
  unverifyEO(id){
    return axios.delete(API_EO + "/verify/" + id, {headers: authHeader()});
  }

  // eo verifikasi email
  verifyEmailEO(verifToken){
    return axios.get(API_EO + "/verify-email/" + verifToken);
  }

  // resend eo verifikasi email
  resendVerifyEmailEO(id){
    return axios.get(API_EO + "/" + id + "/resend-verification", { headers: authHeader() });
  }

  // profile picture
  getEOProfilePicture(id){
    return axios.get(API_EO + "/" + id + "/profilePicture");
  }

  updateEOProfilePicture(id, config){
    return axios.put(API_EO + "/" + id + "/profilePicture", { headers: authHeader(), ...config });
  }

  removeEOProfilePicture(id){
    return axios.delete(API_EO + "/" + id + "/profilePicture", { headers: authHeader() });
  }

  // eo notification
  getEONotif(id){
    return axios.get(API_EO + "/" + id + "/notifications", { headers: authHeader() });
  }

  // add allowed user
  addEOMember(idEO, idUser){
    return axios.put(API_EO + "/" + idEO + "/allowed-users/" + idUser, { headers: authHeader() })
  }

   // delete allowed user
  EOMemberOut(idEO, idUser){
    return axios.delete(API_EO + "/" + idEO + "/allowed-users/" + idUser, { headers: authHeader() })
  }

  // delete allowed user
  getUserAllowed(idEO){
    return axios.delete(API_EO + "/" + idEO + "/allowed-users/", { headers: authHeader() })
  }
}

export default new EOService();
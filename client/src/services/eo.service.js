import axios from 'axios';
import authHeader from "./auth-header";

const API_EO = `${process.env.VUE_APP_BASE_API}/eventOrganizers`;

class EOService {
  // get eo
  getEO(id) {
    return axios.get(
      API_EO + "/" + id, 
      { 
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  getEOQuery(q,h) {
    return axios.get(
      API_EO + "?q=" + q + "&h=" + h, 
      { 
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // create eo
  registerEO(data) {
    return axios.post(
      API_EO, 
      data,
      { 
        headers: authHeader(),
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // update eo, add allowed user
  updateEO(id, data){
    return axios.put(API_EO + "/" + id, 
    {
      headers: authHeader(), 
      body: data
    })
    .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // get all event on specific eo
  getEOEvent(idEO){
    return axios.get(
      API_EO + "/" + idEO + "/events" , 
      {
        headers: authHeader() 
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // verified eo by admin
  verifyEO(id){
    return axios.put(
      API_EO + "/verify/" + id, 
      {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // unverified eo by admin
  unverifyEO(id){
    return axios.delete(
      API_EO + "/verify/" + id, 
      {
        headers: authHeader()
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // eo verifikasi email
  verifyEmailEO(verifToken){
    return axios.get(API_EO + "/verify-email/" + verifToken)
    .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // resend eo verifikasi email
  resendVerifyEmailEO(id){
    return axios.get(
      API_EO + "/" + id + "/resend-verification", 
      { 
        headers: authHeader() 
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // profile picture
  getEOProfilePicture(id){
    return axios.get( API_EO + "/" + id + "/profilePicture")
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  updateEOProfilePicture(id, config){
    return axios.put(
      API_EO + "/" + id + "/profilePicture",
      { 
        headers: { 
          ...authHeader(), 
          ...config 
        } 
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  removeEOProfilePicture(id){
    return axios.delete(
      API_EO + "/" + id + "/profilePicture",
      { 
        headers: authHeader() 
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // eo notification
  getEONotif(id){
    return axios.get(
      API_EO + "/" + id + "/notifications", 
      { 
        headers: authHeader() 
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // add allowed user
  addEOMember(idEO, idUser){
    return axios.put(
      API_EO + "/" + idEO + "/allowed-users/" + idUser,
      { 
        headers: authHeader() 
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

   // delete allowed user
  EOMemberOut(idEO, idUser){
    return axios.delete(
      API_EO + "/" + idEO + "/allowed-users/" + idUser, 
      { 
        headers: authHeader() 
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }

  // get list allowed user
  getUserAllowed(idEO){
    return axios.delete(
      API_EO + "/" + idEO + "/allowed-users/",
      { 
        headers: authHeader() 
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response;
      });
  }
}

export default new EOService();
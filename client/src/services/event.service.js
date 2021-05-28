import Axios from "axios";
const API_URL = process.env.VUE_APP_BASE_API;
class EventService {
  constructor() {
    // if (_axios) {
    //   this.axios = _axios;
    // } else {
    //   this.axios = Axios.create({
    //     baseURL: process.env.VUE_APP_BASE_API,
    //     headers: authHeader()
    //   });
    //   createAxiosResponseInterceptor(this.axios, '/users/refresh-token');
    // }
    this.API_URL = API_URL;
    this.axios = Axios;
    this.last = null;
  }

  getEvent(id) {
    const e = this.axios.get(API_URL + "/events/" + id);
    this.last = e;
    return e;
  }

  getEvents(p) {
    let params = new URLSearchParams();
    if (p) {
      if (p.q) {
        params.append("q", JSON.stringify(p.q));
      }
      if (p.h) {
        params.append("h", JSON.stringify(p.h));
      }
    }
    const e = this.axios.get(API_URL + "/events", {
      params: params
    });
    this.last = e;
    return e;
  }

  getReservations(id) {
    const r = this.axios.get(API_URL + "/events/" + id + "/reservations");
    this.last = r;
    return r;
  }

  getLogo(id) {
    const r = this.axios.get(API_URL + "/events/" + id + "/logo", {
      responseType: "blob"
    });
    this.last = r;
    return r;
  }

  getImage(id, imageNum) {
    const r = this.axios.get(API_URL + "/events/" + id + "/image/" + imageNum, {
      responseType: "blob"
    });
    this.last = r;
    return r;
  }
}

export default new EventService();

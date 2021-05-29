import axios from 'axios';
import authHeader from "./auth-header";

const API_RESERVATION = `${process.env.VUE_APP_BASE_API}/reservations`;
const API_PAYMENT = `${process.env.VUE_APP_BASE_API}/payments`;

class ReservationService {
  // Create reservation
  createReservation(data) {
    return axios
      .post(
        API_RESERVATION,
        data,
        {
          headers: authHeader(),
        }
      )
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  createPayment(data) {
    return axios
      .post(
        API_PAYMENT,
        data,
        {
          headers: authHeader(),
        }
      )
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }
}

export default new ReservationService();
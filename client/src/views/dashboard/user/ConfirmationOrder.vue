<template>
  <div class="user-reservation container p-5">
    <h4 class="text-left">
      <i class="fa fa-check-square-o" aria-hidden="true"></i> Konfirmasi
      Reservasi
    </h4>
    <hr />
    <div class="row">
      <div class="col-md-12">
        <div class="card-body text-left">
          <div class="col-md-12">
            <!-- Thead -->
            <div class="row mb-2 font-weight-bold">
              <span class="col-md-2"
                ><i class="fa fa-building" aria-hidden="true"></i> Nama
                Acara</span
              >
              <span class="col-md-2"
                ><i class="fa fa-map-marker" aria-hidden="true"></i> Tempat
                Acara</span
              >
              <span class="col-md-3"
                ><i class="fa fa-calendar" aria-hidden="true"></i> Tanggal
                Mulai</span
              >
              <span class="col-md-3"
                ><i class="fa fa-suitcase" aria-hidden="true"></i> Penyelenggara
                Acara</span
              >
              <span class="col-md-2"></span>
            </div>
            <!-- Tbody -->
            <div
              class="row row-data mb-2"
              v-for="(reservation, index) in reservationList"
              :key="index"
            >
              <span class="col-md-2 py-2">{{ reservation.Event.name }}</span>
              <span class="col-md-2 py-2">{{
                reservation.Event.schedule[0].place
              }}</span>
              <span class="col-md-3 py-2">{{
                reservation.Event.startDate
              }}</span>
              <span class="col-md-3 py-2">{{
                reservation.Event.eventOrganizer.name
              }}</span>
              <span class="text-right col-md-2 py-2">
                <button
                  class="mr-1 text-white btn btn-confirm btn-md rounded-circle"
                  @click="confirmOrder(reservation)"
                >
                  <i class="fa fa-check-square-o" aria-hidden="true"></i>
                </button>
                <button
                  class="text-white btn btn-confirm btn-md rounded-circle"
                  @click="cancelOrder(reservation.id)"
                >
                  <i class="fa fa-times-circle" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../../services/user.service";
import ReservationService from "../../../services/reservation.service";

export default {
  name: "confirmationorder",
  data() {
    return {
      reservationList: [],
      userId: null
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("user")).auth.find(
      (a) => a.role === "user"
    ).id;
    // user list
    UserService.getWaitingReservationUserList(this.userId)
      .then((res) => {
        this.reservationList = res.data.reservations;
        this.reservationList.forEach((element) => {
          element.Event.startDate = new Date(
            element.Event.schedule[0].startTime
          ).toDateString();
          element.detail = false;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    confirmOrder(reservation) {
      this.$router.push({
        path: "/checkout",
        query: {
          reservation: {
            id: reservation.id,
            eventId: reservation.Event.eventOrganizer.id,
            tickets: reservation.tickets
          }
        }
      });
    },
    cancelOrder(id) {
      ReservationService.cancelReservation(id).catch((err) => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.row-data {
  background-color: #efefef;
  border-radius: 2em;
}
.btn-confirm {
  background-color: #f4743b;
}
</style>
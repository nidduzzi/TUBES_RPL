<template>
  <div class="user-reservation container p-5">
    <h4 class="text-left">
      <i class="fa fa-history" aria-hidden="true"></i> Riwayat Reservasi
    </h4>
    <hr />
    <div class="row">
      <div class="col-md-12">
        <div class="card-body text-left">
          <div class="col-md-12">
            <div class="row mb-2 font-weight-bold">
              <span class="col-md-2"
                ><i class="fa fa-building" aria-hidden="true"></i> Nama
                Acara</span
              >
              <span class="col-md-2"
                ><i class="fa fa-map-marker" aria-hidden="true"></i> Tempat
                Acara</span
              >
              <span class="col-md-2"
                ><i class="fa fa-calendar" aria-hidden="true"></i> Tanggal
                Mulai</span
              >
              <span class="col-md-3"
                ><i class="fa fa-suitcase" aria-hidden="true"></i> Penyelenggara
                Acara</span
              >
              <span class="col-md-2"
                ><i class="fa fa-suitcase" aria-hidden="true"></i> Status</span
              >
              <span class="col-md-1"></span>
            </div>
            <div
              class="row row-data mb-2"
              v-for="(reservation, index) in reservationList"
              :key="index"
            >
              <span class="col-md-2 py-2">{{ reservation.Event.name }}</span>
              <span class="col-md-2 py-2">{{
                reservation.Event.schedule[0].place
              }}</span>
              <span class="col-md-2 py-2">{{
                reservation.Event.startDate
              }}</span>
              <span class="col-md-3 py-2">{{
                reservation.Event.eventOrganizer.name
              }}</span>
              <span class="col-md-2 py-2">
                <div
                    :class="[
                      'btn btn-sm font-status border-radius2 px-2 py-0',
                      reservation.status === 'CONFIRMED'
                        ? 'btn-success'
                        : reservation.status === 'CANCELED'
                        ? 'btn-danger'
                        : reservation.status === 'WAITING'
                        ? 'btn-info text-white'
                        : 'btn-light'
                    ]"
                  >
                    {{ reservation.status }}
                  </div>
                </span>
              <span class="col-md-1">
                <div
                  class="text-white btn btn-tiket btn-md border-radius2"
                  @click="ticketDetailsModal(reservation)"
                >
                  <img src="../../../assets/logotiket.png" />
                  Tiket
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SweetModal ref="ticketsModal">
      <div class="grid">
        <div class="row">
          <h3 class="md-3 float-left">{{ reservationToShow.Event.name }}</h3>
        </div>
        <div class="row">
          <h5 class="md-3 float-left">
            {{ reservationToShow.Event.eventOrganizer.name }}
          </h5>
        </div>
        <div class="row">
          <h5 class="md-3 float-left">
            {{ reservationToShow.Event.startDate }}
          </h5>
        </div>
      </div>
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Jenis Tiket</th>
            <th scope="col">Harga</th>
            <th scope="col">Identifikasi</th>
            <th scope="col">Nomor Identifikasi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ticket, index) in reservationToShow.tickets" :key="index">
            <td>{{ ticket.nama }}</td>
            <td>{{ ticket.type.name }}</td>
            <td>{{ currencyFormat(ticket.type.price) }}</td>
            <td>{{ ticket.identification }}</td>
            <td>{{ ticket.identificationNumber }}</td>
          </tr>
        </tbody>
      </table>
    </SweetModal>
  </div>
</template>

<script>
import UserService from "../../../services/user.service";
import { SweetModal } from "sweet-modal-vue";

export default {
  name: "riwayatReservasi",
  components: {
    SweetModal
  },
  data() {
    return {
      reservationList: [],
      userId: null,
      reservationToShow: {
        Event: {
          name: null,
          currency: "",
          eventOrganizer: {
            name: ""
          },
          startDate: ""
        },
        tickets: []
      }
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("user")).auth.find(
      (a) => a.role === "user"
    ).id;
    // user list
    UserService.getReservationUserList(this.userId)
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
    ticketDetailsModal(reservation) {
      this.reservationToShow = reservation;
      this.$refs.ticketsModal.open();
      console.log(this.reservationToShow);
    },
    currencyFormat(i) {
      i = parseInt(i);

      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.reservationToShow.Event.currency
      }).format(i);
    }
  }
};
</script>

<style lang="scss" scoped>
.row-data {
  background-color: #efefef;
  border-radius: 2em;
}

.btn-tiket {
  border-radius: 1.5em;
  background-color: #f4743b;
}

.font-normal {
  font-size: 0.9em;
}
</style>
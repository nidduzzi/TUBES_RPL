<template>
  <div class="reserv-form">
    <div class="card border-radius2 card-style text-left my-5 py-5">
      <div class="card-body px-5">
        <h3 class="font-weight-bold">{{ event.name }}</h3>
        <hr />

        <!-- jenis Tiket component -->
        <TicketTypeTable
          class="w-50"
          :ticket-types="event.ticketTypes"
          :currency="event.currency"
        />

        <h4>Tickets</h4>
        <div class="card card-style card-tickets">
          <div class="card-body">
            <form>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Jenis Tiket</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Jenis Identifikasi</th>
                    <th scope="col">No Identifikasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ticket, i) in this.formModel.tickets" :key="i">
                    <td scope="row">
                      <select
                        class="custom-select bg-success text-white"
                        v-model="ticket.ticketTypeId"
                      >
                        <option
                          v-for="(ticketType, i) in event.ticketTypes"
                          :key="i"
                          :value="ticketType.id"
                        >
                          {{ ticketType.name }}
                        </option>
                      </select>
                    </td>
                    <td>{{ currencyFormat(ticket.ticketTypeId) }}</td>
                    <td>
                      <input
                        class="form-control"
                        type="text"
                        name="nama"
                        v-model="ticket.nama"
                      />
                    </td>
                    <td>
                      <select
                        class="custom-select bg-success text-white"
                        v-model="ticket.identification"
                      >
                        <option selected value="KTP">KTP</option>
                        <option value="SIM">SIM</option>
                      </select>
                    </td>
                    <td>
                      <input
                        class="form-control"
                        type="text"
                        name="identifikasi"
                        v-model="ticket.identificationNumber"
                      />
                    </td>
                    <td>
                      <button
                        class="btn btn-success"
                        :class="{ 'btn-hide': !lastElement(i) }"
                        @click="addTicket"
                        type="button"
                      >
                        <i class="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-success"
                        :class="{ 'btn-hide': !lastElement(i) || i === 0 }"
                        @click="deleteTicket"
                        type="button"
                      >
                        <i class="fa fa-minus" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="offset-md-1 col-md-5">
          <button @click="createReservation" class="btn btn-submit btn-block">
            Submit
          </button>
        </div>
        <div class="col-md-5">
          <button @click="checkout" class="btn btn-checkout btn-block">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketTypeTable from "@/components/TicketTypeTable.vue";
import ReservationService from "../services/reservation.service";

export default {
  name: "reservation",
  components: {
    TicketTypeTable
  },
  data() {
    return {
      userId: null,
      formModel: {
        eventId: null,
        tickets: []
      }
    };
  },
  props: ["event"],
  created() {
    this.userId = JSON.parse(localStorage.getItem("user")).auth.find(
      (a) => a.role === "user"
    ).id;
    console.log(this.event);

    this.formModel.eventId = this.event.id;
    this.formModel.tickets.push({
      nama: "",
      identification: "KTP",
      identificationNumber: "",
      ticketTypeId: this.event.ticketTypes[0].id
    });
  },
  methods: {
    createReservation() {
      ReservationService.createReservation(this.formModel)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkout() {
      ReservationService.createReservation(this.formModel)
        .then((res) => {
          this.$router.push({
            path: "/checkout",
            query: {
              reservation: res.data.reservation
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.push({
      //   path: "/checkout",
      //   query: {
      //     reservation: this.formModel
      //   }
      // });
    },
    currencyFormat(i) {
      i = parseInt(i);
      i = this.event.ticketTypes.findIndex((e) => e.id == i);
      var n = this.event.ticketTypes[i].price;

      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.event.currency
      }).format(n);
    },
    addTicket() {
      this.formModel.tickets.push({
        nama: "",
        identification: "KTP",
        identificationNumber: "",
        ticketTypeId: this.event.ticketTypes[0].id
      });
    },
    deleteTicket() {
      this.formModel.tickets.pop();
    },
    lastElement(i) {
      return !(i < this.formModel.tickets.length - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-tickets {
  box-shadow: 0px 0px;
}

.btn-checkout {
  background-color: #f4743b;
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  font-weight: 600;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}

.btn-submit {
  background-color: #beee62;
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  font-weight: 600;
  &:hover {
    background: darken(#beee62, 10%);
  }
}

.btn-hide {
  visibility: hidden;
}
</style>

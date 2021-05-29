<template>
  <div class="checkout-form">
    <div class="card border-radius2 card-style my-5 py-5">
      <h3 class="font-weight-bold">Checkout</h3>
      <hr />
      <div class="card-body text-left px-5">
        <h4>{{ event.name }}</h4>
        <hr />
        <h5>Detail Reservasi</h5>
        <div class="card card-style card-tickets mb-4">
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr v-for="(rsv, i) in getReservationDetails" :key="i">
                  <td>{{ getNameById(rsv.ticketTypeId) }}</td>
                  <td>{{ "x" + rsv.pcs }}</td>
                  <td>
                    {{
                      currencyFormat(rsv.pcs * getPriceById(rsv.ticketTypeId))
                    }}
                  </td>
                  <td></td>
                  <td>{{ currencyFormat(getPriceById(rsv.ticketTypeId)) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h5>Payment Details</h5>
        <div class="card card-style card-tickets mb-4">
          <div class="card-body p-5">
            <div class="row">
              <div class="offset-md-3 col-md-6">
                <form>
                  <div class="form-group">
                    <div class="input-group mb-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i
                            class="fa fa-address-card-o"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        id="cardNumber"
                        aria-describedby="cardNumber"
                        placeholder="Card number"
                      />
                    </div>
                    <small id="cardNumber" class="form-text text-muted"
                      >We'll never share your card number with anyone
                      else.</small
                    >
                  </div>
                  <div class="form-group">
                    <div class="row">
                      <div class="col">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Exp. date"
                        />
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="CVV/CVC"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="offset-md-3 col-md-6">
          <button @click="payment" class="btn btn-orange btn-block">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "../services/event.service";
import ReservationService from "../services/reservation.service";

export default {
  name: "checkout",
  data() {
    return {
      tempForm: {},
      event: null
    };
  },
  created() {
    this.getEvent;
  },
  asyncComputed: {
    async getEvent() {
      console.log(this.reservation);
      let res = await EventService.getEvents({
        q: {
          id: this.reservation.eventId
        },
        h: {
          include: { ticketTypes: true },
          select: {
            currency: true,
            id: true,
            name: true,
            ticketTypes: true
          }
        }
      });

      this.event = res.data.events[0];
      console.log(res.data.events[0]);
      return res.data.events[0];
    }
  },
  props: ["reservation"],
  computed: {
    getReservationDetails() {
      var reservationDetails = [];

      this.reservation.tickets.forEach((e) => {
        var found = false;

        for (let i = 0; i < reservationDetails.length && !found; i++) {
          if (e.ticketTypeId == reservationDetails[i].ticketTypeId) {
            reservationDetails[i].pcs++;
            found = true;
          }
        }

        if (!found) {
          reservationDetails.push({
            ticketTypeId: e.ticketTypeId,
            pcs: 1,
            price: e.price
          });
        }
      });

      console.log(reservationDetails);
      return reservationDetails;
    }
  },
  methods: {
    getPriceById(id) {
      return this.event.ticketTypes.find((e) => e.id == id).price;
    },
    getNameById(id) {
      return this.event.ticketTypes.find((e) => e.id == id).name;
    },
    currencyFormat(n) {
      n = parseInt(n);
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.event.currency
      }).format(n);
    },
    payment() {
      var id_reservation = parseInt(this.reservation.id);
      ReservationService.createPayment({
        id_reservation
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-tickets {
  box-shadow: 0px 0px;
}

.btn-orange {
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
</style>
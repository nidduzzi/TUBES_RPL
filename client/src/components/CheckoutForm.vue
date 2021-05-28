<template>
  <div class="checkout-form">
    <div class="card border-radius2 card-style my-5 py-5">
      <h3 class="font-weight-bold">Checkout</h3>
      <hr />
      <div class="card-body text-left px-5">
        <h4>Webinar Something</h4>
        <hr />
        <h5>Detail Reservasi</h5>
        <div class="card card-style card-tickets mb-4">
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr>
                  <td>Silver</td>
                  <td>x2</td>
                  <td>1000000 IDR</td>
                  <td></td>
                  <td>500000 IDR</td>
                </tr>
                <tr>
                  <td>VIP</td>
                  <td>x1</td>
                  <td>1500000 IDR</td>
                  <td></td>
                  <td>1500000 IDR</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>2500000 IDR</td>
                  <td></td>
                  <td></td>
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
          <button @click="updateTiket" class="btn btn-orange btn-block">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout",
  data() {
    return {
      tempForm: {},
    };
  },
  methods: {
    updateForm() {
      this.$emit("submitReserv", this.tempForm);
    },
  },
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
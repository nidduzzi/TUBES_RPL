<template>
  <div class="reserv-form">
    <div class="card border-radius2 card-style text-left my-5 py-5">
      <div class="card-body px-5">
        <h3 class="font-weight-bold">Webinar Something</h3>
        <hr />

        <!-- jenis Tiket component -->
        <JenisTiket class="w-50"/>

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
                  <tr>
                    <th scope="row">
                      <select
                        class="custom-select bg-success text-white"
                        id="inputGroupSelect01"
                      >
                        <option value="Silver">Silver</option>
                        <option selected value="VIP">VIP</option>
                      </select>
                    </th>
                    <td>2000000 IDR</td>
                    <td>Jane Doe</td>
                    <td>
                      <select
                        class="custom-select bg-success text-white"
                        id="inputGroupSelect01"
                      >
                        <option selected calue="KTP">KTP</option>
                        <option value="SIM">SIM</option>
                      </select>
                    </td>
                    <td>16329809830980</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <select
                        class="custom-select bg-success text-white"
                        id="inputGroupSelect01"
                      >
                        <option selected value="Silver">Silver</option>
                        <option value="VIP">VIP</option>
                      </select>
                    </th>
                    <td>
                      <input class="form-control" type="number" name="harga" />
                    </td>
                    <td>
                      <input class="form-control" type="text" name="nama" />
                    </td>
                    <td>
                      <select
                        class="custom-select bg-success text-white"
                        id="inputGroupSelect01"
                      >
                        <option selected calue="KTP">KTP</option>
                        <option value="SIM">SIM</option>
                      </select>
                    </td>
                    <td>
                      <input
                        class="form-control"
                        type="text"
                        name="identifikasi"
                      />
                    </td>
                    <td>
                      <button class="btn btn-success">
                        <i class="fa fa-plus" aria-hidden="true"></i>
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
          <button @click="updateTiket" class="btn btn-submit btn-block">
            Submit
          </button>
        </div>
        <div class="col-md-5">
          <button @click="updateForm" class="btn btn-checkout btn-block">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JenisTiket from "@/components/JenisTiket.vue";

export default {
  name: "reservation",
  components: {
    JenisTiket,
  },
  data() {
    JenisTiket;
    return {
      tempForm: {},
    };
  },
  methods: {
    updateForm() {
      this.$emit("submitReserv", this.tempForm);
      this.$router.push("/checkout");
    },
  },
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
</style>
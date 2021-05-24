<template>
  <div class="result-search container">
    <div class="row">
      <div class="offset-md-1 col-md-10">
        <div class="card border-radius1 card-style text-left my-5 py-5">
          <div class="card-body px-5">
            <form class="form-inline">
              <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <img src="../assets/logotiket.png" alt="" />
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="Acara" />
              </div>

              <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <img src="../assets/logowaktu.png" alt="" />
                  </div>
                </div>
                <date-pick
                  class="form-control"
                  v-model="date"
                  :format="format"
                  :parseDate="parseDate"
                  :formatDate="formatDate"
                  :selectableYearRange="{ from: 2021, to: 2040 }"
                >
                </date-pick>
              </div>

              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <img src="../assets/logotempat.png" alt="" />
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="Tempat" />
              </div>
              <button type="submit" class="btn btn-orange mb-2 ml-3">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </div>
          <div class="card-body p-5">
            <!-- V-for event card -->
            <div class="row">
              <div class="col-md-4">
                <div class="card text-left">
                  <img
                    src="../assets/slider.jpg"
                    class="card-img-top border-radius1"
                    alt=""
                  />
                  <div class="card-body">
                    <h4 class="font-weight-bold">Webinar Something</h4>
                    <h5 class="font-weight-light">Universitas Something</h5>
                    <p class="font-weight-bold">Selasa, 14 Juli 2021</p>
                    <div class="text-center">
                      <router-link to="/order" class="btn btn-beli py-1 px-3"
                        >Beli Tiket</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
import fecha from "fecha";
import "vue-date-pick/dist/vueDatePick.css";
export default {
  name: "resultsearch",
  components: {
    DatePick,
  },
  data() {
    return {
      format: "ddd, DD MMMM YYYY",
      date: "",
      tempForm: {},
    };
  },
  methods: {
    updateForm() {
      this.$emit("submitReserv", this.tempForm);
      this.$router.push("/checkout");
    },
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-orange {
  background-color: #f4743b;
  border-radius: 10px;
  color: white;
  font-size: 1.1em;
  font-weight: 600;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}

.btn-beli {
  text-align: center;
  background-color: #f4743b;
  border-radius: 20px;
  position: relative;
  bottom: 0%;
  color: white;
  font-size: 0.8em;
  font-weight: 600;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}
</style>
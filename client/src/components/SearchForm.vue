<template>
  <div class="container mb-5">
    <div class="container searchform text-left p-5">
      <h3 class="f-300">Hey,</h3>
      <h3 class="f-300 mb-3">Mau cari tiket apa?</h3>
      <form class="form-inline">
        <label class="sr-only" for="acara">Acara</label>
        <div class="input-group mb-2 mr-sm-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <img src="../assets/logotiket.png" alt="" />
            </div>
          </div>
          <input type="text" class="form-control" placeholder="Acara" />
        </div>

        <label class="sr-only" for="waktu">Waktu</label>
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
        <label class="sr-only" for="tempat">Tempat</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <img src="../assets/logotempat.png" alt="" />
            </div>
          </div>
          <input type="text" class="form-control" placeholder="Tempat" />
        </div>
        <button type="submit" class="btn btn-ori btn-orange btn-block mt-3">
          Cari Event
        </button>
      </form>
    </div>
    <div class="pursueEvent">
      <p>
        Berikan Kemudahan Mengakses
        <b class="font-weight-bold">Tiket Acara Kalian !</b>
      </p>
      <p>Daftarkan Diri Anda Sebagai Event Organizer</p>
      <router-link to="/signup" class="btn btn-ori btn-green px-4 py-0 mb-5"
        >Gabung</router-link
      >
    </div>
  </div>
</template>
<script>
import DatePick from "vue-date-pick";
import fecha from "fecha";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  name: "SearchForm",
  components: {
    DatePick,
  },
  data: () => ({
    format: "ddd, DD MMMM YYYY",
    date: "",
  }),
  methods: {
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
  }
};
</script>
<style lang="scss" scoped>
.f-300 {
  font-weight: 300;
}

.searchform {
  width: 77%;
  padding: {
    top: 6em !important;
    bottom: 5em !important;
  }
}

.pursueEvent {
  font-size: 1.5em;
  font-weight: 300;
}

.pursueEvent p:nth-child(2) {
  font-size: 0.8em;
  font-style: italic;
}

.btn-ori {
  border-radius: 4px;
  color: white;
  font-size: 0.8em;
  font-weight: 600;
}

.btn-orange {
  background-color: #f4743b;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}

.btn-green {
  font-size:0.6em;
  font-weight: 400;
  background: #beee62;
  &:hover {
    background: darken(#beee62, 10%);
  }
  border-radius: 50px;
}

@media only screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}

::placeholder {
  color: #3c6e71;
  font-size: 0.95em;
  font-weight: 300;
}
</style>
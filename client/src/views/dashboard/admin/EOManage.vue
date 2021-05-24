<template>
  <div class="manage-eo container p-5">
    <div class="manage-eo-top">
      <h3 class="mb-4 font-weight-bold">Menunggu Verifikasi</h3>
      <div class="row mb-5">
        <div class="offset-md-2 col-md-8">
          <div class="card card-style border-radius1">
            <div class="card-body text-left">
              <div class="offset-md-1 col-md-11">
                <div class="row mb-2 font-weight-bold">
                  <div class="row row-data bg-white col-md-9 text-center">
                    <span class="col-md-4">Nama EO</span>
                    <span class="col-md-4">Alamat</span>
                    <span class="col-md-4">Status</span>
                  </div>
                  <span class="col-md-2"></span>
                  <span class="col-md-1"></span>
                </div>
                <div class="row">
                  <div class="row row-data col-md-9">
                    <span class="col-md-4 py-2">{{ EOWaiting.name }}</span>
                    <span class="col-md-4 py-2">Bandung</span>
                    <span class="col-md-4">
                      <div
                        class="btn btn-warning text-white btn-sm border-radius3 mt-2 py-0 px-2"
                      >
                        Belum Verifikasi
                      </div>
                    </span>
                  </div>
                  <div class="col-md-2">
                    <button
                      type="button"
                      class="ml-2 mt-1 text-white btn btn-verif btn-sm"
                    >
                      Verifikasi
                    </button>
                  </div>
                  <div class="col-md-1">
                    <button
                      type="button"
                      class="text-white btn btn-reject btn-sm mt-1"
                    >
                      <i class="fa fa-window-close-o" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="manage-eo-bottom font-normal">
      <h3 class="text-left">
        <i class="fa fa-building" aria-hidden="true"></i> Event Organizer
      </h3>
      <hr />
      <div class="row">
        <div class="offset-md-1 col-md-10">
          <div class="card card-style border-radius1">
            <div class="card-body text-left">
              <div class="offset-md-1 col-md-10">
                <div class="row mb-2 font-weight-bold">
                  <div class="row row-data bg-white col-md-10 text-center">
                    <span class="col-md-3">Nama EO</span>
                    <span class="col-md-4">Alamat</span>
                    <span class="col-md-4">Tanggal Verifikasi</span>
                    <span class="col-md-1"></span>
                  </div>
                  <span class="col-md-1"></span>
                  <span class="col-md-1"></span>
                </div>
                <div class="row mb-2">
                  <div class="row row-data col-md-10">
                    <span class="col-md-3 py-2">Major Bowl</span>
                    <span class="col-md-4 py-2">Bandung</span>
                    <span class="col-md-4 py-2"> Selasa, 27 mei 2021 </span>
                    <span class="col-md-1">
                      <button class="btn btn-info btn-md border-radius2">
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                      </button>
                    </span>
                  </div>
                  <div class="col-md-1">
                    <button
                      type="button"
                      class="ml-2 text-white btn btn-danger btn-md"
                    >
                      <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div class="col-md-1">
                    <button
                      type="button"
                      class="text-white btn btn-success btn-md"
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-left mt-4">
            <button type="button" class="btn btn-secondary btn-sm">
              <i class="fa fa-download" aria-hidden="true"></i> Unduh Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EOService from "../../../services/eo.service";
export default {
  name: "eomanage",
  data() {
    return {
      EOWaiting: {
        name: "",
      },
    };
  },
  mounted() {
    EOService.getEOQuery(
      encodeURIComponent("{verified:false}"),
      encodeURIComponent("{}"),
    )
      .then((res) => {
        console.log("masuk res");
        if (res.data) {
          this.EOWaiting = res.data.eventOrganizers;
        }
      })
      .catch((error) => {
        console.log("masuk error");
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.row-data {
  background-color: #efefef;
  border-radius: 2em;
}

.btn-verif {
  border-radius: 1.5em;
  background-color: #f4743b;
}

.btn-reject {
  border-radius: 1.5em;
  background-color: #d61616;
}

.font-normal {
  font-size: 0.9em;
}
</style>
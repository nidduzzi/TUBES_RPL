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
            <div class="row mb-2 font-weight-bold">
              <span class="col-md-3"
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
              <span class="col-md-1"></span>
            </div>
            <div class="row row-data mb-2">
              <span class="col-md-3 py-2">Major Bowl</span>
              <span class="col-md-2 py-2">Bandung</span>
              <span class="col-md-3 py-2"> Selasa, 27 mei 2021 </span>
              <span class="col-md-3 py-2"> Alibaba </span>
              <span class="col-md-1">
                <button class="offset-md-6 text-white btn btn-confirm btn-md rounded-circle">
                  <i class="fa fa-check-square-o" aria-hidden="true"></i>
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
export default {};
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
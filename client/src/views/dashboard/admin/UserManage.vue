<template>
  <div class="manage-user container p-5">
    <h3 class="text-left">
      <i class="fa fa-user-circle" aria-hidden="true"></i> User
    </h3>
    <hr />
    <div class="row">
      <div class="col-md-12">
        <div class="card card-style border-radius1">
          <div class="card-body text-left">
            <div class="col-md-12">
              <div class="row mb-2 font-weight-bold">
                <div class="row row-data bg-white col-md-10">
                  <span class="col-md-2">Nama</span>
                  <span class="col-md-2">Tanggal Lahir</span>
                  <span class="col-md-3">Alamat</span>
                  <span class="col-md-3">Pendaftaran</span>
                  <span class="col-md-1">Status</span>
                  <span class="col-md-1"></span>
                </div>
                <span class="col-md-2"></span>
              </div>
              <div class="row mb-2">
                <div class="row row-data col-md-10">
                  <span class="col-md-2">Fatimah</span>
                  <span class="col-md-2">31 Juli 2000</span>
                  <span class="col-md-3">Pangkalpinang</span>
                  <span class="col-md-3">22 Mei 2021</span>
                  <span class="col-md-1">
                    <div class="btn btn-sm btn-success border-radius2 px-1 py-0 text-small">
                      Active
                    </div>
                  </span>
                  <span class="col-md-1">
                    <div class="btn btn-info btn-sm border-radius2 offset-md-11">
                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </div>
                  </span>
                </div>
                <div class="col-md-2 py-1 px-3">
                  <button
                    type="button"
                    class="mx-3 text-white btn btn-danger btn-md"
                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
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
      </div>
    </div>
    <div class="text-left mt-4">
      <button type="button" class="btn btn-secondary btn-sm">
        <i class="fa fa-download" aria-hidden="true"></i> Unduh Laporan
      </button>
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
  padding: {
    left: 1.2em;
    right: 1.2em;
    top: 0.5em;
    bottom: 0.5em;
  }
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
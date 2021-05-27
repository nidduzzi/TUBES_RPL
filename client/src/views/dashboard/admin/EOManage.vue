<template>
  <div class="manage-eo container p-5">
    <div class="manage-eo-top">
      <h3 class="mb-4 font-weight-bold">Menunggu Verifikasi</h3>
      <div class="row mb-5">
        <div class="offset-md-1 col-md-10">
          <div class="card card-style border-radius1">
            <div class="card-body text-left">
              <div class="offset-md-1 col-md-11">
                <div v-if="message" class="alert alert-danger" role="alert">
                  <strong>{{ message }}</strong>
                </div>
                <div class="row mb-2 font-weight-bold">
                  <div class="row row-data bg-white col-md-9 text-center">
                    <span class="col-md-4">Nama EO</span>
                    <span class="col-md-4">Alamat</span>
                    <span class="col-md-4">Status</span>
                  </div>
                  <span class="col-md-3"></span>
                </div>
                <div v-if="EOWaiting.length">
                  <div v-for="(waitEO, index) in EOWaiting" :key="index">
                    <div class="row mb-2">
                      <div class="row row-data col-md-9">
                        <span class="col-md-4 py-2">{{ waitEO.name }}</span>
                        <span class="col-md-4 py-2">{{ waitEO.address }}</span>
                        <span class="col-md-4 text-center">
                          <div
                            class="btn btn-warning text-white font-status mt-2 border-radius3 py-0 px-2"
                          >
                            Belum Verifikasi
                          </div>
                        </span>
                      </div>
                      <div class="col-md-3">
                        <button
                          type="button"
                          class="ml-2 mt-1 text-white btn btn-verif btn-sm"
                          @click="verifyEO(waitEO.id)"
                        >
                          <div v-if="loader">
                            <i class="fa fa-spinner fa-spin"></i>
                          </div>
                          <div v-else>Verifikasi</div>
                        </button>
                        <button
                          type="button"
                          class="text-white ml-2 btn btn-reject btn-sm mt-1"
                          @click="triggerModalReject(waitEO.id)"
                        >
                          <i
                            class="fa fa-window-close-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="alert alert-info" role="alert">
                    <strong>Tidak Ada EO Menunggu Verifikasi</strong>
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
                <div v-if="EOVerified.length">
                  <div v-for="(verifeEO, index) in EOVerified" :key="index">
                    <div class="row mb-2">
                      <div class="row row-data col-md-10">
                        <span class="col-md-3 py-2">{{ verifeEO.name }}</span>
                        <span class="col-md-4 py-2">{{
                          verifeEO.address
                        }}</span>
                        <span class="col-md-4 py-2">
                          {{
                            moment(verifeEO.verificationDate).format(
                              "DD MMMM YYYY"
                            )
                          }}</span
                        >
                        <span class="col-md-1">
                          <button
                            class="btn btn-info btn-md border-radius2"
                            @click="showInfo(verifeEO.id)"
                          >
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                          </button>
                        </span>
                      </div>
                      <div class="col-md-1 py-2">
                        <button
                          type="button"
                          @click="terminateEO(verifeEO.id)"
                          class="ml-2 text-white btn btn-danger btn-md"
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                      </div>
                      <div class="col-md-1 py-2">
                        <button
                          type="button"
                          @click="editInfo(verifeEO.id)"
                          class="text-white btn btn-success btn-md"
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="alert alert-info" role="alert">
                    <strong>Data EO Kosong</strong>
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

    <!-- rejectEO Modal -->
    <SweetModal ref="modal" overlay-theme="dark">
      <FormulateForm class="formreject text-left">
        <FormulateInput
          type="text"
          v-model="terminate.policy"
          label="Bentuk Alasan"
        />
        <FormulateInput
          type="textarea"
          v-model="terminate.desc"
          label="Deskripsi"
        />
        <FormulateInput
          type="button"
          @click="rejectEO(idTerminate)"
          label="Tolak"
          class="text-center"
        >
          <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
        </FormulateInput>
      </FormulateForm>
    </SweetModal>

    <!-- Modal Detail -->
    <SweetModal ref="detailModal">
      <template slot="title">
        <h3 class="text-left font-weight-bold mt-3">
          <h4>Informasi Event Organizer</h4>
        </h3>
      </template>
      <div class="modal-body text-left">
        <div class="row mb-3">
          <div class="offset-md-4 col-md-4">
            <img
              src="../../../assets/slider.jpg"
              width="150px"
              class="img-fluid rounded-circle"
              alt="profile-picture"
            />
          </div>
        </div>
        <div class="row">
          <div class="offset-md-3 col-md-6 text-center">
            <p class="font-username">
              {{ EODetail[0].name }}
              <span
                :class="[
                  EODetail[0].status === 'ACTIVE'
                    ? 'btn-success'
                    : EODetail[0].status === 'INACTIVE'
                    ? 'btn-danger'
                    : EODetail[0].status === 'SUSPENDED'
                    ? 'btn-warning text-white'
                    : 'btn-light',
                  'py-0 btn btn-sm border-radius2',
                ]"
              >
                <i
                  v-if="EODetail[0].status === 'ACTIVE'"
                  class="fa fa-check-circle-o"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="EODetail[0].status === 'INACTIVE'"
                  class="fa fa-times"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="EODetail[0].status === 'SUSPENDED'"
                  class="fa fa-warning"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="EODetail[0].status === 'TERMINATED'"
                  class="fa fa-trash"
                  aria-hidden="true"
                ></i>
              </span>
            </p>
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 offset-md-2 col-md-1 mr-3 text-right">Email</div>
          <div class="row-data col-md-6">
            {{ EODetail[0].email }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Verifikasi</div>
          <div class="row-data col-md-6">
            {{ moment(EODetail[0].verificationDate).format("DD MMMM YYYY") }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Telepon</div>
          <div class="row-data col-md-6">
            {{ EODetail[0].phone }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Alamat</div>
          <div class="row-data col-md-6">
            {{ EODetail[0].address }}
          </div>
        </div>
      </div>
    </SweetModal>

    <!-- Edit Status Modal -->
    <SweetModal ref="editModal">
      <template slot="title">
        <h3 class="text-left font-weight-bold mt-3">
          <h4>Change Status Event Organizer</h4>
        </h3>
      </template>
      <SweetModalTab title="Suspend" id="tab1">
        <div class="row mb-4">
          <div class="col-md-12">
            <button
              v-if="EODetail[0].status !== 'SUSPENDED'"
              type="button"
              @click="suspendShow(EODetail[0].id)"
              class="mr-3 text-white btn btn-sm btn-warning"
            >
              <i class="fa fa-warning" aria-hidden="true"></i>
              Suspend EO
            </button>
            <button
              v-if="EODetail[0].status === 'SUSPENDED'"
              type="button"
              @click="unsuspendEO()"
              class="text-white btn btn-sm btn-success"
            >
              <i class="fa fa-check" aria-hidden="true"></i>
              Unsuspend EO
            </button>
          </div>
        </div>
      </SweetModalTab>
      <SweetModalTab title="Terminate" id="tab2">
        <div class="row">
          <div class="col-md-12">
            <button
              v-if="EODetail[0].status !== 'TERMINATED'"
              type="button"
              @click="terminateEO(EODetail[0].id)"
              class="mr-3 text-white btn btn-sm btn-danger"
            >
              <i class="fa fa-close" aria-hidden="true"></i>
              Terminate EO
            </button>
            <button
              v-if="EODetail[0].status === 'TERMINATED'"
              type="button"
              @click="unterminateEO()"
              class="text-white btn btn-sm btn-success"
            >
              <i class="fa fa-check" aria-hidden="true"></i>
              Unterminate EO
            </button>
          </div>
        </div>
      </SweetModalTab>
      <SweetModalTab title="Warn" id="tab3">
        <div class="row">
          <div class="col-md-12">
            <button
              type="button"
              @click="warnShow(EODetail[0].id)"
              class="mr-3 text-white btn btn-sm btn-warning"
            >
              <i class="fa fa-warning" aria-hidden="true"></i>
              Warn EO
            </button>
          </div>
        </div>
      </SweetModalTab>
    </SweetModal>

    <!-- Suspend Modal -->
    <SweetModal ref="suspendModal">
      <FormulateForm class="formreject text-left">
        <FormulateInput
          type="text"
          v-model="suspendData.policyBreach"
          label="Bentuk Pelanggaran"
        />
        <FormulateInput
          type="textarea"
          v-model="suspendData.description"
          label="Deskripsi"
        />
        <FormulateInput
          type="number"
          v-model="suspendData.length"
          label="Durasi (day)"
          validation="bail|required|number"
        />
        <FormulateInput
          type="button"
          @click="suspendEO()"
          label="Suspend"
          class="text-center"
        >
          <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
        </FormulateInput>
      </FormulateForm>
    </SweetModal>

    <!-- Warn Modal -->
    <SweetModal ref="warnModal">
      <FormulateForm class="formreject text-left">
        <FormulateInput
          type="text"
          v-model="warnData.policyBreach"
          label="Peringatan"
        />
        <FormulateInput
          type="textarea"
          v-model="warnData.description"
          label="Deskripsi Peringatan"
        />
        <FormulateInput
          type="button"
          @click="warnEO"
          label="Warn"
          class="text-center"
        >
          <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
        </FormulateInput>
      </FormulateForm>
    </SweetModal>
    <notifications group="failVerify" position="bottom right" />
    <notifications group="successTerminate" position="bottom right" />
    <notifications group="successunTerminate" position="bottom right" />
  </div>
</template>

<script>
import EOService from "../../../services/eo.service";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";

export default {
  name: "eomanage",
  components: {
    SweetModal,
    SweetModalTab
  },
  data() {
    return {
      terminate: {
        policy: "",
        desc: "",
      },
      idTerminate: "",
      EOWaiting: [
        {
          name: "",
        },
      ],
      EOVerified: [
        {
          name: "",
        },
      ],
      EODetail: [
        {
          name: "",
        },
      ],
      suspendData: {
        policyBreach: "Ethical conduct",
        description: "User conducted unethical acts",
        length: "",
      },
      warnData: {
        policyBreach: "Peringatan",
        description: "Deskripsi Peringatan",
      },
      message: "",
      loader: false,
    };
  },
  mounted() {
    // non verified eo
    EOService.getEOQuery({ verified: false }, {})
      .then((res) => {
        this.EOWaiting = res.users;
      })
      .catch((error) => {
        console.log(error);
      });

    //verified eo
    EOService.getEOQuery({ verified: true }, {})
      .then((res) => {
        this.EOVerified = res.users;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    showInfo(id) {
      this.EODetail = this.EOVerified.filter((user) => user.id === id);
      this.$refs.detailModal.open();
    },
    editInfo(id) {
      this.EODetail = this.EOVerified.filter((user) => user.id === id);
      this.$refs.editModal.open("tab1");
    },
    async verifyEO(id) {
      this.loader = true;
      try {
        await EOService.verifyEO(id);
        location.reload();
      } catch (e) {
        // simple
        this.$notify({
          group: "failVerify",
          title: "Verifikasi EO Gagal",
          text: "Maaf verifikasi event organizer gagal. Coba lagi",
          type: "error",
        });
        this.message = e.message;
      } finally {
        this.loader = false;
      }
    },
    triggerModalReject(id) {
      this.$refs.modal.open();
      this.idTerminate = id;
    },
    async rejectEO(id) {
      this.loader = true;
      const body = {
        policyBreach: "",
        description: "",
      };
      try {
        await EOService.terminateEO(id, body);
        location.reload();
      } catch (e) {
        // simple
        this.$notify({
          group: "failVerify",
          title: "Tolak EO Gagal",
          text: "Maaf penolakan event organizer gagal. Coba lagi",
          type: "error",
        });
        this.message = e.message;
      } finally {
        this.loader = false;
      }
    },
    async terminateEO(id) {
      this.EODetail = this.EOVerified.filter((user) => user.id === id);
      const body = {
        policyBreach: "Melanggar Aturan Tiketin",
        description: "Membuat banyak kegaduhan mengenai tiketin di sosial media",
      };
      try {
        const res = await EOService.terminateEO(id, body);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successTerminate",
            title: "Terminate Berhasil",
            text: `Terminate akun ${this.EODetail[0].name} berhasil!`,
            type: "success",
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async unterminateEO() {
      try {
        const res = await EOService.unterminateEO(this.EODetail[0].id);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successunTerminate",
            title: "Unterminate berhasil",
            text: `akun ${this.EODetail[0].name} berhasil di Unterminate!`,
            type: "success",
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    suspendShow(id) {
      this.EODetail = this.EOVerified.filter((user) => user.id === id);
      this.$refs.suspendModal.open();
    },
    async suspendEO() {
      const body = this.suspendData;
      if (!body.length.includes("d")) {
        body.length += "d";
      }
      this.loader = true;
      try {
        const res = await EOService.suspendEO(this.EODetail[0].id, body);
        this.loader = false;
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successSuspend",
            title: "Suspend berhasil",
            text: `akun ${this.EODetail[0].name} berhasil di suspend selama ${res.data.length} hari`,
            type: "success",
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async unsuspendEO() {
      try {
        const res = await EOService.unsuspendEO(this.EODetail[0].id);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successunSuspend",
            title: "Unsuspend berhasil",
            text: `akun ${this.EODetail[0].name} berhasil di Unsuspend!`,
            type: "success",
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    warnShow(id) {
      this.EODetail = this.EOVerified.filter((user) => user.id === id);
      this.$refs.warnModal.open();
    },
    async warnEO() {
      const body = this.warnData;
      try {
        const res = await EOService.warnEO(this.EODetail[0].id, body);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successWarn",
            title: "Peringatan user berhasil",
            text: `akun ${this.EODetail[0].username} berhasil diberi Peringatan!`,
            type: "success",
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.formreject::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}

.formreject::v-deep .formulate-input .formulate-input-element--button {
  background-color: #f4743b;
  border-radius: 2em;
}


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

.font-status {
  font-size: 0.8em;
}
</style>
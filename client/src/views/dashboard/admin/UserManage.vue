<template>
  <div class="manage-user container p-5">
    <h3 class="text-left">
      <i class="fa fa-user-circle" aria-hidden="true"></i> User
    </h3>
    <hr />
    <div class="card card-style border-radius1">
      <div class="card-body text-left p-5">
        <div class="col-md-12">
          <d iv class="row mb-2 font-weight-bold">
            <div class="row row-data bg-white col-md-10">
              <span class="col-md-4">Username</span>
              <span class="col-md-4">Pendaftaran</span>
              <span class="col-md-2">Status</span>
              <span class="col-md-2"></span>
            </div>
            <span class="col-md-1"></span>
          </d>
          <div v-for="(user, index) in userList" :key="index">
            <div class="row mb-2">
              <div class="row row-data col-md-10">
                <span class="col-md-4">{{ user.username }}</span>
                <span class="col-md-4">{{
                  moment(
                    user.registrationDate ? user.registrationDate : "0000-00-00"
                  ).format("DD MMMM YYYY")
                }}</span>
                <span class="col-md-2">
                  <div
                    :class="[
                      'btn btn-sm font-status border-radius2 px-2 py-0',
                      user.status === 'ACTIVE'
                        ? 'btn-success'
                        : user.status === 'INACTIVE'
                        ? 'btn-danger'
                        : user.status === 'SUSPENDED'
                        ? 'btn-warning text-white'
                        : 'btn-light'
                    ]"
                  >
                    {{ user.status }}
                  </div>
                </span>
                <span class="col-md-2">
                  <button
                    class="btn btn-info btn-sm border-radius2 offset-md-10"
                    @click="showInfo(user.id)"
                  >
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
              <div class="col-md-2 py-1 px-3">
                <button
                  type="button"
                  @click="terminateUser(user.id)"
                  class="mx-3 text-white btn btn-danger btn-md"
                >
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
                <button
                  @click="editInfo(user.id)"
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

    <div class="text-left mt-4">
      <button
        @click="generateUserPDF"
        type="button"
        class="btn btn-secondary btn-sm"
      >
        <i class="fa fa-download" aria-hidden="true"></i> Unduh Laporan
      </button>
    </div>
    <notifications group="successTerminate" position="bottom right" />
    <notifications group="successunTerminate" position="bottom right" />

    <!-- Modal Detail -->
    <SweetModal ref="modal">
      <template slot="title">
        <h3 class="text-left font-weight-bold mt-3">
          <h4>Informasi User</h4>
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
              {{ userDetail[0].username }}
              <span
                :class="[
                  userDetail[0].status === 'ACTIVE'
                    ? 'btn-success'
                    : userDetail[0].status === 'INACTIVE'
                    ? 'btn-danger'
                    : userDetail[0].status === 'SUSPENDED'
                    ? 'btn-warning text-white'
                    : 'btn-light',
                  'py-0 btn btn-sm border-radius2'
                ]"
              >
                <i
                  v-if="userDetail[0].status === 'ACTIVE'"
                  class="fa fa-check-circle-o"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="userDetail[0].status === 'INACTIVE'"
                  class="fa fa-times"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="userDetail[0].status === 'SUSPENDED'"
                  class="fa fa-warning"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="userDetail[0].status === 'TERMINATED'"
                  class="fa fa-trash"
                  aria-hidden="true"
                ></i>
              </span>
            </p>
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 offset-md-2 col-md-1 mr-3">Email</div>
          <div class="row-data col-md-6">
            {{ userDetail[0].email }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Pendaftaran</div>
          <div class="row-data col-md-6">
            {{ moment(userDetail[0].registrationDate).format("DD MMMM YYYY") }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Tanggal Lahir</div>
          <div class="row-data col-md-6">
            {{
              userDetail[0].dateOfBirth
                ? moment(userDetail[0].dateOfBirth).format("DD MMMM YYYY")
                : ""
            }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Alamat</div>
          <div class="row-data col-md-6">
            {{ userDetail[0].address }}
          </div>
        </div>
      </div>
    </SweetModal>

    <!-- Edit Status Modal -->
    <SweetModal ref="editModal">
      <template slot="title">
        <h3 class="text-left font-weight-bold mt-3">
          <h4>Change Status User</h4>
        </h3>
      </template>
      <SweetModalTab title="Suspend" id="tab1">
        <div class="row mb-4">
          <div class="col-md-12">
            <button
              v-if="userDetail[0].status !== 'SUSPENDED'"
              type="button"
              @click="suspendShow(userDetail[0].id)"
              class="mr-3 text-white btn btn-sm btn-warning"
            >
              <i class="fa fa-warning" aria-hidden="true"></i>
              Suspend User
            </button>
            <button
              v-if="userDetail[0].status === 'SUSPENDED'"
              type="button"
              @click="unsuspendUser()"
              class="text-white btn btn-sm btn-success"
            >
              <i class="fa fa-check" aria-hidden="true"></i>
              Unsuspend User
            </button>
          </div>
        </div>
      </SweetModalTab>
      <SweetModalTab title="Terminate" id="tab2">
        <div class="row">
          <div class="col-md-12">
            <button
              v-if="userDetail[0].status !== 'TERMINATED'"
              type="button"
              @click="terminateUser(userDetail[0].id)"
              class="mr-3 text-white btn btn-sm btn-danger"
            >
              <i class="fa fa-close" aria-hidden="true"></i>
              Terminate User
            </button>
            <button
              v-if="userDetail[0].status === 'TERMINATED'"
              type="button"
              @click="unterminateUser()"
              class="text-white btn btn-sm btn-success"
            >
              <i class="fa fa-check" aria-hidden="true"></i>
              Unterminate User
            </button>
          </div>
        </div>
      </SweetModalTab>
      <SweetModalTab title="Warn" id="tab3">
        <div class="row">
          <div class="col-md-12">
            <button
              type="button"
              @click="warnShow(userDetail[0].id)"
              class="mr-3 text-white btn btn-sm btn-warning"
            >
              <i class="fa fa-warning" aria-hidden="true"></i>
              Warn User
            </button>
          </div>
        </div>
      </SweetModalTab>
    </SweetModal>

    <!-- Suspend Modal -->
    <SweetModal ref="suspendModal">
      <FormulateForm class="formsuspend text-left">
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
          @click="suspendUser()"
          label="Suspend"
          class="text-center"
        >
          <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
        </FormulateInput>
      </FormulateForm>
    </SweetModal>

    <!-- Warn Modal -->
    <SweetModal ref="warnModal">
      <FormulateForm class="formsuspend text-left">
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
          @click="warnUser"
          label="Warn"
          class="text-center"
        >
          <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
        </FormulateInput>
      </FormulateForm>
    </SweetModal>
  </div>
</template>

<script>
import UserService from "../../../services/user.service";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export default {
  name: "usermanage",
  components: {
    SweetModal,
    SweetModalTab
  },
  data() {
    return {
      userList: [
        {
          username: ""
        }
      ],
      userDetail: [
        {
          username: ""
        }
      ],
      suspendData: {
        policyBreach: "Ethical conduct",
        description: "User conducted unethical acts",
        length: ""
      },
      warnData: {
        policyBreach: "Peringatan",
        description: "Deskripsi Peringatan"
      },
      message: "",
      loader: false
    };
  },
  mounted() {
    // user list
    UserService.getUsersQuery({}, {})
      .then((res) => {
        this.userList = res.data.users;
        this.userList.forEach((element) => {
          element.detail = false;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    showInfo(id) {
      this.userDetail = this.userList.filter((user) => user.id === id);
      this.$refs.modal.open();
    },
    editInfo(id) {
      this.userDetail = this.userList.filter((user) => user.id === id);
      this.$refs.editModal.open("tab1");
    },
    async terminateUser(id) {
      this.userDetail = this.userList.filter((user) => user.id === id);
      const body = {
        policyBreach: "Melanggar Aturan Tiketin",
        description: "Membuat banyak kegaduhan mengenai tiketin di sosial media"
      };
      try {
        const res = await UserService.terminateUser(id, body);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successTerminate",
            title: "Terminate Berhasil",
            text: `Terminate akun ${this.userDetail[0].username} berhasil!`,
            type: "success"
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async unterminateUser() {
      try {
        const res = await UserService.unterminateUser(this.userDetail[0].id);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successunTerminate",
            title: "Unterminate berhasil",
            text: `akun ${this.userDetail[0].username} berhasil di Unterminate!`,
            type: "success"
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    suspendShow(id) {
      this.userDetail = this.userList.filter((user) => user.id === id);
      this.$refs.suspendModal.open();
    },
    async suspendUser() {
      const body = this.suspendData;
      if (!body.length.includes("d")) {
        body.length += "d";
      }
      this.loader = true;
      try {
        const res = await UserService.suspendUser(this.userDetail[0].id, body);
        this.loader = false;
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successSuspend",
            title: "Suspend berhasil",
            text: `akun ${this.userDetail[0].username} berhasil di suspend selama ${res.data.length} hari`,
            type: "success"
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async unsuspendUser() {
      try {
        const res = await UserService.unsuspendUser(this.userDetail[0].id);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successunSuspend",
            title: "Unsuspend berhasil",
            text: `akun ${this.userDetail[0].username} berhasil di Unsuspend!`,
            type: "success"
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    warnShow(id) {
      this.userDetail = this.userList.filter((user) => user.id === id);
      this.$refs.warnModal.open();
    },
    async warnUser() {
      const body = this.warnData;
      try {
        const res = await UserService.warnUser(this.userDetail[0].id, body);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successWarn",
            title: "Peringatan user berhasil",
            text: `akun ${this.userDetail[0].username} berhasil diberi Peringatan!`,
            type: "success"
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    generateUserPDF() {
      const doc = new jsPDF();
      const data = this.userList.map((el) => {
        const date = moment(el.registrationDate).format("DD MMMM YYYY");
        return [
          el.username,
          el.email,
          date,
          el.status,
          el.dateOfBirth,
          el.address
        ];
      });

      doc.autoTable({
        head: [
          [
            "Username",
            "Email",
            "Tanggal Pendaftaran",
            "Status",
            "Tanggal Lahir",
            "Alamat"
          ]
        ],
        body: data
      });

      doc.save('user-report.pdf')
    }
  }
};
</script>

<style lang="scss" scoped>
.formsuspend::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}

.formsuspend::v-deep .formulate-input .formulate-input-element--button {
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

.font-username {
  font-size: 2em;
}

.font-status {
  font-size: 0.7em;
}

.show {
  display: inline-block;
}

.hide {
  display: none;
}
</style>
<template>
  <div class="event-manage">
    <h3 class="text-left">
      <i class="fa fa-list" aria-hidden="true"></i> Acara
    </h3>
    <hr />
    <div class="card card-style border-radius1">
      <div class="card-body text-left p-5">
        <div class="col-md-12">
          <d iv class="row mb-2 font-weight-bold">
            <div class="row row-data bg-white col-md-10 text-center">
              <span class="col-md-3">Nama Acara</span>
              <span class="col-md-2">Tempat</span>
              <span class="col-md-3">Tanggal Mulai</span>
              <span class="col-md-2">Tiket Terjual</span>
              <span class="col-md-1"></span>
            </div>
            <span class="col-md-2"></span>
          </d>
          <div>
            <div class="row mb-2">
              <div class="row row-data col-md-10">
                <span class="col-md-3">Webinar</span>
                <span class="col-md-2">Bandung</span>
                <span class="col-md-3"> 22 Mei 2021 </span>
                <span class="col-md-2"> 25 </span>
                <span class="col-md-1">
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
    <notifications group="successTerminate" position="bottom right" />
    <notifications group="successunTerminate" position="bottom right" />
    <!-- Modal Detail -->
    <!-- <SweetModal ref="modal">
      <template slot="title">
        <h3 class="text-left font-weight-bold mt-3">
          <h4>Informasi Acara</h4>
        </h3>
      </template>
      <div class="modal-body text-left">
        <div class="row mb-3">
          <div class="offset-md-4 col-md-4">
            <img
              v-if="userDetail[0].imageUrl"
              :src="userDetail[0].imageUrl"
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
    </SweetModal> -->

    <!-- Edit Status Modal -->
    <!-- <SweetModal ref="editModal">
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
    </SweetModal> -->

    <!-- Suspend Modal -->
    <!-- <SweetModal ref="suspendModal">
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
    </SweetModal> -->

    <!-- Warn Modal -->
    <!-- <SweetModal ref="warnModal">
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
    </SweetModal> -->
    -->
  </div>
</template>

<script>
import EOService from '../../../services/eo.service'
import EventService from '../../../services/event.service'

export default {
  name: "eventmanage",
  data(){
     return {
        eoProfile: {},
        eventList: []

     }
  },
  methods: {
    showInfo(id) {
      // this.userDetail = this.userList.filter((user) => user.id === id);
      // this.openFoto(this.userDetail[0].id);
      console.log(id);
      this.$refs.modal.open();
    }
  },
  mounted(){
   //   EO list
     EOService.getEOEvent(this.currUser.auth[1].id)
      .then((res) => {
        if (res) {
         console.log(res)
          this.eoProfile = res.eventOrganizer;
        }
      })
      .catch((error) => {
        console.log(error);
      });

   // event list
    EventService.getEvent(this.eoProfile.id)
      .then((res) => {
        this.eventList = res.data.events;
        this.eventList.forEach((element) => {
          element.detail = false;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
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
</style>
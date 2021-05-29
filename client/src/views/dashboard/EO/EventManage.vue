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
          <div v-for="(event, index) in eventList" :key="index">
            <div class="row mb-2">
              <div class="row row-data col-md-10">
                <span class="col-md-3">{{ event.name }}</span>
                <span class="col-md-2">{{ event.schedule[0].place }}</span>
                <span class="col-md-3 text-center">{{
                  moment(event.schedule[0].startTime).format("DD MMMM YYYY")
                }}</span>
                <span class="col-md-2  text-center">{{ event.reservations.forEach((el)=>{return el.status}) }}</span>
                <span class="col-md-1">
                  <button
                    class="btn btn-info btn-sm border-radius2 offset-md-10"
                    @click="showInfo(event.id)"
                  >
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
              <div class="col-md-2 py-1 px-3">
                <button
                  type="button"
                  @click="terminateUser(event.id)"
                  class="mx-3 text-white btn btn-danger btn-md"
                >
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
                <button
                  @click="editInfo(event.id)"
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
    <SweetModal ref="modal">
      <template slot="title">
        <h3 class="text-left font-weight-bold mt-3">
          <h4>Informasi Acara</h4>
        </h3>
      </template>
      <div class="modal-body text-left">
        <div class="row mb-3">
          <div class="offset-md-4 col-md-4">
            <!-- <img
              v-if="eventDetail[0].imageUrl"
              :src="eventDetail[0].imageUrl"
              width="150px"
              class="img-fluid rounded-circle"
              alt="profile-picture"
            /> -->
          </div>
        </div>
        <div class="row">
          <div class="offset-md-3 col-md-6 text-center">
            <p class="font-username">
              {{ eventDetail[0].name }}
              <span
                :class="[
                  eventDetail[0].status === 'ACTIVE'
                    ? 'btn-success'
                    : 'CANCELED',
                  'py-0 btn btn-sm border-radius2'
                ]"
              >
                <i
                  v-if="eventDetail[0].status === 'ACTIVE'"
                  class="fa fa-check-circle-o"
                  aria-hidden="true"
                ></i>
                <i
                  v-if="eventDetail[0].status === 'CANCELED'"
                  class="fa fa-times"
                  aria-hidden="true"
                ></i>
              </span>
            </p>
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Tagline</div>
          <div class="row-data col-md-6">
            {{ eventDetail[0].tagline }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 text-right mr-3">Tiket Maksimum</div>
          <div class="row-data col-md-6">
            {{ eventDetail[0].maxTickets }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Deskripsi</div>
          <div class="row-data col-md-6">
            {{ eventDetail[0].description }}
          </div>
        </div>
        <div class="row mb-2 border-radius1">
          <div class="p-2 col-md-3 mr-3 text-right">Kurs Pembayaran</div>
          <div class="row-data col-md-6">
            {{ eventDetail[0].currency }}
          </div>
        </div>
      </div>
    </SweetModal>

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
  </div>
</template>

<script>
import EOService from "../../../services/eo.service";
import { SweetModal } from "sweet-modal-vue";
import eventService from "../../../services/event.service";

export default {
  name: "eventmanage",
  components: {
    SweetModal
  },
  data() {
    return {
      eventList: [],
      eventDetail: [
        {
          name: "",
          status: "",
          tagline: "",
          description: "",
          currency: "",
          maxTickets: ""
        }
      ]
    };
  },
  methods: {
    showInfo(id) {
      this.eventDetail = this.eventList.filter((event) => event.id === id);
      console.log(this.eventDetail);
      // this.openFoto(this.eventDetail[0].id);
      this.$refs.modal.open();
    }
  },
  mounted() {
    //   EO list
    EOService.getEOEvent(this.$store.state.auth.user.auth[1].id)
      .then((res) => {
        this.eventList = res.data.events;
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.eventList.map((el) => {
      return eventService.getReservations(el.id).then((res) => {
        res.data.reservations.detail = false;
        return res.data.reservations;
      });
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
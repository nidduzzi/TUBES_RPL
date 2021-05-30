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
              <span class="col-md-2">Tiket Dipesan</span>
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
                <span class="col-md-2 text-center">{{
                  event.reservations.length
                }}</span>
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
                <!-- Cancel Event Button -> Belum ada API -->
                <!-- <button
                  type="button"
                  @click="terminateUser(event.id)"
                  class="ml-3 text-white btn btn-danger btn-md"
                >
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button> -->

                <!-- Edit Event Button -->
                <button
                  @click="editInfo(event.id)"
                  type="button"
                  class="text-white mx-3 btn btn-success btn-md"
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
            <img
              v-if="eventDetail[0].imageUrl"
              :src="eventDetail[0].imageUrl"
              width="200px"
              class="img-fluid"
              alt="profile-picture"
            />
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
    <SweetModal ref="editModal">
      <template slot="title">
        <h3 class="text-left font-weight-bold mt-3">
          <h4>Edit Acara</h4>
        </h3>
      </template>
      <div class="edit-modal-body">
        <FormulateForm class="formevent text-left">
          <FormulateInput type="text" label="Nama" v-model="eventUpdate.name" validation="bail|required"/>
          <FormulateInput type="text" label="Tagline" v-model="eventUpdate.tagline"  validation="bail|required"/>
          <FormulateInput
            type="textarea"
            label="Deskripsi"
            v-model="eventUpdate.description"
          />
          <FormulateInput type="text" label="Kurs Pembayaran" v-model="eventUpdate.currency" validation="bail|required"/>
          <FormulateInput type="number" label="Tiket Maksimum" v-model="eventUpdate.maxTickets" validation="bail|required|number"/>
          <FormulateInput
            type="button"
            @click="updateEvent"
            label="Update"
            class="text-center"
          >
          </FormulateInput>
        </FormulateForm>
      </div>
    </SweetModal>
  </div>
</template>

<script>
import EOService from "../../../services/eo.service";
import eventService from "../../../services/event.service";
import { SweetModal } from "sweet-modal-vue";

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
          maxTickets: "",
          imageUrl: ""
        }
      ],
      eventUpdate: {
        name: "",
        tagline: "",
        description: "",
        currency: "",
        maxTickets: ""
      }
    };
  },
  methods: {
    showInfo(id) {
      this.eventDetail = this.eventList.filter((event) => event.id === id);
      this.openFoto(this.eventDetail[0].id);
      this.$refs.modal.open();
    },
    editInfo(id) {
      this.eventDetail = this.eventList.filter((event) => event.id === id);
      this.$refs.editModal.open();
    },
    openFoto(id) {
      eventService
        .getImage(id, 0)
        .then((res) => res.data)
        .then((data) => {
          this.eventDetail[0].imageUrl = URL.createObjectURL(data);
          this.$forceUpdate();
        })
        .catch((err) => {
          if (process.env.NODE_ENV === "production")
            process.env.console.log(err);
        });
    },
    updateEvent(){
      
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

.formevent::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}

.formevent::v-deep .formulate-input .formulate-input-element--button {
  background-color: #f4743b;
  border-radius: 2em;
}
</style>
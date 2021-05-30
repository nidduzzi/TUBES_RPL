<template>
  <div class="create-event px-5">
    <FormulateForm class="formevent text-left" #default="{ hasErrors }">
      <div class="row">
        <div class="col-md-6">
          <FormulateInput type="text" label="Nama Acara" v-model="name" />
          <FormulateInput type="text" label="Tagline" v-model="tagline" />
          <div class="double-wide">
            <FormulateInput
              type="datetime-local"
              name="datetime"
              label="Tanggal"
              placeholder="Tanggal Acara"
              help="Waktu Acara dimulai"
              validation="required"
              v-model="schedule.startTime"
            />
            <FormulateInput
              name="place"
              type="text"
              label="Tempat"
              placeholder="Tempat Acara"
              validation="bail|required"
              v-model="schedule.place"
            />
          </div>
          <FormulateInput
            name="currency"
            type="text"
            label="Kurs Pembayaran"
            placeholder="Misal: IDR"
            validation="bail|required"
            class="mb-3"
            v-model="currency"
          />
        </div>
        <div class="col-md-6">
          <div class="text-left">
            <div class="foto">
              <h5 class="font-weight-light">Logo Acara</h5>
              <button type="button" class="btn htn-sm btn-dark py-0 mb-2">
                Pilih Foto
              </button>
              <img
                src="../../../assets/slider.jpg"
                class="mb-2 img-fluid w-25 d-block"
                alt=""
              />
            </div>
            <!-- Tags -->
            <h5 class="font-weight-light">Tags</h5>
            <div class="tags d-flex flex-wrap">
              <span
                v-for="(tag, index) in tags"
                :key="index"
                class="tag-item mr-2 border-radius2 mt-2"
              >
                {{ tag.name }}
              </span>
              <button
                @click="tagModal"
                class="btn btn-dark btn-sm py-1 border-radius2"
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-md-12">
          <FormulateInput
            type="textarea"
            label="Deskripsi Acara"
            v-model="description"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <!-- Form Daftar Tiket -->
          <FormulateForm class="formticket card p-4" #default="{ hasErrors }">
            <h4 class="font-weight-light">Tiket</h4>
            <FormulateInput
              type="text"
              label="Nama Tiket"
              v-model="ticket.name"
              validation="bail|required"
            />
            <FormulateInput
              type="number"
              label="Harga Tiket"
              v-model="ticket.price"
              validation="bail|required"
            />
            <FormulateInput
              type="textarea"
              label="Deskripsi Tiket"
              v-model="ticket.description"
            />

            <!-- Atribut  -->
            <h5 class="font-weight-light">Atribut</h5>
            <div class="tags d-flex flex-wrap">
              <span
                v-for="(atribut, index) in atributs"
                :key="index"
                class="tag-item mr-2 border-radius2 mt-2"
              >
                {{ atribut.name }}
              </span>
              <button
                @click="atributModal"
                class="btn btn-dark btn-sm py-1 border-radius2"
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>

            <FormulateInput
              class="text-center mt-2"
              type="button"
              label="Tambahkan"
              @click="addTicketType"
              :disabled="hasErrors"
            >
              <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
            </FormulateInput>
            <!-- ------------ -->
          </FormulateForm>
        </div>
        <!-- Jenis Tiket -->
        <div class="jtiket offset-md-1 col-md-4 text-center px-5 py-3">
          <!-- Thead -->
          <div class="row">
            <div class="col-md-6">
              <h5>Jenis Tiket</h5>
            </div>
            <div class="col-md-6">
              <h5>Harga</h5>
            </div>
          </div>
          <!-- Tbody -->
          <div
            v-for="(ticket, index) in ticketType"
            :key="index"
            class="row row-data mb-2"
          >
            <div class="col-md-6">
              <!-- Jenis Tiket -->
              {{ ticket.name }}
            </div>
            <div class="col-md-6">
              <!-- Harga -->
              {{ ticket.price }}
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="offset-md-11 col-md-12"></div>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-md-12">
          <FormulateInput
            class="text-center mt-2"
            type="button"
            label="Submit This Event"
            @click="createEvent"
            :disabled="hasErrors"
          >
            <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
          </FormulateInput>
        </div>
      </div>
    </FormulateForm>

    <!-- Tag Modal -->
    <SweetModal ref="tagModal">
      <FormulateForm class="formmodal text-left">
        <FormulateInput type="text" label="Tag" v-model="tag.name" />
        <FormulateInput
          type="textarea"
          label="Deskripsi"
          v-model="tag.description"
        />
        <FormulateInput
          type="button"
          @click="addTag"
          label="Tambahkan"
          class="text-center"
        >
        </FormulateInput>
      </FormulateForm>
    </SweetModal>

    <!-- Atribut Modal -->
    <SweetModal ref="atributModal">
      <FormulateForm class="formmodal text-left">
        <FormulateInput type="text" label="Atribut" v-model="atribut.name" />
        <!-- Values  -->
        <h5 class="font-weight-light">Values</h5>
        <div class="tags d-flex flex-wrap mb-3">
          <span
            v-for="(value, index) in atribut.values"
            :key="index"
            class="tag-item mr-2 border-radius2 mt-2"
          >
            {{ value.value }}
          </span>
          <button
            @click="valuesModal"
            class="btn btn-dark btn-sm py-1 border-radius2"
          >
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
        <!-- ------------ -->
        <FormulateInput
          type="button"
          @click="addAtribut"
          label="Tambahkan"
          class="text-center"
        >
        </FormulateInput>
      </FormulateForm>
    </SweetModal>

    <!-- Values Modal -->
    <SweetModal ref="valuesModal">
      <FormulateForm class="formmodal text-left">
        <FormulateInput type="text" label="Value" v-model="nilai.value" />
        <FormulateInput
          type="button"
          @click="addValue"
          label="Tambahkan"
          class="text-center"
        >
        </FormulateInput>
      </FormulateForm>
    </SweetModal>
    <notifications group="tagSuccess" position="bottom right" />
    <notifications group="atributSuccess" position="bottom right" />
  </div>
</template>

<script>
import { SweetModal } from "sweet-modal-vue";
import EventService from "../../../services/event.service";

export default {
  name: "create-event",
  components: {
    SweetModal
  },
  data() {
    return {
      loader: false,
      // client tag data
      tag: {
        name: "",
        description: ""
      },
      // client atribut data
      atribut: {
        name: "A",
        values: []
      },
      // client values for atribut data
      nilai: {
        value: "B"
      },
      // client ticket data
      ticket: {
        name: "",
        description: "",
        price: 0,
        attributes: []
      },
      // client schedule data
      schedule: {
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        allDay: false,
        place: ""
      },

      // array of tag to req API
      tags: [],
      // array of attributs to req API
      atributs: [],
      // array of ticket type to req API
      ticketType: [],
      name: "",
      tagline: "",
      schedules: [],
      currency: "",
      description: ""
    };
  },
  created() {
    this.addTag = this.addTag.bind(this);
  },
  methods: {
    tagModal() {
      this.tag.name = "";
      this.tag.desc = "";
      this.$refs.tagModal.open();
    },
    atributModal() {
      this.atribut.name = "";
      this.atribut.values = [];
      this.$refs.atributModal.open();
    },
    valuesModal() {
      this.nilai.value = "";
      this.$refs.valuesModal.open();
    },
    addAtribut() {
      this.atributs.push({ ...this.atribut });
      this.$refs.atributModal.close();
      // simple
      this.$notify({
        group: "atributSuccess",
        title: "Berhasil",
        text: "Atribute ditambahkan!",
        type: "success"
      });
    },
    addValue() {
      this.atribut.values.push({ ...this.nilai });
      this.$refs.valuesModal.close();
      // simple
      this.$notify({
        group: "valueSuccess",
        title: "Berhasil",
        text: "Value Atribute ditambahkan!",
        type: "success"
      });
    },
    addTag() {
      EventService.createEventTag(this.tag)
        .then((e) => {
          this.tags.push({ id: e.data.tag.id, name: e.data.tag.name });
          this.$refs.tagModal.close();

          this.$notify({
            group: "tagSuccess",
            title: "Berhasil",
            text: "Tag ditambahkan!",
            type: "success"
          });
        })
        .catch((err) => console.log(err));
    },
    addTicketType() {
      this.loader = true;
      this.ticket.attributes = this.atributs;
      this.ticketType.push({
        name: this.ticket.name,
        description: this.ticket.description,
        price: parseInt(this.ticket.price),
        attributes: this.ticket.attributes
      });
      this.loader = false;
    },
    addSchedule() {
      this.schedules.push({
        name: this.schedule.name,
        description: this.schedule.description,
        startTime: new Date(this.schedule.startTime)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        endTime: new Date(this.schedule.startTime)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        allDay: this.schedule.allDay,
        place: this.schedule.place
      });
    },
    createEvent() {
      this.addSchedule();
      var request = {
        name: this.name,
        tagline: this.tagline,
        description: this.description,
        schedule: this.schedules,
        hasRsvp: false,
        tags: this.tags,
        maxTickets: 100,
        unlimitedTickets: false,
        ticketTypes: this.ticketType,
        currency: this.currency
      };

      console.log(request);
      EventService.createEvent(request)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.formevent::v-deep .formulate-input .formulate-input-element,
.formmodal::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}

.formevent::v-deep .formulate-input-element--button,
.formmodal::v-deep .formulate-input .formulate-input-element--button {
  max-width: none;
  background-color: #f4743b;
  border-radius: 2em;
}

@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - 0.5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: 0.5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: 0.5em;
  }
}

.tag-item {
  border: 1px solid black;
  font-size: 0.8em;
  font-weight: 400;
  padding: {
    top: 0.2em;
    bottom: 0.2em;
    left: 0.6em;
    right: 0.6em;
  }
}

.row-data {
  background-color: #efefef;
  border-radius: 0.4em;
  padding: {
    left: 1.2em;
    right: 1.2em;
    top: 0.5em;
    bottom: 0.5em;
  }
  box-shadow: 0 2px 2px rgba($color: #000000, $alpha: 0.2);
}

.jtiket .row-data:nth-child(odd) {
  background-color: #fff;
}
</style>
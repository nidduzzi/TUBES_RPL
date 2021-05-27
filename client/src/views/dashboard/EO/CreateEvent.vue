<template>
  <div class="create-event px-5">
    <FormulateForm class="formevent text-left">
      <div class="row">
        <div class="col-md-6">
          <FormulateInput type="text" label="Nama Acara" />
          <FormulateInput type="text" label="Tagline" />
          <div class="double-wide">
            <FormulateInput
              type="datetime-local"
              name="datetime"
              label="Tanggal"
              placeholder="Tanggal Acara"
              help="Waktu Acara dimulai"
              validation="required"
            />
            <FormulateInput
              name="place"
              type="text"
              label="Tempat"
              placeholder="Tempat Acara"
              validation="bail|required"
            />
          </div>
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
          <FormulateInput type="textarea" label="Deskripsi Acara" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <!-- Form Daftar Tiket -->
          <h4 class="font-weight-light">Tiket</h4>
          <FormulateForm class="formticket">
            <FormulateInput type="text" label="Nama Tiket" />
            <FormulateInput type="number" label="Harga Tiket" />
            <FormulateInput type="textarea" label="Deskripsi Tiket" />

            <!-- Atribut  -->
            <h5 class="font-weight-light">Atribut</h5>
            <div class="tags d-flex flex-wrap">
              <span
                v-for="(atribut, index) in atributs"
                :key="index"
                class="tag-item mr-2 border-radius2 mt-2"
              >
                {{ atribut}}
              </span>
              <button
                @click="atributModal"
                class="btn btn-dark btn-sm py-1 border-radius2"
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            <!-- ------------ -->
          </FormulateForm>
        </div>
        <div class="col-md-6">
           <!-- Jenis Tiket -->
        </div>
      </div>
    </FormulateForm>

    <!-- Tag Modal -->
    <SweetModal ref="tagModal">
      <FormulateForm class="formevent text-left">
        <FormulateInput type="text" label="Tag" v-model="tag.name" />
        <FormulateInput type="textarea" label="Deskripsi" v-model="tag.desc" />
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
      <FormulateForm class="formevent text-left">
        <FormulateInput type="text" label="Atribut" v-model="atribut.name" />
        <!-- Values  -->
        <h5 class="font-weight-light">Values</h5>
        <div class="tags d-flex flex-wrap mb-3">
          <span
            v-for="(value, index) in atributs.values"
            :key="index"
            class="tag-item mr-2 border-radius2 mt-2"
          >
            {{ value }}
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
      <FormulateForm class="formevent text-left">
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
export default {
  name: "create-event",
  components: {
    SweetModal,
  },
  data() {
    return {
      tags: [],
      tag: {
        name: "",
        desc: "",
      },
      atributs: [],
      atribut: {
         name: "A",
         values: []
      },
      nilai: {
         value: "B",
      },
    };
  },
  methods: {
    tagModal() {
      this.$refs.tagModal.open();
    },
    atributModal() {
      this.$refs.atributModal.open();
    },
    valuesModal(){
       this.$refs.valuesModal.open();
    },
    addAtribut(){
      this.atributs.push(this.atribut);
      this.$refs.atributModal.close();
      this.atribut.name = "";
      this.atribut.values = [];
      // simple
      this.$notify({
        group: "atributSuccess",
        title: "Berhasil",
        text: "Atribute ditambahkan!",
        type: "success",
      });
    },
    addValue(){
       console.log(this.nilai);
      this.atribut.values.push(this.nilai);
      this.$refs.valuesModal.close();
      this.nilai.value = "";
      // simple
      this.$notify({
        group: "valueSuccess",
        title: "Berhasil",
        text: "Value Atribute ditambahkan!",
        type: "success",
      });
    },
    addTag() {
      this.tags.push(this.tag);
      this.$refs.tagModal.close();
      this.tag.name = "";
      this.tag.desc = "";
      // simple
      this.$notify({
        group: "tagSuccess",
        title: "Berhasil",
        text: "Tag ditambahkan!",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.formevent::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}

.formevent::v-deep .formulate-input .formulate-input-element--button {
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
</style>
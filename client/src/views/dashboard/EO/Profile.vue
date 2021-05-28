<template>
  <div class="eo-reservation container my-5">
    <div class="card card-style border-radius2">
      <div class="card-body text-left">
        <div class="row pl-3 mt-4">
          <div class="col-md-2 p-3">
            <h4>Profile</h4>
          </div>
        </div>
        <hr />
        <div class="row p-lg-5">
          <div class="col-lg-6">
            <div
              v-if="message"
              :class="['alert', error ? 'alert-danger' : 'alert-success']"
              role="alert"
            >
              <p>{{ message }}</p>
            </div>
            <FormulateForm
              @submit.prevent="updateProfile"
              v-model="eoUpdateProfile"
              class="formprofile"
              #default="{ hasErrors }"
            >
              <FormulateInput
                name="email"
                type="email"
                label="Email"
                placeholder="Email address"
                validation="bail|required|email"
              />
              <FormulateInput
                name="name"
                type="text"
                label="Nama"
                placeholder="Nama"
                validation="bail|required"
              />
              <FormulateInput
                type="textarea"
                label="Alamat"
                name="address"
                validation="bail|required|max:100,length"
                error-behavior="live"
              />
              <FormulateInput
                name="phone"
                type="text"
                label="Telepon"
                placeholder="No Telepon"
                validation="bail|required"
              />
              <FormulateInput
                class="text-center"
                type="button"
                label="Perbarui"
                @click="updateProfile"
                :disabled="hasErrors"
              >
                <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
              </FormulateInput>
            </FormulateForm>
          </div>
          <div
            class="d-flex flex-column align-items-center offset-md-2 col-md-4"
          >
            <div class="text-center">
              <img
                width="200px"
                height="200px"
                v-if="imageUrl"
                :src="imageUrl"
                class="rounded-circle"
                alt="profilePicture"
              />
            </div>
            <FormulateInput
              type="image"
              v-model="fotoProfil.files"
              label="Select an image to upload"
              help="Select a png, jpg or gif to upload."
              validation="mime:image/jpeg,image/png,image/gif"
              @change="fotoChange"
            />
            <div class="d-flex">
              <button type="button" class="btn btn-danger mr-2" @click="removeFotoProfil">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
              <FormulateInput
                type="button"
                label="Upload Foto"
                @click="uploadFoto"
              >
                <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
              </FormulateInput>
            </div>
          </div>
        </div>
      </div>
    </div>
    <notifications group="successUpdate" position="bottom right" />
    <notifications group="successUpdateFoto" position="bottom right" />
    <notifications group="successRemove" position="bottom right" />
  </div>
</template>

<script>
import EOService from "../../../services/eo.service";

const FormData = require("form-data");

export default {
  data() {
    return {
      fotoProfil: {},
      file: "",
      currUser: this.$store.state.auth.user,
      loader: false,
      error: false,
      eoUpdateProfile: {
        email: "",
        name: "",
        address: "",
        password: "",
        phone: ""
      },
      imageUrl: "",
      message: ""
    };
  },
  methods: {
    uploadFoto() {
      const form = new FormData();
      const config = {
        "Content-Type": "multipart/form-data"
      };
      form.append("profilePicture", this.file);
      this.loader = true;
      EOService.updateEOProfilePicture(this.EOProfile.id, form, config)
        .then((res) => {
          // simple
          this.$notify({
            group: "successUpdateFoto",
            title: "Update berhasil!",
            text: "Update foto profile berhasil",
            type: "success"
          });
          this.fotoProfil.files = [];
          this.loader = false;
          this.$forceUpdate();
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fotoChange(e) {
      this.file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(this.file);
    },
    async removeFotoProfil(){
      this.message = "";
      try {
        this.loader = true;
        const res = await EOService.removeEOProfilePicture(
          this.$store.state.auth.user.auth[1].id
        );
        if (res.status != 200) {
          this.error = true;
          this.message = res.data.errors.message;
        } else {
          // simple
          this.$notify({
            group: "successRemove",
            title: "Foto Profil dihapus",
            text: "Foto profil berhasil dihapus",
            type: "success"
          });
          this.message = "Foto berhasil dihapus.";
          this.$forceUpdate();
        }
      } catch (error) {
        this.error = true;
        this.message = error;
      } finally {
        this.loader = false;
      }
    },
    async updateProfile() {
      this.message = "";
      try {
        this.loader = true;
        const res = await EOService.updateEO(
          this.$store.state.auth.user.auth[1].id,
          this.eoUpdateProfile,
        );
        if (res.status != 200) {
          this.error = true;
          this.message = res.data.errors.message;
        } else {
          // simple
          this.$notify({
            group: "successUpdate",
            title: "Update user berhasil!",
            text: "Update profile berhasil",
            type: "success"
          });
          this.message = "Data berhasil diperbarui.";
        }
      } catch (error) {
        this.error = true;
        this.message = error;
      } finally {
        this.loader = false;
      }
    }
  },
  mounted() {
    EOService.getEO(this.currUser.auth[1].id).then(
      (res) => {
        this.EOProfile = res.eventOrganizer;
        this.eoUpdateProfile.email = this.EOProfile.email;
        this.eoUpdateProfile.name = this.EOProfile.name;
        this.eoUpdateProfile.address = this.EOProfile.address;
        this.eoUpdateProfile.phone = this.EOProfile.phone;
      },
      (error) => {
        this.EOProfile =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );

    // get foto profile
    EOService.getEOProfilePicture(this.currUser.auth[1].id)
      .then((res) => res.data)
      .then((data) => {
        this.imageUrl = URL.createObjectURL(data);
        this.$forceUpdate();
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "production") process.env.console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.formprofile::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}

.formprofile::v-deep .formulate-input .formulate-input-element--button {
  background-color: #f4743b;
  border-radius: 2em;
}

.btn-tag {
  background-color: #beee62;
  &:hover {
    background: darken(#beee62, 10%);
  }
}

.btn-beli {
  background-color: #f4743b;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}

.btn {
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  font-weight: 600;
}

.font-1 {
  font-size: 0.8em;
}
</style>
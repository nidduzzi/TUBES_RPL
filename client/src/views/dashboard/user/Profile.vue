<template>
  <div class="user-reservation container my-5">
    <div class="card card-style border-radius2">
      <div class="card-body text-left">
        <div class="row pl-3 mt-4">
          <div class="col-md-2 p-3">
            <h4>Profile</h4>
          </div>
          <div class="offset-md-7 col-md-3">
            <div class="text-right pb-3">
              <router-link
                to="/user/dashboard/eoregister"
                class="btn btn-beli mt-3 font-1 text-white"
              >
                Register as Event Organizer
              </router-link>
            </div>
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
              v-model="userUpdateProfile"
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
                name="username"
                type="text"
                label="Username"
                placeholder="Username"
                validation="bail|required|alpha:latin"
              />
              <FormulateInput
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                error-behavior="live"
                :validation="[
                  [
                    'matches',
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@$!%*?&]{8}$/
                  ]
                ]"
                :validation-messages="{
                  matches:
                    'Password must contain 8 character contain symbol (@$!%*?&), capital, number'
                }"
                help="Take attention to password requirement"
              />
              <FormulateInput
                type="textarea"
                label="Alamat"
                name="address"
                validation="bail|required|max:100,length"
                error-behavior="live"
              />
              <FormulateInput
                type="date"
                name="dateOfBirth"
                label="Tanggal Lahir"
                placeholder=""
                validation="bail|required|before:2021-05-21"
                min="1900-01-01"
                max="2021-05-02"
                error-behavior="live"
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
                v-if="userUpdateProfile.imageUrl"
                :src="userUpdateProfile.imageUrl"
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
              <button type="button" class="btn btn-danger mr-2">
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
  </div>
</template>

<script>
import UserService from "../../../services/user.service";
import moment from "moment";

const FormData = require("form-data");

export default {
  data() {
    return {
      file: "",
      fotoProfil: {},
      currUser: this.$store.state.auth.user,
      loader: false,
      error: false,
      userUpdateProfile: {
        email: "",
        username: "",
        password: "",
        address: "",
        dateOfBirth: "",
        imageUrl: ""
      },
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
      UserService.updateProfilePicture(this.userProfile.id, form, config)
        .then((res) => {
          // simple
          this.$notify({
            group: "successUpdateFoto",
            title: "Update berhasil!",
            text: "Update foto profile berhasil",
            type: "success"
          });
          this.fotoProfil.files = [];
          this.loader=false;
          this.$forceUpdate();
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fotoChange(e) {
      this.file = e.target.files[0];
      this.userUpdateProfile.imageUrl = URL.createObjectURL(this.file);
    },
    processForm() {
      const form = new FormData();
      form.append("username", this.userUpdateProfile.username);
      form.append("email", this.userUpdateProfile.email);
      form.append("password", this.userUpdateProfile.password);
      form.append("address", this.userUpdateProfile.address);
      form.append("dateOfBirth", this.userUpdateProfile.dateOfBirth);
      return form;
    },
    async updateProfile() {
      this.message = "";
      const data = this.processForm();
      try {
        this.loader = true;
        const res = await UserService.updateUser(
          this.$store.state.auth.user.auth[0].id,
          data,
          {
            "Content-Type": "multipart/form-data"
          }
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
    UserService.getUser(this.currUser.auth[0].id).then(
      (res) => {
        this.userProfile = res.data.user;
        this.userUpdateProfile.email = this.userProfile.email;
        this.userUpdateProfile.username = this.userProfile.username;
        this.userUpdateProfile.address = this.userProfile.address;
        this.userUpdateProfile.dateOfBirth = moment(
          this.userProfile.dateOfBirth
        ).format("YYYY-MM-DD");
      },
      (error) => {
        this.userProfile =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );

    // get foto profile
    UserService.getProfilePicture(this.currUser.auth[0].id)
      .then((res) => res.data)
      .then((data) => {
        this.userUpdateProfile.imageUrl = URL.createObjectURL(data);
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
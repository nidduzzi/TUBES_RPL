<template>
  <div class="user-reservation container my-5">
    <div class="card">
      <div class="card-body text-left">
        <div class="row pl-3 mt-4">
          <h4>Profile</h4>
        </div>
        <div class="row p-lg-5">
          <div class="col-lg-6">
            <FormulateForm
              @submit.prevent="updateProfile"
              v-model="userProfile"
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
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@$!%*?&]{8}$/,
                  ],
                ]"
                :validation-messages="{
                  matches:
                    'Password must contain 8 character contain symbol (@$!%*?&), capital, number',
                }"
                help="Take attention to password requirement"
              />
              <FormulateInput
                type="textarea"
                label="Alamat"
                name="alamat"
                validation="bail|required|max:100,length"
                error-behavior="live"
              />
              <FormulateInput
                type="date"
                name="birth"
                label="Tanggal Lahir"
                placeholder=""
                validation="bail|required|before:2021-05-21"
                min="1900-01-01"
                max="2021-05-02"
                error-behavior="live"
              />
              <button @click="updateProfile" class="btn btn-tag w-75">
                <div v-if="loading"><i class="fa fa-spinner fa-spin"></i></div>
                <div v-else>Perbarui</div>
              </button>
            </FormulateForm>
          </div>
          <div
            class="d-flex flex-column align-items-center offset-md-2 col-md-4"
          >
            <div class="text-center">
              <img
                width="200px"
                height="200px"
                src="../../../assets/slider.jpg"
                class="rounded-circle"
                alt="profilePicture"
              />
            </div>
            <button type="button" class="btn btn-beli mt-3 f3-light">
              Verifikasi Event Organizer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../../services/user.service";

export default {
  data() {
    return {
      currUser: this.$store.state.auth.user,
      loading: false,
      userProfile: {
        email: "",
        username: "",
        password: "",
        alamat: "",
        birth: "",
      },
    };
  },
  methods: {
    async updateProfile() {
      await this.$store.dispatch("auth/refresh").then(
          ({status, headers, data}) => {
            if(status === 200 || status === 204){
              console.log('success-referesh');
              // jwt token
              localStorage.user = JSON.stringify(data);
              // acccess token
              document.cookie = headers['set-cookie'];
            }
          })
          .catch(error => {
            console.log(error);
          })
      // console.log(this.userProfile);
    },
  },
  mounted() {
    UserService.getUser(this.currUser.auth[0].id).then(
      (res) => {
        this.userProfile = res.data.user;
      },
      (error) => {
        this.userProfile =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style lang="scss" scoped>
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
</style>
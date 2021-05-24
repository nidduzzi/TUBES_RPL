<template>
  <div class="eo-form container mt-5">
    <div class="offset-md-2 col-md-8 card card-style border-radius2">
      <div class="card-body text-left">
        <div class="row pl-3 mt-4">
          <h4>Register EO</h4>
        </div>
        <hr />
        <div
          v-if="message"
          :class="['alert', error ? 'alert-danger' : 'alert-success']"
          role="alert"
        >
          <p>{{ message }}</p>
        </div>
        <FormulateForm
          @submit="RegisterEO"
          v-model="userToEO"
          class="form-register"
        >
          <FormulateInput
            name="name"
            type="text"
            label="Nama Event Organizer"
            placeholder="Event Organizer"
            validation="bail|required"
          />
          <FormulateInput
            name="email"
            type="email"
            label="Email"
            placeholder="Email address"
            validation="bail|required|email"
          />
          <FormulateInput
            type="text"
            name="phone"
            label="Telepon"
            placeholder=""
            validation="bail|required"
            error-behavior="live"
          />
          <FormulateInput
            type="textarea"
            label="Alamat"
            name="address"
            validation="bail|required|max:100,length"
            error-behavior="live"
          />
          <FormulateInput class="text-center" type="submit" label="Submit">
            <div v-if="loading"><i class="fa fa-spinner fa-spin"></i></div>
          </FormulateInput>
        </FormulateForm>
      </div>
    </div>
  </div>
</template>

<script>
import EOService from "../../../services/eo.service";

export default {
  data() {
    return {
      currUser: this.$store.state.auth.user,
      loading: false,
      error: false,
      userToEO: {
        id_user: "",
        email: "",
        name: "",
        phone: "",
        address: "",
      },
      message: "",
    };
  },
  methods: {
    async RegisterEO(data) {
      this.message = "";
      this.loading = true;
      // try {
      const res = await EOService.registerEO(data);
      if (res.status == 200) {
        this.message = "Berhasil Mendaftar Sebagai EO";
      } else {
        this.error = true;
        this.message = res.data.errors.message;
      }
        this.loading = false;
    },
  },
  mounted() {
    this.userToEO.id_user = this.currUser.auth[0].id;
  },
};
</script>

<style lang="scss" scoped>
.eo-form {
  box-sizing: border-box;
}

.form-register::v-deep .formulate-input .formulate-input-element {
  max-width: none;
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
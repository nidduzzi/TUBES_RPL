<template>
  <FormulateForm class="signup-form" v-model="formValues">
    <h2 class="form-title">Sign Up</h2>
    <hr class="w-75" />
    <hr class="w-50" />
    <ul v-if="errors">
      <p>{{ errors }}</p>
    </ul>
    <FormulateInput
      name="username"
      type="text"
      label="Username"
      placeholder="Username"
      validation="bail|required|alpha:latin"
    />
    <FormulateInput
      name="email"
      type="email"
      label="Email"
      placeholder="Email address"
      validation="bail|required|email"
    />
    <div class="double-wide">
      <FormulateInput
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        error-behavior="live"
        :validation="[
          ['matches', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@$!%*?&]{8}$/],
        ]"
        :validation-messages="{
          matches:
            'Password must contain 8 character contain symbol (@$!%*?&), capital, number',
        }"
        help="Take attention to password requirement"
      />
      <FormulateInput
        name="password_confirm"
        type="password"
        label="Confirm your password"
        placeholder="Confirm password"
        validation="bail|required|confirm"
        validation-name="Confirmation"
      />
    </div>
    <!-- <FormulateInput
      type="date"
      name="birth"
      label="Date of Birth"
      placeholder="Sample date placeholder"
      help="Tanggal Lahir"
      validation="required|before:2021-05-02"
      min="1900-01-01"
      max="2021-05-02"
      error-behavior="live"
    />
    <FormulateInput
      type="textarea"
      label="Address"
      validation="required|max:100,length"
      error-behavior="live"
    /> -->
    <FormulateInput
      class="text-center py-0"
      type="button"
      label="Sign me up"
      @click="Register"
    >
      <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
    </FormulateInput>
  </FormulateForm>
</template>

<script>
import axios from "axios";

export default {
  name: "signupform",
  data() {
    return {
      formValues: {},
      postBody: "",
      errors: "",
      loader: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push(`/user/dashboard`);
    }
  },
  methods: {
    processData() {
      const { username, email, password } = this.formValues;
      this.formValues = {};
      const data = { username, email, password };
      this.postBody = JSON.stringify(data);
    },
    async Register() {
      this.errors = "";
      this.processData();
      this.loader = true;
      try {
        await axios.post(
          `${process.env.VUE_APP_BASE_API}/users`,
          this.postBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (e) {
        this.errors = e;
      } finally {
        this.loader = false;
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signup-form {
  margin: auto;
  background-color: white;
  padding: 2em;
  border-radius: 1em;
  max-width: 500px;
  box-sizing: border-box;
}

.form-title {
  margin-top: 0;
}

.signup-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}

.button-orange {
  background-color: #f4743b;
  color: white;
  border-radius: 1em;
  &:hover {
    background: darken(#f4743b, 10%);
  }
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

.formulate-input {
  text-align: left;
}
</style>
<template>
  <FormulateForm class="signup-form" v-model="formValues">
    <h2 class="form-title">Sign Up</h2>
    <hr class="w-75" />
    <hr class="w-50" />

    <FormulateInput
      name="email"
      type="email"
      label="Email"
      placeholder="Email address"
      validation="required|email"
    />

    <FormulateInput
      name="name"
      type="text"
      label="Name"
      placeholder="Your name"
      validation="required"
    />
    <div class="double-wide">
      <FormulateInput
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        validation="required"
      />
      <FormulateInput
        name="password_confirm"
        type="password"
        label="Confirm your password"
        placeholder="Confirm password"
        validation="required|confirm"
        validation-name="Confirmation"
      />
    </div>
    <FormulateInput
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
    />
    <FormulateInput class="text-center" type="submit" label="Sign me up" />
  </FormulateForm>
</template>

<script>
export default {
  name: "signupform",
  data() {
    return {
      formValues: {},
    };
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
      background: darken(#F4743B, 10%);
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
<template>
  <div class="user-reservation container my-5">
    <div class="card">
      <div class="card-body text-left">
        <div class="row p-md-5">
          <div class="col-md-6">
            <h4>Akun</h4>
            <form @submit.prevent="updateProfile">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" v-model="email" />
              </div>
              <div class="form-group">
                <label for="text">Username</label>
                <input type="text" class="form-control" v-model="username" />
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
              </div>
              <button type="submit" class="btn btn-tag btn-block">
                <div v-if="loading"><i class="fa fa-spinner fa-spin"></i></div>
                <div v-else>Login</div>
              </button>
            </form>
          </div>
          <div class="offset-md-2 col-md-3">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    updateProfile() {},
  },
};
</script>

<style lang="scss" scoped>
.btn-tag {
  background-color: #beee62;
  border-radius: 5em;
}

.btn-beli {
  background-color: #f4743b;
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  font-weight: 600;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}
</style>
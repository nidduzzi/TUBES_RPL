<template>
  <div class="formlogin">
    <div class="row w-100">
      <div class="offset-lg-3 col-lg-6">
        <div v-if="message" class="alert alert-danger" role="alert">
          <p>{{ message.message }}</p>
        </div>
        <div class="card">
          <img src="../assets/login.jpg" class="card-img-top" />
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="text">Username/Email</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.username"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password"
                />
              </div>
              <label class="question">Belum punya akun ?</label>
              <router-link
                to="/signup"
                class="question font-weight-bold linked"
              >
                Signup here</router-link
              >
              <button type="submit" class="btn button-orange btn-block">
                <div v-if="loading"><i class="fa fa-spinner fa-spin"></i></div>
                <div v-else>Login</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../model/userCredential";

export default {
  name: "loginform",
  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      message: "",
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
    handleLogin() {
      this.loading = true;
      this.message = "";
      if (this.user.username.includes("@")) {
        this.user.email = this.user.username;
        this.user.username = "";
      } else {
        this.user.email = "default@yahoo.com";
      }
      if ((this.user.username || this.user.email) && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/user/dashboard");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");

* {
  box-sizing: border-box;
}

.formlogin {
  padding: {
    top: 10em;
    bottom: 10em;
  }
  min-height: 100%;
  margin: 0;
}

.button-orange {
  background-color: #f4743b;
  color: white;
  border-radius: 2em;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}

.card {
  padding: 0.6em 0;
  margin-top: 0;
  margin-bottom: 0;
  flex-direction: row;
  border-radius: 1em;
  img {
    border-radius: 1em 0 0 1em;
    width: 50%;
  }
}

.card-body {
  text-align: left;
}

label {
  font-size: 0.8em;
  font-weight: bold;
}

.form-control {
  border-radius: 25px;
}

.question {
  font : {
    weight: 400;
    size: 0.6em;
  }
}

.linked {
  text-decoration: none;
}

@media only screen and (max-width: 768px) {
  .card img {
    display: none;
  }
  .card-body {
    padding: 0.5em 1.2em;
  }
  .card-body .card-text {
    margin: 0em;
  }
  .card {
    margin: {
      top: 2em;
      bottom: 2em;
      left: 2em;
    }
  }
}
@media only screen and (max-width: 1200px) {
  .card img {
    width: 50%;
  }
}
</style>
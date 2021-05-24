<template>
  <div class="formlogin">
    <div class="row w-100">
      <div class="offset-lg-3 col-lg-6">
        <div v-if="message" class="alert alert-danger" role="alert">
          <p>{{ message }}</p>
        </div>
        <div class="card">
          <img src="../assets/admin.jpg" class="card-img-top p-4" />
          <div class="card-body">
            <h2 class="text-center">Admin</h2>
            <hr class="w-75" />
            <hr class="w-50" />
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="text">Username</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="admin.username"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="admin.password"
                />
              </div>
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
import Admin from "../model/adminCredential";

export default {
  name: "adminform",
  data() {
    return {
      admin: new Admin("", ""),
      loading: false,
      message: ""
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push(`/admin/dashboard`);
    }
  },
  methods: {
     handleLogin() {
      this.loading = true;
      this.message = "";
      if (this.admin.username && this.admin.password) {
        this.$store.dispatch("auth/adminlogin", this.admin).then(
          () => {
            this.$router.push("/admin/dashboard");
          })
          .catch((error) => {
            this.loading = false;
            this.message = error.response.data.message;
          });
      }
    },
  }
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
      bottom:10em;
   }
   min-height:100%;
   margin: 0;
}

.button-orange {
   background-color: #F4743B;
   color:white;
   border-radius: 2em;
   &:hover {
      background: darken(#F4743B, 10%);
   }
}

.card {
   padding: .6em 0;
   margin-top : 0;
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
   font-size: .8em;
   font-weight: bold;
}

.form-control {
   border-radius: 25px;
}

@media only screen and (max-width: 768px) {
  .card img {
     display:none;
  }
  .card-body {
    padding: 0.5em 1.2em;
  }
  .card-body .card-text {
    margin: 0em;
  }
  .card {
     margin: {
        top:2em;
        bottom:2em;
        left:2em;
     };
  }
}
@media only screen and (max-width: 1200px) {
  .card img {
    width: 50%;
  }
}
</style>
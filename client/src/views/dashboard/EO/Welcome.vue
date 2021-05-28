<template>
  <div class="welcome text-left">
    <img
      src="../../../assets/banner.png"
      class="img-fluid"
      alt="wlcome-image"
    />
    <h1 class="mt-4">Selamat Datang, {{ eoProfile.name }}</h1>
    <p>
      <b>Dashboard Event Organizer</b>, buat acara kalian atau kelola acara yang
      sudah ada.
    </p>
    <router-link
      to="/eo/dashboard/event/create"
      class="btn btn-orange border-radius1"
    >
      Acara Baru
    </router-link>
  </div>
</template>

<script>
import EOService from "../../../services/eo.service";
import UserService from "../../../services/user.service";

export default {
  name: "eo-welcome",
  data() {
    return {
      currUser: this.$store.state.auth.user,
      eoProfile: {
        name: "",
      },
    };
  },
  mounted() {
    EOService.getEO(this.currUser.auth[1].id)
      .then((res) => {
        if (res) {
          this.eoProfile = res.eventOrganizer;
        }
      })
      .catch((error) => {
        console.log(error);
      });

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
.btn-orange {
  background-color: #f4743b;
  &:hover {
    background: darken(#f4743b, 10%);
  }
  color: white;
  font-style: italic;
  font-weight: bold;
}
</style>
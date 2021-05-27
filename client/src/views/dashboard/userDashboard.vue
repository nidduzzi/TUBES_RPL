<template>
  <div class="dashboard">
    <sidebar-menu :menu="menu" :collapsed="true">
      <span slot="toggle-icon"
        ><i class="fa fa-arrows-h" aria-hidden="true"></i
      ></span>
      <span slot="dropdown-icon"
        ><i class="fa fa-angle-right" aria-hidden="true"></i
      ></span>
    </sidebar-menu>
    <div class="container">
      <VueNavigationBar :options="navbarOptions" @vnb-item-clicked="logOut">
        <template v-slot:custom-section>
          <div class="custom-section-content offset-md-8 d-flex">
            <img
              v-if="userProfile.imageUrl"
              :src="userProfile.imageUrl"
              class="img-fluid rounded-circle"
              style="
                border-radius: 50%;
                overflow: hidden;
                width: 2rem;
                height: 2rem;
                background-size: cover;
              "
              alt="profile"
            />
          </div>
        </template>
      </VueNavigationBar>
    </div>
    <h1 class="container text-left mt-4">
      {{ userProfile.username }}'s Dashboard

      <div class="text-left">
        <button
          v-if="!verified"
          type="button"
          class="text-white btn btn-resend mt-3 font-1"
          @click="resendEmail"
        >
          <div v-if="loader"><i class="fa fa-spinner fa-spin"></i></div>
          <div v-else>
            <i class="fa fa-envelope-o mr-2" aria-hidden="true"></i
            ><span class="font-1">Resend Verification Email</span>
          </div>
        </button>
      </div>
    </h1>
    <router-view :model="userProfile"></router-view>
    <notifications group="successLogin" position="bottom right" />
    <notifications group="verifyEmail" position="bottom right" />
    <notifications group="succesVerify" position="bottom right" />
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import UserService from "../../services/user.service";

export default {
  name: "dashboard",
  components: {
    VueNavigationBar,
    SidebarMenu
  },
  data() {
    return {
      currUser: this.$store.state.auth.user,
      userProfile: {
        username: ""
      },
      loader: false,
      verified: false,
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: { name: "landing" },
        brandImage: require("../../assets/iconTiketin.png"),
        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#661c23",
        collapseButtonCloseColor: "#661c23",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        tooltipPlacement: "bottom",
        menuOptionsRight: [
          {
            type: "link",
            text: "Event Organizer",
            path: "/user/dashboard/eoregister",
            class: "font-weight-bold"
          },
          {
            type: "link",
            text: "",
            arrowColor: "orange",
            path: { name: "dashboard" },
            class: "username",
            subMenuOptions: [
              {
                type: "link",
                text: "Pemberitahuan",
                path: "/user/dashboard/notifications",
                iconLeft: "<img class='fa fa-bell' aria-hidden='true'></img>"
              },
              {
                isLinkAction: true,
                type: "link",
                text: "Logout",
                path: { name: "login" },
                iconLeft: "<i class='fa fa-sign-out' aria-hidden='true'></i>"
              }
            ]
          }
        ]
      },
      menu: [
        {
          header: true,
          title: `${
            this.$store.state.auth.user.auth[0].role[0].toUpperCase() +
            this.$store.state.auth.user.auth[0].role.slice(1)
          } Dashboard`,
          hiddenOnCollapse: true
        },
        {
          href: {
            path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/profile`
          },
          title: "Profil",
          icon: "fa fa-user"
        },
        {
          href: {
            path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/reservation/list`
          },
          title: "Reservasi",
          icon: "fa fa-paperclip",
          child: [
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/reservation/list`
              },
              title: "Data Reservasi",
              icon: "fa fa-th-list"
            },
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/reservation/checkorder`
              },
              title: "Konfirmasi Reservasi",
              icon: "fa  fa-check-square-o "
            },
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/reservation/history`
              },
              title: "Riwayat Reservasi",
              icon: "fa fa-history"
            }
          ]
        }
      ]
    };
  },
  methods: {
    logOut(text) {
      if (text === "Logout") {
        this.$store.dispatch("auth/logout");
        location.reload();
      }
    },
    async resendEmail() {
      this.loader = true;
      try {
        const res = await UserService.resendVerifyEmail(this.userProfile.id);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successVerify",
            title: "Verifikasi Email berhasil",
            text: `Verifikasi akun berhasil!`,
            type: "success"
          });

          this.loader = false;
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    UserService.getUser(this.currUser.auth[0].id).then(
      (res) => {
        this.userProfile = res.data.user;

        // email checking
        if (!this.userProfile.emailVerified) {
          this.$notify({
            group: "verifyEmail",
            title: `Verikasi Email`,
            text:
              "Verifikasi email anda segera untuk menikmati fitur di Tiketin",
            type: "warn"
          });
        } else {
          this.verified = true;
        }

        this.$notify({
          group: "successLogin",
          title: `${this.userProfile.username}!, User Dashboard`,
          text: "Selamat Datang!",
          type: "success"
        });
        this.navbarOptions.menuOptionsRight[1].text = this.userProfile.username;
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
        this.userProfile.imageUrl = URL.createObjectURL(data);
        this.$forceUpdate();
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "production") process.env.console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.vnb {
  @media (min-width: 992px) {
    .username {
      color: #ce1e1e;
      font-size: 4em;
    }
  }
}

.btn-resend {
  background-color: #f4743b;
}

.font-1 {
  font-size: 0.9rem;
}

.btn-beli {
  background-color: #f4743b;
  &:hover {
    background: darken(#f4743b, 10%);
  }
  border-radius: 3em;
}
</style>


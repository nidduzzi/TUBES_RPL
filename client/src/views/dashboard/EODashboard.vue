<template>
  <div class="eo-dashboard">
    <sidebar-menu :menu="menu" :collapsed="true">
      <span slot="toggle-icon"
        ><i class="fa fa-arrows-h" aria-hidden="true"></i
      ></span>
      <span slot="dropdown-icon"
        ><i class="fa fa-angle-right" aria-hidden="true"></i
      ></span>
    </sidebar-menu>
    <div class="container">
      <VueNavigationBar :options="navbarOptions" @vnb-item-clicked="logOut" />
    </div>
    <div class="container">
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
      <router-view></router-view>
    </div>
    <notifications group="successLoginEO" position="bottom right" />
    <notifications group="verifyEmail" position="bottom right" />
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import EOService from "../../services/eo.service";
import UserService from "../../services/user.service";

export default {
  name: "eo-dashboard",
  components: {
    VueNavigationBar,
    SidebarMenu
  },
  data() {
    return {
      verified: false,
      currUser: this.$store.state.auth.user,
      eoProfile: {
        name: ""
      },
      loader: false,
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: { name: "admin-dashboard" },
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
            text: "User",
            path: "/user/dashboard",
            class: "font-weight-bold"
          },
          {
            type: "link",
            text: "",
            arrowColor: "orange",
            path: { name: "dashboard" },
            subMenuOptions: [
              {
                type: "link",
                text: "Pemberitahuan",
                path: "/eo/dashboard/notifications",
                iconLeft: "<i class='fa fa-bell' aria-hidden='true'></i>"
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
          title: `${this.$store.state.auth.user.auth[1].role} Dashboard`,
          hiddenOnCollapse: true
        },
        {
          href: {
            path: `/${this.$store.state.auth.user.auth[1].role}/dashboard/profile`
          },
          title: "Profil",
          icon: "fa fa-user"
        },
        {
          href: {
            path: `/${this.$store.state.auth.user.auth[1].role}/dashboard/event`
          },
          title: "Acara",
          icon: "fa fa-calendar-o",
          child: [
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[1].role}/dashboard/event/`
              },
              title: "Daftar Acara",
              icon: "fa fa-th-list"
            },
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[1].role}/dashboard/event/create`
              },
              title: "Acara Baru",
              icon: "fa fa-calendar-plus-o"
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
        const res = await EOService.resendVerifyEmailEO(this.eoProfile.id);
        if (res.status === 200) {
          // simple
          this.$notify({
            group: "successVerify",
            title: "Verifikasi Email berhasil",
            text: `Verifikasi akun berhasil!`,
            type: "success"
          });

          this.loader = false;
          this.$forceUpdate();
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    EOService.getEO(this.currUser.auth[1].id)
      .then((res) => {
        if (res) {
          this.eoProfile = res.eventOrganizer;
          this.navbarOptions.menuOptionsRight[1].text = this.eoProfile.name;
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

    // email checking
    if (!this.eoProfile.emailVerified) {
      this.$notify({
        group: "verifyEmail",
        title: `Verikasi Email`,
        text: "Verifikasi email anda segera untuk menikmati fitur di Tiketin",
        type: "warn"
      });
    } else {
      this.verified = true;
    }
  }
};
</script>

<style lang="scss">
.vnb {
  @media (min-width: 992px) {
  }
}

.btn-resend {
  background-color: #f4743b;
  margin-bottom: 2em;
}
</style>


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
      <router-view></router-view>
    </div>
    <notifications group="successLoginEO" position="bottom right" />
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
    SidebarMenu,
  },
  data() {
    return {
      currUser: this.$store.state.auth.user,
      eoProfile: {
        name: "",
      },
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
            class: "font-weight-bold",
          },
          {
            type: "link",
            text: "",
            arrowColor: "orange",
            path: { name: "dashboard" },
            subMenuOptions: [
              {
                isLinkAction: true,
                type: "link",
                text: "Logout",
                path: { name: "login" },
                iconLeft: "<i class='fa fa-sign-out' aria-hidden='true'></i>",
              },
            ],
          },
        ],
      },
      menu: [
        {
          header: true,
          title: `${this.$store.state.auth.user.auth[1].role} Dashboard`,
          hiddenOnCollapse: true,
        },
        {
          href: {
            path: `/${this.$store.state.auth.user.auth[1].role}/dashboard/profile`,
          },
          title: "Profil",
          icon: "fa fa-user",
        },
        {
          href: {
            path: `/${this.$store.state.auth.user.auth[1].role}/dashboard/event`,
          },
          title: "Acara",
          icon: "fa fa-calendar-o",
          child: [
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[1].role}/dashboard/event/`,
              },
              title: "Daftar Acara",
              icon: "fa fa-th-list",
            },
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[1].role}/dashboard/event/create`,
              },
              title: "Acara Baru",
              icon: "fa fa-calendar-plus-o",
            },
          ],
        },
      ],
    };
  },
  methods: {
    logOut(text) {
      if (text === "Logout") {
        this.$store.dispatch("auth/logout");
        location.reload();
      }
    },
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
  },
};
</script>

<style lang="scss">
.vnb {
  @media (min-width: 992px) {
  }
}
</style>


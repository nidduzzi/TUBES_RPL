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
      <VueNavigationBar :options="navbarOptions" @vnb-item-clicked="logOut" />
    </div>
    <h1 class="container text-left mt-4">{{ userProfile.username }}'s Dashboard</h1>
    <router-view :model="userProfile"></router-view>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import UserService from "../../services/user.service";

let role = "user";
export default {
  name: "dashboard",
  components: {
    VueNavigationBar,
    SidebarMenu,
  },
  data() {
    return {
      currUser: this.$store.state.auth.user,
      userProfile: {
        id: 0,
        username: "",
        email: "",
        emailVerified: Boolean,
        ragistrationDate: "",
        profilePicture: "",
      },
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
            path: { name: "eventorganizer" },
            class: "font-weight-bold",
          },
          {
            type: "link",
            text: "",
            arrowColor: "orange",
            path: { name: "dashboard" },
            class: "username",
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
          title: "User Dashboard",
          hiddenOnCollapse: true,
        },
        {
          href: { path: `/${role}/dashboard/profile` },
          title: "Profil",
          icon: "fa fa-user",
        },
        {
          href: { path: `/${role}/dashboard/reservation` },
          title: "Reservasi",
          icon: "fa fa-paperclip",
          child: [
            {
              href: { path: `/${role}/dashboard/reservation/list` },
              title: "Data Reservasi",
              icon: "fa fa-th-list",
            },
            {
              href: { path: `/${role}/dashboard/reservation/checkorder` },
              title: "Konfirmasi Reservasi",
              icon: "fa  fa-check-square-o ",
            },
            {
              href: { path: `/${role}/dashboard/reservation/history` },
              title: "Riwayat Reservasi",
              icon: "fa fa-history",
            },
          ],
        },
      ],
    };
  },
  methods : {
    logOut(text) {
      if(text === 'Logout'){
        this.$store.dispatch("auth/logout");
        location.reload();
      }
    },
  },
  mounted() {
    UserService.getUser(this.currUser.auth[0].id).then(
      (res) => {
        this.userProfile = res.data.user;
        this.navbarOptions.menuOptionsRight[1].text = this.userProfile.username;
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
.vnb {
  @media (min-width: 992px) {
    .username {
      color: #ce1e1e;
      font-size: 4em;
    }
  }
}
</style>


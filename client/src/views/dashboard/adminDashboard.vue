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
    <h1 class="container text-left mt-4">
      {{ userProfile.username }}'s Dashboard
    </h1>
    <router-view></router-view>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import AdminService from "../../services/admin.service";

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
        username: "",
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
          title: `${this.$store.state.auth.user.auth[0].role} Dashboard`,
          hiddenOnCollapse: true,
        },
        {
          href: {
            path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/profile`,
          },
          title: "Profil",
          icon: "fa fa-user",
        },
        {
          href: {
            path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/event`,
          },
          title: "Pengelolaan",
          icon: "fa fa-wrench",
          child: [
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/event`,
              },
              title: "Event Organizer",
              icon: "fa fa-building-o",
            },
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/userlist`,
              },
              title: "User",
              icon: "fa fa-user-circle",
            },
            {
              href: {
                path: `/${this.$store.state.auth.user.auth[0].role}/dashboard/report`,
              },
              title: "Laporan",
              icon: "fa fa-list-alt",
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
    AdminService.getAdmin(this.currUser.auth[0].id)
      .then((res) => {
        if(res.data){
          this.userProfile = res.data.admin;
          this.navbarOptions.menuOptionsRight[0].text = this.userProfile.username;
        }
      })
      .catch((error) => {
        console.log(error);
      });
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


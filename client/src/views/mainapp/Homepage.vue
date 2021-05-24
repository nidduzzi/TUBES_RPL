<template>
  <div class="home">
    <NProgress />
    <div class="container">
      <VueNavigationBar
        :class="[isSticky ? stickyClass : '']"
        :options="navbarOptions"
        @vnb-item-clicked="logOut"
      />
    </div>
    <router-view />
    <Footer />
    
  </div>
</template>

<script>
import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Footer from "@/components/Footer.vue";
import store from '../../store';

const Daftar = {
  type: "button",
  text: "Daftar",
  path: { name: "signup" },
  class: "button button-orange",
  iconRight:
    '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>',
};

const Logout = {
  isLinkAction: true,
  type: "button",
  text: "Logout",
  path: { name: "login" },
  class: "button-logout button",
  iconLeft: "<i class='fa fa-sign-out' aria-hidden='true'></i>",
};

const LoginBar = {
  type: "link",
  text: "Login",
  arrowColor: "orange",
  subMenuOptions: [
    {
      type: "link",
      text: "As Admin",
      subText: "Login with admin account.",
      path: { name: "admin" },
      iconLeft: '<i class="fa fa-desktop fa-fw"></i>',
    },
    {
      type: "hr",
    },
    {
      type: "link",
      text: "As User",
      subText: "Login with user account.",
      path: { name: "login" },
      iconLeft: '<i class="fa fa-user-o fa-fw"></i>',
      arrowColor: "#659CC8",
    },
  ],
};
const DashboardUser = {
  type: "link",
  text: "Dashboard",
  path: `${store.state.auth.user ? store.state.auth.user.auth[0].role : ''}/dashboard`,
  class: "button-logout button",
  iconLeft: "<i class='fa fa-address-card-o' aria-hidden='true'></i>",
};

export default {
  components: {
    VueNavigationBar,
    NProgress,
    Footer,
  },
  data() {
    return {
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
            text: "Home",
            path: { name: "landing" },
          },
          {
            type: "link",
            text: "Event Organizer",
            path: { name: "eventorganizer" },
            class: "font-weight-bold",
          },
        ],
      },
      isSticky: false,
      stickyClass: "is_sticky",
      scrollPosition: 0,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.navbarOptions.menuOptionsRight.push(DashboardUser);
      this.navbarOptions.menuOptionsRight.push(Logout);
    } else {
      this.navbarOptions.menuOptionsRight.push(LoginBar);
      this.navbarOptions.menuOptionsRight.push(Daftar);
    }
    addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollPosition = scrollY;
      if (this.scrollPosition >= 100) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
    logOut(text) {
      if(text === 'Logout'){
        this.$store.dispatch("auth/logout");
        location.reload();
      }
    },
  },
};
</script>

<style lang="scss">
.is_sticky {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  width: 100%;
  -webkit-animation: 0.95s ease-in-out 0s normal none 1 running fadeInDown;
  animation: 0.95s ease-in-out 0s normal none 1 running fadeInDown;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
}

.vnb {
  @media (min-width: 992px) {
    .button {
      border-radius: 1.5em;
      text-transform: capitalize;
      padding: 5px {
        left: 10px;
        right: 10px;
      }
    }

    .button-orange {
      background: #beee62;
      &:hover {
        background: darken(#beee62, 10%);
      }
    }

    .button-logout {
      background: #dd1335;
      &:hover {
        background: darken(#dd1335, 10%);
      }
    }
  }
}
</style>
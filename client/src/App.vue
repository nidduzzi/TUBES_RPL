<template>
  <div id="app">
    <NProgress />
    <div class="container">
      <VueNavigationBar
        :class="[isSticky ? stickyClass : '']"
        :options="navbarOptions"
      />
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import VueNavigationBar from "vue-navigation-bar";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import Footer from "@/components/Footer.vue";

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
        brandImagePath: { name: "home" },
        brandImage: require("./assets/iconTiketin.png"),
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
            path: { name: "home" },
          },
          {
            type: "link",
            text: "Event Organizer",
            path: { name: "eventorganizer" },
            class: "font-weight-bold",
          },
          {
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
          },
          {
            type: "button",
            text: "Daftar",
            path: { name: "signup" },
            class: "button-orange",
            iconRight:
              '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>',
          },
        ],
      },
      isSticky: false,
      stickyClass: "is_sticky",
      scrollPosition: 0,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY;
      if (this.scrollPosition >= 100) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap");
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
// scss/main.scss
@import '../node_modules/@braid/vue-formulate/themes/snow/snow.scss';

#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

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
    .button-orange {
      background: #beee62;
      &:hover {
        background: darken(#beee62, 10%);
      }
      border-radius: 1.5em;
      text-transform: capitalize;
      padding: 5px {
        left: 10px;
        right: 10px;
      }
    }
  }
}
</style>

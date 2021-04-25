<template>
  <div id="app">
    <div class="container">
      <VueNavigationBar :options="navbarOptions" />
    </div>
      <router-view/>
  </div>
</template>

<script>
import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";

export default {
  components: {
    VueNavigationBar,
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
            text: "Event Organizer",
            path: { name: "eventorganizer" },
            class: "font-weight-bold"
          },
          {
            type: "link",
            text: "Login",
            path: { name: "login" }
          },
          {
            type: "button",
            text: "Daftar",
            path: { name: "signup" },
            class: "button-orange",
            iconRight:'<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>',
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
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

.vnb {
  @media (min-width: 992px) {
    .button-orange {
      background: #BEEE62;
      &:hover {
        background: darken(#BEEE62, 10%);
      }
      border-radius: 1.5em;
      text-transform: capitalize;
      padding: 5px{
        left:10px;
        right:10px;
      }
    }
  }
}
</style>

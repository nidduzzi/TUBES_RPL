<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap");
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
// scss/main.scss
@import "../node_modules/@braid/vue-formulate/themes/snow/snow.scss";

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

.card-style {
  width: 100%;
  box-shadow: 0 2px 7px rgba($color: #000000, $alpha: 0.2);
}

.border-radius1 {
  border-radius: 1em;
}

.border-radius2 {
  border-radius: 2em;
}

.border-radius3 {
  border-radius: 3em;
}
</style>

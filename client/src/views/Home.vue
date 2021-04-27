<template>
  <div class="home">
    <Jumbotron />
    <img alt="Vue logo" src="../assets/mevn.jpg" width="350" />
    <HelloWorld msg="Hello, From Local Network" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Jumbotron from "@/components/Jumbotron.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Jumbotron
  }
};
</script>

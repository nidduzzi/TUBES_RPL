<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/mevn.jpg" width="350" />
    <HelloWorld msg="Hello, From Local Network" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

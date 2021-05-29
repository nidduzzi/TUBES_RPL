<template>
  <div class="container py-5">
    <Event :id="id" :event="event" />
  </div>
</template>

<script>
import Event from "@/components/EventCard.vue";
export default {
  components: {
    Event,
  },
  props: ["id"],
  computed: {
    event: function () {
      return {};
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
</style>

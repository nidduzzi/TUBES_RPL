<template>
  <div class="container py-5">
    <Event :id="id" :event="event" />
  </div>
</template>

<script>
import Event from "@/components/EventCard.vue";
import eventService from '../../services/event.service';
export default {
  components: {
    Event,
  },
  props: ["id"],
  asyncComputed: {
    async event () {
      let res = await eventService.getEvent(this.id);
      return res.data.event;
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

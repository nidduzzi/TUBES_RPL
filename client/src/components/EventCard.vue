<template>
  <div class="row">
    <div class="offset-md-1 col-md-10">
      <div class="card card-style border-radius2 text-left">
        <img
          v-if="imageUrl != null"
          v-bind:src="imageUrl"
          class="card-img-top border-radius2"
          alt=""
        />
        <img
          v-else-if="logoUrl != null"
          v-bind:src="logoUrl"
          class="card-img-top border-radius2"
          alt=""
        />
        <img
          v-else
          src="../assets/logo.png"
          class="card-img-top border-radius2"
          alt=""
        />
        <div class="card-body px-5">
          <div class="row">
            <div class="col-md-6">
              <h3 class="font-weight-bold">{{ event.name }}</h3>
              <h5 class="font-weight-light" v-if="event.tagline != undefined">
                {{ event.tagline }}
              </h5>
              <p v-if="startdate != null" class="font-weight-bold">
                {{ startDate }}
              </p>
              <p class="card-text">
                {{ event.description }}
              </p>
              <p
                v-for="(tag, i) in event.tags"
                :key="i"
                class="btn btn-tag py-0 mx-1"
              >
                {{ tag.name }}
              </p>
            </div>
            <div class="col-md-6">
              <div class="row text-right">
                <div class="col-md-12">
                  <router-link to="/order" class="btn btn-beli"
                    >Beli Tiket</router-link
                  >
                </div>
              </div>
              <div class="row pt-5">
                <div class="offset-md-2 col-md-8">
                  <ScheduleTable :schedule="event.schedule" />
                </div>
                <br />
                <div class="offset-md-2 col-md-8">
                  <!-- jenis Tiket component -->
                  <TicketTypeTable :ticketTypes="event.ticketTypes" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketTypeTable from "@/components/TicketTypeTable.vue";
import ScheduleTable from "@/components/ScheduleTable.vue";

export default {
  name: "EventCard",
  components: {
    TicketTypeTable,
    ScheduleTable
  },
  props: ["id", "event"],
  computed: {
    imageUrl: function () {
      if (this.event.numImages && this.event.numImages > 0) {
        return (
          process.env.VUE_APP_BASE_API + "/events/" + this.id + "/images/0"
        );
      } else {
        return null;
      }
    },
    logoUrl: function () {
      if (this.event.numImages && this.event.numImages > 0) {
        return process.env.VUE_APP_BASE_API + "/events/" + this.id + "/logo";
      } else {
        return null;
      }
    },
    startDate: function () {
      if (this.event.schedule[0]) {
        return new Date(this.event.schedule[0].startTime).toString();
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-tag {
  background-color: #beee62;
  border-radius: 5em;
}

.btn-beli {
  background-color: #f4743b;
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  font-weight: 600;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}
</style>

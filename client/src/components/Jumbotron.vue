<template>
  <div class="background">
    <div class="container">
      <span v-if="loading">loading</span>
      <carousel-3d
        v-else
        :border="0"
        :clickable="true"
        :space="150"
        :perspective="10"
        :autoplay="true"
        :autoplayHoverPause="true"
        :autoplay-timeout="3000"
        :display="5"
      >
        <slide v-for="(s, i) in events" :key="i" :index="i">
          <figure>
            <img v-if="s.imageUrl" :src="s.imageUrl" alt="" />
            <img
              v-else-if="s.logo != null && !s.imageUrl"
              :src="baseUrl + '/events/' + s.id + '/logo'"
              alt=""
            />
            <img v-else src="../assets/slider.jpg" alt="" />
            <figcaption>
              <span class="f-15">{{ s.name }}</span>
              <span class="d-block"
                ><b>{{ s.startDate }}</b></span
              >
              <p>{{ s.eventOrganizer.name }}</p>
              <div class="d-flex flex-row justify-content-around w-50 m-auto">
                <div class="align-self-stretch">
                  <router-link
                    :to="{ path: '/order', query: { event: s } }"
                    class="d-block btn btn-beli"
                    >Beli Tiket</router-link
                  >
                </div>
                <div class="align-self-stretch">
                  <router-link
                    :to="{ path: '/event', query: { eventId: s.id } }"
                    class="d-block btn btn-beli"
                    >Details</router-link
                  >
                </div>
              </div>
            </figcaption>
          </figure>
        </slide>
      </carousel-3d>
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import eventService from "../services/event.service";
export default {
  name: "Jumbotron",
  data() {
    return {
      slides: 7,
      baseUrl: eventService.API_URL
    };
  },
  components: {
    Carousel3d,
    Slide
  },
  props: { propEvent: Promise },
  computed: {
    loading() {
      if (this.events && this.events.length > 0) return false;
      else return true;
    }
  },
  asyncComputed: {
    async events() {
      let res = await eventService.getEvents({
        h: {
          include: {
            schedule: { orderBy: { startTime: "asc" }, take: 1 },
            eventOrganizer: { select: { name: true } },
            images: { select: { id: true } },
            ticketTypes: true
          },
          take: 7
        }
      });
      let events = res.data.events;
      events.forEach((event) => {
        event.startDate = new Date(event.schedule[0].startTime).toDateString();
        event.image = event.images != [];
        if (event.images.length > 0) {
          eventService
            .getImage(event.id, 0)
            .then((res) => res.data)
            .then((data) => {
              event.imageUrl = URL.createObjectURL(data);
              this.$forceUpdate();
            })
            .catch((err) => {
              if (process.env.NODE_ENV === "production")
                process.env.console.log(err);
            });
        }
      });
      return events;
    }
  }
};
</script>

<style lang="scss" scoped>
.f-15 {
  font: {
    weight: bold;
    size: 1.5em;
  }
}
.carousel-3d-container figure {
  margin: 0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  left: 0;
  bottom: 0%;
  padding: 15px {
    bottom: 30px;
  }
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-3d-slide {
  border-radius: 10px;
}

::v-deep .prev {
  color: #beee62 !important;
}
::v-deep .next {
  color: #beee62 !important;
}

.btn-beli {
  background-color: #f4743b;
  border-radius: 20px;
  position: relative;
  color: white;
  font-size: 0.8em;
  font-weight: 600;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}

.background {
  padding: {
    top: 2.5em;
    bottom: 2.5em;
  }
  background: url("../assets/jumbo.jpg");
  background-size: cover;
  background-position: center;
}
</style>

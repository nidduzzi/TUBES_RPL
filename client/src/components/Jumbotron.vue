<template>
  <div class="background">
    <div class="container">
      <carousel-3d
        :border="0"
        :clickable="false"
        :space="150"
        :perspective="10"
        :controls-visible="true"
        :autoplay="true"
        :autoplayHoverPause="true"
        :autoplay-timeout="3000"
        :display="5"
        :controlsNextHtml="'&#8883;'"
        :controlsPrevHtml="'&#8882;'"
      >
        <slide v-for="(slide, i) in slides" :key="i" :index="i">
          <figure>
            <img src="../assets/slider.jpg" alt="" />
            <figcaption>
              <span class="f-15">Webinar Something</span>
              <span class="d-block"><b>Selasa, 27 April 2021</b></span>
              <p>Universitas Something</p>
            </figcaption>
            <a href="" class="btn btn-beli py-1 px-3">Beli Tiket</a>
          </figure>
        </slide>
      </carousel-3d>
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  name: "Jumbotron",
  data() {
    return {
      slides: 7,
    };
  },
  components: {
    Carousel3d,
    Slide,
  },
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
  position: absolute;
  bottom: 4%;
  right: 38%;
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
   background: url('../assets/jumbo.jpg');
   background-size: cover;
   background-position: center;
}
</style>
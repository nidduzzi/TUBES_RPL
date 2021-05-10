<template>
  <div class="row">
    <div class="offset-md-1 col-md-10">
      <div class="card card-style border-radius2 text-left">
        <img
          src="../assets/slider.jpg"
          class="card-img-top border-radius2"
          alt=""
        />
        <div class="card-body px-5">
          <div class="row">
            <div class="col-md-6">
              <h3 class="font-weight-bold">Webinar Something</h3>
              <h5 class="font-weight-light">Universitas Something</h5>
              <p class="font-weight-bold">Selasa, 14 Juli 2021</p>
              <p class="card-text">
                Vivamus lectus malesuada pellentesque auctor ac. Mauris leo ut
                et massa ornare. Consequat a vulputate sit odio vitae lectus.
                Rhoncus aenean scelerisque interdum magna egestas. Volutpat
                neque aenean adipiscing sed. Imperdiet convallis a velit at leo
                nisl eget sagittis, bibendum. Quam cras at lobortis ut nulla
                magna massa, maecenas. Et sed a ipsum sociis. Massa dictum
                varius amet quam ipsum nunc, non. Purus sodales tristique
                facilisi eget consequat consequat morbi lacus integer. Ipsum
                cras ac quis mauris.
              </p>
              <p class="btn btn-tag py-0 mx-1">Academic</p>
              <p class="btn btn-tag py-0 mx-1">Management</p>
            </div>
            <div class="col-md-6">
              <div class="row text-right">
                <div class="col-md-12">
                  <router-link to="/order" class="btn btn-beli">Beli Tiket</router-link>
                </div>
              </div>
              <div class="row pt-5">
                <div class="offset-md-2 col-md-8">
                  <!-- jenis Tiket component -->
                  <JenisTiket />
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
import JenisTiket from "@/components/JenisTiket.vue";

export default {
  name: "EventCard",
  components: {
    JenisTiket,
  },
  props: ["id", "event"],
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
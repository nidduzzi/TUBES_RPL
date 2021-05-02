<template>
  <div class="home">
    <Jumbotron />
    <SearchForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from "@/components/SearchForm.vue";
import Jumbotron from "@/components/Jumbotron.vue";

export default {
  name: "home",
  components: {
    Jumbotron,
    SearchForm
  }
};
</script>

<template>
  <div class="signup py-5">
    <signupform />
  </div>
</template>

<script>
import signupform from "@/components/SignupForm2.vue"
export default {
  components: {
    signupform
  }
}
</script>

<style scoped>

*{
  box-sizing: border-box;
}

body {
  margin: 0;
}
.signup {
  background-image: url('../assets/back-login.jpg');
  background-size: cover;
  background-position: center;
}
</style>

<template>
  <div class="signup">
    <signupform />
  </div>
</template>

<script>
import signupform from "@/components/SignupForm.vue"
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

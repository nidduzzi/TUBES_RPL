<template>
  <div class="login">
    <loginform />
  </div>
</template>

<script>
import loginform from "@/components/LoginForm.vue"
export default {
  components: {
    loginform
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
.login {
  background-image: url('../assets/back-login.jpg');
  background-size: cover;
  background-position: center;
}
</style>

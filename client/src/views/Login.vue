<template>
  <div class="login">
    <loginform v-if="role === 'user'"/>
    <eoform v-else-if="role === 'eo'"/>
    <adminform v-else/>
  </div>
</template>

<script>
import loginform from "@/components/LoginForm.vue"
import adminform from "@/components/AdminForm.vue"
import eoform from "@/components/EoForm.vue"
export default {
  name: 'Login',
  props: {
    role: String,
  },
  components: {
    loginform,
    adminform,
    eoform
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

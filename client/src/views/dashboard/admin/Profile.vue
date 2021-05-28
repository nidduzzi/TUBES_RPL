<template>
  <div class="user-reservation container my-5 col-md-4">
    <div class="card pl-3">
      <div class="card-body text-center">
          <h4>LOGIN AS ADMIN</h4>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "../../../services/admin.service";

export default {
  data() {
    return {
      currUser: this.$store.state.auth.user,
      loading: false,
      userProfile: {},
    };
  },
  mounted() {
    AdminService.getAdmin(this.currUser.auth[0].id).then(
      (res) => {
        this.userProfile = res.data.admin;
      },
      (error) => {
        this.userProfile =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.btn-tag {
  background-color: #beee62;
  &:hover {
    background: darken(#beee62, 10%);
  }
}

.btn-beli {
  background-color: #f4743b;
  &:hover {
    background: darken(#f4743b, 10%);
  }
}

.btn {
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  font-weight: 600;
}
</style>
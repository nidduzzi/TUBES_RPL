<template>
  <div class="notif container p-5">
    <h4 class="text-left">
      <i class="fa fa-bell" aria-hidden="true"></i> Pemberitahuan
    </h4>
    <hr />
    <div v-if="notifList.length">
      <div v-for="(notif, index) in notifList" :key="index">
        <div class="row row-data mb-2 box">
          <h4 class="font-normal font-weight-bold">
            {{ notif.title }}
          </h4>
        </div>
        <div class="row row-info row-data mb-3 text-left">
          <div class="col-md-10">
            <p class="font-italic">
              {{ notif.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-left">
      <div class="alert alert-info" role="alert">
        <strong>Tidak ada pemberitahuan</strong>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../../services/user.service";

export default {
  name: "usernotif",
  data() {
    return {
      notifList: []
    };
  },
  mounted() {
    // notif list
    UserService.getNotif(this.$store.state.auth.user.auth[0].id)
      .then((res) => {
        this.notifList = res.data.notifications;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss" scoped>
.row-data {
  border-radius: 2em;
  padding: {
    left: 1.2em;
    right: 1.2em;
    top: 0.5em;
    bottom: 0.5em;
  }
}

.box {
  box-shadow: 1px 3px 10px rgba(225, 225, 225, 0.6);
}

.row-info {
  background-color: #ececec;
  border-radius: 0.3em;
}

.font-normal {
  font-size: 1.2em;
}
</style>
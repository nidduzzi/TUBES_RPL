<template>
  <footer class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-1">
          <div class="logo px-2 py-0">
            <img class="img-fluid" src="../assets/iconTiketin.png" alt="" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <ul class="text-left d-inline">
            <li><router-link to="/signup" class="link">Daftar</router-link></li>
            <li>
              <router-link to="/eventorganizer" class="link"
                >Event Organizer</router-link
              >
            </li>
            <li><router-link to="/login" class="link">Login</router-link></li>
          </ul>
        </div>
        <div class="col-md-3">
          <div class="text-left" style="color:white; font-weight:200">
            <p>Hubungi Kami</p>
            <a style="color:white; font-size:1.5em" href="#"><i class="fa fa-whatsapp fa-fw"></i></a>
            <a style="color:white; font-size:1.5em" href="#"><i class="fa fa-facebook-official fa-fw"></i></a>
            <a style="color:white; font-size:1.5em" href="#"><i class="fa fa-twitter fa-fw"></i></a>
            <a style="color:white; font-size:1.5em" href="#"><i class="fa fa-envelope fa-fw"></i></a>
          </div>
        </div>
        <div class="offset-md-5 col-md-2 text-right" style="color:white;  font-weight:200">
           <p>Bandung, Jawa Barat</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
footer {
  background-color: #70ae6e;
  min-height: 20%;
  background-size: cover;
  width: 100%;
}

.logo {
  background-color: white;
  border-radius: 5px;
}

ul {
  list-style-type: none;
}

.link {
  text-decoration: none;
  color: white;
  font-weight: 100;
  &:hover {
    color: darken($color: white, $amount: 20%);
  }
}
</style>
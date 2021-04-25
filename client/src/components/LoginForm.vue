<template>
  <div class="formlogin">
    <div class="row w-100">
      <div class="offset-lg-3 col-lg-6">
        <div class="card">
           <img src="../assets/login.jpg" class="card-img-top" />
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="email">Username/Email</label>
                <input
                  type="email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                />
              </div>
              <button type="submit" class="offset-md-3 btn button-orange col-md-6">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginform",
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");

* {
   box-sizing: border-box;
}

.formlogin {
   padding: {
      top: 10em;
      bottom:10em;
   }
   min-height:100%;
   margin: 0;
}

.button-orange {
   background-color: #F4743B;
   color:white;
   border-radius: 2em;
   &:hover {
      background: darken(#F4743B, 10%);
   }
}

.card {
   padding: 2.5em 0;
   margin-top : 0;
   margin-bottom: 0;
   flex-direction: row;
   border-radius: 1em;
   img {
      border-radius: 2em 0 0 2em;
      width: 50%;
   }
}

.card-body {
   text-align: left;
}

label {
   font-size: .8em;
   font-weight: bold;
}

.form-control {
   border-radius: 25px;
}

@media only screen and (max-width: 768px) {
  .card img {
     display:none;
  }
  .card-body {
    padding: 0.5em 1.2em;
  }
  .card-body .card-text {
    margin: 0em;
  }
  .card {
     margin: {
        top:2em;
        bottom:2em;
        left:2em;
     };
  }
}
@media only screen and (max-width: 1200px) {
  .card img {
    width: 50%;
  }
}
</style>
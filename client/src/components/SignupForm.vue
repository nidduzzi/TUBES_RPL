<template>
  <div class="formsignup">
    <div class="row w-100">
      <div class="offset-md-4 col-md-4">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">Sign Up</h2>
            <hr class="w-75" />
            <hr class="w-50" />
            <form>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" />
              </div>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="name" class="form-control" />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" />
              </div>
              <div class="form-group">
                <label for="passwordre">Password Confirmation</label>
                <input type="password" class="form-control" />
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="role"
                  value="user"
                  id="user"
                />
                <label class="form-check-label" for="role">Partisipan</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="role"
                  value="eventorganizer"
                  id="eventorganizer"
                />
                <label for="role">Penyelenggara</label>
              </div>
              <button
                type="submit"
                class="offset-md-3 btn button-orange col-md-6 mt-4"
              >
                Sign me up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signupform",
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap");
@import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");

* {
  box-sizing: border-box;
}

.formsignup {
  padding: {
    top: 5em;
    bottom: 5em;
  }
  min-height: 100%;
  margin: 0;
}

.button-orange {
  background-color: #f4743b;
  color: white;
  border-radius: 1em;
  &:hover {
      background: darken(#F4743B, 10%);
  }
}

.card {
  padding: 1em 0;
  margin-top: 0;
  margin-bottom: 0;
  flex-direction: row;
  border-radius: 1em;
  img {
    border-radius: 1em 0 0 1em;
    width: 50%;
  }
}

.card-body {
  text-align: left;
}

label {
  font-size: 0.8em;
  font-weight: bold;
}

.form-control {
  border-radius: 25px;
}

@media only screen and (max-width: 768px) {
  .card img {
    display: none;
  }
  .card-body {
    padding: 0.5em 1.2em;
  }
  .card-body .card-text {
    margin: 0em;
  }
  .card {
    margin: {
      top: 2em;
      bottom: 2em;
      left: 2em;
    }
  }
}
@media only screen and (max-width: 1200px) {
  .card img {
    width: 50%;
  }
}
</style>
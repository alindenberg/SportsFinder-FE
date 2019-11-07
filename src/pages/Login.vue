<template>
  <b-col style="margin-top: 30px" class="d-flex flex-column align-items-center">
    <h1>Login</h1>
    <h6 v-if="error" class="error">Error: {{error}}</h6>
    <b-col class="col-12" sm="6">
      <b-form @submit="submit">
        <b-row>
          <label>Email:</label>
          <b-form-input id="emailInput" type="email" />
        </b-row>
        <b-row style="margin-top: 2%">
          <label>Password:</label>
          <b-form-input id="passwordInput" type="password" />
        </b-row>
        <b-row style="margin-top: 2%" class="justify-content-center">
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button v-on:click="$router.push('/signup')" variant="link">Sign Up</b-button>
        </b-row>
      </b-form>
    </b-col>
  </b-col>
</template>
  <script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      this.error = null;
      //eslint-disable-next-line
      console.log("Submit form");
    }
  }
};
</script>

<style scoped>
.error {
  margin-top: 2%;
  color: red;
}
</style>
<template>
  <b-col
    style="min-height: 70vh"
    class="d-flex flex-column align-items-center justify-content-center"
  >
    <h1>SportsFinder Login</h1>
    <p>Find and Create pick-up sporting events near you</p>
    <errors :errors="errors" />
    <b-col class="col-12" sm="6">
      <b-form @submit="submit">
        <b-row>
          <label>Email:</label>
          <b-form-input v-model="email" id="emailInput" type="email" />
        </b-row>
        <b-row style="margin-top: 2%">
          <label>Password:</label>
          <b-form-input v-model="password" id="passwordInput" type="password" />
        </b-row>
        <b-row style="margin-top: 2%" class="justify-content-between">
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button
            type="submit"
            variant="link"
            v-on:click="$router.push('/initiate_password_reset')"
          >Forgot Password?</b-button>
          <b-button v-on:click="$router.push('/signup')" variant="link">Sign Up</b-button>
        </b-row>
      </b-form>
    </b-col>
  </b-col>
</template>
<script>
import jwt from "jsonwebtoken";
import Errors from "../components/Errors";
import { Login, GetUser } from "../services/userService";
export default {
  name: "Login",
  components: {
    errors: Errors
  },
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      this.errors = [];
      Login(this.email, this.password)
        .then(token => {
          let userId = jwt.decode(token).id;
          GetUser(userId)
            .then(user => {
              this.$session.start();
              this.$session.set("user", user);
              this.$session.set("token", token);
              this.$router.push("/");
            })
            .catch(errors => {
              this.errors = errors;
            });
        })
        .catch(errors => {
          this.errors = errors;
        });
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
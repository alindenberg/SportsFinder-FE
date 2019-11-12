<template>
  <b-col style="margin-top: 30px" class="d-flex flex-column align-items-center">
    <h1>Sign Up</h1>
    <errors :errors="errors" />
    <b-col class="col-12" lg="4" sm="6">
      <b-form @submit="signUp">
        <b-row>
          <label>Username:</label>
          <b-form-input v-model="username" required id="username-input" />
        </b-row>
        <b-row class="form-section">
          <label>Email:</label>
          <b-form-input v-model="email" required type="email" />
        </b-row>
        <b-row class="form-section">
          <label>Zip Code:</label>
          <small>We only use zip code to locate nearby events. Nothing else.</small>
          <b-form-input v-model="zipCode" required />
        </b-row>
        <b-row class="form-section">
          <label>Password:</label>
          <b-form-input v-model="password" required type="password" />
        </b-row>
        <b-row class="form-section">
          <label>Confirm Password:</label>
          <b-form-input v-model="confirmPassword" required type="password" />
        </b-row>
        <b-button style="margin-top: 5%" variant="primary" type="submit">Submit</b-button>
      </b-form>
    </b-col>
  </b-col>
</template>

<script>
import jwt from "jsonwebtoken";
import Errors from "../components/Errors";
import { Signup, Login, GetUser } from "../services/userService";
export default {
  name: "SignUp",
  components: {
    errors: Errors
  },
  data() {
    return {
      error: null,
      username: null,
      email: null,
      zipCode: null,
      password: null,
      confirmPassword: null
    };
  },
  methods: {
    signUp(evt) {
      evt.preventDefault();
      this.error = null;
      if (this.password != this.confirmPassword) {
        this.error = "Passwords do not match.";
      } else if (this.password.length < 8) {
        this.errors = "Password must be at least 8 characters.";
      } else {
        Signup(this.username, this.email, this.password, this.zipCode)
          .then(() => {
            Login(this.email, this.password).then(token => {
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
            });
          })
          .catch(errors => {
            this.errors = errors;
          });
      }
    }
  }
};
</script>

<style>
.form-section {
  margin-top: 2%;
}
.error {
  color: red;
}
</style>
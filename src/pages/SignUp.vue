<template>
  <b-col style="margin-top: 30px" class="d-flex flex-column align-items-center">
    <h1>Sign Up</h1>
    <errors :errors="errors" />
    <b-col class="col-12" lg="4" sm="6">
      <b-form @submit="signUp">
        <b-row>
          <label>Username:</label>
          <b-form-input v-model="user.username" required id="username-input" />
        </b-row>
        <b-row class="form-section">
          <label>Email:</label>
          <b-form-input v-model="user.email" required type="email" />
        </b-row>
        <b-row class="form-section">
          <label>Zip Code:</label>
          <small>We only use zip code to locate nearby events. Nothing else.</small>
          <b-form-input v-model="user.zipCode" required />
        </b-row>
        <b-row class="form-section">
          <label>Password:</label>
          <b-form-input v-model="user.password" required type="password" />
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
import Axios from "axios";
import Errors from "../components/Errors";
export default {
  name: "SignUp",
  components: {
    errors: Errors
  },
  data() {
    return {
      error: null,
      user: {
        username: null,
        email: null,
        zipCode: null,
        password: null
      },
      confirmPassword: null
    };
  },
  methods: {
    signUp(evt) {
      evt.preventDefault();
      this.error = null;
      if (this.user.password != this.confirmPassword) {
        this.error = "Passwords do not match.";
      } else if (this.user.password.length < 8) {
        this.errors = "Password must be at least 8 characters.";
      } else {
        Axios.post(`${process.env.VUE_APP_API_URL}/users`, {
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
          zipCode: this.user.zipCode
        })
          .then(result => {
            Axios.post(`${process.env.VUE_APP_API_URL}/login`, {
              email: this.user.email,
              password: this.user.password
            }).then(token => {
              this.$session.start();
              this.$session.set("user", this.user);
              this.$session.set("token", token);
              this.$router.push("/");
            });
          })
          .catch(err => {
            this.error = err.response ? err.response.data.errors[0] : err;
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
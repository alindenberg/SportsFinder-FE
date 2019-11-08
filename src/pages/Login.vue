<template>
  <b-col style="margin-top: 30px" class="d-flex flex-column align-items-center">
    <h1>Login</h1>
    <h6 v-if="error" class="error">Error: {{error}}</h6>
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
        <b-row style="margin-top: 2%" class="justify-content-center">
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button v-on:click="$router.push('/signup')" variant="link">Sign Up</b-button>
        </b-row>
      </b-form>
    </b-col>
  </b-col>
</template>
<script>
import Axios from "axios";
import jwt from "jsonwebtoken";
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
      Axios.post(`${process.env.VUE_APP_API_URL}/login`, {
        email: this.email,
        password: this.password
      }).then(res => {
        let token = null;
        let userId = null;
        try {
          token = res.data.token;
          userId = jwt.decode(token).id;
        } catch (err) {
          this.error = "Error logging in";
        }
        Axios.get(`${process.env.VUE_APP_API_URL}/users/${userId}`)
          .then(userResponse => {
            this.$session.start();
            this.$session.set("user", userResponse.data);
            this.$session.set("token", token);
            this.$router.push("/");
          })
          .catch(err => {
            this.error = err.response
              ? err.response.data.error
              : "Error fetching user.";
          });
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
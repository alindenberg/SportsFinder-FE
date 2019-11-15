<template>
  <div>
    <errors :errors="errors" />
    <messages :messages="messages" />
    <b-row style="min-height: 60vh" class="align-items-center">
      <b-col>
        <b-form @submit="submit">
          <b-row class="justify-content-center">
            <b-col sm="6">
              <h1>Password Reset</h1>
              <b-input type="password" placeholder="New Password" v-model="password" />
              <b-input
                class="form-section"
                placeholder="Confirm Password"
                type="password"
                v-model="confirmPassword"
              />
            </b-col>
          </b-row>
          <b-row class="form-section justify-content-center">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button
              variant="link"
              v-on:click="$router.push('/initiate_password_reset')"
            >Resend Link</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Messages from "../components/Messages";
import Errors from "../components/Errors";
import { ResetPassword } from "../services/userService";
export default {
  name: "ResetPassword",
  data() {
    return {
      email: null,
      token: null,
      password: null,
      confirmPassword: null,
      errors: [],
      messages: []
    };
  },
  components: {
    errors: Errors,
    messages: Messages
  },
  methods: {
    submit(evt) {
      //eslint-disable-next-line
      console.log("reset password form submitted");
      evt.preventDefault();
      if (this.password != this.confirmPassword) {
        this.error = "Passwords do not match.";
      } else if (this.password.length < 8) {
        this.errors = "Password must be at least 8 characters.";
      }
      ResetPassword(this.email, this.password, this.token)
        .then(() => {
          this.messages = [
            "Successfully updated password! Redirecting to homepage."
          ];
          const router = this.$router;
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        })
        .catch(errors => {
          this.errors = errors;
        });
    }
  },
  created() {
    this.email = this.$route.query.email;
    this.token = this.$route.query.token;
    if (!this.email || !this.token) {
      this.$route.push("/login");
    }
  }
};
</script>

<style>
</style>
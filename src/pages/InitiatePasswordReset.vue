<template>
  <div>
    <errors :errors="errors" />
    <messages :messages="messages" />
    <b-row style="min-height: 60vh" class="align-items-center">
      <b-col>
        <b-form @submit="submit">
          <b-row class="justify-content-center">
            <b-col sm="6">
              <h1 style="margin-bottom: 25%">Password Reset</h1>
              <b-input type="email" placeholder="Email" required v-model="email" />
            </b-col>
          </b-row>
          <b-row class="form-section justify-content-center">
            <b-button type="submit" variant="primary">Get Link</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Errors from "../components/Errors";
import Messages from "../components/Messages";
import { InitiatePasswordReset } from "../services/userService";
export default {
  name: "InitiatePasswordReset",
  data() {
    return {
      email: null,
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
      evt.preventDefault();
      InitiatePasswordReset(this.email)
        .then(() => {
          this.messages = [
            "Password reset link has been sent! Check your inbox."
          ];
        })
        .catch(errors => {
          this.errors = errors;
        });
    }
  }
};
</script>

<style>
</style>
<template>
  <div>
    <errors :errors="errors" />
    <messages :messages="messages" />
    <b-row class="justify-content-center">
      <b-col md="4" sm="6">
        <b-form @submit="submit" @reset="reset">
          <b-row>
            <label>Username:</label>
            <b-form-input v-model="modifiedUser.username" required id="username-input" />
          </b-row>
          <b-row class="form-section">
            <label>Email:</label>
            <b-form-input v-model="modifiedUser.email" required type="email" />
          </b-row>
          <b-row style="margin-top: 5%" class="justify-content-around">
            <b-button :disabled="!changesMade" variant="primary" type="submit">Save</b-button>
            <b-button :disabled="!changesMade" variant="link" type="reset">Reset</b-button>
            <b-button variant="link">Change Password</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Errors from "../components/Errors";
import Messages from "../components/Messages";
import { GetUser, UpdateUser } from "../services/userService";
export default {
  name: "Profile",
  components: {
    errors: Errors,
    messages: Messages
  },
  data() {
    return {
      user: null,
      modifiedUser: null,
      errors: [],
      messages: []
    };
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      UpdateUser(this.modifiedUser)
        .then(() => {
          GetUser(this.user.id)
            .then(user => {
              this.$session.set("user", user);
              this.initProperties();
              this.messages = ["Successfully updated user!"];
            })
            .catch(errors => {
              this.errors = errors;
            });
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    reset(evt) {
      evt.preventDefault();
      this.errors = [];
      this.initProperties();
    },
    initProperties() {
      this.user = this.$session.get("user");
      this.modifiedUser = JSON.parse(JSON.stringify(this.user));
    }
  },
  created() {
    this.initProperties();
  },
  computed: {
    changesMade: function() {
      return JSON.stringify(this.user) != JSON.stringify(this.modifiedUser);
    }
  }
};
</script>

<style>
</style>
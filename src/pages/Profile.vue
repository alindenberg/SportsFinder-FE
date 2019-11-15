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
            <b-button variant="link" v-on:click="changePassword">Change Password</b-button>
          </b-row>
          <b-row style="margin-top: 5%" class="justify-content-around">
            <b-button
              variant="danger"
              v-if="!confirmDelete"
              v-on:click="confirmDelete = true"
            >Delete Account</b-button>
            <b-col v-if="confirmDelete">
              <p>Confirm you want to delete your account? All data will be erased.</p>
              <b-button variant="danger" v-on:click="deleteUser">Confirm Delete</b-button>
              <b-button variant="link" v-on:click="confirmDelete = false">Cancel</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Errors from "../components/Errors";
import Messages from "../components/Messages";
import {
  GetUser,
  UpdateUser,
  InitiatePasswordReset,
  DeleteUser
} from "../services/userService";
export default {
  name: "Profile",
  components: {
    errors: Errors,
    messages: Messages
  },
  created() {
    this.initProperties();
  },
  computed: {
    changesMade: function() {
      return JSON.stringify(this.user) != JSON.stringify(this.modifiedUser);
    }
  },
  data() {
    return {
      user: null,
      modifiedUser: null,
      confirmDelete: false,
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
    },
    changePassword() {
      InitiatePasswordReset(this.user.email)
        .then(() => {
          this.messages = [
            "Password reset link has been sent! Check your inbox."
          ];
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    deleteUser() {
      DeleteUser(this.user.id)
        .then(() => {
          this.$session.destroy();
          this.$router.push("/signup");
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
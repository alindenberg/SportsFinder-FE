<template>
  <div>
    <div v-if="errors.length > 0">
      <span style="color: red">Errors:</span>
      <p v-for="(error, index) in errors" :key="index" style="color: red">{{error}}</p>
    </div>
    <b-row class="justify-content-center">
      <b-col md="4" sm="6">
        <b-form @submit="submit" @reset="reset">
          <b-row>
            <label>Username:</label>
            <b-form-input v-model="modifiedUsername" required id="username-input" />
          </b-row>
          <b-row class="form-section">
            <label>Email:</label>
            <b-form-input v-model="modifiedEmail" required type="email" />
          </b-row>
          <b-row class="form-section">
            <label>Zip Code:</label>
            <b-form-input v-model="modifiedZipCode" required />
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
import { GetUser, UpdateUser } from "../services/userService";
export default {
  name: "Profile",
  data() {
    return {
      user: {},
      modifiedUsername: null,
      modifiedEmail: null,
      modifiedZipCode: null,
      errors: []
    };
  },
  methods: {
    async submit(evt) {
      evt.preventDefault();
      let newUser = {
        id: this.user.id,
        username: this.modifiedUsername,
        email: this.modifiedEmail,
        password: this.user.password,
        zipCode: this.modifiedZipCode
      };
      await UpdateUser(newUser)
        .then(() => {
          GetUser(this.user.id)
            .then(resp => {
              this.$session.set("user", resp.data);
              this.initProperties();
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
      this.modifiedUsername = this.user.username;
      this.modifiedEmail = this.user.email;
      this.modifiedZipCode = this.user.zipCode;
    }
  },
  created() {
    this.initProperties();
    // Object.assign(this.modifiedUser, this.user);
  },
  computed: {
    changesMade: function() {
      return (
        this.modifiedUsername != this.user.username ||
        this.modifiedEmail != this.user.email ||
        this.modifiedZipCode != this.user.zipCode
      );
    }
  }
};
</script>

<style>
</style>
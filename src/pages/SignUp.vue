<template>
  <div>
    <h1>Sign Up</h1>
    <b-form @submit="signUp()">
      <b-form-group inline label="Username" label-for="username-input">
        <b-form-input id="username-input" />
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {},
  methods: {
    signUp() {
      console.log("Sign Up");
    }
  }
};
</script>

<style>
</style>
<template>
  <b-navbar>
    <b-navbar-nav style="width: 100%">
      <b-nav-item v-on:click="$router.push('/')">Home</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav style="width: 100%;" align="end">
      <b-nav-item v-on:click="$router.push('/profile')">Profile</b-nav-item>
      <b-nav-item v-on:click="logout">Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$session.destroy();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>
<template>
  <b-navbar id="navbar">
    <b-navbar-nav style="width: 100%">
      <b-nav-item v-on:click="$router.push('/')" :disabled="$route.path == '/'">SportsFinder</b-nav-item>
      <b-nav-item
        :disabled="$route.path == '/create_event'"
        v-on:click="$router.push('/create_event') "
      >Create Event</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav
      v-if="$route.path != '/reset_password' && $route.path != '/initiate_password_reset' && $route.path != '/signup'"
      style="width: 100%;"
      align="end"
    >
      <b-nav-item
        v-on:click="$router.push('/profile')"
        :disabled="$route.path == '/profile'"
      >Profile</b-nav-item>
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

<style scoped>
#navbar {
  /* width: 100vw; */
  border-bottom: 1px solid lightgrey;
  margin-bottom: 2%;
}
</style>
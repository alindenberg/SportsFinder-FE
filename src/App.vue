<template>
  <div>
    <navbar style="width: 100%" v-if="$route.path != '/login'" />
    <b-container style="height: 100vh" fluid id="app">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

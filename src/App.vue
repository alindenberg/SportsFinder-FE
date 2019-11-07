<template>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>
  <b-container fluid id="app">
    <navbar />
    <router-view />
  </b-container>
</html>
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

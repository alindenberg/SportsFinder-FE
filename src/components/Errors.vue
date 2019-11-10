<template>
  <div>
    <b-alert
      v-for="(error, index) in errors"
      :key="index"
      v-model="showError[index]"
      dismissible
      variant="danger"
    >{{error}}</b-alert>
  </div>
</template>

<script>
export default {
  name: "Errors",
  data() {
    return {
      showError: null
    };
  },
  props: {
    errors: Array
  },
  watch: {
    errors: function() {
      this.showError = new Array(this.errors.length).fill(true);
    }
  },
  created() {
    this.showError = new Array(this.errors.length).fill(true);
  }
};
</script>

<style>
</style>
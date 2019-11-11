<template>
  <div>
    <b-alert
      v-for="(message, index) in messages"
      :key="index"
      v-model="showMessage[index]"
      dismissible
      variant="success"
    >{{message}}</b-alert>
  </div>
</template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      showMessage: null
    };
  },
  props: {
    messages: Array
  },
  watch: {
    messages: function() {
      this.showMessage = new Array(this.messages.length).fill(true);
    }
  },
  created() {
    this.showMessage = new Array(this.messages.length).fill(true);
  }
};
</script>

<style>
</style>
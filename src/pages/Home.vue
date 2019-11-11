<template>
  <div class="flex">
    <!-- <find-events /> -->
    <event-list :zipCode="user.zipCode" />
  </div>
</template>

<script>
// import FindEvents from "../components/FindEvents";
import EventList from "../components/EventList";
export default {
  name: "Home",
  data() {
    return {
      user: null
    };
  },
  components: {
    // "find-events": FindEvents,
    "event-list": EventList
  },
  created() {
    this.user = this.$session.get("user");
  }
};
</script>

<style>
</style>
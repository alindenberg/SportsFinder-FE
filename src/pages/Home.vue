<template>
  <div>
    <find-events />
    <event-list />
  </div>
</template>

<script>
import FindEvents from "../components/FindEvents";
import EventList from "../components/EventList";
export default {
  name: "Home",
  components: {
    "find-events": FindEvents,
    "event-list": EventList
  }
};
</script>

<style>
</style>
<template>
  <b-row class="justify-content-center align-items-center">
    <b-col class="col-12" sm="8" v-if="events.length > 0">
      <event class="element" v-for="(event, index) in events" :key="index" :event="event" />
    </b-col>
    <div v-if="events.length == 0">
      <h4>No events found.</h4>
      <b-button variant="primary">Create Event</b-button>
    </div>
  </b-row>
</template>

<script>
import EventCard from "./EventCard";
export default {
  name: "EventList",
  components: {
    Event: EventCard
  },
  props: {
    events: Array
  },
  watch: {
    events: function() {}
  }
};
</script>

<style>
.element {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
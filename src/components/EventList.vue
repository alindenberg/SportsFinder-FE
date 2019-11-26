<template>
  <b-row class="justify-content-center align-items-center">
    <b-col sm="7" v-for="(event, index) in events" :key="index">
      <event class="element" :event="event" />
    </b-col>
    <div v-if="events.length == 0">
      <b-row style="min-height: 60vh" class="align-items-center">
        <h4>No events found.</h4>
      </b-row>
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
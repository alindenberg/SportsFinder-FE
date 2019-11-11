<template>
  <b-row class="justify-content-center align-items-center">
    <b-col class="col-12" sm="8" v-if="events.length > 0">
      <b-row class="justify-content-around align-items-center">
        <u>
          <h3>Events near {{zipCode}}</h3>
        </u>
        <b-button
          class="element"
          variant="primary"
          v-on:click="$router.push('/create-event') "
        >Create Event</b-button>
      </b-row>
      <event class="element" v-for="(event, index) in events" :key="index" :event="event" />
    </b-col>
    <div v-if="events.length == 0 || errors.length > 0">
      <errors :errors="errors" />
      <h4>No events found in {{zipCode}} zip code</h4>
      <b-button variant="primary">Create Event</b-button>
    </div>
  </b-row>
</template>

<script>
import EventCard from "./EventCard";
import Errors from "../components/Errors";
export default {
  name: "EventList",
  components: {
    Event: EventCard,
    errors: Errors
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
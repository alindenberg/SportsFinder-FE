<template>
  <b-row style="height: 80vh" class="justify-content-center align-items-center">
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
import { GetEvents } from "../services/eventService";
export default {
  name: "EventList",
  components: {
    Event: EventCard,
    errors: Errors
  },
  data() {
    return {
      events: [],
      errors: []
    };
  },
  props: {
    zipCode: String
  },
  watch: {
    zipCode: function() {
      this.getEventList();
    }
  },
  created() {
    if (this.zipCode) {
      this.getEventList();
    }
  },
  methods: {
    getEventList() {
      GetEvents(this.zipCode)
        .then(events => {
          this.events = events;
        })
        .catch(errors => {
          this.errors = errors;
        });
    }
  }
};
</script>

<style>
.element {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
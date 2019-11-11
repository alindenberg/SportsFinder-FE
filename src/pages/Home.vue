<template>
  <div class="flex">
    <errors :errors="errors" />
    <messages :messages="messages" />
    <!-- <find-events /> -->
    <eventList :events="events" />
  </div>
</template>

<script>
// import FindEvents from "../components/FindEvents";
import Errors from "../components/Errors";
import Messages from "../components/Messages";
import EventList from "../components/EventList";
import { GetEvents } from "../services/eventService";
export default {
  name: "Home",
  components: {
    errors: Errors,
    messages: Messages,
    eventList: EventList
  },
  data() {
    return {
      errors: [],
      messages: [],
      events: [],
      user: null
    };
  },
  created() {
    this.user = this.$session.get("user");
    this.getZipCodeEvents();
  },
  methods: {
    getUserEvents() {
      // GetUserEvents(this.user.id)
    },
    getZipCodeEvents(zipCode) {
      GetEvents(zipCode)
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
</style>
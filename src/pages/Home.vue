<template>
  <div class="flex">
    <errors :errors="errors" />
    <messages :messages="messages" />
    <!-- <find-events /> -->
    <b-row class="justify-content-around align-items-center">
      <b-dropdown :text="eventView" variant="link" size="lg">
        <b-dropdown-item
          :active="eventView == 'Events near me'"
          v-on:click="getZipCodeEvents"
        >Events near me</b-dropdown-item>
        <b-dropdown-item :active="eventView == 'My events'" v-on:click="getUserEvents">My events</b-dropdown-item>
      </b-dropdown>
      <b-button
        class="element"
        variant="primary"
        v-on:click="$router.push('/create-event') "
      >Create Event</b-button>
    </b-row>
    <eventList :events="events" />
  </div>
</template>

<script>
// import FindEvents from "../components/FindEvents";
import Errors from "../components/Errors";
import Messages from "../components/Messages";
import EventList from "../components/EventList";
import { GetZipCodeEvents, GetUserEvents } from "../services/eventService";
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
      user: null,
      eventView: "My events"
    };
  },
  created() {
    this.user = this.$session.get("user");
    this.getUserEvents();
  },
  methods: {
    getUserEvents() {
      GetUserEvents(this.user.id)
        .then(events => {
          this.events = events;
          this.eventView = "My events";
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    getZipCodeEvents() {
      GetZipCodeEvents(this.user.zipCode)
        .then(events => {
          this.events = events;
          this.eventView = "Events near me";
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
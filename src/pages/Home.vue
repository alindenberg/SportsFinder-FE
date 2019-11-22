<template>
  <div class="flex">
    <errors :errors="errors" />
    <messages :messages="messages" />
    <b-row>
      <b-col class="col-6 d-flex flex-column align-items-start">
        <b-dropdown :text="viewAllEvents ? 'All Events' : 'My Events'" variant="link" size="lg">
          <b-dropdown-item :active="viewAllEvents" v-on:click="clearZipCode">All Events</b-dropdown-item>
          <b-dropdown-item :active="!viewAllEvents" v-on:click="getUserEvents">My Events</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col class="col-6 d-flex flex-column align-items-end">
        <b-button variant="primary" v-on:click="$router.push('/create_event') ">Create Event</b-button>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col md="6" class="col-10">
        <b-row v-if="viewAllEvents" class="justify-content-center">
          <b-input
            style="max-width: 180px"
            type="text"
            placeholder="Search by zip code"
            v-model="zipCode"
          />
          <b-button variant="link" v-on:click="getAllEvents">Search</b-button>
          <b-button variant="link" v-on:click="clearZipCode">Clear</b-button>
        </b-row>
      </b-col>
    </b-row>
    <eventList :events="events" />
  </div>
</template>
<script>
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
      zipCode: null,
      autocomplete: null,
      viewAllEvents: true
    };
  },
  created() {
    this.user = this.$session.get("user");
    this.getAllEvents();
  },
  methods: {
    getUserEvents() {
      GetUserEvents(this.user.id)
        .then(events => {
          this.events = events;
          this.viewAllEvents = false;
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    getAllEvents() {
      GetZipCodeEvents(this.zipCode)
        .then(events => {
          this.events = events;
          this.viewAllEvents = true;
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    clearZipCode() {
      (this.zipCode = null), this.getAllEvents();
    }
  }
};
</script>
<style></style>;
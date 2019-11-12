<template>
  <div class="flex">
    <errors :errors="errors" />
    <messages :messages="messages" />
    <!-- <find-events /> -->
    <b-row class="justify-content-center align-items-center">
      <b-col sm="2">
        <b-dropdown style="margin-right: 2%:" :text="eventView" variant="link" size="lg">
          <b-dropdown-item :active="eventView == 'My events'" v-on:click="getUserEvents">My events</b-dropdown-item>
          <b-dropdown-item
            :active="eventView == 'Events near me'"
            v-on:click="getZipCodeEvents"
          >Events near me</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col sm="4" v-if="eventView === 'Events near me'">
        <b-row>
          <!-- <b-col sm="9"> -->
          <b-input type="text" style="max-width: 80%;" v-model="zipCode" />
          <!-- </b-col> -->
          <!-- <b-col sm="3" class="d-flex-inline flex-column align-items-start"> -->
          <b-button variant="link" v-on:click="getZipCodeEvents">Search</b-button>
          <!-- </b-col> -->
        </b-row>
      </b-col>
      <b-col sm="2">
        <b-button
          style="margin-left: 2%"
          variant="primary"
          v-on:click="$router.push('/create-event') "
        >Create Event</b-button>
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
      eventView: "My events"
    };
  },
  created() {
    this.user = this.$session.get("user");
    this.zipCode = this.user.zipCode;
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
      GetZipCodeEvents(this.zipCode)
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
<style></style>;
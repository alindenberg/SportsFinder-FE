<template>
  <div class="flex">
    <errors :errors="errors" />
    <messages :messages="messages" />
    <b-row class="align-items-center">
      <b-col class="col-2 d-flex flex-column align-items-start">
        <b-dropdown :text="viewAllEvents ? 'All Events' : 'My Events'" variant="link" size="lg">
          <b-dropdown-item :active="viewAllEvents" v-on:click="clearZipCode">All Events</b-dropdown-item>
          <b-dropdown-item :active="!viewAllEvents" v-on:click="getUserEvents">My Events</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col class="col-8 d-flex flex-column align-items-center">
        <b-row class="justify-content-center" v-if="viewAllEvents">
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
      <b-col class="col-2 d-flex flex-column align-items-end">
        <div v-if="!viewAllEvents">
          <b-form-checkbox @input="pastEventsClicked" v-model="showPastEvents">Past Events</b-form-checkbox>
        </div>
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
      viewAllEvents: true,
      showPastEvents: false
    };
  },
  created() {
    this.user = this.$session.get("user");
    this.getAllEvents();
  },
  methods: {
    getUserEvents() {
      GetUserEvents(this.user.id, this.showPastEvents)
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
    },
    pastEventsClicked() {
      GetUserEvents(this.user.id, this.showPastEvents)
        .then(events => {
          this.events = events;
          this.viewAllEvents = false;
        })
        .catch(errors => {
          this.errors = errors;
        });
    }
  }
};
</script>
<style></style>;
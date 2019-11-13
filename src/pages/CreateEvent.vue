<template>
  <div>
    <h1>Create Event</h1>
    <errors :errors="errors" />
    <b-row class="justify-content-center">
      <b-col class="col-12" sm="6" md="6">
        <b-form @submit="submit">
          <b-row class="align-items-center">
            <b-col sm="3">
              <label for="nameInput">Event name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="event.name" required id="nameInput" />
            </b-col>
          </b-row>
          <b-row class="form-section align-items-cente">
            <b-col sm="3">
              <label for="descriptionInput">Description:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="event.description" id="descriptionInput" />
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="dateinput">Date:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="dateInput" v-model="date" :type="'date'" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="timeInput">Time:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="timeInput" v-model="time" :type="'time'" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="participantInput">Number of Participants:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="participantInput"
                v-model="event.desiredNumOfParticipants"
                :type="'number'"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <!-- Location Input -->
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="locationInput">Location:</label>
            </b-col>
            <b-col sm="9">
              <google-autocomplete
                class="autocomplete"
                types="establishment"
                id="autocomplete"
                placeholder="Enter a spot"
                v-on:placechanged="onPlaceChanged"
              />
            </b-col>
          </b-row>
          <b-button style="margin-top: 5%" variant="primary" type="submit">Submit</b-button>
          <b-button style="margin-top: 5%" variant="link" v-on:click="$router.push('/')">Cancel</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
var moment = require("moment-timezone");
import Errors from "../components/Errors";
import { CreateEvent } from "../services/eventService";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "CreateEvent",
  components: {
    errors: Errors,
    "google-autocomplete": VueGoogleAutocomplete
  },
  data() {
    return {
      errors: [],
      date: null,
      time: null,
      location: null,
      event: {
        name: null,
        description: "",
        attendees: [],
        creatorId: null
      }
    };
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      if (!this.location) {
        this.errors = ["Must supply a location where event will be held."];
      }
      this.event.location = this.location;
      this.event.time = moment(`${this.date}T${this.time}`)
        .tz(moment.tz.guess())
        .utc()
        .format();
      CreateEvent(this.event)
        .then(() => {
          this.$router.push("/");
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    onPlaceChanged(address, place) {
      this.location = {
        name: place.name,
        streetAddress: `${address.street_number} ${address.route}`,
        city: address.locality,
        zipCode: address.postal_code,
        state: address.administrative_area_level_1
      };
    }
  },
  created() {
    const user = this.$session.get("user");
    this.event.creatorId = user.id;
    this.event.attendees.push(user.id);
  }
};
</script>

<style>
</style>
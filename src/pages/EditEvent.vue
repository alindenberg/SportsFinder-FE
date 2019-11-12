<template>
  <div>
    <h1>Edit Event</h1>
    <errors :errors="errors" />
    <messages :messages="messages" />
    <b-row v-if="event" class="justify-content-center">
      <b-col class="col-12" sm="6" md="6">
        <b-form @submit="submit" @reset="reset">
          <b-row>
            <b-col sm="3">
              <label for="nameInput">Event name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="modifiedEvent.name" required id="nameInput" />
            </b-col>
          </b-row>
          <b-row class="form-section">
            <b-col sm="3">
              <label for="descriptionInput">Description:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="modifiedEvent.description" id="descriptionInput" />
            </b-col>
          </b-row>
          <b-row class="form-section">
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
                v-model="modifiedEvent.desiredNumOfParticipants"
                :type="'number'"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <!-- Location Input -->
          <!-- <b-row class="form-section justify-content-start">
            <h4>
              <u>Location</u>
            </h4>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="locationNameInput">Name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="locationNameInput" v-model="modifiedEvent.location.name" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="streetInput">Street:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="streetInput" v-model="modifiedEvent.location.street" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="cityInput">City:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="cityInput" v-model="modifiedEvent.location.city" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="stateInput">State:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="stateInput" v-model="modifiedEvent.location.state" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="zipCodeInput">Zip Code:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input id="zipCodeInput" v-model="modifiedEvent.location.zipCode" required></b-form-input>
            </b-col>
          </b-row>-->
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label for="locationInput">Location:</label>
            </b-col>
            <b-col sm="9">
              <google-autocomplete
                class="autocomplete"
                types="establishment"
                id="edit_autocomplete"
                :placeholder="getFormattedAddress(event.location)"
                v-on:placechanged="onPlaceChanged"
              />
            </b-col>
          </b-row>
          <b-row class="form-section justify-content-around">
            <b-button variant="primary" :disabled="!changesMade" type="submit">Submit</b-button>
            <b-button variant="link" :disabled="!changesMade" type="reset">Reset</b-button>
            <b-button variant="danger" v-on:click="deleteEvent">Delete Event</b-button>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
var moment = require("moment-timezone");
import Errors from "../components/Errors";
import Messages from "../components/Messages";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { UpdateEvent, DeleteEvent } from "../services/eventService";
export default {
  name: "EditEvent",
  components: {
    messages: Messages,
    errors: Errors,
    "google-autocomplete": VueGoogleAutocomplete
  },
  data() {
    return {
      errors: [],
      messages: [],
      originalEvent: null,
      modifiedEvent: null,
      date: null,
      time: null
    };
  },
  props: {
    event: Object
  },
  computed: {
    changesMade: function() {
      return !(
        JSON.stringify(this.originalEvent) == JSON.stringify(this.modifiedEvent)
      );
    }
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      this.modifiedEvent.time = `${this.date}T${this.time}:00Z`;
      UpdateEvent(this.modifiedEvent)
        .then(() => {
          this.originalEvent = JSON.parse(JSON.stringify(this.modifiedEvent));
          this.messages = ["Successfully updated event"];
          this.initProperties();
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    reset(evt) {
      evt.preventDefault();
      this.initProperties();
    },
    deleteEvent() {
      DeleteEvent(this.originalEvent.id).then(() => {
        this.$router.push("/");
      });
    },
    initProperties() {
      // copy event to original & modifiable object so we can restore state if needed
      this.modifiedEvent = JSON.parse(JSON.stringify(this.originalEvent));
      const timeComponents = moment(this.modifiedEvent.time)
        .format("YYYY-MM-DDThh:mm")
        .split("T");
      this.date = timeComponents[0];
      this.time = timeComponents[1];
    },
    getFormattedAddress(location) {
      let addressString = "";
      if (location.name) {
        addressString = addressString.concat(`${location.name} - `);
      }
      if (location.streetAddress) {
        addressString = addressString.concat(`${location.streetAddress}, `);
      }
      if (location.city) {
        addressString = addressString.concat(`${location.city} `);
      }
      if (location.state) {
        addressString = addressString.concat(`${location.state}, `);
      }
      if (location.zipCode) {
        addressString = addressString.concat(`${location.zipCode}`);
      }
      return addressString;
    },
    onPlaceChanged(address, place) {
      this.modifiedEvent.location = {
        name: place.name,
        streetAddress: `${address.street_number} ${address.route}`,
        city: address.locality,
        zipCode: address.postal_code,
        state: address.administrative_area_level_1
      };
    }
  },
  created() {
    if (!this.event) {
      this.$router.push("/");
    } else {
      this.originalEvent = JSON.parse(JSON.stringify(this.event));
      this.initProperties();
    }
  }
};
</script>

<style>
.autocomplete {
  padding: 0.375rem 0.75rem;
  min-width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>
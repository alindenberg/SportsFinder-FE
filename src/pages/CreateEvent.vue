<template>
  <div>
    <h1>Create Event</h1>
    <errors :errors="errors" />
    <b-row class="justify-content-center">
      <b-col class="col-12" sm="6" md="6">
        <b-form @submit="submit">
          <b-row>
            <b-col sm="3">
              <label :for="nameInput">Event name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="event.name" required id="nameInput" />
            </b-col>
          </b-row>
          <b-row class="form-section">
            <b-col sm="3">
              <label :for="descriptionInput">Description:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="event.description" id="descriptionInput" />
            </b-col>
          </b-row>
          <b-row class="form-section">
            <b-col sm="3">
              <label :for="dateinput">Date:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :id="dateInput" v-model="date" :type="'date'" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label :for="timeInput">Time:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :id="timeInput" v-model="time" :type="'time'" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label :for="participantInput">Number of Participants:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                :id="participantInput"
                v-model="event.desiredNumOfParticipants"
                :type="'number'"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <!-- Location Input -->
          <b-row class="form-section justify-content-start">
            <h4>
              <u>Location</u>
            </h4>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label :for="locationNameInput">Name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :id="locationNameInput" v-model="event.location.name" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label :for="streetInput">Street:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :id="streetInput" v-model="event.location.street" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label :for="cityInput">City:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :id="cityInput" v-model="event.location.city" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label :for="stateInput">State:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :id="stateInput" v-model="event.location.state" required></b-form-input>
            </b-col>
          </b-row>
          <b-row class="form-section align-items-center">
            <b-col sm="3">
              <label :for="zipCodeInput">Zip Code:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :id="zipCodeInput" v-model="event.location.zipCode" required></b-form-input>
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
import Errors from "../components/Errors";
import { CreateEvent } from "../services/eventService";
export default {
  name: "CreateEvent",
  components: {
    errors: Errors
  },
  data() {
    return {
      errors: [],
      date: null,
      time: null,
      event: {
        name: null,
        description: "",
        datetime: null,
        location: {
          name: null,
          zipCode: null,
          street: null,
          city: null,
          state: null
        },
        attendees: [],
        creatorId: null
      }
    };
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      this.event.time = `${this.date}T${this.time}:00Z`;
      CreateEvent(this.event)
        .then(() => {
          this.$router.push("/");
        })
        .catch(errors => {
          this.errors = errors;
        });
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
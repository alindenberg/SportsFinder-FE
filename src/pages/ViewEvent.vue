<template>
  <div>
    <errors :errors="errors" />
    <div v-if="event">
      <h1>
        {{event.name}}
        <v-icon
          v-if="event.creatorId == userId"
          large="true"
          v-on:click="$router.push({name: 'EditEvent', params: {event: event}})"
          style="cursor: pointer"
          name="edit"
        />
      </h1>
      <div>{{event.description}}</div>
      <b-row style="margin-top: 2%">
        <b-col sm="6">
          <h5>{{event.location.name}}</h5>
          <h5>{{getDisplayTime(event.time)}}</h5>
          <h5>{{getDisplayAddress(event.location)}}</h5>
        </b-col>
        <b-col sm="6">
          <u>
            <h4>Attendees</h4>
          </u>
          <p v-for="(username, userId) in attendeeMap" :key="userId">{{username}}</p>
          <h6
            v-if="event.attendees.length == event.desiredNumOfParticipants"
          >Event has maximum number of participants.</h6>
          <b-button
            variant="primary"
            v-if="!attendeeMap[userId] && event.attendees.length < event.desiredNumOfParticipants"
            v-on:click="rsvp"
          >RSVP</b-button>
          <b-button variant="primary" v-if="attendeeMap[userId]" v-on:click="cancelRSVP">Cancel RSVP</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
var moment = require("moment-timezone");
import Errors from "../components/Errors";
import { GetUser } from "../services/userService";
import { PostAttendees } from "../services/eventService";
export default {
  name: "ViewEvent",
  components: {
    errors: Errors
  },
  data() {
    return {
      attendeeMap: {},
      userId: null,
      errors: []
    };
  },
  props: {
    event: Object
  },
  watch: {
    event() {
      this.getAttendeeMap(this.event.attendees);
    }
  },
  created() {
    if (!this.event) {
      this.$router.push("/");
    } else {
      this.userId = this.$session.get("user").id;
      this.getAttendeeMap(this.event.attendees);
    }
  },
  methods: {
    getAttendeeMap(attendees) {
      let attendeeMap = {};
      let promises = [];
      for (let i = 0; i < attendees.length; i++) {
        let attendee = attendees[i];
        promises.push(
          GetUser(attendee)
            .then(user => {
              attendeeMap[attendee] = user.username;
            })
            .catch(errors => {
              this.errors = errors;
            })
        );
      }
      Promise.all(promises).then(() => {
        this.attendeeMap = attendeeMap;
      });
    },
    rsvp() {
      this.event.attendees.push(this.userId);
      PostAttendees(this.event.id, this.event.attendees)
        .then(() => {
          this.getAttendeeMap(this.event.attendees);
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    cancelRSVP() {
      for (let i = 0; i < this.event.attendees.length; i++) {
        if (this.event.attendees[i] == this.userId) {
          this.event.attendees.splice(i, 1);
          PostAttendees(this.event.id, this.event.attendees)
            .then(() => {
              this.getAttendeeMap(this.event.attendees);
            })
            .catch(errors => {
              this.errors = errors;
            });
        }
      }
    },
    getDisplayTime(time) {
      return moment(time).format("dddd, MMMM Do YYYY, h:mm a");
    },
    getDisplayAddress(location) {
      let addressString = "";
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
    }
  }
};
</script>

<style>
</style>
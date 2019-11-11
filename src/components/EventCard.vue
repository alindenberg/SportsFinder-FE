<template>
  <div>
    <errors :errors="errors" />
    <b-card :title="event.name" :sub-title="getDisplayTime(event.time)">
      <b-button
        variant="link"
        v-on:click="$router.push({name: 'ViewEvent', params: {event: event}})"
      >View</b-button>
      <b-button variant="link" v-on:click="rsvpToEvent" v-if="canAttend">RSVP</b-button>
      <b-button variant="link" v-on:click="cancelRsvp" v-if="isAttending">Cancel RSVP</b-button>
      <b-button
        variant="link"
        v-on:click="$router.push({name: 'EditEvent', params: {event: event}})"
        v-if="event.creatorId == userId"
      >Edit Event</b-button>
    </b-card>
  </div>
</template>

<script>
const moment = require("moment-timezone");
import Errors from "../components/Errors";
import { PostAttendees } from "../services/eventService";
export default {
  name: "EventCard",
  components: {
    errors: Errors
  },
  data() {
    return {
      userId: null,
      isAttending: false,
      errors: []
    };
  },
  props: {
    event: Object
  },
  watch: {
    event: function() {
      //eslint-disable-next-line
      console.log("EVENT CARD UPDATED");
      this.initProperties();
    }
  },
  created() {
    this.initProperties();
  },
  computed: {
    canAttend: function() {
      return (
        !this.isAttending &&
        this.event.attendees.length < this.event.desiredNumOfParticipants
      );
    }
  },
  methods: {
    getDisplayTime(time) {
      return moment(time).format("dddd, MMMM Do YYYY, h:mm a");
    },
    rsvpToEvent() {
      this.event.attendees.push(this.userId);
      PostAttendees(this.event.id, this.event.attendees)
        .then(() => {
          this.isAttending = true;
        })
        .catch(errors => {
          this.errors = errors;
        });
    },
    cancelRsvp() {
      for (let i = 0; i < this.event.attendees.length; i++) {
        if (this.event.attendees == this.userId) {
          this.event.attendees.splice(i, 1);
          PostAttendees(this.event.id, this.event.attendees)
            .then(() => {
              this.isAttending = false;
            })
            .catch(errors => {
              this.errors = errors;
            });
          break;
        }
      }
    },
    initProperties() {
      let isAttending = false;
      this.userId = this.$session.get("user").id;
      for (let i = 0; i < this.event.attendees.length; i++) {
        if (this.event.attendees[i] == this.userId) {
          isAttending = true;
          break;
        }
      }
      this.isAttending = isAttending;
    }
  }
};
</script>

<style scoped>
.eventCard {
  cursor: pointer;
}
</style>
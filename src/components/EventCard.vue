<template>
  <b-card :title="event.name" :sub-title="getDisplayTime(event.time)">
    <b-button variant="link" v-on:click="$router.push(`/events/${event.id}`)">View</b-button>
    <b-button variant="link" v-on:click="rsvpToEvent" v-if="canAttend">RSVP</b-button>
    <b-button variant="link" v-on:click="cancelRsvp" v-if="isAttending">Cancel RSVP</b-button>
  </b-card>
</template>

<script>
const moment = require("moment-timezone");
export default {
  name: "EventCard",
  data() {
    return {
      userId: null,
      isAttending: false
    };
  },
  props: {
    event: Object
  },
  watch: {
    event: function() {}
  },
  created() {
    this.userId = this.$session.get("user").id;
    for (let i = 0; i < this.event.attendees.length; i++) {
      if (this.event.attendees == this.userId) {
        this.isAttending = true;
        break;
      }
    }
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
      this.isAttending = true;
    },
    cancelRsvp() {
      for (let i = 0; i < this.event.attendees.length; i++) {
        if (this.event.attendees == this.userId) {
          this.event.attendees.splice(i, 1);
          this.isAttending = false;
          break;
        }
      }
    },
    cardClicked() {
      //eslint-disable-next-line
      console.log("Event card clicked");
    }
  }
};
</script>

<style scoped>
.eventCard {
  cursor: pointer;
}
</style>
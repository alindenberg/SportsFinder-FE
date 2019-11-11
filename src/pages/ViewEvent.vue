<template>
  <div>
    <errors :errors="errors" />
    <div v-if="event">
      <h1>{{event.name}}</h1>
      <p>{{event.description}}</p>
      <p v-for="(username, userId) in attendeeMap" :key="userId">{{username}}</p>
    </div>
  </div>
</template>

<script>
import Errors from "../components/Errors";
import { GetEvent } from "../services/eventService";
import { GetUser } from "../services/userService";
export default {
  name: "ViewEvent",
  components: {
    errors: Errors
  },
  data() {
    return {
      event: null,
      attendeeMap: {},
      errors: []
    };
  },
  created() {
    GetEvent(this.$route.params.eventId)
      .then(event => {
        this.event = event;
        this.getAttendeeMap(event.attendees);
      })
      .catch(errors => {
        this.errors = errors;
      });
  },
  methods: {
    getAttendeeMap(attendees) {
      let attendeeMap = {};
      for (let i = 0; i < attendees.length; i++) {
        let attendee = attendees[i];
        GetUser(attendee)
          .then(user => {
            attendeeMap[attendee] = user.username;
          })
          .catch(errors => {
            this.errors = errors;
          });
      }
      this.attendeeMap = attendeeMap;
    }
  }
};
</script>

<style>
</style>
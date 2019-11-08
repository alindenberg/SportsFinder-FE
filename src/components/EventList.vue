<template>
  <b-row style="height: 80vh" class="justify-content-center align-items-center">
    <b-col class="col-12" sm="8" v-if="events.length > 0">
      <b-row class="justify-content-around align-items-center">
        <u>
          <h3>Events near {{zipCode}}</h3>
        </u>
        <b-button class="element" variant="primary">Create Event</b-button>
      </b-row>
      <event class="element" v-for="(event, index) in events" :key="index" :event="event" />
    </b-col>
    <div v-if="events.length == 0">
      <h4>No events found in {{zipCode}} zip code</h4>
      <b-button variant="primary">Create Event</b-button>
    </div>
  </b-row>
</template>

<script>
import Axios from "axios";
import Event from "./Event";
export default {
  name: "EventList",
  components: {
    Event
  },
  data() {
    return {
      error: null,
      events: []
    };
  },
  props: {
    zipCode: String
  },
  watch: {
    zipCode: function() {
      this.getEventList();
    }
  },
  created() {
    if (this.zipCode) {
      this.getEventList();
    }
  },
  methods: {
    getEventList() {
      Axios.get(`${process.env.VUE_APP_API_URL}/events?zipCode=${this.zipCode}`)
        .then(result => {
          for (let i = 0; i < 10; i++) {
            this.events.push(result.data[0]);
          }
        })
        .catch(() => {
          this.error = "Error fetching events in this area.";
        });
    }
  }
};
</script>

<style>
.element {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
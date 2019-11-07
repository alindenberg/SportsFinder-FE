<template>
  <div>
    <h2>Find Events</h2>
    <b-form inline class="d-flex flex-row justify-content-center">
      <b-input-group label="Enter Zip Code:" label-for="zipCodeInput">
        <b-form-input id="zipCodeInput" placeholder="Zip Code" type="text" />
      </b-input-group>
      <b-button variant="primary">Search</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "FindEvents"
};
</script>
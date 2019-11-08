<template>
  <div>
    <b-form inline class="d-flex flex-row justify-content-center">
      <b-input-group label="Enter Zip Code:" label-for="zipCodeInput">
        <b-form-input id="zipCodeInput" placeholder="Zip Code" type="text" />
      </b-input-group>
      <b-button style="margin-left: 2%" variant="primary">Search</b-button>
    </b-form>
    <small>Search for events in a different zip code</small>
  </div>
</template>
<script>
export default {
  name: "FindEvents"
};
</script>
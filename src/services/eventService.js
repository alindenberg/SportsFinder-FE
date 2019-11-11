import Axios from 'axios'

export function CreateEvent(event) {
  return Axios.post(`${process.env.VUE_APP_API_URL}/events`, event).catch(err => {
    handle_error(err)
  })
}

export function GetEvent(id) {
  return Axios.get(`${process.env.VUE_APP_API_URL}/events/${id}`).then(result => result.data).catch((err) => {
    handle_error(err)
  });
}

export function GetZipCodeEvents(zipCode) {
  return Axios.get(`${process.env.VUE_APP_API_URL}/events?zipCode=${zipCode}`)
    .then(result => result.data)
    .catch((err) => {
      handle_error(err)
    });
}

export function GetUserEvents(userId) {
  return Axios.get(`${process.env.VUE_APP_API_URL}/events?userId=${userId}`)
    .then(result => result.data)
    .catch((err) => {
      handle_error(err)
    });
}

export function PostAttendees(eventId, attendees) {
  return Axios.post(`${process.env.VUE_APP_API_URL}/events/${eventId}/attendees`, {
    attendees: attendees
  }).catch(err => {
    handle_error(err)
  })
}

export function UpdateEvent(event) {
  return Axios.put(`${process.env.VUE_APP_API_URL}/events/${event.id}`, event).catch(err => {
    handle_error(err)
  })
}

export function DeleteEvent(eventId) {
  return Axios.delete(`${process.env.VUE_APP_API_URL}/events/${eventId}`).catch(err => {
    handle_error(err)
  })
}

function handle_error(err) {
  let errors = []
  if (err.response) {
    if (err.response.data.errors) {
      errors = err.response.data.errors;
    } else {
      errors.push(err.response.data.error);
    }
  } else {
    errors.push(err)
  }
  throw errors
}
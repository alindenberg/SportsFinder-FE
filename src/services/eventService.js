import Axios from 'axios'

export function CreateEvent(event) {
  return Axios.post(`${process.env.VUE_APP_API_URL}/events`, event).catch(err => {
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
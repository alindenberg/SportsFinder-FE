import Axios from 'axios'

export function GetUser(userId) {
  return Axios.get(`${process.env.VUE_APP_API_URL}/users/${userId}`).then(resp => {
    return resp.data
  }).catch(err => {
    handle_error(err)
  })
}

export function UpdateUser(user) {
  return Axios.put(`${process.env.VUE_APP_API_URL}/users/${user.id}`, user).catch(err => {
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
    errors.push(err);
  }
  throw errors
}
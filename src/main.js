import Vue from 'vue'
import VueSession from 'vue-session'
import VueRouter from 'vue-router'
import Axios from 'axios'
// Vue-awesome
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/edit'
// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Pages
import App from './App.vue'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ViewEvent from './pages/ViewEvent'
import EditEvent from './pages/EditEvent'
import CreateEvent from './pages/CreateEvent'
import ResetPassword from './pages/ResetPassword'
import InitiatePasswordReset from './pages/InitiatePasswordReset'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignUp },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/event', name: 'ViewEvent', component: ViewEvent, props: true },
  { path: '/edit_event', name: 'EditEvent', component: EditEvent, props: true },
  { path: '/create_event', component: CreateEvent },
  { path: '/initiate_password_reset', component: InitiatePasswordReset },
  { path: '/password_reset', component: ResetPassword }
]
const router = new VueRouter({
  mode: 'history',
  routes,
})

Axios.interceptors.response.use(undefined, function (err) {
  if (err.response != undefined && err.response.status === 401) {
    // if you ever get an unauthorized, redirect user to login
    router.push('/login')
  }
  return Promise.reject(err)
});

Vue.use(VueRouter)
Vue.use(VueSession, { persist: true })
Vue.use(BootstrapVue)
Vue.component('v-icon', Icon)

new Vue({
  router,
  render: h => h(App),
  created() {
    if (!this.$session.exists()
      && this.$route.path != '/signup'
      && this.$route.path != '/password_reset'
      && this.$route.path != '/initiate_password_reset') {
      this.$router.push('/login')
    }
  }
}).$mount('#app')

import Vue from 'vue'
import VueSession from 'vue-session'
import VueRouter from 'vue-router'
// import Axios from 'axios'
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
import CreateEvent from './pages/CreateEvent'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignUp },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/event', name: 'ViewEvent', component: ViewEvent, props: true },
  { path: '/create-event', component: CreateEvent }
]
const router = new VueRouter({
  mode: 'history',
  routes,
})

// Axios.interceptors.response.use(undefined, function (err) {
//   if (err.response != undefined && err.response.status === 401) {
//     // if you ever get an unauthorized, redirect user to login
//     router.push('/login')
//   }
// });

Vue.use(VueRouter)
Vue.use(VueSession)
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App),
  mounted() {
    if (!this.$session.exists()) {
      router.push('/login')
    }
  }
}).$mount('#app')

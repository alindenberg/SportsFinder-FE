import Vue from 'vue'
import VueRouter from 'vue-router'
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
import CreateEvent from './pages/CreateEvent'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignUp },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/create-event', component: CreateEvent },
]
const router = new VueRouter({
  mode: 'history',
  routes,

})
Vue.use(VueRouter)
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

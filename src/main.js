import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant'
import 'amfe-flexible/index.js'
import './assets/css/global.css'
import bus from './bus';

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
// axios 
import axios from "./api/http";
// api
import api from "./api/api";
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$bus = bus

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

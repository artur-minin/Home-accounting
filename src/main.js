import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'

import dateFilter from './filters/date.filter'

import messagePlugin from '@/common/message.plugin'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
//register custom filter function as "date" filter
Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: "AIzaSyDSggNOMJYD2cKKXh5c5UkDK76e0Lip1VI",
  authDomain: "vue-vuex-crm.firebaseapp.com",
  databaseURL: "https://vue-vuex-crm.firebaseio.com",
  projectId: "vue-vuex-crm",
  storageBucket: "vue-vuex-crm.appspot.com",
  messagingSenderId: "578990943983",
  appId: "1:578990943983:web:821be0d2b3e57d54fbb51a",
  measurementId: "G-SXJ1VW6CLG"
})

let app = null

firebase.auth().onAuthStateChanged(() => {
  // if app isn't initialized
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyBYbipQgYDFMgO8uGL67drC9t5kUM4-0iw",
  authDomain: "vue-meetup-9ce1a.firebaseapp.com",
  databaseURL: "https://vue-meetup-9ce1a.firebaseio.com",
  projectId: "vue-meetup-9ce1a",
  storageBucket: "vue-meetup-9ce1a.appspot.com",
  messagingSenderId: "463478566258"
}

Vue.prototype.$firebase = firebase.initializeApp(config)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

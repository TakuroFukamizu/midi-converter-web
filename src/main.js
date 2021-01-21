// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* import Firebase */
// import firebase from 'firebase'

// Quasar
// import { Platform } from 'quasar'
// import Quasar, * as All from 'quasar-framework'
// import 'quasar-framework/dist/quasar.mat.styl' //This dependency was not found:
// import 'quasar-extras/material-icons'

Vue.config.productionTip = false

// Vue.use(Quasar, {
//   components: All,
//   directives: All
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

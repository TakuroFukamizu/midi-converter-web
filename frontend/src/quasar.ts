import Vue from 'vue'

import './styles/quasar.styl'
import lang from 'quasar/lang/ja'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
  },
  lang: lang
 })
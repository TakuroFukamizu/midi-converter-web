import Vue from 'vue';
import Vuex from 'vuex';
import { webRtc } from './webrtc';
import { midi } from './midi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    webRtc,
    midi,
  }
})

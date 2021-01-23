import { Module } from 'vuex';
import { RootState } from '../types';
import { WebRtcState } from './types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import EventEmitter from 'events';

const state: WebRtcState = {
    peer: null,
    peerId: '',
    dataConnection: null,
    eventhub: new EventEmitter(),
};

export const webRtc: Module<WebRtcState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
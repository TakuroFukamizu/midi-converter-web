import { Module } from 'vuex';
import { RootState } from '../types';
import { MidiState } from './types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import EventEmitter from 'events';

const state: MidiState = {
    inputs: [],
    outputs: [],
    eventhub: new EventEmitter(),
    messages: [],
    messageSizeLimit: 20,
};
// state.eventhub.on('message', actions.onMidiEvent);

export const midi: Module<MidiState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

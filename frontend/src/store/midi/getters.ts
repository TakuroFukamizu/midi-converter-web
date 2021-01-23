import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { MidiState } from './types';

const getters: GetterTree<MidiState, RootState> = {
    inputs: (state: MidiState) => state.inputs,
    outputs: (state: MidiState) => state.outputs,
    messages: (state: MidiState) => state.messages,
};

export default getters;
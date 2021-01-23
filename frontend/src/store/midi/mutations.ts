import { MutationTree } from 'vuex';
import {
    MidiState,
    MidiMessageData,
    MidiInputWithCondition,
    MidiOutputWithCondition,
} from './types';

const mutations: MutationTree<MidiState> = {
    addInput: (state, device: any) => { 
        state.inputs.push({
            kind: 'input',
            device: device,
            use: false
        } as MidiInputWithCondition);
    },
    addOutput: (state, device: any) => { 
        state.outputs.push({
            kind: 'output',
            device: device,
            use: false
        } as MidiOutputWithCondition);
    },
    addMessage: (state, message: MidiMessageData) => {
        state.messages.unshift(message);
        if (state.messages.length > state.messageSizeLimit) { 
            state.messages = state.messages.slice(0, state.messageSizeLimit);
        }
    },
    updateInputDevice: (state, value: MidiInputWithCondition) => { 
        for (let i = 0; i < state.inputs.length; i++) { 
            if (state.inputs[i].device.id != value.device.id) continue;
            state.inputs[i] = value;
        }
    },
    updateOutputDevice: (state, value: MidiOutputWithCondition) => { 
        for (let i = 0; i < state.outputs.length; i++) { 
            if (state.outputs[i].device.id != value.device.id) continue;
            state.outputs[i] = value;
        }
    },
};

export default mutations;
import { ActionTree, Commit } from 'vuex';
import { RootState } from '../types';
import { MidiState, MidiMessageData, ToggleInputDeviceUsageParams, ToggleOutputDeviceUsageParams } from './types';
import { MIDIMessageEvent } from 'webmidi';
import { v4 as uuidv4 } from 'uuid';

const actions: ActionTree<MidiState, RootState> = {
    getDevices: async ({ state, commit }) => {
        state.inputs = [];
        state.outputs = [];
    
        // const access = await navigator.requestMIDIAccess({ sysex: false })
        const access = await navigator.requestMIDIAccess();
        access.onstatechange = (e) => {
          // Print information about the (dis)connected MIDI controller
          console.info(e.port.name, e.port.manufacturer, e.port.state);
          // TODO: 変更を動的に変更
        }
    
        // MIDI Inputデバイスの配列を作成
        const inputIterator = access.inputs.values();
        for (let o = inputIterator.next(); !o.done; o = inputIterator.next()) {
            console.log(o.value);
            o.value.onmidimessage = (event: MIDIMessageEvent) => state.eventhub.emit('rawMessageInput', event);
            commit('addInput', o.value);
        }
    
        // MIDI Outputデバイスの配列を作成
        const outputIterator = access.outputs.values();
        for (let o = outputIterator.next(); !o.done; o = outputIterator.next()) {
          console.log(o.value);
          commit('addOutput', o.value);
        }
    },
    toggleInputDeviceUsage: async ({ state, commit }, params: ToggleInputDeviceUsageParams) => { 
        for (const input of state.inputs) { 
            if (input.device.id != params.input.device.id) continue;
            if (input.use == params.use) return false; //変更の必要無し
            commit('updateInputDevice', params.input);
            return true;
        }
        return false;
    },
    toggleOutputDeviceUsage: async ({ state, commit }, params: ToggleOutputDeviceUsageParams) => { 
        for (const output of state.outputs) { 
            if (output.device.id != params.output.device.id) continue;
            if (output.use == params.use) return false; //変更の必要無し
            commit('updateOutputDevice', params.output);
            return true;
        }
        return false;
    },
    onRawInputEvent: async ({ state, dispatch }, event: MIDIMessageEvent) => { 
        console.log(event);
        const fromDeviceId = event.srcElement.id;
        // TODO: 重くなるようなら、useするときだけイベントを割り当てる
        for (const { device, use } of state.inputs) { // 使用しているデバイスのメッセージのみ拾う
            if (device.id != fromDeviceId) continue;
            if (!use) return; // 使用しない
        }
        const message = {
            id: uuidv4(),
            from: event.srcElement.name || 'undefined',
            isRemote: false,
            timestamp: event.timeStamp as number,
            data: event.data,
        } as MidiMessageData;
        state.eventhub.emit('message', message);
        dispatch('addMidiData', message);
    },
    addMidiData: ({ state, commit }, message: MidiMessageData) => {
        // console.log(message);
        // 自分が持っているデバイスに送る
        for (const { device, use } of state.outputs) {
            if (!use) continue;
            device.send(message.data);
        }
        // メッセージログに送信
        commit('addMessage', message);
    },
};

export default actions;
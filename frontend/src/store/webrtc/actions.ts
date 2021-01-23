import { ActionTree, Commit } from 'vuex';
import { RootState } from '../types';
import { WebRtcState, WebRtcMidiMessage } from './types';
import Peer, { DataConnection } from 'skyway-js';

// TODO: MeshRoom 対応する？

const actions: ActionTree<WebRtcState, RootState> = {
    createPeer: async ({ state, commit, dispatch }) => {
        const key = process.env.VUE_APP_SKYWAY_API_KEY || '';
        if (key.length == 0) throw new Error('SkyWay API Key is invalid');
        const peer = new Peer({ key: key });
        commit('setPeer', peer);
        peer.on('open', () => {
            commit('setPeerId', peer.id);

            // 着手処理
            peer.on("connection", (dataConnection) => {
                dispatch('setupDataConnction', dataConnection);
            });
            return true;
        });
    },
    makeCall: async ({ state, dispatch }, theirId: string) => { 
        const dataConnection = state.peer!.connect(theirId);
        dispatch('setupDataConnction', dataConnection);
        return true;
    },
    setupDataConnction: ({ state, commit }, dataConnection: DataConnection) => { 
        dataConnection.on('data', (data: any) => {
            state.eventhub.emit('midiDataReceived', (data as WebRtcMidiMessage));
        });
        dataConnection.on("error", (error) => {
            console.error('dataConnection has error. ', error);
        });
        commit('setDataConnection', dataConnection);
    },
    closeCall: ({ state, commit }) => { 
        state.dataConnection?.close(true);
    },
    sendMidiData: ({ state, commit }, message: WebRtcMidiMessage) => { 
        state.dataConnection?.send(message);
    }
};

export default actions;
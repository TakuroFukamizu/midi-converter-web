import { MutationTree } from 'vuex';
import { WebRtcState } from './types';
import Peer, { DataConnection } from 'skyway-js';

const mutations: MutationTree<WebRtcState> = {
    setPeer: (state, peer: Peer) => {
        state.peer = peer;
    },
    setPeerId: (state, peerId: string) => {
        state.peerId = peerId;
    },
    setDataConnection: (state, dataConnection: DataConnection) => {
        state.dataConnection = dataConnection;
    }
};

export default mutations;
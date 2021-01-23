import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { WebRtcState } from './types';

const getters: GetterTree<WebRtcState, RootState> = {
    peer: (state: WebRtcState) => state.peer,
    peerId: (state: WebRtcState) => state.peerId,
    dataConnection: (state: WebRtcState) => state.dataConnection,
    theirId: (state: WebRtcState) => state.dataConnection?.remoteId,

    isConnected: (state: WebRtcState) => {
        return (state.peer != null && state.peerId.length > 0);
    },
    isDataChConnected: (state: WebRtcState) => {
        return (state.dataConnection?.open === true);
    }
};

export default getters;
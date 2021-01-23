import Peer, { DataConnection } from 'skyway-js';
import EventEmitter from 'events';

export interface WebRtcMidiMessage { 
    id: string;
    timestamp: number;
    data: Uint8Array;
}

export interface WebRtcState {
    peer: Peer | null;
    peerId: string;
    dataConnection: DataConnection | null,
    eventhub: EventEmitter;
}
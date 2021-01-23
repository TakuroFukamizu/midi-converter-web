import 'webmidi';
import EventEmitter from 'events';

export interface MidiInputWithCondition {
    device: WebMidi.MIDIInput;
    use: boolean;
}

export interface MidiOutputWithCondition {
    device: WebMidi.MIDIOutput;
    use: boolean;
}

export interface MidiMessageData { 
    id: string;
    from: string;
    isRemote: boolean;
    timestamp: number; // DOMHighResTimeStamp 
    data: Uint8Array;
}

export interface ToggleInputDeviceUsageParams { 
    input: MidiInputWithCondition;
    use: boolean;
}
export interface ToggleOutputDeviceUsageParams { 
    output: MidiOutputWithCondition;
    use: boolean;
}
  
export interface MidiState {
    inputs: MidiInputWithCondition[];
    outputs: MidiOutputWithCondition[];
    eventhub: EventEmitter;
    messages: MidiMessageData[];
    messageSizeLimit: number;
}
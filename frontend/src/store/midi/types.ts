import { MIDIInput, MIDIOutput, MIDIMessageEvent } from 'webmidi';
import EventEmitter from 'events';

export interface MidiDeviceWithConditionInterface {
    kind: 'input' | 'output';
    device: MIDIInput | MIDIOutput;
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
    input: MidiDeviceWithConditionInterface;
    use: boolean;
}
export interface ToggleOutputDeviceUsageParams { 
    output: MidiDeviceWithConditionInterface;
    use: boolean;
}
  
export interface MidiState {
    inputs: MidiDeviceWithConditionInterface[];
    outputs: MidiDeviceWithConditionInterface[];
    eventhub: EventEmitter;
    messages: MidiMessageData[];
    messageSizeLimit: number;
}
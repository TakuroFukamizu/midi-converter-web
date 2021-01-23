<template lang="pug">
  q-page.flex.flex-center
    .row
      .col
        q-btn(color="primary" label="Load Devices" icon="cached" @click="getDevices")
    .row
      .col
        q-card
          q-tabs.bg-primary.text-white.shadow-2(v-model="deviceTab" align="justify" narrow-indicator)
            q-tab(name="inputs" icon="input" label="Input")
            q-tab(name="outputs" icon="outbond" label="Output")
          q-separator
          q-tab-panels(v-model="deviceTab" animated)
            q-tab-panel(name="inputs")
              .text-h6 MIDI Input Devices
              q-list(bordered separator)
                q-item(v-for="input in inputs" :key="input.device.id" clickable v-ripple)
                  q-item-section
                    q-item-label {{input.device.name}}
                    q-item-label(caption) {{input.device.manufacturer}} 
                  q-item-section(side)
                    q-toggle(color="blue" v-model="input.use" val="use")
            q-tab-panel(name="outputs")
              .text-h6 MIDI Output Devices
              q-list(bordered separator)
                q-item(v-for="output in outputs" :key="output.device.id" clickable v-ripple)
                  q-item-section
                    q-item-label {{output.device.name}}
                    q-item-label(caption) {{output.device.manufacturer}} 
                  q-item-section(side)
                    q-toggle(color="blue" v-model="output.use" val="use")
    .row
      .col
        q-card
          q-list(separator)
            q-item(v-for="msg in messages" :key="msg.id") [{{msg.timeStamp}}] {{msg.from}} > {{parseMidiMessage(msg.data)}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MIDIInput, MIDIOutput, MIDIMessageEvent } from 'webmidi';
import { MidiDeviceWithConditionInterface, ToggleInputDeviceUsageParams, ToggleOutputDeviceUsageParams} from '../store/midi/types';

const MidiModule = namespace('midi');


@Component
export default class HelloWorld extends Vue {
    private deviceTab = 'inputs';

    @MidiModule.State('inputs')
    private inputs!: MidiDeviceWithConditionInterface[];

    @MidiModule.State('outputs')
    private outputs!: MidiDeviceWithConditionInterface[];

    @MidiModule.State('messages')
    private messages!: MIDIMessageEvent[];

    @MidiModule.Action('getDevices')
    private getDevices!: () => Promise<void>;

    @MidiModule.Action('toggleInputDeviceUsage')
    private toggleInputDeviceUsage!: (params: ToggleInputDeviceUsageParams) => Promise<boolean>;

    @MidiModule.Action('toggleOutputDeviceUsage')
    private toggleOutputDeviceUsage!: (params: ToggleOutputDeviceUsageParams) => Promise<boolean>;
    

    private parseMidiMessage(data: Uint8Array) {
      const status = data[0];
      const command = status >>> 4;
      const channel = status & 0xF;
      let commandName = '';
      switch(command) {
        case 0x9: commandName = 'noteon'; break;
        case 0x8: commandName = 'noteoff'; break;
      }

      if (commandName == 'noteon' || commandName == 'noteoff') {
        const note = data[1];
        const velocity = data[2];
        return `${commandName} ch:${channel} note:${note} velocity:${velocity}`;
      }
      return 'unknown';
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>

<template lang="pug">
  .q-pa-md
    .row
      .col
        q-btn(color="primary" label="Load Devices" icon="cached" @click="getDevices")
    .row
      .col
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MIDIInput, MIDIOutput, MIDIMessageEvent } from 'webmidi';
import { MidiDeviceWithConditionInterface, ToggleInputDeviceUsageParams, ToggleOutputDeviceUsageParams} from '../store/midi/types';

const MidiModule = namespace('midi');

@Component
export default class MidiDeviceList extends Vue {
    private deviceTab = 'inputs';

    @MidiModule.State('inputs')
    private inputs!: MidiDeviceWithConditionInterface[];

    @MidiModule.State('outputs')
    private outputs!: MidiDeviceWithConditionInterface[];

    @MidiModule.Action('getDevices')
    private getDevices!: () => Promise<void>;

    @MidiModule.Action('toggleInputDeviceUsage')
    private toggleInputDeviceUsage!: (params: ToggleInputDeviceUsageParams) => Promise<boolean>;

    @MidiModule.Action('toggleOutputDeviceUsage')
    private toggleOutputDeviceUsage!: (params: ToggleOutputDeviceUsageParams) => Promise<boolean>;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>

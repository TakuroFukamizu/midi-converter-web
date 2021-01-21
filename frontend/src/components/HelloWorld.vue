<template lang="pug">
  q-page.flex.flex-center
    div
      q-btn(color="primary" label="Load Devices" icon="cached" @click="listDevices")
    q-separator
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
    q-card
      q-list(separator)
        q-item(v-for="msg in messages" :key="msg.timeStamp") {{msg.srcElement.name}} > {{msg.data}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MIDIInput, MIDIOutput, MIDIMessageEvent } from 'webmidi';

interface MidiDeviceWithConditionInterface {
  kind: 'input' | 'output';
  device: MIDIInput | MIDIOutput;
  use: boolean;
}


@Component
export default class HelloWorld extends Vue {
  private deviceTab = 'inputs';

  private inputs: MidiDeviceWithConditionInterface[] = [];
  private outputs: MidiDeviceWithConditionInterface[] = [];
  private messages: MIDIMessageEvent[] = [];

  private async listDevices() {
    this.inputs = [];
    this.outputs = [];

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
    // for (const o of inputIterator) {
      console.log(o.value);
      o.value.onmidimessage = this.onMidiMessageEvent;
      this.inputs.push({
        kind: 'input',
        device: o.value,
        use: false
      } as MidiDeviceWithConditionInterface);
    }

    // MIDI Outputデバイスの配列を作成
    const outputIterator = access.outputs.values();
    for (let o = outputIterator.next(); !o.done; o = outputIterator.next()) {
    // for (const o of outputIterator) {
      console.log(o.value);
      this.outputs.push({
        kind: 'output',
        device: o.value,
        use: false
      } as MidiDeviceWithConditionInterface);
    }
  }

  private onMidiMessageEvent(event: MIDIMessageEvent) {
    // MIDIメッセージを表示
    console.log(event)
    const fromDeviceId = event.srcElement.id;
    for (const { device, use } of this.inputs) {
      if (device.id != fromDeviceId) continue;
      if (!use) return; // 使用しない
    }

    this.messages.unshift(event)
    for (const { device, use } of this.outputs) {
      if (!use) continue;
      device.send(event.data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>

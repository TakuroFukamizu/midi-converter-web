<template lang="pug">
    q-card
        q-list(bordered separator)
            q-item(v-for="msg in messages" :key="msg.id")
                q-item-section
                    q-item-label {{parseMidiMessage(msg.data)}} ({{msg.data}})
                    q-item-label(caption) {{msg.timestamp}} {{msg.from}} 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MidiMessageData} from '../store/midi/types';

const MidiModule = namespace('midi');

@Component
export default class HelloWorld extends Vue {

    @MidiModule.State('messages')
    private messages!: MidiMessageData[];

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

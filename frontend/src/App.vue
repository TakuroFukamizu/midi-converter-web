<template lang="pug">
    q-layout(view="lHh Lpr lFf")
      q-header.glossy(elevated="")
        q-toolbar
            q-btn(flat="" dense="" round="" @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu")
            q-toolbar-title
                | MIDI Conv
            q-space
            div
                q-icon(v-if="isDataChConnected" name="link")
                q-icon(v-else name="link_off")
      q-drawer(v-model="leftDrawerOpen" show-if-above="" bordered="" content-class="bg-grey-2")
        q-list
          q-item(to="/")
            q-item-section(avatar="")
              q-icon(name="home")
            q-item-section
              q-item-label Home
              q-item-label(caption="") ホーム画面
          q-item(to="/connect")
            q-item-section(avatar="")
              q-icon(name="settings_ethernet")
            q-item-section
              q-item-label Connect
              q-item-label(caption="") 他のユーザと接続します
          //- q-item-label(header="") Essential Links
          //- q-item(clickable="" tag="a" target="_blank" href="https://quasar.dev")
          //-   q-item-section(avatar="")
          //-     q-icon(name="school")
          //-   q-item-section
          //-     q-item-label Docs
          //-     q-item-label(caption="") quasar.dev
          //- q-item(clickable="" tag="a" target="_blank" href="https://github.com/quasarframework/")
          //-   q-item-section(avatar="")
          //-     q-icon(name="code")
          //-   q-item-section
          //-     q-item-label Github
          //-     q-item-label(caption="") github.com/quasarframework
      q-page-container
        router-view 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import EventEmitter from 'events';
import { MIDIMessageEvent } from 'webmidi';
import { MidiMessageData } from './store/midi/types';
import { WebRtcMidiMessage } from './store/webrtc/types';

const MidiModule = namespace('midi');
const WebRtcModule = namespace('webRtc');

@Component
export default class App extends Vue {
    private name = 'LayoutDefault';
    private leftDrawerOpen = false;

    @WebRtcModule.State('eventhub')
    private webRtcEventhub!: EventEmitter;

    @WebRtcModule.Getter('isDataChConnected')
    private isDataChConnected!: boolean;

    @WebRtcModule.Getter('theirId')
    private theirId!: string;

    @WebRtcModule.Action('sendMidiData')
    private sendMidiDataToRemote!: (message: WebRtcMidiMessage) => void;

    @MidiModule.State('eventhub')
    private midiEventhub!: EventEmitter;

    @MidiModule.Action('onRawInputEvent')
    private onRawInputEvent!: (message: MIDIMessageEvent) => void;

    @MidiModule.Action('addMidiData')
    private addMidiData!: (data: MidiMessageData) => void;

    private receivedIds: string[] = [];

    mounted() {
        this.midiEventhub.on('rawMessageInput', this.onRawInputEvent); // FIXME: vuex moduleの中で完結したい
        this.midiEventhub.on('message', (payload) => { // event: MidiMessageData
            console.log('message', payload);
            const message = { 
                id: (payload as MidiMessageData).id,
                timestamp: (payload as MidiMessageData).timestamp,
                data: (payload as MidiMessageData).data,
            } as WebRtcMidiMessage;
            this.sendMidiDataToRemote(message); // remoteの接続先に送る
        });
        // WebRTCで接続した相手からきたメッセージ
        this.webRtcEventhub.on('midiDataReceived', (payload) => { // event: WebRtcMidiMessage
            // console.log('midiDataReceived', payload);
            const id = (payload as WebRtcMidiMessage).id;

            if(this.receivedIds.indexOf(id) != -1) return; // 同じデータが複数来た場合の対策
            this.receivedIds.push(id);

            const data = new Uint8Array(payload.data as ArrayBuffer)
            const timestamp = (payload as WebRtcMidiMessage).timestamp;

            const from = `Remote: ${this.theirId}`;
            const isRemote = true;

            this.addMidiData({ id, from, isRemote, timestamp, data});
        });
    }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>

<template lang="pug">
  .q-pa-md
    .row
      .col
        q-card
          q-card-section
            p.text-h6 Connection
          q-card-section
            div(v-if="!isConnected")
              q-btn(color="primary" icon="link" @click="createPeer") Get PeerID
            div(v-else)
              q-input(label="Your Peer ID" v-model="peerId" readonly)
                template(v-slot:append)
                  q-btn(icon="content_copy" @click="witeToClipboard")
    q-separator
    .row
      .col(v-if="!isDataChConnected")
        q-card
          q-card-section
            p.text-h6 Make call
          q-card-section
            q-input(outlined v-model="requestTheirId" label="Their Id")
            q-btn(color="secondary" icon="link" @click="makeCall(requestTheirId)" disable="!isConnected") Call
      .col(v-else)
        q-card
          q-card-section
            p.text-h6 Current Connection
          q-card-section
            p Their ID: {{theirId}}
            q-btn(color="red" icon="link_off" @click="closeCall") Disconnect
        

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const WebRtcModule = namespace('webRtc');

@Component
export default class RemoteConnect extends Vue {
    @WebRtcModule.Action('createPeer')
    private createPeer!: () => Promise<boolean>;

    @WebRtcModule.Action('makeCall')
    private makeCall!: (theirId: string) => Promise<boolean>;
    // FIXME: try-catchを追加

    @WebRtcModule.Action('closeCall')
    private closeCall!: () => void;

    @WebRtcModule.Getter('isConnected')
    private isConnected!: boolean;

    @WebRtcModule.Getter('isDataChConnected')
    private isDataChConnected!: boolean;

    @WebRtcModule.Getter('theirId')
    private theirId!: string;
    
    @WebRtcModule.State('peerId')
    private peerId!: string;

    private requestTheirId = '';

    // mounted() {
    //     this.createPeer();
    // }
    async witeToClipboard() {
        await navigator.clipboard.writeText(this.peerId);
    }
}
</script>

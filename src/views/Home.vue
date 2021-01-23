<template lang="pug">
  .home
    //- q-page.flex.flex-center
    midi-device-list
    midi-messages
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MidiDeviceList from '../components/MidiDeviceList.vue';
import MidiMessages from '../components/MidiMessages.vue';

@Component({
  components: {
    MidiDeviceList,
    MidiMessages,
  },
})
export default class Home extends Vue {}
</script>

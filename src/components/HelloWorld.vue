<template>
  <div class="hello">
    <div>
      <!-- <q-btn icon="create" color="secondary" @click="listDevices">List devices</q-btn> -->
      <button @click="listDevices">List devices</button>
    </div>
    <div>
      <h3>Inputs</h3>
      <ul>
        <li v-for="input in inputs" :key="input.id">{{input.manufacturer}} {{input.name}}</li>
      </ul>
    </div>
    <div>
      <h3>Outputs</h3>
      <ul>
        <li v-for="output in outputs" :key="output.id">{{output.manufacturer}} {{output.name}}</li>
      </ul>
    </div>
    <div>
      <h3>MIDI Messages</h3>
      <div>
        <ul>
          <li v-for="msg in messages" :key="msg.timeStamp">{{msg.srcElement.name}} > {{msg.data}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      inputs: [],
      outputs: [],
      messages: []
    }
  },
  methods: {
    listDevices: async function () {
      console.log(this.outputs)
      this.inputs = []
      this.outputs = []

      // const access = await navigator.requestMIDIAccess({ sysex: false })
      const access = await navigator.requestMIDIAccess()

      access.onstatechange = (e) => {
        // Print information about the (dis)connected MIDI controller
        console.info(e.port.name, e.port.manufacturer, e.port.state)
        // TODO: 変更を動的に変更
      }

      // MIDI Inputデバイスの配列を作成
      const inputIterator = access.inputs.values()
      for (let o = inputIterator.next(); !o.done; o = inputIterator.next()) {
      // for (const o of inputIterator) {
        console.log(o.value)
        o.value.onmidimessage = this.onMidiMessageEvent
        this.inputs.push(o.value)
      }

      // MIDI Outputデバイスの配列を作成
      const outputIterator = access.outputs.values()
      for (let o = outputIterator.next(); !o.done; o = outputIterator.next()) {
      // for (const o of outputIterator) {
        console.log(o.value)
        this.outputs.push(o.value)
      }
    },
    onMidiMessageEvent: function (event) {
      // MIDIメッセージを表示
      console.log(event)
      this.messages.unshift(event)
      for (const output of this.outputs) {
        output.send(event.data)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

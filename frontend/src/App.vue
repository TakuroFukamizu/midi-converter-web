<template lang="pug">
    q-layout(view="lHh Lpr lFf")
      q-header.glossy(elevated="")
        q-toolbar
          q-btn(flat="" dense="" round="" @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu")
            q-toolbar-title
              | MIDI Conv
            //- div Quasar v{{ $q.version }}
      q-drawer(v-model="leftDrawerOpen" show-if-above="" bordered="" content-class="bg-grey-2")
        q-list
          q-item-label(header="") Essential Links
          q-item(clickable="" tag="a" target="_blank" href="https://quasar.dev")
            q-item-section(avatar="")
              q-icon(name="school")
            q-item-section
              q-item-label Docs
              q-item-label(caption="") quasar.dev
          q-item(clickable="" tag="a" target="_blank" href="https://github.com/quasarframework/")
            q-item-section(avatar="")
              q-icon(name="code")
            q-item-section
              q-item-label Github
              q-item-label(caption="") github.com/quasarframework
      q-page-container
        hello-world
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue'

@Component({
  components: { HelloWorld }
})
export default class App extends Vue {
  private name = 'LayoutDefault';
  private leftDrawerOpen = false;
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

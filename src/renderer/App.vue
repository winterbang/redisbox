<template>
  <div id="app">
    <div id="titlebar">
      <top-header />
    </div>
    <alluring /> 
    <!-- <transition  mode="out-in" name="fade">
      <router-view :key="$route.fullPath"></router-view>
    </transition> -->
  </div>
</template>

<script>
  import Store from 'electron-store'
  // import { ipcRenderer, remote } from 'electron'
  // import { remote } from 'electron'
  import Alluring from '@/layouts/Alluring'
  import TopHeader from '@/components/header/index.vue'

  const eledb = new Store({name: 'vuex'})
  export default {
    name: 'redisbox',
    components: { TopHeader, Alluring },
    created () {
      window.addEventListener('unload', evt => {
        console.log('I do not want to be closed')
        // if (closeWindow) return
        console.log(eledb.get('state'))
        // evt.returnValue = 'false'
        // setTimeout(() => {
        //   let result = dialog.showMessageBox({
        //     message: 'Quit app?',
        //     buttons: ['Yes', 'No']
        //   })
        //   if (result == 0) {
        //     closeWindow = true
        //     remote.getCurrentWindow().close()
        //   }
        // })
      })
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  #app {
    /* display: none */
    /* margin-top: 20px; */
  }
  #titlebar {
    width: 100%;
    min-width: 1000px;
    height: 80px;
    overflow: hidden;
    -webkit-app-region: drag;
    .ivu-card-body {
        padding: 0;
    }
  }
</style>

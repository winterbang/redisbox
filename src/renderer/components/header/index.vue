<template src="./template_1.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
<script>
import { mapState, mapActions } from 'vuex'
import { remote, ipcRenderer } from 'electron'
import fs from 'fs'
import NewConnection from '../NewConnectionPage/Index'
import tools from './tools.json'
const { dialog, BrowserWindow } = remote

export default {
  name: 'top-header',
  components: { NewConnection },
  data () {
    return {
      tools,
      visibel: false
    }
  },
  computed: {
    ...mapState(['curConnectionName', 'connections'])
    // disabled () {
    //   return this.label === 'conn info' && this.curConnectionName
    // }
  },
  methods: {
    ...mapActions(['increment']),
    onTool (label) {
      console.log(label)
      switch (label) {
        case 'new conns':
          this.visibel = true
          break
        case 'import':
          this.showFileDialog()
          break
        case 'export':
          this.onExport()
          break
        case 'console':
          this.newWindow()
          break
        case 'donate':
          this.$Modal.info({
            title: '捐赠',
            content: label
          })
          break
        case 'share':
          this.$Modal.info({
            title: '分享',
            content: '分享连接已经复制到粘贴板'
          })
          break
      }
    },
    showFileDialog () {
      dialog.showOpenDialog({ filters: [{ name: 'Json', extensions: ['json'] }], properties: ['openFile'], message: '选择要引用的文件' }, (filename) => {
        if (filename && filename.length === 1) {
          this.dictorySelected = filename[0]
          this.listingFile(this.dictorySelected)
        }
      })
    },
    onExport () {
      let content = JSON.stringify(this.connections, undefined, 2)
      dialog.showSaveDialog((fileName) => {
        if (fileName === undefined) {
          console.log("You didn't save the file")
          return
        }
        // fileName is a string that contains the path and filename created in the save file dialog.
        fs.writeFile(`${fileName}.json`, content, (err) => {
          if (err) return alert('An error ocurred creating the file ' + err.message)
          alert('The file has been succesfully saved')
        })
      })
    },
    newWindow () {
      console.log(remote.getCurrentWindow())
      let win = new BrowserWindow({width: 800, height: 600, parent: remote.getCurrentWindow()})
      win.loadURL('https://github.com')
      win.on('closed', () => {
        win = null
      })
      ipcRenderer.sendSync('openConsole', 'ping')
      // window.open('./console', '_blank', 'nodeIntegration=no')
    }
  },
  watch: {
    $route (to, from) {
      console.log('toolbars header')
      this.dbIndex = to.params.id
      console.log(to.params.id)
      let tool = this.tools.filter(tool => tool.label === 'conn info')[0]
      if (to.params.id) {
        if (tool) this.$set(tool, 'disabled', true)
      } else {
        this.$set(tool, 'disabled', false)
      }
      console.log('query=========')
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next(vm => {
      console.log(vm.dbIndex)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    next()
  },
  created () {
    console.log('created toolbars header')
  }
}
</script>

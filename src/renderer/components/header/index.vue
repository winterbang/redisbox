<template src="./template_1.html"></template>
<style src="./style.scss" lang="scss" scoped></style>
<script>
import { mapState, mapActions } from 'vuex'
import { remote } from 'electron'
import NewConnection from '../NewConnectionPage/Index'
import tools from './tools.json'
const { dialog } = remote

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
    ...mapState(['curConnectionName']),
    disabled (label) {
      return label === 'conn info' && this.curConnectionName
    }
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
      dialog.showOpenDialog({ properties: ['openFile'], message: '选择要引用的文件' }, (filename) => {
        if (filename && filename.length === 1) {
          this.dictorySelected = filename[0]
          this.listingFile(this.dictorySelected)
        }
      })
    },
    newWindow () {
      const { BrowserWindow } = remote
      let win = new BrowserWindow({width: 800, height: 600})
      win.on('closed', () => {
        win = null
      })
      // ipcRenderer.sendSync('openConsole', 'ping')
      // window.open('./console', '_blank', 'nodeIntegration=no')
    }
  }
}
</script>

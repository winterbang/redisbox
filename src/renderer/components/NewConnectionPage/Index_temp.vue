<template>
  <div class="rb-dialog" :style="{top: visibel ? 0: '-500px'}">
    <div style="height:100%;position:relative">
      <header class="toolbar toolbar-header">
        <div class="toolbar-actions" style="text-align: center;">
          <div class="btn-group">
            <button v-for="tab in tabs" :class="['btn', 'btn-default', currTab === tab ? 'btn-primary' : '']" @click="tabTo(tab)">
              {{ tab }}
            </button>
          </div>
        </div>
      </header>

      <div class="window-content" style="position:relative; top:-20px;height:450px;padding-top:28px;justify-content: center;background: #e8e6e8;border:20px solid #f5f5f4;">
        <connection v-show="currTab === 'Connection'" ref="connection" ></connection>
        <ssl v-show="currTab === 'SSL'"></ssl>
      </div>

      <footer class="toolbar toolbar-footer" style="position:absolute;bottom:0;left:0;right:0">
        <div class="toolbar-actions">
          <button class="btn btn-default" @click="onTestConnection">
            Test Connection
          </button>
          <button class="btn btn-default pull-right" @click="onCancel">
            Cancel
          </button>
          <button class="btn btn-primary pull-right" @click="onOk">
            ok
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import redis from 'redis'
import { mapActions } from 'vuex'
import { remote } from 'electron'
import connection from './Connection'
import ssl from './Ssl'
const { dialog } = remote
export default {
  name: 'new-connection',
  props: ['visibel'],
  components: { connection, ssl },
  data () {
    return {
      currTab: 'Connection',
      tabs: ['Connection', 'SSL', 'SSH Tunnel', 'Advanced Settings']
    }
  },
  methods: {
    ...mapActions(['addNewConnection']),
    tabTo (tabName) {
      this.currTab = tabName
    },
    onCancel () {
      this.$emit('update:visibel', false)
    },
    onTestConnection () {
      let connection = this.$refs.connection.formData
      console.log(connection)
      var client = redis.createClient(connection)
      client.on('error', function (err) {
        dialog.showMessageBox({type: 'error', message: err.message})
        client.quit()
      })
      client.on('connect', function () {
        // let child = new BrowserWindow({parent: getCurrentWindow().id, modal: true, show: false})
        // child.loadURL('https://github.com')
        // child.once('ready-to-show', () => {
        //   child.show()
        // })
        dialog.showMessageBox({message: 'Connect successfully!'})
      })
    },
    onOk () {
      let formData = this.$refs.connection.formData
      this.addNewConnection(formData)
      this.onCancel()
      // this.$db.insert(formData, function (err, newDoc) {
      //   console.log(err)
      //   console.log(newDoc)
      //   dialog.showMessageBox({type: 'info', message: 'save successfully!'})
      // })
    }
  }
}
</script>

<style lang="css" scoped>
  .toolbar-header {
    position: relative;
    top: 18px;
    z-index: 10;
    border: none;
    background: none;

  }
</style>

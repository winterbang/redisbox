<template>
  <div class="rb-dialog" :style="{top: visibel ? 0: '-500px'}">
    <div style="height:100%;position:relative;padding-top: 30px">
      <Tabs :animated="false" type="card">
        <TabPane :label="tab" v-for="tab in tabs" :disabled="tab === 'SSH Tunnel'">
          <connection v-if="tab === 'Connection'" ref="connection" :initForm="connForm"></connection>
          <ssl v-show="tab === 'SSH Tunnel'"></ssl>
        </TabPane>
      </Tabs>

      <!-- <div class="window-content" style="position:relative; top:-20px;height:450px;padding-top:28px;justify-content: center;background: #e8e6e8;border:20px solid #f5f5f4;">
        <connection v-show="currTab === 'Connection'" ref="connection" ></connection>
        <ssl v-show="currTab === 'SSL'"></ssl>
      </div> -->

      <footer>
        <Button size="small" @click="onTestConnection">Test Connection</Button>
        <div>
          <Button type="info" size="small" @click="onOk">Save</Button>
          <Button type="text" size="small" @click="onCancel" >Cancel</Button>
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
  props: ['visibel', 'initForm'],
  components: { connection, ssl },
  data () {
    return {
      currTab: 'Connection',
      tabs: ['Connection', 'SSH Tunnel'], // ['Connection', 'SSL', 'SSH Tunnel', 'Advanced Settings']
      connForm: {}
    }
  },
  watch: {
    initForm (value, old) {
      let {name, color, port, auth, host, _id} = value
      this.connForm = Object.assign({}, this.connForm, {name, color, port, auth, host, _id})
    }
  },
  methods: {
    ...mapActions(['addNewConnection', 'updateConnection']),
    tabTo (tabName) {
      this.currTab = tabName
    },
    onCancel () {
      this.$refs.connection[0].$refs['formRef'].resetFields()
      this.$emit('update:visibel', false)
    },
    onTestConnection () {
      let connection = this.$refs.connection[0].formData
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
      client.quit()
    },
    onOk () {
      let formData = this.$refs.connection[0].formData
      if (formData._id) {
        // 因为formData是个对象，所以必须复制改对象后传参数，不然vuex中的state会一直跟着变化
        let payload = Object.assign({}, formData)
        this.updateConnection(payload)
        this.$Message.success('update successfully!')
      } else {
        this.addNewConnection(formData)
        this.$Message.success('save successfully!')
      }
      this.onCancel()
      //

      // this.$db.insert(formData, function (err, newDoc) {
      //   console.log(err)
      //   console.log(newDoc)
      //   dialog.showMessageBox({type: 'info', message: 'save successfully!'})
      // })
    }
  }
}
</script>

<style lang="css">
  .ivu-tabs-nav {
    text-align: center;
    float: none;
  }
  footer {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background:#fff;
    padding: 5px 10px;
    box-shadow: 1px -2px 4px #ddd
  }
</style>

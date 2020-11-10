<template>
  <div style="height: 100%;">
    <template v-if="connections.length == 0">
      <div style="position: fixed;top: 52px;left: 51px">
        <a-tooltip class="ant-tooltip-open" title="服务器面板是空的，快新建一个吧！" placement="bottomLeft" :defaultVisible="true"></a-tooltip>
      </div>
    </template>
    <a-row v-else :gutter="16" style="background:#eee;border-radius: 8px;margin:0">
      <transition-group name="list-complete" tag="div">
        <a-col span="6" v-for="(connection, idx) in connections" :key="connection._id" class="list-complete-item">
          <a-card :bordered="false" @click.native="onConnection(idx)" :style="{background: connection.color}">
            <a-icon type="delete" size="16" @click.stop="onDeleteConnection(connection)" style="position: absolute; top: 5px;left: 5px"></a-icon>
            <p slot="title" contenteditable="true">
              {{ connection.name || '未命名' }}
            </p>
            <div slot="extra" @click.stop="onSetting(idx)" >
              <a-icon type="edit" size="20"> </a-icon>
            </div>
            <p>Host: {{connection.host}}</p>
            <p>Port: {{connection.port}}</p>
          </a-card>
        </a-col>
      </transition-group>
       <!-- <Col span="6">
         <Card :bordered="false" style="display:flex;justify-content: center;align-items: center;text-align:center;height: 125px;">
           <Icon type="ios-add-circle-outline" size="46" @click.native="visibel = true" title="Add a new connection"/>
           <Divider type="vertical" />
           <Icon type="ios-browsers-outline" size="46" @click.native="showFileDialog" title="Import a new connection"/>

           <Poptip placement="right" width="258px" trigger="hover" style="position: absolute;right: 0;bottom: 0">
             <Icon type="ios-information-circle" size="20"/>
             <div class="api" slot="content" style="text-align:left;">
               Json 格式为： <pre >{{json}}</pre>
             </div>
           </Poptip>
         </Card>
       </Col> -->

      <a-modal v-model="settingFormVisible" width="660" footer-hide :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
          <a-icon type="ios-cloud-circle-outline" size="22"/>
          <!-- <span>{{ connections[connectionIndex].name}}</span> -->
        </p>
        <div style="display:flex;justify-content: space-around;align-items: center">
        </div>
      </a-modal>
      <!-- <Modal v-model="deleteConfirmModel" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>Delete confirmation</span>
        </p>
        <div style="text-align:center">
            <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
            <p>Will you delete it?</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
        </div>
      </Modal> -->
    </a-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { remote } from 'electron'
const { dialog } = remote
export default {
  name: 'Conns',
  computed: mapState(['connections']),
  data () {
    return {
      json: JSON.stringify([ { name: 'test', host: 'localhost', port: '2000', auth: '' } ], undefined, 2),
      settingFormVisible: false,
      deleteConfirmModel: false,
      connectionIndex: -1
    }
  },
  methods: {
    ...mapActions(['setCurConnectionName', 'deleteConnection']),
    onDeleteConnection (connection) {
      this.deleteConnection(connection._id)
    },
    onConnection (index) {
      let connection = this.connections[index]
      let client = this.redisClient(connection)
      // client.on('error', function (err) {
      //   console.log('connetion error', '=======================')
      //   dialog.showMessageBox({type: 'error', message: err.message})
      //   client.quit()
      // })
      // // let self = this
      client.on('connect', (result) => {
        console.log(result, 'result====================')
        this.setCurConnectionName(connection.name)
        this.$set(this.connections, index, connection)
        // console.log('dblist')
        this.$router.push({name: 'DbList', params: { id: connection._id }})
      })

      // navigate if client is already connected
      if (client.ready) {
        this.setCurConnectionName(connection.name)
        console.log('connected')
        this.$router.push({name: 'DbList', params: { id: connection._id }})
      }
    },
    onSetting (index) {
      this.connectionIndex = index
      // this.settingFormVisible = true
      this.$bus.$emit('openNewConnectionForm', { index })
    }
  },
  created () {
    this.setCurConnectionName('')
  }
}
</script>

<style lang="css" scoped>
.list-complete-item {
  padding: 8px;
  transition: all 1s;
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;

}
</style>

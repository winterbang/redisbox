<template>
  <div style="height: 100%;overflow-y: scroll;padding: 0 20px">
    <Row :gutter="16" style="background:#eee;border-radius: 8px;">
       <Col span="6" v-for="connection, idx in connections" :key="connection._id">
         <Card :bordered="false" @click.native="onConnection(idx)" :style="{background: connection.color}">
           <Icon type="ios-close" size="16" @click.stop="onDeleteConnection(connection)" style="position: absolute; top: 0;left: 0"/>
           <p slot="title">
             {{ connection.name }}
           </p>
           <div slot="extra" @click.stop="onSetting(idx)" >
             <Icon type="ios-construct-outline" size="20"/>
             <!-- <Icon type="ios-open-outline" /> -->
           </div>
           <p>Host: {{connection.host}}</p>
           <p>Port: {{connection.port}}</p>
         </Card>
       </Col>

       <Col span="6">
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
       </Col>

       <Modal v-model="settingFormVisible" width="660" footer-hide :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-cloud-circle-outline" size="22"/>
          <!-- <span>{{ connections[connectionIndex].name}}</span> -->
        </p>
        <div style="display:flex;justify-content: space-around;align-items: center">

        </div>
      </Modal>
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
    </Row>
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

      // this.deleteConnection(connection._id)
    },
    onConnection (index) {
      let connection = this.connections[index]
      let client = this.redisClient(connection)
      client.on('error', function (err) {
        dialog.showMessageBox({type: 'error', message: err.message})
        client.quit()
      })
      // let self = this
      client.on('connect', () => {
        this.setCurConnectionName(connection.name)
        // this.$set(this.connections, index, connection)
        console.log('dblist')
        this.$router.push({name: 'DbList', params: { id: connection._id }})
      })
    },
    onSetting (index) {
      this.connectionIndex = index
      this.settingFormVisible = true
    }
  },
  created () {
    this.setCurConnectionName('')
  }
}
</script>

<style lang="css" scoped>
</style>

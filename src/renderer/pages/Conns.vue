<template>
  <div style="height: 100%;overflow-y: scroll;padding: 0 20px">
    <Row :gutter="16" style="background:#eee;border-radius: 8px;">
       <Col span="6" v-for="connection, idx in connections" :key="connection._id">
         <!-- <router-link :to="{name: 'DbList', params: {id: idx}}"> -->
           <Card :bordered="false" @click.native="onConnection(idx)" >
               <Icon type="ios-close" size="16" @click.stop="onDeleteConnection(connection)" style="position: absolute; top: 0;left: 0"/>
               <p slot="title">
                 {{ connection.name }}
               </p>
               <div slot="extra" >
                 <Icon type="ios-construct-outline"/>
                 <!-- <Icon type="ios-open-outline" /> -->
               </div>
               <p>Host: {{connection.host}}</p>
               <p>Port: {{connection.port}}</p>
           </Card>
         <!-- </router-link> -->
       </Col>
       <Col span="6">
         <Card :bordered="false" style="display:flex;justify-content: center;align-items: center;text-align:center;height: 125px;">
           <!-- <div style="display:flex;justify-content: center;align-items: center;text-align:center"> -->
             <Icon type="ios-add-circle-outline" size="46" @click.native="visibel = true" title="Add a new connection"/>
             <Divider type="vertical" />
             <Icon type="ios-browsers-outline" size="46" @click.native="showFileDialog" title="Import a new connection"/>

             <Poptip placement="right" width="258px" trigger="hover" style="position: absolute;right: 0;bottom: 0">
               <Icon type="ios-information-circle" size="20"/>
               <div class="api" slot="content" style="text-align:left;">
                 Json 格式为： <pre >{{json}}</pre>
               </div>
           </Poptip>
           <!-- </div> -->
         </Card>
       </Col>
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
      json: JSON.stringify([ { name: 'test', host: 'localhost', port: '2000', auth: '' } ], undefined, 2)
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
    }
  },
  created () {
    this.setCurConnectionName('')
  }
}
</script>

<style lang="css" scoped>
</style>

<template>
  <div class="window">
    <!-- <header class="toolbar toolbar-header">
      <top-header></top-header>
    </header> -->
    <div class="window-content">
      <div class="pane-group">
        <!-- <div class="pane-sm sidebar" style="overflow-y: scroll; padding-bottom: 15px;">
          <nav class="nav-group" v-for="(connection, index) in connections" :style="{height: connection.isCollapse ? '' : '34px'}">
            <h5 class="nav-group-title active" @click.left="onConnection(index)" @click.right="onRClick(connection)">
              <span class="icon icon-cloud"></span>
              {{ connection.name }}
            </h5>
            <nav class="nav-group" v-for="db in 16">
              <a class="nav-group-item nav-group-title" @click="onDb(connection, db-1)">
                <span class="icon icon-database"></span>
                db{{db-1}}
              </a>
              <template v-if="connection.dbs && connection.dbs[db-1] && connection.dbs[db-1].isCollapse">
                <a class="nav-group-item"  v-for="key in connection.dbs[db-1].keys" @click.left="onKey(connection, db-1, key)">
                  <span class="icon icon-doc-text-inv"></span>
                  {{key}}
                </a>
              </template>
            </nav>
          </nav>
        </div> -->

        <div class="panel">
          <!-- <transition  mode="in-out" name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeIn"> -->
          <breadcrumb v-show="breadcrumbVisible"/>
          <div style="margin-top: 10px;">
            <transition  mode="out-in" name="fade">
              <router-view :key="$route.fullPath"></router-view>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import redis from 'redis'
import { remote } from 'electron'
import { mapState, mapActions } from 'vuex'
import NewConnection from '@/components/NewConnectionPage/Index'
import TopHeader from '@/components/TopHeader'
import Breadcrumb from '@/components/Breadcrumb'

const { Menu, MenuItem, dialog } = remote

export default {
  name: 'yummy',
  components: { NewConnection, TopHeader, Breadcrumb },
  data () {
    return {
      // connections: [],
      breadcrumbVisible: true,
      transitionName: 'fadeIn'
    }
  },
  computed: mapState(['connections']),
  methods: {
    ...mapActions(['setCurConnectionName']),
    // getConnections () {
    //   // this.$db.find({}, (err, docs) => {
    //   //   console.log(err)
    //   //   console.log(docs)
    //   //   this.connections = docs
    //   // })
    //   console.log(this.connections)
    // },
    onConnection (index) {
      let connection = this.connections[index]
      let client = redis.createClient(connection)
      client.on('error', function (err) {
        dialog.showMessageBox({type: 'error', message: err.message})
        client.quit()
      })
      // let self = this
      client.on('connect', () => {
        connection.isCollapse = !connection.isCollapse
        console.log(connection.name)
        this.setCurConnectionName(connection.name)
        // this.$set(this.connections, index, connection)
        this.$router.push({name: 'DbList', params: { id: connection._id }})
      })
    },
    onDb (connection, dbN) {
      let client = redis.createClient(connection)
      let index = this.connections.indexOf(connection)
      if (connection.dbs && connection.dbs[dbN]) {
        connection.dbs[dbN].isCollapse = !connection.dbs[dbN].isCollapse
        return this.$set(this.connections, index, connection)
      }
      client.select(dbN, () => {
        console.log(dbN)
        client.keys('*', (err, keys) => {
          if (err) return console.log(err)
          if (!connection.dbs) connection.dbs = []
          connection.dbs[dbN] = { keys, isCollapse: true }
          this.$set(this.connections, index, connection)
          this.curConnection = connection
          console.log(connection, '=====')
          for (var i = 0, len = keys.length; i < len; i++) {
            console.log(keys[i])
          }
        })
      })
    },
    onKey (connection, dbN, key) {
      console.log(connection)
      this.$router.push({name: 'Key', query: { connection: connection._id, db: dbN, key: key }})
    },
    onRClick (connection) {
      let self = this
      const menu = new Menu()
      menu.append(new MenuItem({label: 'Add new key', click () { console.log('item 1 clicked') }}))
      menu.append(new MenuItem({type: 'separator'}))
      menu.append(new MenuItem({label: 'Edit Connection', click () { self.reload(connection) }}))
      menu.append(new MenuItem({label: 'Reload', click () { self.reload(connection) }}))
      menu.append(new MenuItem({type: 'separator'}))
      menu.append(new MenuItem({label: 'Delete', click () { self.reload(connection) }}))
      menu.popup({window: remote.getCurrentWindow()})
    },
    reload (connection) {
      console.log(connection.name)
      console.log('reload...')
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.id) this.breadcrumbVisible = true
      // const toDepth = to.path.split('/').length
      // const fromDepth = from.path.split('/').length
      // this.transitionName = toDepth < fromDepth ? 'slideInRight' : 'slideInLeft'
    }
  },
  mounted () {
    // this.getConnections()
  }
}
</script>

<style lang="css" scoped>
  .window {
    top: 80px;
  }
  .nav-group {
    overflow: hidden;
    transition: height 1s linear;
  }
  .nav-group-title {
    font-size: 14px;
  }
  .active {
    /* border-left: 5px solid #ccc; */
  }
  .nav-group-title .icon {
    font-size: 18px;
  }
  .nav-group-item {
    font-size: 12px;
  }
  .panel {
    width: 100%;
    padding: 10px;
  }
  .nav-group-item .icon {
    font-size: 16px
  }
</style>

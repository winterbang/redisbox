<template>
  <div @click="focusKey = ''" style="position: relative;">

    <Input v-model="searchText" class="form-control" type="text" placeholder="Search keys" style="width: 220px;margin: 0 0 10px 10px" />

    <Table stripe :columns="columns" :data="filterKeys" size="small" highlight-row style="">
      <template slot-scope="{ row }" slot="name" >
        <strong :key="row.name">{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <router-link :to="{name: 'Detail', params: {key: row.name}}">
          <Icon type="ios-create-outline" size="30"/>
        </router-link>
      </template>
    </Table>
    <div class="toolbar-box">
      <div class="info">
        <strong>{{ dbsize }}</strong> keys in DB{{0}}; <strong>0</strong> key selected
      </div>
      <div class="action">
        <Tooltip content="add" placement="top" @click.native="add">
          <Icon type="md-add" size="22"/>
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="refresh" placement="top" @click.native="refresh">
          <Icon type="md-refresh" size="22" title="refresh"/>
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="download" placement="top-end">
          <Icon type="md-download" size="22" />
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="delete" placement="top-end">
          <Icon type="md-trash" size="22" />
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="clear" placement="top-end">
          <Icon type="md-cube" size="22" />
        </Tooltip>
      </div>
      <!-- <Icon type="ios-refresh-circle-outline" /> -->
    </div>
  </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex'
import redis from 'redis'
import { remote } from 'electron'

const { Menu, MenuItem } = remote
export default {
  data () {
    return {
      keys: [],
      searchText: '',
      focusKey: '',
      columns: [
        {
          title: 'Key',
          key: 'name'
        }, {
          title: 'Type',
          key: 'type'
        }, {
          title: 'Value',
          key: 'value'
        }, {
          title: 'Action',
          slot: 'action',
          width: 80,
          align: 'center'
        }
      ],
      dbsize: 0
    }
  },
  computed: {
    ...mapGetters(['curConnection']),
    ...mapState(['curConnectionName']),
    filterKeys: function () {
      let tmp = this.keys.filter(key => key.toLowerCase().indexOf(this.searchText) > -1)
      return tmp.map(x => {
        return {name: x}
      })
    },
    nestedKeys: function () {
      let newKeys = {}
      return this.keys.forEach((key) => {
        let tmpKeys = key.split(':')
        if (tmpKeys.length === 1) {
          newKeys[tmpKeys[0]] = []
        } else {
          newKeys[tmpKeys] = []
        }
      })
    }
  },
  watch: {
    dbIndex: function (db) {
      this.fetchData()
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.dbIndex = this.$route.params.id
    this.searchText = this.$route.query.text || ''
    this.fetchData()
  },
  methods: {
    fetchData () {
      let client = redis.createClient(this.curConnection)
      console.log(client)
      console.log(client.connection_id)
      // client.list((err, reply) => {
      //   if (err) return console.log(err)
      //   console.log(reply)
      // })
      // client.client((err, reply) => {
      //   if (err) return console.log(err)
      //   console.log(reply)
      // })
      client.select(this.dbIndex, () => {
        client.keys('*', (err, keys) => {
          if (err) return console.log(err)
          this.keys = keys
        })

        client.dbsize((err, reply) => {
          if (err) return console.log(err)
          this.dbsize = reply
        })
      })
    },
    selectRow (key) {
      this.focusKey = key
    },
    onRClick (key) {
      this.focusKey = key
      // let self = this
      const menu = new Menu()
      menu.append(new MenuItem({label: 'Copy', click () { console.log('item 1 clicked') }}))
      menu.append(new MenuItem({label: 'Delete', click () { console.log('item 1 clicked') }}))
      menu.append(new MenuItem({type: 'separator'}))
      menu.popup({window: remote.getCurrentWindow()})
    },
    add () {
      let client = this.redisClient(this.curConnection)
      console.log(client.connection_id)
      // client.select(this.dbIndex, () => {
      //   // client.set('', (err, keys) => {
      //   //   if (err) return console.log(err)
      //   //   this.keys = keys
      //   // })
      //   console.log(client.connection_id)
      // })
    },
    refresh () {
      this.fetchData()
    }
  }
}
</script>

<style lang="css" scoped>
  .active {
    background: #409EFF !important
  }

</style>

<template>
  <div @click="focusKey = ''" style="position: relative;padding-top:10px">

    <a-input v-model="searchText" class="form-control" type="text" placeholder="Search keys" style="width: 220px;margin-bottom: 10px;" />

    <a-table stripe :columns="columns" :data-source="filterKeys" size="small" :row-selection="rowSelection" rowKey="name"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      >
      <template slot-scope="text" slot="name" >
        <strong :key="text">{{ text }}</strong>
      </template>
      <template slot-scope="text, row" slot="action">
        <router-link :to="{name: 'Detail', params: {key: row.name}}">
          <a-icon type="file-text" :style="{ fontSize: '16px', color: '#08c' }" />
        </router-link>
      </template>
    </a-table>

    <div class="toolbar-box">
      <div class="info">
        <strong>{{ dbsize }}</strong> keys in DB{{0}}; <strong>{{selectCount}}</strong> key selected
      </div>

      <div class="action">
        <a-tooltip title="add" placement="top">
          <a-icon type="plus-circle" size="22" @click="modalOfAdd = true"/>
          <a-modal
            v-model="modalOfAdd"
            title="新增"
            @ok="modalOfAddOk"
            @cancel="modalOfAddCancel">
            <a-input v-model="newKey" placeholder="Enter the new key." style="width: 300px;margin-bottom: 10px">
              <span slot="prepend">Key</span>
            </a-input>

            <a-textarea v-model="newValue" type="textarea" :auto-size="{minRows: 2,maxRows: 5}" placeholder="Enter the new value."/>

          </a-modal>
        </a-tooltip>
        <a-divider type="vertical"/>
        <a-tooltip title="reload" placement="top">
          <a-icon type="cloud-sync" size="22" title="reload" @click="onRefresh"/>
        </a-tooltip>
        <a-divider type="vertical"/>
        <a-tooltip title="download" placement="topRight">
          <a-icon type="cloud-download" size="22" />
        </a-tooltip>
        <a-divider type="vertical"/>
        <a-tooltip title="delete" placement="topRight" @click.native="onDelete">
          <a-icon type="delete" size="22" />
        </a-tooltip>
        <!-- <a-divider type="vertical"/>
        <a-tooltip content="clear" placement="topRight">
          <a-icon type="md-cube" size="22" />
        </a-tooltip> -->
      </div>
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
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          this.selection = this.filterKeys.concat()
          // console.log(selected, selectedRows, changeRows);
        },
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          key: ''
        }, {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name'}
        // }, {
        //   title: 'Type',
        //   key: 'type'
        // }, {
        //   title: 'Value',
        //   key: 'value'
        }, {
          title: 'Action',
          key: 'action',
          width: 80,
          align: 'center',
          scopedSlots: { customRender: 'action'}
        }
      ],
      dbsize: 0,
      curPage: 0,
      modalOfAdd: false,
      newKey: '',
      newValue: '',
      selection: []
    }
  },
  computed: {
    ...mapGetters(['curConnection']),
    ...mapState(['curConnectionName']),
    filterKeys: function () {
      console.log(this.keys, '==========================')
      let tmp = this.searchText.length > 0 ? this.keys.filter(key => key.toLowerCase().indexOf(this.searchText) > -1) : this.keys
      console.log(tmp)
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
    },
    selectCount: function () {
      return this.selection.length
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
        // client.scan(0, 'COUNT', '5', (err, reply) => {
        //   if (err) return console.log(err)
        //   console.log(reply)
        //   this.keys = reply[1]
        // })
      })
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
    modalOfAddOk () {
      if (this.newKey) {
        let client = this.redisClient(this.curConnection)
        client.select(this.dbIndex, () => {
          client.set(this.newKey, this.newValue, (err, ok) => {
            if (err) return console.log(err)
            if(ok === 'OK') this.$message.success('新增成功')
            this.fetchData()
          })
        })
      }
    },
    modalOfAddCancel () {
      this.modalOfAdd = false
    },
    onRefresh () {
      this.fetchData()
    },
    onDelete () {
      if (this.selection.length > 0) {
        let keys = this.selection.map(v => {
          return v.name
        })
        let client = this.redisClient({...this.curConnection, db: this.dbIndex})
        //  multi
        // let multi = client.multi()
        // this.selection.forEach((v, i) => {
        //   console.log(v.name)
        //   multi.del(v.name, (err, reply) => {
        //     if (err) {
        //       return console.log(err)
        //     }
        //   })
        // })
        // multi.exec((err, replies) => {
        //   if (err) console.log(err)
        //   console.log(replies) // 102, 3
        //   // client.quit()
        // })

        // batch
        let batch = client.batch()
        batch.del(...keys, (err, reply) => {
          if (err) console.log(err)
        })
        batch.exec((err, reply) => {
          if (err) console.log(err)
        })
      }
      this.fetchData()
    },
    changePage (page) {
      console.log(page)
    },
    onSelectAll () {
      this.selection = this.filterKeys.concat() // 深拷贝
    },
    onSelectAllCancel () {
      this.selection = []
    },
    onSelect (selection, row) {
      this.selection = selection
    },
    onSelectCancel (selection, row) {
      this.selection = selection
    }
  }
}
</script>

<style lang="css" scoped>
  .active {
    background: #409EFF !important
  }

</style>

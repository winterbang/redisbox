<template>
  <div>
    <div style="margin: 10px 0">
      <template v-if="type === 'string'">
        <a-button type="primary" style="margin-bottom: 8px;float:right">Save</a-button>
        <!-- <FormItem label="content" :labelWidth="50"> -->
        <a-textarea v-model="content" :auto-size="{minRows: 3,maxRows: 18}" placeholder="Enter something..." ></a-textarea>
        <!-- </FormItem> -->
        <!-- <textarea name="name" rows="8" cols="80" v-model="reply" style="width: 100%;resize: vertical;"/> -->
      </template>
      <!-- list show -->
      <template v-else-if="type === 'list'">
        <a-table :data-source="reply" :columns="columns" bordered :row-key="(record) => record">
          <!-- <el-table-column type="index" :index="indexMethod" /> -->
            <template slot-scope="text, row" slot="name">
              {{row}}
            </template>
            <template slot="action">
              <a-button type="primary" icon="edit" shape="circle" size="small"></a-button>
              <a-button type="danger" icon="delete" shape="circle" size="small"></a-button>
            </template>
          <!-- </el-table-column> -->
        </a-table>
      </template>
      <template v-else-if="type === 'hash'">
        <a-textarea v-model="content" type="textarea" :auto-size="{minRows: 3,maxRows: 18}" placeholder="Enter something..." ></a-textarea>
      </template>
    </div>
    <div class="toolbar-box">
      <div class="info">
        Key:
        <a-tooltip :title="key" placement="topLeft">
          <content style="max-width:auto">{{key.substr(0, 3)}}...{{key.length > 6 ? key.substring(key.length-3) : ''}}</content>
        </a-tooltip>
        TTL: <a-button type="dashed" size="small">{{ -1 }}</a-button>
        Size: <a-button type="dashed" size="small">{{ size }}</a-button>
        Type: <a-tag color="cyan">{{ type }}</a-tag>
      </div>
      <div class="action">
        <!-- 重命名key -->
        <a-tooltip title="rename" placement="top">
          <a-icon type="create" size="22"/>
        </a-tooltip>
        <a-divider type="vertical"/>
        <!-- 复制value -->
        <a-tooltip title="copy" placement="top" @click.native="onCopy">
          <a-icon type="copy" size="22"/>
        </a-tooltip>
        <a-divider type="vertical"/>
        <!-- 添加 -->
        <a-tooltip title="add" placement="top">
          <a-icon type="plus-circle" size="22"/>
        </a-tooltip>
        <a-divider type="vertical"/>
        <!-- 刷新 -->
        <a-tooltip title="refresh" placement="top">
          <a-icon type="reload" size="22" title="refresh"/>
        </a-tooltip>
        <a-divider type="vertical"/>
        <!-- 下载到文本中 -->
        <a-tooltip title="download" placement="top">
          <a-icon type="download" size="22" />
        </a-tooltip>
        <a-divider type="vertical"/>
        <!-- 删除 -->
        <a-tooltip title="delete" placement="topLeft">
          <a-popconfirm
            title="确定要删除吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="onDelete"
            placement="topRight"
          >
            <a-icon type="delete" />
          </a-popconfirm>
        </a-tooltip>
        <a-divider type="vertical"/>
        <a-dropdown @on-click="onChangeStyle" placement="topRight">
            <!-- Plain Text -->
          <a-icon type="file" size="22"/>
          <strong style="display:inline-block;width:56px;vertical-align: sub;text-align: center;">{{textStyle}}</strong>
          <!-- <Icon type="md-code" size="22" /> -->
          <a-menu slot="overlay">
            <a-menu-item v-for="style in ['Json', 'Plain Text', 'HEX']" :name="style" :selected="style === textStyle" :key="style">
              {{style}}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <!-- <Icon type="ios-refresh-circle-outline" /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { clipboard } from 'electron'
export default {
  data () {
    return {
      key: '',
      db: 0,
      reply: null,
      type: null, // ['list', 'string', 'hash']
      size: 10,
      textStyle: 'Json', // ['Json', 'Plain Text', 'HEX']
      columns: [
        {
          title: 'key',
          dataIndex: 'name',
          key: 'key',
          scopedSlots: { customRender: 'name' }
        }, {
          title: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    indexMethod (index) {
      console.log(index)
      return index
    },
    onChangeStyle (name) {
      console.log(name)
      this.textStyle = name
    },
    onCopy () {
      clipboard.writeText(this.content)
      this.$notification.info({
        message: '已经复制到粘贴板'
      })
    },
    onDelete () {
      let client = this.redisClient(this.curConnection)
      client.select(this.db, () => {
        client.del(this.key, (err, type) => {
          if (err) {
            return console.log(err)
          } else {
            this.$notification.info({
              message: '删除成功'
            })
          }
        })
      })
    }
  },
  computed: {
    ...mapGetters(['curConnection']),
    content () {
      let result = ''
      // switch (this.textStyle) {
      //   case 'Plain Text':
      //     result = JSON.stringify(this.reply)
      //     break
      //   case 'HEX':
      //     result = JSON.stringify(this.reply)
      //     break
      //   default:
      //     result = JSON.stringify(this.reply, undefined, 2)
      // }
      result = this.reply
      console.log(result)
      return result
    }
  },
  created () {
    let client = this.redisClient(this.curConnection)

    this.key = this.$route.params.key
    this.db = this.$route.params.id

    client.select(this.db, () => {
      client.type(this.key, (err, type) => {
        if (err) return console.log(err)
        this.type = type
        switch (type) {
          case 'list':
            client.lrange(this.key, 0, 9, (err, reply) => {
              if (err) return console.log(err)
              console.log(reply, 'reply =====================')
              this.reply = reply
            })
            client.llen(this.key, (err, reply) => {
              if (err) return console.log(err)
              this.size = reply
            })
            break
          case 'string':
            client.get(this.key, (err, reply) => {
              if (err) return console.log(err)
              // this.reply = JSON.parse(reply)
              this.reply = reply
            })
            break
          case 'hash':
            client.hgetall(this.key, (err, reply) => {
              if (err) return console.log(err)
              this.reply = reply
            })
            break
        }
      })
    })
  }
}
</script>

<style >
  .ivu-tooltip-inner {
    max-width: none;
  }
</style>

<template>
  <div >
    <div style="margin: 10px 0">
      <template v-if="type === 'string'">
        <Button type="primary" style="margin-bottom: 8px;float:right">Save</Button>
        <!-- <FormItem label="content" :labelWidth="50"> -->
        <Input v-model="content" type="textarea" :autosize="{minRows: 2,maxRows: 18}" placeholder="Enter something..." ></Input>
        <!-- </FormItem> -->
        <!-- <textarea name="name" rows="8" cols="80" v-model="reply" style="width: 100%;resize: vertical;"/> -->
      </template>
      <template v-else-if="type === 'list'">
        <el-table :data="reply" border>
          <el-table-column type="index" :index="indexMethod" />
          <el-table-column prop="date" label="Value" min-width="200" >
            <template slot-scope="scope">
              <span>{{ scope.row }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Opetion">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="size">
          </el-pagination>
        </div>
      </template>
    </div>
    <div class="toolbar-box">
      <div class="info">
        Key: <Button type="dashed" size="small">{{ key }}</Button>
        TTL: <Button type="dashed" size="small">{{ -1 }}</Button>
        Size: <Button type="dashed" size="small">{{ size }}</Button>
        Type: <Tag color="cyan">{{ type }}</Tag>
      </div>
      <div class="action">
        <Tooltip content="rename" placement="top">
          <Icon type="md-create" size="22"/>
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="copy" placement="top" @click.native="onCopy">
          <Icon type="md-copy" size="22"/>
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="add" placement="top">
          <Icon type="md-add" size="22"/>
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="refresh" placement="top">
          <Icon type="md-refresh" size="22" title="refresh"/>
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="download" placement="top">
          <Icon type="md-download" size="22" />
        </Tooltip>
        <Divider type="vertical"/>
        <Tooltip content="delete" placement="top-end">
          <Icon type="md-trash" size="22" />
        </Tooltip>
        <Divider type="vertical"/>
        <Dropdown @on-click="onChangeStyle">
            <!-- Plain Text -->
          <Icon type="ios-arrow-back" size="22"/>
          <strong style="display:inline-block;width:56px;vertical-align: sub;text-align: center;">{{textStyle}}</strong>
          <Icon type="ios-arrow-forward" size="22"/>
          <!-- <Icon type="md-code" size="22" /> -->
          <DropdownMenu slot="list">
            <DropdownItem v-for="style in ['Json', 'Plain Text', 'HEX']" :name="style" :selected="style === textStyle" :key="style">
              {{style}}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
      type: null, // ['list', 'string']
      size: 10,
      textStyle: 'Json' // ['Json', 'Plain Text', 'HEX']
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
      this.$Notice.info({
        desc: '已经复制到粘贴板'
      })
    }
  },
  computed: {
    ...mapGetters(['curConnection']),
    content () {
      let result = ''
      switch (this.textStyle) {
        case 'Plain Text':
          result = JSON.stringify(this.reply)
          break
        case 'HEX':
          result = JSON.stringify(this.reply)
          break
        default:
          result = JSON.stringify(this.reply, undefined, 2)
      }
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
        console.log(type)
        this.type = type
        switch (type) {
          case 'list':
            client.lrange(this.key, 0, 9, (err, reply) => {
              if (err) return console.log(err)
              console.log(reply)
              this.reply = reply
            })
            client.llen(this.key, (err, reply) => {
              if (err) return console.log(err)
              console.log(reply)
              this.size = reply
            })
            break
          case 'string':
            client.get(this.key, (err, reply) => {
              if (err) return console.log(err)
              console.log(reply)
              this.reply = JSON.parse(reply)
            })
            break
        }
      })
    })
  }
}
</script>

<style lang="css" scoped>
</style>

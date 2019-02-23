<template>
  <div class="container">
    <el-row :gutter="12">
      <el-col :span="6" v-for="i in 16" @click.native="onDbn(i - 1)" :key="i" style="max-height: 80px">
        <el-card shadow="hover" :body-style="{'background': '#409EFF', 'cursor': 'pointer', color: '#fff'}" >
          DB{{i-1}} <Badge :count="sizes[i-1] || 0"></Badge>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: ['connections'],
  name: 'db-list',
  computed: {
    ...mapGetters(['curConnection']),
    ...mapState(['curConnectionName'])
  },
  data () {
    return {
      sizes: []
    }
  },
  methods: {
    onDbn (i) {
      console.log('click db' + i)
      console.log(this.curConnection)
      this.$router.push({name: 'Keys', params: { id: i }})
    }
  },
  created () {
    // let client = this.redisClient(this.curConnection)
    // console.log(client)
    // client.kill('localhost:6379', (err, reply) => {
    //   if (err) console.log(err)
    //   console.log(reply)
    // })
    // client.info((err, reply) => {
    //   if (err) console.log(err)
    //   console.log(reply)
    // })
    // FIXME client对象生成的有点多，占内存
    for (let i = 0; i <= 15; i++) {
      let client = this.redisClient({...this.curConnection, db: i})
      client.select(i, () => {
        client.dbsize((err, reply) => {
          if (err) console.log(err)
          this.$set(this.sizes, i, reply)
        })
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .container {
    padding: 0 10px;
  }
  .el-card {
    margin: 10px 0;
  }
</style>

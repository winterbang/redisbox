<template>
  <div class="container">
    <a-row :gutter="12">
      <a-col :span="6" v-for="i in 16" @click.native="onDbn(i - 1)" :key="i" style="max-height: 80px;padding: 8px">
        <a-card :bordered="false" shadow style="background: #409EFF;cursor: pointer; color: #fff;">
          <a-icon type="ios-list-box-outline" size="24"/>
          <!-- <Icon type="md-list-box" size="24"/> -->
          DB{{i-1}}
          <template v-if="dbsInfo['db' + (i - 1)]">
            <a-badge :count="dbsInfo['db' + (i - 1)]['keys'] || 0 | toInt " type="normal" style="float: right;" ></a-badge>
          </template>
        </a-card>
      </a-col>
    </a-row>
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
      // sizes: Array.from('0' * 16, x => 0 * x),
      dbsInfo: {}
    }
  },
  methods: {
    onDbn (i) {
      console.log('click db' + i)
      console.log(this.curConnection)
      this.$router.push({name: 'Keys', params: { id: i }})
    }
  },
  beforeMount () {
    let client = this.redisClient(this.curConnection)
    let p = Promise.resolve()
    for (let i = 0; i < 16; i++) {
      p = p.then( _ => new Promise(resolve =>
        client.select(i, async (err, reply) => {
          if(err) console.log(err)
          await client.dbsize((err, reply) => {
            this.$set(this.dbsInfo, `db${i}`, {'keys': reply})
            resolve()
          })
        })  
      ))
    }
    client.info((err, reply) => {
      if (err) console.log(err)
      this.connInfo = reply
      let replyArray = reply.split('\n')
      // let dbsInfo = {}
      // replyArray.forEach(v => {
      //   if (v.includes('db')) {
      //     let dbInfo = v.split(':')
      //     let infos = dbInfo[1].split(',')
      //     dbsInfo[dbInfo[0]] = {}
      //     infos.forEach(v => {
      //       let info = v.split('=')
      //       dbsInfo[dbInfo[0]][info[0]] = info[1]
      //     })
      //   }
      // })
      // this.dbsInfo = dbsInfo
    })
    // this.modalOfConnInfo = true
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
    // let promises = []
    // for (let i = 0; i <= 15; i++) {
    //   let p = new Promise((resolve) => {
    //     let client = this.redisClient({...this.curConnection, db: i})
    //     client.select(i, async () => {
    //       await client.dbsize((err, reply) => {
    //         if (err) console.log(err)
    //         this.$set(this.sizes, i, reply)
    //       })
    //       resolve()
    //     })
    //   })
    //   promises.push(p)

    // let client = this.redisClient({...this.curConnection, db: i})
    // client.select(i, () => {
    //   client.dbsize((err, reply) => {
    //     if (err) console.log(err)
    //     this.$set(this.sizes, i, reply)
    //   })
    // })
    // }
    // Promise.all(promises).then((allData) => {
    //   console.log(allData)
    // }).catch((err) => {
    //   console.log(err)
    // })
  },
  filters: {
    toInt: function (value) {
      return parseInt(value)
    }
  }
}
</script>

<style lang="css" scoped>
  /* .container {
    padding: 0 10px;
  } */
  .el-card {
    margin: 10px 0;
  }
</style>

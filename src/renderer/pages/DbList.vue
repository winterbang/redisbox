<template>
  <div class="container">
    <Row :gutter="12">
      <Col :span="6" v-for="i in 16" @click.native="onDbn(i - 1)" :key="i" style="max-height: 80px">
        <Card :bordered="false" shadow style="background: #409EFF;cursor: pointer; color: #fff">
          <Icon type="ios-list-box-outline" size="24"/>
          <!-- <Icon type="md-list-box" size="24"/> -->
          DB{{i-1}}
          <Badge :count="sizes[i-1] || 0" type="normal" style="float: right;"></Badge>
        </Card>
      </Col>
    </Row>
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
    let promises = []
    for (let i = 0; i <= 15; i++) {
      let p = new Promise((resolve) => {
        let client = this.redisClient({...this.curConnection, db: i})
        client.select(i, async () => {
          await client.dbsize((err, reply) => {
            if (err) console.log(err)
            this.$set(this.sizes, i, reply)
          })
          resolve()
        })
      })
      promises.push(p)

      // let client = this.redisClient({...this.curConnection, db: i})
      // client.select(i, () => {
      //   client.dbsize((err, reply) => {
      //     if (err) console.log(err)
      //     this.$set(this.sizes, i, reply)
      //   })
      // })
    }
    Promise.all(promises).then((allData) => {
      console.log(allData)
    }).catch((err) => {
      console.log(err)
    })
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

<template>
  <div>
    <div>
      Key: <span>{{ key }}</span>
      <button class="btn btn-primary">
        <span class="icon icon-pencil icon-text"></span>
        Rename
      </button>
      <button class="btn btn-negative">
        <span class="icon icon-minus-circled icon-text"></span>
        Delete
      </button>
      <button class="btn btn-positive">
        <span class="icon icon-arrows-ccw icon-text"></span>
        Reload Value
      </button>
    </div>
    <div>
      <select class="form-control pull-right" style="width: 120px;" >
        <option>Plain Text</option>
        <option>Json</option>
        <option>HEX</option>
      </select>
    </div>
  </div>
</template>

<script>
import redis from 'redis'
// import elemey from './Layouts/Elemey'
export default {
  name: 'panel',
  data () {
    return {
      loading: false,
      post: null,
      error: null,
      key: '',
      val: null,
      connection: null
    }
  },
  beforeRouteEnter (to, from, next) {
    let { connection, key, db } = to.query
    next(vm => {
      vm.$db.find({ _id: connection }, (err, doc) => {
        console.log(err)
        let cnt = doc
        vm.key = key
        vm.db = db
        vm.connection = cnt
      })
    })
  },
  created () {
    let client = redis.createClient(this.connection)
    client.select(this.db, () => {
      console.log(this.db)
      client.keys(this.key, (err, reply) => {
        if (err) return console.log(err)
        console.log(reply)
      })
    })
    // this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      // getPost(this.$route.params.id, (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
    }
  }
}
</script>

<style lang="css">
</style>

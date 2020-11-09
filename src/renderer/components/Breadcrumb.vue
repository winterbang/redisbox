<template>
  <div class="breadcrumb-wrap">
    <a-breadcrumb separator=">" style="padding: 10px 10px;">
      <a-breadcrumbItem :to="{ name: 'Conns' }">conns</a-breadcrumbItem>
      <a-breadcrumbItem :to="{ name: 'DbList', params: {id: curConnection._id } }">
        {{curConnectionName}} <a-icon type="info-circle" @click.stop="onConnInfo"/>
      </a-breadcrumbItem>
      <a-breadcrumbItem>
        <select class="form-control" style="width: 80px;" v-model="dbIndex" @change="toDb" >
          <option v-for="i in 16" :value="i-1" :key="i" >DB{{i-1}}</option>
        </select>
      </a-breadcrumbItem>
      <a-breadcrumbItem v-if="dbIndex != null" :to="{ name: 'Keys', params: {id: dbIndex} }">
        All
      </a-breadcrumbItem>
      <a-breadcrumbItem :to="{ name: 'Keys', params: {id: dbIndex}, query: {text: keys.slice(0, keys.indexOf(key)+1)}}" v-for="key in keys" :key="key">
        {{ key }}
      </a-breadcrumbItem>
    </a-breadcrumb>
    <a-modal
      :title="curConnectionName"
      v-model="modalOfConnInfo"
      scrollable
      footer-hide
      :styles="{top: '20px'}">
      <pre>{{ connInfo }}</pre>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      dbIndex: null,
      keys: [],
      modalOfConnInfo: false,
      connInfo: null
    }
  },
  methods: {
    initDbIndex (route) {
      if (route.name === 'Keys' || route.name === 'Detail') {
        this.dbIndex = route.params.id
        this.keys = route.params.key ? route.params.key.split(':') : route.query.text
      } else {
        this.dbIndex = null
        this.keys = []
      }
    },
    toDb () {
      console.log('to db')
      this.$router.push({name: 'Keys', params: { id: this.dbIndex }})
    },
    onConnInfo () {
      let client = this.redisClient(this.curConnection)
      client.info((err, reply) => {
        if (err) console.log(err)
        // console.log(reply)
        // console.log(typeof reply)
        this.connInfo = reply
      })
      this.modalOfConnInfo = true
    }
  },
  computed: {
    ...mapState(['curConnectionName']),
    ...mapGetters(['curConnection'])
  },
  watch: {
    $route (to, from) {
      this.initDbIndex(to)
    }
    // '$route.params.id': function (id) {
    //
    //   this.$forceUpdate()
    // }
  },
  created () {
    this.initDbIndex(this.$route)
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log('beforeRouteEnter')
  //   next(vm => {
  //     console.log(vm.dbIndex)
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   next()
  // }
}
</script>
<style scoped>
  .breadcrumb-wrap {
    position: fixed;
    left: 50px;
    right: 0;
    top: 80px;
    z-index: 99;
    background: snow;
    box-shadow: 1px 1px 3px #ddd;
  }
</style>

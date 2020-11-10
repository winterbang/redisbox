<template>
  <div class="breadcrumb-wrap">
    <a-breadcrumb separator=">" style="padding: 10px 10px;">
      <a-breadcrumb-item :to="{ name: 'Conns' }">conns</a-breadcrumb-item>
      <a-breadcrumb-item :to="{ name: 'DbList', params: {id: curConnection._id } }">
        {{curConnectionName}} <a-icon type="info-circle" @click.stop="onConnInfo"/>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <a-select class="form-control" style="width: 80px;" v-model="dbIndex" @change="toDb" >
          <a-select-option v-for="i in 16" :value="i-1" :key="i" >DB{{i-1}}</a-select-option>
        </a-select>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-if="dbIndex != null" :to="{ name: 'Keys', params: {id: dbIndex} }">
        All
      </a-breadcrumb-item>
      <a-breadcrumb-item :to="{ name: 'Keys', params: {id: dbIndex}, query: {text: keys.slice(0, keys.indexOf(key)+1)}}" v-for="key in keys" :key="key">
        {{ key }}
      </a-breadcrumb-item>
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
    $route: {
      handler (to, from) {
        console.log(to, '==============to ==============')
        this.initDbIndex(to)
      },
    　immediate: true 
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
    left: 60px;
    right: 10px;
    top: 80px;
    z-index: 99;
    background: snow;
    box-shadow: 1px 1px 3px #ddd;
    border-radius: 3px;
  }
</style>

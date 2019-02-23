<template>
  <div style="padding: 10px 0 160px">
    <breadcrumb v-show="breadcrumbVisible"/>
    <div class="wrap">
      <transition  mode="out-in" name="fade">
        <router-view :key="`main-${$route.fullPath}`"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { remote } from 'electron'
import Breadcrumb from '@/components/Breadcrumb'
const { dialog } = remote
export default {
  name: 'Main',
  components: { Breadcrumb },
  computed: {
    ...mapState(['connections'])
  },
  data () {
    return {
      breadcrumbVisible: true
    }
  },
  watch: {
    $route (to, from) {
      this.dbIndex = to.params.id
      this.breadcrumbVisible = to.name !== 'Conns'
      this.keys = to.params.key ? to.params.key.split(':') : to.query.text
    }
  },
  methods: {
    ...mapActions(['setCurConnectionName', 'deleteConnection']),
    onDeleteConnection (connection) {
      this.deleteConnection(connection._id)
    },
    onConnection (index) {
      let connection = this.connections[index]
      let client = this.redisClient(connection)
      client.on('error', function (err) {
        dialog.showMessageBox({type: 'error', message: err.message})
        client.quit()
      })
      // let self = this
      client.on('connect', () => {
        this.setCurConnectionName(connection.name)
        // this.$set(this.connections, index, connection)
        console.log('dblist')
        this.$router.push({name: 'DbList', params: { id: connection._id }})
      })
    }
  },
  created () {
    this.breadcrumbVisible = this.$route.name !== 'Conns'
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log(to)
  //   next(vm => {
  //     if (to.name !== 'Conns') vm.breadcrumbVisible = true
  //     // console.log(vm.dbIndex)
  //   })
  // }
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   next()
  // }
}
</script>

<style lang="css" scoped>
  .wrap {
    margin-right: 18px; /* 修复隐藏滚动条带来的右偏移问题 */
  }

</style>

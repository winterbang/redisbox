<template>
   <div class="" style="height: calc(100% - 80px);">
     <Split v-model="split" min="560">
        <div slot="left" style="height: 100%;">
          <Layout style="height: 100%;">
            <Sider hide-trigger width="80">
              <nav-sider />
            </Sider>
            <Layout>
              <transition  mode="out-in" name="fade">
                <router-view></router-view>
              </transition>
            </Layout>
          </Layout>
        </div>
        <div slot="right" style="height: 100%;">
          <!-- <console/> -->
        </div>
     </Split>
   </div>
</template>

<script>
// import elemey from './Layouts/Elemey'
// import yummy from '../layouts/Yummy'
import { mapState, mapActions } from 'vuex'
import NewConnection from '@/components/NewConnectionPage/Index'
import NavSider from '@/components/NavSider/index'
import ConsoleV from '@/pages/Console'
// import { remote, shell } from 'electron'
// const { dialog } = remote
export default {
  name: 'alluring',
  computed: mapState(['connections']),
  components: { NewConnection, NavSider, console: ConsoleV },
  data () {
    return {
      split: 1, // 0.7,
      switchValue: '',
      color4: '',
      visibel: false,
      content: 'conns' // conns setting info donate share
    }
  },
  methods: {
    ...mapActions(['setCurConnectionName', 'deleteConnection'])
  },
  created () {
    this.$bus.$on('triggerConsole', (event) => {
      this.split = this.split === 1 ? 0.7 : 1
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    console.log('query=========')
    next()
  }
}
</script>

<style lang="css">
scrollbar {
  width: 14px;
}
.active {
  background: #2db7f5;
  color: #fff
}
.ivu-col {
  margin: 10px 0;
}
</style>

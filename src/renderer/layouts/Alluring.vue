<template>
   <div class="" style="height: 100%;overflow-y: scroll">
     <Layout style="height: 100%;width: 100%;">
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
</template>

<script>
// import elemey from './Layouts/Elemey'
// import yummy from '../layouts/Yummy'
import { mapState, mapActions } from 'vuex'
import NewConnection from '@/components/NewConnectionPage/Index'
import NavSider from '@/components/NavSider/index'
// import { remote, shell } from 'electron'
// const { dialog } = remote
export default {
  name: 'alluring',
  computed: mapState(['connections']),
  components: { NewConnection, NavSider },
  data () {
    return {
      switchValue: '',
      color4: '',
      visibel: false,
      content: 'conns' // conns setting info donate share
    }
  },
  methods: {
    ...mapActions(['setCurConnectionName', 'deleteConnection'])
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

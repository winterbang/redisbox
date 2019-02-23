<template>
   <div class="box-home">
     <span class="animated bounce" style="font-size: 80px;color: #19be6b;font-weight: 800;text-shadow: 5px 5px 5px #ccc">Redisbox</span>
     <div>
       广告
     </div>
     
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
  name: 'home',
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
  }
}
</script>

<style lang="css">
 .box-home {
   height: 80%;
   display: flex;
   justify-content: center;
   align-items: center;
 }
</style>

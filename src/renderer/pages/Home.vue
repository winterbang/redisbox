<template>
   <div class="box-home">
     <span class="animate__animated animate__bounce text-logo">Redisbox</span>
     <!-- <div>
       广告
     </div> -->
     <a-row :gutter="16" style="position: absolute; bottom: 20px;">
        <a-col span="24" v-for="tool in buttons" :key="tool.label" @click.native="onButton(tool.label)">
          <a-button type="primary" shape="round" :icon="tool.icon" size="large" />
          <!-- <a-card bordered shadow :style="{background: tool.color}">
            <div style="text-align:center;color: #fff;" >
              <a-icon :type="tool.icon" size="40"/>
              <h5>{{ tool.label }}</h5>
            </div>
          </a-card> -->
        </a-col>
     </a-row>

     <a-modal v-model="donateVisible" :footer="null" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <a-icon type="credit-card" size="26" />
        <span>Donate</span>
      </p>
      <div style="display:flex;justify-content: space-around;align-items: center">
        <img src="@/assets/donate_alipay.jpeg" width="200" alt="">
        <img src="@/assets/donate_wechat.jpeg" width="200" alt="">
      </div>
    </a-modal>
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
      donateVisible: false,
      buttons: [
        {
          label: 'donate',
          icon: 'credit-card',
          color: '#ff9900'
        // }, {
        //   label: 'share',
        //   icon: 'ios-share-alt-outline',
        //   color: '#19be6b'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['setCurConnectionName', 'deleteConnection']),
    onButton (label) {
      switch (label) {
        case 'donate':
          this.donateVisible = true
          break
        case 'share':
          this.$Modal.info({
            title: 'share',
            content: label
          })
          break
      }
    }
  }
}
</script>

<style lang="less">
  .box-home {
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .text-logo {
      font-size: 80px;
      color: #19be6b;
      font-weight: 800;
      // background-image: linear-gradient(45deg, #388a61, #19be6b);
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      text-shadow: 5px 5px 5px #ccc;
    }
  }
</style>
